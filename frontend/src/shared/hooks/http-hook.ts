import { 
    useState, 
    useCallback, 
    useRef,
    useEffect
 } from 'react';

import type { 
    IGetResponse
} from '../../types/api-types';

const emptyHttpReqAborts:Array<AbortController> = []
export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const activeHttpRequest = useRef(emptyHttpReqAborts);

    const sendRequest = useCallback(
        async<T>(url: string, method:string, body:string, headers:{}) => {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequest.current.push(httpAbortCtrl);
            try {
                const response = await fetch(url, {
                method: method,
                body: body,
                headers: headers,
                signal: httpAbortCtrl.signal
            });

            const responseData:IGetResponse<T> = await response.json();

            // Now we want to filter out the specific control for this specific request
            activeHttpRequest.current = activeHttpRequest.current.filter(
                // Keep all requests controllers except the one we just got the data
                reqCtrl => reqCtrl !== httpAbortCtrl
            );

            if (!response.ok){
                throw new Error(responseData.message);    
            }
            setIsLoading(false);
            return responseData;
        } catch(err) {
            setErrorMsg(err.message);
            setIsLoading(false);
            throw err;
        }
    },[]);
    
    const clearError = () => {
        setErrorMsg('');
    }

    useEffect(() => {   // Only runs when a component unmounts
        return () => {
            // This is a cleanup function when a component that utilizes the hook is unmounted
            activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading: isLoading, error: errorMsg, sendRequest: sendRequest, clearError: clearError}
};
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
const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const activeHttpRequest = useRef(emptyHttpReqAborts);

    const sendRequest = useCallback(
        async<T>(url: string, method: 'GET', body:null, headers:{}) => {
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

            if (!response.ok){
                throw new Error(responseData.message);    
            }

            return responseData;
        } catch(err) {
            setErrorMsg(err.message);
        }
        setIsLoading(false);
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

    return { isLoading: isLoading, error: errorMsg, sendRequest: sendRequest}
};

export default useHttpClient;
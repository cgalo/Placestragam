class HttpError extends Error {
    private errorCode: number;

    constructor(message: string, errorCode: number){
        super (message);
        this.errorCode = errorCode;
    }

    public getErrorCode(){
        return this.errorCode;
    }

    public getMessage(){
        return this.message;
    }
    public setErrorCode(errorCode:number){
        this.errorCode = errorCode;
    }
}

export default HttpError;
class HttpError extends Error {
    private _errorCode: number;

    constructor(message: string, errorCode: number){
        super (message);
        this._errorCode = errorCode;
    }

    get errorCode():number{
        return this._errorCode;
    }

    get message():string{
        return this.message;
    }

    set errorCode(errorCode:number){
        this._errorCode = errorCode;
    }
}

export default HttpError;
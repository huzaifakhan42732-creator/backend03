class ApiError extends Error{
    constructor(
        statusCode,
        message= "Something went wrong ",
        errors= [],
        stactck= ""
    ){
        super(message)
        this.statusCode=statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors= errors


        if(stacck){
            this.stack = stacck 
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}
class ApiError extends Error{
    constructor(
    statusCode,
    message= "Something went wrong ",
    errors= [],
    stackTrace= ""  // Changed from 'stack'
){
    super(message)
    this.statusCode=statusCode
    this.data = null
    this.message = message
    this.success = false
    this.errors= errors

    if(stackTrace){  // Changed from 'stack'
        this.stack = stackTrace 
    }else{
        Error.captureStackTrace(this,this.constructor)
    }
}
}

export {ApiError}
export const errorMiddleware = (err,req,res,next) => {
    let error = {...err}

    error.message = err.message

    console.log(err.stack)

    if(err.name === "CastError"){
        error.message = "Resource not found";
        error.statusCode = 404 ;
    }

    if(err.code === 11000){
        error.message = "Duplicate values found"
        error.statusCode = 400;
    }

    if(err.name === "ValidationError"){
        error.message= Object.values(err.errors).map(val => val.message).join(',');
        error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
        success : false,
        message : error.message || "Internal Server error"
    })

}
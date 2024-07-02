


const handleErrors =async (res,err) => {
    if(err.status === undefined)
        //that's means i didn't handle the error so it's an internal server error
        res.status(500).send('Internal Server Error');
    else 
       res.status(err.status).send(err.message);
};


module.exports = {
    handleErrors
};
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')


const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1]
    
    // verify token -> whether the token is valid or not
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decoded
        req.user = {id,username} // we added user property to the req object 
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }

    next() // if everything is successful we pass it to the next middleware i.e. dashboard
}

module.exports = authenticationMiddleware
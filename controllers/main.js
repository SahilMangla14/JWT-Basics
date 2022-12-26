// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

require('dotenv').config();
const jwt = require('jsonwebtoken')
const  { BadRequestError } = require('../errors')

const login = async (req,res) => {

    const {username,password} = req.body

    // Methods for validations
    // 1) mongoose -> Here we are not connecting to database. That is why we are not using it here
    // 2) Joi -> will be used in later projects
    // 3) check for all errors manually. Going by this here

    // Method -1 
    // if(!username || !password){
    //     throw new CustomAPIError('Please provide email and password',404)
    // }
    // Method - 2
        if(!username || !password){
            throw new BadRequestError('Please provide email and password')
        }

    // just for demo, normally provided by DB!!
    const id = new Date().getDate()

    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!!
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    // res.send('Fake Login/Register/Signup Route')
    res.status(200).json({msg: `user creater`, token})
}

// Method 1
// First we need to check authentication
// Then we need to check whether the token is valid or not
// If everything is successful, decode it

// const dashboard = async (req,res) => {
//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith('Bearer')){
//         throw new CustomAPIError('No token provided',401)
//     }

//     const token = authHeader.split(' ')[1]
    
//     // verify token -> whether the token is valid or not
//     try {
//         const decoded = jwt.verify(token,process.env.JWT_SECRET)
//     } catch (error) {
//         throw new CustomAPIError('Not authorized to access this route',401)
//     }

//     const luckyNumber = Math.floor(Math.random()*100)
//     res.status(200).json({msg:`Hello, ${decoded.username}`, secret:`Here is your authroized data, your lucky number is ${luckyNumber}`})
// }

// Improvement in code structure

const dashboard = async (req,res) => {
    console.log(req.user)

    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, ${req.user.username}`, secret:`Here is your authroized data, your lucky number is ${luckyNumber}`})
}


module.exports = {
    login,
    dashboard
}

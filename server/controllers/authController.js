const userModel = require('../models/userModel')
const errorResponse = require('../utils/errorResponse')
const errorHandler = require('../middelwares/errorMiddleware')

//sign
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    })
}

//register
exports.registerContoller = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;

        //exiting user
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return next(new errorResponse('emailis already regiester', 500))
        }
        const user = await userModel.create({ username, email, password })
        sendToken(user, 201, res)


    } catch (error) {
        console.log(error)
        next(error)

    }
}

//login

exports.loginContoller = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return next(new errorResponse('Please Provide valid email or password'))
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return next(new errorResponse('invalid Crdential', 401))
        }
        const ismatch = await userModel.matchPassword(password)
        if (!ismatch) {
            return next(new errorHandler('invalid Crdential', 401))

        }
        //res
        sendToken(user, 200, res)

    } catch (error) {

        console.log(error)
        next(error)
    }
}


//logout
exports.logoutContoller = async (req, res) => {
    res.clearCookie("refreshToken")
    return res.status(200).json({
        success: true,
        message: 'logout successfully',
    })
}
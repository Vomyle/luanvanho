const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const AuthSchema = require('../validations/AuthSchema')

const authRouter = Router()

authRouter.post('/register', AuthController.register)
authRouter.post('/login', validatorMiddleware(AuthSchema.login), AuthController.login)
authRouter.post('/forgot-password', validatorMiddleware(AuthSchema.forgotPassword), AuthController.forgotPassword)
authRouter.post('/reset-passwords', AuthController.resetPasswords)
module.exports = authRouter

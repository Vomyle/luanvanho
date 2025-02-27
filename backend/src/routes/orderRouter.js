const { Router } = require('express')
const OrderController = require('../controllers/OrderController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const OrderSchema = require('../validations/OrderSchema')
const orderRouter = Router()
orderRouter.get('/sale',
    OrderController.getSale)
orderRouter.get('/salemonth',
    OrderController.getMonthlyRevenue)
orderRouter.get('/saleannual',
    OrderController.getAnnualRevenue)
orderRouter.get('/', jwtAuthMiddleware, authorizedMiddleware('customer', 'admin'), OrderController.getAllOrder)
orderRouter.get('/:id', jwtAuthMiddleware, authorizedMiddleware('customer', 'admin'), OrderController.getOrderById)
orderRouter.post(
    '/',
    jwtAuthMiddleware,
    authorizedMiddleware('customer'),
    // validatorMiddleware(OrderSchema.createOrder),
    OrderController.createOrder
)
orderRouter.delete('/:id', jwtAuthMiddleware, authorizedMiddleware('admin'), OrderController.deleteOrder)
orderRouter.patch(
    '/cancel/:id',

    OrderController.cancelOrderById
)
orderRouter.patch('/shipper/:id', OrderController.setShipperOrder)
orderRouter.patch('/cancel/:id', OrderController.setCancelledOrder)
orderRouter.patch('/delivered/:id', OrderController.setDeliveredOrder)
orderRouter.patch('/payment/:id', OrderController.setPaymentOrder)
module.exports = orderRouter

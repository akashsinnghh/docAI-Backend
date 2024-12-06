const CustomerService = require('../services/user-service')

// With the help of this other service will be able to call our Customer service with this web-hook.

module.exports = (app) => {

    const service = new CustomerService

    app.use('/app-events', async (req, res, next) => {
        try {
            
            const { payload } = req.body
            
            service.SubscribeEvents(payload)

            console.log("-----Shopping service recieved events-----");

            return res.status(200).json(payload)

        } catch (error) {
            throw error
        }
    })
}
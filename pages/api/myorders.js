import Order from '../../models/Order'
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'

const handler = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    } else {
        if (req.method === 'POST') {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
            const orders = await Order.find({ user: decoded.email })
            res.status(200).json(orders)
        }else{
            res.status(405).json({ message: 'Method not allowed' })
        }
    }

}

export default connectDb(handler)
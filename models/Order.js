const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, default: 1 },
        }
    ],
    address: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'Order Placed' },
}, { timestamps: true });
mongoose.models = {};
export default mongoose.model('Order', OrderSchema);
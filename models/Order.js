const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    email: { type: String, required: true },
    paymentinfo: { type: String, default: 'Not Paid' },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'Initiated' },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
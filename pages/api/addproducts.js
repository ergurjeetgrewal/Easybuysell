import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {
    if (req.method === "POST") {
        for (let i = 0; i < req.body.length; i++) {
            const { title, slug, desc, img, category, size, color, price, availableQty } = req.body[i];
            const product = new Product({ title, slug, desc, img, category, size, color, price, availableQty })
            await product.save()
        }
        return res.status(200).json({ message: "Products added successfully" })
    }
    return res.status(400).json({ error: "Bad request" });
}

export default connectDb(handler)
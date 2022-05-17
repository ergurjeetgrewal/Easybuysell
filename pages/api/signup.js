import User from '../../models/User'
import connectDb from "../../middleware/mongoose"
let CryptoJS = require("crypto-js");


const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { email, name } = req.body;
            let u = new User({ email, name, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() });
            await u.save()
            return res.status(200).json({ message: "hy" })
        } catch (error) {
            return res.status(400).json({ error: error })
        }

    } else {
        return res.status(400).json({ error: "Bad request" });
    }
}

export default connectDb(handler)
import User from '../../models/User'
import connectDb from "../../middleware/mongoose"
let CryptoJS = require("crypto-js");
let jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                let decpassword = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8)
                if (decpassword === req.body.password) {
                    let token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.status(200).json({ success: true, token: token })
                } else {
                    return res.status(400).json({ error: "Please verify credentials" })
                }
            } else {
                return res.status(400).json({ error: "Please verify credentials" })
            }
        } catch (error) {
            return res.status(400).json({ error: error })
        }

    } else {
        return res.status(400).json({ error: "Bad request" });
    }
}

export default connectDb(handler)
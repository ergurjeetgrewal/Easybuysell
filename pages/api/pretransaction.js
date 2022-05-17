const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import Order from '../../models/Order'
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {
    if (req.method === 'POST') {
        // initiate an order corresponding to the cart orderid
        let order = new Order({
            orderId: req.body.oid,
            email: req.body.email,
            total: req.body.subtTotal,
            address: req.body.address,
            products: req.body.cart,
        });
        await order.save();
        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST_URI}/api/posttransaction`,
            "txnAmount": {
                "value": parseInt(req.body.subtTotal),
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

        let checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_KEY)
        paytmParams.head = {
            "signature": checksum
        };
        var post_data = JSON.stringify(paytmParams);
        const requestAsync = async () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    // hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });
                    post_res.on('end', function () {
                        resolve(response);
                    });
                });

                post_req.write(post_data);
                post_req.end();
            });

        }
        let myPromise = await requestAsync();
        res.status(200).json(myPromise);
    }
    else {
        res.status(404).json('Not allowed');
    }
}

export default connectDb(handler)
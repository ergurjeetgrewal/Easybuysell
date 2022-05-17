const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import Order from '../../models/Order'
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {
  var paytmParams = {};
  /* body parameters */
  paytmParams.body = {
    /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
    "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
    /* Enter your order id which needs to be check status for */
    "orderId": req.body.ORDERID,
  };
  /**
  * Generate checksum by parameters we have in body
  * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
  */
  PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_KEY).then(function (checksum) {
    /* head parameters */
    paytmParams.head = {

      /* put generated checksum value here */
      "signature": checksum
    };

    /* prepare JSON string for request */
    var post_data = JSON.stringify(paytmParams);
    var options = {
      /* for Staging */
      hostname: 'securegw-stage.paytm.in',

      /* for Production */
      // hostname: 'securegw.paytm.in',

      port: 443,
      path: '/v3/order/status',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': post_data.length
      }
    };

    // Set up the request
    var response = "";
    var post_req = https.request(options, function (post_res) {
      post_res.on('data', function (chunk) {
        response += chunk;
      });
      post_res.on('end', function () {

      });
    });
    // post the data
    post_req.write(post_data);
    post_req.end();
  });
  if (req.body.STATUS === 'TXN_SUCCESS') {
    // update into order table after verification
    await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Paid', paymentinfo: JSON.stringify(req.body) });
    res.redirect(`/order?orderId=${req.body.ORDERID}`, 200);
  }
  else if(req.body.STATUS === 'PENDING'){
    await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Pending', paymentinfo: JSON.stringify(req.body) });
    res.redirect(`/order?orderId=${req.body.ORDERID}`, 200);
  }else{
    await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Failed', paymentinfo: JSON.stringify(req.body) });
    res.redirect(`/order?orderId=${req.body.ORDERID}`, 200);
  }
  // res.status(200).json({ name: req.body })
}

export default connectDb(handler)
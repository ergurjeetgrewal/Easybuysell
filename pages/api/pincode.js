export default function handler(req, res) {
    const servicepincodes = [262904, 262902, 140407, 110003, 560017];
    const { pincode } = req.query;
    if (servicepincodes.includes(parseInt(pincode))) {
        res.status(200).json({'message':true});
    } else {
        res.status(200).json({'message':false});
    }
}

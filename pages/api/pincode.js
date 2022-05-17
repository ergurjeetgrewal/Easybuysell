export default function handler(req, res) {
    const servicepincodes = { 262904: ['vichitranagar', 'uttar Pradesh'], 262902: ['palia kalan', 'uttar Pradesh'], 140407: ['fatehgarh sahib', 'punjab'] };
    res.status(200).json(servicepincodes);
}

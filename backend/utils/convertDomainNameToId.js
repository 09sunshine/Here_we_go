import Domain from "../models/domain.js";

const convertDomainNameToId = async (req, res, next) => {
    try {
        const { domain } = req.body;
        if (domain) {
            const domainDoc = await Domain.findOne({ name: domain });
            if (!domainDoc) {
                return res.status(400).json({ error: 'Invalid domain ID' });
            }
            req.body.domain = domainDoc.name; // Replace ID with name
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default convertDomainNameToId;
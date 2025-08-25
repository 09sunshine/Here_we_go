import Domain from '../models/domain.js';

export const createDomain = async (req, res) => {
    try {
        const domain = new Domain(req.body);
        await domain.save();
        res.status(201).json(domain);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllDomains = async (req, res) => {
    try {
        const domains = await Domain.find();
        res.json(domains);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getDomainById = async (req, res) => {
    try {
        const domain = await Domain.findById(req.params.id);
        if (!domain) return res.status(404).json({ error: 'Domain not found' });
        res.json(domain);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateDomain = async (req, res) => {
    try {
        const domain = await Domain.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!domain) return res.status(404).json({ error: 'Domain not found' });
        res.json(domain);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteDomain = async (req, res) => {
    try {
        const domain = await Domain.findByIdAndDelete(req.params.id);
        if (!domain) return res.status(404).json({ error: 'Domain not found' });
        res.json({ message: 'Domain deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
import express from 'express';
import Event from '../models/event.js';
import checkToken from '../middleware/checkToken.js';
import ensureLoggedIn from '../middleware/ensureLoggedIn.js';
import convertDomainNameToId from '../utils/convertDomainNameToId.js';

const router = express.Router();

// Create a new event
router.post('/', checkToken, ensureLoggedIn, convertDomainNameToId, async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all events
router.get('/', checkToken, ensureLoggedIn, convertDomainNameToId, async (req, res) => {
    try {
        const events = await Event.find().populate('domain');
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get event by ID
router.get('/:id', checkToken, ensureLoggedIn, convertDomainNameToId, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('domain');
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update event by ID
router.put('/:id', checkToken, ensureLoggedIn, convertDomainNameToId, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete event by ID
router.delete('/:id', checkToken, ensureLoggedIn, convertDomainNameToId, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
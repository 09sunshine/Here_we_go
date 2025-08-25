import Event from "../models/event";

const convertEventNameToId = async (req, res, next) => {
    try {
        const { title } = req.body;
        if (eventName) {
            const eventDoc = await Event.findOne({ title: eventName });
            if (!eventDoc) {
                return res.status(404).json({ error: 'Event not found' });
            }
            req.body.eventId = eventDoc._id;
            next();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default convertEventNameToId;
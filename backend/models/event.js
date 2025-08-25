import mongoose,{Schema} from 'mongoose';

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    createdBy: { type: String, required: true },
    domains: [{ type: Schema.Types.ObjectId, ref: 'Domain', required: false }],
    status: { type: String, enum: ['open', 'closed'], default: 'open' }
});

// Automatically set status before saving
eventSchema.pre('save', function (next) {
    const now = new Date();
    // If event date is in the past, set status to 'closed'
    this.status = this.date < now ? 'closed' : 'open';
    next();
});

// Also update status on update
eventSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.date) {
        const now = new Date();
        update.status = new Date(update.date) < now ? 'closed' : 'open';
        this.setUpdate(update);
    }
    next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event;

import mongoose,{Schema} from "mongoose";

const domainSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const Domain = mongoose.model('Domain', domainSchema);

export default Domain;

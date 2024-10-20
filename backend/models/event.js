import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    teamLeaderName: { type: String, required: true },
    regNo: { type: String, required: true },
    year: { type: String, required: true },
    department: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    participant2: {
        name: { type: String, required: true },
        regNo: { type: String, required: true },
        year: { type: String, required: true },
        department: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
    },
    participant3: {
        name: { type: String, required: true },
        regNo: { type: String, required: true },
        year: { type: String, required: true },
        department: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
    },
    participant4: {
        name: { type: String, required: false },
        regNo: { type: String, required: false },
        year: { type: String, required: false },
        department: { type: String, required: false },
        phoneNumber: { type: String, required: false },
        email: { type: String, required: false },
    }
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

// Export the model
export default Event;

import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
    event_name: string;
    description: string;
    image: string;
    date: string;
    time: string;
    venue: string;
    questions: Array<{
        question: string;
        questionType: string; // Changed 'type' to 'questionType' to avoid using the reserved keyword
    }>;
    send_email: boolean;
    email_template: string;
    faq: Array<{
        question: string;
        answer: string;
    }>;
    timeline: Array<{
        time: string;
        event: string;
        description: string;
    }>;
    sponsers: string[];
    prizes: Array<{
        prize: string;
        description: string;
        amount: number;
    }>;
    problem_statements: string[];
    team_size: number;
    teams: string[];
    event_admin: string;
    event_username: string;
    created_at: Date;
    participants: Array<{
        username: string;
        answers: string[];
    }>;
    autoVerify: boolean;
}

const EventSchema = new Schema<IEvent>({
    event_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    questions: {
        type: [
            {
                question: { type: String, required: true },
                questionType: { type: String, required: true }, 
            },
        ],
        default: [],
    },
    send_email: {
        type: Boolean,
        default: false,
    },
    email_template: {
        type: String,
        default: "",
    },
    faq: {
        type: [
            {
                question: String,
                answer: String,
            },
        ],
        default: [],
    },
    timeline: {
        type: [
            {
                time: String,
                event: String,
                description: String,
            },
        ],
        default: [],
    },
    sponsers: {
        type: [String],
        default: [],
    },
    prizes: {
        type: [
            {
                prize: String,
                description: String,
                amount: Number,
            },
        ],
        default: [],
    },
    problem_statements: {
        type: [String],
        default: [],
    },
    team_size: {
        type: Number,
        required: true,
    },
    teams: {
        type: [String],
        default: [],
    },
    event_admin: {
        type: String,
        required: true,
    },
    event_username: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    participants: {
        type: [
            {
                username: String,
                answers: [String],
            },
        ],
        default: [],
    },
    autoVerify: {
        type: Boolean,
        default: false,
    },
});

const EventModel = mongoose.models && mongoose.models.Event
    ? (mongoose.models.Event as mongoose.Model<IEvent>)
    : mongoose.model<IEvent>("Event", EventSchema);

export default EventModel;

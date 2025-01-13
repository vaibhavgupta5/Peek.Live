import mongoose , {Document, Schema} from "mongoose";


export interface IEvent extends Document {
    event_name: string;
    description: string;
    image: string;
    date: Date;
    time: string;
    venue: string;
    questions: [
        {
            question: string;
            type: string;
        }
    ];
    send_email: boolean;
    email_template: string;
    faq: [
        {
            question: string;
            answer: string;
        }
    ];
    timeline: [
        {
            time: string;
            event: string;
            description: string;
        }
    ];
    sponsers: string[];
    prizes: [
        {
            prize: string;
            description: string;
            amount: number;
        }
    ];
    problem_statements: string[];
    team_size: number;
    teams: string[];
    event_admin: string;
    event_username: string;
    created_at: Date;
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
        type: Date,
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
                question: String,
                type: String,
            }
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
            }
        ],
        default: [],
    },
    timeline: {
        type: [
            {
                time: String,
                event: String,
                description: String,
            }
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
            }
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

})

const EventModel = mongoose.models && mongoose.models.Event ? (mongoose.models.Event as mongoose.Model<IEvent>) : (mongoose.model<IEvent>("Event", EventSchema)); 

export default EventModel;
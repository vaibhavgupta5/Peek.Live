import mongoose, { Document, Schema } from "mongoose";

export interface ITeam extends Document {
  team_name: string;
  team_username: string;
  team_members: [
    {
      member_id: string;
      member_username: string;
      isLeader: boolean;
    }
  ];
  team_leader: string;
  event_username: string;
}

const TeamSchema = new Schema<ITeam>({
  team_name: {
    type: String,
    required: true,
  },
  team_username: {
    type: String,
    required: true,
  },
  team_members: [
    {
      member_id: {
        type: String,
        required: true,
      },
      member_username: {
        type: String,
        required: true,
      },
      isLeader: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  team_leader: {
    type: String,
    required: true,
  },
  event_username: {
    type: String,
    required: true,
  },
});


const TeamModel = mongoose.models && mongoose.models.Team ? (mongoose.models.Team as mongoose.Model<ITeam>) : (mongoose.model<ITeam>("Team", TeamSchema)); 


export default TeamModel;
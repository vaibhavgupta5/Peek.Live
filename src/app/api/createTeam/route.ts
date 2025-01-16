import EventModel from "@/Models/Event";
import TeamModel from "@/Models/Team";
import UserModel from "@/Models/User";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createTeam = z.object({
  team_name: z.string(),
  event_username: z.string(),
  username: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { team_name, username, event_username } = createTeam.parse(body);

  connectDB();

  try {
    const existingUser = await UserModel.findOne({ username });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not exist",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const existingEvent = await EventModel.findOne({ event_username });

    if (!existingEvent) {
      return NextResponse.json(
        {
          message: "Event not exist",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const randomNum = Math.floor(Math.random() * 10000);
    const team_username = `${team_name
      .toLowerCase()
      .replace(/\s+/g, "")}${randomNum}`;

    const existingTeam = await TeamModel.findOne({
      event_username,
      team_leader: username,
    });

    if (existingTeam) {
      return NextResponse.json(
        {
          message: "Team already exists",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    let isTeamVerified = false;
    if (existingEvent.autoVerify === true) {
      isTeamVerified = true;
    }

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let teamCode = "";
    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      teamCode += characters[randomIndex];
    }

    const newTeam = new TeamModel({
      team_name,
      team_leader: username,
      team_username,
      event_username,
      team_members: [
        {
            member_username: username,
            isVerified: true,
          isLeader: true,
        }
      ],
      isTeamVerified,
      teamCode,
    });

    await newTeam.save();

    existingEvent.teams.push(newTeam._id as any);

    await existingEvent.save();

    return NextResponse.json(
      {
        message: "Team Created successfully",
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

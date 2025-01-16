import TeamModel from "@/Models/Team";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getTeamDetails = z.object({
    event_username: z.string(),
    team_username: z.string(),
})

export async function POST(req: NextRequest) {
  const body = await req.json();

    const { event_username , team_username } = getTeamDetails.parse(body);

  connectDB();


  try {
  
    const team = await TeamModel.findOne({ event_username, team_username });

    if (!team) {
      return NextResponse.json(
        {
          message: "Team not exists",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    team.isTeamVerified = true;
    await team.save();



    return NextResponse.json(
      {
        message: "Team Verified",
        success: true,
      },
      {
        status: 200,
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

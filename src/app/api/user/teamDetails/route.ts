import EventModel from "@/Models/Event";
import TeamModel from "@/Models/Team";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getTeamDetails = z.object({
    event_username: z.string(),
    username: z.string(),
})

export async function POST(req: NextRequest) {
  const body = await req.json();

    const { event_username, username } = getTeamDetails.parse(body);

  connectDB();


  try {
  
    const existingEvent = await EventModel.findOne({ event_username });

    if (!existingEvent) {
      return NextResponse.json(
        {
          message: "Event not exists",
          success: false,
        },
        {
          status: 400,
        }
      );
    }


    const team = await TeamModel.findOne({
        event_username,
        "team_members.member_username": username,
    });


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
   


    return NextResponse.json(
      {
        message: "Team Found",
        success: true,
        data: team,
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

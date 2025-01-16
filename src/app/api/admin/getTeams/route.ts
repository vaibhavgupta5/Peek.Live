import TeamModel from "@/Models/Team";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getTeamDetails = z.object({
    event_username: z.string(),
})

export async function POST(req: NextRequest) {
  const body = await req.json();

    const { event_username } = getTeamDetails.parse(body);

  connectDB();


  try {
  
    const teams = await TeamModel.findOne({ event_username });

    if (!teams) {
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
        data: teams,
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

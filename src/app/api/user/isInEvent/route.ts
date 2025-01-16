import EventModel from "@/Models/Event";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getUserEventDetails = z.object({
    event_username: z.string(),
    username: z.string(),
})

export async function POST(req: NextRequest) {
  const body = await req.json();

    const { event_username, username } = getUserEventDetails.parse(body);

  connectDB();


  try {
  
    const existingEvent = await EventModel.findOne({ event_username , "participants.username": username });

    if (!existingEvent) {
      return NextResponse.json(
        {
          message: "Not in event",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    

    return NextResponse.json(
      {
        message: "Is in event",
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

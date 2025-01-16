import EventModel from "@/Models/Event";
import UserModel from "@/Models/User";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const joinEvent = z.object({
  answers: z.array(z.string()),
  username: z.string(),
  event_username: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { username, event_username, answers } = joinEvent.parse(body);

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

    existingEvent.participants.push({ username, answers });
    existingUser.events_in.push(event_username);

    await existingEvent.save();
    await existingUser.save();

    return NextResponse.json(
      {
        message: "Event joined successfully",
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

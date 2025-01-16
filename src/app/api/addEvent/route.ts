import EventModel from "@/Models/Event";
import UserModel from "@/Models/User";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";




const addEvent = z.object({

    event_name: z.string(),
    description: z.string(),
    image: z.string(),
    date: z.string(),
    time: z.string(),
    venue: z.string(),
    questions: z.array(z.object({
        question: z.string(),
        questionType: z.string(),
    })),
    send_email: z.boolean(),
    email_template: z.string(),
    faq: z.array(z.object({
        question: z.string(),
        answer: z.string(),
    })),
    timeline: z.array(z.object({
        time: z.string(),
        event: z.string(),
        description: z.string(),
    })),
    sponsers: z.array(z.string()),
    prizes: z.array(z.object({
        prize: z.string(),
        description: z.string(),
        amount: z.number(),
    })),
    problem_statements: z.array(z.string()),
    team_size: z.number(),
    teams: z.array(z.string()),
    event_admin: z.string(),
    event_username: z.string(),
    autoVerify: z.boolean(),
})

export async function POST(req: NextRequest) {
  const body = await req.json();

    const { event_name, description, image, date, time, venue, questions, send_email, email_template, faq, timeline, sponsers, prizes, problem_statements, team_size, teams, event_admin, event_username, autoVerify } = addEvent.parse(body);

  connectDB();


  try {
    const existingUser = await UserModel.findOne({ username: event_admin });

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

    if (existingEvent) {
      return NextResponse.json(
        {
          message: "Event already exists",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const newEvent = new EventModel({
        event_name,
        description,
        image,
        date,
        time,
        venue,
        questions,
        send_email,
        email_template,
        faq,
        timeline,
        sponsers,
        prizes,
        problem_statements,
        team_size,
        teams,
        event_admin,
        event_username,
        autoVerify,
    });


    
    await newEvent.save();

    existingUser.events_created.push(newEvent._id as any);


    await existingUser.save();

    return NextResponse.json(
      {
        message: "Event added successfully",
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

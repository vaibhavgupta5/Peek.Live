import UserModel from "@/Models/User";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const onBoardDetails = z.object({
  contact_number: z.string(),
  linkedin: z.string(),
  github: z.string(),
  college: z.string(),
  bio: z.string(),
  description: z.string(),
  stack: z.array(z.string()),
  gender: z.string(),
  portfolio: z.string().url(),
  username: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { contact_number, linkedin, github, college, bio, description, stack, portfolio, gender, username} = onBoardDetails.parse(body);
 
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
    
      existingUser.contact_number = contact_number;
      existingUser.linkedin = linkedin;
      existingUser.github = github;
      existingUser.college = college;
      existingUser.bio = bio;
      existingUser.description = description;
      existingUser.stack = stack;
      existingUser.portfolio = portfolio;
      existingUser.gender = gender;
      existingUser.stack = stack;
   
    

    await existingUser.save();

    return NextResponse.json(
      {
        message: "User updated successfully",
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

import UserModel from "@/Models/User";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const onBoardDetails = z.object({
  contact_number: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  college: z.string().optional(),
  bio: z.string().optional(),
  description: z.string().optional(),
  stack: z.array(z.string()).optional(),
  gender: z.string().optional(),

  portfolio: z.string().optional(),
  email: z.string(),
});



export async function POST(req: NextRequest) {
  const body = await req.json();

  const { contact_number, linkedin, github, college, bio, description, stack, portfolio, gender, email} = onBoardDetails.parse(body);
 
  connectDB();


  try {
    const existingUser = await UserModel.findOne({ email });

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
    
      existingUser.contact_number = contact_number || "";
      existingUser.linkedin = linkedin || "";
      existingUser.github = github || "";
      existingUser.college = college || "";
      existingUser.bio = bio || "";
      existingUser.description = description || "";
      existingUser.stack = stack || [];
      existingUser.portfolio = portfolio || "";
      existingUser.gender = gender || "";
   
    


    await existingUser.save();
    console.log("doneeeee")
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

import UserModel from "@/Models/User";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const addUser = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { firstName, lastName, email } = addUser.parse(body);

  console.log(firstName, lastName, email);

  connectDB();


  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
          success: false,
        },
        {
          status: 400,
        }
      );
    }
    
    const name = firstName + " " + lastName;

    const randomNum = Math.floor(Math.random() * 10000);
    const username = `${name.toLowerCase().replace(/\s+/g, "")}${randomNum}`;


    const newUser = new UserModel({
      name,
      email,
      username,
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: "User added successfully",
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

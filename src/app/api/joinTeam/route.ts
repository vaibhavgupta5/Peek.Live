import TeamModel from "@/Models/Team";
import UserModel from "@/Models/User";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const joinTeam = z.object({
  teamCode: z.string(),
  username: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { teamCode, username } = joinTeam.parse(body);

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

  


    const existingTeam = await TeamModel.findOne({
      teamCode
    });

    if (!existingTeam) {
      return NextResponse.json(
        {
          message: "Team not exist",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    
    const isUserInTeam = existingTeam.team_members.some(
        (member) => member.member_username === username
      );
  
      if (isUserInTeam) {
        return NextResponse.json(
          {
            message: "User is already in the team",
            success: false,
          },
          {
            status: 400,
          }
        );
      }
    


      existingTeam.team_members.push({
        member_username: username,
        isVerified: false,
        isLeader: false,
      });

    await existingTeam.save();

    

    return NextResponse.json(
      {
        message: "Team Joined successfully",
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

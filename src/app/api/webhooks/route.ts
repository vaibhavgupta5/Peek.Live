import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { connectDB } from '@/utils/connectDB'
import UserModel from '@/Models/User'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type
  if (eventType === 'user.created' || eventType === 'user.updated') {
    connectDB();
    const { email_addresses, first_name, last_name } = evt.data

    try {   

const email = email_addresses[0].email_address
const firstName = first_name
const lastName = last_name
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

    } catch (error) {
      console.error('Error: Could not verify webhook:', error)
      return new Response('Error: Verification error', {
        status: 400,
      })
    }


  }

  if (eventType === 'session.created') {
    connectDB();
    const { user_id } = evt.data

    const user = await clerkClient.users.getUser(user_id);


    try {   

      const email = user.emailAddresses[0].emailAddress;

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
      
      const name = user.firstName + " " + user.lastName;
  
      const randomNum = Math.floor(Math.random() * 10000);
      const username = `${name.toLowerCase().replace(/\s+/g, "")}${randomNum}`;
  
  
      const newUser = new UserModel({
        name,
        email,
        username,
      });
  
      await newUser.save();

    } catch (error) {
      console.error('Error: Could not verify webhook:', error)
      return new Response('Error: Verification error', {
        status: 400,
      })
    }


  }
  console.log(`Received webhook with ID ${svix_id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)
  console.log(evt.data)

  return new Response('Webhook received', { status: 200 })
}
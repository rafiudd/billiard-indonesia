import { Prisma } from '@prisma/client'
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    const req = await request.json()
    const {
      password,
      email
    } = req

    const data = await prisma.users.findFirst({ where: { email, password } });

    if(data) {
      cookies().set('isLogin', 'true');
      cookies().set('id', data.id)

      return NextResponse.json({
        success: true
      })
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.code })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
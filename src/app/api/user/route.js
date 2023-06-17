import { Prisma } from '@prisma/client'
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.json()
    const {
      fullname,
      phone,
      email,
      password
    } = req

    await prisma.users.create({
      data: {
        fullname,
        phone,
        email,
        password
      }
    })
  
    return NextResponse.json({
      success: true
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.code })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


export async function PUT(request) {
  try {
    const req = await request.json()
    const {
      id,
      fullname,
      phone,
      email
    } = req

    const data = {
      fullname,
      phone,
      email,
    }
  
    await prisma.users.update({
      where: {
        id
      },
      data
    })
  
    return NextResponse.json({
      success: true
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.code })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
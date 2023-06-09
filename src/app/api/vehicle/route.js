import { Prisma } from '@prisma/client'
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.json()
    const { number_plate, category } = req
  
    await prisma.vehicle.create({
      data: {
        number_plate,
        category,
      }
    })
  
    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.code })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
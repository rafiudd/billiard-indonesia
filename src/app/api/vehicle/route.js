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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.code })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const req = await request.json()
    const {
      id,
      payment,
      status,
      fee,
      exit_time,
    } = req

    if (status === 'PAID') {
      return NextResponse.json({
        success: false,
        message: 'sudah bayar'
      }, { status: 409 })
    }

    const data = {
      exit_time,
      fee,
      payment,
      status: 'PAID'
    }
  
    await prisma.vehicle.update({
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

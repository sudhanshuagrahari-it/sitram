import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  const { name, mobile, answers, score } = data;
  try {
    const attempt = await prisma.quizAttempt.create({
      data: {
        name,
        mobile,
        answers,
        score,
      },
    });
    return NextResponse.json({ success: true, attempt });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

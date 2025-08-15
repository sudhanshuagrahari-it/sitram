import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, OrderItem } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get user info from query (mobile is unique)
    const { searchParams } = new URL(req.url);
    const mobile = searchParams.get('mobile');
    if (!mobile) return NextResponse.json({ error: 'Missing mobile' }, { status: 400 });

    // Cart items (OrderItems for this user)
    const user = await prisma.user.findUnique({ where: { mobile } });
    let cartItems: OrderItem[] = [];
    if (user) {
      const orders = await prisma.order.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' }, include: { items: true } });
      cartItems = orders.flatMap(order => order.items);
    }

    // Bhagavad Gita registration
    const gitaRegs = await prisma.bhagavadGitaRegistration.findMany({ where: { mobile } });

    // Quiz progress and scores
    const progresses = await prisma.progress.findMany({ where: { userId: user?.id } });
    const attempts = await prisma.quizAttempt.findMany({ where: { userId: user?.id } });

    return NextResponse.json({
      cartItems,
      gitaRegs,
      progresses,
      attempts,
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: 'Server error', details: errorMessage }, { status: 500 });
  }
}

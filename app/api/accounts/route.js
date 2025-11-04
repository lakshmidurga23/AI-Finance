import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';
import aj from '@/lib/arcjet'; // ✅ from our lightweight arcjet setup

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    // ✅ Optional Arcjet protection
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      return NextResponse.json({ error: 'Blocked by Arcjet' }, { status: 403 });
    }

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const serializedAccounts = accounts.map(a => ({
      ...a,
      balance: a.balance.toNumber(),
    }));

    return NextResponse.json({ accounts: serializedAccounts });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { auth } from '@/auth';
import { db } from '@/db';
import { userSubscriptions } from '@/db/schema';
import { stripe } from '@/lib/stripe';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_BASE_URL as string;

export const GET = async () => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const { user } = session;

    const _userSubscriptions = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, user.id!));
    if (_userSubscriptions[0] && _userSubscriptions[0].stripeCustomerId) {
      // trying to cancel at the billing portal
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: _userSubscriptions[0].stripeCustomerId,
        return_url: `${BASE_URL}/`,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    // user's first time trying to subscribe
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${BASE_URL}/`,
      cancel_url: `${BASE_URL}/`,
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email!,
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'ChatPDF Pro',
              description: 'Unlimited PDF sessions!',
            },
            unit_amount: 2000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id!,
      },
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log('stripe error', error);
    return new NextResponse('internal server error', { status: 500 });
  }
};

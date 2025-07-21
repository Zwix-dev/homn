import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01',
});

export async function POST(request: Request) {
  try {
    const { customer_email, items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items found' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.price_data.product_data.name,
            images: item.price_data.product_data.images,
          },
          unit_amount: item.price_data.unit_amount,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      customer_email,
      success_url: `${request.headers.get("origin")}/order?success=true`,
      cancel_url: `${request.headers.get("origin")}/order?canceled=true`, // Redirection 
      });

      return NextResponse.json({ id: session.id });
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      return NextResponse.json(
        { error: 'Server error while creating session' },
        { status: 500 }
      );
    }
  }
// pages/api/webhooks/order-status.ts ou app/api/webhooks/order-status/route.ts
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { orderId, newStatus, userEmail } = await request.json();
    
    if (newStatus === 'Expédié') {
      await resend.emails.send({
        from: 'noreply@votre-site.com',
        to: userEmail,
        subject: 'Votre commande a été expédiée !',
        html: `
          <h2>Bonne nouvelle !</h2>
          <p>Votre commande #${orderId} a été expédiée.</p>
          <p>Vous recevrez bientôt le numéro de suivi.</p>
        `
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur webhook:', error);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
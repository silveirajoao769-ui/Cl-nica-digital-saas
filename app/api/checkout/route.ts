import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

const schema = z.object({
  appointmentId: z.string(),
  method: z.enum(["CREDIT_CARD", "PIX"]),
  installmentsCount: z.number().min(1).max(12).default(1)
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "PATIENT") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
  const { appointmentId, method, installmentsCount } = parsed.data;

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { service: true, clinic: true }
  });
  if (!appointment) return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
  if (appointment.patientId !== (session.user as any).id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const amount = Number(appointment.service.price);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: method === "PIX" ? ["pix"] : ["card"],
    line_items: [
      {
        price_data: {
          currency: "brl",
          unit_amount: Math.round(amount * 100),
          product_data: {
            name: ${appointment.service.name} — ${appointment.clinic.name}
          }
        },
        quantity: 1
      }
    ],
    metadata: {
      appointmentId: appointment.id,
      installmentsCount: String(installmentsCount),
      method
    },
    success_url: ${process.env.NEXT_PUBLIC_APP_URL}/${appointment.clinic.slug}/pagamento/sucesso?appointmentId=${appointment.id},
    cancel_url: ${process.env.NEXT_PUBLIC_APP_URL}/${appointment.clinic.slug}/agendar?canceled=1
  });

  await prisma.payment.upsert({
    where: { appointmentId: appointment.id },
    create: {
      appointmentId: appointment.id,
      amount,
      method,
      status: "PENDING",
      stripeCheckoutSessionId: checkoutSession.id,
      installmentsCount
    },
    update: {
      status: "PENDING",
      stripeCheckoutSessionId: checkoutSession.id,
      method,
      installmentsCount
    }
  });

  return NextResponse.json({ url: checkoutSession.url });
}

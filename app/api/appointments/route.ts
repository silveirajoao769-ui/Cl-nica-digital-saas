import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  clinicSlug: z.string(),
  serviceId: z.string(),
  professionalId: z.string(),
  datetime: z.string() // ISO
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "PATIENT") {
    return NextResponse.json({ error: "É necessário estar logado como paciente" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const { clinicSlug, serviceId, professionalId, datetime } = parsed.data;

  const clinic = await prisma.clinic.findUnique({ where: { slug: clinicSlug } });
  if (!clinic) return NextResponse.json({ error: "Clínica não encontrada" }, { status: 404 });

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) return NextResponse.json({ error: "Serviço não encontrado" }, { status: 404 });

  const appointment = await prisma.appointment.create({
    data: {
      clinicId: clinic.id,
      patientId: (session.user as any).id,
      professionalId,
      serviceId,
      datetime: new Date(datetime),
      status: "PENDING_PAYMENT"
    }
  });

  return NextResponse.json({ appointmentId: appointment.id });
}

// Lista os agendamentos do próprio paciente logado
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "PATIENT") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const appointments = await prisma.appointment.findMany({
    where: { patientId: (session.user as any).id },
    include: { service: true, professional: { include: { user: true } }, payment: true, clinic: true },
    orderBy: { datetime: "desc" }
  });

  return NextResponse.json({ appointments });
}

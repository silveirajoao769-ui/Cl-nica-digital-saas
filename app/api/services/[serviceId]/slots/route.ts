import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAvailableSlots } from "@/lib/schedule";

export async function GET(req: NextRequest, { params }: { params: { serviceId: string } }) {
  const { searchParams } = new URL(req.url);
  const professionalId = searchParams.get("professionalId");
  const dateStr = searchParams.get("date");

  const service = await prisma.service.findUnique({
    where: { id: params.serviceId },
    include: { professionals: { where: { active: true } } }
  });

  if (!service) {
    return NextResponse.json({ error: "Serviço não encontrado" }, { status: 404 });
  }

  if (!professionalId) {
    return NextResponse.json({ professionals: service.professionals });
  }

  if (!dateStr) {
    return NextResponse.json({ error: "Parâmetro 'date' é obrigatório" }, { status: 400 });
  }

  const date = new Date(${dateStr}T00:00:00);
  const slots = await getAvailableSlots(professionalId, date, service.durationMinutes);

  return NextResponse.json({ slots });
}

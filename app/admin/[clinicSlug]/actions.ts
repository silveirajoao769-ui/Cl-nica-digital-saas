"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireClinicStaff(clinicSlug: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!session || !["CLINIC_ADMIN", "PROFESSIONAL"].includes(user.role) || user.clinicSlug !== clinicSlug) {
    throw new Error("Não autorizado");
  }
  return user;
}

export async function updateAppointmentStatus(clinicSlug: string, appointmentId: string, status: string) {
  await requireClinicStaff(clinicSlug);
  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: status as any }
  });
  revalidatePath(`/admin/${clinicSlug}/agendamentos`);
}

export async function createService(
  clinicSlug: string,
  data: { name: string; description: string; price: number; durationMinutes: number }
) {
  const user = await requireClinicStaff(clinicSlug);
  await prisma.service.create({
    data: {
      clinicId: user.clinicId,
      name: data.name,
      description: data.description,
      price: data.price,
      durationMinutes: data.durationMinutes
    }
  });
  revalidatePath(`/admin/${clinicSlug}/servicos`);
}

export async function addMedicalRecordNote(clinicSlug: string, appointmentId: string, notes: string) {
  const user = await requireClinicStaff(clinicSlug);

  const appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });
  if (!appointment || appointment.clinicId !== user.clinicId) throw new Error("Agendamento inválido");

  await prisma.medicalRecord.upsert({
    where: { appointmentId },
    create: {
      clinicId: user.clinicId,
      patientId: appointment.patientId,
      appointmentId,
      notes
    },
    update: { notes }
  });
  revalidatePath(`/admin/${clinicSlug}/prontuarios`);
}

export async function markInstallmentPaid(clinicSlug: string, installmentId: string) {
  await requireClinicStaff(clinicSlug);
  await prisma.installment.update({ where: { id: installmentId }, data: { status: "PAID" } });
  revalidatePath(`/admin/${clinicSlug}/financeiro`);
}

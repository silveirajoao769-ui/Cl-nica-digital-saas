import { prisma } from "./prisma";
import { addMinutes, format, isBefore, isEqual, setHours, setMinutes, startOfDay } from "date-fns";

/**
 * Gera os horários disponíveis de um profissional em uma data específica,
 * cruzando a disponibilidade recorrente (Availability) com os agendamentos
 * já existentes (Appointment) que ainda não foram cancelados.
 */
export async function getAvailableSlots(professionalId: string, date: Date, serviceDurationMinutes: number) {
  const weekday = date.getDay();

  const availabilities = await prisma.availability.findMany({
    where: { professionalId, weekday }
  });

  if (availabilities.length === 0) return [];

  const dayStart = startOfDay(date);
  const dayEnd = addMinutes(dayStart, 24 * 60 - 1);

  const existingAppointments = await prisma.appointment.findMany({
    where: {
      professionalId,
      datetime: { gte: dayStart, lte: dayEnd },
      status: { notIn: ["CANCELED"] }
    },
    include: { service: true }
  });

  const slots: string[] = [];

  for (const av of availabilities) {
    const [startH, startM] = av.startTime.split(":").map(Number);
    const [endH, endM] = av.endTime.split(":").map(Number);

    let cursor = setMinutes(setHours(dayStart, startH), startM);
    const end = setMinutes(setHours(dayStart, endH), endM);

    while (isBefore(addMinutes(cursor, serviceDurationMinutes), end) || isEqual(addMinutes(cursor, serviceDurationMinutes), end)) {
      const slotEnd = addMinutes(cursor, serviceDurationMinutes);

      const conflict = existingAppointments.some((appt) => {
        const apptEnd = addMinutes(appt.datetime, appt.service.durationMinutes);
        return isBefore(cursor, apptEnd) && isBefore(appt.datetime, slotEnd);
      });

      if (!conflict && cursor.getTime() > Date.now()) {
        slots.push(format(cursor, "HH:mm"));
      }

      cursor = addMinutes(cursor, av.slotMinutes);
    }
  }

  return slots;
}

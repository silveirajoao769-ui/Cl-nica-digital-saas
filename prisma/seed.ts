import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("senha123", 10);

  const clinic = await prisma.clinic.create({
    data: {
      name: "Clínica Sorriso & Bem-Estar",
      slug: "sorriso-bem-estar",
      specialty: "Odontologia e Psicologia",
      phone: "(48) 99999-0000",
      address: "Rua Exemplo, 123 - Meleiro/SC"
    }
  });

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin da Clínica",
      email: "admin@clinica.com",
      passwordHash,
      role: "CLINIC_ADMIN",
      clinicId: clinic.id
    }
  });

  const dentistaUser = await prisma.user.create({
    data: {
      name: "Dra. Ana Souza",
      email: "ana@clinica.com",
      passwordHash,
      role: "PROFESSIONAL",
      clinicId: clinic.id
    }
  });

  const dentista = await prisma.professional.create({
    data: {
      userId: dentistaUser.id,
      clinicId: clinic.id,
      specialty: "Dentista",
      commissionPercent: 70
    }
  });

  const psicologaUser = await prisma.user.create({
    data: {
      name: "Dra. Carla Lima",
      email: "carla@clinica.com",
      passwordHash,
      role: "PROFESSIONAL",
      clinicId: clinic.id
    }
  });

  const psicologa = await prisma.professional.create({
    data: {
      userId: psicologaUser.id,
      clinicId: clinic.id,
      specialty: "Psicóloga",
      commissionPercent: 75
    }
  });

  const limpeza = await prisma.service.create({
    data: {
      clinicId: clinic.id,
      name: "Limpeza dental",
      description: "Profilaxia e remoção de tártaro",
      price: 150,
      durationMinutes: 40,
      professionals: { connect: [{ id: dentista.id }] }
    }
  });

  const consultaPsi = await prisma.service.create({
    data: {
      clinicId: clinic.id,
      name: "Sessão de psicoterapia",
      description: "Atendimento individual, 50 minutos",
      price: 180,
      durationMinutes: 50,
      professionals: { connect: [{ id: psicologa.id }] }
    }
  });

  // Disponibilidade: segunda a sexta, 08h-18h, slots de 30/50min
  for (let weekday = 1; weekday <= 5; weekday++) {
    await prisma.availability.create({
      data: { professionalId: dentista.id, weekday, startTime: "08:00", endTime: "18:00", slotMinutes: 40 }
    });
    await prisma.availability.create({
      data: { professionalId: psicologa.id, weekday, startTime: "09:00", endTime: "17:00", slotMinutes: 50 }
    });
  }

  await prisma.insurance.createMany({
    data: [
      { clinicId: clinic.id, name: "Unimed", reimbursementPercent: 80 },
      { clinicId: clinic.id, name: "Bradesco Saúde", reimbursementPercent: 70 }
    ]
  });

  const pacienteUser = await prisma.user.create({
    data: {
      name: "João Paciente",
      email: "paciente@teste.com",
      passwordHash,
      role: "PATIENT"
    }
  });

  console.log("Seed concluído!");
  console.log("Login admin: admin@clinica.com / senha123");
  console.log("Login profissional: ana@clinica.com / senha123");
  console.log("Login paciente: paciente@teste.com / senha123");
  console.log(`URL da clínica: /${clinic.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

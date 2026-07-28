import { prisma } from "@/lib/prisma";
import { startOfDay, startOfWeek, startOfMonth } from "date-fns";
import RevenueChart from "@/components/RevenueChart";

export default async function DashboardPage({ params }: { params: { clinicSlug: string } }) {
  const clinic = await prisma.clinic.findUnique({ where: { slug: params.clinicSlug } });
  if (!clinic) return <p>Clínica não encontrada.</p>;

  const now = new Date();
  const dayStart = startOfDay(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const monthStart = startOfMonth(now);

  const [countDay, countWeek, countMonth, payments, professionals] = await Promise.all([
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: dayStart } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: weekStart } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart } } }),
    prisma.payment.findMany({
      where: { status: "PAID", appointment: { clinicId: clinic.id } },
      include: { appointment: { include: { professional: { include: { user: true } } } } }
    }),
    prisma.professional.findMany({ where: { clinicId: clinic.id }, include: { user: true } })
  ]);

  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  const revenueByProfessional = professionals.map((prof) => {
    const total = payments
      .filter((p) => p.appointment.professional.id === prof.id)
      .reduce((sum, p) => sum + Number(p.amount), 0);
    return { name: prof.user.name, total };
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Dashboard — {clinic.name}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <p className="text-sm text-gray-500">Agendamentos hoje</p>
          <p className="text-2xl font-bold">{countDay}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Nesta semana</p>
          <p className="text-2xl font-bold">{countWeek}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Neste mês</p>
          <p className="text-2xl font-bold">{countMonth}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Faturamento total</p>
          <p className="text-2xl font-bold text-primary">
            {totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
      </div>

      <div className="card">
        <p className="font-medium mb-3">Faturamento por profissional</p>
        <RevenueChart data={revenueByProfessional} />
      </div>
    </div>
  );
}

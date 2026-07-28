import { prisma } from "@/lib/prisma";
import { markInstallmentPaid } from "../actions";

export default async function FinancialPage({ params }: { params: { clinicSlug: string } }) {
  const clinic = await prisma.clinic.findUnique({ where: { slug: params.clinicSlug } });
  if (!clinic) return <p>Clínica não encontrada.</p>;

  const [installments, insurances, professionals] = await Promise.all([
    prisma.installment.findMany({
      where: { payment: { appointment: { clinicId: clinic.id } } },
      include: {
        payment: { include: { appointment: { include: { patient: true, service: true } } } }
      },
      orderBy: { dueDate: "asc" },
      take: 100
    }),
    prisma.insurance.findMany({ where: { clinicId: clinic.id } }),
    prisma.professional.findMany({
      where: { clinicId: clinic.id },
      include: {
        user: true,
        appointments: {
          where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
          include: { service: true, payment: true }
        }
      }
    })
  ]);

  const payouts = professionals.map((prof) => {
    const gross = prof.appointments.reduce(
      (sum, a) => sum + (a.payment?.status === "PAID" ? Number(a.payment.amount) : 0),
      0
    );
    const commission = gross * (prof.commissionPercent / 100);
    return { name: prof.user.name, gross, commission, clinicShare: gross - commission };
  });

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Financeiro</h1>

      <section>
        <h2 className="font-semibold mb-3">Controle de parcelas</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 pr-4">Paciente</th>
                <th className="py-2 pr-4">Serviço</th>
                <th className="py-2 pr-4">Parcela</th>
                <th className="py-2 pr-4">Vencimento</th>
                <th className="py-2 pr-4">Valor</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Ação</th>
              </tr>
            </thead>
            <tbody>
              {installments.map((i) => (
                <tr key={i.id} className="border-b last:border-0">
                  <td className="py-2 pr-4">{i.payment.appointment.patient.name}</td>
                  <td className="py-2 pr-4">{i.payment.appointment.service.name}</td>
                  <td className="py-2 pr-4">{i.number}</td>
                  <td className="py-2 pr-4">{new Date(i.dueDate).toLocaleDateString("pt-BR")}</td>
                  <td className="py-2 pr-4">
                    {Number(i.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </td>
                  <td className="py-2 pr-4">{i.status}</td>
                  <td className="py-2 pr-4">
                    {i.status !== "PAID" && (
                      <form
                        action={async () => {
                          "use server";
                          await markInstallmentPaid(params.clinicSlug, i.id);
                        }}
                      >
                        <button className="text-xs text-primary underline">Marcar como paga</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Convênios</h2>
        <div className="card">
          {insurances.length === 0 && <p className="text-sm text-gray-500">Nenhum convênio cadastrado.</p>}
          <ul className="text-sm space-y-1">
            {insurances.map((ins) => (
              <li key={ins.id} className="flex justify-between">
                <span>{ins.name}</span>
                <span className="text-gray-500">{ins.reimbursementPercent}% de reembolso</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Repasse por profissional</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 pr-4">Profissional</th>
                <th className="py-2 pr-4">Faturamento bruto</th>
                <th className="py-2 pr-4">Repasse ao profissional</th>
                <th className="py-2 pr-4">Fica com a clínica</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.name} className="border-b last:border-0">
                  <td className="py-2 pr-4">{p.name}</td>
                  <td className="py-2 pr-4">
                    {p.gross.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </td>
                  <td className="py-2 pr-4 text-primary font-medium">
                    {p.commission.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </td>
                  <td className="py-2 pr-4">
                    {p.clinicShare.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

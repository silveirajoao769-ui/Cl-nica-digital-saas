import { prisma } from "@/lib/prisma";
import { updateAppointmentStatus } from "../actions";

const statusLabel: Record<string, string> = {
  PENDING_PAYMENT: "Aguardando pagamento",
  CONFIRMED: "Confirmado",
  CANCELED: "Cancelado",
  COMPLETED: "Concluído",
  NO_SHOW: "Não compareceu"
};

export default async function AppointmentsAdminPage({ params }: { params: { clinicSlug: string } }) {
  const clinic = await prisma.clinic.findUnique({ where: { slug: params.clinicSlug } });
  if (!clinic) return <p>Clínica não encontrada.</p>;

  const appointments = await prisma.appointment.findMany({
    where: { clinicId: clinic.id },
    include: { patient: true, service: true, professional: { include: { user: true } }, payment: true },
    orderBy: { datetime: "desc" },
    take: 100
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Agendamentos</h1>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 pr-4">Data</th>
              <th className="py-2 pr-4">Paciente</th>
              <th className="py-2 pr-4">Serviço</th>
              <th className="py-2 pr-4">Profissional</th>
              <th className="py-2 pr-4">Valor</th>
              <th className="py-2 pr-4">Pagamento</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Ação</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b last:border-0">
                <td className="py-2 pr-4 whitespace-nowrap">{new Date(a.datetime).toLocaleString("pt-BR")}</td>
                <td className="py-2 pr-4">{a.patient.name}</td>
                <td className="py-2 pr-4">{a.service.name}</td>
                <td className="py-2 pr-4">{a.professional.user.name}</td>
                <td className="py-2 pr-4">
                  {Number(a.service.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </td>
                <td className="py-2 pr-4">{a.payment?.status ?? "-"}</td>
                <td className="py-2 pr-4">{statusLabel[a.status]}</td>
                <td className="py-2 pr-4">
                  <form
                    action={async (formData: FormData) => {
                      "use server";
                      await updateAppointmentStatus(
                        params.clinicSlug,
                        a.id,
                        formData.get("status") as string
                      );
                    }}
                    className="flex gap-2"
                  >
                    <select name="status" defaultValue={a.status} className="border rounded px-2 py-1 text-xs">
                      {Object.entries(statusLabel).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <button className="text-xs text-primary underline">Salvar</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

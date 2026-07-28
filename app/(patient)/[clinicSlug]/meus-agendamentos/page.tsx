"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const statusLabel: Record<string, string> = {
  PENDING_PAYMENT: "Aguardando pagamento",
  CONFIRMED: "Confirmado",
  CANCELED: "Cancelado",
  COMPLETED: "Concluído",
  NO_SHOW: "Não compareceu"
};

const statusColor: Record<string, string> = {
  PENDING_PAYMENT: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELED: "bg-red-100 text-red-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  NO_SHOW: "bg-gray-100 text-gray-700"
};

export default function MyAppointmentsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") {
      fetch("/api/appointments")
        .then((r) => r.json())
        .then((d) => setAppointments(d.appointments || []));
    }
  }, [status, router]);

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Meus agendamentos</h1>
      <div className="space-y-3">
        {appointments.length === 0 && <p className="text-sm text-gray-500">Nenhum agendamento ainda.</p>}
        {appointments.map((a) => (
          <div key={a.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{a.service.name}</p>
                <p className="text-sm text-gray-500">
                  {a.clinic.name} — {a.professional.user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(a.datetime).toLocaleString("pt-BR")}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${statusColor[a.status]}`}>
                {statusLabel[a.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

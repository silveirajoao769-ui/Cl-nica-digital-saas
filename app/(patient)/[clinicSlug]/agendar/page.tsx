"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Professional = { id: string; specialty: string; user: { name: string } };

export default function BookingPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const serviceId = searchParams.get("serviceId") || "";
  const clinicSlug = params.clinicSlug as string;

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [professionalId, setProfessionalId] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [method, setMethod] = useState<"CREDIT_CARD" | "PIX">("PIX");
  const [installments, setInstallments] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!serviceId) return;
    fetch(`/api/services/${serviceId}/slots`)
      .then((r) => r.json())
      .then((data) => setProfessionals(data.professionals || []));
  }, [serviceId]);

  useEffect(() => {
    if (!professionalId || !date) return;
    fetch(`/api/services/${serviceId}/slots?professionalId=${professionalId}&date=${date}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots || []));
  }, [professionalId, date, serviceId]);

  async function handleConfirm() {
    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=/${clinicSlug}/agendar?serviceId=${serviceId}`);
      return;
    }
    setLoading(true);
    setError("");

    const datetime = new Date(`${date}T${selectedTime}:00`).toISOString();

    const apptRes = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clinicSlug, serviceId, professionalId, datetime })
    });
    const apptData = await apptRes.json();

    if (!apptRes.ok) {
      setError(apptData.error || "Erro ao criar agendamento");
      setLoading(false);
      return;
    }

    const checkoutRes = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appointmentId: apptData.appointmentId,
        method,
        installmentsCount: method === "CREDIT_CARD" ? installments : 1
      })
    });
    const checkoutData = await checkoutRes.json();

    if (!checkoutRes.ok) {
      setError(checkoutData.error || "Erro ao iniciar pagamento");
      setLoading(false);
      return;
    }

    window.location.href = checkoutData.url;
  }

  return (
    <main className="min-h-screen max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Agendar horário</h1>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Profissional</label>
          <select
            className="input"
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
          >
            <option value="">Selecione</option>
            {professionals.map((p) => (
              <option key={p.id} value={p.id}>
                {p.user.name} — {p.specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Data</label>
          <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        {slots.length > 0 && (
          <div>
            <label className="text-sm font-medium">Horário</label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedTime(s)}
                  className={`text-sm py-2 rounded-lg border ${
                    selectedTime === s ? "bg-primary text-white border-primary" : "border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {date && slots.length === 0 && professionalId && (
          <p className="text-sm text-gray-500">Nenhum horário disponível neste dia.</p>
        )}

        <div>
          <label className="text-sm font-medium">Forma de pagamento</label>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setMethod("PIX")}
              className={`flex-1 py-2 rounded-lg border text-sm ${method === "PIX" ? "bg-primary text-white border-primary" : "border-gray-300"}`}
            >
              Pix
            </button>
            <button
              onClick={() => setMethod("CREDIT_CARD")}
              className={`flex-1 py-2 rounded-lg border text-sm ${method === "CREDIT_CARD" ? "bg-primary text-white border-primary" : "border-gray-300"}`}
            >
              Cartão
            </button>
          </div>
        </div>

        {method === "CREDIT_CARD" && (
          <div>
            <label className="text-sm font-medium">Parcelas</label>
            <select
              className="input"
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}x
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          className="btn-primary w-full"
          disabled={!professionalId || !date || !selectedTime || loading}
          onClick={handleConfirm}
        >
          {loading ? "Processando..." : "Confirmar e pagar"}
        </button>
      </div>
    </main>
  );
}

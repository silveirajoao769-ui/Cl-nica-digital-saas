import Link from "next/link";

export default function PaymentSuccessPage({ params }: { params: { clinicSlug: string } }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Pagamento confirmado! 🎉</h1>
      <p className="text-gray-600 mb-6">Seu agendamento foi confirmado com sucesso.</p>
      <Link href={`/${params.clinicSlug}/meus-agendamentos`} className="btn-primary">
        Ver meus agendamentos
      </Link>
    </main>
  );
}

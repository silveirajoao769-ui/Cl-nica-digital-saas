import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold mb-3">Clínica Digital</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Plataforma de agendamento, pagamento online e gestão para clínicas e consultórios de
        qualquer especialidade.
      </p>
      <div className="flex gap-3">
        <Link href="/login" className="btn-primary">
          Entrar
        </Link>
      </div>
      <p className="text-sm text-gray-400 mt-10">
        Acesse a página da sua clínica em <code>/nome-da-clinica</code>
      </p>
    </main>
  );
}

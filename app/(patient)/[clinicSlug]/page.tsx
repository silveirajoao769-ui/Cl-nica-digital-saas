import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ClinicServicesPage({ params }: { params: { clinicSlug: string } }) {
  const clinic = await prisma.clinic.findUnique({
    where: { slug: params.clinicSlug },
    include: { services: { where: { active: true } } }
  });

  if (!clinic) notFound();

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{clinic.name}</h1>
        {clinic.specialty && <p className="text-gray-500">{clinic.specialty}</p>}
        <div className="mt-2 flex gap-3 text-sm">
          <Link href={`/${clinic.slug}/meus-agendamentos`} className="text-primary underline">
            Meus agendamentos
          </Link>
        </div>
      </header>

      <h2 className="text-lg font-semibold mb-3">Serviços disponíveis</h2>
      <div className="space-y-3">
        {clinic.services.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhum serviço cadastrado ainda.</p>
        )}
        {clinic.services.map((service) => (
          <div key={service.id} className="card flex items-center justify-between">
            <div>
              <p className="font-medium">{service.name}</p>
              {service.description && (
                <p className="text-sm text-gray-500">{service.description}</p>
              )}
              <p className="text-sm text-gray-400">{service.durationMinutes} min</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary">
                {Number(service.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </p>
              <Link
                href={`/${clinic.slug}/agendar?serviceId=${service.id}`}
                className="btn-primary text-sm mt-2 inline-block"
              >
                Agendar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

import { prisma } from "@/lib/prisma";
import { createService } from "../actions";

export default async function ServicesAdminPage({ params }: { params: { clinicSlug: string } }) {
  const clinic = await prisma.clinic.findUnique({ where: { slug: params.clinicSlug } });
  if (!clinic) return <p>Clínica não encontrada.</p>;

  const services = await prisma.service.findMany({ where: { clinicId: clinic.id } });

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Serviços</h1>

      <div className="card">
        <div className="space-y-2 divide-y">
          {services.map((s) => (
            <div key={s.id} className="flex justify-between py-2">
              <span>{s.name}</span>
              <span className="text-gray-500">
                {Number(s.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="font-medium mb-3">Novo serviço</p>
        <form
          action={async (formData: FormData) => {
            "use server";
            await createService(params.clinicSlug, {
              name: String(formData.get("name")),
              description: String(formData.get("description") || ""),
              price: Number(formData.get("price")),
              durationMinutes: Number(formData.get("durationMinutes"))
            });
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <input name="name" placeholder="Nome do serviço" className="input" required />
          <input name="price" type="number" step="0.01" placeholder="Valor (R$)" className="input" required />
          <input name="durationMinutes" type="number" placeholder="Duração (min)" className="input" required />
          <input name="description" placeholder="Descrição (opcional)" className="input" />
          <button className="btn-primary md:col-span-2">Adicionar serviço</button>
        </form>
      </div>
    </div>
  );
}

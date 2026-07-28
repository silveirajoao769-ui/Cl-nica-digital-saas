import { prisma } from "@/lib/prisma";
import { addMedicalRecordNote } from "../actions";

export default async function MedicalRecordsPage({ params }: { params: { clinicSlug: string } }) {
  const clinic = await prisma.clinic.findUnique({ where: { slug: params.clinicSlug } });
  if (!clinic) return <p>Clínica não encontrada.</p>;

  const appointments = await prisma.appointment.findMany({
    where: { clinicId: clinic.id, status: { in: ["CONFIRMED", "COMPLETED"] } },
    include: { patient: true, service: true, medicalRecord: true },
    orderBy: { datetime: "desc" },
    take: 50
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Prontuários</h1>
      <div className="space-y-4">
        {appointments.map((a) => (
          <div key={a.id} className="card">
            <div className="flex justify-between mb-2">
              <div>
                <p className="font-medium">{a.patient.name}</p>
                <p className="text-sm text-gray-500">
                  {a.service.name} — {new Date(a.datetime).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            <form
              action={async (formData: FormData) => {
                "use server";
                await addMedicalRecordNote(params.clinicSlug, a.id, String(formData.get("notes") || ""));
              }}
              className="space-y-2"
            >
              <textarea
                name="notes"
                defaultValue={a.medicalRecord?.notes || ""}
                placeholder="Anotações clínicas, evolução, observações..."
                className="input min-h-[80px]"
              />
              <button className="btn-primary text-sm">Salvar anotação</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

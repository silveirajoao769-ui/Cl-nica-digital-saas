import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { clinicSlug: string };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || !["CLINIC_ADMIN", "PROFESSIONAL"].includes(user.role) || user.clinicSlug !== params.clinicSlug) {
    redirect("/login");
  }

  const nav = [
    { href: `/admin/${params.clinicSlug}/dashboard`, label: "Dashboard" },
    { href: `/admin/${params.clinicSlug}/agendamentos`, label: "Agendamentos" },
    { href: `/admin/${params.clinicSlug}/financeiro`, label: "Financeiro" },
    { href: `/admin/${params.clinicSlug}/prontuarios`, label: "Prontuários" },
    { href: `/admin/${params.clinicSlug}/servicos`, label: "Serviços" }
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-white border-r border-gray-100 px-4 py-6 hidden md:block">
        <p className="font-bold mb-6">Painel da Clínica</p>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm text-gray-600 hover:bg-primary-light hover:text-primary rounded-lg px-3 py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <header className="md:hidden border-b border-gray-100 bg-white px-4 py-3 flex gap-3 overflow-x-auto">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-gray-600 whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

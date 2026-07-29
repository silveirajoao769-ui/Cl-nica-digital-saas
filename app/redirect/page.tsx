import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = session.user as any;

  if (user.role === "CLINIC_ADMIN" || user.role === "PROFESSIONAL") {
    redirect("/admin/" + user.clinicSlug + "/dashboard");
  }

  if (user.role === "PATIENT") {
    redirect("/");
  }

  redirect("/login");
}

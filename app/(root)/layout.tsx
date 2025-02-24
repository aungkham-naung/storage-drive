import { Toaster } from "@/components/ui/toaster";

import React from "react";
import Sidebar from "../components/Sidebar";
import MobileNavigation from "../components/MobileNavigation";
import Header from "../components/Header";
import { getCurrentUser } from "../../lib/actions/user.actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");
  const { fullName, email, avatar } = currentUser;
  return (
    <main className="flex h-screen">
      <Sidebar fullName={fullName} email={email} avatar={avatar} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="main-content">{children}</div>
      </section>

      <Toaster />
    </main>
  );
};

export default layout;

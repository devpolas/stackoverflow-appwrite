"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { authStore } from "@/store/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const session = authStore((state) => state.session);

  React.useEffect(
    function () {
      if (!session) {
        router.replace(`/login?redirect=${pathname}`);
      }
      if (session) {
        router.replace("/");
      }
    },
    [session, router, pathname]
  );

  return <div>{children}</div>;
}

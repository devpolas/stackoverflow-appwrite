import { authStore } from "@/store/auth";
import { useRouter } from "next/router";
import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { session } = authStore();
  const router = useRouter();

  React.useEffect(
    function () {
      if (session) {
        router.push(`${router.pathname}` || "/");
      }
    },
    [session, router]
  );

  if (session) {
    return null;
  }

  return <div>{children}</div>;
}

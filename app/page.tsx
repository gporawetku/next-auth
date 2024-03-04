"use client";

import { useSession } from "next-auth/react";
import { Navbar } from "./components/navbar";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("status", status);
  console.log("session", session);

  return (
    <main className="">
      <Navbar />
      <div className="">
        <h2>My Amazing App</h2>

        {session && (
          <div>
            <p>Signed in as {session.user && session.user.name}</p>
            <a href="/api/auth/signout">Sign out by link</a>
          </div>
        )}

        {!session && <p>Not signed in</p>}
      </div>
    </main>
  );
}

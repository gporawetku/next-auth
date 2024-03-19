"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // console.log("status", status);
  // console.log("session", session);

  return (
    <>
      <div className="">

        {session && (
          <div className="flex gap-4">
            <p>Signed in as {session.user && session.user.name}</p>
            <a href="/api/auth/signout">Sign out by link</a>
          </div>
        )}

        {!session && (
          <div>
            <a href="/api/auth/signin">Sign in by link</a>
          </div>
        )}
        
      </div>
    </>
  );
};

export default Navbar;

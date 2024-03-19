"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SignIn = () => {
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response: any = await signIn("credentials", {
      redirect: false,
      username: formData.get("username"),
      password: formData.get("password"),
      callbackUrl: "/",
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      // Handle errors
      console.log(response.error)
    }
  };

  return (
    <>
      <div className="h-screen bg-neutral-900 flex justify-center w-screen items-center">
        <div className="bg-neutral-700  border-neutral-700 border bg-opacity-10 shadow text-neutral-200 rounded-3xl p-2.5 min-w-[20vw]">
          <div className="p-5 flex flex-col">
            <div className="text-3xl w-full flex justify-center font-bold">Next Auth</div>
          </div>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <input name="username" type="text" className="p-3 rounded-lg bg-neutral-800 text-neutral-500" placeholder="Username" />
              </div>
              <div className="flex flex-col gap-1.5">
                <input name="password" type="password" className="p-3 rounded-lg bg-neutral-800 text-neutral-500" placeholder="Password" />
              </div>
            </div>
          </form>
          <div className="p-5">
            <button type="submit" form="login-form" className="bg-neutral-100 bg-opacity-50 w-full p-3 rounded-lg font-semibold">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

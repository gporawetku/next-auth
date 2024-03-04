"use client";
const SignIn = () => {
  return (
    <>
      <div className="h-screen bg-neutral-900 flex justify-center w-screen items-center">
        <div className="bg-neutral-700  border-neutral-700 border bg-opacity-10 shadow text-neutral-200 rounded-3xl p-2.5 min-w-[20vw]">
          <div className="p-5 flex flex-col">
            <div className="text-3xl w-full flex justify-center font-bold">Next Auth</div>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <input type="text" className="p-3 rounded-lg bg-neutral-800 text-neutral-500" placeholder="Username" />
            </div>
            <div className="flex flex-col gap-1.5">
              <input type="password" className="p-3 rounded-lg bg-neutral-800 text-neutral-500" placeholder="Password" />
            </div>
          </div>
          <div className="p-5">
            <button className="bg-neutral-100 bg-opacity-50 w-full p-3 rounded-lg font-semibold">Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

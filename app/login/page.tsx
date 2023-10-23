import React from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function Page() {
  return (
    <>
      <style scoped>{`#header{display:none}`}</style>
      <main className="h-screen py-28 bg-blue-50">
        <div className="flex flex-col md:flex-row items-center gap-8 h-full w-auto px-4 sm:px-12 lg:max-w-[960px] mx-auto">
          <div className="w-full md:w-1/2">
            <h1 className="text-center md:text-left text-5xl md:text-6xl font-semibold text-blue-600">
              handbook
            </h1>
            <h2 className="mt-6 text-xl md:text-2xl text-center md:text-left">
              handbook helps you connect and share with the people in your life.
            </h2>
          </div>
          <div className="w-full md:w-1/2">
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  );
}

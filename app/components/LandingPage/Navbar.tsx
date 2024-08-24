"use client"; // marks the component as a client component

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function LoginNavbar() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login"); // Navigate to the login page
  };

  const handleSignupClick = () => {
    router.push("/register"); // Navigate to the signup page
  };

  return (
    <div className="flex justify-between p-6 bg-black h-24">
      <div className="flex items-center gap-2">
        <div className="">
          {/* <Image alt="idk" width={50} height={50}></Image> */}
        </div>
        <h1 className="text-2xl font-bold text-white">SkySight</h1>
      </div>
      <div className="flex gap-5">
        <button
          onClick={handleLoginClick}
          className="bg-gradient-to-r from-darkest-purple to-light-purple text-white font-bold px-6 transition duration-500 ease-in-out hover:bg-blue-600 hover:rounded-full   "
        >
          Login
        </button>
        <button
          onClick={handleSignupClick}
          className="bg-gradient-to-r from-darkest-purple to-light-purple text-white font-bold px-6 transition duration-500 ease-in-out hover:bg-blue-600 hover:rounded-full   "
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginNavbar;

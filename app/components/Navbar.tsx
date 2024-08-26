import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { auth } from "@/auth";
import Logout from "./Logout";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="fixed top-0 w-full h-24 p-6    ">
      <div className="flex items-center justify-between p-6  h-24 mx-auto px-4  ">
        <div>
          <h1 className="text-2xl font-bold text-white">SkySight</h1>
        </div>
        <div className="flex gap-5">
          {!session?.user ? (
            <>
              <Link
                href="/register"
                className="h-10 rounded-md px-8 flex justify-center items-center bg-gradient-to-r from-darkest-purple to-light-purple text-white font-bold  transition duration-500 ease-in-out hover:bg-blue-600 hover:rounded-full   "
              >
                <div> Login</div>
              </Link>
              <Link
                href="/register"
                className="h-10 rounded-md px-8 flex justify-center items-center bg-gradient-to-r from-darkest-purple to-light-purple text-white font-bold  transition duration-500 ease-in-out hover:bg-blue-600 hover:rounded-full   "
              >
                <div> Register</div>
              </Link>
            </>
          ) : (
            <>
            <div className="flex items-center gap-x-2 text-sm">
              {session.user?.name}
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  width={30}
                  height={30}
                  alt="profile"
                  className="rounded-full"
                />
              )}
            </div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import Logout from "./auth/Logout";
import eagleBlack from "@/public/eagleBlack.svg";
import eagleWhite from "@/public/eagleWhite.svg";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="fixed top-0 w-full h-24 p-6    ">
      <div className="flex items-center justify-between p-6  h-24 mx-auto px-4  ">
        <div className="flex gap-2">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-black dark:text-white"
            >
              SkySight
            </Link>
          </div>
          <div>
            <Image
              src={eagleBlack}
              alt="picture of eagle"
              width={30}
              height={30}
              className="dark:hidden"
            />

            <Image
              src={eagleWhite}
              alt="picture of eagle"
              width={30}
              height={30}
              className="hidden dark:block"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2 text-sm">
            {session?.user?.name}
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
        </div>
        <div className="flex gap-5">
          {!session?.user ? (
            <>
              <Button>
                <Link href="/login" className=" ">
                  <div> Login</div>
                </Link>
              </Button>
              <Button>
                <Link href="/register" className=" ">
                  <div> Register</div>
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Logout />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

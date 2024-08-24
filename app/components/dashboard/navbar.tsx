import { Button } from "@/components/ui/button";
import React from "react";

function Navbar() {
  return (
    <div className="fixed top-0 w-full h-24  ">
      <div className="flex items-center justify-between p-6  h-24 mx-auto px-4  ">
        <div className="flex items-center gap-2">
          <div className="">
            {/* <Image alt="idk" width={50} height={50}></Image> */}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">SkySight</h1>
          </div>
        </div>
        <div className="flex">
          <Button variant="destructive" size="lg">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

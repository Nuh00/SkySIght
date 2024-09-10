 import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex items-center justify-center bg-black/90 ">
      {children}
    </div>
  );
}

export default layout;

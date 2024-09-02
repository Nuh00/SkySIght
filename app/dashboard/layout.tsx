import { Toaster } from "react-hot-toast";
import Navbar from "@/app/components/Navbar";
import ThemeSwitchButton from "../components/theme.switch";

export const metadata = {
  title: "Dashboard ",
  description: "Where all job applcation are managed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="absolute top-[50px] inset-0 justify-center inline-flex flex-row -z-[9999]">
        <div className="absolute top-[50px] inset-0 justify-center inline-flex flex-row ">
          <div className="dark:bg-white bg-black opacity-[.5] bg-blur filter blur-[90px] w-[400px] h-[400px] rounded-[9999px]  relative animate-one"></div>
          <div className="bg-light-purple opacity-[.5] bg-blur filter blur-[90px] w-[400px] h-[400px] rounded-[9999px]  relative animate-two "></div>
          <div className="dark:bg-white bg-black opacity-[.5] bg-blur filter blur-[90px]  w-[400px] h-[400px] rounded-[9999px]  relative animate-three "></div>
        </div>
      </div>
      {children}
      <ThemeSwitchButton />
      <Toaster position="bottom-left" />
    </div>
  );
}

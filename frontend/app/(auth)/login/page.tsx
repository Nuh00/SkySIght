import LoginForm from "@/app/components/auth/login-form";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// function Login() {
//   return (
//     <div className="">
//      <LoginForm/>
//     </div>
//   );
// }

// export default Login;

const Login = async () => {
  const session = await auth();


  return (
    <div className="">
      <LoginForm />
    </div>
  );
};

export default Login;

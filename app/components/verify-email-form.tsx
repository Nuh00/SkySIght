"use client";
import React from "react";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import CardWrapperVerification from "./verification/card-wrapper-verification";

const VerifyEmailForm = () => {
  const [success, setSuccess] = useState<string | undefined>("Verification Email send successfully");
  const [error, setError] = useState<string | undefined>(undefined);

  // const onRender = useCallback(async () => {
  //   if (success || error) {
  //     return;
  //   }

  //   if (!token) {
  //     setError("Invalid token");
  //     return;
  //   }

  //   await newVerifyEmail(token)
  //     .then((data) => {
  //       if (data.error) {
  //         setError(data.error);
  //       } else {
  //         setSuccess(data.success);
  //       }
  //     })
  //     .catch((error) => {
  //       setError("Error verifying email");
  //     });
  // }, [token, success, error]);

  // useEffect(() => {
  //   onRender();
  // }, []);

  return (
    <div>
      <CardWrapperVerification
        title="Confirming now..."
        // showSocial={false}
        headerLabel="Go to your email and click the link to verify your account"
        backButtonLabel="Back to login"
        backButtonHref="/login"
      >
        <div className="flex items-center w-full justify-center">
          <FormSuccess message={success} />
        </div>
      </CardWrapperVerification>
    </div>
  );
};

export default VerifyEmailForm;

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import BackButton from "../auth/back-button";
import Header from "../auth/header"

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  title: string;
  showSocial?: boolean;
  backButtonHref: string;
}

const CardWrapperVerification = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  title,
  // showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-md w-full h-screen flex flex-col justify-center items-center">
      <CardHeader>
        <Header label={headerLabel} title="Almost there..." />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapperVerification;

"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface BackButtonProps {
    label: string;
    href: string;
}

function BackButton({ label, href }: BackButtonProps) {
  return (

    <Button variant="link" size="sm" className="font-normal w-full text-light-purple" asChild>
        <Link href={href}>
            {label}
        </Link>

    </Button>
  )
}

export default BackButton;

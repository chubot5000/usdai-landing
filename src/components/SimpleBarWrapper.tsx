"use client";

import SimpleBar from "simplebar-react";
import { ReactNode } from "react";

export default function SimpleBarWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SimpleBar style={{ maxHeight: "100vh", height: "100vh" }} autoHide={true}>
      {children}
    </SimpleBar>
  );
}

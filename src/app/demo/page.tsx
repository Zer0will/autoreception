import type { Metadata } from "next";

import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "Interactive missed-call recovery demo",
  description:
    "Walk through how AutoReception captures a missed plumbing call, warms the lead by SMS, qualifies the job, and reports recovered revenue.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return <DemoClient />;
}

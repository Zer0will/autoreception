import type { Metadata } from "next";

import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "Interactive missed-call demo for plumbers",
  description:
    "See how AutoReception captures a missed plumbing call, warms the homeowner by SMS, qualifies the lead, and reports recovered revenue.",
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: "AutoReception demo — Recover missed plumbing calls",
    description:
      "A 2-minute interactive sales demo showing missed-call capture, SMS qualification, lead cards, and weekly recovered-leads reporting.",
    url: "/demo",
  },
};

export default function DemoPage() {
  return <DemoClient />;
}

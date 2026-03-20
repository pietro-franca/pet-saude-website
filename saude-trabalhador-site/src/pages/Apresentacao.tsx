import { Hero } from "../app/components/Hero";
import { Stats } from "../app/components/Stats";
import { WhatIsWorkHealth } from "../app/components/WhatIsWorkerHealth";
import { NotificationGuide } from "../app/components/NotificationGuide";
import { WorkerRights } from "../app/components/WorkerRights";
import { CTA } from "../app/components/CTA";

export default function Apresentacao() {
  return (
    <>
      <Hero />
      <Stats />
      <WhatIsWorkHealth />
      <NotificationGuide />
      <WorkerRights />
      <CTA />
    </>
  );
}

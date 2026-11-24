"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import RoyalHeirloomEngine from "@/app/invite/components/RoyalHeirloomEngine";
import { resolveTemplate } from "@/app/invite/lib/resolveTemplate";

function InteractiveInvitationDispatcher() {
  const params = useParams();
  const searchParams = useSearchParams();

  const templateId = (params?.id as string) || "royal-noor-nikah";
  const guestName = searchParams.get("guest") || searchParams.get("to") || "";

  // Resolve template data and theme styling tokens
  const { template, theme, audioMode } = resolveTemplate(templateId);

  return (
    <RoyalHeirloomEngine
      template={template}
      theme={theme}
      audioMode={audioMode}
      initialGuestName={guestName}
    />
  );
}

export default function InteractiveInvitationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1E110A] text-[#F3D78A] flex flex-col items-center justify-center font-serif text-sm">
          <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mb-4" />
          <p className="tracking-widest uppercase text-xs">Opening Bespoke 3D Royal Heirloom...</p>
        </div>
      }
    >
      <InteractiveInvitationDispatcher />
    </Suspense>
  );
}

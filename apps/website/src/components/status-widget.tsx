"use client";

import { fetchStatus } from "@/actions/fetch-status";
import { cn } from "@fluxozen/ui/utils";
import { useEffect, useState } from "react";

export function StatusWidget() {
  const [status, setStatus] = useState("operational");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchStatus();

        if (response) {
          setStatus(response);
        }
      } catch {}
    }

    fetchData();
  }, []);

  const getStatusLevel = (level) => {
    return {
      operational: {
        label: "Operacional",
        color: "bg-green-500",
        color2: "bg-green-400",
      },
      degraded_performance: {
        label: "Desempenho degradado",
        color: "bg-yellow-500",
        color2: "bg-yellow-400",
      },
      partial_outage: {
        label: "Interrupção parcial",
        color: "bg-yellow-500",
        color2: "bg-yellow-400",
      },
      major_outage: {
        label: "Grande interrupção",
        color: "bg-red-500",
        color2: "bg-red-400",
      },
      unknown: {
        label: "Desconhecido",
        color: "bg-gray-500",
        color2: "bg-gray-400",
      },
      incident: {
        label: "Incidente",
        color: "bg-yellow-500",
        color2: "bg-yellow-400",
      },
      under_maintenance: {
        label: "Em manutenção",
        color: "bg-gray-500",
        color2: "bg-gray-400",
      },
    }[level];
  };

  const level = getStatusLevel(status);

  if (!level) {
    return null;
  }

  return (
    <a
      className="flex justify-between space-x-2 items-center w-full border border-border rounded-md px-3 py-1"
      href="https://fluxozen.openstatus.dev"
      target="_blank"
      rel="noreferrer"
    >
      <div>
        <p className="text-sm">{level.label}</p>
      </div>

      <span className="relative ml-auto flex h-1.5 w-1.5">
        <span
          className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            level.color2
          )}
        />
        <span
          className={cn(
            "relative inline-flex rounded-full h-1.5 w-1.5",
            level.color
          )}
        />
      </span>
    </a>
  );
}

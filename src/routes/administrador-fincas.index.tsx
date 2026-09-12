import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/administrador-fincas/")({
  beforeLoad: () => {
    throw redirect({
      to: "/administrador-fincas/$city",
      params: { city: "santa-coloma-de-gramenet" },
    });
  },
});

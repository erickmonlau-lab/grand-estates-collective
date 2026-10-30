import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/servicios")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      hash: "servicios",
    });
  },
});

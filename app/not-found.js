"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <h2 className="mt-40 text-xl font-semibold text-center">
      💣 404 Not Found 💣
    </h2>
  );
}

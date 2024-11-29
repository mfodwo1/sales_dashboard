"use client";

import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Error Page</h1>
      <button onClick={() => router.push("/")}>Go to Home</button>
    </div>
  );
}

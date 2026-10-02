import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="border p-4 rounded-xl bg-gray-100"
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
import React from "react";

interface Error {
  error?: string;
}

export function InputError({ error }: Error) {
  return <p className="text-red-500 text-xs my-1">{error}</p>;
}

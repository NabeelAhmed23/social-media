import { headers } from "next/headers";
import React from "react";

export default function currentRoute() {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const [, pathname] =
    fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [];
  console.log(domain, fullUrl);
  return pathname;
}

export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function deleteCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// export function exclude<T, Key extends keyof T>(obj: T, arr: Key[]) {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([i]) => !arr.includes(i))
//   );
// }

export function exclude(user: any, keys: any) {
  const filteredEntries = Object.entries(user).filter(
    ([key]) => !keys.includes(key)
  );
  return Object.fromEntries(filteredEntries);
}

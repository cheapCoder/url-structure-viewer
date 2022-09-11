export const urlReg =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const effectAttr = [
  "href",
  "host",
  "searchParams",
  "pathname",
  "origin",
  "hash",
  "hostname",
  "port",
  "protocol",
  "search",
  "username",
] as const;

export const reqPermission = () => {
  return navigator.permissions
    .query({ name: "clipboard-read" })
    .then((read) => {
      if (["granted", "prompt"].includes(read.state)) {
        console.log("access ranted!");
      }
    });
};

export const getAttrRecursive = (url: string, show: string[]): any => {
  if (!url.match(urlReg)) return url;

  const urlMap = new URL(url);
  const res = show.map<any>((urlKey) => {
    const val = urlMap[urlKey as keyof URL];
    // searchparams 返回对象
    if (val instanceof URLSearchParams) {
      const result: [string, any][] = [];
      // @ts-ignore
      result["__source"] = val.toString();
      for (const [key, value] of val.entries()) {
        result.push([key, getAttrRecursive(value, show)]);
      }
      return [urlKey, result];
    }
    // else if (typeof val === "string") {
    //   return getAttrRecursive(new URL(val), show);
    // }
    else {
      return [urlKey, val];
    }
  });

  // @ts-ignore
  res["__source"] = url;

  return res;
};

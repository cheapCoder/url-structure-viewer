export const urlReg =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const readStrFromCopyBoard = () =>
  new Promise<string>((r, j) => {
    navigator.permissions
      // @ts-ignore
      .query({ name: "clipboard-read" })
      .then((result) => {
        if (result.state === "granted") {
          navigator.clipboard.readText().then(r).catch(j);
        }

        // @ts-ignore
        result.onchange = (status: PermissionStatus) => {
          if (status.state === "granted") {
            navigator.clipboard.readText().then(r).catch(j);
          } else {
            j();
          }
        };
      })
      .catch(j);
  });

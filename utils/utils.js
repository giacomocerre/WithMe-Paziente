export const generateToken = () =>
  Array.from(
    { length: 6 },
    () => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 36)]
  ).join("");

export const setJson = (data) => JSON.stringify(data);
export const getJson = (json) => JSON.parse(json);

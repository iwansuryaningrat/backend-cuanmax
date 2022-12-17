// Convert 2022-12-17T19:28:38.572Z to 2022-12-17 19:28:38 +0700
const convert = (date) => {
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const offsetHours = Math.floor(offset / 60);
  const offsetMinutes = offset % 60;
  const offsetString = `${offsetHours > 0 ? "-" : "+"}${Math.abs(offsetHours)
    .toString()
    .padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`;
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")} ${d
    .getHours()
    .toString()
    .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d
    .getSeconds()
    .toString()
    .padStart(2, "0")} ${offsetString}`;
};

const date = new Date("2022-12-17T19:28:38.572Z");
const date2 = new Date("2022-12-17 19:28:38 +0700");
console.log(date);
console.log(date2);

console.log(convert(date));

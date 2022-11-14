const date1 = new Date("2019-01-01");
const date2 = new Date().getTime();
const date4 = new Date(date2);

// Generate date for 3 months from now
const date3 = new Date();
date3.setMonth(date3.getMonth() + 3);
const date5 = date3.getTime();
const date6 = new Date(date5).getTime();

console.log(date1);
console.log(date2);
console.log(date3);
console.log(date4);
console.log(date5);
console.log(date6);

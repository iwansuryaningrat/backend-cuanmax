const date1 = new Date("2019-01-01");
const date2 = new Date();

// Generate date for 3 months from now
const date3 = new Date();
date3.setMonth(date3.getMonth() + 3);

console.log(date1, date1.toString()); // false
console.log(date2, date2.toString()); // false
console.log(date3, date3.toString()); // true
console.log(date1 < date2); // false

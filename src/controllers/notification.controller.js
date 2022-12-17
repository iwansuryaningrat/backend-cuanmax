import fs from "fs";

// writeFile function with filename, content and callback function
fs.writeFile("newfile.json", "Learn Node FS module", function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});

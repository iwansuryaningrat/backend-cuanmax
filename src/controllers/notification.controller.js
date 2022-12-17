import fs from "fs";

// writeFile function with filename, content and callback function
const notificationController = (req, res) => {
  fs.writeFile("./newfile.json", req.body, function (err) {
    if (err) throw err;
    res.send({
      message: "File is created successfully.",
    });
  });
};

export default notificationController;

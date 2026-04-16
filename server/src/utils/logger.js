const fs = require("fs");

exports.logToFile = (message) => {
  fs.appendFileSync("audit.log", message + "\n");
};
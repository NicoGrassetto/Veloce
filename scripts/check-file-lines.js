const fs = require("node:fs");

function checkFileLineLimit(filePath, maximumLines) {
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`Cannot read ${filePath}: ${error.message}`);
    return false;
  }

  const lines = content === "" ? 0 : content.split(/\r\n|\n|\r/).length - (/\r?\n$|\r$/.test(content) ? 1 : 0);
  if (lines > maximumLines) {
    console.error(`${filePath} has ${lines} lines; the maximum is ${maximumLines} (${lines - maximumLines} too many).`);
    return false;
  }

  return true;
}

module.exports = { checkFileLineLimit };

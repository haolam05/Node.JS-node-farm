const hello = "Hello World";
console.log(hello);

const fs = require("fs");
const textIn = fs.readFileSync("./txt/input.txt", "utf8");
console.log(textIn);

const textOut = `This is what we knwo about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written");

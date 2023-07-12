const hello = "Hello World";
console.log(hello);

// Synchronous - Blocking
const fs = require("fs");
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we knwo about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

// Asynchronous - Nonblocking
fs.readFile("./txt/start.txt", "utf-8", (err1, data1) => {
  if (err1) return console.log("ERROR! ❌");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err2, data2) => {
    fs.readFile(`./txt/append.txt`, "utf-8", (err3, data3) => {
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", () => {
        console.log("Your file has been written");
      });
    });
  });
});
console.log("Reading File...");

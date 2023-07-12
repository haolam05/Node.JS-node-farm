// const hello = "Hello World";
// console.log(hello);

const fs = require('fs');
const http = require('http');
const url = require('url');

/////////////////////////////////////////////////////////////
// Files
// Synchronous - Blocking
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we knwo about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

// Asynchronous - Nonblocking
// fs.readFile("./txt/start.txt", "utf-8", (err1, data1) => {
//   if (err1) return console.log("ERROR! ❌");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err2, data2) => {
//     fs.readFile(`./txt/append.txt`, "utf-8", (err3, data3) => {
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", () => {
//         console.log("Your file has been written");
//       });
//     });
//   });
// });
// console.log("Reading File...");

/////////////////////////////////////////////////////////////
// Server
// Create a local server to receive data from
// register callback on request
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const replaceTemplate = function (el, template) {
  let output = template.replaceAll('{%ID%}', el.id);
  output = output.replaceAll('{%PRODUCT_NAME%}', el.productName);
  output = output.replaceAll('{%IMAGE%}', el.image);
  output = output.replaceAll('{%FROM%}', el.from);
  output = output.replaceAll('{%NUTRIENTS%}', el.nutrients);
  output = output.replaceAll('{%QUANTITY%}', el.quantity);
  output = output.replaceAll('{%PRICE%}', el.price);
  output = output.replaceAll('{%DESCRIPTION%}', el.description);
  if (!el.organic) output = output.replaceAll('{%NOT_ORGANIC%}', 'not-organic');
  return output;
};

const server = http.createServer((req, res) => {
  // console.log(req);
  // res.end("Hello from the server!");

  // Overview page
  if (req.url === '/' || req.url === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = dataObj
      .map(el => replaceTemplate(el, cardTemplate))
      .join('');
    const output = overviewTemplate.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Product page
  } else if (req.url === '/product') {
    res.end('PRODUCT');

    // API
  } else if (req.url === '/api') {
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page Not Found</h1>');
  }
});
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});

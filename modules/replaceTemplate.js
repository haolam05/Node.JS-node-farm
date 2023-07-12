module.exports = (el, template) => {
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

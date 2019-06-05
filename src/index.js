/**
 * 
 * @param {*} hash 
 * @description 对高敏字段进行脱敏，适用于字符串数据
 */
function stringTypeDesensitization(hash) {
  hash = String(hash);
  hash = hash.replace(/\'/g, '%27')
  hash = hash.replace(/\"/g, '%22')
  hash = hash.replace(/</g, '%3C')

  return hash
}

/**
 * @param {Long} long 
 * @description 对于长整型进行检查，如果未通过返回NaN
 */
function longTypeCheck(bigint, inputBase, outputBase) {
  let inputValues = parseBigInt(bigint, inputBase);

  if(!inputValues) return NaN;

  let outputValues = [], 
    remainder,
    len = inputValues.length,
    pos = 0,
    i;

  while (pos < len) { 
    remainder = 0; 
    for (i = pos; i < len; i++) {
      remainder = inputValues[i] + remainder * inputBase;
      inputValues[i] = Math.floor(remainder / outputBase);
      remainder -= inputValues[i] * outputBase;
      if (inputValues[i] == 0 && i == pos) {
        pos++;
      }
    }
    outputValues.push(remainder);
  }
  outputValues.reverse();
  return formatBigInt(outputValues, outputBase);
}

/**
 * @param {Integer} int 
 * @description 对于整型数据进行检查，如果未通过返回NaN
 */
function intTypeCheck(int) {
  return Number(int)
}

/**
 * 
 * @param {*} bigint 
 * @param {*} base 
 * @description 
 */
function parseBigInt(bigint, base) {
  for (var values = [], i = 0; i < bigint.length; i++) {
    values[i] = parseInt(bigint.charAt(i), base);
    if(isNaN(values[i])) return
  }
  return values;
}

/**
 * 
 * @param {*} values 
 * @param {*} base 
 * @description 
 */
function formatBigInt(values, base) {
  for (var bigint = '', i = 0; i < values.length; i++) {
    bigint += values[i].toString(base);
  }
  return bigint;
}


module.exports = {
  stringTypeDesensitization,
  intTypeCheck,
  longTypeCheck
}
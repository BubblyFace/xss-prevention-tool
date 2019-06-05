const {longTypeCheck} = require('../src/index.js')

console.log(longTypeCheck('2311414123123214124154324523452345634262363263', 10 , 10));
console.log(longTypeCheck('123123', 10 , 10));
console.log(longTypeCheck('123<script>alert(1)</script>', 10 , 10));
console.log(longTypeCheck('ABBA', 16 , 10));

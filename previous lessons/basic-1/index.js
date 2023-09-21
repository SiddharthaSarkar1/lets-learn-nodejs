// import { sum, diff } from './lib.js';
const lib = require('./lib.js');

const fs = require('fs');

const t1 = performance.now();

fs.readFile('demo.txt', 'utf-8', (err, txt) => {
    console.log(txt);
});

// const txt = fs.readFileSync('demo.txt', 'utf-8');
// console.log(txt);

const a = 5;

function firstFx(){
    console.log("Hello World!!");
}

console.log(lib);
console.log(lib.sum(10,5));
console.log(lib.diff(10,5));

const t2 = performance.now();

console.log(t2-t1);

// console.log(sum(10,5))
// console.log(diff(10,5))


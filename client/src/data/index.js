const fs = require("fs");

let value = 450;

ind = 20;
let allTimemin = 100000;
let allTimemax = -1;
let arr = [value];
let maxi = [];
let mini = [];
let last = value;
let min = 100000;
let max = 0;
for (let j = 0; j < 28800; j++) {
  let decide = Math.floor(Math.random() * 2);
  let count = Math.floor(Math.random() * 3);
  let frac = Math.random() / 30;
  count++;
  if (decide) {
    let decide2 = Math.floor(Math.random() * 2);
    if (!decide2) {
      let decide3 = Math.floor(Math.random() * 2);
      if (decide3) {
        last += last * ((count * frac) / 100);
      } else {
        last -= last * ((count * frac) / 100);
      }
    } else {
      let decide3 = Math.floor(Math.random() * 2);
      if (decide3) {
        last -= last * ((count * frac) / 100);
      } else {
        last += last * ((count * frac) / 100);
      }
    }
  } else {
    let decide2 = Math.floor(Math.random() * 2);
    if (decide2) {
      let decide3 = Math.floor(Math.random() * 2);
      if (decide3) {
        last += last * ((count * frac) / 100);
      } else {
        last -= last * ((count * frac) / 100);
      }
    } else {
      let decide3 = Math.floor(Math.random() * 2);
      if (decide3) {
        last -= last * ((count * frac) / 100);
      } else {
        last += last * ((count * frac) / 100);
      }
    }
  }
  arr.push(Number(last.toFixed(2)));
  max = Math.max(max, last);
  min = Math.min(min, last);
}
allTimemin = Math.min(allTimemin, min);
allTimemax = Math.max(allTimemax, max);
maxi.push(Number(max.toFixed(2)));
mini.push(Number(min.toFixed(2)));
let data = {
  price: arr,
  mn: mini,
  mx: maxi,
};
value = arr[28799];
const jsonString = JSON.stringify(data);
fs.writeFile(`./data/karan.json`, jsonString, (err) => {
  if (err) {
    console.log("Error writing file", err);
  } else {
    console.log("Successfully wrote file");
  }
});

console.log(allTimemax, allTimemin, arr[0], arr[28799]);

import chalk from "chalk";
import moment from "moment";
import sum from "./utils/sum.js";

console.log(chalk.blue("Hello,"),chalk.red("World!"));

var date = moment().format();
console.log("-date:", chalk.bgBlue(date));

console.log(sum(2,5));
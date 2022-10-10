///
/// Hybrid
///

const { fixedToheb, hebToFixed } = require('./heb.js');
const { fixedToGreg, gregToFixed } = require('./greg.js');

/**
 * Gregorian year to Hebrew year
 * @param {number} gY Gregorian year
 * @return {number} Hebrew year
 */
const gregYearToHebYear = (gY) => gY - 1240 + 5000;

const hebDateToGreg = (year, month, day) => fixedToGreg(hebToFixed(year, month, day));
const gregDateToHeb = (year, month, day) => fixedToheb(gregToFixed(year, month, day));

console.log(gregDateToHeb(2001, 1, 1));

'use strict';

import { monthsName, weeksName } from './gregorianData.js';

/**
 * Devide x by y and floor it
 * @param {number} x
 * @param {number} y
 * @returns {number} Number
 */
const divisionFloor = (x, y) => Math.floor(x / y);

///
/// Gregorian
///

/**
 * Check if year is leap or not
 * @param {number} year Gregorian Year
 * @returns {Boolean} Trur or False
 */
const isGregLeapYear = (year) => (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

/**
 * Convert gregorian date to Rata Die
 * @param {number} year Gregorian Year
 * @param {number} month Gregorian Month
 * @param {number} day Gregorian Day
 * @returns {number} Rata Die NUMBER
 */
const gregToFixed = (year, month, day) => {
    year--;
    const fix = month <= 2 ? 0 : isGregLeapYear(year + 1) ? -1 : -2;
    return (
        365 * year + divisionFloor(year, 4) - divisionFloor(year, 100) + divisionFloor(year, 400) + divisionFloor(367 * month - 362, 12) + fix + day
    );
};

/**
 * Get Gregorian Year from Rata Die.
 * @param {number} RT Rata Die
 * @returns {number} Gregorian Year
 */
const gYearFromFixed = (RT) => {
    const l0 = RT - 1;
    const n400 = Math.floor(l0 / 146097);
    const d1 = l0 % 146097;
    const n100 = Math.floor(d1 / 36524);
    const d2 = d1 % 36524;
    const n4 = Math.floor(d2 / 1461);
    const d3 = d2 % 1461;
    const n1 = Math.floor(d3 / 365);

    const year = 400 * n400 + 100 * n100 + 4 * n4 + n1;

    return n100 != 4 && n1 != 4 ? year + 1 : year;
};

/**
 * Convert Rata Die to Gregorian date.
 * @param {number} RT Rata Die
 * @returns {object} {year,month,day}
 */
const fixedToGreg = (RT) => {
    const year = gYearFromFixed(RT);
    const pDays = RT - gregToFixed(year, 1, 1);

    let correction = 0;
    if (!RT < gregToFixed(year, 3, 1) && isGregLeapYear(year)) correction = 1;
    else correction = 2;

    const month = Math.floor(0.00272479564 * (12 * (pDays + correction) + 373));
    const day = RT - gregToFixed(year, month, 1) + 1;

    return { year: year, month: month, day: day };
};

export { fixedToGreg, gregToFixed, monthsName, weeksName };

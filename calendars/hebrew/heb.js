'use strict';

import * as hebData from './data.js';

// Hebrew month and thier month number
const NISAN = 1,
    IYYAR = 2,
    SIVAN = 3,
    TAMUZ = 4,
    AV = 5,
    ELUL = 6,
    TISHRI = 7,
    CHESHVAN = 8,
    KISLEV = 9,
    TEVET = 10,
    SHEVAT = 11,
    ADAR = 12,
    ADARII = 13;

// The difference between each molad to next molad
const moladPeriod = {
    days: 29,
    hours: 12,
    parts: 793,
    // parts convert to a minutes
    // 1080 parts is one hour
    // 1080 / 60 = 18(one minute)
    // floor(793 / 18) = 44(minutes)
    minutes: 44,
    // converts parts to a seconds
    // 18 parts is one minutes
    // 18 / 60 = 0.3 seconds
    // (793 % 18) = 1
    // 1/0.3 = 3.33333333333 seconds
    seconds: 3.33333333333,
};

const moladDaysPeiod = 29.530594;

// Hebrew epoch
//fixed from julian 3761 B.C.E October 7
//           Gregorian -3760 September 7
const hEPOCH = -1373427;

/**
 * Devide x by y and floor it
 * @param {number} x
 * @param {number} y
 * @returns {number} Number
 */
const divisionFloor = (x, y) => Math.floor(x / y);

///
/// HEBREW
///

/**
 * Convert hours to parts
 * @param {number} h hours
 * @returns {number} parts
 */
const hoursToParts = (h) => h * 1080;

/**
 * Convert parts to hourse
 * @param {number} p parts
 * @returns {number} hourse
 */
const partsToHourse = (p) => p / 1080;

/**
 * Convert gimatria to number.
 * @param {String} g Gimatria
 * @returns {number} Gimatria number value
 */
const gimatriaToNumber = (g) => g.split('').reduce((o, n) => o + (hebData.gimatria[n] || 0), 0);

/**
 * Convert number  to gimatria.
 * @param {number} n number
 * @returns {String} Gimatria value
 */
const numberToGimatria = (n) => {
    const digits = n.toString().split('');
    // Convert each digit to its corresponding Hebrew letter
    const gematria = digits.map((digit) => hebData.hebrewAlphabet[parseInt(digit) - 1]).join('');
    return gematria;
};

/**
 * check if the year is a leap or not
 * @param {number} year Hebrew year
 * @return {Boolean}
 */
const isHebLeapYear = (year) => (7 * year + 1) % 19 < 7;

/**
 * check if this year Adar II is the last month.
 * @param {number} year Hebrew year
 * @return {Boolean}
 */
const isADarII = (year) => isHebLeapYear(year);

/**
 * Get total month of given year
 * @param {number} year Hebrew year
 * @returns {number} last month number
 */
const totalMonthInYear = (year) => 12 + isADarII(year);

/**
 * is the Hebrew is sabbatical or not
 * @param {number} year Hebrew year
 * @return {Boolean}
 */
const isHySabbatical = (year) => year % 7 == 0;

/**
 * Get all the Hebrew month with fixed days
 * of given Hebreew year.
 * @param {number} year Hebrew year
 * @returns {Array<object>} Hebrew month
 */
const getHebMonths = function (year) {
    const months = [...hebMonths];

    // remove adarII and change adarI length to 29
    if (!isADarII(year)) {
        months.pop();
        months[11].len = 29;
    }

    return months;
};

/**
 * Total months
 * @param {number} year Hebrew year
 * @returns {number}
 */
const totlalMonths = (year) => Math.floor((7 * year - 6) / 19 + 12 * (year - 1));

/**
 *
 * @param {number} year Hebrew year
 * @returns {number}
 */
const elapsedTime = (year) => totlalMonths(year) * (moladPeriod.days * moladPeriod.hours * moladPeriod.minutes * moladPeriod.seconds) - (48 - 40);

/**
 * Total leaps year
 * @param {number} year Hebrew year
 * @returns {number}
 */
const totalLeapYears = (year) => Math.floor((year - 1) / 19) * 7 + Math.floor((((year - 1) % 19) * 7 + 1) / 19);

/**
 * Get elapsed month since start of Hebrew counting
 * @param {number} year Hebrew year
 * @param {number} month  Hebrew year
 * @returns {number} elapsed month
 */
const monthElapsed = (year, month) => 7 - TISHRI + divisionFloor(235 * year - 234, 19);

const MOLAD = (year, month) => {
    if (month < 7) year += 1;
    return hEPOCH - 876 / 25920 + monthElapsed(year, month) * (29 + 12 + 793 / 25920);
};

/**
 * Get elapsed days since start of Hebrew counting
 * @param {number} year Hebrew year
 * @returns {number} elapsed days
 */
const hebElapsedDays = (year) => {
    const days = (year, f) => {
        const mEla = monthElapsed(year, 7);
        const pEla = 204 + 793 * (mEla % 1080);
        const hEla = 11 + 12 * mEla + 793 * divisionFloor(mEla, 1080) + divisionFloor(pEla, 1080);

        let days = 29 * mEla + divisionFloor(hEla, 24);

        if ((3 * (days + 1)) % 7 < 3) days += 1;

        return days;
    };

    const ny0 = days(year - 1);
    const ny1 = days(year, true);
    const ny2 = days(year + 1);

    let fix = 0;
    if (ny2 - ny1 === 356) fix = 2;
    if (ny1 - ny0 === 382) fix = 1;

    return ny1 + fix;
};

/**
 * Get the R.D. date of the New Year
 * @param {number} year Hebrew year
 * @returns {number}
 */
const hebNewYear = (year) => hEPOCH + hebElapsedDays(year);

/**
 * Get total days in a year
 * @param {number} year Hebrew year
 * @returns {number} total days
 */
const daysInhYear = (year) => hebElapsedDays(year + 1) - hebElapsedDays(year);

/**
 * Check if long Chechvan
 * @param {number} year Hebrew year
 * @returns {Boolean}
 */
const longCheshvan = (year) => {
    let days = daysInhYear(year);
    return days === 355 || days === 385;
};

/**
 * Check if short kislev
 * @param {number} year Hebrew year
 * @returns {Boolean}
 */
const shortKislev = (year) => {
    let days = daysInhYear(year);
    return days === 353 || days === 383;
};
shortKislev(5784);

/**
 * Get the length of month
 * @param {number} year Hebrew year
 * @param {number} month Hebrew month
 * @returns {number} length of month
 */
const lastDayOfMonth = (year, month) => {
    if ([IYYAR, TAMUZ, ELUL, TEVET, ADARII].includes(month)) return 29;
    if ((month === ADAR && !isHebLeapYear(year)) || (month === CHESHVAN && !longCheshvan(year)) || (month === KISLEV && shortKislev(year))) return 29;
    else return 30;
};

/**
 * Comvert Hebrew date to Rata Die
 * @param {number} year Hebrew year
 * @param {number} month Hebrew month
 * @param {number} day Hebrew day
 * @returns {number} Rata Die
 */
const hebToFixed = (year, month, day) => {
    if (month < TISHRI) {
        for (let m = TISHRI; m <= totalMonthInYear(year); m++) {
            day += lastDayOfMonth(year, m);
        }
        for (let m = NISAN; m < month; m++) {
            day += lastDayOfMonth(year, m);
        }
    } else {
        for (let m = TISHRI; m < month; m++) {
            day += lastDayOfMonth(year, m);
        }
    }
    return hEPOCH + hebElapsedDays(year) + day - 1;
};

/**
 * Convert Rata Die TO Hebrew date.
 * @param {number} RT Rata Die
 * @returns {object} {year,month,day}
 */
const fixedToheb = (RT) => {
    // approximate year
    let year = Math.floor(0.0027378746 * (RT - hEPOCH) + 1);
    while (hebNewYear(year) <= RT) year++;
    year--;

    let month = RT < hebToFixed(year, 1, 1) ? 7 : 1;
    while (RT > hebToFixed(year, month, lastDayOfMonth(year, month))) month++;

    let day = RT - hebToFixed(year, month, 1) + 1;

    return { year: year, month: month, day: day };
};

/**
 * Get holidys in given month
 * @param {number} year Hebrew year
 * @param {number} month Hebrew month
 * @returns {object}
 */
const getHolidays = (year, month) => {
    let holidays = [
        ...hebData.months[month - 1].holidays.map((h) => {
            return { ...h };
        }),
    ];

    if ((month === TEVET || month === KISLEV) && shortKislev(year)) {
        if (month === KISLEV) holidays.splice(6, 1); // renove ner 7
        else {
            holidays = [
                {
                    name: 'חנוכה נר שביעי',
                    sdate: 'א',
                    edate: 'א',
                },
                {
                    name: 'חנוכה נר שמיני',
                    sdate: 'ב',
                    edate: 'ב',
                },
                {
                    name: 'חנוכה',
                    sdate: 'ג',
                    edate: 'ג',
                },
                {
                    name: 'צום עשרה בטבת',
                    sdate: 'י',
                    edate: 'י',
                    delay: [
                        {
                            day: [6], // saturday
                            add: 1,
                        },
                    ],
                },
            ];
        }
    }

    return holidays;
};

export { fixedToheb, hebToFixed, lastDayOfMonth, getHolidays, gimatriaToNumber, numberToGimatria };

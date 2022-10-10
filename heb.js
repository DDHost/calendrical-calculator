'use strict';

const hebMonths = [
    {
        name: 'nisan',
        len: 30,
    },
    {
        name: 'iyyar',
        len: 29,
    },
    {
        name: 'sivan',
        len: 30,
    },
    {
        name: 'tammuz',
        len: 29,
    },
    {
        name: 'av',
        len: 30,
    },
    {
        name: 'elul',
        len: 29,
    },
    {
        name: 'tishri',
        len: 30,
    },
    {
        name: 'cheshvan',
        len: 29, // Depands on overall length of the hebrew year, it can be 29 or 30
    },
    {
        name: 'kislev',
        len: 29, // Depands on overall length of the hebrew year, it can be 29 or 30
    },
    {
        name: 'tevet',
        len: 29,
    },
    {
        name: 'shevat',
        len: 30,
    },
    {
        name: 'adar',
        len: 30, // if common 29 and if leap is 30
    },
    {
        name: 'adarii',
        len: 29,
    },
];

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

// hebrew epoch
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
 * check if the year is a leap or not
 * @param {number} hY hebrew year
 * @return {Boolean}
 */
const isHebLeapYear = (hY) => (7 * hY + 1) % 19 < 7;

/**
 * check if this year Adar II is the last month.
 * @param {number} hY Hebrew year
 * @return {Boolean}
 */
const isADarII = (hY) => isHebLeapYear(hY);

/**
 * Get total month of given year
 * @param {number} hY hebrew year
 * @returns {number} last month number
 */
const totalMonthInYear = (hY) => 12 + isADarII(hY);

/**
 * is the hebrew is sabbatical or not
 * @param {number} hY Hebrew year
 * @return {Boolean}
 */
const isHySabbatical = (hY) => hY % 7 == 0;

/**
 * Get all the hebrew month with fixed days
 * of given Hebreew year.
 * @param {number} hY hebrew year
 * @returns {Array<object>} hebrew month
 */
const getHebMonths = function (hY) {
    const months = [...hebMonths];

    // remove adarII and change adarI length to 29
    if (!isADarII(hY)) {
        months.pop();
        months[11].len = 29;
    }

    return months;
};

/**
 * Total months
 * @param {number} hY hebrew year
 * @returns {number}
 */
const totlalMonths = (hY) => Math.floor((7 * hY - 6) / 19 + 12 * (hY - 1));

/**
 *
 * @param {number} hY hebrew year
 * @returns {number}
 */
const elapsedTime = (hY) => totlalMonths(hY) * (moladPeriod.days * moladPeriod.hours * moladPeriod.minutes * moladPeriod.seconds) - (48 - 40);

/**
 * Total leaps year
 * @param {number} hY hebrew year
 * @returns {number}
 */
const totalLeapYears = (hY) => Math.floor((hY - 1) / 19) * 7 + Math.floor((((hY - 1) % 19) * 7 + 1) / 19);

/**
 * Get elapsed month since start of hebrew counting
 * @param {number} hY hebrew year
 * @param {number} hM  hebrew year
 * @returns {number} elapsed month
 */
const monthElapsed = (hY, hM) => hM - TISHRI + 0.05263157894 * (235 * hY - 234);

const MOLAD = (hY, hM) => {
    if (hM < 7) hY += 1;
    return hEPOCH - 876 / 25920 + monthElapsed(hY, hM) * (29 + 12 + 793 / 25920);
};

/**
 * Get elapsed days since start of hebrew counting
 * @param {number} hY hebrew year
 * @returns {number} elapsed days
 */
const hebElapsedDays = (hY) => {
    const days = (year) => {
        const mEla = Math.floor(monthElapsed(year, 7));
        const pEla = 204 + 793 * (mEla % 1080);
        const hEla = 11 + 12 * mEla + 793 * divisionFloor(mEla, 1080) + divisionFloor(pEla, 1080);

        let days = 29 * mEla + divisionFloor(hEla, 24);

        if ((3 * (days + 1)) % 7 < 3) days += 1;

        return days;
    };

    const ny0 = days(hY - 1);
    const ny1 = days(hY);
    const ny2 = days(hY + 1);

    let fix = 0;
    if (ny2 - ny1 === 356) fix = 2;
    if (ny1 - ny0 === 382) fix = 1;

    return ny1 + fix;
};

/**
 *
 * @param {number} hY hebrew year
 * @returns {number}
 */
const hebNewYear = (hY) => hEPOCH + hebElapsedDays(hY);

/**
 * Get total days in a year
 * @param {number} hY hebrew year
 * @returns {number} total days
 */
const daysInhYear = (hY) => hebNewYear(hY + 1) - hebNewYear(hY);

/**
 * Check if long Chechvan
 * @param {number} hY hebrew year
 * @returns {Boolean}
 */
const longCheshvan = (hY) => {
    let days = daysInhYear(hY);
    return days === 355 || days === 385;
};

/**
 * Check if short kislev
 * @param {number} hY hebrew year
 * @returns {Boolean}
 */
const shortKislev = (hY) => {
    let days = daysInhYear(hY);
    return days === 353 || days === 383;
};

/**
 * Get the length of month
 * @param {number} hY hebrew year
 * @param {number} hM hebrew month
 * @returns {number} length of month
 */
const lastDayOfMonth = (hY, hM) => {
    if ([IYYAR, TAMUZ, ELUL, TEVET, ADARII].includes(hM)) return 29;
    if ((hM === ADAR && !isHebLeapYear(hY)) || (hM === CHESHVAN && !longCheshvan(hY)) || (hM === KISLEV && shortKislev(hY))) return 29;
    else return 30;
};

/**
 * Comvert Hebrew date to Rata Die
 * @param {number} hY hebrew year
 * @param {number} hM hebrew month
 * @param {number} hD hebrew day
 * @returns {number} Rata Die
 */
const hebToFixed = (hY, hM, hD) => {
    if (hM < TISHRI) {
        for (let m = TISHRI; m <= totalMonthInYear(hY); m++) {
            hD += lastDayOfMonth(hY, m);
        }
        for (let m = NISAN; m < hM; m++) {
            hD += lastDayOfMonth(hY, m);
        }
    } else {
        for (let m = TISHRI; m < hM; m++) {
            hD += lastDayOfMonth(hY, m);
        }
    }
    return hEPOCH + hebElapsedDays(hY) + hD - 1;
};

/**
 * Comvert Rata Die TO Hebrew date.
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

module.exports = { fixedToheb, hebToFixed };

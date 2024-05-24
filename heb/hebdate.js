import { hebrewMonths, hEPOCH, PARTS, Gematria, weeksName } from './hebrewDatas.js';
import { Cache } from '../cache.js';

const hebMonth = new hebrewMonths();
const NISAN = hebMonth.monthsValue.get('NISAN');
const IYYAR = hebMonth.monthsValue.get('IYYAR');
const TAMMUZ = hebMonth.monthsValue.get('TAMMUZ');
const ELUL = hebMonth.monthsValue.get('ELUL');
const TISHRI = hebMonth.monthsValue.get('TISHRI');
const CHESHVAN = hebMonth.monthsValue.get('CHESHVAN');
const KISLEV = hebMonth.monthsValue.get('KISLEV');
const TEVET = hebMonth.monthsValue.get('TEVET');
const ADAR = hebMonth.monthsValue.get('ADAR');
const ADARII = hebMonth.monthsValue.get('ADARII');

/**
 * Convert Gematria to number.
 * @param {String} g Gematria
 * @returns {number} Gematria number value
 */
const gematriaToNumber = (g) => g.split('').reduce((o, n) => o + (Gematria[n] || 0), 0);

/**
 * Convert number  to Gematria.
 * @param {number} number number
 * @returns {String} Gematria value
 */
const numberToGematria = (n) => {
    let gematriaHebrew = '';

    while (n > 0) {
        const digit = n % 10; // Extract the last digit
        const placeValue = Math.pow(10, gematriaHebrew.length); // Calculate place value
        const digitGematria = digit * placeValue; // Calculate Gematria value of digit
        gematriaHebrew = Gematria[digitGematria] + gematriaHebrew; // Prepend Hebrew letter
        n = Math.floor(n / 10); // Remove the last digit
    }

    return gematriaHebrew;
};

/**
 * Check if given hebrew year is leap or not
 * @param {Number} hYear the hebew year
 * @returns {Bool} Is it leap?(True/False)
 */
const isLeapYear = (hYear) => (7 * hYear + 1) % 19 < 7;

/**
 * Get total month of given year
 * @param {number} hYear Hebrew year
 * @returns {number} last month number
 */
const totalMonthInYear = (hYear) => 12 + isLeapYear(hYear);

/**
 * Get total days in a year
 * @param {number} year Hebrew year
 * @returns {number} total days
 */
const daysInhYear = (year) => elapsedDays(year + 1) - elapsedDays(year);

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

/**
 * Get the length of month
 * @param {number} year Hebrew year
 * @param {number} month Hebrew month
 * @returns {number} length of month
 */
const lastDayOfMonth = (year, month) => {
    if ([IYYAR, TAMMUZ, ELUL, TEVET, ADARII].includes(month)) return 29;
    if ((month === ADAR && !isLeapYear(year)) || (month === CHESHVAN && !longCheshvan(year)) || (month === KISLEV && shortKislev(year))) return 29;
    else return 30;
};

/**
 * Totals month from start to given month since start of Hebrew counting
 * @param {number} hYear the hebrew year
 */
const monthsElapsed = (hYear) => Math.floor((1 / 19) * (235 * hYear - 234));

/**
 * Totals days from start to given month year
 * @param {number} hYear the hebrew year
 * @returns
 */
const elapsedDays = (hYear) => {
    const totalDays = (y) => {
        const mElapsed = monthsElapsed(y);
        const partsElapsed = 204 + 793 * (mElapsed % PARTS);
        const hoursElapsed = 11 + 12 * mElapsed + 793 * Math.floor(mElapsed / PARTS) + Math.floor(partsElapsed / PARTS);

        let DAYS = 29 * mElapsed + Math.floor(hoursElapsed / 24);

        if ((3 * (DAYS + 1)) % 7 < 3) DAYS += 1;

        return DAYS;
    };

    const ny0 = totalDays(hYear - 1);
    const ny1 = totalDays(hYear);
    const ny2 = totalDays(hYear + 1);

    let fix = 0;
    if (ny2 - ny1 === 356) fix = 2;
    if (ny1 - ny0 === 382) fix = 1;

    return ny1 + fix;
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
    return hEPOCH + elapsedDays(year) + day - 1;
};

/**
 * Get the R.D. date of the New Year
 * @param {number} year Hebrew year
 * @returns {number}
 */
const hebNewYear = (year) => hEPOCH + elapsedDays(year);

/**
 * Convert Rata Die TO Hebrew date.
 * @param {number} RT Rata Die
 * @returns {object} {year,month,day}
 */
const fixedToHeb = (RT) => {
    if (RT <= hEPOCH) throw new RangeError(`fixedToHeb: ${RT} is before hebrew epoch${hEPOCH}`);

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
 * Convert Rata Die to day of week (sunday,mondday....)
 * @param {number} RT Rata Die
 * @returns {number}
 */
const dayOfWeekFromFixed = (RT) => RT % 7;

const cachedHolidays = new Cache(10);

/**
 * Get holidays and occasions in given month
 * @param {number} hYear Hebrew year
 * @returns {object}
 */
const getHoA = (hYear) => {
    const months = hebMonth.months(shortKislev(hYear), longCheshvan(hYear), isLeapYear(hYear));
    if (cachedHolidays.isCached(hYear)) return cachedHolidays.get(hYear);

    for (let month of Object.keys(months)) {
        months[month].HoA.forEach((HA) => {
            // fix Rejections and Advances if exist
            if (HA.RA) {
                HA.RA.forEach((RA) => {
                    for (let i = 0; i < RA.day.length; i++) {
                        let dayOfWeek = dayOfWeekFromFixed(hebToFixed(hYear, hebMonth.monthsValue.get(month), HA.date));
                        if (!RA.day.includes(dayOfWeek)) continue;
                        HA.date = HA.date + RA.add;
                    }
                });
            }
        });
    }

    const fullYear = {
        year: hYear,
        months: months,
    };
    cachedHolidays.add(hYear, fullYear);

    return fullYear;
};

export { fixedToHeb, hebToFixed, hebrewMonths, getHoA, weeksName, numberToGematria, gematriaToNumber };

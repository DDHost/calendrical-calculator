///
/// Hybrid
///

import * as Hebrew from './heb/hebdate.js';
import * as Gregorian from './greg/gregdate.js';
import { Cache } from './cache.js';

const hebMonth = new Hebrew.hebrewMonths();

/**
 * Gregorian year to Hebrew year
 * @param {number} year Gregorian year
 * @return {number} Hebrew year
 */
const gregYearToHebYear = (year) => year + 3760;

/**
 * Convert Hebrew date to Gregorian date.
 * @param {number} year Hebrew year
 * @param {number} month Hebrew month
 * @param {number} day Hebrew day
 * @returns {object} Gregorian date = {year, month, day}
 */
const hebDateToGreg = (year, month, day) => Gregorian.fixedToGreg(Hebrew.hebToFixed(parseInt(year), parseInt(month), parseInt(day)));

/**
 * Convert Gregorian date to Hebrew date.
 * @param {number} year Gregorian year
 * @param {number} month Gregorian month
 * @param {number} day Gregorian day
 * @returns {object} Hebrew date = {year, month, day}
 */
const gregDateToHeb = (year, month, day) => Hebrew.fixedToHeb(Gregorian.gregToFixed(parseInt(year), parseInt(month), parseInt(day)));

const cachedHoA = new Cache(10);

/**
 * Get all jewish holidays and occasions in the given Gregorian year
 * @param {number} year Gregorian year
 * @returns {Array<object>} Holidays
 */
const getFullYearJewishHoAInGregorian = (year) => {
    // Cached year
    if (cachedHoA.isCached(year)) return cachedHoA.get(year);

    /**
     * The Gregorian year consists of two halves of Hebrew years
     * so you have to calculate both 2 year to get all holidays and occasions in full Gregorian year.
     */
    const yearRange = [gregDateToHeb(year, 1, 1), gregDateToHeb(year, 12, 31)];

    // Holidays and Occasions of each year
    const sHoA = Hebrew.getHoA(yearRange[0].year);
    const eHoA = Hebrew.getHoA(yearRange[1].year);

    const fullGregYear = new Map();

    [sHoA, eHoA].forEach((fullHebYear, index) => {
        for (let month in fullHebYear.months) {
            fullHebYear.months[month].HoA.forEach((HoA) => {
                let date = hebDateToGreg(yearRange[index].year, hebMonth.monthsValue.get(month), HoA.date);

                if (date.year != year) return;

                const MONTH_ID = date.month;
                const DAY_ID = date.day;

                const formatHoA = { name: HoA.name, type: HoA.type };
                let list = fullGregYear.get(MONTH_ID);
                if (list) list.set(DAY_ID, formatHoA);
                else {
                    list = new Map();
                    list.set(DAY_ID, formatHoA);
                    fullGregYear.set(MONTH_ID, list);
                }
            });
        }
    });

    // Cache the year
    cachedHoA.add(year, fullGregYear);

    return fullGregYear;
};

const monthsName = Gregorian.monthsName;

const weeksName = {
    en: Gregorian.weeksName,
    he: Hebrew.weeksName,
};

export { getFullYearJewishHoAInGregorian, gregYearToHebYear, gregDateToHeb, hebDateToGreg, Hebrew, Gregorian, weeksName, monthsName };

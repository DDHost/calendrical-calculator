///
/// Hybrid
///

const Hebrew = require('./calendars/hebrew/heb.js');
const gregorian = require('./calendars/gregorian/greg.js');

/**
 * Gregorian year to Hebrew year
 * @param {number} year Gregorian year
 * @return {number} Hebrew year
 */
const gregYearToHebYear = (year) => year - 1240 + 5000;

/**
 * Convert Hebrew date to Gregorian date.
 * @param {number} year Hebrew year
 * @param {number} month Hebrew month
 * @param {number} day Hebrew day
 * @returns {object} Gregorian date = {year, month, day}
 */
const hebDateToGreg = (year, month, day) => gregorian.fixedToGreg(Hebrew.hebToFixed(year, month, day));

/**
 * Convert Gregorian date to Hebrew date.
 * @param {number} year Gregorian year
 * @param {number} month Gregorian month
 * @param {number} day Gregorian day
 * @returns {object} Hebrew date = {year, month, day}
 */
const gregDateToHeb = (year, month, day) => Hebrew.fixedToheb(gregorian.gregToFixed(year, month, day));

/**
 * Get jewish holidays by given month & year
 * @param {number} year Gregorian year
 * @param {number} month Gregorian month
 * @returns {Array<object>} Holidays
 */
const jewHoliByGreg = (year, month) => {
    // Length of the Gregorian month.
    const max = new Date(year, month, 0).getDate();

    const start = gregDateToHeb(year, month, 1); // The start date in Hebrew.
    const end = gregDateToHeb(year, month, max); // The end date in Hebrew.

    // The last the of the Hebrew month in Gregorian format.
    gregLastDay = hebDateToGreg(start.year, start.month, Hebrew.lastDayOfMonth(start.year, start.month)).day;

    let holidays = [];
    holidays.push(Hebrew.getHolidays(start.year, start.month));

    // If Hebrew month is ends before the Gregorian month,
    // Then add the next month holidays (padding).
    if (start.month !== end.month) {
        let h = Hebrew.getHolidays(end.year, end.month).filter((holi) => Hebrew.gimatriaToNumber(holi.sdate) < max - gregLastDay);
        holidays.push(h);
    }

    return holidays;
};

/**
 * Get jewish holidays by given month & year
 * And fixed the dates to Gregorian format.
 * @param {number} year Gregorian year
 * @param {number} month Gregorian month
 * @returns {Array<object>} Holidays
 */
const jewHoliByGregFix = (year, month) => {
    let holidays = jewHoliByGreg(year, month);
    holidays.forEach((m) => {
        m.forEach((d) => {
            d.sdate = Hebrew.gimatriaToNumber(d.sdate);
            delete d.edate;
        });
    });
    return holidays;
};

// EXPORT
module.exports = { jewHoliByGreg, gregDateToHeb, hebDateToGreg, gregYearToHebYear, jewHoliByGregFix };

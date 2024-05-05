///
/// Hybrid
///

import * as Hebrew from './calendars/hebrew/heb.js';
import * as gregorian from './calendars/gregorian/greg.js';

// List of month name
const monthsName = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'],
    he: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
};

const weeksName = {
    en: [`Su`, `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`],
    he: [`יום א'`, `יום ב'`, `יום ג'`, `יום ד'`, `יום ה'`, `יום ו'`, `שבת`],
};

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
const hebDateToGreg = (year, month, day) => gregorian.fixedToGreg(Hebrew.hebToFixed(parseInt(year), parseInt(month), parseInt(day)));

/**
 * Convert Gregorian date to Hebrew date.
 * @param {number} year Gregorian year
 * @param {number} month Gregorian month
 * @param {number} day Gregorian day
 * @returns {object} Hebrew date = {year, month, day}
 */
const gregDateToHeb = (year, month, day) => Hebrew.fixedToheb(gregorian.gregToFixed(parseInt(year), parseInt(month), parseInt(day)));

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

    let holidays = [];
    holidays.push({
        date: start,
        holidays: Hebrew.getHolidays(start.year, start.month).filter((h) => Hebrew.gimatriaToNumber(h.sdate) >= start.day),
    });

    // If Hebrew month is ends before the Gregorian month,
    // Then add the next month holidays (padding).
    if (start.month !== end.month) {
        let h = Hebrew.getHolidays(end.year, end.month).filter((holi) => Hebrew.gimatriaToNumber(holi.sdate) <= end.day);
        holidays.push({
            date: end,
            holidays: h,
        });
    }

    return holidays;
};

// Function to convert Hebrew date to English day of the week
// Return the name of the day of the week
const convertHebrewDateToDayOfWeek = (year, month, day) => new Date(Object.values(hebDateToGreg(year, month, day)).join('-')).getDay();

/**
 * Get jewish holidays by given month & year
 * And fixed the dates to Gregorian format.
 * @param {number} year Gregorian year
 * @param {number} month Gregorian month
 * @returns {Array<object>} Holidays
 */
const jewHoliByGregFix = (year, month) => {
    let holidays = jewHoliByGreg(year, month);

    let newHolidays = [];
    holidays.forEach((month) => {
        month.holidays.forEach((h) => {
            // fix delay if exist
            if (h.delay) {
                h.delay.forEach((delay) => {
                    for (let i = 0; i < delay.day.length; i++) {
                        let dayOfWeek = convertHebrewDateToDayOfWeek(month.date.year, month.date.month, Hebrew.gimatriaToNumber(h.sdate));
                        if (!delay.day.includes(dayOfWeek)) continue;
                        h.sdate = Hebrew.numberToGimatria(Hebrew.gimatriaToNumber(h.sdate) + delay.add);
                        if (h.len > 1) h.edate = Hebrew.numberToGimatria(Hebrew.gimatriaToNumber(h.edate) + delay.add);
                        else h.edate = h.sdate;
                    }
                });
            }
            let Start = hebDateToGreg(month.date.year, month.date.month, Hebrew.gimatriaToNumber(h.sdate));
            let End = hebDateToGreg(month.date.year, month.date.month, Hebrew.gimatriaToNumber(h.edate));
            h.sdate = Object.values(Start).join('-');
            h.edate = Object.values(End).join('-');
        });

        newHolidays = [...newHolidays, ...month.holidays];
    });

    return newHolidays;
};

// EXPORT
export { jewHoliByGreg, gregDateToHeb, hebDateToGreg, gregYearToHebYear, jewHoliByGregFix, monthsName, weeksName };

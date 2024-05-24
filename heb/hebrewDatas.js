'use strict';

const weeksName = [`יום א'`, `יום ב'`, `יום ג'`, `יום ד'`, `יום ה'`, `יום ו'`, `שבת`];

/**
 * Hebrew EPOCH (Monday, September 7, –3760 in Gregorian)
 */
const hEPOCH = -1373427;

/**
 * 1080 parts is one hour
 * 18 parts is one minutes
 * 1 parts is 3.3333 seconds
 */
const PARTS = 1080;

class hebrewMonths {
    constructor() {
        this.monthsValue = new Map(); // Month name and their value/number in year
        this.valueMonths = new Map(); // Value to month name
        Object.keys(this.months(false, false, true)).forEach((m, i) => {
            const value = i + 1;
            this.monthsValue.set(m, value);
            this.valueMonths.set(value, m);
        });
    }

    months(shortKislev = false, longCheshvan = false, ADARII = false) {
        /**
         * Object contains all month with builtin holidays and occasions.
         * HoA - holidays and occasions
         * RA - rejections and advances
         */
        const months = {
            NISAN: {
                len: 30,
                HoA: [
                    {
                        type: 'HOLIDAY',
                        name: 'ערב פסח',
                        date: 14,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'פסח',
                        date: 15,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'ערב פסח חג שני',
                        date: 20,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'פסח חג שני',
                        date: 21,
                    },
                    {
                        type: 'MEMORIAL_DAY',
                        name: 'יום הזיכרון לשואה ולגבורה',
                        date: 27,
                        RA: [
                            {
                                day: [5], // frieday
                                add: -1,
                            },
                            {
                                day: [0], // sunday
                                add: 1,
                            },
                        ],
                    },
                ],
            },
            IYYAR: {
                len: 29,
                HoA: [
                    {
                        type: 'MEMORIAL_DAY',
                        name: 'יום הזיכרון לחללי מערכות ישראל',
                        date: 4,
                        RA: [
                            {
                                day: [4, 5], // thursday and frieday
                                add: -1,
                            },
                            {
                                day: [0], // sunday
                                add: 1,
                            },
                        ],
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'יום העצמאות',
                        date: 5,
                        RA: [
                            {
                                day: [5, 6], // saturday and frieday
                                add: -1,
                            },
                            {
                                day: [1], // monday
                                add: 1,
                            },
                        ],
                    },
                    {
                        name: 'ערב ל"ג בעומר',
                        date: 17,
                        RA: [
                            {
                                day: [5], // friday
                                add: 1,
                            },
                        ],
                    },
                    {
                        name: 'ל"ג בעומר',
                        date: 18,
                        RA: [
                            {
                                day: [6], // saturday
                                add: 1,
                            },
                        ],
                    },
                ],
            },
            SIVAN: {
                len: 30,
                HoA: [
                    {
                        type: 'HOLIDAY',
                        name: 'ערב שבועות',
                        date: 5,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'שבועות',
                        date: 6,
                    },
                ],
            },
            TAMMUZ: {
                len: 29,
                HoA: [],
            },
            AV: {
                len: 30,
                HoA: [
                    {
                        type: 'FAST',
                        name: 'תשעה באב',
                        date: 9,

                        RA: [
                            {
                                day: [6], // saturday
                                add: 1,
                            },
                        ],
                    },
                    {
                        type: 'FESTIVAL',
                        name: 'טו באב',
                        date: 15,
                    },
                ],
            },
            ELUL: {
                len: 29,
                HoA: [
                    {
                        type: 'HOLIDAY',
                        name: 'ערב ראש השנה',
                        date: 29,
                    },
                ],
            },
            TISHRI: {
                len: 30,
                HoA: [
                    {
                        type: 'HOLIDAY',
                        name: 'ראש השנה',
                        date: 1,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'ראש השנה',
                        date: 2,
                    },
                    {
                        type: 'FAST',
                        name: 'צום גדליה',
                        date: 3,
                        RA: [
                            {
                                day: [6], // saturday
                                add: 1,
                            },
                        ],
                    },
                    {
                        type: 'FAST',
                        name: 'ערב יום כיפור',
                        date: 9,
                    },
                    {
                        type: 'FAST',
                        name: 'יום כיפור',
                        date: 10,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'ערב סוכות',
                        date: 14,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'סוכות',
                        date: 15,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'הושענא רבה',
                        date: 21,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'שמחת תורה',
                        date: 22,
                    },
                ],
            },
            CHESHVAN: {
                len: 29, // could be 29 and 30, depand on the year
                HoA: [],
            },
            KISLEV: {
                len: 30, // could be 29 and 30, depand on the year
                HoA: [
                    {
                        type: 'HOLIDAY',
                        name: 'חנוכה נר ראשון',
                        date: 24,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'חנוכה נר שני',
                        date: 25,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'חנוכה נר שלישי',
                        date: 26,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'חנוכה נר רביעי',
                        date: 27,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'חנוכה נר חמישי',
                        date: 28,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'חנוכה נר שישי',
                        date: 29,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'חנוכה נר שביעי',
                        date: 30,
                    },
                ],
            },
            TEVET: {
                len: 30,
                HoA: [
                    {
                        type: 'HOLIDAY',
                        name: 'חנוכה נר שמיני',
                        date: 1,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'חנוכה',
                        date: 2,
                    },
                ],
            },
            SHEVAT: {
                len: 29,
                HoA: [
                    {
                        type: 'HOLIDAY',
                        name: 'טו בשבט',
                        date: 15,
                    },
                ],
            },
            ADAR: {
                len: 30,
                HoA: [],
            },
            ADARII: {
                len: 29,
                HoA: [
                    {
                        type: 'FAST',
                        name: 'תענית אסתר',
                        date: 13,
                        RA: [
                            {
                                day: [6, 5], // saturday and frieday
                                add: -1,
                            },
                        ],
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'פורים',
                        date: 14,
                    },
                    {
                        type: 'HOLIDAY',
                        name: 'שושן פורים',
                        date: 15,
                    },
                ],
            },
        };

        if (!ADARII) {
            months['ADAR'].HoA = months['ADARII'].HoA;
            delete months['ADARII'];
        }

        if (shortKislev) months['KISLEV'].len = 29;
        if (longCheshvan) months['CHESHVAN'].len = 30;

        return months;
    }
}

/**
 * Stores bidirectional mappings between numbers and letters.
 */
const Gematria = {
    1: 'א',
    2: 'ב',
    3: 'ג',
    4: 'ד',
    5: 'ה',
    6: 'ו',
    7: 'ז',
    8: 'ח',
    9: 'ט',
    10: 'י',
    20: 'כ',
    30: 'ל',
    40: 'מ',
    50: 'נ',
    60: 'ס',
    70: 'ע',
    80: 'פ',
    90: 'צ',
    100: 'ק',
    200: 'ר',
    300: 'ש',
    400: 'ת',
    א: 1,
    ב: 2,
    ג: 3,
    ד: 4,
    ה: 5,
    ו: 6,
    ז: 7,
    ח: 8,
    ט: 9,
    י: 10,
    כ: 20,
    ל: 30,
    מ: 40,
    נ: 50,
    ס: 60,
    ע: 70,
    פ: 80,
    צ: 90,
    ק: 100,
    ר: 200,
    ש: 300,
    ת: 400,
};

export { hebrewMonths, hEPOCH, PARTS, Gematria, weeksName };

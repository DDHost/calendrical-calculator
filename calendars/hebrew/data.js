'user strict';

const gimatria = {
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

const months = [
    {
        name: 'nisan',
        len: 30,
        holidays: [
            {
                name: 'ערב פסח',
                sdate: 'י"ד',
                edate: 'י"ד',
            },
            {
                name: 'פסח',
                sdate: 'ט"ו',
                edate: 'ט"ו',
            },
            {
                name: 'פסח חול המועד',
                sdate: 'ט"ז',
                edate: 'כ',
            },
            {
                name: 'פסח חג שני',
                sdate: 'כ"א',
                edate: 'כ"א',
            },
            {
                name: 'אסרו חג',
                sdate: 'כ"ב',
                edate: 'כ"ב',
            },
            {
                name: 'יום הזיכרון לשואה ולגבורה',
                sdate: 'כ"ז',
                edate: 'כ"ז',
                delay: [
                    {
                        day: [0, 6], // saturday and sunday
                        add: 1,
                    },
                ],
            },
        ],
    },
    {
        name: 'iyyar',
        len: 29,
        holidays: [
            {
                name: 'יום הזיכרון לחללי מערכות ישראל',
                sdate: 'ד',
                edate: 'ד',
                delay: [
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
                name: 'יום העצמאות',
                sdate: 'ה',
                edate: 'ה',
                delay: [
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
                sdate: 'י"ז',
                edate: 'י"ז',
                delay: [
                    {
                        day: [5], // friday
                        add: 1,
                    },
                ],
            },
            {
                name: 'ל"ג בעומר',
                sdate: 'י"ח',
                edate: 'י"ח',
                delay: [
                    {
                        day: [6], // saturday
                        add: 1,
                    },
                ],
            },
        ],
    },
    {
        name: 'sivan',
        len: 30,
        holidays: [
            {
                name: 'ערב שבועות',
                sdate: 'ה',
                edate: 'ה',
            },
            {
                name: 'שבועות',
                sdate: 'ו',
                edate: 'ו',
            },
            {
                name: 'אסרו חג',
                sdate: 'ז',
                edate: 'ז',
            },
        ],
    },
    {
        name: 'tammuz',
        len: 29,
        holidays: [
            {
                name: 'צום תמוז',
                sdate: 'י"ז',
                edate: 'י"ז',
                delay: [
                    {
                        day: [6], // saturday
                        add: 1,
                    },
                ],
            },
        ],
    },
    {
        name: 'av',
        len: 30,
        holidays: [
            {
                name: 'תשעה באב',
                sdate: 'ט',
                edate: 'ט',
                delay: [
                    {
                        day: [6], // saturday
                        add: 1,
                    },
                ],
            },
            {
                name: 'טו באב',
                sdate: 'ט"ו',
                edate: 'ט"ו',
            },
        ],
    },
    {
        name: 'elul',
        len: 29,
        holidays: [
            {
                name: 'ערב ראש השנה',
                sdate: 'כ"ט',
                edate: 'כ"ט',
            },
        ],
    },
    {
        name: 'tishri',
        len: 30,
        holidays: [
            {
                name: 'ראש השנה',
                sdate: 'א',
                edate: 'ב',
            },
            {
                name: 'צום גדליה',
                sdate: 'ג',
                edate: 'ג',
                delay: [
                    {
                        day: [6], // thursday
                        add: 1,
                    },
                ],
            },
            {
                name: 'יום כיפור',
                sdate: 'ט',
                edate: 'י',
            },
            {
                name: 'ערב סוכות',
                sdate: 'י"ד',
                edate: 'י"ד',
            },
            {
                name: 'סוכות',
                sdate: 'ט"ו',
                edate: 'ט"ו',
            },
            {
                name: 'חול המועד',
                sdate: 'ט"ז',
                edate: 'כ',
            },
            {
                name: 'הושענא רבה',
                sdate: 'כ"א',
                edate: 'כ"א',
            },
            {
                name: 'שמחת תורה',
                sdate: 'כ"ב',
                edate: 'כ"ב',
            },
            {
                name: 'אסרו חג',
                sdate: 'כ"ג',
                edate: 'כ"ג',
            },
        ],
    },
    {
        name: 'cheshvan',
        len: 29, // Depands on overall length of the hebrew year, it can be 29 or 30
        holidays: [],
    },
    {
        name: 'kislev',
        len: 29, // Depands on overall length of the hebrew year, it can be 29 or 30
        holidays: [
            {
                name: 'חנוכה נר ראשון',
                sdate: 'כ"ד',
                edate: 'כ"ד',
            },
            {
                name: 'חנוכה נר שני',
                sdate: 'כ"ה',
                edate: 'כ"ה',
            },
            {
                name: 'חנוכה נר שלישי',
                sdate: 'כ"ו',
                edate: 'כ"ו',
            },
            {
                name: 'חנוכה נר רביעי',
                sdate: 'כ"ז',
                edate: 'כ"ז',
            },
            {
                name: 'חנוכה נר חמישי',
                sdate: 'כ"ח',
                edate: 'כ"ח',
            },
            {
                name: 'חנוכה נר שישי',
                sdate: 'כ"ט',
                edate: 'כ"ט',
            },
            {
                name: 'חנוכה נר שביעי',
                sdate: 'ל',
                edate: 'ל',
            },
        ],
    },
    {
        name: 'tevet',
        len: 29,
        holidays: [
            {
                name: 'חנוכה נר שמיני',
                sdate: 'א',
                edate: 'א',
            },
            {
                name: 'חנוכה',
                sdate: 'ב',
                edate: 'ב',
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
        ],
    },
    {
        name: 'shevat',
        len: 30,
        holidays: [
            {
                name: 'טו בשבט',
                sdate: 'ט"ו',
                edate: 'ט"ו',
            },
        ],
    },
    {
        name: 'adar',
        len: 30, // if common 29 and if leap is 30
        holidays: [],
    },
    {
        name: 'adarii',
        len: 29,
        holidays: [
            {
                name: 'תענית אסתר',
                sdate: 'י"ג',
                edate: 'י"ג',
                delay: [
                    {
                        day: [6, 5], // saturday and frieday
                        add: -1,
                    },
                ],
            },
            {
                name: 'פורים',
                sdate: 'י"ד',
                edate: 'י"ד',
            },
            {
                name: 'שושן פורים',
                sdate: 'ט"ו',
                edate: 'ט"ו',
            },
        ],
    },
];

module.exports = { months, gimatria };

# Clendrical Calculator

This library can calculate the Hebrew date by the Gregorian date that given and vise versa , can generates lists of Jewish holidays in given Gregorian month

Clendrical Calculator was created in 2021 and programed in javasciprt but didn't release it until october 13 2022. Most formulas in the code are formulas from the book [calendrical calculations the ultimate edition](https://www.amazon.com/Calendrical-Calculations-Ultimate-Edward-Reingold/dp/1107683165), written by Nachum Dershowitz and Edward M. Reingold.

## Functions

<dl>
<dt><a href="#gregYearToHebYear">gregYearToHebYear(year)</a> ⇒ <code>number</code></dt>
<dd><p>Converts Gregorian year to Hebrew year</p>
</dd>
<dt><a href="#hebDateToGreg">hebDateToGreg(year, month, day)</a> ⇒ <code>{year: number, month: number, day: number }</code></dt>
<dd><p>Convert Hebrew date to Gregorian date</p>
</dd>
<dt><a href="#gregDateToHeb">gregDateToHeb(year, month, day)</a> ⇒ <code>{year: number, month: number, day: number }</code></dt>
<dd><p>Convert Gregorian date to Hebrew date</p>
</dd>
<dt><a href="#getFullYearJewishHoAInGregorian">getFullYearJewishHoAInGregorian(year, month, day)</a> ⇒ <code>Map Object()</code></dt>
<dd><p>Convert Gregorian date to Hebrew date</p>
</dd>

<a name="gregYearToHebYear"></a>

## gregYearToHebYear(year) ⇒ <code>number</code>

Converts Gregorian year to Hebrew year

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| year  | <code>number</code> | Gregorian year |

<a name="hebDateToGreg"></a>

## hebDateToGreg(year, month, day) ⇒ <code>{year: number, month: number, day: number }</code>

Convert Hebrew date to Gregorian date

**Kind**: global function

| Param | Type                | Description  |
| ----- | ------------------- | ------------ |
| year  | <code>number</code> | Hebrew year  |
| month | <code>number</code> | Hebrew month |
| day   | <code>number</code> | Hebrew day   |

<a name="gregDateToHeb"></a>

## gregDateToHeb(year, month, day) ⇒ <code>{year: number, month: number, day: number }</code>

Convert Gregorian date to Hebrew date

**Kind**: global function

| Param | Type                | Description     |
| ----- | ------------------- | --------------- |
| year  | <code>number</code> | Gregorian year  |
| month | <code>number</code> | Gregorian month |
| day   | <code>number</code> | Gregorian day   |

<a name="getFullYearJewishHoAInGregorian"></a>

## getFullYearJewishHoAInGregorian(year) ⇒ <code>Map Object()</code>

Number of months in this Hebrew year (either 12 or 13 depending on leap year)

**Kind**: global function

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| year  | <code>number</code> | Hebrew year |

**Returns**: <code>Map object</code> - in the map object each key is the value of the month in Gregorian calendar and inside the each entry there is another Map Object were which each date value is the key

**Example**

```js
getFullYearJewishHoAInGregorian(2025);
/** #RETURNS#
Map(10) {
  4 => Map(6) {
    12 => { name: 'ערב פסח', type: 'HOLIDAY' },
    13 => { name: 'פסח', type: 'HOLIDAY' },
    18 => { name: 'ערב פסח חג שני', type: 'HOLIDAY' },
    19 => { name: 'פסח חג שני', type: 'HOLIDAY' },
    24 => { name: 'יום הזיכרון לשואה ולגבורה', type: 'MEMORIAL_DAY' },    
    30 => { name: 'יום הזיכרון לחללי מערכות ישראל', type: 'MEMORIAL_DAY' }
  },
  5 => Map(3) {
    1 => { name: 'יום העצמאות', type: 'HOLIDAY' },
    15 => { name: 'ערב ל"ג בעומר', type: undefined },
    16 => { name: 'ל"ג בעומר', type: undefined }
  },
  6 => Map(2) {
    1 => { name: 'ערב שבועות', type: 'HOLIDAY' },
    2 => { name: 'שבועות', type: 'HOLIDAY' }
  },
  8 => Map(2) {
    3 => { name: 'תשעה באב', type: 'FAST' },
    9 => { name: 'טו באב', type: 'FESTIVAL' }
  },
  9 => Map(4) {
    22 => { name: 'ערב ראש השנה', type: 'HOLIDAY' },
    23 => { name: 'ראש השנה', type: 'HOLIDAY' },
    24 => { name: 'ראש השנה', type: 'HOLIDAY' },
    25 => { name: 'צום גדליה', type: 'FAST' }
  },
  1 => Map(2) {
    1 => { name: 'חנוכה נר שמיני', type: 'HOLIDAY' },
    2 => { name: 'חנוכה', type: 'HOLIDAY' }
  },
  2 => Map(1) { 13 => { name: 'טו בשבט', type: 'HOLIDAY' } },
  3 => Map(3) {
    13 => { name: 'תענית אסתר', type: 'FAST' },
    14 => { name: 'פורים', type: 'HOLIDAY' },
    15 => { name: 'שושן פורים', type: 'HOLIDAY' }
  },
  10 => Map(6) {
    1 => { name: 'ערב יום כיפור', type: 'FAST' },
    2 => { name: 'יום כיפור', type: 'FAST' },
    6 => { name: 'ערב סוכות', type: 'HOLIDAY' },
    7 => { name: 'סוכות', type: 'HOLIDAY' },
    13 => { name: 'הושענא רבה', type: 'HOLIDAY' },
    14 => { name: 'שמחת תורה', type: 'HOLIDAY' }
  },
  12 => Map(9) {
    14 => { name: 'חנוכה נר ראשון', type: 'HOLIDAY' },
    15 => { name: 'חנוכה נר שני', type: 'HOLIDAY' },
    16 => { name: 'חנוכה נר שלישי', type: 'HOLIDAY' },
    17 => { name: 'חנוכה נר רביעי', type: 'HOLIDAY' },
    18 => { name: 'חנוכה נר חמישי', type: 'HOLIDAY' },
    19 => { name: 'חנוכה נר שישי', type: 'HOLIDAY' },
    20 => { name: 'חנוכה נר שביעי', type: 'HOLIDAY' },
    21 => { name: 'חנוכה נר שמיני', type: 'HOLIDAY' },
    22 => { name: 'חנוכה', type: 'HOLIDAY' }
  }
}
**/
```

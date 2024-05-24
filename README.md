# Clendrical Calculator

This library can convert a Hebrew date to Gregorian date and vise versa , it can generates lists of Jewish holidays in given Gregorian year

Clendrical Calculator was created in 2021 and programed in javasciprt but didn't release it until october 13 2022. Most formulas in the code are formulas from the book [calendrical calculations the ultimate edition](https://www.amazon.com/Calendrical-Calculations-Ultimate-Edward-Reingold/dp/1107683165), written by Nachum Dershowitz and Edward M. Reingold.

## Short explanion

The length of the hebrew year is changing year to year and depands on where rosh hashana(when the new year start, tishri 1) and also is it leap or not.

### Month

| Name     | Order | Days Length | Description                                                                           |
| -------- | ----- | ----------- | ------------------------------------------------------------------------------------- |
| Nissan   | 1     | 30          |                                                                                       |
| Iyyar    | 2     | 29          |                                                                                       |
| Sivan    | 3     | 30          |                                                                                       |
| Tammuz   | 4     | 29          |                                                                                       |
| Av       | 5     | 30          |                                                                                       |
| Elul     | 6     | 29          |                                                                                       |
| Tishrei  | 7     | 30          | is the first month of the civil year                                                  |
| Cheshvan | 8     | 29 / 30     | Depands on the langth of the year if it is 355 or 385 days then it 30 otherwise is 29 |
| Kislev   | 9     | 29 / 30     | Depands on the langth of the year if it is 353 or 383 days then it 29 otherwise is 30 |
| Tevet    | 10    | 29          |                                                                                       |
| Sh'vat   | 11    | 30          |                                                                                       |
| Adar I   | 12    | 29          |                                                                                       |
| Adar II  | 13    | 30          | Adar ii only exist if the year is leap                                                |

To convert the Hebrew date to the Gregorian date and vice versa, you must first convert the date to Rata Die fixed days and then to the desired Calendrical date.
The implantation of the conversion Hebrew date to R.D. is done by calculating how many days have passed from the first molad + Hebrew EPOCH = R.D. -1373427 (Monday, September 7, –3760 in Gregorian) to the desired year.

## Functions

<dl>
<dt><a href="#gregYearToHebYear">gregYearToHebYear(year)</a> ⇒ <code>number</code></dt>
<dd><p>Converts Gregorian year to Hebrew year.</p>
</dd>

<dt><a href="#hebDateToGreg">hebDateToGreg(year, month, day)</a> ⇒ <code>{year: number, month: number, day: number }</code></dt>
<dd><p>Convert Hebrew date to Gregorian date.</p>
</dd>

<dt><a href="#gregDateToHeb">gregDateToHeb(year, month, day)</a> ⇒ <code>{year: number, month: number, day: number }</code></dt>
<dd><p>Convert Gregorian date to Hebrew date.</p>
</dd>

<dt><a href="#getFullYearJewishHoAInGregorian">getFullYearJewishHoAInGregorian(year, month, day)</a> ⇒ <code>Map Object()</code></dt>
<dd><p>Convert Gregorian date to Hebrew date.</p>
</dd>

<dt><a href="#fixedToGreg">Gregorian.fixedToGreg(number)</a> ⇒ <code>{year: number, month: number, day: number }</code></dt>
<dd><p>Converts R.D. (Rata Die) to Gregorian date.</p>
</dd>

<dt><a href="#gregToFixed">Gregorian.gregToFixed(year, month, day)</a> ⇒ <code>number</code></dt>
<dd><p>Converts Gregorian date to R.D. (Rata Die) fixed days.</p>
</dd>

<dt><a href="#fixedToHeb">Hebrew.fixedToHeb(number)</a> ⇒ <code>{year: number, month: number, day: number }</code></dt>
<dd><p>Converts R.D. (Rata Die) to Hebrew  date.</p>
</dd>

<dt><a href="#hebToFixed">Hebrew.hebToFixed(year, month, day)</a> ⇒ <code>number</code></dt>
<dd><p>Converts Hebrew date to R.D. (Rata Die) fixed days.</p>
</dd>

<dt><a href="#numberToGematria">Hebrew.numberToGematria(year, month, day)</a> ⇒ <code>number</code></dt>
<dd><p>Converts number to his gematria value.</p>
</dd>

<dt><a href="#gematriaToNumber">Hebrew.gematriaToNumber(year, month, day)</a> ⇒ <code>number</code></dt>
<dd><p>Converts gematria to his number value.</p>
</dd>

<a name="gregYearToHebYear"></a>

## gregYearToHebYear(year) ⇒ <code>number</code>

Converts Gregorian year to Hebrew year

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| year  | <code>number</code> | Gregorian year |

<a name="hebDateToGreg"></a>

## hebDateToGreg(year, month, day) ⇒ <code>{year, month, day}</code>

Convert Hebrew date to Gregorian date

**Kind**: global function

| Param | Type                | Description  |
| ----- | ------------------- | ------------ |
| year  | <code>number</code> | Hebrew year  |
| month | <code>number</code> | Hebrew month |
| day   | <code>number</code> | Hebrew day   |

<a name="gregDateToHeb"></a>

## gregDateToHeb(year, month, day) ⇒ <code>{year, month, day}</code>

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

**Returns**: <code>Map object</code> - in the map object each key is the value of the month in Gregorian calendar and inside each entry there is another Map Object were each date value is the key

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

<a name="fixedToGreg"></a>

## Gregorian.fixedToGreg(year) ⇒ <code>number</code>

Converts R.D. (Rata Die) to Gregorian date.

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| year  | <code>number</code> | Gregorian year |

<a name="gregToFixed"></a>

## Gregorian.gregToFixed(year) ⇒ <code>number</code>

Converts Gregorian date to R.D. (Rata Die) fixed days.

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| year  | <code>number</code> | Gregorian year |

<a name="fixedToHeb"></a>

## Hebrew.fixedToHeb(year) ⇒ <code>number</code>

Converts R.D. (Rata Die) to Hebrew date.

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| year  | <code>number</code> | Gregorian year |

<a name="hebToFixed"></a>

## Hebrew.hebToFixed(year) ⇒ <code>number</code>

Converts Hebrew date to R.D. (Rata Die) fixed days.

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| year  | <code>number</code> | Gregorian year |

<a name="numberToGematria"></a>

## Hebrew.numberToGematria(number) ⇒ <code>gematria</code>

Converts number to his gematria value.

| Param  | Type                | Description                       |
| ------ | ------------------- | --------------------------------- |
| number | <code>number</code> | the number to convert to gematria |

<a name="gematriaToNumber"></a>

## Hebrew.gematriaToNumber(gematria) ⇒ <code>number</code>

Converts gematria to his number value.

| Param    | Type                | Description                         |
| -------- | ------------------- | ----------------------------------- |
| gematria | <code>string</code> | the gematria to convert to gematria |

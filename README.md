
# Clendrical Calculator
This library can calculate the Hebrew date by the Gregorian date that given and vise versa , can generates lists of Jewish holidays in given Gregorian month

Clendrical Calculator was created in 2021 and programed in javasciprt but didn't release it until october 13 2022.
Most formulas in the code are formulas from the book [calendrical calculations the ultimate edition](https://www.amazon.com/Calendrical-Calculations-Ultimate-Edward-Reingold/dp/1107683165), written by Nachum Dershowitz and Edward M. Reingold.

[test](###Get-Jewish-holidays)

## Functions

### Convert Hebrew date to Gregorian  date

| Param | Type |
| --- | --- |
| year | <code> number</code>|
| month | <code> number</code>|
| day | <code> number</code>|

*hebDateToGreg(year, month, day) ⇒ object*

**RETURN:**

    {
	    year: Number
	    month: Number
	    day: Number
    }

---
### Convert Gregorian  date to Hebrew date

| Param | Type |
| --- | --- |
| year | <code> number</code>|
| month | <code> number</code>|
| day | <code> number</code>|

*gregDateToHeb(year, month, day) ⇒ object*


**RETURN:**

    {
	    year: Number
	    month: Number
	    day: Number
    }
    
---
### Convert Gregorian year to Hebrew year

| Param | Type |
| --- | --- |
| year | <code> number</code>|

*gregYearToHebYear(year) ⇒ number*

---
### Get Jewish holidays

| Param | Type |
| --- | --- |
| year | <code> number</code> |
| month | <code> number</code> |

*hebDateToGreg(year, month) ⇒ Array\<object\>*

**RETURN:**

    [
	    {
		    name: String // Name of the holiday
		    sdate: String // Gimatria start day
		    edate: String // Gimatria end day
		    len: Number // length of the holiday
	    }
    ]
 
 **Get Jewish holidays and change the gimatria date to numbers**  
    
| Param | Type |
| --- | --- |
| year | <code> number</code> |
| month | <code> number</code> |

*jewHoliByGregFix(year, month) ⇒ Array\<object\>*

**RETURN:**

    [
	    {
		    name: String // Name of the holiday
		    sdate: Number // gimatria in number
		    len: Number // length of the holiday
	    }
    ]

# Clendrical Calculator
This library can calculate the Hebrew date by the Gregorian date that given and vise versa , can generates lists of Jewish holidays in given Gregorian month

Clendrical Calculator was created in 2021 and programed in javasciprt, but it didn't work efficnlry then rewite it with better functions.
Most formulas used in the code are formulas from the book "calendrical calculations the ultimate edition", written by Nachum Dershowitz and Edward M. Reingold.


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

### Convert Gregorian year to Hebrew year
| Param | Type |
| --- | --- |
| year | number |

*gregYearToHebYear(year) ⇒ number*

### Get Jewish holidays
| Param | Type |
| --- | --- |
| year | <code> number</code> |
| month | <code> number</code> |

*hebDateToGreg(year, month, day) ⇒ Array\<object\>*

**RETURN:**

    [
	    {
		    name: String // Name of the holiday
		    sdate: String // Gimatria start day
		    edate: String // Gimatria end day
	    }
    ]







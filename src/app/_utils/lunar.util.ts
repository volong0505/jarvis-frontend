const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"]
const CHI = ["Tí", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]
const CHI_MONTH = ["", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tí", "Sửu"]

export class LunarUtil {

    public static julianDayFromDate(dd: number, mm: number, yy: number) {
        const tempA = Math.floor((14 - mm) / 12);
        const tempMonth = mm + 12 * tempA - 3;
        const tempYear = yy + 4800 - tempA;
        let julianDay = (dd + Math.floor((153 * tempMonth + 2) / 5) + 365 * tempYear + Math.floor(tempYear / 4) - Math.floor(tempYear / 100) + Math.floor(tempYear / 400) - 32045);
        if (julianDay < 2299161)
            julianDay = dd + Math.floor((153 * tempMonth + 2) / 5) + 365 * tempYear + Math.floor(tempYear / 4) - 32083;
        return julianDay;
    }

    public static julianDayToDate(julianDay: number): Date {
        let tempA = 0;
        let tempB = 0;
        let tempC = 0;
        if (julianDay > 2299160) {
            tempA = julianDay + 32044;
            tempB = Math.floor((4 * tempA + 3) / 146097);
            tempC = tempA - Math.floor((tempB * 146097) / 4);
        } else {
            tempB = 0;
            tempC = julianDay + 32082;
        }

        const tempD = Math.floor((4 * tempC + 3) / 1461);
        const tempE = tempC - Math.floor((1461 * tempD) / 4);
        const tempM = Math.floor((5 * tempE + 2) / 153);
        const day = tempE - Math.floor((153 * tempM + 2) / 5) + 1;
        const month = tempM + 3 - 12 * Math.floor(tempM / 10)
        const year = tempB * 100 + tempD - 4800 + Math.floor(tempM / 10);

        return new Date(day, month, year)
    }

    public static newMoon(k: number): number {
        const timeJulian = k / 1236.85;
        const timeJulian2 = timeJulian * timeJulian;
        const timeJulian3 = timeJulian2 * timeJulian;
        const degreeToRadian = Math.PI / 180;
        
        let julianDay1 = (2415020.75933 + 29.53058868 * k + 0.0001178 * timeJulian2 - 0.000000155 * timeJulian3);
            julianDay1 = (julianDay1 + 0.00033 * Math.sin((166.56 + 132.87 * timeJulian - 0.009173 * timeJulian2) * degreeToRadian));

        const meanNewMoon = (359.2242 + 29.10535608 * k - 0.0000333 * timeJulian2 - 0.00000347 * timeJulian3);
        const sunMeanAnomaly = (306.0253 + 385.81691806 * k + 0.0107306 * timeJulian2 + 0.00001236 * timeJulian3);
        const moonMeanAnomaly = (21.2964 + 390.67050646 * k - 0.0016528 * timeJulian2 - 0.00000239 * timeJulian3);
        //  Moon's argument of latitude
        let moonArgLat = ((0.1734 - 0.000393 * timeJulian) * Math.sin(meanNewMoon * degreeToRadian) + 0.0021 * Math.sin(2 * degreeToRadian * meanNewMoon));
            moonArgLat = (moonArgLat - 0.4068 * Math.sin(sunMeanAnomaly * degreeToRadian) + 0.0161 * Math.sin(degreeToRadian * 2 * sunMeanAnomaly));
            moonArgLat = (moonArgLat - 0.0004 * Math.sin(degreeToRadian * 3 * sunMeanAnomaly));
            moonArgLat = (moonArgLat + 0.0104 * Math.sin(degreeToRadian * 2 * moonMeanAnomaly) - 0.0051 * Math.sin(degreeToRadian * (meanNewMoon + sunMeanAnomaly)));
            moonArgLat = (moonArgLat - 0.0074 * Math.sin(degreeToRadian * (meanNewMoon - sunMeanAnomaly)) + 0.0004 * Math.sin(degreeToRadian *(2 * moonMeanAnomaly + meanNewMoon)))
            moonArgLat = (moonArgLat - 0.0004 * Math.sin(degreeToRadian * (2 * moonMeanAnomaly - meanNewMoon))- 0.0006 * Math.sin(degreeToRadian *( 2 * moonMeanAnomaly + sunMeanAnomaly)));
            moonArgLat = (moonArgLat + 0.0010 * Math.sin(degreeToRadian * (2 * moonMeanAnomaly - sunMeanAnomaly))+ 0.0005 * Math.sin(degreeToRadian * (2*sunMeanAnomaly + meanNewMoon)));

        let deltat: number;
        if (timeJulian < -11) {
            deltat = (0.001 + 0.000839 * timeJulian + 0.0002261 * timeJulian2 - 0.00000845 * timeJulian3 - 0.000000081 * timeJulian * timeJulian3);
        } else {
            deltat = -0.000278 + 0.000265 * timeJulian + 0.000262 * timeJulian2;
        }
        return julianDay1 + moonArgLat - deltat;
    }

    public static sunLongitude(jdn: number): number {
        // Compute the longitude of the sun at any time.
        // Parameter: floating number jdn, the number of days since 1/1/4713 BC noon

        const timeInJulian = (jdn - 2451545.0) / 36525;
        const timeInJulian2 = timeInJulian * timeInJulian;
        const degreeToRadian = Math.PI / 180;
        const meanTime = (357.52910 + 35999.05030 * timeInJulian - 0.0001559*timeInJulian2 - 0.00000048 * timeInJulian * timeInJulian2);
        // mean anomaly, degree
        const meanDegree = (280.46645 + 36000.76983 * timeInJulian +  0.0003032 * timeInJulian2);
        // mean longitude, degree
        let meanLongDegree = ((1.914600 - 0.004817 * timeInJulian - 0.000014 * timeInJulian2) * Math.sin(degreeToRadian * meanTime));
            meanLongDegree += ((0.019993 - 0.000101 * timeInJulian) * Math.sin(degreeToRadian * 2 * meanTime) + 0.000290 * Math.sin(degreeToRadian * 3 * meanTime));
        let longDegree = meanDegree + meanLongDegree;  // true longitude, degree
            longDegree = longDegree * degreeToRadian;
            longDegree = longDegree - Math.PI * 2 * (Math.floor(longDegree / (Math.PI * 2)));

        //  Normalize to (0, 2*math.pi)
         return longDegree
    }

    public static getSunLongitude(dayNumber: number, timeZone: number): number {
        // Compute sun position at midnight of the day with the given Julian day number.
        // The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00.
        // The function returns a number between 0 and 11.
        // From the day after March equinox and the 1st major term after March equinox, 0 is returned. After that, return 1, 2, 3...
        return Math.floor(this.sunLongitude(dayNumber - 0.5 - timeZone / 24) / Math.PI * 6);
    }

    public static getNewMoonDay(k: number, timeZone: number) {
        // Compute the day of the k-th new moon in the given time zone.
        // The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00.
        return Math.floor(this.newMoon(k) + 0.5 + timeZone / 24);
    }

    public static getLunarMonth11(yy: number, timeZone: number): number {
        // Find the day that starts the luner month 11 of the given year for the given time zone.
        const off = this.julianDayFromDate(31, 12, yy) - 2415021;
        const k = Math.floor(off / 29.530588853);
        let lunarMonth = this.getNewMoonDay(k, timeZone);
        const sunLong = this.getSunLongitude(lunarMonth, timeZone);
        // Sun longitude at local midnight
        if (sunLong >= 9) {
            lunarMonth = this.getNewMoonDay(k - 1, timeZone)
        }

        return lunarMonth
    }

    public static getLeapMonthOffset(a11: number, timeZone: number): number {
        // Find the index of the leap month after the month starting on the day a11.
        const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
        let last = 0;
        let i = 1; // Start with month following lunar month 11.
        let arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
        while (true) {
            last = arc;
            i += 1;
            arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
            if (!(arc != last && i < 14))
                break;
        }
        return  i - 1
    }

    public static solarToLunar(solarDD: number, solarMM: number, solarYY: number, timeZone=7) {
        // Convert solar date dd/mm/yyyy to the corresponding lunar date
        // params: day, month, year in solar calendar ;
                //  time_zone with default = 7 (Ha Noi time zone)
        // rtype: list with 4 elements
                // 0: dd : In lunar calendar
                // 1: mm : In lunar calendar
                // 2: yy : In lunar calendar
                // 3: Is leap month: 1 --> leap month

        const dayNumber = this.julianDayFromDate(solarDD, solarMM, solarYY);
        const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
        let monthStart = this.getNewMoonDay(k + 1, timeZone);
        if (monthStart > dayNumber)
            monthStart = this.getNewMoonDay(k, timeZone);
        let a11 = this.getLunarMonth11(solarYY, timeZone);
        let b11 = a11;
        let lunarYear;
        if (a11 >= monthStart) {
            lunarYear = solarYY;
            a11 = this.getLunarMonth11(solarYY - 1, timeZone)
        } else {
            lunarYear = solarYY + 1;
            b11 = this.getLunarMonth11(solarYY + 1, timeZone)
        }


        const lunarDay = dayNumber - monthStart + 1;
        const diff = Math.floor((monthStart - a11) /  29);

        let lunarLeap = 0;
        let lunarMonth = diff + 11;
        let leapMonthDiff: number;
        if (b11 - a11 > 365) {
            leapMonthDiff = this.getLeapMonthOffset(a11, timeZone);
            if (diff >= leapMonthDiff) {
                lunarMonth = diff + 10;
            }
            if (diff == leapMonthDiff) {
                lunarLeap = 1;
            }
        }
        if (lunarMonth > 12) {
            lunarMonth = lunarMonth - 12;
        }

        if (lunarMonth >= 11 && diff < 4) {
            lunarYear -= 1;
        }


        return {
            lunarDay,
            lunarMonth,
            lunarYear,
            lunarLeap
        }
    }

    public static lunarToSolar(lunarDay: number, lunarMonth: number, lunarYear: number, lunarLeapMonth: number, timeZone = 7) {
        // Convert a lunar date to the corresponding solar date.
        // params: dd, mm, yy in lunar calendar
                // : leap_month: 1 if leap month; 0 if not leap month
                // : time_zone: default = 7 - Hanoi timezone
        // rtype  : list with 3 elements
                // 0: dd : In solar calendar
                // 1: mm : In solar calendar
                // 2: yy : In solar calendar

        let a11 = lunarMonth < 11 ? this.getLunarMonth11(lunarYear - 1, timeZone) : this.getLunarMonth11(lunarYear, timeZone);
        let b11 = lunarMonth < 11 ? this.getLunarMonth11(lunarYear, timeZone) : this.getLunarMonth11(lunarYear + 1, timeZone);

        const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
        let off = lunarMonth - 11;
        let leapOff;
        let leapMonth;

        if (off < 0) {
            off += 12;
        }
        if (b11 - a11 > 365) {
            leapOff = this.getLeapMonthOffset(a11, timeZone);
            leapMonth = leapOff - 2;
            if (leapMonth < 0)
                leapMonth += 12;
            if (lunarLeapMonth != 0 && lunarMonth != leapMonth) {
                return {solarDay: 0, solarMonth: 0, solarYear: 0}
            } else if (lunarLeapMonth != 0 || off >= leapOff) {
                off += 1;
            }
        }
        const monthStart = this.getNewMoonDay(k + off, timeZone);
        const data =  this.julianDayToDate(monthStart + lunarDay - 1);
        return data
    }

    public static dayInWeek(solarDD: number, solarMM: number, solarYY: number): string {
        // Get day in week by algrorithm: get julian day, get mod of julian day and 7
        // Params: 3 elements and 1 default element
            // 0: dd : In solar calendar
            // 1: mm : In solar calendar
            // 2: yy : In solar calendar
            // 3: viet_language: default = 1 return Vietnamese language
                            // : other value return English language
        const julianDay = this.julianDayFromDate(solarDD, solarMM, solarYY);
        const dateIndex = julianDay % 7;
        const dayInWeek = ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"];

        return dayInWeek[dateIndex]
    }

    public static zodiacDay(solarDD: number, solarMM: number, solarYY: number): string {
        // Find day in CAN-CHI  (zodiac) name
        //   Params: day
                // : month
                // : year
        //   rtype: str

        const julianDay = this.julianDayFromDate(solarDD, solarMM, solarYY);
        const canIndex = (julianDay + 9) % 10;
        const chiIndex = (julianDay + 1) % 12;
        return CAN[canIndex] + ' ' + CHI[chiIndex];
    }

    public static lunarLeap(yy: number): boolean {
        //  find leap year
        //  params: yy - year
        //  rtype: tre - leap year
             //    false - not leap year
        return [0, 3, 6, 9, 11, 14, 17].includes(yy % 19)
    }

    public static zodiacMonth(month: number, year: number): string {
        // Month in CAN-CHI name
        //   Params: month of lunar calendar
                // : year
        //   rtype: str
        const canIndex = (year * 12 + month + 3) % 10;
        return CAN[canIndex] + " " + CHI_MONTH[month]
    }

    public static zodiacYear(year: number): string {
        // Find year in CAN-CHI (zodiac) name'''
        const canIndex = (year + 6) % 10;
        const chiIndex = (year + 8) % 12;
        return CAN[canIndex] + " " + CHI[chiIndex];
    }

    public static solarToLunarString(solarDD: number, solarMM: number, solarYY: number, timeZone = 7) {
        const lunarDay = this.solarToLunar(solarDD, solarMM, solarYY);
        const _dayInWeek = this.dayInWeek(solarDD, solarMM, solarYY);
        const _zodiacYear = this.zodiacYear(solarYY);
        const _zodiacMonth = this.zodiacMonth(lunarDay.lunarMonth, lunarDay.lunarYear);
        const _zodiacDay = this.zodiacDay(solarDD, solarMM, solarYY);
        return `${_zodiacDay} - ${lunarDay.lunarDay}/${lunarDay.lunarMonth}`;
    }

    public static main(date: Date) {
       const dateAsArr = date.toLocaleDateString('en-GB').split("/");
       const dd = dateAsArr[0];
       const mm = dateAsArr[1];
       const yy = dateAsArr[2];

       return this.solarToLunarString(+dd, +mm, +yy, 7)
    } 
}
export class DateUtil {
  public static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public static parseDate(dateString: string): Date {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
    }
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

   public static stringToTime(text: string): Date | null {
    if (!text) return null;
    const time =  new Date(`01/01/2001 ${text}`)
    if (isNaN(time.getTime())) return null
    return time
  }

   public static timeToString(time: Date): string | null {
    if (!time) return null;
    let dateText = time.toTimeString();
    dateText = dateText.split(' ')[0].slice(0, -3);
    return dateText
  }
}
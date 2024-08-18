export function dbDateFormatUtil(date: Date): string {
    return date.toISOString().replace('T', ' ').replace('Z', '');
}
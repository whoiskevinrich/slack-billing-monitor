/**
 * Ensures a string is exactly the length specified, padding with the specified character
 * @param str the string to evaluate
 * @param length the length to enforce
 * @param padChar the character to pad with
 * @returns the original string, padded and/or trimmed to the specified length
 */
export function padString(str: string, length: number, padChar: string = ' ') {
    return str.padEnd(length, padChar).slice(0, length);
}

/**
 * @param str the string to evaluate
 * @returns the orginal string with the first letter of each word capitalized
 */
export function toTitleCase(str: string) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}
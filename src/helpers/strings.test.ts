import { padString, toTitleCase } from "./strings";

describe('padString', () => {

    test.each([
        ['hello', 10, ' ', 'hello     '],
        ['hello', 10, '_', 'hello_____'],
        ['hello', 3, '_', 'hel'],
    ])(`padString(%s, %i, %s) should return "%s"`, (str, length, padChar, expected) => {
        expect(padString(str, length, padChar)).toBe(expected);
    });
});

describe('toTitleCase', () => {
    test.each([
        ['hello world', 'Hello World'],
        ['hello world', 'Hello World'],
    ])(`toTitleCase(%s) should return "%s"`, (str, expected) => {
        expect(toTitleCase(str)).toBe(expected);
    }); 
});
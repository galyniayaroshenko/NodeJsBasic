import { validateInput, shortenPublicHoliday, validateCountry, validateYear } from '../helpers';
import { SUPPORTED_COUNTRIES } from '../config';
import { PublicHoliday, PublicHolidayShort } from '../types';

describe('helpers', () => {
  it('should validate a supported country', () => {
    const supportedCountry = SUPPORTED_COUNTRIES[0];
    const result = validateCountry(supportedCountry);
    expect(result).toBe(true);
  });

  it('should not validate an unsupported country', () => {
    const unsupportedCountry = 'InvalidCountry';
    const result = validateCountry(unsupportedCountry);
    expect(result).toBe(false);
  });

  it('should validate the current year', () => {
    const currentYear = new Date().getFullYear();
    const result = validateYear(currentYear);
    expect(result).toBe(true);
  });

  it('should not validate a different year', () => {
    const futureYear = new Date().getFullYear() + 1;
    const result = validateYear(futureYear);
    expect(result).toBe(false);
  });

  it('should throw an error for an invalid country in validateInput', () => {
    const input = { year: 2023, country: 'InvalidCountry' };
    expect(() => validateInput(input)).toThrowError('Country provided is not supported');
  });

  it('should throw an error for an invalid year in validateInput', () => {
    const input = { year: 2000, country: 'US' };
    expect(() => validateInput(input)).toThrowError('Country provided is not supported, received: US');
  });

  it('should shorten a public holiday', () => {
    const holiday: PublicHoliday = {
      date: '2023-01-01',
      localName: 'New Year',
      name: 'New Year',
      countryCode: 'US',
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ['Public'],
    };

    const result: PublicHolidayShort = shortenPublicHoliday(holiday);
    expect(result).toEqual({
      date: '2023-01-01',
      name: 'New Year',
      localName: 'New Year',
    });
  });
});

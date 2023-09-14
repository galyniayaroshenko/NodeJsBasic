import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    getListOfPublicHolidays,
    checkIfTodayIsPublicHoliday,
    getNextPublicHolidays
} from '../public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from '../../config';

const mockAxios = new MockAdapter(axios);
const SUPPORTED_COUNTRIES_GB = SUPPORTED_COUNTRIES[0];

describe('Public Holidays Service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test case
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should check if today is a public holiday', async () => {
    mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${SUPPORTED_COUNTRIES_GB}`).reply(200);

    const result = await checkIfTodayIsPublicHoliday(SUPPORTED_COUNTRIES_GB);

    expect(mockAxios.history.get.length).toBe(1); // Ensure the GET request was made once

    expect(result).toBe(true);
  });

  it('should fetch the next public holidays', async () => {
    const mockedResponse = [{}];

    mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${SUPPORTED_COUNTRIES_GB}`).reply(200, mockedResponse);

    const result = await getNextPublicHolidays(SUPPORTED_COUNTRIES_GB);

    expect(mockAxios.history.get.length).toBe(1); // Ensure the GET request was made once

    expect(result).toEqual(mockedResponse);
  });

  it('should handle errors gracefully', async () => {
    const year = 2023;

    mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${SUPPORTED_COUNTRIES_GB}`).reply(500);

    const result = await getListOfPublicHolidays(year, SUPPORTED_COUNTRIES_GB);

    expect(result).toEqual([]);
  });

  it('should fetch a list of public holidays for a specific year and country', async () => {
    const year = 2023;
    const mockedResponse = [{}];
    mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/`).reply(200, mockedResponse);

    const result = await getListOfPublicHolidays(year, '');

    expect(result).toEqual(mockedResponse);
  });

});

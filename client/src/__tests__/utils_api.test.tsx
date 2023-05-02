import { fetch_data } from '../utils/api';

describe('fetch_data function', () => {
  let originalFetch: any;

  beforeEach(() => {
    // Save a reference to the original fetch function
    originalFetch = global.fetch;
  });

  afterEach(() => {
    // Restore the original fetch function after each test
    global.fetch = originalFetch;
  });

  it('should fetch data from the server', async () => {
    // Mock the fetch function to return a successful response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'test data' }),
    });

    const data = await fetch_data('/api/data', 'GET', null, false);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    });
    expect(data).toEqual({ data: 'test data' });
  });

  it('should throw an error for non-200 response', async () => {
    // Mock the fetch function to return a non-200 response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    await expect(fetch_data('/api/data', 'GET')).rejects.toThrow('401: Unauthorized');
  });

  it('should include authorization header if authorized flag is true', async () => {
    // Mock the fetch function to return a successful response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'test data' }),
    });

    // Set access token in local storage
    localStorage.setItem('access_token', 'test_token');

    const data = await fetch_data('/api/data', 'GET', null, true);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test_token',
      },
      body: null,
    });
    expect(data).toEqual({ data: 'test data' });

    // Remove access token from local storage
    localStorage.removeItem('access_token');
  });
});

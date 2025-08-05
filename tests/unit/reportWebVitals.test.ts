import reportWebVitals from '../reportWebVitals';

// Mock web-vitals
const mockGetCLS = jest.fn();
const mockGetFID = jest.fn();
const mockGetFCP = jest.fn();
const mockGetLCP = jest.fn();
const mockGetTTFB = jest.fn();

jest.mock('web-vitals', () => ({
  getCLS: mockGetCLS,
  getFID: mockGetFID,
  getFCP: mockGetFCP,
  getLCP: mockGetLCP,
  getTTFB: mockGetTTFB
}));

describe('reportWebVitals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls web vitals functions when onPerfEntry is provided', async () => {
    const mockHandler = jest.fn();

    await reportWebVitals(mockHandler);

    // Wait for dynamic import to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockGetCLS).toHaveBeenCalledWith(mockHandler);
    expect(mockGetFID).toHaveBeenCalledWith(mockHandler);
    expect(mockGetFCP).toHaveBeenCalledWith(mockHandler);
    expect(mockGetLCP).toHaveBeenCalledWith(mockHandler);
    expect(mockGetTTFB).toHaveBeenCalledWith(mockHandler);
  });

  it('does not call web vitals functions when onPerfEntry is not provided', async () => {
    await reportWebVitals();

    // Wait a bit to ensure no async operations occur
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(mockGetCLS).not.toHaveBeenCalled();
    expect(mockGetFID).not.toHaveBeenCalled();
    expect(mockGetFCP).not.toHaveBeenCalled();
    expect(mockGetLCP).not.toHaveBeenCalled();
    expect(mockGetTTFB).not.toHaveBeenCalled();
  });

  it('does not call web vitals functions when onPerfEntry is not a function', async () => {
    await reportWebVitals('not a function' as any);

    // Wait a bit to ensure no async operations occur
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(mockGetCLS).not.toHaveBeenCalled();
    expect(mockGetFID).not.toHaveBeenCalled();
    expect(mockGetFCP).not.toHaveBeenCalled();
    expect(mockGetLCP).not.toHaveBeenCalled();
    expect(mockGetTTFB).not.toHaveBeenCalled();
  });
});

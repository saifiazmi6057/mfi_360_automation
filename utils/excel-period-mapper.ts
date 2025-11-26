
export const getPeriodsFromSheetName = (sheetName: string): string[] => {
  const validPeriods = [
    "1 Day", "1 Week", "2 Weeks", "1 Month", "3 Months", "6 Months", "9 Months",
    "1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "7 Years", "10 Years", "14 Years",
    "YTD", "Since Inception ", "FYTD"
  ];
  return validPeriods.filter(period => {
    const normalized = period.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return sheetName.toLowerCase().includes(normalized);
  });
};

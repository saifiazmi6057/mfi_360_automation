
import * as XLSX from 'xlsx';

export function getPeriodsFromSheet(filePath: string, sheetName: string): string[] {
  const workbook = XLSX.readFile(filePath);

  // Check if sheet exists
  if (!workbook.SheetNames.includes(sheetName)) {
    throw new Error(`Sheet "${sheetName}" not found in Excel file.`);
  }

  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Find the row after "Absolute %" which contains period labels
  const periodRowIndex = jsonData.findIndex((row: any[]) =>
    row.some(cell => typeof cell === 'string' && cell.includes('Absolute %'))
  );

  if (periodRowIndex === -1 || !jsonData[periodRowIndex + 1]) {
    throw new Error(`Period row not found in sheet "${sheetName}".`);
  }

  const periodLabels = jsonData[periodRowIndex + 1].filter((label: any) =>
    typeof label === 'string' && label.trim() !== ''
  );

  return periodLabels;
}


import * as XLSX from "xlsx";
import * as path from "path";

const periodRegex = /\b(\d+\s*(Day|Week|Weeks|Month|Months|Year|Years|YTD|Since Inception|LDM|LDMs))\b/i;
const genericPeriodRegex = /\b(day|week|month|year|ytd|since inception|ldm)\b/i;

function normalize(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

/**
 * Try to extract "period" values for a specific Excel row.
 * @param filePath full path to xlsx
 * @param sheetName sheet to read
 * @param targetRow 1-based row number (1 = first Excel row). If not provided, returns periods for all data rows.
 */
export function getPeriodsPerRow(filePath: string, sheetName = "Sheet1", targetRow?: number) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);

  if (!sheet["!ref"]) throw new Error("Sheet has no range (!ref) defined.");

  const range = XLSX.utils.decode_range(sheet["!ref"]);
  const headerRow = range.s.r; // zero-based index for top row

  // read header cells (may be empty)
  const headers: string[] = [];
  for (let c = range.s.c; c <= range.e.c; ++c) {
    const addr = XLSX.utils.encode_cell({ r: headerRow, c });
    headers.push((sheet[addr] && sheet[addr].v) ? String(sheet[addr].v) : "");
  }

  // helper to get cell value safely
  function cellValue(r: number, c: number) {
    const addr = XLSX.utils.encode_cell({ r, c });
    const cell = sheet[addr];
    if (!cell) return null;
    // if numeric, keep as string representation
    return (cell.v === undefined || cell.v === null) ? null : String(cell.v);
  }

  // function to detect if a header looks like period
  function headerLooksLikePeriod(h?: string) {
    if (!h) return false;
    return periodRegex.test(h) || genericPeriodRegex.test(h);
  }

  // Strategy A: If headers contain period-like names -> use header mapping per column
  const headerHasPeriod = headers.some(h => headerLooksLikePeriod(h));
  const resultsPerRow: Record<number, string[]> = {};

  for (let r = headerRow + 1; r <= range.e.r; ++r) { // iterate data rows
    const found: string[] = [];

    // Strategy A: header-driven (if header names include periods)
    if (headerHasPeriod) {
      for (let c = range.s.c; c <= range.e.c; ++c) {
        const header = headers[c - range.s.c] || "";
        if (!headerLooksLikePeriod(header)) continue; // skip non-period headers
        const val = cellValue(r, c);
        if (val !== null && val !== "" && val !== "-") {
          // there is a value under a period header -> that period applies for this row
          found.push(normalize(header));
        }
      }
    }

    // Strategy B: cell-driven (no useful headers)
    if (found.length === 0) {
      for (let c = range.s.c; c <= range.e.c; ++c) {
        const cv = cellValue(r, c);
        if (!cv) continue;

        // If the **cell text itself** looks like a period label, collect it
        if (periodRegex.test(cv) || genericPeriodRegex.test(cv)) {
          found.push(normalize(cv));
          continue;
        }

        // If current cell is a label and the next cell contains numeric (value) -> treat current as period label
        const next = cellValue(r, c + 1);
        const prev = cellValue(r, c - 1);

        // If current cell is non-numeric label and next is a numeric/percentage value, assume current is period name
        const isNumericLike = (s?: string) => {
          if (!s) return false;
          return /^-?\d+(\.\d+)?%?$/.test(s.replace(/,/g, "")); // 1000 or 12.3 or 12.3% or -0.5
        };

        if (!isNumericLike(cv) && isNumericLike(next)) {
          found.push(normalize(cv));
          continue;
        }

        // In some layouts period may be in previous column; if prev looks like period label and current is numeric => use prev
        if (isNumericLike(cv) && prev && (periodRegex.test(prev) || genericPeriodRegex.test(prev))) {
          found.push(normalize(prev));
          continue;
        }
      }
    }

    // Strategy C: fallback — sometimes first column is the period column
    if (found.length === 0) {
      const firstColVal = cellValue(r, range.s.c);
      if (firstColVal && (periodRegex.test(firstColVal) || genericPeriodRegex.test(firstColVal))) {
        found.push(normalize(firstColVal));
      }
    }

    // dedupe and store for this row (use 1-based row index for clarity)
    resultsPerRow[r + 1] = Array.from(new Set(found.map(f => f)));
  }

  // If targetRow given, return only that row's periods
  if (targetRow !== undefined) {
    return resultsPerRow[targetRow] || [];
  }
  return resultsPerRow; // mapping of excel-row -> periods[]
}

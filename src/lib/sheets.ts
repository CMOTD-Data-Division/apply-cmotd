import { google } from "googleapis";


export function getSheets() {
  const jwt = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth: jwt });
}


export async function appendResponse(row: (string | number)[]) {
  const sheets = getSheets();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Responses!A1",
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}

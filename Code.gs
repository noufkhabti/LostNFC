const SHEET_ID = "ضع_معرف_الشيت_هنا";

const DATA_SHEET = "Sheet1";
const LAST_SCAN_SHEET = "LastScan";

const ADMIN_PASSWORD = "1234";

function doGet(e) {

  if (e.parameter.action === "scan") {
    return saveLastScan(e.parameter.uid);
  }

  if (e.parameter.page === "parent") {
    return HtmlService
      .createHtmlOutputFromFile("index")
      .setTitle("استعلام ولي الأمر");
  }

  if (e.parameter.page === "admin") {
    return HtmlService
      .createHtmlOutputFromFile("admin")
      .setTitle("لوحة الإدارة");
  }

  return HtmlService
    .createHtmlOutputFromFile("home")
    .setTitle("نظام المقتنيات الذكية");
}

function getDataSheet() {
  return SpreadsheetApp
    .openById(SHEET_ID)
    .getSheetByName(DATA_SHEET);
}

function getLastScanSheet() {
  return SpreadsheetApp
    .openById(SHEET_ID)
    .getSheetByName(LAST_SCAN_SHEET);
}

function checkAdminPassword(password) {
  return String(password).trim() === ADMIN_PASSWORD;
}

function saveLastScan(uid) {

  var sheet = getLastScanSheet();

  sheet.getRange("A2").setValue(uid);

  return ContentService
    .createTextOutput("تم استقبال UID");
}

function getLastScannedItem(password) {

  if (!checkAdminPassword(password)) {
    throw new Error("الرقم السري غير صحيح");
  }

  var uid =
    getLastScanSheet()
    .getRange("A2")
    .getValue();

  if (!uid) {
    return null;
  }

  return getItemByUid(uid);
}

function getItemByUid(uid) {

  var sheet = getDataSheet();

  var data =
    sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {

    if (
      String(data[i][0]).trim() ===
      String(uid).trim()
    ) {

      return {

        uid: data[i][0],
        name: data[i][1],
        id: data[i][2],
        grade: data[i][3],
        item: data[i][4],
        status: data[i][5],
        color: data[i][6],
        description: data[i][7],
        image: data[i][8]
      };
    }
  }

  return {
    notFound: true,
    message: "القطعة غير مسجلة"
  };
}

function markDelivered(uid, password) {

  if (!checkAdminPassword(password)) {
    throw new Error("الرقم السري غير صحيح");
  }

  var sheet = getDataSheet();

  var data =
    sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {

    if (
      String(data[i][0]).trim() ===
      String(uid).trim()
    ) {

      sheet
        .getRange(i + 1, 6)
        .setValue("تم التسليم");

      getLastScanSheet()
        .getRange("A2")
        .clearContent();

      return "تم التسليم بنجاح";
    }
  }

  return "لم يتم العثور على القطعة";
}

function getItemsById(nationalId) {

  var sheet = getDataSheet();

  var data =
    sheet.getDataRange().getValues();

  var results = [];

  nationalId =
    String(nationalId).trim();

  for (var i = 1; i < data.length; i++) {

    var idInSheet =
      String(data[i][2]).trim();

    if (idInSheet === nationalId) {

      results.push({

        uid: data[i][0],
        name: data[i][1],
        id: data[i][2],
        grade: data[i][3],
        item: data[i][4],
        status: data[i][5],
        color: data[i][6],
        description: data[i][7],
        image: data[i][8]
      });
    }
  }

  return results;
}

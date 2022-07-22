/**
* Display own menu on the sheet.
*/
function onOpen() {
  // const ui = SpreadsheetApp.getUi();
  // ui.alert('★注意★\n\n現在、スクリプトを改修中です。改修終了まで、このシートの使用は控えてください。\nご協力お願いいたします。', ui.ButtonSet.OK);

  addMenu();
}


/**
 * Add own menu.
*/
function addMenu() {
  SpreadsheetApp.getUi()
    .createMenu('GAS')//1st menu
    .addItem('最新情報の取得', 'setValuesOnSheet')//2nd menu
    // .addItem('02_My Menu Item', 'myFunction02')
    // .addItem('03_My Menu Item', 'myFunction03')
    // .addItem('04_My Menu Item', 'myFunction04')
    // .addSeparator()
    // .addItem('05_My Menu Item', 'myFunction05"')
    // .addItem('06_My Menu Item', 'myFunction06')
    // .addItem('07_My Menu Item', 'myFunction07')
    //       .addSubMenu(SpreadsheetApp.getUi().createMenu('My Submenu')
    //           .addItem('One Submenu Item', 'mySecondFunction')
    //           .addItem('Another Submenu Item', 'myThirdFunction'))
    .addToUi();
}
/**
 * Function to create a new sheet and set values on it.
 */
function setValuesOnSheet() {
  const today = Utilities.formatDate(new Date(), 'JST', 'YYYYMMdd_HH:mm:ss');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const newSheet = ss.insertSheet();
  newSheet.setName(today);

  const values = objectToArray();
  console.log(values);

  newSheet.getRange(1, 1, values.length, values[0].length).setValues(values);
}



/**
 * Function to convert a multi-tier object to an array.
 * @return {array} values - List all User Groups for a team
 */
function objectToArray() {

  const response = getSlackUsergroupsList();
  // console.log(response); //ok

  const userGroups = response.usergroups;
  // console.log(userGroups);//ok

  const userGroupItems = Object.keys(userGroups);
  const values = [];
  userGroupItems.forEach(userGroupItem => {
    const object = userGroups[userGroupItem];
    const { name, id, handle, description, user_count } = object;
    const record = [name, id, handle, description, user_count];
    // object.users.forEach(user => {
    //   const userID = user;
    //   const tmpRecord = [...record];
    //   tmpRecord.push(userID);
    //   values.push(tmpRecord);
      
    // });
    values.push(record);
  });

  const headers = ["name", "id", "handle", "description", "user_count"];
  values.unshift(headers)

  console.log(values);
  return values;
}



/**
 * Get list all User Groups for a team.
 * @return {JSON} - rawResponse
 * NOTE: Need setting script property"BotUserOAuthToken"
 * SEE: https://api.slack.com/methods/usergroups.list
 */
function getSlackUsergroupsList() {
  const token = PropertiesService.getScriptProperties().getProperty('BotUserOAuthToken');
  const url = `https://www.slack.com/api/usergroups.list`;

  const options =
  {
    method: "post",
    contentType: "application/x-www-form-urlencoded",
    headers: { "Authorization": `Bearer ${token}` },
    "payload": {
      "token": token, //Required arguments-boolean
      "include_count": true, //Optional arguments-boolean
      "include_disabled": false, //Optional arguments-boolean
      "include_users": false //Optional arguments-boolean
      // "team_id": "TEAMID" //Optional arguments-string
    }
  }

  const rawResponse = UrlFetchApp.fetch(url, options);
  console.log(`rawResponse: ${rawResponse}`);
  const obj = JSON.parse(rawResponse);
  // console.log(`obj: ${obj}`);
  return obj;
}

function onloadDojoElevations(context) {
  /*
  140310006 - White
  140310007 - Yellow
  140310004 - Orange
  140310003 - Green
  140310005 - Purple
  140310000 - Black

  140310000 - 1st Degree
  140310001 - 2nd Degree
  140310002 - 3rd Degree
  140310003 - No Degree
  */
  var formContext = context.getFormContext();
  var currentdojolevel = formContext.getAttribute("pg_currentdojolevel").getValue();
  var currentdojodegree = formContext.getAttribute("pg_currentdojodegree").getValue();
  var dojolevel = formContext.getControl("pg_dojobeltlevel");
  var dojodegree = formContext.getControl("pg_dojobeltdegree");

  var dojoleveloptions = dojolevel.getOptions();
  var dojodegreeoptions = dojodegree.getOptions();

  //Hide Last Elevated Date
  var lastElevatedDate = formContext.getControl("pg_dojolastelevated");
  var year = formContext.getAttribute("pg_dojolastelevated").getValue().getYear();
  if (year < 80) {
      lastElevatedDate.setVisible(false);
  }

  //Clear OptionSets
  for (let i = 0; i < dojoleveloptions.length; i++) {
      dojolevel.removeOption(dojoleveloptions[i].value);
  }
  /*
  for (let i = 0; i < dojodegreeoptions.length; i++) {
      dojodegree.removeOption(dojodegreeoptions[i].value);
  }
  */

  //Add two level elevation

  //White - No Degree
  if ((currentdojolevel == 140310006) && (currentdojodegree == 140310003)) {
      dojolevel.addOption({ text: 'Blue', value: 140310001 });
      dojolevel.addOption({ text: 'Yellow', value: 140310007 });
  }
  else if ((currentdojolevel == 1) && (currentdojodegree == 0)) {
      dojolevel.addOption({ text: 'Blue', value: 140310001 });
      dojolevel.addOption({ text: 'Yellow', value: 140310007 });
  }
  //Blue - 1st Degree
  else if ((currentdojolevel == 140310001) && (currentdojodegree == 140310000  || currentdojodegree == 140310003)) {
      dojolevel.addOption({ text: 'Blue', value: 140310001 });
  }
  else if ((currentdojolevel == 2) && (currentdojodegree == 1  || currentdojodegree == 0)) {
      dojolevel.addOption({ text: 'Blue', value: 140310001 });
  }
  //Blue - 2nd Degree
  else if ((currentdojolevel == 140310001) && (currentdojodegree == 140310001)) {
      dojolevel.addOption({ text: 'Blue', value: 140310001 });
      dojolevel.addOption({ text: 'Yellow', value: 140310007 });
  }
  else if ((currentdojolevel == 2) && (currentdojodegree == 2)) {
      dojolevel.addOption({ text: 'Blue', value: 140310001 });
      dojolevel.addOption({ text: 'Yellow', value: 140310007 });
  }
  //Blue - 3rd Degree
  else if ((currentdojolevel == 140310001) && (currentdojodegree == 140310002)) {
      dojolevel.addOption({ text: 'Yellow', value: 140310007 });
  }
  else if ((currentdojolevel == 2) && (currentdojodegree == 3)) {
      dojolevel.addOption({ text: 'Yellow', value: 140310007 });
  }
  //Yellow - 1st Degree
  else if ((currentdojolevel == 140310007) && (currentdojodegree == 140310000 || currentdojodegree == 140310003)) {
      dojolevel.addOption({ text: 'Yellow', value: 140310007 });
  }
  else if ((currentdojolevel == 3) && (currentdojodegree == 1 || currentdojodegree == 0)) {
      dojolevel.addOption({ text: 'Yellow', value: 140310007 });
  }
  //Yellow - 2nd Degree
  else if ((currentdojolevel == 140310007) && (currentdojodegree == 140310001)) {
      dojolevel.addOption({ text: 'Yellow', value: 140310007 });
      dojolevel.addOption({ text: 'Orange', value: 140310004 });
  }
  else if ((currentdojolevel == 3) && (currentdojodegree == 2)) {
      dojolevel.addOption({ text: 'Yellow', value: 140310007 });
      dojolevel.addOption({ text: 'Orange', value: 140310004 });
  }
  //Yellow - 3rd Degree
  else if ((currentdojolevel == 140310007) && (currentdojodegree == 140310002)) {
      dojolevel.addOption({ text: 'Orange', value: 140310004 });
  }
  else if ((currentdojolevel == 3) && (currentdojodegree == 3)) {
      dojolevel.addOption({ text: 'Orange', value: 140310004 });
  }
  //Orange - 1st Degree
  else if ((currentdojolevel == 140310004) && (currentdojodegree == 140310000 || currentdojodegree == 140310003)) {
      dojolevel.addOption({ text: 'Orange', value: 140310004 });
  }
  else if ((currentdojolevel == 4) && (currentdojodegree == 1 || currentdojodegree == 0)) {
      dojolevel.addOption({ text: 'Orange', value: 140310004 });
  }
  //Orange - 2nd Degree
  else if ((currentdojolevel == 140310004) && (currentdojodegree == 140310001)) {
      dojolevel.addOption({ text: 'Orange', value: 140310004 });
      dojolevel.addOption({ text: 'Green', value: 140310003 });
  }
  else if ((currentdojolevel == 4) && (currentdojodegree == 2)) {
      dojolevel.addOption({ text: 'Orange', value: 140310004 });
      dojolevel.addOption({ text: 'Green', value: 140310003 });
  }
  //Orange - 3rd Degree
  else if ((currentdojolevel == 140310004) && (currentdojodegree == 140310002)) {
      dojolevel.addOption({ text: 'Green', value: 140310003 });
  }
  else if ((currentdojolevel == 4) && (currentdojodegree == 3)) {
      dojolevel.addOption({ text: 'Green', value: 140310003 });
  }
  //Green - 1st Degree
  else if ((currentdojolevel == 140310003) && (currentdojodegree == 140310000 || currentdojodegree == 140310003)) {
      dojolevel.addOption({ text: 'Green', value: 140310003 });
  }
  else if ((currentdojolevel == 5) && (currentdojodegree == 1 || currentdojodegree == 0)) {
      dojolevel.addOption({ text: 'Green', value: 140310003 });
  }
  //Green - 2nd Degree
  else if ((currentdojolevel == 140310003) && (currentdojodegree == 140310001)) {
      dojolevel.addOption({ text: 'Green', value: 140310003 });
      dojolevel.addOption({ text: 'Purple', value: 140310005 });
  }
  else if ((currentdojolevel == 5) && (currentdojodegree == 2)) {
      dojolevel.addOption({ text: 'Green', value: 140310003 });
      dojolevel.addOption({ text: 'Purple', value: 140310005 });
  }
  //Green - 3rd Degree
  else if ((currentdojolevel == 140310003) && (currentdojodegree == 140310002)) {
      dojolevel.addOption({ text: 'Purple', value: 140310005 });
  }
  else if ((currentdojolevel == 5) && (currentdojodegree == 3)) {
      dojolevel.addOption({ text: 'Purple', value: 140310005 });
  }
  //Purple - 1st Degree
  else if ((currentdojolevel == 140310005) && (currentdojodegree == 140310000 || currentdojodegree == 140310003)) {
      dojolevel.addOption({ text: 'Purple', value: 140310005 });
  }
  else if ((currentdojolevel == 6) && (currentdojodegree == 1 || currentdojodegree == 0)) {
      dojolevel.addOption({ text: 'Purple', value: 140310005 });
  }
  //Purple -2nd Degree
  else if (((currentdojolevel == 140310005) && (currentdojodegree == 140310001)) || ((currentdojolevel == 6) && (currentdojodegree == 2))) {
      dojolevel.addOption({ text: 'Purple', value: 140310005 });
      dojolevel.addOption({ text: 'Black', value: 140310000 });
  }
  //Purple - 3rd Degree
  else if (((currentdojolevel == 140310005) && (currentdojodegree == 140310002)) || (currentdojolevel == 6) && (currentdojodegree == 3)) {
      dojolevel.addOption({ text: 'Black', value: 140310000 });
  }
  //Black Belt - not needed

  //update DojoDegreeOptionset
  onChangeDojoDegree(context);
}

function onChangeDojoDegree(context){
  //Check Dojo Level vs Current
  var formContext = context.getFormContext();
  var currentdojolevel = formContext.getAttribute("pg_currentdojolevel").getValue();
  var currentdojodegree = formContext.getAttribute("pg_currentdojodegree").getValue();
  var dojolevel = formContext.getAttribute("pg_dojobeltlevel").getValue();
  var dojodegree = formContext.getControl("pg_dojobeltdegree");

  var dojodegreeoptions = dojodegree.getOptions();

  for (let i = 0; i < dojodegreeoptions.length; i++) {
      dojodegree.removeOption(dojodegreeoptions[i].value);
  }

  if (dojolevel != null) {
      if (currentdojolevel == dojolevel) {
          if (currentdojodegree == 140310000 || currentdojodegree == 1) {
              dojodegree.addOption({ text: '2nd Degree', value: 140310001 });
              dojodegree.addOption({ text: '3rd Degree', value: 140310002 });
          }
          else if (currentdojodegree == 140310003 || currentdojodegree == 0) {
              dojodegree.addOption({ text: '1st Degree', value: 140310000 });
              dojodegree.addOption({ text: '2nd Degree', value: 140310001 });
          }
          else dojodegree.addOption({ text: '3rd Degree', value: 140310002 });
      }
      else if (currentdojolevel != dojolevel) {
          dojodegree.addOption({ text: 'No Degree', value: 140310003 });
          if (currentdojodegree == 140310002 || currentdojodegree == 3) {
dojodegree.addOption({ text: '1st Degree', value: 140310000 });
           //   dojodegree.addOption({ text: '2nd Degree', value: 140310001 });
          }
          if ((currentdojodegree == 140310003 && currentdojolevel == 140310006 && dojolevel == 140310001) || (currentdojodegree == 0 && currentdojolevel == 1 && dojolevel == 1)) {
              dojodegree.addOption({ text: '1st Degree', value: 140310000 });
              dojodegree.addOption({ text: '2nd Degree', value: 140310001 });
              dojodegree.addOption({ text: '3rd Degree', value: 140310002 });
          }
      }
  }
}

























function DojoHistory(context) {
  var formContext = context.getFormContext();
  var today = new Date();

  var day1 = today[0];
  var month1 = today[1].toLocaleLowerCase();
   var year1 = today[2];



   // Get the current date
var currentDate = new Date();

// Get the current month (months are zero-based, so January is 0, February is 1, etc.)
var currentMonth = currentDate.getMonth();

// Get the current year
var currentYear = currentDate.getFullYear();

// Define the quarterly field value based on the current month
var quarterlyValue;
if (currentMonth >= 0 && currentMonth <= 2) {
   // January to March (Q1)
   quarterlyValue = 'Q1 ' + currentYear;
} else if (currentMonth >= 3 && currentMonth <= 5) {
   // April to June (Q2)
   quarterlyValue = 'Q2 ' + currentYear;
} else if (currentMonth >= 6 && currentMonth <= 8) {
   // July to September (Q3)
   quarterlyValue = 'Q3 ' + currentYear;
} else {
   // October to December (Q4)
   quarterlyValue = 'Q4 ' + currentYear;
}

// Now you can update the quarterly field value in your CRM system with the 'quarterlyValue'
console.log('Updating quarterly field value to:', quarterlyValue);
// Assuming you have a function to update the field in your CRM system, call it here.
// updateQuarterlyFieldValue(quarterlyValue);
  // Get current values
  var dojo = formContext.getAttribute("cdm_dojo_custom").getValue();
  var dojodegree = formContext.getAttribute("cdm_dojodegree_custom").getValue();
var dojodegreetext = formContext.getAttribute("cdm_dojodegree_custom").getText().replace(/-/g, ' '); 
//  var dojodegreetext = formContext.getAttribute("cdm_dojodegree_custom").getText();
  var dojobeltlevel = formContext.getAttribute("cdm_dojobeltlevel_custom").getValue();
  var dojobeltleveltext = formContext.getAttribute("cdm_dojobeltlevel_custom").getText();
  var dojolastelevateddate_custom = formContext.getAttribute("cdm_dojolastelevateddate_custom").getValue();
  var formattedDatedojolastelevateddate_custom = (dojolastelevateddate_custom.getDate() < 10 ? '0' : '') + dojolastelevateddate_custom.getDate() + '/' + 
  ((dojolastelevateddate_custom.getMonth() + 1) < 10 ? '0' : '') + (dojolastelevateddate_custom.getMonth() + 1) + '/' + 
  dojolastelevateddate_custom.getFullYear().toString().substring(2);
  //cdm_dojolastelevateddate_custom
  var today = new Date();
// Format the date as "dd/MM/yy"
var formattedDate = (today.getDate() < 10 ? '0' : '') + today.getDate() + '/' + 
((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '/' + 
today.getFullYear().toString().substring(2);
  // Get existing history
  var dojohistory = formContext.getAttribute("pg_dojohistory").getValue() || "";


var historyEntry = dojobeltleveltext + " " + dojodegreetext + " " + " ("+ formattedDatedojolastelevateddate_custom + ") "+quarterlyValue+ "\n";
dojohistory += historyEntry;
 formContext.getAttribute("pg_dojohistory").setValue(dojohistory);
}
































function DojoHistory(context) {
  var formContext = context.getFormContext();

  // Get current values
  var dojo = formContext.getAttribute("cdm_dojo_custom").getValue();
  var dojodegree = formContext.getAttribute("cdm_dojodegree_custom").getValue();
  var dojodegreetext = formContext.getAttribute("cdm_dojodegree_custom").getText();
  var dojobeltlevel = formContext.getAttribute("cdm_dojobeltlevel_custom").getValue();
  var dojobeltleveltext = formContext.getAttribute("cdm_dojobeltlevel_custom").getText();
  var dojolastelevateddate_custom = formContext.getAttribute("cdm_dojolastelevateddate_custom").getValue();
  var formattedDatedojolastelevateddate_custom = (dojolastelevateddate_custom.getDate() < 10 ? '0' : '') + dojolastelevateddate_custom.getDate() + '/' + 
  ((dojolastelevateddate_custom.getMonth() + 1) < 10 ? '0' : '') + (dojolastelevateddate_custom.getMonth() + 1) + '/' + 
  dojolastelevateddate_custom.getFullYear().toString().substring(2);
  //cdm_dojolastelevateddate_custom
  var today = new Date();
// Format the date as "dd/MM/yy"
var formattedDate = (today.getDate() < 10 ? '0' : '') + today.getDate() + '/' + 
((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '/' + 
today.getFullYear().toString().substring(2);
  // Get existing history
  var dojohistory = formContext.getAttribute("pg_dojohistory").getValue() || "";

  // Create a history entry
  var historyEntry = dojobeltleveltext + " " + dojodegreetext + " " +"Elevated on" + " "+ formattedDatedojolastelevateddate_custom + "\n";

  // Update the history
 // dojohistory += historyEntry;

  // Set the updated history back to the field
 // formContext.getAttribute("pg_dojohistory").setValue(dojohistory);

 var historyEntry = "<tr><td>" + dojobeltleveltext + "</td><td>" + dojodegreetext + "</td><td>" +
 "Elevated on" + "</td><td>" + formattedDatedojolastelevateddate_custom + "</td></tr>\n";

// Update the history
dojohistory += historyEntry;

// Build the complete HTML table
var tableHtml = "<table><tr><th>Belt Level</th><th>Degree</th><th>Action</th><th>Date</th></tr>" + dojohistory + "</table>";

// Set the updated history back to the field
formContext.getAttribute("pg_dojohistory").setValue(tableHtml);
}



function DojoHistory(context) {
  var formContext = context.getFormContext();

  // Get current values
  var dojo = formContext.getAttribute("cdm_dojo_custom").getValue();
  var dojodegree = formContext.getAttribute("cdm_dojodegree_custom").getValue();
var dojodegreetext = formContext.getAttribute("cdm_dojodegree_custom").getText().replace(/-/g, ' '); 
//  var dojodegreetext = formContext.getAttribute("cdm_dojodegree_custom").getText();
  var dojobeltlevel = formContext.getAttribute("cdm_dojobeltlevel_custom").getValue();
  var dojobeltleveltext = formContext.getAttribute("cdm_dojobeltlevel_custom").getText();
  var dojolastelevateddate_custom = formContext.getAttribute("cdm_dojolastelevateddate_custom").getValue();
  var formattedDatedojolastelevateddate_custom = (dojolastelevateddate_custom.getDate() < 10 ? '0' : '') + dojolastelevateddate_custom.getDate() + '/' + 
  ((dojolastelevateddate_custom.getMonth() + 1) < 10 ? '0' : '') + (dojolastelevateddate_custom.getMonth() + 1) + '/' + 
  dojolastelevateddate_custom.getFullYear().toString().substring(2);
  //cdm_dojolastelevateddate_custom
  var today = new Date();
// Format the date as "dd/MM/yy"
var formattedDate = (today.getDate() < 10 ? '0' : '') + today.getDate() + '/' + 
((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '/' + 
today.getFullYear().toString().substring(2);
  // Get existing history
  var dojohistory = formContext.getAttribute("pg_dojohistory").getValue() || "";

  // Create a history entry
  var historyEntry = dojobeltleveltext + " " + dojodegreetext + " " + " ("+ formattedDatedojolastelevateddate_custom + ") "+"\n";

  // Update the history
  dojohistory += historyEntry;

  // Set the updated history back to the field
  formContext.getAttribute("pg_dojohistory").setValue(dojohistory);
}











function DojoHistory(context) {
  var formContext = context.getFormContext();

  // ... (your existing code)

  // Create a history entry
  var historyEntry = "<tr><td>" + dojobeltleveltext + "</td><td>" + dojodegreetext + "</td><td>" +
    "Elevated on" + "</td><td>" + formattedDatedojolastelevateddate_custom + "</td></tr>\n";

  // Update the history
  dojohistory += historyEntry;

  // Set the updated history back to the field
  formContext.getAttribute("pg_dojohistory").setValue(dojohistory);

  // Display the table with the provided data
  displayHistoryTable(formContext);
}

function displayHistoryTable(formContext) {
  // Get the section on the form where you want to display the table
  var sectionName = "YourSectionName"; // Replace with the actual section name
  var section = formContext.ui.tabs.get("YourTabName").sections.get(sectionName); // Replace with the actual tab name

  // Create an HTML table element
  var table = document.createElement("table");
  table.innerHTML = "<tr><th>DOJO Belt</th><th>Elevation Date</th><th>Quarter</th></tr>" +
    "<tr><td>Yellow 1st Degree</td><td>10/12/2023</td><td>Q3 - 2023</td></tr>" +
    "<tr><td>Yellow No Degree</td><td>05/05/2022</td><td>Q2 - 2022</td></tr>" +
    "<tr><td>Blue 3rd Degree</td><td>02/14/2022</td><td>Q1 - 2022</td></tr>" +
    "<tr><td>Blue No Degree</td><td>09/13/2021</td><td>Q3 - 2021</td></tr>";

  // Append the table to the section
  section.controls.add({
    // Use the "Web Resource" type and set the content to the HTML table
    controlType: "webresource",
    webResourceName: "YourWebResourceName", // Replace with the actual web resource name
    data: table.outerHTML
  });
}











var historyEntry = "<tr><td>" + dojobeltleveltext + "</td><td>" + dojodegreetext + "</td><td>" +
"Elevated on" + "</td><td>" + formattedDatedojolastelevateddate_custom + "</td></tr>\n";

// Update the history
dojohistory += historyEntry;

// Set the updated history back to the web resource
var webResourceControl = formContext.getControl("WebResource_DojoHistory"); //actual web resource control name
webResourceControl.getContentWindow().then(function (webResourceWindow) {
var tableBody = webResourceWindow.document.querySelector("table tbody");
tableBody.innerHTML = dojohistory;
});
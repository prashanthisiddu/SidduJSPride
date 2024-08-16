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
  
    var today = new Date();
  
  var formattedDate = (today.getDate() < 10 ? '0' : '') + today.getDate() + '/' + 
  ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '/' + 
  today.getFullYear().toString().substring(2);
    // Get existing history
    var dojohistory = formContext.getAttribute("pg_dojohistory").getValue() || "";
  
   
      
    
    var currentDate = new Date();
      var currentMonth = currentDate.getMonth();
      var currentYear = currentDate.getFullYear(); 
      
      var quarterlyValue;
      if (currentMonth >= 0 && currentMonth <= 2) {
    
          quarterlyValue = 'Q1 ' + currentYear;
      } else if (currentMonth >= 3 && currentMonth <= 5) {
      
          quarterlyValue = 'Q2 ' + currentYear;
      } else if (currentMonth >= 6 && currentMonth <= 8) {
       
          quarterlyValue = 'Q3 ' + currentYear;
      } else {
      
          quarterlyValue = 'Q4 ' + currentYear;
      }
     // console.log('Updating quarterly field value to:', quarterlyValue);
  var historyEntry = dojobeltleveltext + " " + dojodegreetext + " " + " ("+ formattedDatedojolastelevateddate_custom + ") "+ quarterlyValue +"\n";
  dojohistory += historyEntry;
   formContext.getAttribute("pg_dojohistory").setValue(dojohistory);
  
 /* var historyEntry = '<table border="1" style="width:100%">';
      historyEntry += '<tr><th>Belt Level</th><th>Degree</th><th>Date</th><th>Quarter</th></tr>';
      historyEntry += '<tr>';
      historyEntry += '<td>' + (dojobeltleveltext || "") + '</td>';
      historyEntry += '<td>' + (dojodegreetext || "") + '</td>';
      historyEntry += '<td>' + formattedDatedojolastelevateddate_custom + '</td>';
      historyEntry += '<td>' + quarterlyValue + '</td>';
      historyEntry += '</tr>';
      historyEntry += '</table>';
  console.log("Formatted History Entry:", historyEntry);*/
  }
  
  
  
  
  
  
  
  
  
  
  //jie
  function gridRowSelected(context) {
      var fieldsList = ["new_name", "pg_targetdecimal", "pg_completioncalculated", "pg_completion", "pg_goalweight"];
      context.getFormContext().getData().getEntity().attributes.forEach(function (attr) {
          var fld = attr.getName();
          if (fieldsList.includes(fld)) {
              attr.controls.forEach(function (c) {
                  c.setDisabled(true);
              });
          }
      });
  }
  
  function lockComments(context) {
      var usersettings = Xrm.Utility.getGlobalContext().userSettings;
      var formContext = context.getFormContext();
      var fieldsList = ["pg_goalcomment"];
  
      if (usersettings.userId == formContext.getAttribute("ownerid").getValue()[0].id) {
          context.getFormContext().getData().getEntity().attributes.forEach(function (attr) {
              var fld = attr.getName();
              if (fieldsList.includes(fld)) {
                  attr.controls.forEach(function (c) {
                      c.setDisabled(true);
                  });
              }
          });
      }
      else {
          context.getFormContext().getData().getEntity().attributes.forEach(function (attr) {
              var fld = attr.getName();
              if (fieldsList.includes(fld)) {
                  attr.controls.forEach(function (c) {
                      c.setDisabled(false);
                  });
              }
          });
      }
  
  }
  
  function MultiCopyToNext(context) {
      var formcontext = context;
  
      if (formcontext.getAttribute("pg_currentstatus").getValue() == 140310003) {
          return true;
      }
      else false;
  }
  
  function goalonload(context) {
      formContext = context.getFormContext();
      try {
          var empid = formContext.getAttribute("new_employeeid").getValue()[0].id;
          var usersettings = Xrm.Utility.getGlobalContext().userSettings;
  
          Xrm.WebApi.retrieveRecord("new_employee", empid, "?$select=pg_currentstatus").then(
              function success(result) {
                  //
                  (typeof result.pg_currentstatus);
                  var status = result.pg_currentstatus;
                  if (usersettings.Id = "fa1cc3dc-bf83-eb11-b1ab-000d3a1bfbad") {
                      formContext.getControl("new_overview").setDisabled(false);
                      //formContext.getControl("pg_actualdecimal").setDisabled(true);
                      formContext.getControl("pg_targetdecimal").setDisabled(false);
                      formContext.getControl("pg_goalweight").setDisabled(false);
                      formContext.getControl("new_name").setDisabled(false);
                  }
                  else if (status === 140310002 || status === 140310003 || status === 140310004 || status === 140310005 || status === 140310006) {
                      formContext.getControl("new_overview").setDisabled(true);
                      //formContext.getControl("pg_actualdecimal").setDisabled(true);
                      formContext.getControl("pg_targetdecimal").setDisabled(true);
                      formContext.getControl("new_name").setDisabled(true);
                  }
  
              },
              function (error) { console.log(error.message) });
      }
      catch {
  
      }
  }
  
  function goalonload(context) {
      formContext = context.getFormContext();
      try {
          var empid = formContext.getAttribute("new_employeeid").getValue()[0].id;
  
          Xrm.WebApi.retrieveRecord("new_employee", empid, "?$select=pg_currentstatus").then(
              function success(result) {
                  //alert(typeof result.pg_currentstatus);
                  var status = result.pg_currentstatus;
                  if (status === 140310002 || status === 140310003 || status === 140310004 || status === 140310005 || status === 140310006) {
                      formContext.getControl("new_overview").setDisabled(true);
                      //formContext.getControl("pg_actualdecimal").setDisabled(true);
                      formContext.getControl("pg_targetdecimal").setDisabled(true);
                      formContext.getControl("new_name").setDisabled(true);
                  }
  
              },
              function (error) { console.log(error.message) });
      }
      catch {
  
      }
  }
  
  function xgoalonload(context) {
      formContext = context.getFormContext();
  
      if (formContext.getAttribute("new_employeeid").getValue() != null) {
          try {
              var empid = formContext.getAttribute("new_employeeid").getValue()[0].id;
  
              Xrm.WebApi.retrieveRecord("new_employee", empid, "?$select=pg_currentstatus").then(
                  function success(result) {
                      //alert(typeof result.pg_currentstatus);
                      var status = result.pg_currentstatus;
                      if (status === 140310002 || status === 140310003 || status === 140310004 || status === 140310005 || status === 140310006) {
                          formContext.getControl("new_overview").setDisabled(true);
                          //formContext.getControl("pg_actualdecimal").setDisabled(true);
                          formContext.getControl("pg_targetdecimal").setDisabled(true);
                          formContext.getControl("pg_goalweight").setDisabled(true);
                          formContext.getControl("new_name").setDisabled(true);
                      }
  
                  },
                  function (error) { console.log(error.message) });
          }
          catch {
  
          }
      }
      if (formContext.getAttribute("pg_onerating").getValue() != null) {
          formContext.getControl("pg_actualdecimal").setDisabled(true);
      }
  }
  
  //Remove Goal
  function enableRemove(primarycontrol) {
      var formContext = primarycontrol;
      var empid = formContext.getAttribute("new_employeeid").getValue()[0].id;
  
      Xrm.WebApi.retrieveRecord("new_employee", empid, "?$select=pg_currentstatus").then(
          function success(result) {
              //alert(typeof result.pg_currentstatus);
              var currentstage = result.pg_currentstatus;
              if (currentstage == 140310000 || currentstage == 140310001) {
                  return true;
                  formContext.ui.refreshRibbon();
              }
              else {
                  return false;
              }
          },
          function (error) { console.log(error.message) });
  
  }
  
  var GoalRibbon = (function () {
      var isAsyncOperationCompleted = false;
      var isButtonEnabled = false;
  
      function IsButtonEnabled(primarycontrol) {
          //If async operation was already completed I just return the result of it
          if (isAsyncOperationCompleted) {
              return isButtonEnabled;
          }
  
          var formContext = primarycontrol;
          var empid = formContext.getAttribute("new_employeeid").getValue()[0].id;
  
          Xrm.WebApi.retrieveRecord("new_employee", empid, "?$select=pg_currentstatus").then(
              function success(result) {
                  //Async operation was completed successfully
                  isAsyncOperationCompleted = true;
                  var currentstage = result.pg_currentstatus;
                  var usersettings = Xrm.Utility.getGlobalContext().userSettings;
                  if ((currentstage == 140310000 || currentstage == 140310001) && primarycontrol.getAttribute("new_employeeid").getValue() != null && usersettings.userId != primarycontrol.getAttribute("ownerid").getValue()[0].id) {
                      isButtonEnabled = true;
                  }
  
                  //so if role is there - just refresh the ribbon to see the button
                  if (isButtonEnabled) {
                      formContext.ui.refreshRibbon();
                  }
              },
              function (error) {
                  //if something went wrong during the data retrieval
                  //operation is marked as completed and error message is shown
                  isAsyncOperationCompleted = true;
                  Xrm.Navigation.openAlertDialog({ text: error.message });
              }
          );
  
          //Just a stub that hides button by default
          //if role is available for a user - refresh of ribbon will unhide the button
          return false;
      }
  
      return {
          IsButtonEnabled: IsButtonEnabled
      };
  })();
  
  function removeXGoalAction(primarycontrol) {
      var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Remove Goal?", title: "Confirmation" };
      var confirmOptions = { height: 200, width: 300 };
      Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
          if (success.confirmed) {
              var recordId = primarycontrol.data.entity.getId();
              var workflowId = "5a450b19-f0d6-427b-85af-785d2e2c0f44";
              var functionName = "executeWorkflow >>";
              var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
              var data = {
                  "EntityId": recordId
              };
              var req = new XMLHttpRequest();
              req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
              req.setRequestHeader("Accept", "application/json");
              req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
              req.setRequestHeader("OData-MaxVersion", "4.0");
              req.setRequestHeader("OData-Version", "4.0");
  
              req.onreadystatechange = function () {
                  if (this.readyState == 4 /* complete */) {
                      if (this.status == 204 || this.status == 200) {
                          primarycontrol.data.entity.save("saveandclose");
  
                      } else {
                          //error callback
                      }
                  }
              };
  
              req.send(JSON.stringify(data));
          }
      });
  }
  
  function removeYGoalAction(primarycontrol) {
      var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Remove Goal?", title: "Confirmation" };
      var confirmOptions = { height: 200, width: 300 };
      Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
          if (success.confirmed) {
              var recordId = primarycontrol.data.entity.getId();
              var workflowId = "673d37c9-2f97-4328-8078-a923b744749a";
              var functionName = "executeWorkflow >>";
              var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
              var data = {
                  "EntityId": recordId
              };
              var req = new XMLHttpRequest();
              req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
              req.setRequestHeader("Accept", "application/json");
              req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
              req.setRequestHeader("OData-MaxVersion", "4.0");
              req.setRequestHeader("OData-Version", "4.0");
  
              req.onreadystatechange = function () {
                  if (this.readyState == 4 /* complete */) {
                      if (this.status == 204 || this.status == 200) {
                          primarycontrol.data.entity.save("saveandclose");
  
                      } else {
                          //error callback
                      }
                  }
              };
  
              req.send(JSON.stringify(data));
          }
      });
  }
  
  function removeMeGoalAction(primarycontrol) {
      var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Remove Goal?", title: "Confirmation" };
      var confirmOptions = { height: 200, width: 300 };
      Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
          if (success.confirmed) {
              var recordId = primarycontrol.data.entity.getId();
              var workflowId = "3f5fe54c-394c-4b53-a024-fc5a1f8f415d";
              var functionName = "executeWorkflow >>";
              var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
              var data = {
                  "EntityId": recordId
              };
              var req = new XMLHttpRequest();
              req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
              req.setRequestHeader("Accept", "application/json");
              req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
              req.setRequestHeader("OData-MaxVersion", "4.0");
              req.setRequestHeader("OData-Version", "4.0");
  
              req.onreadystatechange = function () {
                  if (this.readyState == 4 /* complete */) {
                      if (this.status == 204 || this.status == 200) {
                          formContext.ui.close();
  
                      } else {
                          //error callback
                      }
                  }
              };
  
              req.send(JSON.stringify(data));
          }
      });
  }
  
  function goalCreateOnload(context) {
      var formContext = context.getFormContext();
  
      if (formContext.ui.getFormType() == 1) {
          formContext.getAttribute('pg_targetdecimal').setValue(100);
          formContext.getAttribute('pg_actualdecimal').setValue(0);
      }
  }
  
  
  
  function EnableTest(primaryControl) {
      //Get the SubGrid Control
      var subGridControl = primaryControl.getControl("Reviews");
      var viewSelector = subGridControl.getViewSelector();
      var currentView = viewSelector.getCurrentView();
      var currentViewId = currentView.Id;
      currentViewId = currentViewId.replace("{", "").replace("}", "");
  
      if (currentViewId === "AC5C4CD9-FC6E-45EB-B1E4-7D5BC05BF4BF") {
          return true;
      } else {
          return false;
      }
  
  }
  
  
  //Workflow id ae4a0dc8-5b60-41da-85db-d5f842f9b5e1
  function createYGoalFromX(primarycontrol) {
      var txt;
      var r = confirm("Convert X Goal to Y?");
      if (r == true) {
          var recordId = primarycontrol.data.entity.getId();
          var workflowId = "ae4a0dc8-5b60-41da-85db-d5f842f9b5e1";
          var functionName = "executeWorkflow >>";
          var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
          var data = {
              "EntityId": recordId
          };
          var req = new XMLHttpRequest();
          req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
          req.setRequestHeader("Accept", "application/json");
          req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          req.setRequestHeader("OData-MaxVersion", "4.0");
          req.setRequestHeader("OData-Version", "4.0");
  
          req.onreadystatechange = function () {
              if (this.readyState == 4 /* complete */) {
                  if (this.status == 204 || this.status == 200) {
                      primarycontrol.data.entity.save("saveandclose");
  
                  } else {
                      //error callback
                  }
              }
          };
  
          req.send(JSON.stringify(data));
      }
  
  }
  
  function createXGoalFromY(primarycontrol) {
      var txt;
      var r = confirm("Convert Y Goal to X?");
      if (r == true) {
          var recordId = primarycontrol.data.entity.getId();
          var workflowId = "4f7c7c17-409e-4a9a-b92a-dea7f99ea439";
          var functionName = "executeWorkflow >>";
          var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
          var data = {
              "EntityId": recordId
          };
          var req = new XMLHttpRequest();
          req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
          req.setRequestHeader("Accept", "application/json");
          req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          req.setRequestHeader("OData-MaxVersion", "4.0");
          req.setRequestHeader("OData-Version", "4.0");
  
          req.onreadystatechange = function () {
              if (this.readyState == 4 /* complete */) {
                  if (this.status == 204 || this.status == 200) {
                      primarycontrol.data.entity.save("saveandclose");
  
                  } else {
                      //error callback
                  }
              }
          };
  
          req.send(JSON.stringify(data));
      }
  
  }
  
  function createXGoalFromMe(primarycontrol) {
      var txt;
      var r = confirm("Convert Me Goal to X?");
      if (r == true) {
          var recordId = primarycontrol.data.entity.getId();
          var workflowId = "E409B911-EFF1-4C88-87FB-ECC210AB9665";
          var functionName = "executeWorkflow >>";
          var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
          var data = {
              "EntityId": recordId
          };
          var req = new XMLHttpRequest();
          req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
          req.setRequestHeader("Accept", "application/json");
          req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          req.setRequestHeader("OData-MaxVersion", "4.0");
          req.setRequestHeader("OData-Version", "4.0");
  
          req.onreadystatechange = function () {
              if (this.readyState == 4 /* complete */) {
                  if (this.status == 204 || this.status == 200) {
                      primarycontrol.data.entity.save("saveandclose");
  
                  } else {
                      //error callback
                  }
              }
          };
  
          req.send(JSON.stringify(data));
      }
  
  }
  
  function createYGoalFromMe(primarycontrol) {
      var txt;
      var r = confirm("Convert Me Goal to Y?");
      if (r == true) {
          var recordId = primarycontrol.data.entity.getId();
          var workflowId = "4E1F172C3-D69C-4ED7-9AFE-6C4C460F39AD";
          var functionName = "executeWorkflow >>";
          var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
          var data = {
              "EntityId": recordId
          };
          var req = new XMLHttpRequest();
          req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
          req.setRequestHeader("Accept", "application/json");
          req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          req.setRequestHeader("OData-MaxVersion", "4.0");
          req.setRequestHeader("OData-Version", "4.0");
  
          req.onreadystatechange = function () {
              if (this.readyState == 4 /* complete */) {
                  if (this.status == 204 || this.status == 200) {
                      primarycontrol.data.entity.save("saveandclose");
  
                  } else {
                      //error callback
                  }
              }
          };
  
          req.send(JSON.stringify(data));
      }
  
  }
  
  function createMeGoalFromX(primarycontrol) {
      var txt;
      var r = confirm("Convert X Goal to Me?");
      if (r == true) {
          var recordId = primarycontrol.data.entity.getId();
          var workflowId = "3B525BFC-4587-49D4-B5E9-D4D53F3D678D";
          var functionName = "executeWorkflow >>";
          var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
          var data = {
              "EntityId": recordId
          };
          var req = new XMLHttpRequest();
          req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
          req.setRequestHeader("Accept", "application/json");
          req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          req.setRequestHeader("OData-MaxVersion", "4.0");
          req.setRequestHeader("OData-Version", "4.0");
  
          req.onreadystatechange = function () {
              if (this.readyState == 4 /* complete */) {
                  if (this.status == 204 || this.status == 200) {
                      primarycontrol.data.entity.save("saveandclose");
  
                  } else {
                      //error callback
                  }
              }
          };
  
          req.send(JSON.stringify(data));
      }
  
  }
  
  function createMeGoalFromY(primarycontrol) {
      var txt;
      var r = confirm("Convert Y Goal to Me?");
      if (r == true) {
          var recordId = primarycontrol.data.entity.getId();
          var workflowId = "2BCC34CA-A992-48D7-A30B-5593CFA0114B";
          var functionName = "executeWorkflow >>";
          var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
          var data = {
              "EntityId": recordId
          };
          var req = new XMLHttpRequest();
          req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
          req.setRequestHeader("Accept", "application/json");
          req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          req.setRequestHeader("OData-MaxVersion", "4.0");
          req.setRequestHeader("OData-Version", "4.0");
  
          req.onreadystatechange = function () {
              if (this.readyState == 4 /* complete */) {
                  if (this.status == 204 || this.status == 200) {
                      primarycontrol.data.entity.save("saveandclose");
  
                  } else {
                      //error callback
                  }
              }
          };
  
          req.send(JSON.stringify(data));
      }
  
  }
  
  function CopyXToNextQuarter(primarycontrol) {
      var txt;
      var r = confirm("Copy to Next Quarter?");
      if (r == true) {
          var recordId = primarycontrol.data.entity.getId();
          var workflowId = "E0FC1BA9-0B12-49ED-BAC3-4360C3256FA5";
          var functionName = "executeWorkflow >>";
          var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
          var data = {
              "EntityId": recordId
          };
          var req = new XMLHttpRequest();
          req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
          req.setRequestHeader("Accept", "application/json");
          req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          req.setRequestHeader("OData-MaxVersion", "4.0");
          req.setRequestHeader("OData-Version", "4.0");
  
          req.onreadystatechange = function () {
              if (this.readyState == 4 /* complete */) {
                  if (this.status == 204 || this.status == 200) {
                      try {
                          primarycontrol.data.entity.save("saveandclose");
                      }
                      catch {
                          primarycontrol.ui.close();
                      }
  
                  } else {
                      //error callback
                  }
              }
          };
  
          req.send(JSON.stringify(data));
      }
  }
  
  function CopyYToNextQuarter(primarycontrol) {
      var txt;
      var r = confirm("Copy to Next Quarter?");
      if (r == true) {
          var recordId = primarycontrol.data.entity.getId();
          var workflowId = "AB4B9788-9D08-4C27-A8B3-A66BD09875E7";
          var functionName = "executeWorkflow >>";
          var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
          var data = {
              "EntityId": recordId
          };
          var req = new XMLHttpRequest();
          req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
          req.setRequestHeader("Accept", "application/json");
          req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          req.setRequestHeader("OData-MaxVersion", "4.0");
          req.setRequestHeader("OData-Version", "4.0");
  
          req.onreadystatechange = function () {
              if (this.readyState == 4 /* complete */) {
                  if (this.status == 204 || this.status == 200) {
                      try {
                          primarycontrol.data.entity.save("saveandclose");
                      }
                      catch {
                          primarycontrol.ui.close();
                      }
  
                  } else {
                      //error callback
                  }
              }
          };
  
          req.send(JSON.stringify(data));
      }
  }
  
  function CopyMeToNextQuarter(primarycontrol) {
      var txt;
      var r = confirm("Copy to Next Quarter?");
      if (r == true) {
          var recordId = primarycontrol.data.entity.getId();
          var workflowId = "85A29AD4-E2EF-4737-A831-1F7DAED26203";
          var functionName = "executeWorkflow >>";
          var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
          var data = {
              "EntityId": recordId
          };
          var req = new XMLHttpRequest();
          req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
          req.setRequestHeader("Accept", "application/json");
          req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          req.setRequestHeader("OData-MaxVersion", "4.0");
          req.setRequestHeader("OData-Version", "4.0");
  
          req.onreadystatechange = function () {
              if (this.readyState == 4 /* complete */) {
                  if (this.status == 204 || this.status == 200) {
                      try {
                          primarycontrol.data.entity.save("saveandclose");
                      }
                      catch {
                          primarycontrol.ui.close();
                      }
  
                  } else {
                      //error callback
                  }
              }
          };
  
          req.send(JSON.stringify(data));
      }
  }
  
  var CopyGoalRibbon = (function () {
      var isAsyncOperationCompleted = false;
      var isButtonEnabled = false;
  
      function IsButtonEnabled(primarycontrol) {
          //If async operation was already completed I just return the result of it
          if (isAsyncOperationCompleted) {
              return isButtonEnabled;
          }
  
          var formContext = primarycontrol;
          var empid = formContext.getAttribute("new_employeeid").getValue()[0].id;
  
          Xrm.WebApi.retrieveRecord("new_employee", empid, "?$select=pg_currentstatus").then(
              function success(result) {
                  //Async operation was completed successfully
                  isAsyncOperationCompleted = true;
                  var currentstage = result.pg_currentstatus;
                  var usersettings = Xrm.Utility.getGlobalContext().userSettings;
                  if ((currentstage == 140310004) && primarycontrol.getAttribute("new_employeeid").getValue() != null) {
                      isButtonEnabled = true;
                  }
  
                  //so if role is there - just refresh the ribbon to see the button
                  if (isButtonEnabled) {
                      formContext.ui.refreshRibbon();
                  }
              },
              function (error) {
                  //if something went wrong during the data retrieval
                  //operation is marked as completed and error message is shown
                  isAsyncOperationCompleted = true;
                  Xrm.Navigation.openAlertDialog({ text: error.message });
              }
          );
  
          //Just a stub that hides button by default
          //if role is available for a user - refresh of ribbon will unhide the button
          return false;
      }
  
      return {
          IsButtonEnabled: IsButtonEnabled
      };
  })();
  
  
  
  function MultiCopyXToNextQuarter(selectedcontrol) {
      var txt;
      var r = confirm("Copy to Next Quarter?");
      if (r == true) {
          for (var e of selectedcontrol) {
              var recordId = e.Id;
              var workflowId = "E0FC1BA9-0B12-49ED-BAC3-4360C3256FA5";
              var functionName = "executeWorkflow >>";
              var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
              var data = {
                  "EntityId": recordId
              };
              var req = new XMLHttpRequest();
              req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
              req.setRequestHeader("Accept", "application/json");
              req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
              req.setRequestHeader("OData-MaxVersion", "4.0");
              req.setRequestHeader("OData-Version", "4.0");
  
              req.onreadystatechange = function () {
                  if (this.readyState == 4 /* complete */) {
                      if (this.status == 204 || this.status == 200) {
                          try {
                              //primarycontrol.data.entity.save("saveandclose");
                          }
                          catch {
                              //primarycontrol.ui.close();
                          }
                      } else {
                          //error callback
                      }
                  }
              };
  
              req.send(JSON.stringify(data));
          }
      }
  }
  
  function MultiCopyYToNextQuarter(selectedcontrol) {
      var txt;
      var r = confirm("Copy to Next Quarter?");
      if (r == true) {
          for (var e of selectedcontrol) {
              var recordId = e.Id;
              var workflowId = "AB4B9788-9D08-4C27-A8B3-A66BD09875E7";
              var functionName = "executeWorkflow >>";
              var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
              var data = {
                  "EntityId": recordId
              };
              var req = new XMLHttpRequest();
              req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
              req.setRequestHeader("Accept", "application/json");
              req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
              req.setRequestHeader("OData-MaxVersion", "4.0");
              req.setRequestHeader("OData-Version", "4.0");
  
              req.onreadystatechange = function () {
                  if (this.readyState == 4 /* complete */) {
                      if (this.status == 204 || this.status == 200) {
                          try {
                              //primarycontrol.data.entity.save("saveandclose");
                          }
                          catch {
                              //primarycontrol.ui.close();
                          }
                      } else {
                          //error callback
                      }
                  }
              };
  
              req.send(JSON.stringify(data));
          }
      }
  }
  
  function MultiCopyMeToNextQuarter(selectedcontrol) {
      var txt;
      var r = confirm("Copy to Next Quarter?");
      if (r == true) {
          for (var e of selectedcontrol) {
              var recordId = e.Id;
              var workflowId = "85A29AD4-E2EF-4737-A831-1F7DAED26203";
              var functionName = "executeWorkflow >>";
              var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
              var data = {
                  "EntityId": recordId
              };
              var req = new XMLHttpRequest();
              req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
              req.setRequestHeader("Accept", "application/json");
              req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
              req.setRequestHeader("OData-MaxVersion", "4.0");
              req.setRequestHeader("OData-Version", "4.0");
  
              req.onreadystatechange = function () {
                  if (this.readyState == 4 /* complete */) {
                      if (this.status == 204 || this.status == 200) {
                          try {
                              //primarycontrol.data.entity.save("saveandclose");
                          }
                          catch {
                              //primarycontrol.ui.close();
                          }
                      } else {
                          //error callback
                      }
                  }
              };
  
              req.send(JSON.stringify(data));
          }
      }
  }
  
  function copyGoalCheckandLoad(context) {
      formContext = context.getFormContext();
      var historicalTab = formContext.ui.tabs.get("tab_2");
  
      if (formContext.getAttribute("pg_previousgoal").getValue() != null) {
          historicalTab.setVisible(true);
      }
      else {
          historicalTab.setVisible(false);
      }
  }
  
  //function CheckValueOnchange(context) {
  //debugger;
  //    formContext = context.getFormContext();
  //    var oneR = formContext.getAttribute("pg_onerating").getValue();
  //    var twoR = formContext.getAttribute("pg_tworating").getValue();
  //    var threeR = formContext.getAttribute("pg_threerating").getValue();
  //    var fourR = formContext.getAttribute("pg_fourrating").getValue();
  //    var fiveR = formContext.getAttribute("pg_fiverating").getValue();
  
  //    if (oneR == null || twoR == null || threeR == null || fourR == null || fiveR == null) {
  //        formContext.ui.setFormNotification("Please enter all the values", "ERROR", "error1");
  
  //    }
  //    else {
  //        formContext.ui.clearFormNotification("error1");
  //    }
  //}
  function OnSaveForComparsion(context) {
      debugger;
      formContext = context.getFormContext();
      var Comparision = formContext.getAttribute("pg_comparison").getSelectedOption().value;
  
      var oneR = formContext.getAttribute("pg_onerating").getValue();
      var twoR = formContext.getAttribute("pg_tworating").getValue();
      var threeR = formContext.getAttribute("pg_threerating").getValue();
      var fourR = formContext.getAttribute("pg_fourrating").getValue();
      var fiveR = formContext.getAttribute("pg_fiverating").getValue();
  
      if (Comparision == 1) {
  
          if (oneR == null || twoR == null || threeR == null || fourR == null || fiveR == null) {
              formContext.ui.setFormNotification("Please enter all the values", "ERROR", "error2");
              formContext.getAttribute("pg_onerating").setRequiredLevel("required");
              formContext.getAttribute("pg_tworating").setRequiredLevel("required");
              formContext.getAttribute("pg_threerating").setRequiredLevel("required");
              formContext.getAttribute("pg_fourrating").setRequiredLevel("required");
              formContext.getAttribute("pg_fiverating").setRequiredLevel("required");
          }
          else if (oneR >= twoR || twoR >= threeR || threeR >= fourR || fourR >= fiveR) {
              formContext.ui.setFormNotification("The ratings must be in increasing order, please check the numbers.", "ERROR", "errorNotification");
              formContext.getAttribute("pg_onerating").setIsValid(false, "One rating should be the smallest");
          }
          else if (oneR >= threeR || oneR >= fourR || oneR >= fiveR) {
              formContext.ui.setFormNotification("The ratings must be in increasing order, please check the numbers.", "ERROR", "errorNotification");
          }
          else if (twoR >= fourR || twoR >= fiveR || threeR >= fiveR) {
              formContext.ui.setFormNotification("The ratings must be in increasing order, please check the numbers.", "ERROR", "errorNotification");
  
          }
          //else if (oneR == null || twoR == null || threeR == null || fourR == null || fiveR == null) {
          //    formContext.ui.setFormNotification("Please enter all the values", "ERROR", "error2");
          //    formcontext.getAttribute("pg_onerating").setRequiredLevel("required");
          //    formcontext.getAttribute("pg_tworating").setRequiredLevel("required");
          //    formcontext.getAttribute("pg_threerating").setRequiredLevel("required");
          //    formcontext.getAttribute("pg_fourrating").setRequiredLevel("required");
          //    formcontext.getAttribute("pg_fiverating").setRequiredLevel("required");
          //}
          else {
              formContext.ui.clearFormNotification("errorNotification");
              formContext.ui.clearFormNotification("error2");
          }
  
  
      }
      else if (Comparision == 2) {
          if (oneR == null || twoR == null || threeR == null || fourR == null || fiveR == null) {
              formContext.ui.setFormNotification("Please enter all the values", "ERROR", "error2");
              formContext.getAttribute("pg_onerating").setRequiredLevel("required");
              formContext.getAttribute("pg_tworating").setRequiredLevel("required");
              formContext.getAttribute("pg_threerating").setRequiredLevel("required");
              formContext.getAttribute("pg_fourrating").setRequiredLevel("required");
              formContext.getAttribute("pg_fiverating").setRequiredLevel("required");
          }
          else if (oneR <= twoR || twoR <= threeR || threeR <= fourR || fourR <= fiveR) {
              formContext.ui.setFormNotification("The ratings must be in decreasing order, please check the numbers", "ERROR", "error2");
              formContext.getAttribute("pg_onerating").setIsValid(false, "One rating should be the largest");
          }
          else if (oneR <= threeR || oneR <= fourR || oneR <= fiveR) {
              formContext.ui.setFormNotification("The ratings must be in decreasing order", "ERROR", "error2");
  
          }
          else if (twoR <= fourR || twoR <= fiveR || threeR <= fiveR) {
              formContext.ui.setFormNotification("The ratings must be in decreasing order, please check the numbers", "ERROR", "error2");
  
  
          }
          //else if (oneR == null || twoR == null || threeR == null || fourR == null || fiveR==null) {
          //    formContext.ui.setFormNotification("Please enter all the values", "ERROR", "error2");
          //    formcontext.getAttribute("pg_onerating").setRequiredLevel("required");
          //    formcontext.getAttribute("pg_tworating").setRequiredLevel("required");
          //    formcontext.getAttribute("pg_threerating").setRequiredLevel("required");
          //    formcontext.getAttribute("pg_fourrating").setRequiredLevel("required");
          //    formcontext.getAttribute("pg_fiverating").setRequiredLevel("required");
          //}
          else {
              formContext.ui.clearFormNotification("errorNotification");
              formContext.ui.clearFormNotification("error2");
          }
      }
  }
  
  function goalcommentOnSave(context) {
      formContext = context.getFormContext();
      var usersettings = Xrm.Utility.getGlobalContext().userSettings;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
  
      today = mm + '/' + dd + '/' + yyyy;
      if (formContext.getAttribute("pg_goalcomment").getValue() != "" && formContext.getAttribute("pg_commentslist").getValue() != null && formContext.getAttribute("pg_goalcomment").getValue() != null) {
          var current = formContext.getAttribute("pg_commentslist").getValue();
          var newlist = "\n By: " + usersettings.userName + " on " + today + "\n" + formContext.getAttribute("pg_goalcomment").getValue() + "\n" + current;
          formContext.getAttribute("pg_commentslist").setValue(newlist);
          formContext.getAttribute("pg_goalcomment").setValue("");
      }
      else if (formContext.getAttribute("pg_goalcomment").getValue() != "" && formContext.getAttribute("pg_goalcomment").getValue() != null) {
          var current = formContext.getAttribute("pg_commentslist").getValue();
          var newlist = "\n By: " + usersettings.userName + " on " + today + "\n" + formContext.getAttribute("pg_goalcomment").getValue();
          formContext.getAttribute("pg_commentslist").setValue(newlist);
          formContext.getAttribute("pg_goalcomment").setValue("");
      }
  }
  
  function template(context) {
      var formcontext = context.getFormContext();
      var preset = formcontext.getAttribute("pg_presetgoals").getValue();
      var name = formcontext.getAttribute("new_name");
      var performanceperiod = "Q4-2022";
      formcontext.getAttribute("pg_performanceperiod").setValue(performanceperiod);
      formcontext.getAttribute("pg_measurement").setValue(true);
      var targetType = formcontext.getAttribute("pg_targettype");  //number 140310000 percentage 140310001 Time 140310002 Currency 140310003
      var target = formcontext.getAttribute("pg_targetdecimal");
      var actual = formcontext.getAttribute("pg_actualdecimal");
      var rolebased = formcontext.getAttribute("pg_rolebasedgoal");
      //Metrics
      var onerating = formcontext.getAttribute("pg_onerating");
      var tworating = formcontext.getAttribute("pg_tworating");
      var threerating = formcontext.getAttribute("pg_threerating");
      var fourrating = formcontext.getAttribute("pg_fourrating");
      var fiverating = formcontext.getAttribute("pg_fiverating");
      var comparison = formcontext.getAttribute("pg_comparison");
      //Time to Submit
      if (preset == 0) {
          name.setValue("Time to Submit");
          target.setValue(1.9);
          onerating.setValue(100);
          tworating.setValue(3.79);
          threerating.setValue(1.9);
          fourrating.setValue(.96);
          fiverating.setValue(0);
          comparison.setValue(2);
          rolebased.setValue(true);
          targetType.setValue(140310002);
      }
      //Interviews
      else if (preset == 1) {
          name.setValue("Interviews");
          rolebased.setValue(true);
          targetType.setValue(140310000);
      }
      //Offers Accepted
      else if (preset == 2) {
          name.setValue("Offers Accepted");
          rolebased.setValue(true);
          targetType.setValue(140310000);
      }
      //Job Order Growth
      else if (preset == 3) {
          name.setValue("Job Order Growth");
          rolebased.setValue(true);
          targetType.setValue(140310001);
      }
      //Fill Rate
      else if (preset == 4) {
          name.setValue("Fill Rate");
          rolebased.setValue(true);
          targetType.setValue(140310001);
      }
      //New Job Categories Won
      else if (preset == 5) {
          name.setValue("New Job Categories Won");
          rolebased.setValue(true);
          targetType.setValue(140310001);
      }
      //Client Submittals to Placement Ratio
      else if (preset == 6) {
          name.setValue("Client Submittals to Placement Ratio");
          rolebased.setValue(true);
          targetType.setValue(140310001);
      }
      //Client Interviews
      else if (preset == 7) {
          name.setValue("Client Interviews");
          rolebased.setValue(true);
          targetType.setValue(140310002);
      }
      //Starts
      else if (preset == 8) {
          name.setValue("Starts");
          rolebased.setValue(true);
          targetType.setValue(140310002);
      }
      //Views of a job board into Launch
      else if (preset == 9) {
          name.setValue("Views of a job board into Launch");
          rolebased.setValue(true);
          targetType.setValue(140310002);
      }
      //Team Coverage Rate
      else if (preset == 10) {
          name.setValue("Team Coverage Rate");
          target.setValue(85);
          onerating.setValue(0);
          tworating.setValue(68.01);
          threerating.setValue(85);
          fourrating.setValue(85.01);
          fiverating.setValue(95);
          comparison.setValue(1);
          rolebased.setValue(true);
          targetType.setValue(140310001);
  
      }
      //Team Average Time to Submit
      else if (preset == 11) {
          name.setValue("Team Average Time to Submit");
          target.setValue(1.9);
          onerating.setValue(100);
          tworating.setValue(3.79);
          threerating.setValue(1.9);
          fourrating.setValue(.96);
          fiverating.setValue(0);
          comparison.setValue(2);
          rolebased.setValue(true);
          targetType.setValue(140310002);
      }
      //Outbound Calls
      else if (preset == 12) {
          name.setValue("Outbound Calls");
          rolebased.setValue(true);
          targetType.setValue(140310000);
      }
      //Revenue Goals
      else if (preset == 13) {
          name.setValue("Revenue Goals");
          rolebased.setValue(true);
          targetType.setValue(140310000);
      }
      else {
  
      }
  }
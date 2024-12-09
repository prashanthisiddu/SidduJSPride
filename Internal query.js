var previousDescriptionValue = null;
var previousRemarksValue = null;

function trackFieldChanges(executionContext) {
    var formContext = executionContext.getFormContext();
    var fields = ["pg_description", "pg_remarks"]; // Logical names
    var historyField = "pg_history";
 
    fields.forEach(function(fieldName) {
        formContext.getAttribute(fieldName).addOnChange(function() {
            var currentDate = new Date();
            var timestamp = currentDate.toLocaleString();
            var userName = Xrm.Utility.getGlobalContext().userSettings.userName;

            var currentValue = formContext.getAttribute(fieldName).getValue();
            var previousValue, displayName;

            if (fieldName === "pg_description") {
                previousValue = previousDescriptionValue;
                previousDescriptionValue = currentValue; 
                displayName = "Query Details"; 
            } else if (fieldName === "pg_remarks") {
                previousValue = previousRemarksValue;
                previousRemarksValue = currentValue; 
                displayName = "Remarks"; 
            }   
            
            var historyValue = formContext.getAttribute(historyField).getValue() || "";
    
            if (fieldName === "pg_description") {
                 if (previousValue === null && historyValue==="") {
                    var newEntry = `The Query has been submitted: ${currentValue !== null ? currentValue : "N/A"} ` + 
                                   `on ${timestamp} by ${userName}\n`;
                      formContext.getAttribute(historyField).setValue(newEntry + " \n");
                } else if (previousValue !== currentValue) {
                    var updateEntry = `The Query has been Updated : "${currentValue !== null ? currentValue : "N/A"}" ` +
                                      `on ${timestamp} by ${userName}\n`;
                    formContext.getAttribute(historyField).setValue(historyValue  + " \n" +  updateEntry);
                }
            }
       
            if (fieldName === "pg_remarks") { 
                if (!historyValue.includes("The Remarks has been added") && previousValue === null) {
                    var newEntry = `The Remarks has been added: ${currentValue !== null ? currentValue : "N/A"} ` + 
                                   `on ${timestamp} by ${userName}\n`;
                formContext.getAttribute(historyField).setValue(historyValue  + " \n"+ newEntry);
                } else if (historyValue.includes("The Remarks has been added")) {
                    var updateEntry = `Remarks has been Updated : "${currentValue !== null ? currentValue : "N/A"}" ` +
                                      `on ${timestamp} by ${userName}\n`;
               formContext.getAttribute(historyField).setValue(historyValue + " \n"+ updateEntry);
                }

            }
        });
    });
}


function clearRemarksField(primarycontrol) {
    var formContext = primarycontrol; 
    formContext.getAttribute("pg_remarks").setValue(null);
}
function Updatehistoryfield(primarycontrol) {
    var formContext = primarycontrol; 
    var status = formContext.getAttribute("statecode") ? formContext.getAttribute("statecode").getValue() : null;
    var remarks = formContext.getAttribute("pg_remarks") ? formContext.getAttribute("pg_remarks").getValue() : "";
   
    var historyField = "pg_history"; 
    var historyValue = formContext.getAttribute(historyField) ? formContext.getAttribute(historyField).getValue() : "";  
   // var updateEntry = `The Query has been closed: ${remarks}`; //use this instead of commented line
   
    // Set the update entry message based on whether remarks is null or empty
    var updateEntry = remarks ? `The Query has been closed: Remarks ${remarks}` : "The Query has been closed";
    formContext.getAttribute(historyField).setValue(historyValue + "\n" + updateEntry);
}  

 /*else if (historyValue.includes("The Remarks has been added")) {
    var updateEntry = `Approver: Remarks has been Updated : "${currentValue !== null ? currentValue : "N/A"}" ` +
                      `on ${timestamp} by ${userName}\n`;
formContext.getAttribute(historyField).setValue(historyValue + " \n"+ updateEntry);
}*/





function Delegate(context) {//internal queries
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "pg_internalqueriesdelegate_2de04",//pg_delegate_e43c3//pg_offboarding_a0620
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).then(console.log).catch(console.error);
}

function enableSend(primarycontrol) {
    var formContext = primarycontrol;
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    if ((!usersettings.userId === formContext.getAttribute("ownerid").getValue()[0].id)) {
        return true;
    }
    else {
        return false;
    }
}




//Onboarding

function dropout(context) {
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "cr4a2_candidatedropout_95c4f",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }
  
    ).then(console.log).catch(console.error);
  }
  



function EmployeeID(context) {
    try {

        var formcontext = context.getFormContext();
   var createdbyValue = formcontext.getAttribute("createdby").getValue();       
            var createdby = createdbyValue[0].id;
            var createdbyname = createdbyValue[0].name;
     /////////cdm_primaryemailaddress//worker email
        // Xrm.WebApi.online.retrieveRecord("pg_prideemployee", "?$filter=pg_name eq '" + createdbyname + "'&$top=1").then(
      //  Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$select=cdm_employeeid_custom,cdm_fullname").then(
        Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker","?$filter=cdm_fullname eq '" + createdbyname + "'&$top=1").then(
            function success(results) {
                for (var i = 0; i < results.entities.length; i++) {
                    var cdm_employeeid_custom = results.entities[i]["cdm_employeeid_custom"];
                    var cdm_fullname = results.entities[i]["cdm_fullname"];
                    formcontext.getAttribute("pg_currentwopg_employeeidrkmode").setValue(cdm_employeeid_custom);
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    
    } catch (err) {

}
}



function RetrieveSystemViews(context) {
    var currentUser = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "");
        var allowedTeamIds = [
            "868b2be1-b987-ee11-8179-000d3a170a76",
            "778123b2-c187-ee11-8179-000d3a170a76",
           
        ];
    
    
        Xrm.WebApi.online.retrieveMultipleRecords("team", "?$select=teamid,name").then(
            function success(result) {
                var userTeams = result.entities;
    
        
                var isMemberOfAllowedTeam = userTeams.some(function (team) {
                    return allowedTeamIds.includes(team.teamid);
                });
    
                var viewName = "Internal Queries(1 Week)"; 
                var viewid = "5f13819f-738f-ee11-8179-000d3a5755d3";
                // Get the view ID by querying the SavedQuery entity
                Xrm.WebApi.online.retrieveMultipleRecords("savedquery", "?$select=name,savedqueryid&$filter=name eq '" + viewName + "'").then(
                    function success(viewsResult) {
                        if (viewsResult.entities.length > 0) {
                            var viewId = viewsResult.entities[0].savedqueryid;
    
                      
                            if (isMemberOfAllowedTeam) {
                       
                                Xrm.Page.getControl("viewid").getViewSelector().setCurrentView(viewId);
                            } else {
                                // Hide the view
                                Xrm.Page.getControl("viewid").getViewSelector().setCurrentView(null);
                            }
                        } else {
                            console.error("View not found: " + viewName);
                        }
                    },
                    function error(error) {
                        console.error(error.message);
                    }
                );
            },
            function error(error) {
                console.error(error.message);
            }
        );
    }
    
   
function Resubmit(primaryControl) {
    debugger;
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId();
    var confirmStrings = { text: "Confirm to Resubmit?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
    var confirmOptions = { height: 250, width: 300 };
    
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed) {
              debugger;

              var workflowId = "0E5AD55D-842A-4AB3-8472-A13B84A5E446";
                                //FD140AAF-4DF4-11DD-BD17-0019B9312238

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
                  if (this.readyState === 4 /* complete */) {

                      if (this.status === 200 || this.status === 204) {

                          formContext.data.entity.save("saveandclose");

                      } else {
                          //error callback
                      }

                  }
              };
              req.send(JSON.stringify(data));
          }
          else {
          }
      })
    }


    function Delegate(context) {//internal queries
        Xrm.Navigation.navigateTo({
            pageType: "custom",
            name: "pg_offboarding_a0620",
            entityName: context.data.entity.getEntityName(),
            recordId: context.data.entity.getId()
        }, {
            target: 2,
            width: 600,
            height: 300
        }
    
        ).then(console.log).catch(console.error);
    }
    
    
    
    
    
    
    
    
    
    
    
      function ResubmitsaveClose(primaryControl) {
            debugger;
            var formContext = primaryControl;
     var recordId = formContext.data.entity.getId();
            var confirmStrings = { text: "Confirm to Resubmit?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
            var confirmOptions = { height: 250, width: 300 };
        
        Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
            function (success) {
                if (success.confirmed) {
                  debugger;
    
                  var workflowId = "0E5AD55D-842A-4AB3-8472-A13B84A5E446";
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
                      if (this.readyState === 4 /* complete */) {
    
                          if (this.status === 200 || this.status === 204) {
    
                              formContext.data.entity.save("saveandclose");
    
                          } else {
                              //error callback
                          }
    
                      }
                  };
                  req.send(JSON.stringify(data));
              }
              else {
              }
          })
        }
    
    
    function ResubmitButton(primaryControl) {  //main form
      debugger;
      var formContext = primaryControl;
      var userSettings = Xrm.Utility.getGlobalContext().userSettings;
      var currentuserid = userSettings.userId;
      var username = userSettings.userName;
      var ownerid = formContext.getAttribute("ownerid").getValue();
      var activeStage = formContext.data.process.getActiveStage();
    //  var stageId = activeStage.getId();
      var  approvallevel= formContext.getAttribute("pg_approvallevel").getValue();
    
      if ((username === ownerid && approvallevel === null)|| (username === ownerid && approvallevel === 140310000) || (username === ownerid && approvallevel === 140310002)) {////intial stage
          return true;
     formContext.data.entity.save("saveandclose");
      }
      else {
          return false;
      }
    }
    
    
    
    
    
    
    
    
    
    
    function onLoadInternalQuery(context) {
        var formcontext = context.getFormContext();
        onChangeType(context);
        onChangeSubject(context);
        var createdby = formcontext.getControl("createdby");
        var currencytype = formcontext.getAttribute("transactioncurrencyid");
        var newCurrency = new Array();
        newCurrency[0] = new Object();
        newCurrency[0].id = "3235e097-9188-eb11-a812-000d3a8f42cf";
        newCurrency[0].name = "Indian Rupee";
        newCurrency[0].entityType = "transactioncurrency";
    
        currencytype.setValue(newCurrency);
    
        if (formcontext.ui.getFormType() === 1) {
            createdby.setVisible(false);
        }
        else {
            createdby.setVisible(true);
        }
    }
    
    function onChangeType(context) {
        var formcontext = context.getFormContext();
        var subject = formcontext.getControl("pg_querysubject");
    
        try {
            var type = formcontext.getAttribute("pg_querytype").getSelectedOption().value;
        }
        catch
        {
        }
    
        var options = subject.getOptions();
    
        for (let i = 0; i < options.length; i++) {
            subject.removeOption(options[i].value);
        }
    
        //Leave & Attendance
        if (type === 0) {
            subject.addOption({ text: 'Shift Allowance Days', value: 0 });
            subject.addOption({ text: 'Leave Balance Correction', value: 1 });
            subject.addOption({ text: 'Holiday Correction', value: 2 });
            subject.addOption({ text: 'Attendance Correction', value: 3 });
            subject.addOption({ text: 'Holiday Pay Request', value: 4 });
            subject.addOption({ text: 'Shift Correction', value: 5 });
            subject.addOption({ text: 'Regularization Issue', value: 6 });
            subject.addOption({ text: 'Other', value: 7 });
        }
        //Expense Reimbursement
        else if (type === 1) {
            subject.addOption({ text: 'Amount Discrepancy', value: 8 });
            subject.addOption({ text: 'Reimbursement Request', value: 9 });
        }
        //Payroll
        else if (type === 2) {
            subject.addOption({ text: 'Payslip Request', value: 10 });
            subject.addOption({ text: 'Salary Discrepancy', value: 11 });
            subject.addOption({ text: 'Income Tax Related', value: 12 });
            subject.addOption({ text: 'PF Related', value: 13 });
            subject.addOption({ text: 'Deduction Related', value: 14 });
            subject.addOption({ text: 'Other', value: 7 });
        }
        //Medical Insurance
        else if (type === 3) {
            subject.addOption({ text: 'Enrollment Query', value: 15 });
            subject.addOption({ text: 'Addition/Deletion of Dependent', value: 16 });
            subject.addOption({ text: 'Information Correction', value: 17 });
            subject.addOption({ text: 'Claim Request Clarification', value: 18 });
            subject.addOption({ text: 'Insurance ID', value: 19 });
            subject.addOption({ text: 'Other', value: 7 });
        }
        //Facilities & Administration
        else if (type === 4) {
            subject.addOption({ text: 'Restroom', value: 20 });
            subject.addOption({ text: 'Pantry', value: 21 });
            subject.addOption({ text: 'Housekeeping', value: 22 });
            subject.addOption({ text: 'Infrastructure (A/C, Lights, etc)', value: 23 });
            subject.addOption({ text: 'Seating', value: 24 });
            subject.addOption({ text: 'Vendor Feedback', value: 25 });
            subject.addOption({ text: 'Other', value: 7 });
        }
        //HR, Policy & Documentation
        else if (type === 5) {
            subject.addOption({ text: 'Request for Document', value: 26 });
            subject.addOption({ text: 'Policy Details Enquiry', value: 27 });
            subject.addOption({ text: 'Dress Code Exemption Request', value: 28 });
            subject.addOption({ text: 'Referral Process Enquiry', value: 29 });
            subject.addOption({ text: 'Profile Data Change - HRWorks', value: 30 });
            subject.addOption({ text: 'Other', value: 7 });
        }
        //Talent Development
        else if (type === 6) {
            subject.addOption({ text: 'PIP Related', value: 31 });
            subject.addOption({ text: 'Incubation/Promotion Related', value: 32 });
            subject.addOption({ text: 'XYMe Related', value: 33 });
            subject.addOption({ text: 'Performance Reporting', value: 34 });
            subject.addOption({ text: 'Other', value: 7 });
        }
        //Learning & Development
        else if (type === 7) {
            subject.addOption({ text: 'LMS User Access', value: 35 });
            subject.addOption({ text: 'Training Request', value: 36 });
            subject.addOption({ text: 'LMS Troubleshooting', value: 37 });
            subject.addOption({ text: 'Request for Training', value: 38 });
            subject.addOption({ text: 'Training Content Correction', value: 39 });
            subject.addOption({ text: 'Other', value: 7 });
        }
        //Employee Engagement
        else if (type === 8) {
            subject.addOption({ text: 'Dojo Store Related', value: 40 });
            subject.addOption({ text: 'Dojo Dollar Balance Related', value: 41 });
            subject.addOption({ text: 'Dojo Store Order Related', value: 42 });
            subject.addOption({ text: 'PLAUDIT Related', value: 43 });
            subject.addOption({ text: 'Dojo Session Related', value: 44 });
            subject.addOption({ text: 'Dojo Elevation Related', value: 45 });
            subject.addOption({ text: 'DEI Related', value: 46 });
            subject.addOption({ text: 'Clash of Titans/JOSH Related', value: 47 });
            subject.addOption({ text: 'Social Media Post Related', value: 48 });
            subject.addOption({ text: 'Other', value: 7 });
        }
    }
    
    function onChangeSubject(context) {
        var formcontext = context.getFormContext();
        var subject = formcontext.getAttribute("pg_querysubject").getValue();
        var reimbursementTab = formcontext.ui.tabs.get("tab_2");
        reimbursementTab.setVisible(false);
    
        if (subject === 9) {
            reimbursementTab.setVisible(true);
        }
    }
    
    function resolve(primarycontrol) {
        var data = {
            "statuscode": 2,
            "statecode": 1,
        }
        var id = primarycontrol.data.entity.getId();
        Xrm.WebApi.updateRecord("pg_internalquery", id, data).then(function success(result) {
            console.log("Status Updated");
            primarycontrol.data.entity.save("saveandclose");
        }, function (error) {
            console.log(error.message);
        }
        );
    }
  
    
    function resolve(primarycontrol) {
        var formContext = primarycontrol;
        var remarks = formContext.getAttribute("pg_remarks").getValue();
        if (remarks) {
            formContext.ui.clearFormNotification("remarkNotification");
            var data = {
                "statuscode": 2,
                "statecode": 1,
            };
            var id = primarycontrol.data.entity.getId();
            Xrm.WebApi.updateRecord("pg_internalquery", id, data).then(function success(result) {
                console.log("Status Updated");
    
                primarycontrol.data.entity.save("saveandclose");
            }, function (error) {
                console.log(error.message);
            });
        } else {
            formContext.ui.setFormNotification("Remarks: Required fields must be filled in.", "ERROR", "remarkNotification");
        }
    }

    
    function showHideRemarks(context) {
    
        var formContext = context.getFormContext();
        var usersettings = Xrm.Utility.getGlobalContext().userSettings;
        var userId = usersettings.userId;
        var ownerId = formContext.getAttribute("ownerid").getValue()[0].id;
        var statuscode = formContext.getAttribute("statuscode").getValue();
    
        if (userId === ownerId && statuscode != 2) {
            formContext.getControl("pg_remarks").setVisible(false);
        }
        else {
            formContext.getControl("pg_remarks").setVisible(true);
        }
    }
    
    function queryNameUpdate(context) {
    debugger;
        var formcontext = context.getFormContext();
        var querytype = formcontext.getAttribute("pg_querytype");
        if (querytype != null) {
            var text = querytype.getText();
            var querynumber = formcontext.getAttribute("pg_querynumber").getValue();
            var queryname = querynumber + " - " + text;
            formcontext.getAttribute("pg_query").setValue(queryname);
        }  
    }
    
    function onChangePriority(context) {
        var formcontext = context.getFormContext();
    
        var priority = formcontext.getAttribute("pg_prioritytype").getValue();
    
        //Urgent
        if (priority === 0) {
            formcontext.getAttribute("pg_prioritydescription").setValue(0);
        }
        //High
        else if (priority === 1) {
            formcontext.getAttribute("pg_prioritydescription").setValue(1);
        }
        //Medium
        else if (priority === 2) {
            formcontext.getAttribute("pg_prioritydescription").setValue(2);
        }
        //Low
        else if (priority === 3) {
            formcontext.getAttribute("pg_prioritydescription").setValue(3);
        }
    }
    
    function enableSend(primarycontrol) {
        var formContext = primarycontrol;
        var usersettings = Xrm.Utility.getGlobalContext().userSettings;
        if ((!usersettings.userId === formContext.getAttribute("ownerid").getValue()[0].id)) {
            return true;
        }
        else {
            return false;
        }
    }
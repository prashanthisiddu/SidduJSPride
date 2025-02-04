
function onPipStartDateChange(executionContext) {
    var formContext = executionContext.getFormContext();
var userSettings = Xrm.Utility.getGlobalContext().userSettings;
var currentuserid = userSettings.userId.toLowerCase().replace('{', '').replace('}', '');

var pipStartDate = formContext.getAttribute("pg_startdate").getValue();
var manager_value = Xrm.Page.getAttribute("pg_manager").getValue();
if (manager_value !== null) {
    var manager = manager_value[0].id.toLowerCase().replace('{', '').replace('}', '');
    var querytGetUserEmailID = "systemusers?$select=internalemailaddress&$filter=systemuserid eq " + currentuserid;
    var resUserEmailID = getAttributeValue(querytGetUserEmailID);
    var querytGetEmployeeEmailID = "pg_prideemployees?$select=emailaddress&$filter=pg_prideemployeeid eq " + manager;
    var resEmployeeEmailID = getAttributeValue(querytGetEmployeeEmailID);
    if (resUserEmailID.value[0].internalemailaddress === resEmployeeEmailID.value[0].emailaddress && pipStartDate!=null) {
        formContext.getControl("pg_pipenddate").setDisabled(true);
    }
    else {
        formContext.getControl("pg_pipenddate").setDisabled(false);
    }
}
}




function Compareannivarywithcurrentdate(context) {
    debugger;
    var formContext = context.getFormContext();
    var employeeName = formContext.getAttribute("pg_employeename");

    // Check if employeeNameField is not null and has a value
    if (employeeName && employeeName.getValue() !== null && employeeName.getValue().length > 0) {
        var employeeNameId = employeeName.getValue()[0].id;

        Xrm.WebApi.online.retrieveMultipleRecords("pg_prideemployee", "?$select=emailaddress,pg_probationstatus&$filter=systemuserid eq '" + employeeNameId + "'&$top=1").then(
            function success(results) {
                if (results.entities.length > 0) {
                    var emailaddress = results.entities[0]["emailaddress"];
                    var probationStatus = results.entities[0]["pg_probationstatus"]; // Assuming true means on probation

                    // Check if the employee is on probation
                    if (probationStatus) {
                        // Notify the user that PIP cannot be raised for an employee on probation
                        employeeNameField.setNotification("You cannot raise a PIP for this employee as they are currently in their probation period.", "ProbationError");
                        return; // Stop further execution
                    }

                    // Retrieve the anniversary date using the email address
                    Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$select=cdm_anniversarydatetime&$filter=cdm_primaryemailaddress eq '" + emailaddress + "'&$top=1").then(
                        function success(results) {
                            if (results.entities.length > 0) {
                                var cdm_anniversarydatetime = results.entities[0]["cdm_anniversarydatetime"];
                                var anniversaryDate = new Date(cdm_anniversarydatetime);
                                var anniversaryPlus90 = new Date(anniversaryDate);
                                anniversaryPlus90.setDate(anniversaryPlus90.getDate() + 90);

                                var today = new Date();
                                today.setHours(0, 0, 0, 0);  // Ensure we're comparing only dates, not times

                                if (anniversaryPlus90 > today) {
                                    // Clear any existing error notification on the pg_employeename field
                                    formContext.getControl("pg_employeename").clearNotification("ProbationError");
                                } else {
                                    formContext.getControl("pg_employeename").setNotification("You cannot raise a PIP for this employee as they are currently in their probation period.", "ProbationError");
                                }
                            }
                        },
                        function(error) {
                            Xrm.Utility.alertDialog(error.message);
                        }
                    );
                }
            },
            function(error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    } else {
        // Handle the case where the employeeNameField is null or has no value
        Xrm.Utility.alertDialog("Please select a valid employee.");
    }
}



function AcknowlegdebyEmployee(primaryControl) {  
    debugger;
    var formContext = primaryControl;   
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();

var userSettings = Xrm.Utility.getGlobalContext().userSettings;
   var currentuserid = userSettings.userId.toLowerCase().replace('{','').replace('}','');

    var employee = formContext.getAttribute("pg_employeename").getValue()[0].id.toLowerCase().replace('{','').replace('}','');
    var querytGetUserEmailID="systemusers?$select=internalemailaddress&$filter=systemuserid eq "+currentuserid;
   var resUserEmailID=getAttributeValue(querytGetUserEmailID);
    var querytGetEmployeeEmailID="pg_prideemployees?$select=emailaddress&$filter=pg_prideemployeeid eq "+employee;
    var resEmployeeEmailID=getAttributeValue(querytGetEmployeeEmailID);
    if (stageId === "ee551d28-2ec3-4b67-8289-5216a4ae0af4" && resUserEmailID.value[0].internalemailaddress===resEmployeeEmailID.value[0].emailaddress) {
        return true;
 formContext.data.entity.save("saveandclose");
    }
    else {
        return false;
  }
}



function openQuickCreateForm() {
    
    var entityFormOptions = {};
entityFormOptions["entityName"]="pg_pipobjectives";
entityFormOptions["useQuickCreateForm"]=true;
   
     Xrm.Navigation.openForm(entityFormOptions).then(
  function (success) {
console.log(success);

 },
function (error) {
    console.log(error);
});
}



function openQuickCreateForm() {
    var entityFormOptions = {};
    entityFormOptions["entityName"] = "pg_pipobjectives";
    entityFormOptions["useQuickCreateForm"] = true;

    Xrm.Navigation.openForm(entityFormOptions).then(
        function (success) {
            console.log("Quick Create form opened successfully");
            console.log(success);
        },
        function (error) {
            console.log("Error opening Quick Create form");
            console.log(error);
        }
    );
}

function onRibbonButtonClick() {
    openQuickCreateForm();
}








function UpdateSubmitField(context) {
    var formContext = context.getFormContext();   
    var formType = formContext.ui.getFormType();
    var statusReason = formContext.getAttribute("pg_pipstatus").getValue();

    if (formType !== 1) {
        var currentRecordId = formContext.data.entity.getId().replace("{", "").replace("}", "");

        Xrm.WebApi.online.retrieveMultipleRecords("pg_pipobjectives", `?$select=pg_objectives,pg_target&$filter=_pg_parent_value eq ${currentRecordId}`).then(
            function success(results) {
                if (results.entities.length > 0) {
                    var objectivesExist = results.entities.some(function(entity) {
                        return entity.pg_objectives !== null && entity.pg_target !== null;
                    });

                    if (objectivesExist || statusReason === 140310001) {
                        formContext.getAttribute("pg_submit").setValue(true);
                    } else {
                        formContext.getAttribute("pg_submit").setValue(false);
                    }
                } else {
                    formContext.getAttribute("pg_submit").setValue(false);
                }
            },
            function(error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}








function CloseBTNShowHide(primaryControl) {
    var formContext = primaryControl;
  
    var status= formContext.getAttribute("statecode").getValue();

    if (status===0) {
        return true;
    } else {
        return false;
    }
}




function CheckAcknowledgeField(context) {
    formContext = context.getFormContext();
 var formType = formContext.ui.getFormType();
    if (formType !== 1) {
    var currentRecordId = formContext.data.entity.getId().replace("{", "").replace("}", "");
  
        Xrm.WebApi.online.retrieveMultipleRecords("pg_pipobjectives", `?$select=pg_acknowledgebyemployee&$filter=_pg_parent_value eq ${currentRecordId}`).then(
          
                function success(results) {
                    for (var i = 0; i < results.entities.length; i++) {
                        var pg_acknowledgebyemployee = results.entities[i]["pg_acknowledgebyemployee"];
                        var pg_acknowledgebyemployee_formatted = results.entities[i]["pg_acknowledgebyemployee@OData.Community.Display.V1.FormattedValue"];
                 
                    }
       if(pg_acknowledgebyemployee!==false){
                            formContext.getAttribute("pg_pipobjectivereview").setValue(true);
                        }
                },
                function(error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
    }
}





var PIP;
PIP = {};
PIP.formEvents = {
    form_load: function (context) {
        var formcontext = context.getFormContext();
        formcontext.data.process.addOnPreStageChange(PIP.formEvents.handleStageMovement);
    },

    handleStageMovement: function (context) {
        var bpfArguments = context.getEventArgs();
        var formcontext = context.getFormContext();
        var bpfstage = formcontext.data.process.getActiveStage().getName();

        if (bpfstage === "Employee Acknowledge PIP (HR)") {
            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_acknowledgebyhr").getValue() != true || formcontext.getAttribute("pg_initialacknowledgebyemployee").getValue() != true) {
                bpfArguments.preventDefault();
                var alertStrings = { confirmButtonLabel: "OK", text: "Acknowledge by HR and Initial Acknowledge by Employee should be YES.", title: "Cannot Move to Next Stage" };
                var alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;
            }
        }

        if (bpfstage === "PIP Response (Manager)") {
            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_pipobjectivereview").getValue() != true) {
                bpfArguments.preventDefault();
                var alertStrings = { confirmButtonLabel: "OK", text: "PIP Objective Review should be YES.", title: "Cannot Move to Next Stage" };
                var alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;
            }
        }
    }
}



function OwnerUpdate(executionContext) {
  debugger;
  var formContext = executionContext.getFormContext();
  var activeStage = formContext.data.process.getActiveStage();

   var createdby = formContext.getAttribute("createdby").getValue(); 
  var stageId = activeStage.getId();
  var entityType = "systemuser";
  var entityId = "{594350b2-6bc5-ec11-a7b6-00224829325b}"; 
  var employeeName = "Rakesh Kamalanathan";

  var lookupValue = [{
    entityType: entityType,
    id: entityId,
    name: employeeName
  }];
 var formType = formContext.ui.getFormType();


    if (formType !== 1) {
  if (stageId === "c57c14ec-dac6-4262-b6e2-37c78928de23" || stageId === "91d8982f-67e6-438b-aba1-3c9d974144f5" || stageId === "98ba70ed-6bc8-4adc-b32b-ac4e3374f853") {
    var ownerAttribute = formContext.getAttribute("ownerid").setValue(lookupValue);
}
if (stageId === "6a8cbd2d-904b-46e0-af8b-0ec9f181a41a" || stageId === "ee551d28-2ec3-4b67-8289-5216a4ae0af4") {
    var ownerAttribute = formContext.getAttribute("ownerid").setValue(createdby);
}
}
}





function LockEmployeeOutcome(executionContext) {
  debugger;
  var formContext = executionContext.getFormContext();
  var activeStage = formContext.data.process.getActiveStage();
  var stageId = activeStage.getId();
  
 // if (stageId === "c57c14ec-dac6-4262-b6e2-37c78928de23" || stageId === "91d8982f-67e6-438b-aba1-3c9d974144f5") {
    formContext.getControl("header_process_pg_employeeoutcome_1").setDisabled(true);
    formContext.getControl("header_process_pg_employeeoutcome_2").setDisabled(true);
  formContext.getControl("header_process_pg_pipobjectivereview").setDisabled(true);

//  }
}



function DisableFieldsInInactiveStages() {
    var activeProcess = formContext.data.process.getActiveProcess();
    var activeStageId = formContext.data.process.getActiveStage().getId();
    var allStages = activeProcess.getStages();

    allStages.forEach(function (stage) {
        if (stage.getId() !== activeStageId) {
            
            var stepsCollection = stage.getSteps();
            stepsCollection.forEach(function (step) {
                var attributeName = step.getAttribute();
                if (attributeName) {
                    var control = formContext.getControl("header_process_" + attributeName);
                    if (control) {
                        control.setDisabled(true);
                    }
                }
            });
        }
    });
}



function candidatedetails(context) {
    var formContext = context.getFormContext(); 

    try {
        var employee = formContext.getAttribute("pg_employeename").getValue()[0].id; 
        Xrm.WebApi.online.retrieveRecord("pg_prideemployee", employee, "?$select=emailaddress").then(
            function success(result) {
                var emailaddress = result.emailaddress; 

                Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$select=cdm_primaryemailaddress,pg_department,pg_job,pg_jobfamily&$filter=cdm_primaryemailaddress eq '" + emailaddress + "'").then(
                    function success(results) {
                        for (var i = 0; i < results.entities.length; i++) {
                            var pg_department = results.entities[i].pg_department;
                            var pg_job = results.entities[i].pg_job;
                            var pg_jobfamily = results.entities[i].pg_jobfamily;
   formContext.getAttribute("pg_department").setValue(pg_jobfamily);
   formContext.getAttribute("pg_process").setValue(pg_jobfamily);
   formContext.getAttribute("pg_division").setValue(pg_department);
                            
                        }
                    },
                    function(error) {
                        Xrm.Utility.alertDialog(error.message);
                    }
                );
            },
            function(error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    } catch (error) {
        console.log(error); 
    }
}






function GetandSetManger(context) {
    formContext = context.getFormContext();
    try {
        var employee = formContext.getAttribute("pg_employeename").getValue()[0].id;

        Xrm.WebApi.online.retrieveRecord("pg_prideemployee", employee, "?$select=emailaddress,_pg_reportstoid_value").then(
            function success(result) {
            
                var _pg_reportstoid_value = result["_pg_reportstoid_value"];
                var _pg_reportstoid_value_formatted = result["_pg_reportstoid_value@OData.Community.Display.V1.FormattedValue"];
                var _pg_reportstoid_value_lookuplogicalname = result["_pg_reportstoid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
               
               var reportid = new Array();
                reportid[0] = new Object();
                reportid[0].id = _pg_reportstoid_value;
                reportid[0].name = _pg_reportstoid_value_formatted;
                reportid[0].entityType = _pg_reportstoid_value_lookuplogicalname;
               
                formContext.getAttribute("pg_manager").setValue(reportid);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
    catch {
        console.log();
      }
}





function sendemailtoHR(primaryControl) {   //send email to hr submit btn
    debugger;
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId();
    var confirmStrings = { text: "Confirm to Resolve?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
    var confirmOptions = { height: 250, width: 300 };
Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function (success) {
        if (success.confirmed) {
            debugger;

            var workflowId = "310F203F-55E6-4ED9-8C3A-114131866E98";
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

////Requirement::Show & hide button based on condition
function SENDEmailtoEmployee(primaryControl) {  //main form
    debugger;
    var formContext = primaryControl;
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentuserid = userSettings.userId;//srividya
   // var username = userSettings.userName;
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
  
    if (stageId !== "6a8cbd2d-904b-46e0-af8b-0ec9f181a41a"){// && currentuserid === "0131b40a-bdb9-ec11-983f-000d3a9ba76f") {////initial stage
        return true;
    }
    else {
        return false;
    }
  }





function Close(context) {
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "pg_pipclose_6b2a3",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).then(console.log).catch(console.error);
}
function OnClosebtninactive(context) {
    var formContext = context.getFormContext(); 
          var managercomments = formContext.getAttribute("pg_managercomment").getValue();
        var status = formContext.getAttribute("statecode").getValue();
     //   var statusreason = formContext.getAttribute("statuscode").getValue();
if(managercomments!==null){
        formContext.getAttribute("statecode").setValue(1);   
formContext.data.entity.save(); 
 // formContext.data.entity.save("saveandclose");  
}
}

function sendEmail(primaryControl) {  //send email to 
    debugger;
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId();
    var confirmStrings = { text: "Confirm to Resolve?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
    var confirmOptions = { height: 250, width: 300 };
Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function (success) {
        if (success.confirmed) {
            debugger;
            var workflowId = "BA63DD63-984C-4D68-9415-59CA420DB65D";
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


function Weeklyemail(primaryControl) {   //mainform
    debugger;
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId();
    var confirmStrings = { text: "Confirm to Resolve?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
    var confirmOptions = { height: 250, width: 300 };
Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function (success) {
        if (success.confirmed) {
            debugger;

            var workflowId = "62C7C2C8-0257-46B6-8D82-2277047E3FE6";
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








function SubmitShowHide(primaryControl) {
    var formContext = primaryControl;
 var formType = formContext.ui.getFormType();
 var statusreason= formContext.getAttribute("pg_pipstatus").getValue();

    if (formType !== 1) {
    var currentRecordId = formContext.data.entity.getId().replace("{", "").replace("}", "");
    return new Promise(function (resolve, reject) {
        Xrm.WebApi.online.retrieveMultipleRecords("pg_pipobjectives", `?$select=pg_objectives,pg_target&$filter=_pg_parent_value eq ${currentRecordId}`).then(
            function success(results) {
    
                var allNonNull = true;

                if (results.entities.length === 0) {
                        allNonNull = false;
                    } else {
                        for (var i = 0; i < results.entities.length; i++) {
                            var pg_objectives = results.entities[i]["pg_objectives"];
                            var pg_target = results.entities[i]["pg_target"];
                          //  if (pg_objectives === null || pg_target===null ) {
   if ((pg_objectives === null || pg_target===null) || statusreason===140310001) {
                                allNonNull = false;
                                break;
                            }
                        }
                    }

                if (allNonNull) {
                    resolve(true); 
                } else {
                    resolve(false); 
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
                reject(error);
            }
        );
    });
}
}

///Share the record with Employee
function shareRecordWithEMP(PIPID) {
    PIPID=PIPID.toLowerCase().replace('{', '').replace('}', '');
        var employee = formContext.getAttribute("pg_employeename").getValue()[0].id.toLowerCase().replace('{', '').replace('}', '');
        var empEmailaddress = getAttributeValue("pg_prideemployees(" + employee + ")?$select=emailaddress");
        var empUserID = getAttributeValue("systemusers?$select=systemuserid&$filter=internalemailaddress eq '"+ empEmailaddress.emailaddress+"'");
    empUserID=empUserID.value[0].systemuserid;
        var parameters = {};
    
        var principalAccess = {
            "Principal": {
                "systemuserid": empUserID,//"ca43135a-1db6-ee11-a569-000d3a170a76",
                //put teamid here and Guid of team if you want to share with team
                "@odata.type": "Microsoft.Dynamics.CRM.systemuser"
                //put team instead of systemuser if you want to share with team
            },
            "AccessMask": "ReadAccess,WriteAccess"
            //full list of privileges is "ReadAccess, WriteAccess, AppendAccess, AppendToAccess, CreateAccess, DeleteAccess, ShareAccess, AssignAccess"
        };
    
        var target = {};
        target.pg_pipid = PIPID;//"c49d5f22-c06b-49f6-835f-807584a9b1c4"; //Delete if creating new record 
        target["@odata.type"] = "Microsoft.Dynamics.CRM.pg_pip";
        parameters.Target = target;
        parameters.PrincipalAccess = principalAccess;
    
        var req = new XMLHttpRequest();
        req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/GrantAccess", true);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204) {
                    //Success - No Return Data - Do Something
                } else {
                    Xrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send(JSON.stringify(parameters));
    }
    
    ///Revoke access the record with Employee
    function revokeRecordWithEMP(PIPID) {
        PIPID=PIPID.toLowerCase().replace('{', '').replace('}', '');
            var employee = formContext.getAttribute("pg_employeename").getValue()[0].id.toLowerCase().replace('{', '').replace('}', '');
            var empEmailaddress = getAttributeValue("pg_prideemployees(" + employee + ")?$select=emailaddress");
            
            var empUserID = getAttributeValue("systemusers?$select=systemuserid&$filter=internalemailaddress eq '"+ empEmailaddress.emailaddress+"'");
        empUserID=empUserID.value[0].systemuserid;
            var parameters = {};
        
            var revokee = {};
    revokee.systemuserid = empUserID; //Delete if creating new record 
    revokee["@odata.type"] = "Microsoft.Dynamics.CRM.systemuser";
    parameters.Revokee = revokee;
        
            var target = {};
            target.pg_pipid = PIPID;//"c49d5f22-c06b-49f6-835f-807584a9b1c4"; //Delete if creating new record 
            target["@odata.type"] = "Microsoft.Dynamics.CRM.pg_pip";
            parameters.Target = target;
           // parameters.PrincipalAccess = principalAccess;
        
            var req = new XMLHttpRequest();
            req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/RevokeAccess", true);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 204) {
                        //Success - No Return Data - Do Something
                    } else {
                        Xrm.Utility.alertDialog(this.statusText);
                    }
                }
            };
            req.send(JSON.stringify(parameters));
        }
    
    /// Retrieve single record by webAPI
    function getAttributeValue(stringQuery) {
        var retResult = "";
        try {
            var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/"+stringQuery, false);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function() {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                retResult = JSON.parse(this.response);
               // var emailaddress = result["emailaddress"];
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
    
        } catch (error) { console.log(error); }
        return retResult;
    }
    
    
    function validateEmplogin() {
        //Check the current logged in user
        var userSettings = Xrm.Utility.getGlobalContext().userSettings;
        var currentuserid = userSettings.userId.toLowerCase().replace('{', '').replace('}', '');
    
        var employee_value = Xrm.Page.getAttribute("pg_employeename").getValue();
        if (employee_value !== null) {
            var employee = employee_value[0].id.toLowerCase().replace('{', '').replace('}', '');
            var querytGetUserEmailID = "systemusers?$select=internalemailaddress&$filter=systemuserid eq " + currentuserid;
            var resUserEmailID = getAttributeValue(querytGetUserEmailID);
            var querytGetEmployeeEmailID = "pg_prideemployees?$select=emailaddress&$filter=pg_prideemployeeid eq " + employee;
            var resEmployeeEmailID = getAttributeValue(querytGetEmployeeEmailID);
            if (resUserEmailID.value[0].internalemailaddress !== resEmployeeEmailID.value[0].emailaddress) {
                return false;
                // formcontext.data.process.addOnPreStageChange(PIP.formEvents.handleStageMovement);
            }
            else {
                return true;
            }
        }
    }
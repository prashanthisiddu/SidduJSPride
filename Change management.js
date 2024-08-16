function validateActualStartTime(executionContext) {
    var formContext = executionContext.getFormContext();

    var actualStartTime = formContext.getAttribute("pg_actualstarttime").getValue();
    var plannedStartDate = formContext.getAttribute("pg_plannedstartdate").getValue();
    var plannedEndDate = formContext.getAttribute("pg_plannedenddate").getValue();

    if (actualStartTime && plannedStartDate && plannedEndDate) {
        if (actualStartTime < plannedStartDate || actualStartTime > plannedEndDate) {
            formContext.getControl("pg_actualstarttime").setNotification(
                "Actual Start date should be greater than planned start date and less than planned end date"
            );
        } else {
            formContext.getControl("pg_actualstarttime").clearNotification();
        }
    }
}

// Function to disable all form fields
function disableAllFormFields(formContext, fieldStatus) {
    "use strict";
    formContext.ui.controls.forEach(function (control) {
        if (control && control.getDisabled && !control.getDisabled()) {
            control.setDisabled(fieldStatus);
        }
    });
}

// Function to check if the status reason is inactive and disable all fields if true
function checkStatusAndDisableFields(formContext) {
    "use strict";
    var status = formContext.getAttribute("statecode").getValue();
   
    if (status === 1) {
        disableAllFormFields(formContext, true);
    }
}

// Main function to be called on form load
function onFormLoad(context) {
    var formContext = context.getFormContext();
    checkStatusAndDisableFields(formContext);
}



function basedOnWhetherTestField(context) {
    var formContext = context.getFormContext();
 var userSettings = Xrm.Utility.getGlobalContext().userSettings;

    var username = userSettings.userName;
    var approver = formContext.getAttribute("pg_approver").getValue();
if (approver && approver.length > 0) {
            var approverName = approver[0].name;
}
    var testStatus = formContext.getControl("pg_teststatus");
    var whetherTestHasMetExpectedOutcome = formContext.getAttribute("pg_whethertesthasmetexpectedoutcome").getValue();
   var changeevaluated = formContext.getAttribute("pg_changeevaluated").getValue();
    testStatus.clearOptions();
  
    if (whetherTestHasMetExpectedOutcome == 140310000) {
        testStatus.removeOption(140310001); // Failed
        testStatus.addOption({ text: 'Successful', value: 140310000 });
        testStatus.addOption({ text: 'Partially Successful', value: 140310002 });
    } else if (whetherTestHasMetExpectedOutcome == 140310001) {
        testStatus.addOption({ text: 'Failed', value: 140310001 });
        testStatus.removeOption(140310000);
        testStatus.removeOption(140310002);
    }
if(changeevaluated==140310001){
    formContext.getControl("pg_remarks").setVisible(true);
  formContext.getControl("pg_whethertesthasmetexpectedoutcome").setDisabled(true);
                    formContext.getControl("pg_teststatus").setDisabled(true);
                    formContext.getControl("pg_nextchangeproposalcycleifanyfailure").setDisabled(true);
                    formContext.getControl("pg_testresults").setDisabled(true);
                    formContext.getControl("pg_anyimprovisesupportrequired").setDisabled(true);
}
if(changeevaluated==140310000 &&  username !=approverName ) {
    formContext.getControl("pg_remarks").setVisible(false);
  formContext.getControl("pg_whethertesthasmetexpectedoutcome").setDisabled(false);
                    formContext.getControl("pg_teststatus").setDisabled(false);
                    formContext.getControl("pg_nextchangeproposalcycleifanyfailure").setDisabled(false);
                    formContext.getControl("pg_testresults").setDisabled(false);
                    formContext.getControl("pg_anyimprovisesupportrequired").setDisabled(false);
}
}





function setname(context) {
  var formContext = context.getFormContext();
  var createFormType = 1;
    var formType = formContext.ui.getFormType();

    if (formType != createFormType) {
var ticketnum = formContext.getAttribute("pg_ticketid").getValue();
var owner = formContext.getAttribute("ownerid").getValue();
 var ownerName = owner[0].name; 
       if (ticketnum!=null) {

          var Name = ticketnum + " - " + "Change Management - " + ownerName;
formContext.getAttribute("pg_name").setValue(Name);
        }
      }
    }




function completeSandH(primaryControl) {  //main form
  debugger;
  var formContext = primaryControl;
  var createform = 1;
  var Type = formContext.ui.getFormType();
  var userSettings = Xrm.Utility.getGlobalContext().userSettings;
  var username = userSettings.userName;
  var approver = formContext.getAttribute("pg_approver").getValue();
  var approverName = approver[0].name; 

  var approversecond = formContext.getAttribute("pg_approversecond").getValue();
  var approversecondName = approversecond[0].name; 

  if ((Type != createform && username ==approverName) || (Type != createform && username ==approversecondName)) {
   return true;
  }
  else {
      return false;
  }

}



function complete(primaryControl) {   //customize js action
  debugger;
  var formContext = primaryControl;
  var confirmStrings = { text: "Confirm to Resolve?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
  var confirmOptions = { height: 250, width: 300 };

  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
      function (success) {
          if (success.confirmed) {
        var status=formContext.getAttribute("statecode").getValue();
            formContext.getAttribute("statecode").setValue(1) 
  // formContext.getAttribute("stauscode").setValue(2)
              formContext.data.entity.save("saveandclose");
            
          }
      },
      function (error) {
         
          console.error(error.message);
      }
  );
}





function Resubmitform(primaryControl) {  //main form
    debugger;
    var formContext = primaryControl;
    var createform = 1;
    var Type = formContext.ui.getFormType();
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var username = userSettings.userName;
    var approver = formContext.getAttribute("pg_approver").getValue();
    var approverName = approver[0].name; 
var owner = formContext.getAttribute("ownerid").getValue();
 var ownerName = owner[0].name; 
 var secondapprover = formContext.getAttribute("pg_approversecond").getValue();

if(secondapprover!=null){
 var secondapproverName = secondapprover[0].name;
} 
       var decision = formContext.getAttribute("pg_decision").getValue(); 
   if (Type != createform && username ==ownerName  && decision!=null){//// || (Type != createform && username !=secondapproverName && decision!=null)) {
     return true;
    }
    else {
        return false;
    }

}






var originalValues = {};

function onLoadEvent(executionContext) {
    var formContext = executionContext.getFormContext();
    var attributes = formContext.data.entity.attributes.get();

    attributes.forEach(function (attribute) {
        var attributeName = attribute.getName();
        var attributeControl = formContext.getControl(attributeName);
        var attributeValue;

        var attributeType = attribute.getAttributeType();

      if (attributeType === "optionset"){
            attributeValue = getFormattedValueOrText(attribute);
              }      

            if (attributeType === "lookup") {
                attributeValue = getFormattedValueOrText(attribute);
  if (attributeValue && attributeValue.length > 0) {
        attributeValue = attributeValue[0].name;
    } 
        } if(attributeType == "string" || attributeType == "memo" || attributeType == "datetime" || attributeType == "boolean" || attributeType == "integer" || attributeType == "money") {
          attributeValue = attribute.getValue();
      }

        var formattedValueProperty = attributeName + "@OData.Community.Display.V1.FormattedValue";
        var formattedValueObject = {};
        formattedValueObject[formattedValueProperty] = attributeValue;

        Object.assign(originalValues, formattedValueObject);

        if (attributeControl) {
            var attributeLabel = attributeControl.getLabel();
            originalValues[attributeLabel] = attributeValue;
        }
    });
}

function getFormattedValueOrText(attribute) {
    if (typeof attribute.getFormattedValue === 'function') {
        return attribute.getFormattedValue();
    } else if (typeof attribute.getText === 'function') {
        return attribute.getText();
    } else {
      
        return attribute.getValue();
    }
}

function getoldvalues(primaryControl) {
    debugger;
    var formContext = primaryControl;
    if (formContext.data) {
        var attributes = formContext.data.entity.attributes.get();
        var changedAttributes = {};

        attributes.forEach(function (attribute) {
            var attributeName = attribute.getName();
            var attributeControl = formContext.getControl(attributeName);

            var attributeValue;
            var attributeType = attribute.getAttributeType();
  if (attributeType === "optionset"){
            attributeValue = getFormattedValueOrText(attribute);
              }      

            if (attributeType === "lookup") {
                attributeValue = getFormattedValueOrText(attribute);
  if (attributeValue && attributeValue.length > 0) {
        attributeValue = attributeValue[0].name;
    } 

            } if(attributeType == "string" || attributeType == "memo" || attributeType == "datetime" || attributeType == "boolean" || attributeType == "integer" || attributeType == "money") {
          attributeValue = attribute.getValue();
      }

            if (attributeControl && attribute.getIsDirty()) {
                var attributeLabel = attributeControl.getLabel();
                var oldValue = originalValues[attributeLabel];
                var newValue = attributeValue;

                changedAttributes[attributeLabel] = {
                    oldValue: oldValue,
                    newValue: newValue
                };
            }
        });

        console.log(changedAttributes);

        for (var attributeName in changedAttributes) {
            if (changedAttributes.hasOwnProperty(attributeName)) {
                Object.assign(originalValues, changedAttributes[attributeName]);
            }
        }

        updateTextField(formContext, changedAttributes);
    }
}

function updateTextField(formContext, changedAttributes) {
    var textField = formContext.getControl("pg_changedattributes");
    var newField = formContext.getControl("pg_newvalues");

    if (textField || newField) {
        var textValue = "";
        var newValue = "";

        for (var attributeName in changedAttributes) {
            if (changedAttributes.hasOwnProperty(attributeName)) {
                var changeInfo = changedAttributes[attributeName];
             ///   textValue += attributeName + ": " + changeInfo.oldValue + "\n";
             ///   newValue += attributeName + ": " + changeInfo.newValue + "\n";
            }
 if (Object.keys(changedAttributes).indexOf(attributeName) < Object.keys(changedAttributes).length - 1) {
            textValue += attributeName + ": " + changeInfo.oldValue + " ;" + "\n";
                newValue += attributeName + ": " + changeInfo.newValue +" ;" + "\n";
        } else {
            textValue += attributeName + ": " + changeInfo.oldValue + "\n";
                newValue += attributeName + ": " + changeInfo.newValue + "\n";
        }
        }

        if (textField) {
            textField.getAttribute().setValue(textValue.trim());
        }

        if (newField) {
            newField.getAttribute().setValue(newValue.trim());
        }
    }
}










function approveAndLogCurrentUser(context) {
    var formContext = context.getFormContext();
var changedattributes = formContext.getAttribute("pg_changedattributes").getValue();

  var decision = formContext.getAttribute("pg_decision").getValue();
    var decisiondate = formContext.getAttribute("pg_decisiondate").getValue();
  var decisionexplanation = formContext.getAttribute("pg_decisionexplanation").getValue();
    var anytermsconditions = formContext.getAttribute("pg_anytermsconditions").getValue();

    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var username = userSettings.userName;
    var managerDecisionTab = formContext.ui.tabs.get("tab_3");
 var Tab4 = formContext.ui.tabs.get("tab_4");
var Changeevalutiontab = formContext.ui.tabs.get("tab_5");///tab_5
    var createFormType = 1;
    var formType = formContext.ui.getFormType();
 var GeneralInfo = formContext.ui.tabs.get("General_Information");   
    var generalinfodecisionsec = GeneralInfo.sections.get("Section_2");
    if (formType !== createFormType) {
        var approver = formContext.getAttribute("pg_approver").getValue();
        var approversecond = formContext.getAttribute("pg_approversecond").getValue();

        if (approver && approver.length > 0) {
            var approverName = approver[0].name;
            var approversecondName = approversecond && approversecond.length > 0 ? approversecond[0].name : null;

        if (username == approverName || username == approversecondName) {
            managerDecisionTab.setVisible(true);
 generalinfodecisionsec.setVisible(false);

if(decision==140310000 ||decision==140310001 ||decision==140310002){
 formContext.getControl("pg_decision1").setDisabled(true);
  formContext.getControl("pg_decisiondate1").setDisabled(true);
    formContext.getControl("pg_decisionexplanation1").setDisabled(true);
    formContext.getControl("pg_anytermsconditions1").setDisabled(true);
}
else{
 formContext.getControl("pg_decision1").setDisabled(false);
  formContext.getControl("pg_decisiondate1").setDisabled(false);
    formContext.getControl("pg_decisionexplanation1").setDisabled(false);
    formContext.getControl("pg_anytermsconditions1").setDisabled(false);

}

        } else {
            managerDecisionTab.setVisible(false);
if(decision!=null || decisiondate!=null || decisionexplanation!=null || anytermsconditions!=null){
 generalinfodecisionsec.setVisible(true);
 formContext.getControl("pg_decision").setDisabled(true);
    formContext.getControl("pg_decisiondate").setDisabled(true);
    formContext.getControl("pg_decisionexplanation").setDisabled(true);
    formContext.getControl("pg_anytermsconditions").setDisabled(true);
}
else{
  generalinfodecisionsec.setVisible(false);
 formContext.getControl("pg_decision").setDisabled(true);
    formContext.getControl("pg_decisiondate").setDisabled(true);
    formContext.getControl("pg_decisionexplanation").setDisabled(true);
    formContext.getControl("pg_anytermsconditions").setDisabled(true);
}
        }
    }
    }
    else{

    }
if(decision==140310003 && changedattributes!=null){

Tab4.setVisible(true);
}
else{
Tab4.setVisible(false);
}
if(decision!=null && username !=approverName || decision!=null && username ==approverName || decision!=null && username ==approversecondName){///decision==140310003 (moreinfo)
    Changeevalutiontab.setVisible(true);
}
else{
    Changeevalutiontab.setVisible(false);
    }
}






function changemanagement(context) {
    var formContext = context.getFormContext();
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var applicationsubtype = formContext.getControl("pg_applicationsubtype");
    var aplitionsubtype = formContext.getAttribute("pg_applicationsubtype").getValue();
    var applicationtype = formContext.getAttribute("pg_applicationtype").getValue();
    var includesecondapprover = formContext.getAttribute("pg_includesecondapprover").getValue();
    var createform = 1;
    var Type = formContext.ui.getFormType();

    if (Type == createform || Type != createform) {
        //if(applicationtype==140310000){
        var internalemailaddress;
        var teamIds = [
            "868b2be1-b987-ee11-8179-000d3a170a76",
            "778123b2-c187-ee11-8179-000d3a170a76",
            "6d17a901-c387-ee11-8179-000d3a170a76",
            "6e1e0851-c387-ee11-8179-000d3a170a76",
            "1fedd029-c487-ee11-8179-000d3a170a76",
            "24cf2e72-c487-ee11-8179-000d3a170a76 ",
            "425ec4ac-c487-ee11-8179-000d3a170a76",
            "d32858a6-c687-ee11-8179-000d3a170a76",
            "f81c5031-c787-ee11-8179-000d3a170a76",
            "60fd5a73-c787-ee11-8179-000d3a170a76"
        ];

        for (var i = 0; i < teamIds.length; i++) {
            retrieveTeamMembership(teamIds[i]);
        }
    }

    applicationsubtype.clearOptions();

    function retrieveTeamMembership(teamId) {
        var loggedinUserId = userSettings.userId.replace("{", "").replace("}", "");
        Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress").then(
            function success(result1) {
                var internalemailaddress2 = result1["internalemailaddress"];
                var req = new XMLHttpRequest();
                var requestUrl = Xrm.Page.context.getClientUrl() + "/api/data/v9.1/teams(" + teamId + ")/teammembership_association";
                req.open("GET", requestUrl, true);
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        req.onreadystatechange = null;
                        if (this.status === 200) {
                            var response = JSON.parse(this.response);

                            for (var i = 0; i < response.value.length; i++) {
                                internalemailaddress = response.value[i]["internalemailaddress"];
                                if (internalemailaddress2 === internalemailaddress) {
                                    if (teamId === "868b2be1-b987-ee11-8179-000d3a170a76") {
                                        applicationsubtype.addOption({ text: 'Vendor Management', value: 140310000 });
                                        applicationsubtype.addOption({ text: 'Organizational Change', value: 140310001 });
                                        applicationsubtype.addOption({ text: 'BPO Operations', value: 140310002 });
                                        applicationsubtype.addOption({ text: 'Administration Management', value: 140310003 });
                                        applicationsubtype.addOption({ text: 'Facility Management', value: 140310004 });
                                        applicationsubtype.addOption({ text: 'Others', value: 140310005 });
                                        if (aplitionsubtype == 140310000 || aplitionsubtype == 140310001 || aplitionsubtype == 140310002 || aplitionsubtype == 140310003 || aplitionsubtype == 140310004 || aplitionsubtype == 140310005) {
                                           var entityType = "systemuser";   

                                            var entityId ="{5107bbc4-568b-ed11-81ac-6045bda8aa87}"
                                            var employeeName = "Jayakumar MG"
                                       

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover == true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
var entityId1 = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName1 = "Srinivasan Sukumar";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "24cf2e72-c487-ee11-8179-000d3a170a76") {
                                        applicationsubtype.addOption({ text: 'IT Infrastructure Changes(SW/NW/Firewall/)', value: 140310006 });
                                        applicationsubtype.addOption({ text: 'IT - Asset Management', value: 140310007 });
                                        if (aplitionsubtype == 140310006 || aplitionsubtype == 140310007) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);



                                            if (includesecondapprover == true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "6e1e0851-c387-ee11-8179-000d3a170a76") {
                                     //   applicationsubtype.addOption({ text: 'HR Corporate Support', value: 140310008 });
                                        applicationsubtype.addOption({ text: 'HR Corporate HR Ops', value: 140310009 });
                                        applicationsubtype.addOption({ text: 'HR Corporate BP', value: 140310010 });
                                        applicationsubtype.addOption({ text: 'HR Corporate Talent Development', value: 140310011 });
                                        applicationsubtype.addOption({ text: 'HR Corporate Employee Engagement', value: 140310012 });
                                        if (aplitionsubtype == 140310009 || aplitionsubtype == 140310010 || aplitionsubtype == 140310011 || aplitionsubtype == 140310012) {//aplitionsubtype == 140310008 removed

                                            var entityType = "systemuser";
                                            var entityId = "{9ce8df14-59ef-ed11-8848-000d3a114691}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover == true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "f81c5031-c787-ee11-8179-000d3a170a76") {
                                        applicationsubtype.addOption({ text: 'Payroll & Benefits - Shared Services', value: 140310013 });
                                        if (aplitionsubtype == 140310013) {
                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover == true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "778123b2-c187-ee11-8179-000d3a170a76") {
                                        applicationsubtype.addOption({ text: 'Audit & Compliance Internal', value: 140310014 });
                                        if (aplitionsubtype == 140310014) {
                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover == true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "d32858a6-c687-ee11-8179-000d3a170a76 ") {
                                        applicationsubtype.addOption({ text: 'HR Operations Management - Shared Services', value: 140310015 });
                                        if (aplitionsubtype == 140310015) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover == true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "6d17a901-c387-ee11-8179-000d3a170a76") {
                                        applicationsubtype.addOption({ text: 'Finance & Accounts Management', value: 140310016 });
                                        if (aplitionsubtype == 140310016) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                            if (includesecondapprover == true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "425ec4ac-c487-ee11-8179-000d3a170a76") {
                                        applicationsubtype.addOption({ text: 'Learning & Development', value: 140310017 });
                                        if (aplitionsubtype == 140310017) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover == true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "1fedd029-c487-ee11-8179-000d3a170a76") {
                                        applicationsubtype.addOption({ text: 'RTA Staffing Domestic', value: 140310018 });
                                        if (aplitionsubtype == 140310018) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";


                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);



                                            if (includesecondapprover == true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "60fd5a73-c787-ee11-8179-000d3a170a76") {
                                        applicationsubtype.addOption({ text: 'Financial Reporting', value: 140310019 });
                                        if (aplitionsubtype == 140310019) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";


                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover == true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                req.send();
            }
        )

        //}
        formContext.getAttribute("pg_whychangeisrequired").setRequiredLevel("required");
        formContext.getAttribute("pg_projectprograminitiative").setRequiredLevel("required");
        formContext.getAttribute("pg_estimatedcostoption").setRequiredLevel("required");
        formContext.getAttribute("pg_priority").setRequiredLevel("required");
        formContext.getAttribute("pg_intendedoutcome").setRequiredLevel("required");
        formContext.getAttribute("pg_hours").setRequiredLevel("required");

        formContext.getAttribute("pg_durationimpact").setRequiredLevel("required");
        formContext.getAttribute("pg_recommendations").setRequiredLevel("required");
        formContext.getAttribute("pg_scheduleimpactwbs").setRequiredLevel("required");
        formContext.getAttribute("pg_currency").setRequiredLevel("required");
        formContext.getAttribute("pg_comments").setRequiredLevel("required");
   
    }
    if (Type == createform) {
        formContext.getControl("pg_applicationsubtype").setDisabled(false);
    }
    else {
        formContext.getControl("pg_applicationsubtype").setDisabled(true);
    }
}



function currencySH(executionContext) {                       //mainFORM
    debugger;
    var formContext = executionContext.getFormContext();
    var currency = formContext.getAttribute("pg_currency").getValue();
  var Estimatedcost = formContext.getAttribute("pg_estimatedcostoption").getValue();
   var teststatus = formContext.getAttribute("pg_teststatus").getValue();///teststatus field
  var changeproposalforcompleteenvironment = formContext.getAttribute("pg_changeproposalforcompleteenvironment").getValue();//changeproposalforcompleteenvironment

    if (currency == 140310000) {//currency==INR
        formContext.getControl("pg_curency_inr").setVisible(true);
    }
    else {
        formContext.getControl("pg_curency_inr").setVisible(false);
    }

    if (currency == 140310001) { // iif currency==dollar
        formContext.getControl("pg_costimpact").setVisible(true);
    }
    else {
        formContext.getControl("pg_costimpact").setVisible(false);
    }
  if (Estimatedcost == 140310000) {//Estimatedcost==INR
        formContext.getControl("pg_estimatedcost").setVisible(true);
    }
    else {
        formContext.getControl("pg_estimatedcost").setVisible(false);
    }

    if (Estimatedcost == 140310001) { // iif Estimatedcost==dollar
        formContext.getControl("pg_estimatedcostdollar").setVisible(true);
    }
    else {
        formContext.getControl("pg_estimatedcostdollar").setVisible(false);
    }
   if (teststatus == 140310001 || teststatus == 140310002) { // iif teststatus==partial failed
        formContext.getControl("pg_ifpartialfailed").setVisible(true);
    }
    else {
        formContext.getControl("pg_ifpartialfailed").setVisible(false);
    }
  if (changeproposalforcompleteenvironment == 140310001) { // iif changeproposalforcompleteenvironment==no
        formContext.getControl("pg_ifno").setVisible(true);
    }
    else {
        formContext.getControl("pg_ifno").setVisible(false);
    }

}

function approversetdisbled(context) {
    var formContext = context.getFormContext();
      var userSettings = Xrm.Utility.getGlobalContext().userSettings;
      //var currentuserid = userSettings.userId;
      var username = userSettings.userName;
  var decision = formContext.getAttribute("pg_decision").getValue();
     //var loggedinUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "");
      var createform = 1;
      var Type = formContext.ui.getFormType();
      if (Type != createform) {
    var approver = formContext.getAttribute("pg_approver").getValue();
 var secondapprover = formContext.getAttribute("pg_approversecond").getValue();
if(approver != null){
      var approverName = approver[0].name; 
if(secondapprover!=null){
 var secondapproverName = secondapprover[0].name; 
}
  if(username==approverName || username==secondapproverName){/// (decision==140310000 ||decision==140310001 ||decision==140310002)
    formContext.getControl("pg_whychangeisrequired").setDisabled(true);          
    formContext.getControl("pg_projectprograminitiative").setDisabled(true);
    formContext.getControl("pg_estimatedcostoption").setDisabled(true);
    formContext.getControl("pg_estimatedcost").setDisabled(true);
    formContext.getControl("pg_estimatedcostdollar").setDisabled(true);
    formContext.getControl("pg_priority").setDisabled(true);
    formContext.getControl("pg_intendedoutcome").setDisabled(true);
    formContext.getControl("pg_hours").setDisabled(true);
  
    formContext.getControl("pg_durationimpact").setDisabled(true);
    formContext.getControl("pg_recommendations").setDisabled(true);
    formContext.getControl("pg_scheduleimpactwbs").setDisabled(true);
    formContext.getControl("pg_currency").setDisabled(true);
    formContext.getControl("pg_costimpact").setDisabled(true);
    formContext.getControl("pg_curency_inr").setDisabled(true);
    formContext.getControl("pg_comments").setDisabled(true);
    formContext.getControl("pg_applicationtype").setDisabled(true);
   // formContext.getControl("pg_applicationsubtype").setDisabled(true);
    formContext.getControl("pg_approver").setDisabled(true);
    formContext.getControl("pg_prioritytype").setDisabled(true);
    formContext.getControl("pg_description").setDisabled(true);

   formContext.getControl("pg_includesecondapprover").setDisabled(true);
    formContext.getControl("pg_approversecond").setDisabled(true);
  formContext.getControl("pg_evaluationdate").setDisabled(true);
                    formContext.getControl("pg_evaluationplanexplanation").setDisabled(true);
                    formContext.getControl("pg_changeevaluated").setDisabled(true);
                    formContext.getControl("pg_whethertesthasmetexpectedoutcome").setDisabled(true);
                    formContext.getControl("pg_teststatus").setDisabled(true);
                    formContext.getControl("pg_changeproposalforcompleteenvironment").setDisabled(true);
                    formContext.getControl("pg_ifno").setDisabled(true);
                    formContext.getControl("pg_anyimprovisesupportrequired").setDisabled(true);
                   // formContext.getControl("pg_intendedoutcome1").setDisabled(true);
                  //  formContext.getControl("pg_requirementsrecommendations").setDisabled(true);
                //    formContext.getControl("pg_requirementsrecommendations").setDisabled(true);
                    formContext.getControl("pg_testresults").setDisabled(true);
                    formContext.getControl("pg_attachment").setDisabled(true);
 formContext.getControl("pg_ifpartialfailed").setDisabled(true);
                    formContext.getControl("pg_nextchangeproposalcycleifanyfailure").setDisabled(true);
  }
  else{
    formContext.getControl("pg_whychangeisrequired").setDisabled(false);          
    formContext.getControl("pg_projectprograminitiative").setDisabled(false);
    formContext.getControl("pg_estimatedcostoption").setDisabled(false);
   formContext.getControl("pg_estimatedcost").setDisabled(false);
    formContext.getControl("pg_estimatedcostdollar").setDisabled(false);
    formContext.getControl("pg_priority").setDisabled(false);
    formContext.getControl("pg_intendedoutcome").setDisabled(false);
    formContext.getControl("pg_hours").setDisabled(false);
  
    formContext.getControl("pg_durationimpact").setDisabled(false);
    formContext.getControl("pg_recommendations").setDisabled(false);
    formContext.getControl("pg_scheduleimpactwbs").setDisabled(false);
    formContext.getControl("pg_currency").setDisabled(false);
    formContext.getControl("pg_costimpact").setDisabled(false);
    formContext.getControl("pg_curency_inr").setDisabled(false);
    formContext.getControl("pg_comments").setDisabled(false);
    formContext.getControl("pg_applicationtype").setDisabled(false);
   // formContext.getControl("pg_applicationsubtype").setDisabled(false);
    formContext.getControl("pg_approver").setDisabled(false);
    formContext.getControl("pg_prioritytype").setDisabled(false);
    formContext.getControl("pg_description").setDisabled(false);

   formContext.getControl("pg_includesecondapprover").setDisabled(false);
    formContext.getControl("pg_approversecond").setDisabled(false);

formContext.getControl("pg_evaluationdate").setDisabled(false);
                    formContext.getControl("pg_evaluationplanexplanation").setDisabled(false);
                    formContext.getControl("pg_changeevaluated").setDisabled(false);
                    formContext.getControl("pg_whethertesthasmetexpectedoutcome").setDisabled(false);
                    formContext.getControl("pg_teststatus").setDisabled(false);
                    formContext.getControl("pg_changeproposalforcompleteenvironment").setDisabled(false);
                    formContext.getControl("pg_ifno").setDisabled(false);
                    formContext.getControl("pg_anyimprovisesupportrequired").setDisabled(false);
                //    formContext.getControl("pg_intendedoutcome1").setDisabled(false);
                   // formContext.getControl("pg_requirementsrecommendations").setDisabled(false);
                //    formContext.getControl("pg_requirementsrecommendations").setDisabled(false);
                    formContext.getControl("pg_testresults").setDisabled(false);
                    formContext.getControl("pg_attachment").setDisabled(false);
 formContext.getControl("pg_ifpartialfailed").setDisabled(false);
                    formContext.getControl("pg_nextchangeproposalcycleifanyfailure").setDisabled(false);
}
  }
}
}




// To Calculate Time Period when a record is created until it is closed.
function calculateTime(context)
{
   debugger;
   var formContext = context.getFormContext();

   var formType = formContext.ui.getFormType();

   if(formType == 2)
   {
   var createdOn = formContext.getAttribute("createdon").getValue();
   var status = formContext.getAttribute("statecode").getValue();
   var currentTime = new Date();
   var timeDifference = currentTime - createdOn;

   if (status == 0)
   {
   var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
   var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

   formContext.getAttribute("pg_timeperiod").setValue(days + "D  " +  hours + "H  " +  minutes + "M");
   formContext.getControl("pg_timeperiod").setDisabled(true);
   }
  }
}
// On Click of RE OPEN button, record moves from InACTIVE to ACTIVE State
function confirmAndActivateRecord(primaryControl) {   
  debugger;
  var formContext = primaryControl;
  var confirmStrings = { title: "Confirm ReOpen", text: "Are You Sure You Want to Reopen This Record?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
  var confirmOptions = { height: 250, width: 300 };

  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
      function (success) {
          if (success.confirmed) {
        var status=formContext.getAttribute("statecode").getValue();
            formContext.getAttribute("statecode").setValue(0);
  // formContext.getAttribute("stauscode").setValue(2)
              formContext.data.entity.save("saveandclose");
            
          }
      },
      function (error) {
         
          console.error(error.message);
      }
  );
}

// on click of ONHOLD Button, record status changes from Active to On-Hold
function OnHoldButton(primaryControl) {  
  debugger;
  var formContext = primaryControl;
  var confirmStrings = { title: "Confirm OnHold", text: "Are You Sure You Want to OnHold This Record?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
  var confirmOptions = { height: 250, width: 300 };

  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
      function (success) {
          if (success.confirmed) {
       var statusReason=formContext.getAttribute("statuscode").getValue();
           // formContext.getAttribute("statecode").setValue(0);
           formContext.getAttribute("statuscode").setValue(140310000);
           //   formContext.data.entity.save("saveandclose");
            
          }
      },
      function (error) {
         
          console.error(error.message);
      }
  );
}
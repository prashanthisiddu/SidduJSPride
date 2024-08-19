function checkCurrentRecordHasEmailActivityOrNot(executionContext) {
    var formContext = executionContext.getFormContext();
    var recordId = formContext.data.entity.getId();
    recordId = recordId.replace("{", "").replace("}", "");
    var fetchXml = `
        <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
            <entity name='email'>
                <attribute name='subject'/>
                <attribute name='regardingobjectid'/>
                <attribute name='from'/>
                <attribute name='to'/>
                <attribute name='prioritycode'/>
                <attribute name='statuscode'/>
                <attribute name='modifiedon'/>
                <attribute name='activityid'/>
                <order attribute='subject' descending='false'/>
                <filter type='and'>
                    <condition attribute='regardingobjectid' operator='eq' value='${recordId}'/>
                </filter>
            </entity>
        </fetch>`;

    var encodedFetchXml = encodeURIComponent(fetchXml);
    Xrm.WebApi.retrieveMultipleRecords("email", "?fetchXml=" + encodedFetchXml).then(
        function success(result) {
            if (result.entities.length > 0) {
                console.log('Email activities found:', result.entities);
            
            } else {
                console.log('No email activities found for this record.');        
                Xrm.Utility.alertDialog('Cannot move to the next stage. No email activities found.');
            }
        },
        function(error) {
            console.error(error.message);
            Xrm.Navigation.openErrorDialog({ message: error.message });
        }
    );
}


















function pastDate(executionContext) {
    var formContext = executionContext.getFormContext();
    var today = new Date();
    today.setHours(0, 0, 0, 0);  // Reset time portion for comparison
    var date = formContext.getAttribute('pg_startdate').getValue();
  
    if (date != null) {
        var date1 = new Date(date);
        date1.setHours(0, 0, 0, 0);  // Reset time portion for comparison
  
        if (today > date1) {
            formContext.getAttribute("pg_startdate").setValue(null);
            formContext.getControl("pg_startdate").setNotification("The selected start date cannot be in the past.", "START_DATE_ERROR");
        } else {
            formContext.getControl("pg_startdate").clearNotification("START_DATE_ERROR");
        }
    }
  }

  
// Function to show a series of alerts counting down from 10 to 0
function showCountdown(countdown) {
    if (countdown >= 0) {
        alert(countdown + " seconds left");
        countdown--;
        setTimeout(function() {
            showCountdown(countdown);
        }, 1000); // 1000 ms = 1 second
    } else {
        Xrm.Utility.showProgressIndicator("Processing... Please wait.");
        setTimeout(function() {
            Xrm.Utility.closeProgressIndicator();
        }, 210000); // 210000 ms = 210 seconds
    }
}

// Start the countdown
alert("Starting the countdown...");
showCountdown(10); // Start the countdown from 10 seconds




function onchangeofstartdate(context) {
    var formContext = context.getFormContext();
    var startdateAttr = formContext.getAttribute("pg_startdate");

    if (startdateAttr) {
        startdateAttr.addOnChange(startdate.bind(null, formContext));
    }
}

function startdate(formContext) {
   
   // formContext.data.entity.save();
   //formContext.data.refresh();
            formContext.ui.refresh();
        
    
}


var ExternalOnboarding = {};
ExternalOnboarding.dialogOpen = false;

ExternalOnboarding.formEvents = {
    form_load: function (context) {
        var formcontext = context.getFormContext();
        formcontext.data.process.addOnPreStageChange(ExternalOnboarding.formEvents.handleStageMovement);
    },
    handleStageMovement: function (context) {
        var bpfArguments = context.getEventArgs();
        var formcontext = context.getFormContext();
        var bpfstage = formcontext.data.process.getActiveStage().getName();
 var recordId = formcontext.data.entity.getId();
        if (bpfstage === "Clear To Start") {
            var Agreement = formcontext.getAttribute("pg_agreement").getValue();
            var directdepositform = formcontext.getAttribute("pg_directdepositform").getValue();
            var trainingdocuments = formcontext.getAttribute("pg_trainingdocuments").getValue();
            var benefitsdocuments = formcontext.getAttribute("pg_benefitsdocuments").getValue();
            var statelevelmandatorydocuments = formcontext.getAttribute("pg_statelevelmandatorydocuments").getValue();
            var clienttrainingdocuments = formcontext.getAttribute("pg_clienttrainingdocuments").getValue();
            var codeofconduct = formcontext.getAttribute("pg_codeofconduct").getValue();
            var federaltaxform = formcontext.getAttribute("pg_federaltaxform").getValue();
            var statetax = formcontext.getAttribute("pg_statetaxform").getValue();
            var bgccheck = formcontext.getAttribute("pg_bgccheck").getValue();

            var formi9section1 = formcontext.getAttribute("pg_formi9section1").getValue();
            var formi9section2 = formcontext.getAttribute("pg_formi9section2").getValue();
            var everify = formcontext.getAttribute("pg_everify").getValue();
            var Agreementkickoff = formcontext.getAttribute("pg_agreementkickoff").getValue();
            var directdepositformkickoff = formcontext.getAttribute("pg_directdepositformkickoff").getValue();
            var statetaxformkickoff = formcontext.getAttribute("pg_statetaxformkickoff").getValue();
            var statelevelmandatorydocumentskickoff = formcontext.getAttribute("pg_statelevelmandatorydocumentskickoff").getValue();
            var clienttrainingdocumentskickoff = formcontext.getAttribute("pg_clienttrainingdocumentskickoff").getValue();
            var codeofconductkickoff = formcontext.getAttribute("pg_codeofconductkickoff").getValue();
            var benefitsdocumentskickoff = formcontext.getAttribute("pg_benefitsdocumentskickoff").getValue();
            var federaltaxformkickoff = formcontext.getAttribute("pg_federaltaxformkickoff").getValue();
            var trainingdocumentskickoff = formcontext.getAttribute("pg_trainingdocumentskickoff").getValue();
            var bgccheckkickoff = formcontext.getAttribute("pg_bgccheckkickoff").getValue();

            var formi9section1kickoff = formcontext.getAttribute("pg_formi9section1kickoff").getValue();
            var formi9section2kickoff = formcontext.getAttribute("pg_formi9section2kickoff").getValue();
            var everifykickoff = formcontext.getAttribute("pg_everifykickoff").getValue();

            if (((bpfArguments.getDirection() === "Next") &&
                (Agreement === null || directdepositform === null || trainingdocuments === null ||
                    benefitsdocuments === null || statelevelmandatorydocuments === null || clienttrainingdocuments === null ||
                    codeofconduct === null || federaltaxform === null || statetax === null || bgccheck === null ||
                    formi9section1 === null || formi9section2 === null || everify === null || Agreement === 140310001 || directdepositform === 140310001 || trainingdocuments === 140310001 ||
                    benefitsdocuments === 140310001 || statelevelmandatorydocuments === 140310001 || clienttrainingdocuments === 140310001 ||
                    codeofconduct === 140310001 || federaltaxform === 140310001 || statetax === 140310001 || bgccheck === 140310001 ||
                    formi9section1 === 140310001 || formi9section2 === 140310001 || everify === 140310001)) ||
                ((bpfArguments.getDirection() === "Next") &&
                    (Agreementkickoff === null || directdepositformkickoff === null || statetaxformkickoff === null ||
                        statelevelmandatorydocumentskickoff === null || clienttrainingdocumentskickoff === null ||
                        trainingdocumentskickoff === null || codeofconductkickoff === null || benefitsdocumentskickoff === null ||
                        federaltaxformkickoff === null || bgccheckkickoff === null || formi9section1kickoff === null ||
                        formi9section2kickoff === null || everifykickoff === null))) {

                bpfArguments.preventDefault();

                if (!ExternalOnboarding.dialogOpen) {
                    ExternalOnboarding.dialogOpen = true;
                    var confirmStrings = {
                        title: "Onboarding Incomplete",
                        text: "Kindly complete all required fields to proceed to the next stage.",
                        confirmButtonLabel: "OK",
                        cancelButtonLabel: "Cancel"
                    };
                    var confirmOptions = { height: 250, width: 300 };
                    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
                        function (success) {
                            ExternalOnboarding.dialogOpen = false;
                            if (success.confirmed) {
//formcontext.data.entity.save();
                                         var GUID = "7cb40efb-b66a-4b65-acdb-47f2cb6210b2";
                                          Xrm.Page.data.process.setActiveStage(GUID, function (result) {
                                if (result == "success") {
                               
                                } else {
                                 
                                }
                                return;
                            });
                    
                                }
                            } 
                )}
            }
        }
      if (bpfstage === "Assignment Creation") {
            var assignmentLookup = formcontext.getAttribute("pg_assignmentid").getValue();
            var clientName = formcontext.getAttribute("pg_clientname").getValue();

            if (assignmentLookup && assignmentLookup.length > 0) {
                var assignmentId = assignmentLookup[0].id;
                var assignmentIdFormatted = assignmentId.replace("{", "").replace("}", "").toLowerCase();


var ClientName = `pg_workerassignmentses?$select=pg_client&$filter=pg_workerassignmentsid eq '${assignmentIdFormatted}'`;
var client=getAttributeValue(ClientName);
var pgclientname=client.value[0].pg_client;

                    if (pgclientname !== clientName) {
                    bpfArguments.preventDefault();
                    Xrm.Utility.alertDialog("No matching client found. You cannot proceed to the next stage.");
                }
               
        }
    }
    if (bpfstage === "Initiate Welcome Email") {
        var recordIdFormatted = recordId.replace("{", "").replace("}", "").toLowerCase();
        var regardingobjectid_value = `emails?$select=_regardingobjectid_value&$filter=_regardingobjectid_value eq '${recordIdFormatted}'`;
    
        var regardingobjectid = getAttributeValue(regardingobjectid_value);
        var alertShown = false;
    
        if (!alertShown && regardingobjectid.value && regardingobjectid.value.length === 0) {
            alertShown = true;
            bpfArguments.preventDefault();
            Xrm.Utility.alertDialog("Cannot move to the next stage. No email activities found.");
            return;
        } 
    }
    
 /*
 if (bpfstage === "Initiate Welcome Email") {
    var recordIdFormatted = recordId.replace("{", "").replace("}", "").toLowerCase();
    var regardingobjectid_value = `emails?$select=_regardingobjectid_value,statecode,statuscode&$filter=_regardingobjectid_value eq '${recordIdFormatted}'`;

    var regardingobjectid = getAttributeValue(regardingobjectid_value);
    var alertShown = false;
 var hasSentEmail = regardingobjectid.value.some(email => email.statuscode === 3);
    if ((!alertShown && regardingobjectid.value && regardingobjectid.value.length === 0) || (!alertShown && !hasSentEmail)) {
        alertShown = true;
        bpfArguments.preventDefault();
        Xrm.Utility.alertDialog("Cannot move to the next stage. No email activities found.");
        return;
    } 
}
      if (bpfstage === "Initiate Welcome Email") {

            var recordIdFormatted = recordId.replace("{", "").replace("}", "").toLowerCase();
            var regardingobjectid_value = `emails?$select=_regardingobjectid_value&$filter=_regardingobjectid_value eq '${recordIdFormatted}'`;

            var regardingobjectid = getAttributeValue(regardingobjectid_value);
            if (regardingobjectid.value && regardingobjectid.value.length === 0) {
                bpfArguments.preventDefault();
                Xrm.Utility.alertDialog("Cannot move to the next stage. No email activities found.");
               return;
            } 

        }
       
         if (bpfstage === "Initiate Welcome Email") {       
        var fetchXml = `
        <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
            <entity name='email'>
                <attribute name='subject'/>
                <attribute name='regardingobjectid'/>
                <attribute name='from'/>
                <attribute name='to'/>
                <attribute name='prioritycode'/>
                <attribute name='statuscode'/>
                <attribute name='modifiedon'/>
                <attribute name='activityid'/>
                <order attribute='subject' descending='false'/>
                <filter type='and'>
                    <condition attribute='regardingobjectid' operator='eq' value='${recordId}'/>
                </filter>
            </entity>
        </fetch>`;

    var encodedFetchXml = encodeURIComponent(fetchXml);
    Xrm.WebApi.retrieveMultipleRecords("email", "?fetchXml=" + encodedFetchXml).then(
        function success(result) {
            if (result.entities.length === 0) {
                bpfArguments.preventDefault();
                Xrm.Utility.alertDialog("Cannot move to the next stage. No email activities found.");
                console.log('Email activities found:', result.entities);
            
            } else {
                console.log('No email activities found for this record.');        
                //Xrm.Utility.alertDialog('Cannot move to the next stage. No email activities found.');
            }
        },
        function(error) {
            console.error(error.message);
            Xrm.Navigation.openErrorDialog({ message: error.message });
        }
    );
}
    }
}*/

    }
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







async function loadEmailTemplate(executionContext) {
    var formContext = executionContext.getFormContext();
    var regardingobjectidValue = formContext.getAttribute("regardingobjectid").getValue();

    if (!regardingobjectidValue || regardingobjectidValue.length === 0) {
        Xrm.Utility.alertDialog("Regarding object ID is not specified.");
        return;
    }

    var regardingobjectid = regardingobjectidValue[0].id;

    try {
        const onboardingResults = await Xrm.WebApi.online.retrieveMultipleRecords(
            "pg_externalonboarding",
            `?$select=pg_clientname&$filter=pg_externalonboardingid eq '${regardingobjectid}'`
        );

        if (!onboardingResults || !onboardingResults.entities || onboardingResults.entities.length === 0) {
            Xrm.Utility.alertDialog("No external onboarding records found.");
            return;
        }

        var pg_clientname = onboardingResults.entities[0]["pg_clientname"];

        if (!pg_clientname || typeof pg_clientname !== 'string') {
            Xrm.Utility.alertDialog("Client name is empty or not a string.");
            return;
        }

        const templateResults = await Xrm.WebApi.online.retrieveMultipleRecords(
            "template",
            `?$select=templateid,templateidunique,body,subject&$filter=contains(title, '${pg_clientname}')`
        );

        if (!templateResults || !templateResults.entities || templateResults.entities.length === 0) {
            Xrm.Utility.alertDialog(`No Email template found for ${pg_clientname}`);
            return;
        }

        var template = templateResults.entities[0];
        var templateBody = template["body"];
        var templateSubject = template["subject"];

        if (!templateBody || typeof templateBody !== 'string') {
            Xrm.Utility.alertDialog("Email template body is empty or not a string.");
            return;
        }

        var regex = /<!\[CDATA\[(.*?)]]>/;
        var match = templateSubject.match(regex);

        var plainTextSubject = match && match.length > 1 ? match[1] : "No text extracted";


        formContext.getAttribute("description").setValue(templateBody);
        formContext.getAttribute("subject").setValue(plainTextSubject);
        formContext.getAttribute("description").setSubmitMode("never");
        // formContext.data.save();
    } catch (error) {
        Xrm.Utility.alertDialog(`Error: ${error.message}`);
    }
}


async function loadEmailTemplate(executionContext) {
    var formContext = executionContext.getFormContext();
    var regardingObjectIdValue = formContext.getAttribute("regardingobjectid").getValue();

    if (!regardingObjectIdValue || regardingObjectIdValue.length === 0) {
        Xrm.Utility.alertDialog("Regarding object ID is not specified.");
        return;
    }

    var regardingObjectId = regardingObjectIdValue[0].id;

    try {
        // Retrieve the external onboarding record
        const onboardingResults = await Xrm.WebApi.online.retrieveMultipleRecords(
            "pg_externalonboarding",
            `?$select=pg_clientname&$filter=pg_externalonboardingid eq '${regardingObjectId}'`
        );

        if (!onboardingResults || !onboardingResults.entities || onboardingResults.entities.length === 0) {
            Xrm.Utility.alertDialog("No external onboarding records found.");
            return;
        }

        var clientName = onboardingResults.entities[0]["pg_clientname"];

        if (!clientName || typeof clientName !== 'string') {
            Xrm.Utility.alertDialog("Client name is empty or not a string.");
            return;
        }

        // Retrieve the email template matching the client name
        const templateResults = await Xrm.WebApi.online.retrieveMultipleRecords(
            "template",
            `?$select=templateid,templateidunique,body,subject&$filter=contains(title, '${clientName}')`
        );

        if (!templateResults || !templateResults.entities || templateResults.entities.length === 0) {
            Xrm.Utility.alertDialog(`No email template found for ${clientName}`);
            return;
        }

        // Use the first template found
        var template = templateResults.entities[0];
        var templateBody = template["body"];
        var templateSubject = template["subject"];

        if (!templateBody || typeof templateBody !== 'string') {
            Xrm.Utility.alertDialog("Email template body is empty or not a string.");
            return;
        }

        // Set the email body and subject to the form
        formContext.getAttribute("description").setValue(templateBody);
        formContext.getAttribute("subject").setValue(templateSubject);

        // Ensure the description field is visible and not read-only
        var descriptionControl = formContext.getControl("description");
        if (descriptionControl) {
            console.log("Setting description field visibility to true and disabling any read-only settings.");
            descriptionControl.setVisible(true);
            descriptionControl.setDisabled(false);
        }

        // Prevent the description field from being saved immediately
        formContext.getAttribute("description").setSubmitMode("never");

    } catch (error) {
        Xrm.Utility.alertDialog(`Error: ${error.message}`);
    }
}

// Ensure the loadEmailTemplate function is called on form load
function onFormLoad(executionContext) {
    loadEmailTemplate(executionContext);

    // Ensure description field is visible on form load
    var formContext = executionContext.getFormContext();
    var descriptionControl = formContext.getControl("description");
    if (descriptionControl) {
        console.log("Ensuring description field is visible and enabled on form load.");
        descriptionControl.setVisible(true);
        descriptionControl.setDisabled(false);
    }

    // Additional delayed check to ensure visibility
    setTimeout(() => {
        var delayedDescriptionControl = formContext.getControl("description");
        if (delayedDescriptionControl) {
            console.log("Delayed check: Ensuring description field is visible and enabled.");
            delayedDescriptionControl.setVisible(true);
            delayedDescriptionControl.setDisabled(false);
        }
    }, 2000); // Adjust the delay as needed
}

// Register the onFormLoad function to the form's OnLoad event



function AddTemplate(executionContext) {
    var formContext = executionContext.getFormContext();
    if (!formContext) {   
        return;
    }

    var clientNameAttribute = formContext.getAttribute("pg_clientname");
    if (clientNameAttribute && clientNameAttribute.getValue()) {
        var clientName = clientNameAttribute.getValue();

        var filter = `?$select=templateid,templateidunique,body&$filter=contains(title, '${clientName}')`;
        Xrm.WebApi.online.retrieveMultipleRecords("template", filter).then(
            function success(results) {
                if (results.entities.length > 0) {
                    var template = results.entities[0];
                    var templateBody = template["body"];
                    var parameters = {
                        "regardingobjectid": clientNameAttribute.getValue()[0].id,
                        "regardingobjectidname": clientNameAttribute.getValue()[0].name,
                        "regardingobjectidtype": clientNameAttribute.getValue()[0].entityType
                    };
                
                 
                 //   Xrm.Utility.openEntityForm("email", null, parameters); 
                } else {
                    Xrm.Utility.alertDialog(`No Email template found for ${clientName}`);
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(`Error retrieving template: ${error.message}`);
            }
        );
    } else {
        Xrm.Utility.alertDialog("Client name is not specified.");
    }
}



function EmailNotificationToAudit(context) {
    debugger;
    var formContext = context.getFormContext(); 
    //var EmailAudit = formContext.getAttribute("pg_emailnotificationtoaudit").getValue();
var activeStage = formContext.data.process.getActiveStage();
var stageId = activeStage.getId();
if (stageId === "742174ae-8f05-4e95-b465-b37b6b7fd414")
    {
        formContext.getControl("header_process_pg_emailnotificationtoaudit").setDisabled(true);
        formContext.getControl("header_process_pg_applicantbackgroundscreeningsuccessful").setDisabled(true);
    }
}

function checkAssignmentFieldIsNewOrExistingOne(context) {
debugger;
var formContext = context.getFormContext(); 
var assignmentField = formContext.getAttribute("pg_assignmentid");

if (assignmentField.getValue() != null) {
    var assignmentId = assignmentField.getValue()[0].id;

    Xrm.WebApi.online.retrieveMultipleRecords("pg_externalonboarding", "?$filter=_pg_assignmentid_value eq " + assignmentId).then(
        function success(results) {
            if (results.entities.length > 1) {
              
                formContext.getControl("pg_assignmentid").setNotification("This Assignment ID is already used in another record.", "assignmentIdNotification");
            } else {
              
                formContext.getControl("pg_assignmentid").clearNotification("assignmentIdNotification");
            }
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}
}



function ResolvebtnshowHide(primaryControl) {
debugger;
var formContext = primaryControl;

var Country = formContext.getAttribute("pg_country").getValue();
var type = formContext.getAttribute("pg_type").getValue();
}


function ResolveforEOnboarding(primaryControl) {
debugger;
var formContext = primaryControl;
var confirmStrings = { text: "Confirm to Resolve?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
var confirmOptions = { height: 250, width: 300 };

Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function (success) {
        if (success.confirmed) {
      var status=formContext.getAttribute("statecode").getValue();
          formContext.getAttribute("statecode").setValue(1) 

           formContext.data.entity.save("saveandclose");
          
        }
    },
    function (error) {
       
        console.error(error.message);
    }
);
}


function CHeckFields(context) {
    debugger;
    var formContext = context.getFormContext();
    formContext.data.process.addOnStageChange(CleartoStart);
    CleartoStart(context);
}
function CleartoStart(context) { // onload    
    var formContext = context.getFormContext();
    var hr = formContext.getAttribute("pg_hr").getValue();
    var msdsupport = formContext.getAttribute("pg_msdsupport").getValue();
    var payroll = formContext.getAttribute("pg_payroll").getValue();
    var qmg = formContext.getAttribute("pg_qmg").getValue();
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    if (stageId === "4ecc5bf4-b51c-4566-83c7-c7eca2ffbbe1") {
        formContext.getControl("pg_hr").setVisible(true);
        formContext.getControl("pg_msdsupport").setVisible(true);
        formContext.getControl("pg_payroll").setVisible(true);
        formContext.getControl("pg_qmg").setVisible(true);
        formContext.getAttribute("pg_hr").setValue(true);
        formContext.getAttribute("pg_msdsupport").setValue(true);
        formContext.getAttribute("pg_payroll").setValue(true);
        formContext.getAttribute("pg_qmg").setValue(true);
    }
    else {
        formContext.getControl("pg_hr").setVisible(false);
        formContext.getControl("pg_msdsupport").setVisible(false);
        formContext.getControl("pg_payroll").setVisible(false);
        formContext.getControl("pg_qmg").setVisible(false);
        formContext.getAttribute("pg_hr").setValue(false);
        formContext.getAttribute("pg_msdsupport").setValue(false);
        formContext.getAttribute("pg_payroll").setValue(false);
        formContext.getAttribute("pg_qmg").setValue(false);
    }
    if (hr === true && msdsupport === true && payroll === true && qmg === true) {
        Xrm.Utility.showProgressIndicator("Processing... Please wait for next 10secs.");
        setTimeout(function () {
            Xrm.Utility.closeProgressIndicator();
        }, 10000);
        formContext.data.process.moveNext();
        formContext.getAttribute("statecode").setValue(1);
        // formContext.data.entity.save("saveandclose");
    }
    else {
        formContext.getControl("pg_hr").setVisible(false);
        formContext.getControl("pg_msdsupport").setVisible(false);
        formContext.getControl("pg_payroll").setVisible(false);
        formContext.getControl("pg_qmg").setVisible(false);
    }
}



function loadEmailTemplateTest(executionContext) {
    var formContext = executionContext.getFormContext();
    var pg_clientname = "Hogarth";

    if (!pg_clientname || typeof pg_clientname !== 'string') {
        Xrm.Utility.alertDialog("Client name is empty or not a string.");
        return;
    }

    Xrm.WebApi.online.retrieveMultipleRecords("template", "?$select=subject,body,title&$filter=contains(title, 'Hogarth')").then(
        function success(results) {
            if (results.entities.length > 0) {
                var subject = results.entities[0]["subject"];
                var title = results.entities[0]["title"];
                var eBody = results.entities[0]["body"];
                formContext.getAttribute("description").setValue(subject);
            }
            for (var i = 0; i < results.entities.length; i++) {
                var subject = results.entities[i]["subject"];
                var title = results.entities[i]["title"];
            }
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}



async function loadEmailTemplate(executionContext) {////main fuction used
    var formContext = executionContext.getFormContext();
    var regardingobjectidValue = formContext.getAttribute("regardingobjectid").getValue();

    if (!regardingobjectidValue || regardingobjectidValue.length === 0) {
        Xrm.Utility.alertDialog("Regarding object ID is not specified.");
        return;
    }

    var regardingobjectid = regardingobjectidValue[0].id;

    try {
        const onboardingResults = await Xrm.WebApi.online.retrieveMultipleRecords(
            "pg_externalonboarding",
            `?$select=pg_clientname&$filter=pg_externalonboardingid eq '${regardingobjectid}'`
        );

        if (!onboardingResults || !onboardingResults.entities || onboardingResults.entities.length === 0) {
            Xrm.Utility.alertDialog("No external onboarding records found.");
            return;
        }

        var pg_clientname = onboardingResults.entities[0]["pg_clientname"];

        if (!pg_clientname || typeof pg_clientname !== 'string') {
            Xrm.Utility.alertDialog("Client name is empty or not a string.");
            return;
        }

        const templateResults = await Xrm.WebApi.online.retrieveMultipleRecords(
            "template",
            `?$select=templateid,templateidunique,body,subject&$filter=contains(title, '${pg_clientname}')`
        );

        if (!templateResults || !templateResults.entities || templateResults.entities.length === 0) {
            Xrm.Utility.alertDialog(`No Email template found for ${pg_clientname}`);
            return;
        }

        var template = templateResults.entities[0];
        var templateBody = template["body"];
        var templateSubject = template["subject"];

        if (!templateBody || typeof templateBody !== 'string') {
            Xrm.Utility.alertDialog("Email template body is empty or not a string.");
            return;
        }

        var regex = /<!\[CDATA\[(.*?)]]>/;
        var match = templateSubject.match(regex);

        var plainTextSubject = match && match.length > 1 ? match[1] : "No text extracted";


        formContext.getAttribute("description").setValue(templateBody);
        formContext.getAttribute("subject").setValue(plainTextSubject);
        alert(templateBody);
        // formContext.getAttribute("description").setSubmitMode("never");
        // formContext.data.save();
    } catch (error) {
        Xrm.Utility.alertDialog(`Error: ${error.message}`);
    }
}




function AddTemplate(executionContext) {
    var formContext = executionContext.getFormContext();
    if (!formContext) {
        return;
    }

    var clientNameAttribute = formContext.getAttribute("pg_clientname");
    if (clientNameAttribute && clientNameAttribute.getValue()) {
        var clientName = clientNameAttribute.getValue();

        var filter = `?$select=templateid,templateidunique,body&$filter=contains(title, '${clientName}')`;
        Xrm.WebApi.online.retrieveMultipleRecords("template", filter).then(
            function success(results) {
                if (results.entities.length > 0) {
                    var template = results.entities[0];
                    var templateBody = template["body"];

                } else {
                    Xrm.Utility.alertDialog(`No Email template found for ${clientName}`);
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(`Error retrieving template: ${error.message}`);
            }
        );
    }
}




var Acc = {};
Acc.formEvents = {
    form_load: function (e) {
        var fc = e.getFormContext();
        fc.data.process.addOnPreStageChange(Acc.formEvents.handlePreStage);
    },
    handlePreStage: function (e) {
        debugger;
        // get the event arguments
        var bpfArgs = e.getEventArgs();

           if (bpfArgs.getDirection() === "Previous") 
        {
            bpfArgs.preventDefault();
            var alertStrings = { confirmButtonLabel: "OK", text: "Back stage movement is not allowed", title: "Cannot move back" };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
            return;
        }

    }
}


function EmailNotificationToAudit(context) {
    debugger;
    var formContext = context.getFormContext();
    //var EmailAudit = formContext.getAttribute("pg_emailnotificationtoaudit").getValue();
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    if (stageId === "742174ae-8f05-4e95-b465-b37b6b7fd414") {
        formContext.getControl("header_process_pg_emailnotificationtoaudit").setDisabled(true);
        formContext.getControl("header_process_pg_applicantbackgroundscreeningsuccessful").setDisabled(true);
    }
}

function checkAssignmentFieldIsNewOrExistingOne(context) {
    debugger;
    var formContext = context.getFormContext();
    var assignmentField = formContext.getAttribute("pg_assignmentid");

    if (assignmentField.getValue() != null) {
        var assignmentId = assignmentField.getValue()[0].id;

        Xrm.WebApi.online.retrieveMultipleRecords("pg_externalonboarding", "?$filter=_pg_assignmentid_value eq " + assignmentId).then(
            function success(results) {
                if (results.entities.length > 1) {

                    formContext.getControl("pg_assignmentid").setNotification("This Assignment ID is already used in another record.", "assignmentIdNotification");
                } else {

                    formContext.getControl("pg_assignmentid").clearNotification("assignmentIdNotification");
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}



function ResolvebtnshowHide(primaryControl) {
    debugger;
    var formContext = primaryControl;

    var Country = formContext.getAttribute("pg_country").getValue();
    var type = formContext.getAttribute("pg_type").getValue();
}


function ResolveforEOnboarding(primaryControl) {
    debugger;
    var formContext = primaryControl;
    var confirmStrings = { text: "Confirm to Resolve?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
    var confirmOptions = { height: 250, width: 300 };

    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed) {
                var status = formContext.getAttribute("statecode").getValue();
                formContext.getAttribute("statecode").setValue(1)

                formContext.data.entity.save("saveandclose");

            }
        },
        function (error) {

            console.error(error.message);
        }
    );
}




var ExternalOnboarding;
ExternalOnboarding = {};
ExternalOnboarding.formEvents = {
    form_load: function (context) {
        var formcontext = context.getFormContext();
        formcontext.data.process.addOnPreStageChange(ExternalOnboarding.formEvents.handleStageMovement);
    },
    handleStageMovement: function (context) {
        var bpfArguments = context.getEventArgs();
        var formcontext = context.getFormContext();
        var bpfstage = formcontext.data.process.getActiveStage().getName();

        if (bpfstage == "Clear To Start") {
            var Agreement = formcontext.getAttribute("pg_agreement").getValue();
            var directdepositform = formcontext.getAttribute("pg_directdepositform").getValue();
            var trainingdocuments = formcontext.getAttribute("pg_trainingdocuments").getValue();
            var benefitsdocuments = formcontext.getAttribute("pg_benefitsdocuments").getValue();
            var statelevelmandatorydocuments = formcontext.getAttribute("pg_statelevelmandatorydocuments").getValue();
            var clienttrainingdocuments = formcontext.getAttribute("pg_clienttrainingdocuments").getValue();
            var codeofconduct = formcontext.getAttribute("pg_codeofconduct").getValue();
            var federaltaxform = formcontext.getAttribute("pg_federaltaxform").getValue();
            var statetax = formcontext.getAttribute("pg_statetaxform").getValue();
            var bgccheck = formcontext.getAttribute("pg_bgccheck").getValue();

            var formi9section1 = formcontext.getAttribute("pg_formi9section1").getValue();
            var formi9section2 = formcontext.getAttribute("pg_formi9section2").getValue();
            var everify = formcontext.getAttribute("pg_everify").getValue();
            var Agreementkickoff = formcontext.getAttribute("pg_agreementkickoff").getValue();
            var directdepositformkickoff = formcontext.getAttribute("pg_directdepositformkickoff").getValue();
            var statetaxformkickoff = formcontext.getAttribute("pg_statetaxformkickoff").getValue();
            var statelevelmandatorydocumentskickoff = formcontext.getAttribute("pg_statelevelmandatorydocumentskickoff").getValue();
            var clienttrainingdocumentskickoff = formcontext.getAttribute("pg_clienttrainingdocumentskickoff").getValue();
            var codeofconductkickoff = formcontext.getAttribute("pg_codeofconductkickoff").getValue();
            var benefitsdocumentskickoff = formcontext.getAttribute("pg_benefitsdocumentskickoff").getValue();
            var federaltaxformkickoff = formcontext.getAttribute("pg_federaltaxformkickoff").getValue();
            var trainingdocumentskickoff = formcontext.getAttribute("pg_trainingdocumentskickoff").getValue();
            var bgccheckkickoff = formcontext.getAttribute("pg_bgccheckkickoff").getValue();

            var formi9section1kickoff = formcontext.getAttribute("pg_formi9section1kickoff").getValue();
            var formi9section2kickoff = formcontext.getAttribute("pg_formi9section2kickoff").getValue();
            var everifykickoff = formcontext.getAttribute("pg_everifykickoff").getValue();
            if ((bpfArguments.getDirection() === "Next") && (Agreement === 140310001 || directdepositform === 140310001 || trainingdocuments === 140310001 || benefitsdocuments === 140310001 || statelevelmandatorydocuments === 140310001 || clienttrainingdocuments === 140310001 || codeofconduct === 140310001 || federaltaxform === 140310001 || statetax === 140310001 || bgccheck === 140310001 || formi9section1 === 14031002 || formi9section2 === 140310002 || everify === 140310002 || bpfArguments.getDirection() === "Next") && (Agreementkickoff === 140310001 || directdepositformkickoff === 140310001 || statetaxformkickoff === 140310001 || statelevelmandatorydocumentskickoff === 140310001 || clienttrainingdocumentskickoff === 140310001 || trainingdocumentskickoff === 140310001 || codeofconductkickoff === 140310001 || benefitsdocumentskickoff === 140310001 || federaltaxformkickoff === 140310001 || bgccheckkickoff === 140310001 || formi9section1kickoff === 14031002 || formi9section2kickoff === 140310002 || everifykickoff === 140310002)) {
                bpfArguments.preventDefault();
                var alertStrings = { confirmButtonLabel: "OK", text: "Please check all fields fully and accurately, to proceed to the next stage.", title: "Cannot Move to Next Stage" };
                var alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;
            }
        }
    }
}





function DropoutforTeamsSHide(primaryControl) {
    var formContext = primaryControl;
    var formType = formContext.ui.getFormType();

    var status = formContext.getAttribute("statuscode").getValue();
    var loggedinUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "");
    var ownerid = formContext.getAttribute("ownerid").getValue()[0].id.replace("{", "").replace("}", "");
    if (formType !== 1 && status == 1) {
        return Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress")
            .then(function success(result1) {
                var internalemailaddress2 = result1["internalemailaddress"];
                var teamId = "2aab34b8-d91c-ef11-840b-002248231990";
                return Xrm.WebApi.online.retrieveRecord("team", teamId, "?$expand=teammembership_association($select=internalemailaddress)")
                    .then(function success(result2) {
                        var teamMembers = result2.teammembership_association;

                        var isTeamMember = teamMembers.some(function (member) {
                            return member.internalemailaddress === internalemailaddress2 || ownerid === loggedinUserId;
                        });

                        return isTeamMember;
                    },
                        function (error) {

                            return false;
                        });
            },
                function (error) {

                    return false;
                });
    }

    return false;
}

function DropoutbtnforExternalOnboarding(context) {
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "crc22_dropoutbtnforexternalonboarding_ffa80",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).
        then(function () {
            context.data.refresh();
            context.data.entity.save("saveandclose");
        })
        .catch(console.error);
}




function BPFStageChange(context) {
    debugger;
    var formContext = context.getFormContext();
    formContext.data.process.addOnStageChange(TabChangesonBPFStage);
    TabChangesonBPFStage(context);
}

function TabChangesonBPFStage(context) {
    var formContext = context.getFormContext();
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();

    if (stageId === "7a7ecca3-b092-40f7-9080-a7afc403b101") {
        formContext.ui.tabs.get("tab_1").setFocus();
        formContext.getAttribute("pg_currentstageid").setValue("7a7ecca3-b092-40f7-9080-a7afc403b101");
    } else if (stageId === "fa593490-c472-4cf7-8e2f-aef7802c94ee") {
        formContext.ui.tabs.get("tab_3").setFocus();
        formContext.getAttribute("pg_currentstageid").setValue("fa593490-c472-4cf7-8e2f-aef7802c94ee");
    } else if (stageId === "231122ee-faab-4d13-8eec-d76e28841b90") {
        formContext.ui.tabs.get("tab_2").setFocus();
        formContext.getAttribute("pg_currentstageid").setValue("231122ee-faab-4d13-8eec-d76e28841b90");
    } else if (stageId === "4e58bfc6-0134-401e-9089-13a5688bbd45") {
        formContext.getAttribute("pg_currentstageid").setValue("4e58bfc6-0134-401e-9089-13a5688bbd45");
    } else if (stageId === "53770409-3abf-4b3a-9a6c-309b9fa32843") {
        formContext.getAttribute("pg_currentstageid").setValue("53770409-3abf-4b3a-9a6c-309b9fa32843");
    } else if (stageId === "7cb40efb-b66a-4b65-acdb-47f2cb6210b2") {
        formContext.getAttribute("pg_currentstageid").setValue("7cb40efb-b66a-4b65-acdb-47f2cb6210b2");
    } else if (stageId === "6518b44d-a15b-427e-9f07-716d50366f15") {//startdateconfirmed
        formContext.getAttribute("pg_currentstage").setValue(140310007);
        formContext.getAttribute("pg_currentstageid").setValue("6518b44d-a15b-427e-9f07-716d50366f15");
    } else if (stageId === "aebb0b18-1ebe-4873-bb4b-756be732888c") {
        formContext.getAttribute("pg_currentstageid").setValue("aebb0b18-1ebe-4873-bb4b-756be732888c");
    } else if (stageId === "742174ae-8f05-4e95-b465-b37b6b7fd414") {//internal audit
        formContext.getAttribute("pg_currentstage").setValue(140310005);
        formContext.getAttribute("pg_currentstageid").setValue("742174ae-8f05-4e95-b465-b37b6b7fd414");
    } else if (stageId === "4ecc5bf4-b51c-4566-83c7-c7eca2ffbbe1") {//clear to start
        formContext.getAttribute("pg_currentstage").setValue(140310006);
        formContext.getAttribute("pg_currentstageid").setValue("4ecc5bf4-b51c-4566-83c7-c7eca2ffbbe1");
    }
}

function exOnboardingOnLoad(executionContext) {
    var formContext = executionContext.getFormContext();
    var activeStage = formContext.data.process.getActiveStage();
    DisableFieldsOnStages();
    formContext.data.process.addOnStageChange(DisableFieldsOnStages);

}

function DisableFieldsOnStages() {
    var activeStage = Xrm.Page.data.process.getActiveStage();
    var selectedStage = Xrm.Page.data.process.getSelectedStage().getId();
    var activeProcess = Xrm.Page.data.process.getActiveProcess();
    var allStages = activeProcess.getStages();
    allStages.forEach(function (stage, stageIndex) {
        var stepsCollection = stage.getSteps();
        if (stage._activeStageId !== stage._stageStep.id) {
            stepsCollection.forEach(function (step, stepIndex) {
                var attributeName = step.getAttribute();
                if (attributeName !== "" || attributeName !== null) {
                    Xrm.Page.getControl("header_process_" + attributeName).setDisabled(true);
                }
            });
        } else {
            stepsCollection.forEach(function (step, stepIndex) {
                var attributeName = step.getAttribute();
                if (attributeName !== "" || attributeName !== null) {
                    Xrm.Page.getControl("header_process_" + attributeName).setDisabled(false);
                }
            });
        }
    });
}

function DropoutforTeamsSHide(primaryControl) {
    var formContext = primaryControl;
var formType = formContext.ui.getFormType();
    var type = formContext.getAttribute("pg_type").getValue();
    var status = formContext.getAttribute("statuscode").getValue();
    var loggedinUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "");
  var ownerid = formContext.getAttribute("ownerid").getValue()[0].id.replace("{", "").replace("}", "");
    if (formType !==1 && status == 1) {
        return Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress")
            .then(function success(result1) {
                var internalemailaddress2 = result1["internalemailaddress"];
                var teamId = "2aab34b8-d91c-ef11-840b-002248231990";              
                return Xrm.WebApi.online.retrieveRecord("team", teamId, "?$expand=teammembership_association($select=internalemailaddress)")
                    .then(function success(result2) {
                        var teamMembers = result2.teammembership_association;

                        var isTeamMember = teamMembers.some(function (member) {
                            return member.internalemailaddress === internalemailaddress2 || ownerid === loggedinUserId;
                        });

                        return isTeamMember;
                    },
                    function (error) {
                     
                        return false; 
                    });
            },
            function (error) {
              
                return false;
            });
    }

    return false; 
}

function DropoutbtnforExternalOnboarding(context) {
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "crc22_dropoutbtnforexternalonboarding_ffa80",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).then(console.log).catch(console.error);
}




 function BPFStageChange(context) {
        debugger;
        var formContext = context.getFormContext();
        formContext.data.process.addOnStageChange(TabChangesonBPFStage);
        TabChangesonBPFStage(context);
    }

    function TabChangesonBPFStage(context) {
        formContext = context.getFormContext();
        var activeStage = formContext.data.process.getActiveStage();
        var stageId = activeStage.getId();
    
            if (stageId === "7a7ecca3-b092-40f7-9080-a7afc403b101"){
              formContext.ui.tabs.get("tab_1").setFocus()
            }
    
            else if (stageId === "fa593490-c472-4cf7-8e2f-aef7802c94ee"){
                formContext.ui.tabs.get("tab_3").setFocus()
                }
    
                else if (stageId === "231122ee-faab-4d13-8eec-d76e28841b90"){
                    formContext.ui.tabs.get("tab_2").setFocus()
                }
         }


function exOnboardingOnLoad(executionContext) {
    var formContext = executionContext.getFormContext();
    var activeStage = formContext.data.process.getActiveStage();
    DisableFieldsOnStages();
    formContext.data.process.addOnStageChange(DisableFieldsOnStages);

}

function DisableFieldsOnStages() {
    var activeStage = Xrm.Page.data.process.getActiveStage();
    var selectedStage = Xrm.Page.data.process.getSelectedStage().getId();
    var activeProcess = Xrm.Page.data.process.getActiveProcess();
    var allStages = activeProcess.getStages();
    allStages.forEach(function (stage, stageIndex) {
        var stepsCollection = stage.getSteps();
        if (stage._activeStageId !== stage._stageStep.id) {
            stepsCollection.forEach(function (step, stepIndex) {
                var attributeName = step.getAttribute();
                if (attributeName !== "" || attributeName !== null) {
                    Xrm.Page.getControl("header_process_" + attributeName).setDisabled(true);
                }
            });
        } else {
            stepsCollection.forEach(function (step, stepIndex) {
                var attributeName = step.getAttribute();
                if (attributeName !== "" || attributeName !== null) {
                    Xrm.Page.getControl("header_process_" + attributeName).setDisabled(false);
                }
            });
        }
    });
}


function StarttoConfirm(context) {
    "use strict";
    var formContext = context.getFormContext();
    formContext.data.process.addOnStageChange(OnStartToConfirmStage);
    OnStartToConfirmStage(context);
}

function OnStartToConfirmStage(context) { // onload    
    var formContext = context.getFormContext();
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();

    if (stageId === "6518b44d-a15b-427e-9f07-716d50366f15") {

formContext.ui.process.setVisible(false);
     var pageInput = {
            pageType: "webresource",
            webresourceName: "pg_OnboardingComplete"
        };
        var navigationOptions = {
            target: 2,
            width: 500, // value specified in pixel
            height: 400, // value specified in pixel
            position: 1
        };
        Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
            function success() {
                    // Run code on success
formContext.ui.close();
            },
            function error() {
                    // Handle errors
            }
        );
        /*
        var alertStrings = { confirmButtonLabel: "OK", text: "Onboarding Completed", title: "Onboarding Status" };
        var alertOptions = { height: 200, width: 300 };

        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
            function (success) {
                var formContext = context.getFormContext();
                formContext.ui.close();
                if (success.confirmed) {
                    formContext.ui.close();
                }
            }
        );
        */
    }else {
        formContext.ui.process.setVisible(true);
    }
}


function StarttoConfirm(context) {
    "use strict";
    var formContext = context.getFormContext();
    formContext.data.process.addOnStageChange(OnStartToConfirmStage);
    OnStartToConfirmStage(context);
}

function OnStartToConfirmStage(context) { // onload    
    var formContext = context.getFormContext();
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();

    if (stageId === "6518b44d-a15b-427e-9f07-716d50366f15") {
        var alertStrings = { confirmButtonLabel: "OK", text: "Onboarding Completed", title: "Onboarding Status" };
        var alertOptions = { height: 200, width: 300 };

        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
            function (success) {
                var formContext = context.getFormContext();
                formContext.ui.close();
                if (success.confirmed) {
                    formContext.ui.close();
                }
            }
        );
    }
}

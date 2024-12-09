function validateMobileNumber(executionContext) {
    
    var formContext = executionContext.getFormContext();
    var mobileNumber = formContext.getAttribute("pg_mobilenumber").getValue();
    var mobileNumberPattern = /^\d{10}$/;

if (!mobileNumberPattern.test(mobileNumber)) {
        
        Xrm.Navigation.openAlertDialog({
            text: "Please enter a valid 10-digit mobile number."
        });

formContext.getAttribute("pg_mobilenumber").setValue(null);

 executionContext.getEventArgs().preventDefault();
    }
}
    

function QMGFIELDCHECK(context) {
      var formcontext = context.getFormContext();
      var country = formcontext.getAttribute("pg_country").getValue();
      var activeStage = formcontext.data.process.getActiveStage();
      var stageId = activeStage.getId();
      if (stageId === "4da369a2-7910-4f16-8cee-0bcfd281685d" && country === 140310000) {
        var A,B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q,R;
    
     var A = formcontext.getAttribute("pg_identifycandidate").getValue();
       var B = formcontext.getAttribute("pg_sendofferletterrequesttohr").getValue();
       var C = formcontext.getAttribute("pg_draftandsendofferletterrequesttodojohead").getValue();
       var D = formcontext.getAttribute("pg_sendofferlettertocandidate").getValue();
     var E= formcontext.getAttribute("pg_offerletteracceptance").getValue();
       var F = formcontext.getAttribute("pg_sendemploymentagreementrequesttolegal").getValue();
       var G = formcontext.getAttribute("pg_sendeatocandidate").getValue();
       var H = formcontext.getAttribute("pg_initiatebgchecks").getValue();
     var I = formcontext.getAttribute("pg_sendobpackagetocandidate").getValue();
       var J = formcontext.getAttribute("pg_sendeatoleoforcountersignature").getValue();
       var K = formcontext.getAttribute("pg_bgcclearance").getValue();
       var L= formcontext.getAttribute("pg_sendeatocandidatepostcountersignaturefrom").getValue();
     var M = formcontext.getAttribute("pg_senditaccessformlinktoreportingmanager").getValue();
       var N = formcontext.getAttribute("pg_senditaccessdetailstoitteam").getValue();
       var O = formcontext.getAttribute("pg_sendcoupleoftemplatedemailswelcomingcandi").getValue();
       var P = formcontext.getAttribute("pg_datamanagementdataisenteredinlaunchandm").getValue();
       var Q = formcontext.getAttribute("pg_paperworkauditedandsharedtoqmgpayroll").getValue();
       var R = formcontext.getAttribute("pg_paperworkuploadedinsharepoint").getValue();
    
         if (A!===140310001 || B!===140310001 || C!===140310001 || D!===140310001 || E!===140310001 || F!===140310001 || G!===140310001 || H!===140310001 || I!===140310001 || J!===140310001 || K!===140310001 || L!===140310001 || M!===140310001 || N!===140310001 || O!===140310001 || P!===140310001 || Q!===140310001 || R!===140310001){
         alertStrings = { confirmButtonLabel: "OK", text: "Please complete HR Checklist.", title: "Cannot Move to Next Stage" };
                    alertOptions = { height: 200, width: 300 };
                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                    return;
    
                }
              }
            }

















function onclickresolvemovestage(primaryControl) {
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId();
    var confirmStrings = {
        text: "Confirm?",
        confirmButtonLabel: "OK",
        cancelButtonLabel: "Cancel"
    };

    var confirmOptions = {
        height: 200,
        width: 500
    };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
        if (success.confirmed) {
            formContext.data.process.moveNext();
   //formContext.data.entity.save();
                       // formContext.ui.close();
//formContext.data.entity.save("saveandclose");
        } else {
          
        }
    });
}


















function usdojovalues(context) {
    var formcontext = context.getFormContext();
    var dojo = formcontext.getControl("pg_dojo");
        var country = formcontext.getAttribute("pg_country").getValue();
    if (country === 140310000) {
        dojo.removeOption(140310006);
        dojo.removeOption(140310002);
        dojo.removeOption(140310007);
        dojo.removeOption(140310008);
 dojo.removeOption(140310010);
    }
 else if (country === 140310001) {
        dojo.addOption({ text: 'Search & Engage', value: 140310006 });
        dojo.addOption({ text: 'Pride India', value: 140310002 });
        dojo.addOption({ text: 'Russell Tobin India', value: 140310007 });
        dojo.addOption({ text: 'Pride Innovations', value: 140310008 });
 dojo.addOption({ text: 'Pride Advisory', value: 140310010 });
    }
}




function GetUserTeams(context) {
  var formContext = context.getFormContext();
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentuserid = userSettings.userId;
    var username = userSettings.userName;
    var type = formContext.getAttribute("pg_type").getValue();
    var country = formContext.getAttribute("pg_country").getValue();
    var status = formContext.getAttribute("statuscode").getValue();
 
    var loggedinUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "");
    var createform = 1;
    var Type = formContext.ui.getFormType();
    if (Type != createform) {
  var owner = formContext.getAttribute("ownerid").getValue();
 var ownerName = owner[0].name; 
        if (type === 140310000 && country === 140310000 && status === 1) {///type === 140310001 changed to 140310000
            Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress").then(
                function success(result1) {
                    var internalemailaddress2 = result1["internalemailaddress"];

                    var req = new XMLHttpRequest();
                    var teamId = "a725bcb1-4556-ee11-be6f-000d3a5755d3";

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
                                var users = [];

                                for (var i = 0; i < response.value.length; i++) {
                                    var internalemailaddress = response.value[i]["internalemailaddress"];
                                    users.push(internalemailaddress);
                                }
 if (internalemailaddress2 !=== internalemailaddress && username !===ownerName) {
                            
                                    formContext.getControl("pg_firstname").setDisabled(true);
        formContext.getControl("pg_lastname").setDisabled(true);          
            formContext.getControl("pg_hiringmanagername").setDisabled(true);
            formContext.getControl("pg_reportingmanagername").setDisabled(true);
            formContext.getControl("pg_dojo1").setDisabled(true);
            formContext.getControl("pg_jobtitle").setDisabled(true);
            formContext.getControl("pg_linkedinprofile").setDisabled(true);
            formContext.getControl("pg_emailid").setDisabled(true);
            formContext.getControl("pg_startday").setDisabled(true);
            formContext.getControl("pg_ratetype").setDisabled(true);
            formContext.getControl("pg_salary").setDisabled(true);
            formContext.getControl("pg_prideinbalance").setDisabled(true);
            formContext.getControl("pg_worklocationcityandstate").setDisabled(true);
            formContext.getControl("pg_worklocationstate").setDisabled(true);
            formContext.getControl("pg_candidatesaddressaddressline1").setDisabled(true);
            formContext.getControl("pg_candidatesaddressaddressline2").setDisabled(true);
            formContext.getControl("pg_candidatesaddresscityname").setDisabled(true);
            formContext.getControl("pg_candidateaddressstate").setDisabled(true);
            formContext.getControl("pg_candidatesaddresszipcode").setDisabled(true);
            formContext.getControl("pg_gender").setDisabled(true);
            formContext.getControl("pg_launchreq").setDisabled(true);
            formContext.getControl("pg_department").setDisabled(true);
            formContext.getControl("pg_isthisacandidateareferral").setDisabled(true);
 formContext.getControl("pg_additionalcomments").setDisabled(true);
                                }
else{
              formContext.getControl("pg_firstname").setDisabled(false);
        formContext.getControl("pg_lastname").setDisabled(false);          
            formContext.getControl("pg_hiringmanagername").setDisabled(false);
            formContext.getControl("pg_reportingmanagername").setDisabled(false);
            formContext.getControl("pg_dojo1").setDisabled(false);
            formContext.getControl("pg_jobtitle").setDisabled(false);
            formContext.getControl("pg_linkedinprofile").setDisabled(false);
            formContext.getControl("pg_emailid").setDisabled(false);
            formContext.getControl("pg_startday").setDisabled(false);
            formContext.getControl("pg_ratetype").setDisabled(false);
            formContext.getControl("pg_salary").setDisabled(false);
            formContext.getControl("pg_prideinbalance").setDisabled(false);
            formContext.getControl("pg_worklocationcityandstate").setDisabled(false);
            formContext.getControl("pg_worklocationstate").setDisabled(false);
            formContext.getControl("pg_candidatesaddressaddressline1").setDisabled(false);
            formContext.getControl("pg_candidatesaddressaddressline2").setDisabled(false);
            formContext.getControl("pg_candidatesaddresscityname").setDisabled(false);
            formContext.getControl("pg_candidateaddressstate").setDisabled(false);
            formContext.getControl("pg_candidatesaddresszipcode").setDisabled(false);
            formContext.getControl("pg_gender").setDisabled(false);
            formContext.getControl("pg_launchreq").setDisabled(false);
            formContext.getControl("pg_department").setDisabled(false);
            formContext.getControl("pg_isthisacandidateareferral").setDisabled(false);
 formContext.getControl("pg_additionalcomments").setDisabled(false);
}
                                console.log(users);
                            } else {

                            }
                        }
                    };

                    req.send();
                }

            )
        }
    }
}







function indiasetdisable(executionContext) {
    var formContext = executionContext.getFormContext();
    var createform = 1;
    var Type = formContext.ui.getFormType();
var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentuserid = userSettings.userId;
    var username = userSettings.userName;
    var country = formContext.getAttribute("pg_country").getValue();
    var activeStage = formContext.data.process.getActiveStage();
    var type = formContext.getAttribute("pg_type").getValue();
    var stageId = activeStage.getId();
    if (Type != createform) {
  var owner = formContext.getAttribute("ownerid").getValue();
 var ownerName = owner[0].name; 
        if (username !===ownerName && country===140310001) {
            formContext.getControl("pg_firstname").setDisabled(true);
            formContext.getControl("pg_middlename").setDisabled(true);
            formContext.getControl("pg_lastname").setDisabled(true);
            formContext.getControl("pg_hiringmanagername").setDisabled(true);
            formContext.getControl("pg_reportingmanagername").setDisabled(true);
            formContext.getControl("pg_onboardingtype").setDisabled(true);
            formContext.getControl("pg_employer").setDisabled(true);
            formContext.getControl("pg_division").setDisabled(true);
            formContext.getControl("pg_dojo1").setDisabled(true);
            formContext.getControl("pg_designationjobtitle").setDisabled(true);
            formContext.getControl("pg_department").setDisabled(true);
            formContext.getControl("pg_diversehire1").setDisabled(true);
            formContext.getControl("pg_diversitytype1").setDisabled(true);
            formContext.getControl("pg_diversecategory1").setDisabled(true);
            formContext.getControl("pg_diversecategory_lgbtqia1").setDisabled(true);
            formContext.getControl("pg_process").setDisabled(true);
            formContext.getControl("pg_shifttimings").setDisabled(true);
            formContext.getControl("pg_workmode").setDisabled(true);
            formContext.getControl("pg_teamname").setDisabled(true);
            formContext.getControl("pg_assetcoordinationaddress").setDisabled(true);
            formContext.getControl("pg_worklocation").setDisabled(true);
            formContext.getControl("pg_tentativedoj").setDisabled(true);
            formContext.getControl("pg_prestartbgvstatus").setDisabled(true);
            formContext.getControl("pg_adminstrativemanagername").setDisabled(true);
        }
        else {
            formContext.getControl("pg_firstname").setDisabled(false);
            formContext.getControl("pg_middlename").setDisabled(false);
            formContext.getControl("pg_lastname").setDisabled(false);
            formContext.getControl("pg_hiringmanagername").setDisabled(false);
            formContext.getControl("pg_reportingmanagername").setDisabled(false);
            formContext.getControl("pg_onboardingtype").setDisabled(false);
            formContext.getControl("pg_employer").setDisabled(false);
            formContext.getControl("pg_division").setDisabled(false);
            formContext.getControl("pg_dojo1").setDisabled(false);
            formContext.getControl("pg_designationjobtitle").setDisabled(false);
            formContext.getControl("pg_department").setDisabled(false);
            formContext.getControl("pg_diversehire1").setDisabled(false);
            formContext.getControl("pg_diversitytype1").setDisabled(false);
            formContext.getControl("pg_diversecategory1").setDisabled(false);
            formContext.getControl("pg_diversecategory_lgbtqia1").setDisabled(false);
            formContext.getControl("pg_process").setDisabled(false);
            formContext.getControl("pg_shifttimings").setDisabled(false);
            formContext.getControl("pg_workmode").setDisabled(false);
            formContext.getControl("pg_teamname").setDisabled(false);
            formContext.getControl("pg_assetcoordinationaddress").setDisabled(false);
            formContext.getControl("pg_worklocation").setDisabled(false);
            formContext.getControl("pg_tentativedoj").setDisabled(false);
            formContext.getControl("pg_prestartbgvstatus").setDisabled(false);
            formContext.getControl("pg_adminstrativemanagername").setDisabled(false);

        }

    }
if(country === 140310000 && type !=== 140310000){
//alert("Child ticket should be closed before moving to the next stage");
}
}




function Regenerateofferletter(primaryControl) {  //main form
    debugger;
    var formContext = primaryControl;
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var type = formContext.getAttribute("pg_type").getValue();
    if (stageId === "5b1a3c2d-a34b-4f8a-aadf-a0af017d93ef" && type === 140310000) {////intial stage
        return true;
    }
    else {
        return false;
    }
}


function offerletter(primaryControl) {  //main form
    debugger;
    var formContext = primaryControl;
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var type = formContext.getAttribute("pg_type").getValue();
    if (stageId === "f91895dc-eb9c-4398-8b78-b596b266aa63" && type === 140310000) {////intial stage
        return true;
    }
    else {
        return false;
    }
}



function formatWholeNumberField(executionContext) {
    var formContext = executionContext.getFormContext();
    var wholeNumberField = formContext.getAttribute("pg_launchreq").getValue();
    
    if (wholeNumberField !=== null && wholeNumberField !=== undefined) {
    
        var formattedValue = wholeNumberField.replace(/\D/g, "");
        formContext.getAttribute("pg_launchreq").setValue(formattedValue);
    }
}




function EATOMOVE(executionContext) {
  //Initiated Form Context.
  var formContext = executionContext.getFormContext();
  var createform = 1;
  var Type = formContext.ui.getFormType();
 var country = formContext.getAttribute("pg_country").getValue();
 var childcount = formContext.getAttribute("pg_childtickets").getValue();
  var status = formContext.getAttribute("statuscode").getSelectedOption().value;
   var currentstage = formContext.getAttribute("pg_currentstage").getValue();
   var a = formContext.getAttribute("pg_checkallotherchildticketsare1oocomplete").getValue();
   var b = formContext.getAttribute("pg_msdemployeerecordcreation").getValue();
   var c = formContext.getAttribute("pg_assetagreementcollectedfiled").getValue();
   var d = formContext.getAttribute("pg_day1orientationcompleted").getValue();
   var e = formContext.getAttribute("pg_poststartbgvinitiation").getValue();
   var f = formContext.getAttribute("pg_finalbgvreportcollectedcleared").getValue();
  var g = formContext.getAttribute("pg_onboardingpaperworkcollectedfiled").getValue();
   var h = formContext.getAttribute("pg_issueappointmentletter").getValue();
      var activeStage = formContext.data.process.getActiveStage();
      var stageId = activeStage.getId();
  if (Type !=== createform) {
    if (Type !=== createform) {
        if (stageId === "434713b1-7d96-43df-b36c-d325daef06d7") {
            formContext.data.process.moveNext();
        } else if (stageId === "4da369a2-7910-4f16-8cee-0bcfd281685d" && country === 140310000) { //qmg us
            formContext.data.process.moveNext();
        } else if (stageId === "2c0e0542-b81d-4b20-83bd-370196b8adaf") {
            formContext.data.process.moveNext();
        } else if ((stageId === "601fe287-7df7-4244-b549-ca01134f5382" && country === 140310001 && childcount === 0) &&
            (a === true && b === true && c === true && d === true && e === true && f === true && g === true && h === true)) { ///////////hr  for india 

            formContext.data.process.moveNext();
        } else if (stageId === "4eb007b7-4aa0-457f-aeed-1bd56af15c12") {
            formContext.data.process.moveNext();
        } else if (stageId === "ec153282-5f82-44cb-8cdb-29af81a84186" && country === 140310000) {
            formContext.data.process.moveNext();
        } else if (stageId === "4345ff6c-1b88-4999-851d-4fe4fba6f496" && country === 140310000) {
            formContext.data.process.moveNext();
        } else if (stageId === "4442fe1c-fc11-49b2-a0f5-6431a01ab238") {
            formContext.data.process.moveNext();
        } else if (stageId === "1b929018-05de-45be-9abf-87c69466d2bb") {
            formContext.data.process.moveNext();
        } else if (stageId === "24598d06-6c0b-44a7-9d73-9ffe2f064628") {
            formContext.data.process.moveNext();
        } else if (stageId === "af634a5d-e6e2-4b47-8f20-b3d71f2708b7") {
            formContext.data.process.moveNext();
        } else if (stageId === "3ebeb3bb-a2cb-40be-8679-f3b70c945661") {
            formContext.data.process.moveNext();
        } else if (stageId === "e2862d9f-c4fa-4d26-b615-f64141604f04") {
            formContext.data.process.moveNext();
        } else if (stageId === "ae651664-9d2b-4357-9697-770241c65e23") {
            formContext.data.process.moveNext();
        }
      
    }
}
}




function compareusers(context) {

    formContext = context.getFormContext();
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentuserid = userSettings.userId;
    var username = userSettings.userName;
    var type = formContext.getAttribute("pg_type").getValue();
    var country = formContext.getAttribute("pg_country").getValue();
    var loggedinUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "");
    var createform = 1;
    var Type = formContext.ui.getFormType();
  var status = formContext.getAttribute("statuscode").getValue();
    if (Type !=== createform) {

        if (type === 140310000 && country === 140310000 && status === 1) {///type === 140310001 changed to 140310000

            var Reportingmanager = formContext.getAttribute("pg_reportingmanagername").getValue()[0].id;
            Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress").then(
                function success(result1) {
                    var internalemailaddress2 = result1["internalemailaddress"];

                    Xrm.WebApi.online.retrieveRecord("pg_prideemployee", Reportingmanager, "?$select=pg_prideemployeeid,pg_name,_ownerid_value").then(
                        function success(result) {
                            console.log(result);
                            // Columns
                            var pg_prideemployeeid = result["pg_prideemployeeid"]; // Guid
                            var pg_name = result["pg_name"]; // Text
                            var ownerid = result["_ownerid_value"]; // Owner
                            var ownerid_formatted = result["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
                            var ownerid_lookuplogicalname = result["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                            Xrm.WebApi.online.retrieveMultipleRecords("systemuser", "?$filter=systemuserid eq " + ownerid + "&$top=1").then(
                                function success(results) {
                                    //console.log(results);
                                    for (var i = 0; i < results.entities.length; i++) {
                                        var result3 = results.entities[i];
                                        var email = result3["internalemailaddress"];
                                        if (internalemailaddress2 === email) {
                                            //Using SetVisible propertly for locking field Account Address.
                                           // formContext.getControl("pg_candidatesfulllegalname").setDisabled(false);
                                            formContext.getControl("pg_dojo").setDisabled(false);
                                            formContext.getControl("pg_pridenowdepartment").setDisabled(false);
                                            formContext.getControl("pg_pleasespecifythedepartmentsubdeptjobfamil").setDisabled(false);
                                            formContext.getControl("pg_youneedlaunchatssetupfortheemployee").setDisabled(false);
                                            formContext.getControl("pg_pleaseprovidetheteamsinatsyouwanttoaddth").setDisabled(false);
                                            formContext.getControl("pg_ifjobboardaccessisrequiredlisthere").setDisabled(false);
                                            formContext.getControl("pg_listtheteamschannelsthatyouwanttheemploye").setDisabled(false);
                                            formContext.getControl("pg_listtheemaildistributionlistsmailboxyouwa").setDisabled(false);
                                        }
                                        else {
                                         //   formContext.getControl("pg_candidatesfulllegalname").setDisabled(true);
                                            formContext.getControl("pg_dojo").setDisabled(true);
                                           // formContext.getControl("pg_candidatesfulllegalname").setDisabled(true);
                                            formContext.getControl("pg_dojo").setDisabled(true);
                                            formContext.getControl("pg_youneedlaunchatssetupfortheemployee").setDisabled(true);
                                            formContext.getControl("pg_pridenowdepartment").setDisabled(true);
                                            formContext.getControl("pg_pleasespecifythedepartmentsubdeptjobfamil").setDisabled(true);
                                            formContext.getControl("pg_youneedlaunchatssetupfortheemployee").setDisabled(true);
                                            formContext.getControl("pg_pleaseprovidetheteamsinatsyouwanttoaddth").setDisabled(true);
                                            formContext.getControl("pg_ifjobboardaccessisrequiredlisthere").setDisabled(true);
                                            formContext.getControl("pg_listtheteamschannelsthatyouwanttheemploye").setDisabled(true);
                                            formContext.getControl("pg_listtheemaildistributionlistsmailboxyouwa").setDisabled(true);
                                        }
                                    }
                                },
                                function (error) {
                                    console.log(error.message);
                                }
                            );
                        },
                        function (error) {
                            console.log(error.message);
                        }
                    );
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        }
    }
}





function processtonextstage(primaryControl) {
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId();
   var confirmStrings = {
        text: "Please review all information for completeness prior to submission as this data will be used by the support departments to enable the onboarding setup for your candidate. Do you want to proceed?",
        confirmButtonLabel: "Yes",
        cancelButtonLabel: "No"
    };

    var confirmOptions = {
        height: 200,
        width: 500
    };

    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
        if (success.confirmed) {
            formContext.data.process.moveNext();
   formContext.ui.close();
        //    formContext.data.entity.save("saveandclose");
        } else {
          
        }
    });
}




function processtonextstageSandH(primaryControl) {  //main form
    debugger;
    var formContext = primaryControl;
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var type = formContext.getAttribute("pg_type").getValue();
    var statuscode = formContext.getAttribute("statuscode").getValue();
    if (stageId === "c08c6d0c-59f5-4286-aeb0-56c8446e7983" && type === 140310000 && statuscode === 1 || stageId === "98d720f3-2395-4920-9994-43e245ea7bc6" && type === 140310000 && statuscode === 1) {////initial stage
        return true;
    }
    else {
        return false;
    }
}




function resolveifok(primaryControl) {   //mainform
    debugger;
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId();
    var confirmStrings = { text: "Confirm to Resolve?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
    var confirmOptions = { height: 250, width: 300 };
Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function (success) {
        if (success.confirmed) {
            debugger;

            var workflowId = "452d6d63-3377-4634-8607-9daf233e95a9";

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

function statusupdate(formContext) {
    var statusreason = formContext.getAttribute("statuscode").getValue();
    if (statusreason === 1 || statusreason === 140310000) {
        formContext.getAttribute("statecode").setValue(2);
        formContext.getAttribute("statuscode").setValue(140310005);
    } else if (statusreason === 140310001 || statusreason === 140310004) {
        formContext.getAttribute("statecode").setValue(2);
        formContext.getAttribute("statuscode").setValue(140310002);
    }
}



function onboardingowner(context) {
    debugger;
    try {
        formContext = context.getFormContext();
        var userSettings = Xrm.Utility.getGlobalContext().userSettings;
        //var currentuserid = userSettings.userId;
        var username = userSettings.userName;
        var ownerid = formContext.getAttribute("ownerid").getValue();
        var dropoutintiated = formContext.getAttribute("pg_dropoutintiated").getValue();
        if (username === ownerid && dropoutintiated === 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (ex) {
    }
}








function Resolvebutton(primaryControl) {  //main form
    debugger;
    var formContext = primaryControl;
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var type = formContext.getAttribute("pg_type").getValue();
   var country = formContext.getAttribute("pg_country").getValue();
    var legalemployeeagrement = formContext.getAttribute("pg_legalemploymentagreementsenttohrinternal").getValue();
   var itteamcreateemailid = formContext.getAttribute("pg_itteamcreateemailid").getValue();
   var itteamringcentralaccess = formContext.getAttribute("pg_itteamringcentralaccess").getValue();
   var itteamcreateloginpassword = formContext.getAttribute("pg_itteamcreateloginpassword").getValue();
    if ((stageId === "af2bd53b-5965-470a-a555-bd6d02ee2211" && type === 140310000) || (type === 140310012 && legalemployeeagrement ===true) || (type === 140310004 && itteamcreateemailid ===true && itteamringcentralaccess===true && itteamcreateloginpassword===true) || (type !=== 140310000 && country !===140310000) || (type === 140310005 && country===140310000)) {///completed stage
        return true;
    }
    else {
        return false;
    }
}

function managerSH(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    var pgvoicesupport = formContext.getAttribute("pg_voicesupport").getValue();
    var managesemployees = formContext.getAttribute("pg_managesemployees").getValue();
    if (pgvoicesupport === 140310002 || pgvoicesupport === 140310003) { // iif voicesupport===US OR UK
        formContext.getControl("pg_voipareacode").setVisible(true);
    formContext.getControl("pg_voipareacode1").setVisible(true);
    }
    /////else if(voicesupport===140310000 || voicesupport ===140310001)  { // iif voicesupport===US OR UK

    else {
        formContext.getControl("pg_voipareacode").setVisible(false);
    formContext.getControl("pg_voipareacode1").setVisible(false);
    }
    if (managesemployees === 1) { // iif managesemployees===0
        formContext.getControl("pg_employeetobemapped").setVisible(true);
    }
    else {
        formContext.getControl("pg_employeetobemapped").setVisible(false);
    }
}


function SaveandClose(primaryControl) {  //main form
    debugger;
    var formContext = primaryControl;
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var type = formContext.getAttribute("pg_type").getValue();
    if (stageId === "4fc24e2a-ce53-4df1-9253-9587b144389f" && type === 140310000) {////intial stage
        return false;
    }
    else {
        return true;
    }
}



function submittomanager(primaryControl) {  //main form
    debugger;
    var formContext = primaryControl;
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var type = formContext.getAttribute("pg_type").getValue();
    var statuscode = formContext.getAttribute("statuscode").getValue();
    if (stageId === "4fc24e2a-ce53-4df1-9253-9587b144389f" && type === 140310000 && statuscode === 1) {////initial stage
        return true;
    }
    else {
        return false;
    }
}




function BPFMove(executionContext) {
    //Initiated Form Context.
debugger;
    var formContext = executionContext.getFormContext();
    var createform = 1;
    var Type = formContext.ui.getFormType();
    var country = formContext.getAttribute("pg_country").getValue();
    var childcount = formContext.getAttribute("pg_childtickets").getValue();
    if (Type != createform) {
        var status = formContext.getAttribute("statuscode").getSelectedOption().value;
        var currentstage = formContext.getAttribute("pg_currentstage").getValue();
        var activeStage = formContext.data.process.getActiveStage();
        var stageId = activeStage.getId();
       var a = formContext.getAttribute("pg_checkallotherchildticketsare1oocomplete").getValue();
   var b = formContext.getAttribute("pg_checkfullbgvcompletion").getValue();
   var c = formContext.getAttribute("pg_checkappointmentletterissuance").getValue();
         if (stageId === "4a81cbce-6ed8-442d-a4fc-8ee873101d56") {///hr stage///currentstage === 140310003 && country != 140310000
      
            formContext.data.process.moveNext();
        }
        else if (stageId === "11a1353a-8929-4e64-84fb-f0fb16960dcc"){/// || stageId === "cb5fde85-072a-4bc2-b107-0af5fbe55e2d") {////audit stage//currentstage === 140310004 && country != 140310000
      
            formContext.data.process.moveNext();
        }
 else if(stageId === "cb5fde85-072a-4bc2-b107-0af5fbe55e2d" && a===true && b===true && c===true){ ////audit stage
      
            formContext.data.process.moveNext();

        }
    else if(stageId === "5b1a3c2d-a34b-4f8a-aadf-a0af017d93ef" && childcount=== 0){ ////dropoutindia
      
            formContext.data.process.moveNext();

        }
 else if(stageId === "408d7424-cb76-4326-b1ec-5f3287f3bdc1"){// && a===true && b===true && c!===null){ ////india hrops stage
      
            formContext.data.process.moveNext();

        }
  else if(stageId === "5b1a3c2d-a34b-4f8a-aadf-a0af017d93ef" && childcount!=== 0){ ////dropoutindia
      
      alertStrings = { confirmButtonLabel: "OK", text: "Please complete the child ticket fully and accurately, to proceed to the next stage.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);

        }
        else if (stageId === "c2608534-5ea5-4118-8513-b6d4bd829a30" || stageId === "b7900f22-3d52-4d26-bb2d-4b13208f029e") {////dropoutta stage
            formContext.data.process.moveNext();
        }
        else if (stageId === "dd998249-4176-4511-8fea-1b3fff8d4dcc" && childcount === 0 || stageId === "b9732caf-4eb2-47d5-aa2a-e53e6575054e") {////dropoutta stage
            formContext.data.process.moveNext();
        }
        else if ( stageId === "6bb2f036-a279-466a-b004-72a93e20ba6c" || currentstage === 140310002 && country !=== 140310000) {
            formContext.data.process.moveNext();//stageId === "0baac90f-f95e-4581-83a1-f7753b429186" child ticket
        }
    }
}




//Onboarding

function Resolve(context) {
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "pg_resolve_45172",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    },
        {
            target: 2,
            width: 600,
            height: 300
        }

    ).then(console.log).catch(console.error);
}





var Onboarding;          //onload
Onboarding = {};
Onboarding.formEvents = {
    form_load: function (context) {
        var formcontext = context.getFormContext();
        formcontext.data.process.addOnPreStageChange(Onboarding.formEvents.handleStageMovement);
    },

    handleStageMovement: function checklist(context) {
        var bpfArguments = context.getEventArgs();
        var formcontext = context.getFormContext();
        var bpfstage = formcontext.data.process.getActiveStage().getName();
        var country = formcontext.getAttribute("pg_country").getValue();

        if (bpfstage === "Child Ticket" || bpfstage === "Dropout Child Ticket" || bpfstage === "Legal" || bpfstage === "IT" || bpfstage === "HR") {

            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_childtickets").getValue() !=== null && formcontext.getAttribute("pg_childtickets").getValue() !=== 0) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Please complete the Child Ticket fully and accurately, to proceed to the next stage.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;

            }

        }
   if (bpfstage === "QMG" && country === 140310000) {
    var A,B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q,R;

 var A = formcontext.getAttribute("pg_identifycandidate").getValue();
   var B = formcontext.getAttribute("pg_sendofferletterrequesttohr").getValue();
   var C = formcontext.getAttribute("pg_draftandsendofferletterrequesttodojohead").getValue();
   var D = formcontext.getAttribute("pg_sendofferlettertocandidate").getValue();
 var E= formcontext.getAttribute("pg_offerletteracceptance").getValue();
   var F = formcontext.getAttribute("pg_sendemploymentagreementrequesttolegal").getValue();
   var G = formcontext.getAttribute("pg_sendeatocandidate").getValue();
   var H = formcontext.getAttribute("pg_initiatebgchecks").getValue();
 var I = formcontext.getAttribute("pg_sendobpackagetocandidate").getValue();
   var J = formcontext.getAttribute("pg_sendeatoleoforcountersignature").getValue();
   var K = formcontext.getAttribute("pg_bgcclearance").getValue();
   var L= formcontext.getAttribute("pg_sendeatocandidatepostcountersignaturefrom").getValue();
 var M = formcontext.getAttribute("pg_senditaccessformlinktoreportingmanager").getValue();
   var N = formcontext.getAttribute("pg_senditaccessdetailstoitteam").getValue();
   var O = formcontext.getAttribute("pg_sendcoupleoftemplatedemailswelcomingcandi").getValue();
   var P = formcontext.getAttribute("pg_datamanagementdataisenteredinlaunchandm").getValue();
   var Q = formcontext.getAttribute("pg_paperworkauditedandsharedtoqmgpayroll").getValue();
   var R = formcontext.getAttribute("pg_paperworkuploadedinsharepoint").getValue();

     if ((bpfArguments.getDirection() === "Next") && (A!=140310001 || B!===140310001 || C!===140310001 || D!===140310001 || E!===140310001 || F!===140310001 || G!===140310001 || H!===140310001 || I!===140310001 || J!===140310001 || K!===140310001 || L!===140310001 || M!===140310001 || N!===140310001 || O!===140310001 || P!===140310001 || Q!===140310001 || R!===140310001)){
   bpfArguments.preventDefault();
     alertStrings = { confirmButtonLabel: "OK", text: "Please complete audit of all requests.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;

            }
        }



        if (bpfstage === "QAT" && country === 140310000) {
            var a,b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q,r;

a = formcontext.getAttribute("pg_emergencycontactinformation").getValue();
            b = formcontext.getAttribute("pg_employmentagreement").getValue();
            c = formcontext.getAttribute("pg_attachmentab").getValue();
            d = formcontext.getAttribute("pg_offerletter").getValue();
            e = formcontext.getAttribute("pg_w4federalform").getValue();
            f = formcontext.getAttribute("pg_statetaxform").getValue();
            g = formcontext.getAttribute("pg_directdepositform").getValue();
            h = formcontext.getAttribute("pg_voidcheckbankscreenshot").getValue();
            i = formcontext.getAttribute("pg_concurrentemploymentstatement").getValue();
            j = formcontext.getAttribute("pg_eventswaiverreleaseagreement").getValue();
            k = formcontext.getAttribute("pg_prideglobalimagereleaseform").getValue();
            l = formcontext.getAttribute("pg_employeehandbookacknowledgementform").getValue();
            m = formcontext.getAttribute("pg_acknowledgementofpostersnotices").getValue();
            n = formcontext.getAttribute("pg_401koptoutform").getValue();
            o = formcontext.getAttribute("pg_backgroundcheck").getValue();
            p = formcontext.getAttribute("pg_i9form").getValue();
            q = formcontext.getAttribute("pg_everifyreport").getValue();
    r = formcontext.getAttribute("pg_eeocform").getValue();
            if ((bpfArguments.getDirection() === "Next") && (a !=== 140310001 || b !=== 140310001 || c !=== 140310001 || d !=== 140310001 ||
                e !=== 140310001 || f !=== 140310001 || g !=== 140310001 || h !=== 140310001 ||
                i !=== 140310001 || j !=== 140310001 || k !=== 140310001 || l !=== 140310001 ||
                m !=== 140310001 || n !=== 140310001 || o !=== 140310001 || p !=== 140310001 ||
                q !=== 140310001 || r !=== 140310001)) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Please complete audit of all requests.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;

            }
        }
        if (bpfstage === "HR" && country === 140310001) {
            var s, t, u, v, w, x, z;


            s = formcontext.getAttribute("pg_checkallotherchildticketsare1oocomplete").getValue();
            t = formcontext.getAttribute("pg_msdemployeerecordcreation").getValue();
            u = formcontext.getAttribute("pg_assetagreementcollectedfiled").getValue();
            v = formcontext.getAttribute("pg_day1orientationcompleted").getValue();
            w = formcontext.getAttribute("pg_poststartbgvinitiation").getValue();
            x = formcontext.getAttribute("pg_finalbgvreportcollectedcleared").getValue();
           y = formcontext.getAttribute("pg_onboardingpaperworkcollectedfiled").getValue();
            z = formcontext.getAttribute("pg_issueappointmentletter").getValue();


            if ((bpfArguments.getDirection() === "Next") && (s !=== true || t !=== true || u !=== true ||
                v !=== true || w !=== true || x !=== true || y!===true|| z !=== true)) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Please complete HR of all requests.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;

            }
        }
    }
}



function formname() {  //main form
    debugger;
    var name = formContext.ui.formSelector.getCurrentItem().getLabel();
    if (name === "Main Form") {
        return true;
    }
    else {
        return false;
    }

}


function SubmittoHR(primaryControl) {   //mainform
    debugger;
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId();
    var confirmStrings = { text: "Submit Candidate Onboarding?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
    var confirmOptions = { height: 250, width: 300 };

    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed) {
                debugger;

                var workflowId = "C180F119-29C2-4CAA-8AB3-CB5A97D9C3BB";

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


///////////////////////////////////////////////////
function TAONBOARDFORM(executionContext) {                       //mainFORM
    debugger;

    var formContext = executionContext.getFormContext();
    var Onboarding = formContext.ui.tabs.get("tab_2");
    var type = formContext.getAttribute("pg_type").getValue();
    var countrysec = Onboarding.sections.get("tab_2_section_4");///country section
    var TAOnboarding = Onboarding.sections.get("TA Onboarding");  //TAOnboardingtab
    var TAONBOARDING = formContext.ui.tabs.get("TA");//dropout ta
    var hroperationdropout = formContext.ui.tabs.get("hroperation");//dropout hr
     var hrbgc = formContext.ui.tabs.get("tab_16");     //tab_16  ///hrbgc                                                                                              
 var dropoutaudit = formContext.ui.tabs.get("tab_15"); ///tab_15dropout audit
   // var candidatesfullname = 0;
    var country = 0;
  
   
        var country = formContext.getAttribute("pg_country").getValue();
   
    if (country === 140310000) {//US

        // Onboardinggeneral.setVisible(false);
        TAOnboarding.setVisible(true);
        //INDIA
        //TAONBOARDING
        formContext.getControl("pg_onboardingtype").setVisible(false);
        formContext.getControl("pg_workmode").setVisible(false);
        formContext.getControl("pg_shifttimings").setVisible(false);
        formContext.getControl("pg_employer").setVisible(false);
        formContext.getControl("pg_prestartbgvstatus").setVisible(false);
        formContext.getControl("pg_worklocation").setVisible(false);
        formContext.getControl("pg_department").setVisible(true);
        formContext.getControl("pg_process").setVisible(false);
        formContext.getControl("pg_division").setVisible(false);
        formContext.getControl("pg_assetcoordinationaddress").setVisible(false);
        formContext.getControl("pg_tentativedoj").setVisible(false);
   formContext.getControl("pg_middlename").setVisible(false);  
        //US
//pg_mobilenumber
     formContext.getControl("pg_mobilenumber").setVisible(false);  
       formContext.getControl("pg_teamname").setVisible(false);  
                     formContext.getControl("pg_designationjobtitle").setVisible(false);    //pg_designationjobtitle        
     formContext.getControl("pg_diversehire1").setVisible(false);                                                                                    
        formContext.getControl("pg_diversehire").setVisible(false);
        formContext.getControl("pg_diversitytype").setVisible(false);
        formContext.getControl("pg_diversecategory").setVisible(false);
       formContext.getControl("pg_diversecategory_lgbtqia").setVisible(false);
        formContext.getControl("pg_diversecategory_sed").setVisible(false);
        formContext.getControl("pg_diversecategory_gender").setVisible(false);
   formContext.getControl("pg_diversecategory_age").setVisible(false);

        formContext.getControl("pg_lastname").setVisible(true);
        formContext.getControl("pg_firstname").setVisible(true);
        formContext.getControl("pg_reportingmanagername").setVisible(true);
        formContext.getControl("pg_adminstrativemanagername").setVisible(false);
        formContext.getControl("pg_hourlyrate").setVisible(false);
        formContext.getControl("pg_gender").setVisible(true);
        formContext.getControl("pg_prideinbalancereason").setVisible(false);
        formContext.getControl("pg_prideinbalance").setVisible(true);
        formContext.getControl("pg_ratetype").setVisible(true);
        formContext.getControl("pg_jobtitle").setVisible(true);//TAONBOARDING
        formContext.getControl("pg_emailid").setVisible(true);
        formContext.getControl("pg_linkedinprofile").setVisible(true);
        formContext.getControl("pg_startday").setVisible(true);
        formContext.getControl("pg_salary").setVisible(false);
        formContext.getControl("pg_hiringmanagername").setVisible(true);
        formContext.getControl("pg_reportingmanagername").setVisible(true);
        formContext.getControl("pg_worklocationcityandstate").setVisible(true);
     formContext.getControl("pg_worklocationstate").setVisible(true);
  formContext.getControl("pg_candidateaddressstate").setVisible(true);
        formContext.getControl("pg_candidatesaddressaddressline1").setVisible(true);
        formContext.getControl("pg_candidatesaddresscityname").setVisible(true);
 
        formContext.getControl("pg_candidatesaddresszipcode").setVisible(true);
        formContext.getControl("pg_launchreq").setVisible(true);
       // formContext.getControl("pg_candidatesfulllegalname").setVisible(false);
        formContext.getControl("pg_additionalcomments").setVisible(true);
        formContext.getAttribute("pg_lastname").setRequiredLevel("required");

        formContext.getAttribute("pg_firstname").setRequiredLevel("required");
        formContext.getAttribute("pg_hiringmanagername").setRequiredLevel("required");
       formContext.getAttribute("pg_reportingmanagername").setRequiredLevel("required");
     
        formContext.getAttribute("pg_dojo").setRequiredLevel("required");
        formContext.getAttribute("pg_jobtitle").setRequiredLevel("required");
        formContext.getAttribute("pg_linkedinprofile").setRequiredLevel("required");
        formContext.getAttribute("pg_emailid").setRequiredLevel("required");
        formContext.getAttribute("pg_startday").setRequiredLevel("required");
        formContext.getAttribute("pg_ratetype").setRequiredLevel("required");
        formContext.getAttribute("pg_launchreq").setRequiredLevel("required");
        formContext.getAttribute("pg_prideinbalance").setRequiredLevel("required");
        formContext.getAttribute("pg_worklocationcityandstate").setRequiredLevel("required");
    formContext.getAttribute("pg_worklocationstate").setRequiredLevel("required");
        formContext.getAttribute("pg_candidatesaddressaddressline1").setRequiredLevel("required");
       // formContext.getAttribute("pg_candidatesaddressaddressline2").setRequiredLevel("required");
        formContext.getAttribute("pg_candidatesaddresscityname").setRequiredLevel("required");
        formContext.getAttribute("pg_candidateaddressstate").setRequiredLevel("required");
        formContext.getAttribute("pg_candidatesaddresszipcode").setRequiredLevel("required");
        formContext.getAttribute("pg_gender").setRequiredLevel("required");
        formContext.getAttribute("pg_launchreq").setRequiredLevel("required");
        formContext.getAttribute("pg_department").setRequiredLevel("required");
        formContext.getAttribute("pg_isthisacandidateareferral").setRequiredLevel("required");
        formContext.getAttribute("pg_additionalcomments").setRequiredLevel("required");


    }
    if (country === 140310001) {          //india
        TAOnboarding.setVisible(true);
        //TAONBOARDING
  formContext.getControl("pg_mobilenumber").setVisible(true);  
  formContext.getAttribute( "pg_mobilenumber").setRequiredLevel("required");

                formContext.getControl("pg_middlename").setVisible(true);                                                                                                      
        formContext.getControl("pg_onboardingtype").setVisible(true);
        formContext.getControl("pg_workmode").setVisible(true);
        formContext.getControl("pg_shifttimings").setVisible(true);
        formContext.getControl("pg_employer").setVisible(true);
        formContext.getControl("pg_prestartbgvstatus").setVisible(true);
        formContext.getControl("pg_worklocation").setVisible(true);
        formContext.getControl("pg_department").setVisible(true);
  formContext.getControl("pg_department").setVisible(true);
        formContext.getControl("pg_process").setVisible(true);
        formContext.getControl("pg_division").setVisible(true);
        formContext.getControl("pg_tentativedoj").setVisible(true);
        formContext.getControl("pg_assetcoordinationaddress").setVisible(true);
         formContext.getControl("pg_teamname").setVisible(true);  
        formContext.getControl("pg_adminstrativemanagername").setVisible(true);
       formContext.getControl("pg_designationjobtitle").setVisible(true);   
        //india
   formContext.getControl("pg_diversehire1").setVisible(true);     
        formContext.getControl("pg_jobtitle").setVisible(false);//TAONBOARDING
        formContext.getControl("pg_emailid").setVisible(false);
        formContext.getControl("pg_linkedinprofile").setVisible(false);
        formContext.getControl("pg_startday").setVisible(false);
        formContext.getControl("pg_salary").setVisible(false);
        formContext.getControl("pg_hiringmanagername").setVisible(true);

        formContext.getControl("pg_reportingmanagername").setVisible(true);
        formContext.getControl("pg_worklocationcityandstate").setVisible(false);
        formContext.getControl("pg_candidatesaddressaddressline1").setVisible(false);
        formContext.getControl("pg_candidatesaddresscityname").setVisible(false);
         formContext.getControl("pg_worklocationstate").setVisible(false);
  formContext.getControl("pg_candidateaddressstate").setVisible(false);
        formContext.getControl("pg_candidatesaddresszipcode").setVisible(false);
        formContext.getControl("pg_launchreq").setVisible(false);
        formContext.getControl("pg_refferedby").setVisible(false);
        formContext.getControl("pg_additionalcomments").setVisible(false);
        formContext.getControl("pg_prideinbalance").setVisible(false);
        formContext.getControl("pg_candidatesaddressaddressline2").setVisible(false);
        formContext.getControl("pg_isthisacandidateareferral").setVisible(false);
        formContext.getControl("pg_gender").setVisible(false);
        formContext.getControl("pg_prideinbalancereason").setVisible(false);
        formContext.getControl("pg_hourlyrate").setVisible(false);
        formContext.getControl("pg_ratetype").setVisible(false);
    formContext.getControl("pg_diversehire").setVisible(true);

       formContext.getAttribute("pg_firstname").setRequiredLevel("required");
        formContext.getAttribute("pg_lastname").setRequiredLevel("required");
        formContext.getAttribute("pg_hiringmanagername").setRequiredLevel("none");
        formContext.getAttribute("pg_reportingmanagername").setRequiredLevel("none");
        formContext.getAttribute("pg_dojo").setRequiredLevel("none");
  //formContext.getControl("pg_department").setRequiredLevel("required");
       formContext.getAttribute("pg_department").setRequiredLevel("required");
    }
    if (country === 140310002 || country === 140310003 || country === 140310004 || country === 140310005 || country === 140310006 || country === 140310007 || country === 140310008) {
        TAOnboarding.setVisible(false);
    }
    var dropoutcomments = formContext.getAttribute("pg_dropoutcomments").getValue();
    var dropoutintiated = formContext.getAttribute("pg_dropoutintiated").getValue();
    var ratetype = formContext.getAttribute('pg_ratetype').getValue();
   // var candidatesfullname = formContext.getAttribute("pg_candidatesfulllegalname").getValue();
    var prideinbalance = formContext.getAttribute('pg_prideinbalance').getValue();
    var Country = formContext.getAttribute("pg_country").getText();
    var typename = formContext.getAttribute("pg_type").getText();
    var status = formContext.getAttribute("statuscode").getSelectedOption().value;
    var isthisacandidateareferra = formContext.getControl("pg_isthisacandidateareferral").getValue();
    if (isthisacandidateareferra === "Yes") {
        formContext.getControl("pg_refferedby").setVisible(true);
        formContext.getAttribute("pg_refferedby").setRequiredLevel("required");
    }
    else {
        formContext.getControl("pg_refferedby").setVisible(false);
    }

    if (ratetype === 1) { // iif ratetype===salaried
        formContext.getControl("pg_salary").setVisible(true);
       formContext.getControl("pg_salary1").setVisible(true);
    }
    else if (ratetype === 2) {           // iif ratetype===hourly
        formContext.getControl("pg_hourlyrate").setVisible(true);
   formContext.getControl("pg_hourlyrate1").setVisible(true);
    }
    if (ratetype !=== 1) {
        formContext.getControl("pg_salary").setVisible(false);
    formContext.getControl("pg_salary1").setVisible(false);
    }
    if (ratetype !=== 2) {
        formContext.getControl("pg_hourlyrate").setVisible(false);
  formContext.getControl("pg_hourlyrate1").setVisible(false);
    }
    if (prideinbalance === 1) { // iif prideinbalance===yes
        formContext.getControl("pg_prideinbalancereason").setVisible(true);
    }
    else {
        formContext.getControl("pg_prideinbalancereason").setVisible(false);
    }
    if (dropoutcomments !=== null) {
        formContext.getAttribute("pg_dropoutintiated").setValue(true);
    }
    else if (dropoutcomments === null) {
        formContext.getAttribute("pg_dropoutintiated").setValue(false);
    }
    var dojo = formContext.getAttribute('pg_dojo').getValue();

    var Setup = formContext.ui.tabs.get("Manager");
    var India = Setup.sections.get("RMforIndia"); //indiasec
    var US = Setup.sections.get("RMforUS");
    var PGdepartment = formContext.getAttribute('pg_prideglobaldepartment').getValue();
    var PHdepartment = formContext.getAttribute('pg_pridehealthdepartment').getValue();
    var RTdepartment = formContext.getAttribute('pg_russelltobindepartment').getValue();
var pgaofsubdepartmentjobfamily = formContext.getAttribute('pg_pgaofsubdepartmentjobfamily').getValue();
    if (dojo === 140310000) {         ///prideglobal
        formContext.getControl("pg_prideglobaldepartment1").setVisible(true);
    }
    else {
        formContext.getControl("pg_prideglobaldepartment1").setVisible(false);
    }
    if (dojo === 140310005) {             //pridehealth
        formContext.getControl("pg_pridehealthdepartment1").setVisible(true);
  //formContext.getControl("pg_pridehealthdepartment1").setVisible(true);
    }
    else {
        formContext.getControl("pg_pridehealthdepartment1").setVisible(false);

    }
    if (dojo === 140310003) {             //prideONE
        formContext.getControl("pg_prideonedepartment1").setVisible(true);
    }
    else {
        formContext.getControl("pg_prideonedepartment1").setVisible(false);
    }
    if (dojo === 140310004) {             //prideNOW
        formContext.getControl("pg_pridenowdepartment1").setVisible(true);
    }
    else {
        formContext.getControl("pg_pridenowdepartment1").setVisible(false);
    }
    if (dojo === 140310001) {             //RussellTobin&Associates
        formContext.getControl("pg_russelltobindepartment1").setVisible(true);
 
    }
    else {
        formContext.getControl("pg_russelltobindepartment1").setVisible(false);

    }
    if (dojo === 140310009) {             //Rocket Shippers
        formContext.getControl("pg_rocketshippersdepartment1").setVisible(true);
    }
    else {
        formContext.getControl("pg_rocketshippersdepartment1").setVisible(false);
    }
    if (dojo === 140310010 || pgaofsubdepartmentjobfamily === 140310008) {             //Pride Advisory
        formContext.getControl("pg_advisoryservicesdepartment1").setVisible(true);
    }
    else {
        formContext.getControl("pg_advisoryservicesdepartment1").setVisible(false);
    }
    if (PGdepartment === 140310001) { // if deprtment===AOF
        formContext.getControl("pg_pgaofsubdepartmentjobfamily1").setVisible(true);
 
    }
    else {
        formContext.getControl("pg_pgaofsubdepartmentjobfamily1").setVisible(false);

    }
    if (PGdepartment === 140310006) { // if deprtment===IT
        formContext.getControl("pg_pgitsubdepartmentjobfamily1").setVisible(true);
    }
    else {
        formContext.getControl("pg_pgitsubdepartmentjobfamily1").setVisible(false);
    }
    if (PHdepartment === 140310000) { // iif pridehealthdeprtment===NATIONAL FULFILLMENT
        formContext.getControl("pg_phcnationalfulfillmentsubdepartmentjobfam1").setVisible(true);
    }
    else {
        formContext.getControl("pg_phcnationalfulfillmentsubdepartmentjobfam1").setVisible(false);
    }
    if (RTdepartment === 140310008) { // iif RTA===SAT EAST
        formContext.getControl("pg_rtasateastsubdepartmentjobfamily1").setVisible(true);
    }
    else {
        formContext.getControl("pg_rtasateastsubdepartmentjobfamily1").setVisible(false);
    }
    if (RTdepartment === 140310003) { // iif RTA===rtae2eprofessionalsubdepartmentjobfamily
        formContext.getControl("pg_rtae2eprofessionalsubdepartmentjobfamily1").setVisible(true);
    }
    else {
        formContext.getControl("pg_rtae2eprofessionalsubdepartmentjobfamily1").setVisible(false);
    }

    if (country === 140310001 || country === 140310000) { // iif country= india
        TAOnboarding.setVisible(true);

    }
    else {
  
        TAOnboarding.setVisible(false);
    }

    var Manager = formContext.ui.tabs.get("Manager");
    var Audit = formContext.ui.tabs.get("Audit");
    var RMforIndia = Manager.sections.get("RMforIndia");
    var RMforUS = Manager.sections.get("RMforUS");
    var HR = formContext.ui.tabs.get("HR");
   var HROps = formContext.ui.tabs.get("tab_17");
    var ChildTickets = formContext.ui.tabs.get("tab_8");
    var dropoutChildTickets = formContext.ui.tabs.get("tab_11");
  var USAudit = formContext.ui.tabs.get("tab_14");
    var country = formContext.getAttribute("pg_country").getValue();
    var currentstage = formContext.getAttribute("pg_currentstage").getValue();
    var activeProcess = formContext.data.process.getActiveProcess();
    var activeProcessID = activeProcess.getId();
    var activeStage = formContext.data.process.getActiveStage();
    var createform = 1;
    var Type = formContext.ui.getFormType();
    if (Type != createform) {
        var stageId = activeStage.getId();
    }
    if (stageId === "c08c6d0c-59f5-4286-aeb0-56c8446e7983" && country === 140310000 || stageId === "98d720f3-2395-4920-9994-43e245ea7bc6" && country === 140310000) {///manager
        Manager.setVisible(true);
        RMforUS.setVisible(true);
        formContext.getAttribute("pg_listtheemaildistributionlistsmailboxyouwa").setRequiredLevel("required");
        formContext.getAttribute("pg_listtheteamschannelsthatyouwanttheemploye").setRequiredLevel("required");
        formContext.getAttribute("pg_ifjobboardaccessisrequiredlisthere").setRequiredLevel("required");
        formContext.getAttribute("pg_pleaseprovidetheteamsinatsyouwanttoaddth").setRequiredLevel("required");
        formContext.getAttribute("pg_youneedlaunchatssetupfortheemployee").setRequiredLevel("required");
        formContext.getAttribute("pg_pleasespecifythedepartmentsubdeptjobfamil").setRequiredLevel("required");
   formContext.getAttribute("pg_currentstage").setValue(140310001);
    }
    else if (stageId === "c08c6d0c-59f5-4286-aeb0-56c8446e7983" && country === 140310001) {//manager
        Manager.setVisible(true);
        RMforIndia.setVisible(true);
 formContext.getAttribute("pg_currentstage").setValue(140310001);
    }
    else {
        Manager.setVisible(false);

    }
    if (stageId === "11a1353a-8929-4e64-84fb-f0fb16960dcc" || stageId === "cb5fde85-072a-4bc2-b107-0af5fbe55e2d") {///audit stage
        formContext.getAttribute("pg_currentstage").setValue(140310004);
        Audit.setVisible(true);

    }
    else {
        Audit.setVisible(false);

    }
    if (stageId === "4da369a2-7910-4f16-8cee-0bcfd281685d") {///audit stage
        formContext.getAttribute("pg_currentstage").setValue(140310004);
        USAudit.setVisible(true);

    }
    else {
        USAudit.setVisible(false);

    }
   if (stageId === "af2bd53b-5965-470a-a555-bd6d02ee2211") {///completed stage
        formContext.getAttribute("pg_currentstage").setValue(140310005);
         }
else{
}
    if (stageId === "2c0e0542-b81d-4b20-83bd-370196b8adaf" || stageId === "ae651664-9d2b-4357-9697-770241c65e23" || stageId === "981d379d-1a0a-4bca-b467-8e60bf0b980f" || stageId === "24598d06-6c0b-44a7-9d73-9ffe2f064628" || stageId === "4345ff6c-1b88-4999-851d-4fe4fba6f496" || stageId === "4eb007b7-4aa0-457f-aeed-1bd56af15c12") {///taonboarding stage for dropout
        TAONBOARDING.setVisible(true);

    }
    else { 
        TAONBOARDING.setVisible(false);

    }
    if (stageId === "434713b1-7d96-43df-b36c-d325daef06d7" || stageId === "28d690d6-53ac-42af-9bb2-d4ec44bd5c52" || stageId === "e2862d9f-c4fa-4d26-b615-f64141604f04" || stageId === "4442fe1c-fc11-49b2-a0f5-6431a01ab238") {///hropeartiononboarding stage for dropout
        hroperationdropout.setVisible(true);

    }
    else {
        hroperationdropout.setVisible(false);

    }

    if (stageId ==="3ebeb3bb-a2cb-40be-8679-f3b70c945661" || stageId === "af634a5d-e6e2-4b47-8f20-b3d71f2708b7" || stageId === "1b929018-05de-45be-9abf-87c69466d2bb") {
        dropoutChildTickets.setVisible(true);
    }
    else {
        dropoutChildTickets.setVisible(false);
    }
  if (stageId === "ec153282-5f82-44cb-8cdb-29af81a84186"){
  dropoutaudit.setVisible(true);
    }
    else {

        dropoutaudit.setVisible(false);

    }
    if (stageId === "0baac90f-f95e-4581-83a1-f7753b429186" || stageId === "6bb2f036-a279-466a-b004-72a93e20ba6c" || stageId === "dd998249-4176-4511-8fea-1b3fff8d4dcc" || stageId === "5b1a3c2d-a34b-4f8a-aadf-a0af017d93ef" || stageId === "b9732caf-4eb2-47d5-aa2a-e53e6575054e") {
        formContext.getAttribute("pg_currentstage").setValue(140310002);
        ChildTickets.setVisible(true);
    }
    else {
        ChildTickets.setVisible(false);

    }
 if (stageId === "408d7424-cb76-4326-b1ec-5f3287f3bdc1" && country === 140310001) {
        formContext.getAttribute("pg_currentstage").setValue(140310006);
        HROps.setVisible(true);

    }
    else {
        HROps.setVisible(false);
    }
    if (stageId === "601fe287-7df7-4244-b549-ca01134f5382" && country === 140310001) {
        formContext.getAttribute("pg_currentstage").setValue(140310003);
        HR.setVisible(true);

    }
    else {
        HR.setVisible(false);
    }
    var USHRINTERNALOnboarding = formContext.ui.tabs.get("HR Internal");
    var USEA = formContext.ui.tabs.get("tab_13");
    if (stageId === "1943bd92-6621-45b4-afe6-cf3acf70b9f5" && country === 140310000 || stageId === "340f4ddd-37ca-4ce4-97b0-5076b3670599" && country === 140310000 ) {
        formContext.getAttribute("pg_currentstage").setValue(140310003);

        USHRINTERNALOnboarding.setVisible(true);

    }
    else {
        USHRINTERNALOnboarding.setVisible(false);
    }
    if (stageId === "b7900f22-3d52-4d26-bb2d-4b13208f029e" && country === 140310000 || stageId === "dec7bf2c-ef18-431c-9df6-aa5776062f59" && country === 140310000 || stageId === "f91895dc-eb9c-4398-8b78-b596b266aa63" && country === 140310000) {
        ////formContext.getAttribute("pg_currentstage").setValue(140310003);

        USEA.setVisible(true);

    }
    else {
        USEA.setVisible(false);
    }
    var OnboardingDocument = formContext.ui.tabs.get("Onboarding_Document");
    var formType = formContext.ui.getFormType();
    if (formType === 2 || formType !=== 1) {
        OnboardingDocument.setVisible(true);
    }
    else {
        OnboardingDocument.setVisible(false);
    }
    if (country === 140310001) { // iif country= india
        India.setVisible(true);

    }
    else {
        India.setVisible(false);

    }
    if (country === 140310000) { // if country= us
        US.setVisible(true);
    }
   else{
 US.setVisible(false);
} 

    var USOnboarding = formContext.ui.tabs.get("Onboardingtab");
    if (type === 140310000) {
        USOnboarding.setVisible(false);
    }
    if (type !=== 140310000) {
        TAOnboarding.setVisible(false);
    
    }
   var createform = 1;
    var Type = formContext.ui.getFormType();
    if (Type !=== createform && type === 140310000 && country === 140310000) {


 formContext.getControl("header_process_pg_dropoutintiated").setDisabled(true);
 formContext.getControl("header_process_pg_dropoutintiated_2").setDisabled(true);
        formContext.getControl("header_process_pg_dropoutintiated_2").setVisible(false);
}
    if (Type !=== createform && type === 140310000 && country === 140310001) {
   formContext.getControl("header_process_statuscode").setVisible(false);
 formContext.getControl("header_process_pg_dropoutintiated").setVisible(false);
     formContext.getControl("header_process_pg_country").setVisible(false);
 formContext.getControl("header_process_pg_dropoutintiated_3").setVisible(false);
 formContext.getControl("header_process_pg_dropoutintiated_2").setVisible(false);
        formContext.getControl("header_process_statuscode_1").setVisible(false);
 formContext.getControl("header_process_pg_dropoutintiated_4").setVisible(false);
     formContext.getControl("header_process_pg_country_6").setVisible(false);
 formContext.getControl("header_process_pg_country_5").setVisible(false);
}
  

 var IndiaQFORM = formContext.ui.quickForms.get("India");    //India

var diversitytype=formContext.getAttribute("pg_diversitytype").getValue();
var Diversehire = formContext.getAttribute("pg_diversehire").getValue();
if(type === 140310000 && country === 140310001 || type !=== 140310000){
   formContext.getControl("pg_diversehire").setVisible(false);
   formContext.getControl("pg_diversitytype").setVisible(false);
  formContext.getControl("pg_diversecategory").setVisible(false);
 formContext.getControl("pg_diversecategory_lgbtqia").setVisible(false);
        formContext.getControl("pg_diversecategory_sed").setVisible(false);
        formContext.getControl("pg_diversecategory_gender").setVisible(false);
   formContext.getControl("pg_diversecategory_age").setVisible(false);
}
if(Diversehire===140310000 && type !=== 140310000){///// && type === 140310000
 formContext.getControl("pg_diversitytype1").setVisible(false);
formContext.getControl("pg_diversecategory1").setVisible(false);
  formContext.getControl("pg_diversecategory_lgbtqia1").setVisible(false);
        formContext.getControl("pg_diversecategory_sed1").setVisible(false);
        formContext.getControl("pg_diversecategory_gender1").setVisible(false);
   formContext.getControl("pg_diversecategory_age1").setVisible(false);
}
if(type !=== 140310000 && country === 140310001){
  formContext.getControl("pg_diversehire").setVisible(false);
}
if(Diversehire===140310000 && type !=== 140310000){///// && type === 140310000

  formContext.getControl("pg_diversitytype").setVisible(false);
 formContext.getControl("pg_diversecategory").setVisible(false);
   formContext.getControl("pg_diversecategory_lgbtqia").setVisible(false);
        formContext.getControl("pg_diversecategory_sed").setVisible(false);
        formContext.getControl("pg_diversecategory_gender").setVisible(false);
   formContext.getControl("pg_diversecategory_age").setVisible(false);

}

if(diversitytype!===null && Diversehire===140310000 && type !=== 140310000){///&& type === 140310000

  formContext.getControl("pg_diversecategory").setVisible(false);
   formContext.getControl("pg_diversecategory_lgbtqia").setVisible(false);
        formContext.getControl("pg_diversecategory_sed").setVisible(false);
        formContext.getControl("pg_diversecategory_gender").setVisible(false);
   formContext.getControl("pg_diversecategory_age").setVisible(false);

}
if(type === 140310000 || type !=== 140310000){///&& type === 140310000

  formContext.getControl("pg_diversecategory").setVisible(false);
  formContext.getControl("pg_diversecategory_lgbtqia").setVisible(false);
        formContext.getControl("pg_diversecategory_sed").setVisible(false);
        formContext.getControl("pg_diversecategory_gender").setVisible(false);
   formContext.getControl("pg_diversecategory_age").setVisible(false);
}
if(Diversehire===140310000 && type === 140310000){///// && type === 140310000

  formContext.getControl("pg_diversitytype1").setVisible(true);
}
else{
   formContext.getControl("pg_diversitytype1").setVisible(false);
  formContext.getControl("pg_diversecategory1").setVisible(false);
  formContext.getControl("pg_diversecategory_lgbtqia1").setVisible(false);
        formContext.getControl("pg_diversecategory_sed1").setVisible(false);
        formContext.getControl("pg_diversecategory_gender1").setVisible(false);
   formContext.getControl("pg_diversecategory_age1").setVisible(false);
}
if(type !=== 140310000 && Diversehire===140310000){
IndiaQFORM.getControl("pg_diversitytype").setVisible(true);
}
else if(type !=== 140310000 && Diversehire!===140310000){
IndiaQFORM.getControl("pg_diversitytype").setVisible(false);
}

if(country === 140310001 && diversitytype!===null && type !=== 140310000){
if(diversitytype.includes(140310000)){

  IndiaQFORM.getControl("pg_diversecategory").setVisible(true);
}
else {
  IndiaQFORM.getControl("pg_diversecategory").setVisible(false);
}


if(diversitytype.includes(140310001)){ 
   IndiaQFORM.getControl("pg_diversecategory_lgbtqia").setVisible(true);
}
else{
 IndiaQFORM.getControl("pg_diversecategory_lgbtqia").setVisible(false);
}

if(diversitytype.includes(140310002)){  
  IndiaQFORM.getControl("pg_diversecategory_sed").setVisible(true);
}
else{
 IndiaQFORM.getControl("pg_diversecategory_sed").setVisible(false);
}

if(diversitytype.includes(140310003)){
     IndiaQFORM.getControl("pg_diversecategory_gender").setVisible(true);  
}
else{
   IndiaQFORM.getControl("pg_diversecategory_gender").setVisible(false);  
}

if(diversitytype.includes(140310004)){

IndiaQFORM.getControl("pg_diversecategory_age").setVisible(true);
}

else {

IndiaQFORM.getControl("pg_diversecategory_age").setVisible(false);
}

}

 //Diversecategory.clearOptions();
if(country === 140310001 && diversitytype!===null && type === 140310000){
if(diversitytype.includes(140310000)){
  formContext.getControl("pg_diversecategory1").setVisible(true);

}
else{
  formContext.getControl("pg_diversecategory1").setVisible(false);
 
}
if(diversitytype.includes(140310001)){
   formContext.getControl("pg_diversecategory_lgbtqia1").setVisible(true);

}
else{
formContext.getControl("pg_diversecategory_lgbtqia1").setVisible(false);

}
if(diversitytype.includes(140310002)){
  formContext.getControl("pg_diversecategory_sed1").setVisible(true);

}
else{
  formContext.getControl("pg_diversecategory_sed1").setVisible(false);
 
}
if(diversitytype.includes(140310003)){
    formContext.getControl("pg_diversecategory_gender1").setVisible(true);  
   
}
else{
    formContext.getControl("pg_diversecategory_gender1").setVisible(false);  
  
}
if(diversitytype.includes(140310004)){
formContext.getControl("pg_diversecategory_age1").setVisible(true);

}
else{
formContext.getControl("pg_diversecategory_age1").setVisible(false);
}
}
   var Onboardingtab = formContext.ui.tabs.get("Onboardingtab");
  var childticket = formContext.ui.tabs.get("tab_2");////////child tickets tab
  if (Type !=== createform && country === 140310000 && type === 140310000) {
hrbgc.setVisible(true);


}
else{
hrbgc.setVisible(false);
}

  if (Type !=== createform && country === 140310000 && type !=== 140310000) {
 var US = childticket.sections.get("US").setVisible(true);   
}
else{
     var US = childticket.sections.get("US").setVisible(false);  
}
  if (Type !=== createform && country === 140310000 && type === 140310005) {
     var USITCAM = Onboardingtab.sections.get("Onboardingtab_section_15").setVisible(true);
}
else{
     var USITCAM = Onboardingtab.sections.get("Onboardingtab_section_15").setVisible(false);
}
}


















function pastDate(executionContext) {                       /////pastDate
    var formContext = executionContext.getFormContext();
    var today = new Date();
    var date = formContext.getAttribute('pg_tentativedoj').getValue();
    var date1 = new Date(date);
    if (date != null) {
        if (today > date1) {
            formContext.getAttribute("pg_tentativedoj").setValue(null);
            //  alert("Sorry,You can't select past day.");
        }
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






function OnboardingSHOW(executionContext) {/////Main Form
    debugger;

    var formContext = executionContext.getFormContext();
    var Onboarding = formContext.ui.tabs.get("Onboardingtab");
    var Onboardinggeneral = Onboarding.sections.get("Onboardinggeneral"); //Onboardinggeneral


    var childtickettab = formContext.ui.tabs.get("tab_2");////////child tickets tab
    var dropchildtickettab = formContext.ui.tabs.get("tab_11");////////dropout child tickets tab
    childtickettab.setVisible(false);
    var TAOnboarding = childtickettab.sections.get("TA Onboarding");  //candidate information
var Manager = childtickettab.sections.get("Manager");
    var HROperations = Onboarding.sections.get("HR Operations");
    var ITHelpdesk = Onboarding.sections.get("IT-Helpdesk");
    var ITCAM = Onboarding.sections.get("IT-CAM");
    var Admin = Onboarding.sections.get("Admin");
    var EmployeeEngagement = Onboarding.sections.get("Employee Engagement");
    var LearningandDevelopment = Onboarding.sections.get("Learning & Development");
    var EmployeeDevelopment = Onboarding.sections.get("Employee Development");
    var Finance = Onboarding.sections.get("Finance");
    var HROperationsFinalReview = Onboarding.sections.get("HR Operations-Final Review");
    var AuditFinalReview = Onboarding.sections.get("Audit-Final Review");
    var EmploymentAgreement = Onboarding.sections.get("Employment Agreement");
 
    var AdminUS = Onboarding.sections.get("AdminUS");
         var USITCAM = Onboarding.sections.get("Onboardingtab_section_15");           ///Onboardingtab_section_15                                                                  
   var HRBPday1 = Onboarding.sections.get("HRBP Day 1");
    var HRBP = Onboarding.sections.get("HRBP");
    var India = childtickettab.sections.get("India");
    var US = childtickettab.sections.get("US");
    var Legal = Onboarding.sections.get("Legal");
    var ITTeam = Onboarding.sections.get("IT Team");
    var name = formContext.getAttribute("pg_name").getValue();
    var country = formContext.getAttribute("pg_country").getValue();
    childtickettab.setVisible(true);
    Onboardinggeneral.setVisible(false);
    TAOnboarding.setVisible(true);

    HROperations.setVisible(false);
    ITHelpdesk.setVisible(false);
    ITCAM.setVisible(false);
    Admin.setVisible(false);
    EmployeeEngagement.setVisible(false);
    LearningandDevelopment.setVisible(false);
    EmployeeDevelopment.setVisible(false);
    Finance.setVisible(false);
    Legal.setVisible(false);
    ITTeam.setVisible(false);
    //  HRInternalChecklist.setVisible(true);

    var activeProcess = formContext.data.process.getActiveProcess();
    var activeProcessID = activeProcess.getId();
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var dojo =  formContext.getAttribute("pg_dojo").getValue();
 var PGdepartment = formContext.getAttribute('pg_prideglobaldepartment').getValue();
    var PHdepartment = formContext.getAttribute('pg_pridehealthdepartment').getValue();
    var RTdepartment = formContext.getAttribute('pg_russelltobindepartment').getValue();
  var pgaofsubdepartmentjobfamily = formContext.getAttribute('pg_pgaofsubdepartmentjobfamily').getValue();
    var global = formContext.ui.quickForms.get("Global");
    var ratetype =  formContext.getAttribute("pg_ratetype").getValue();
    var prideinbalance =  formContext.getAttribute("pg_prideinbalance").getValue();
    var isthisacandidaterefferral =  formContext.getAttribute("pg_isthisacandidateareferral").getValue();
     var USQFORM = formContext.ui.quickForms.get("US");

 var EmployeeAgreement = formContext.ui.quickForms.get("EmployeeAgreement");//////EmployeeAgreement
    var createform = 1;
    var Type = formContext.ui.getFormType();
    if (Type !=== createform) {
        if (name === null || name.includes("IndiaInternal Onboarding") || name.includes("USInternal Onboarding")) {
            var type = formContext.getAttribute("pg_type").setValue(140310000);
        }
        var type = formContext.getAttribute("pg_type").getSelectedOption().value;/// child tickets
        var country = formContext.getAttribute("pg_country").getValue();
        var status = formContext.getAttribute("statuscode").getValue();

        // if (Name.includes("Internal Onboarding - TA")) {
        if ((type === 140310001 && country === 140310001 && status === 1) || (type === 140310001 && country === 140310001 && status === 140310005)) {
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ////   HRInternalChecklist.setVisible(false);
        }
        else if (type === 140310001 && country === 140310001 && status === 140310001) { 
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ///   HRInternalChecklist.setVisible(false);
        }

        // internal Onboarding - IT CAM
        else if ((type === 140310005 && country === 140310001 && status === 1) || (type === 140310005 && country === 140310001 && status === 140310005)) { /////inprocess
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(true);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);

         //   formContext.getControl("pg_emailaddressdeleted").setVisible(false);//ITCAM
         //   formContext.getControl("pg_removedfromstandarddls").setVisible(false);
           // formContext.getControl("pg_removedfromcustomdls").setVisible(false);
        }
        else if ((type === 140310005 && country === 140310001 && status === 140310003) || (type === 140310005 && country=== 140310001 && status ===140310004) || (type === 140310005 && country === 140310001 && status === 140310001) || (type === 140310005 && country === 140310001 && status === 140310002)) {
            Onboarding.setVisible(true);
            dropchildtickettab.setVisible(false);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(true);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            //  HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_emailaddressgenerated").setVisible(false);//ITCAM
            formContext.getControl("pg_standarddlsadded").setVisible(false);
            formContext.getControl("pg_customdlsadded").setVisible(false);
        }

        // Internal Onboarding - Learning & Development
        else if ((type === 140310006 && country === 140310001 && status === 1) || (type === 140310006 && country === 140310001 && status === 140310005)) {       // inprocess
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(true);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            //  HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_deactivatelmsuseraccount").setVisible(false);//LEARNDEVOP
            formContext.getControl("pg_removefromnewhireinductionbatch").setVisible(false);

        }
        else if ((type === 140310006 && country === 140310001 && status === 140310003) || (type === 140310006 && country === 140310001 && status === 140310004) || (type === 140310006 && country === 140310001 && status === 140310001) || (type === 140310006 && country === 140310001 && status === 140310002)) {
            Onboarding.setVisible(true);
            dropchildtickettab.setVisible(false);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(true);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            //  HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_assignorganizationalstatutorytrainings").setVisible(false);//LEARNDEVOP
            formContext.getControl("pg_completenewhireinduction").setVisible(false);
            formContext.getControl("pg_createlmsuseraccount").setVisible(false);
            formContext.getControl("pg_completedorganizationalstatuarytraining").setVisible(false);
        }

        // Internal Onboarding - IT Helpdesk
        else if ((type === 140310004 && country === 140310001 && status === 1) || (type === 140310004 && country === 140310001 && status === 140310005)) {  // inprocess
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(true);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ///   HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_assetcheckedandcleared").setVisible(false);//ITHELPDESK
            //formContext.getControl("pg_assetinventoryupdatedintrackertool").setVisible(false);
            formContext.getControl("pg_voipdisabled").setVisible(false);
        }
        else if ((type === 140310004 && country === 140310001 && status === 140310003) || (type === 140310004 && country === 140310001 && status === 140310004) || (type === 140310004 && country === 140310001 && status === 140310001) || (type === 140310004 && country === 140310001 && status === 140310002)) {
            Onboarding.setVisible(true);
            dropchildtickettab.setVisible(false);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(true);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ////   HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_assetissued").setVisible(false);//ITHELPDESK
        /////    formContext.getControl("pg_assetagreementissued").setVisible(false);
            // formContext.getControl("pg_assetinventoryupdatedintrackertool").setVisible(false);
            formContext.getControl("pg_emailconfiguredinasset").setVisible(false);
            formContext.getControl("pg_voipenabled").setVisible(false);
            formContext.getControl("pg_intunesetupcompleted").setVisible(false);
        }
        // Internal Onboarding - Admin
        else if ((type === 140310009 && country === 140310001 && status === 1) || (type === 140310009 && country === 140310001 && status === 140310005)) {              //inprocess
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(true);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ///   HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_assetretreival").setVisible(false);
     formContext.getControl("pg_seatingpreferance").setVisible(false);
        }
        else if ((type === 140310009 && country === 140310001 && status === 140310003) || (type === 140310009 && country === 140310001 && status === 140310004) || (type=== 140310009 && country === 140310001 && status === 140310001) || (type === 140310009 && country === 140310001 && status === 140310002)) {
            Onboarding.setVisible(true);
            dropchildtickettab.setVisible(false);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(true);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            /////      HRInternalChecklist.setVisible(false);
  formContext.getControl("pg_assetagreementissued").setVisible(false);
            formContext.getControl("pg_assetshipmentcoordinated").setVisible(false);//ADMIN
            formContext.getControl("pg_assetdeliveredacknowledgementreceived").setVisible(false);
            formContext.getControl("pg_idaccesscardenabled").setVisible(false);
            formContext.getControl("pg_userprofilesetupinbiometric").setVisible(false);
            formContext.getControl("pg_drawerkeyenabled").setVisible(false);
            formContext.getControl("pg_datacarddongleissued").setVisible(false);
            formContext.getControl("pg_mobilephonesimissued").setVisible(false);
            formContext.getControl("pg_medicalinsuranceadditioncompleted").setVisible(false);
            formContext.getControl("pg_cabarrangement").setVisible(false);
        }
        // Internal Onboarding - Employee Development
        else if ((type === 140310007 && country === 140310001 && status === 1) || (type === 140310007 && country === 140310001 && status === 140310005)) {    //inprocess
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(true);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ////    HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_deactivatexyme").setVisible(false);
        }
        else if ((type === 140310007 && country === 140310001 && status === 140310003) || (type === 140310007 && country === 140310001 && status === 140310004) || (type === 140310007 && country === 140310001 && status === 140310001) || (type === 140310007 && country === 140310001 && status === 140310002)) {
            Onboarding.setVisible(true);
            dropchildtickettab.setVisible(false);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(true);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ////    HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_monitorgoalsettingandapproval").setVisible(false);//EMPLOYEDEVEOP
            formContext.getControl("pg_createxyme").setVisible(false);
        }
        // Internal Onboarding - Employee Engagement
        else if ((type === 140310010 && country === 140310001 && status === 1) || (type === 140310010 && country === 140310001 && status === 140310005)) {   // inprocess
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(true);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ////    HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_removenameinmmmsingerslist").setVisible(false);//EMPLOYEENGAGEMENT
            formContext.getControl("pg_deactivatedojostoreprofile").setVisible(false);
        }
        else if ((type === 140310010 && country === 140310001 && status === 140310003) || (type === 140310010 && country === 140310001 && status === 140310004) || (type === 140310010 && country === 140310001 && status === 140310001) || (type === 140310010 && country === 140310001 && status === 140310002)) {
            Onboarding.setVisible(true);
            dropchildtickettab.setVisible(false);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(true);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ////   HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_addnameeinmmmsingerslist").setVisible(false);//EMPLOYEENGAGEMENT
           // formContext.getControl("pg_addnameinweeklynewhireslistsharedwithus").setVisible(false);
            formContext.getControl("pg_deiintetestsurveyshared").setVisible(false);
            formContext.getControl("pg_clashoftitanshouseassigned").setVisible(false);
            formContext.getControl("pg_dojostoreprofilecreated").setVisible(false);
            formContext.getControl("pg_welcometoprideemailshared").setVisible(false);
        }
        // Internal Onboarding - Finance
        else if ((type === 140310008 && country === 140310001 && status === 1) || (type === 140310008 && country === 140310001 && status === 140310005)) {
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(true);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            /////   HRInternalChecklist.setVisible(false);
        }
        else if ((type === 140310008 && country === 140310001 && status === 140310003) || (type === 140310008 && country === 140310001 && status === 140310004) || (type === 140310008 && country === 140310001 && status === 140310001) || (type === 140310008 && country === 140310001 && status === 140310002)) {
  Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(true);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            /////   HRInternalChecklist.setVisible(false);
        }
        //Internal Onboarding - HR Operation
        else if ((type === 140310003 && country === 140310001 && status === 1) || (type === 140310003 && country ===140310001 && status === 140310005)) {     // in process
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);
   
            HROperations.setVisible(true);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ////      HRInternalChecklist.setVisible(false);
            formContext.getControl("pg_spineemployeerecordcreation").setVisible(true);//HROPEARATIONS
           // formContext.getControl("pg_msdemployeerecordcreation").setVisible(false);
            formContext.getControl("pg_spineemployeecodegeneration").setVisible(true);
            formContext.getControl("pg_spineessmsetup").setVisible(false);
            formContext.getControl("pg_onboardingpaperworkcollectedfiled").setVisible(true);
       
            formContext.getControl("pg_updatespineemployeerecordtonotjoined").setVisible(false);
            formContext.getControl("pg_updatemsdemployeerecordtonostart").setVisible(false);
            formContext.getControl("pg_notifybgvvendortostopbgvcheck").setVisible(false);
            formContext.getControl("pg_moveonboardingpaperworktodropoutfolder").setVisible(false);
            formContext.getControl("pg_sendofferrescindmentemailtocandidate").setVisible(false);
        }

        else if ((type === 140310003 && country === 140310001 && status === 140310003) || (type === 140310003 && country === 140310001 && status === 140310004) || (type === 140310003 && country === 140310001 && status === 140310001) || (type === 140310003 && country === 140310001 && status === 140310002)) {
            Onboarding.setVisible(true);
            dropchildtickettab.setVisible(false);
            TAOnboarding.setVisible(false);
   
            HROperations.setVisible(true);
           
            US.setVisible(false);
          
            formContext.getControl("pg_spineemployeerecordcreation").setVisible(false);//HROPEARATIONS
    
            formContext.getControl("pg_spineemployeecodegeneration").setVisible(false);
            formContext.getControl("pg_spineessmsetup").setVisible(false);
            formContext.getControl("pg_onboardingpaperworkcollectedfiled").setVisible(false);
       
        }
      ///HRBP
        else if ((type === 140310014 && country === 140310001 && status === 1) || (type === 140310014 && country === 140310001 && status === 140310005)) {
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);
            HRBP.setVisible(true);
      
       US.setVisible(false);
        }
    ///HRBP
          else if ((type === 140310014 && country === 140310001 && status === 140310003) || (type === 140310014 && country === 140310001 && status === 140310004) || (type === 140310014 && country === 140310001 && status === 140310001) || (type === 140310014 && country === 140310001 && status === 140310002)) {
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);
            HRBP.setVisible(true);
      
       US.setVisible(false);
        }
       ///HRBP day1
        else if ((type === 140310016 && country === 140310001 && status === 1) || (type === 140310016 && country === 140310001 && status === 140310005)) {////employyee engagement
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);
            HRBPday1.setVisible(true);
       
       US.setVisible(false);

        }

        else if ((type === 140310004 && country === 140310000 && status === 1) || (type === 140310004 && country === 140310000 && status === 140310005)) {           // inprocess//////us///ithelpdesk
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);
            ITTeam.setVisible(true);
USITCAM.setVisible(false);
            India.setVisible(false);
Manager.setVisible(false);
 US.setVisible(true);

      formContext.getControl("pg_prideglobaldepartment").setVisible(true);
if(dojo === 140310000){
  global.getControl("pg_prideglobaldepartment").setVisible(true);

}
else if(dojo === 140310005){

  global.getControl("pg_pridehealthdepartment").setVisible(true);
  global.getControl("pg_advisoryservicesdepartment").setVisible(false);

}
else if(dojo === 140310009){
  global.getControl("pg_rocketshippersdepartment").setVisible(true);

}

else if(dojo === 140310001){
  global.getControl("pg_russelltobindepartment").setVisible(true);

}
else if(dojo === 140310003){

  global.getControl("pg_advisoryservicesdepartment").setVisible(false);
  global.getControl("pg_prideonedepartment").setVisible(true);


}
else if(dojo === 140310004){
  global.getControl("pg_pridenowdepartment").setVisible(true);
  global.getControl("pg_prideglobaldepartment").setVisible(false);
 
}
 if(dojo === 140310010 || pgaofsubdepartmentjobfamily===140310008){

  global.getControl("pg_advisoryservicesdepartment").setVisible(true);
  global.getControl("pg_pridenowdepartment").setVisible(false);
}
else{
 global.getControl("pg_advisoryservicesdepartment").setVisible(false);
}
    if (PGdepartment === 140310001) { // if deprtment===AOF
        global.getControl("pg_pgaofsubdepartmentjobfamily").setVisible(true);
    }
    else {
        global.getControl("pg_pgaofsubdepartmentjobfamily").setVisible(false);
    }
    if (PGdepartment === 140310006) { // if deprtment===IT
        global.getControl("pg_pgitsubdepartmentjobfamily").setVisible(true);
    }
    else {
        global.getControl("pg_pgitsubdepartmentjobfamily").setVisible(false);
    }
    if (PHdepartment === 140310000) { // iif pridehealthdeprtment===NATIONAL FULFILLMENT
        global.getControl("pg_phcnationalfulfillmentsubdepartmentjobfam").setVisible(true);
    }
    else {
        global.getControl("pg_phcnationalfulfillmentsubdepartmentjobfam").setVisible(false);
    }
    if (RTdepartment === 140310008) { // iif RTA===SAT EAST
        global.getControl("pg_rtasateastsubdepartmentjobfamily").setVisible(true);
    }
    else {
        global.getControl("pg_rtasateastsubdepartmentjobfamily").setVisible(false);
    }
    if (RTdepartment === 140310003) { // iif RTA===rtae2eprofessionalsubdepartmentjobfamily
        global.getControl("pg_rtae2eprofessionalsubdepartmentjobfamily").setVisible(true);
    }
    else {
        global.getControl("pg_rtae2eprofessionalsubdepartmentjobfamily").setVisible(false);
    }
if(ratetype===1){
     USQFORM.getControl("pg_salary").setVisible(true);
}
else {
        USQFORM.getControl("pg_salary").setVisible(false);
    }
if(ratetype===2){
     USQFORM.getControl("pg_hourlyrate").setVisible(true);
}
else {
        USQFORM.getControl("pg_hourlyrate").setVisible(false);
    }
if(prideinbalance ===true){
     USQFORM.getControl("pg_prideinbalancereason").setVisible(true);
}
else {
        USQFORM.getControl("pg_prideinbalancereason").setVisible(false);
    }
if(isthisacandidaterefferral ===true){
     USQFORM.getControl("pg_refferedby").setVisible(true);
}
else {
        USQFORM.getControl("pg_refferedby").setVisible(false);
    }

        }
  else if ((type === 140310005 && country === 140310000 && status === 1) || (type === 140310005 && country === 140310000 && status === 140310005)) { /////inprocess////itcam
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);
            USITCAM.setVisible(true);
            India.setVisible(false);
        Manager.setVisible(false);
US.setVisible(true);
 
    if (dojo === 140310000) {         ///prideglobal
        formContext.getControl("pg_prideglobaldepartment").setVisible(true);
    }
    else {
        formContext.getControl("pg_prideglobaldepartment").setVisible(false);
    }
    if (dojo === 140310005) {             //pridehealth
        formContext.getControl("pg_pridehealthdepartment").setVisible(true);
  //formContext.getControl("pg_pridehealthdepartment1").setVisible(true);
    }
    else {
        formContext.getControl("pg_pridehealthdepartment").setVisible(false);

    }
    if (dojo === 140310003) {             //prideONE
        formContext.getControl("pg_prideonedepartment").setVisible(true);
    }
    else {
        formContext.getControl("pg_prideonedepartment").setVisible(false);
    }
    if (dojo === 140310004) {             //prideNOW
        formContext.getControl("pg_pridenowdepartment").setVisible(true);
    }
    else {
        formContext.getControl("pg_pridenowdepartment").setVisible(false);
    }
    if (dojo === 140310001) {             //RussellTobin&Associates
        formContext.getControl("pg_russelltobindepartment").setVisible(true);
 
    }
    else {
        formContext.getControl("pg_russelltobindepartment").setVisible(false);

    }
    if (dojo === 140310009) {             //Rocket Shippers
        formContext.getControl("pg_rocketshippersdepartment").setVisible(true);
    }
    else {
        formContext.getControl("pg_rocketshippersdepartment").setVisible(false);
    }
    if (dojo === 140310010 || pgaofsubdepartmentjobfamily === 140310008) {             //Pride Advisory
        formContext.getControl("pg_advisoryservicesdepartment").setVisible(true);
    }
    else {
        formContext.getControl("pg_advisoryservicesdepartment").setVisible(false);
    }
    if (PGdepartment === 140310001) { // if deprtment===AOF
        formContext.getControl("pg_pgaofsubdepartmentjobfamily").setVisible(true);
 
    }
    else {
        formContext.getControl("pg_pgaofsubdepartmentjobfamily").setVisible(false);

    }
    if (PGdepartment === 140310006) { // if deprtment===IT
        formContext.getControl("pg_pgitsubdepartmentjobfamily").setVisible(true);
    }
    else {
        formContext.getControl("pg_pgitsubdepartmentjobfamily").setVisible(false);
    }
    if (PHdepartment === 140310000) { // iif pridehealthdeprtment===NATIONAL FULFILLMENT
        formContext.getControl("pg_phcnationalfulfillmentsubdepartmentjobfam").setVisible(true);
    }
    else {
        formContext.getControl("pg_phcnationalfulfillmentsubdepartmentjobfam").setVisible(false);
    }
    if (RTdepartment === 140310008) { // iif RTA===SAT EAST
        formContext.getControl("pg_rtasateastsubdepartmentjobfamily").setVisible(true);
    }
    else {
        formContext.getControl("pg_rtasateastsubdepartmentjobfamily").setVisible(false);
    }
    if (RTdepartment === 140310003) { // iif RTA===rtae2eprofessionalsubdepartmentjobfamily
        formContext.getControl("pg_rtae2eprofessionalsubdepartmentjobfamily").setVisible(true);
    }
    else {
        formContext.getControl("pg_rtae2eprofessionalsubdepartmentjobfamily").setVisible(false);
    }
        }
        else if ((type === 140310013 && country === 140310000 && status === 1) || (type === 140310013 && country === 140310000 && status === 140310005)) { /////inprocess////EmploymentAgreement
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);
            EmploymentAgreement.setVisible(true);
            India.setVisible(false);

        }
    
        // Internal Onboarding - Admin
        else if ((type === 140310009 && country === 140310000 && status === 1) || (type === 140310009 && country === 140310000 && status === 140310005)) {
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);
            AdminUS.setVisible(true);
            India.setVisible(false);
 
        }
        ////Legal
        else if ((type === 140310012 && country === 140310000 && status === 1) || (type === 140310012 && country === 140310000 && status === 140310005) || (type === 140310012 && country === 140310000 && status === 140310001) || (type === 140310012 && country === 140310000 && status === 140310002)) {           // inprocess//////us
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);
            Legal.setVisible(true);
          ITTeam.setVisible(false);
USITCAM.setVisible(false);
  Manager.setVisible(false);
            India.setVisible(false);
US.setVisible(true);
if(ratetype===1){
     USQFORM.getControl("pg_salary").setVisible(true);
EmployeeAgreement.getControl("pg_salary").setVisible(true);
}
else {
        USQFORM.getControl("pg_salary").setVisible(false);
EmployeeAgreement.getControl("pg_salary").setVisible(false);
    }
if(ratetype===2){
     USQFORM.getControl("pg_hourlyrate").setVisible(true);
EmployeeAgreement.getControl("pg_hourlyrate").setVisible(true);
}
else {
        USQFORM.getControl("pg_hourlyrate").setVisible(false);
EmployeeAgreement.getControl("pg_hourlyrate").setVisible(false);
    }
if(prideinbalance ===true){
     USQFORM.getControl("pg_prideinbalancereason").setVisible(true);
}
else {
        USQFORM.getControl("pg_prideinbalancereason").setVisible(false);
    }
if(isthisacandidaterefferral ===true){
     USQFORM.getControl("pg_refferedby").setVisible(true);
}
else {
        USQFORM.getControl("pg_refferedby").setVisible(false);
    }    
    }

  
   
        // Internal Onboarding - Audit
        else if ((type === 140310011 && country === 140310001 && status === 1) || (type === 140310011 && country === 140310001 && status === 140310005)) {
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ////  HRInternalChecklist.setVisible(false);
        }
        else if (type === 140310011 && country === 140310001 && status === 140310001) {
            Onboarding.setVisible(true);
            childtickettab.setVisible(true);
            TAOnboarding.setVisible(false);

            HROperations.setVisible(false);
            ITHelpdesk.setVisible(false);
            ITCAM.setVisible(false);
            Admin.setVisible(false);
            EmployeeEngagement.setVisible(false);
            LearningandDevelopment.setVisible(false);
            EmployeeDevelopment.setVisible(false);
            Finance.setVisible(false);
            Legal.setVisible(false);
            ITTeam.setVisible(false);
            US.setVisible(false);
            ////  HRInternalChecklist.setVisible(false);
        }

        if (type === 140310000) {
            Onboarding.setVisible(false);
        }
        var Country = formContext.getAttribute("pg_country").getText();
        var typename = formContext.getAttribute("pg_type").getText();
        var valueCountry = formContext.getAttribute("pg_country").getValue();
   var lastname = formContext.getAttribute("pg_lastname").getValue();
        var firstname = formContext.getAttribute("pg_firstname").getValue();
 var Middlename = "";
if( formContext.getAttribute("pg_middlename").getValue()===null){
var Middlename="";

}
    else {
        var Middlename = formContext.getAttribute("pg_middlename").getValue();
    }
    
    var status = formContext.getAttribute("statuscode").getSelectedOption().value;
    if (status === 140310001 && type !=== 140310000 || status === 140310002 || status === 140310003 || status === 140310005 && valueCountry !=== 140310000 || status === 140310004 && valueCountry !=== 140310000 || status === 1 && type !=== 140310000 || status === 1 && type !=== 140310005 && valueCountry !=== 140310000 || status === 1 && type !=== 140310004 && valueCountry !=== 140310000) {
        var Name = Country + " - " + "Internal Onboarding - " + typename + " - " + firstname + "  " + lastname + "  " + Middlename;
        var formName = formContext.getAttribute("pg_name").setValue(Name);
    }
    else if (type === 140310000 && valueCountry !=== 140310001) {
        var Name = Country + " - " + "Internal Onboarding - " + firstname + "  " + lastname + "  " + Middlename;
        var formName = formContext.getAttribute("pg_name").setValue(Name);
    }
    else if (type === 140310000 && valueCountry !=== 140310000) {
        var Name = Country + " - " + "Internal Onboarding - " + firstname + "  " + lastname;
        var formName = formContext.getAttribute("pg_name").setValue(Name);
    }
    else if (status === 1 && type !=== 140310005 || status === 140310005 && valueCountry === 140310000) {
        var Name = Country + " - " + "Internal Onboarding - " + typename + " - " + firstname + "  " + lastname;
        var formName = formContext.getAttribute("pg_name").setValue(Name);
    }
    else {
        var Name = Country + " - " + "Internal Onboarding - " + firstname + "  " + lastname + "  " + Middlename;
        var formName = formContext.getAttribute("pg_name").setValue(Name);
    }
    
    if (status === 1 && type === 140310004 && valueCountry === 140310000 || status === 140310005 && type === 140310004 && valueCountry === 140310000 || status === 1 && type === 140310005 && valueCountry === 140310000 || status === 140310005 && type === 140310005 && valueCountry === 140310000) {
        var Name = Country + " - " + "Internal Onboarding - " + typename + " - " + firstname + "  " + lastname;
        var formName = formContext.getAttribute("pg_name").setValue(Name);
    }
    
    if (status === 1 && type === 140310012 && valueCountry === 140310000 || status === 140310005 && type === 140310012 && valueCountry === 140310000 || status === 1 && type === 140310005 && valueCountry === 140310000 || status === 140310005 && type === 140310005 && valueCountry === 140310000) {
        var Name = Country + " - " + "Internal Onboarding - " + typename + " - " + firstname + "  " + lastname;
        var formName = formContext.getAttribute("pg_name").setValue(Name);
    }
    



    }
}

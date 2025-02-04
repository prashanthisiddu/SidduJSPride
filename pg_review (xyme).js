function GetandSetCountry(context) {
    var formcontext = context.getFormContext();
    try {
        var emailaddress = formcontext.getAttribute("emailaddress").getValue();

        if (!emailaddress) {
            return; 
        }

        var lowercaseEmail = emailaddress.toLowerCase();

        Xrm.WebApi.online.retrieveMultipleRecords(
            "cdm_worker", 
            `?$select=pg_country&$filter=cdm_primaryemailaddress eq '${lowercaseEmail}'`
        ).then(
            function success(results) {
                if (results.entities.length > 0) {
                    var pg_country = results.entities[0]["pg_country"]; 
                    formcontext.getAttribute("pg_country").setValue(pg_country); // Set country field
                } else {
                    console.log("No matching worker found for the provided email address.");
                }
            },
            function(error) {
                console.error("Error retrieving data: " + error.message); // Log errors
            }
        );
    } catch (error) {
        console.error("Unexpected error: " + error.message); // Log unexpected errors
    }
}



function onloadsetCurrentstatuspending(context) {
    var formContext = context.getFormContext();
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    formContext.ui.refreshRibbon();

    var currentstatus = formContext.data.process.getActiveStage().getId();
   // var currentstatusId = formContext.getAttribute("pg_currentstatus").getId();
//'3e6f500c-fa14-4a53-b8ea-a80c0c5a9cb4'==45DAYS
if(currentstatus=='3e6f500c-fa14-4a53-b8ea-a80c0c5a9cb4'){
    formContext.getAttribute("pg_45days").setValue(140310001);
    formContext.getAttribute("pg_currentstatus").setValue(140310005);
}
}



function PIBshowandhide(primaryControl) {
  debugger;
  try {
    formcontext = primaryControl;
    var currentstatus = formcontext.getAttribute("pg_currentstatus").getValue();
    var performance = formcontext.getAttribute("pg_performanceperiod").getValue();
    var anivarsary=null;
    var Q1 = performance.split('-');
    var Quater = Q1[0];
    var yearsomex = Q1[1];
    var Qua1 = "1-jan";
    var dt1 = Qua1.split('-');
    var day1 = dt1[0];
    var month1 = dt1[1].toLocaleLowerCase();
    var year1 = yearsomex;
    var QuaterQ1 = year1 + "-" + month1 + "-" + day1;
    enddateforQ1 = new Date(QuaterQ1.replace(/-/g, "/"));

    var enddateforQ2 = new Date();
    var Qua2 = "1-apr";
    var dt2 = Qua2.split('-');
    var day2 = dt2[0];
    var month2 = dt2[1].toLocaleLowerCase();
    var year2 = yearsomex;
    var QuaterQ2 = year2 + "-" + month2 + "-" + day2;
    enddateforQ2 = new Date(QuaterQ2.replace(/-/g, "/"));
    var enddateforQ3 = new Date();
    var Qua3 = "1-jul";
    var dt3 = Qua3.split('-');
    var day3 = dt3[0];
    var month3 = dt3[1].toLocaleLowerCase();
    var year3 = yearsomex;
    var QuaterQ3 = year3 + "-" + month3 + "-" + day3;
    enddateforQ3 = new Date(QuaterQ3.replace(/-/g, "/"));
    var enddateforQ4 = new Date();
    var Qua4 = "1-oct";
    var dt4 = Qua4.split('-');
    var day4 = dt4[0];
    var month4 = dt4[1].toLocaleLowerCase();
    var year4 = yearsomex;
    var QuaterQ4 = year4 + "-" + month4 + "-" + day4;
    enddateforQ4 = new Date(QuaterQ4.replace(/-/g, "/"));

    var quaterenddate = {};
    if (Quater == "Q4") {
      var quaterenddate = enddateforQ4;
    }
    else if (Quater == "Q3") {
      var quaterenddate = enddateforQ3;
    }
    else if (Quater == "Q2") {
      quaterenddate = enddateforQ2;
    }
    else if (Quater == "Q1") {
      quaterenddate = enddateforQ1;
    }
    var workerreviewid = formcontext.getAttribute("pg_workerreviewid").getValue()[0].id;

    Xrm.WebApi.online.retrieveRecord("cdm_worker", workerreviewid, "?$select=cdm_anniversarydatetime").then(
      function success(result) {
        var cdm_anniversarydatetime = result["cdm_anniversarydatetime"];
         anivarsary = new Date(cdm_anniversarydatetime);         
              },
      function (error) {
        console.log(error.message);
      }
    );
    if (quaterenddate > anivarsary && currentstatus == 140310004) {
      return true;
    }
  //  else if(quaterenddate < anivarsary && currentstatus != 140310004){
    //  return false;
  //  }
    else {
      return false;
    }

  }

  catch (err) {
  }

}




function ribbonmsg(primarycontrol) {
    var formContext = primarycontrol;
    var reviewId = primarycontrol.data.entity.getId();
    reviewId = reviewId.replace("{", "").replace("}", "");
    if (formContext.ui.getFormType() == 1) {
        var pageInput = {
            pageType: "entityrecord",
            entityName: "pg_prideinbalance",
            entityId: primarycontrol.getAttribute("pg_pib").getValue()[0].id,
            createFromEntity: createFrom
        };

        var navigationOption = {
            target: 2,
            height: { value: 70, unit: "%" },
            width: { value: 50, unit: "%" },
            position: 1
        };

        Xrm.Navigation.navigateTo(pageInput, navigationOption).then(
            function success() {


                console.log("Success");
            },
            function error() {
                console.log("Failed");
            }
        );

    }
    else {
        var createFrom = {
            entityType: "new_employee",
            id: reviewId
        };

        var pageInput = {
            pageType: "entityrecord",
            entityName: "pg_prideinbalance",
            createFromEntity: createFrom
        };

        var navigationOption = {
            target: 2,
            height: { value: 70, unit: "%" },
            width: { value: 50, unit: "%" },
            position: 1
        };

        Xrm.Navigation.navigateTo(pageInput, navigationOption).then(
            function success() {


                console.log("Success");
            },
            function error() {
                console.log("Failed");
            }
        );

    }

}





function setalert(context) {
    debugger;
    var formContext = context.getFormContext();
 var name = formContext.getAttribute("new_name").getValue();
    var leave = formContext.getAttribute("pg_leave").getValue();
 if (leave != 1) {
      // formContext.data.entity.save();
    var confirmStrings = { text: "Do you want to deactivate the review for the Quarter?" ,confirmButtonLabel: "Yes", cancelButtonLabel: "No" };
    var confirmOptions = { height: 250, width: 300 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed)
             {
 
               // formContext.getAttribute("statecode").setValue(1);
               // formContext.getAttribute("statuscode").setValue(2);
                     var recordId = formContext.data.entity.getId();
                     formContext.data.entity.save();

                  var workflowId = "61da8d7c-3a31-49f7-b82f-80373ad596dc";
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
                                formContext.data.entity.save();
                               // formContext.data.ui.close();
                            } else {
                                //error callback
                            }
                        }
                    };
            
                    req.send(JSON.stringify(data));
                }
            
           else {      
            }
        });
   
    }
}





/*
 * function moveToManager(primarycontrol) {
    var txt;
    var r = confirm("Submit for Review?");
    if (r == true) {
        if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310000) {
            primarycontrol.getAttribute("pg_currentstatus").setValue(140310001);
            primarycontrol.data.refresh(true).then();
        }
    }
}
*/

function onload(context) {

    var formContext = context.getFormContext();
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    var userId = usersettings.userId;
    var ownerId = formContext.getAttribute("ownerid").getValue()[0].id;
    //var selfassessment = formContext.ui.tabs.get("tab_3");
    var managerassessment = formContext.ui.tabs.get("tab_4");
    var performanceweights = formContext.ui.tabs.get("tab_5");
    var currentstatus = formContext.getAttribute("pg_currentstatus").getValue();

    if (formContext.ui.getFormType() == 1) {
        formContext.getAttribute("pg_reviewtype").setValue("XYME");
        formContext.getAttribute("pg_performanceperiod").setValue("Q4-2021");
    }

/*
    if (userId != ownerId) {
        //selfassessment.setVisible(true);
        managerassessment.setVisible(true);
        performanceweights.setVisible(true);
    }
*/
    else if (userId == ownerId) {
        //selfassessment.setVisible(true);
    }

    if (formContext.getAttribute("pg_megacity").getValue() == true) {
        var GoalTab = formContext.ui.tabs.get("Goals");
        var YGoalSection = GoalTab.sections.get("Goals_section_2");
        var MeGoalSection = GoalTab.sections.get("Goals_section_3");

        YGoalSection.setVisible(false);
        MeGoalSection.setVisible(false);
    }

}

function onloadAdmin(context) {
    var formContext = context.getFormContext();
    formContext.getControl("pg_currentstatus").setDisabled(false);
    formContext.getControl("pg_30days").setDisabled(false);
formContext.getControl("pg_45days").setDisabled(false);
    formContext.getControl("pg_60days").setDisabled(false);
    formContext.getControl("pg_finalreview").setDisabled(false);
    formContext.getControl("pg_manager").setDisabled(false);
}

function onloadReview(context) {
    var formContext = context.getFormContext();
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    formContext.ui.refreshRibbon();

    var currentstatus = formContext.getAttribute("pg_currentstatus").getValue();

    if (currentstatus == 140310001 && (usersettings.userId == formContext.getAttribute("ownerid").getValue()[0].id)) {
        formContext.getControl("WebResource_SystemReviewSubmitted").setVisible(true);
    }
    else if (currentstatus == 140310002 && formContext.getAttribute("pg_30days").getValue() == 140310000) {
        formContext.getControl("WebResource_SystemReviewSubmitted").setVisible(false);
        formContext.getControl("WebResource_System30day").setVisible(true);
        formContext.getControl("WebResource_System60day").setVisible(false);
        formContext.getControl("WebResource_System90days").setVisible(false);
        formContext.getControl("WebResource_SystemFinalizeReview").setVisible(false);
    }
    else if (currentstatus == 140310003 && formContext.getAttribute("pg_60days").getValue() == 140310000) {
        formContext.getControl("WebResource_SystemReviewSubmitted").setVisible(false);
        formContext.getControl("WebResource_System30day").setVisible(false);
        formContext.getControl("WebResource_System60day").setVisible(true);
        formContext.getControl("WebResource_System90days").setVisible(false);
        formContext.getControl("WebResource_SystemFinalizeReview").setVisible(false);
    }
    else if (currentstatus == 140310004 && formContext.getAttribute("pg_finalreview").getValue() == 140310000) {
        formContext.getControl("WebResource_SystemReviewSubmitted").setVisible(false);
        formContext.getControl("WebResource_System30day").setVisible(false);
        formContext.getControl("WebResource_System60day").setVisible(false);
        formContext.getControl("WebResource_System90days").setVisible(true);
        formContext.getControl("WebResource_SystemFinalizeReview").setVisible(false);
    }
    else if (currentstatus == 140310004 && formContext.getAttribute("pg_finalreview").getValue() == 140310002) {
        formContext.getControl("WebResource_SystemReviewSubmitted").setVisible(false);
        formContext.getControl("WebResource_System30day").setVisible(false);
        formContext.getControl("WebResource_System60day").setVisible(false);
        formContext.getControl("WebResource_System90days").setVisible(false);
        formContext.getControl("WebResource_SystemFinalizeReview").setVisible(true);
    }
    else {
        formContext.getControl("WebResource_SystemReviewSubmitted").setVisible(false);
        formContext.getControl("WebResource_System30day").setVisible(false);
        formContext.getControl("WebResource_System60day").setVisible(false);
        formContext.getControl("WebResource_System90days").setVisible(false);
        formContext.getControl("WebResource_SystemFinalizeReview").setVisible(false);
    }
//showandhide(context);
}

//Initial Stage - Only Employee
function enableApprove(primarycontrol) {
    var formContext = primarycontrol;
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentstage = formContext.getAttribute("pg_currentstatus").getValue();
    //var currentstage = formContext.data.process.getActiveStage().getName();

    //if ((usersettings.userId != formContext.getAttribute("ownerid").getValue()[0].id) && currentstage == "Initial Review") {
    if ((usersettings.userId == formContext.getAttribute("ownerid").getValue()[0].id) && currentstage == 140310000) {
        return true;
    }
    else {
        return false;
    }
}

//Manager Stage
function enableManagerApproval(primarycontrol) {
    var formContext = primarycontrol;
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentstage = formContext.getAttribute("pg_currentstatus").getValue();
    //var currentstage = formContext.data.process.getActiveStage().getName();

    //if ((usersettings.userId != formContext.getAttribute("ownerid").getValue()[0].id) && currentstage == "Manager Review") {
    if ((usersettings.userId == formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage == 140310001) {
        return true;
    }
    else {
        return false;
    }
}

//30 Day
function enable30Approval(primarycontrol) {
    var formContext = primarycontrol;
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentstage = formContext.getAttribute("pg_currentstatus").getValue();
    //var currentstage = formContext.data.process.getActiveStage().getName();

    //if ((usersettings.userId != formContext.getAttribute("ownerid").getValue()[0].id) && currentstage == "30 Day Check In") {
    if ((usersettings.userId == formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage == 140310002 && formContext.getAttribute("pg_30days").getValue() == 140310001) {
        return true;
    }
    else {
        return false;
    }
}

//45 Day
function enable45Approval(primarycontrol) {
    var formContext = primarycontrol;
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentstage = formContext.getAttribute("pg_currentstatus").getValue();
    //var currentstage = formContext.data.process.getActiveStage().getName();

    //if ((usersettings.userId != formContext.getAttribute("ownerid").getValue()[0].id) && currentstage == "45 Day Check In") {
    if ((usersettings.userId == formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage == 140310005 && formContext.getAttribute("pg_45days").getValue() == 140310001) {
        return true;
    }
    else {
        return false;
    }
}

//60 Day
function enable60Approval(primarycontrol) {
    var formContext = primarycontrol;
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentstage = formContext.getAttribute("pg_currentstatus").getValue();
    //var currentstage = formContext.data.process.getActiveStage().getName();

    //if ((usersettings.userId != formContext.getAttribute("ownerid").getValue()[0].id) && currentstage == "60 Day Check In") {
    if ((usersettings.userId == formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage == 140310003 && formContext.getAttribute("pg_60days").getValue() == 140310001) {
        return true;
    }
    else {
        return false;
    }
}

//Finalize
function enable90Approval(primarycontrol) {
    var formContext = primarycontrol;
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentstage = formContext.getAttribute("pg_currentstatus").getValue();
    //var currentstage = formContext.data.process.getActiveStage().getName();

    //if ((usersettings.userId != formContext.getAttribute("ownerid").getValue()[0].id) && currentstage == "90 Day / Finalize Review") {
    if ((usersettings.userId == formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage == 140310004 && formContext.getAttribute("pg_finalreview").getValue() == 140310001) {
        return true;
    }
    else {
        return false;
    }
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

/*
function moveToManager(primarycontrol) {
    var txt;
    var r = confirm("Submit for Review?");
    if (r == true) {
        if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310000) {

            primarycontrol.getControl("WebResource_SystemReviewSubmitted").setVisible(true);
            primarycontrol.getAttribute("pg_currentstatus").setValue(140310001);
            primarycontrol.data.save().then(function () {primarycontrol.data.refresh(false);});
        }
    }
}
*/

function moveToManager(primarycontrol) {
    var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Submit for Review?", title: "Confirmation" };
    var confirmOptions = { height: 200, width: 300 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
        if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310000 && success.confirmed) {
            try {
                primarycontrol.getControl("WebResource_SystemReviewSubmitted").setVisible(true);
            }
            catch {

            }
            primarycontrol.getAttribute("pg_currentstatus").setValue(140310001);
            primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
        }
    });
}

function moveTo30(primarycontrol) {
var bpfcheck = primarycontrol.getAttribute("pg_bpfcheck").getValue();
    var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Approve Review?", title: "Confirmation" };
    var confirmOptions = { height: 200, width: 300 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
        if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310001 && success.confirmed) {
            try {
                primarycontrol.getControl("WebResource_System30day").setVisible(true);
            }
            catch {

            }
            if (bpfcheck) {
                primarycontrol.getAttribute("pg_currentstatus").setValue(140310005);
                primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
            }
            else {
                primarycontrol.getAttribute("pg_currentstatus").setValue(140310002);
                primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
            }
        }
    });
}

/*
function moveTo60(primarycontrol) {
    var txt;
    var r = confirm("Complete 30 Day Check In?");
    if (r == true) {
        if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310002) {
            primarycontrol.getAttribute("pg_30days").setValue(140310002);
            primarycontrol.getControl("WebResource_System60day").setVisible(true);
            primarycontrol.getAttribute("pg_currentstatus").setValue(140310003);
            primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
        }
    }

}
*/

function moveTo60(primarycontrol) {
    var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Complete 30 Day Check In?", title: "Confirmation" };
    var confirmOptions = { height: 200, width: 300 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
        if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310002 && success.confirmed) {
            primarycontrol.getAttribute("pg_30days").setValue(140310002);
            try {
                primarycontrol.getControl("WebResource_System60day").setVisible(true);
            }
            catch {

            }
            primarycontrol.getAttribute("pg_currentstatus").setValue(140310003);
            primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
        }
    });
}

/*
function moveTo90(primarycontrol) {
    var txt;
    var r = confirm("Complete 60 Day Check In?");
    if (r == true) {
        if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310003) {
            primarycontrol.getControl("WebResource_System90days").setVisible(true);
            primarycontrol.getAttribute("pg_currentstatus").setValue(140310004);
            primarycontrol.getAttribute("pg_60days").setValue(140310002);
            primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
        }
    }
}
*/

function moveTo90(primarycontrol) {
    //var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Complete 60 Day Check In?", title: "Confirmation" };
    var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Complete Check In?", title: "Confirmation" };
    var confirmOptions = { height: 200, width: 300 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
        if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310003 && success.confirmed) {
            try {
                primarycontrol.getControl("WebResource_System90days").setVisible(true);
            }
            catch {

            }
            primarycontrol.getAttribute("pg_currentstatus").setValue(140310004);
            primarycontrol.getAttribute("pg_60days").setValue(140310002);
  primarycontrol.getAttribute("pg_finalreview").setValue(140310001);
            primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
        }
        else if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310005 && success.confirmed) {
            try {
                primarycontrol.getControl("WebResource_System90days").setVisible(true);
            }
            catch {

            }
            primarycontrol.getAttribute("pg_currentstatus").setValue(140310004);
            primarycontrol.getAttribute("pg_45days").setValue(140310002);
    primarycontrol.getAttribute("pg_finalreview").setValue(140310001);

            primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
        }
    });
}
/*
function finalize(primarycontrol) {
    var txt;
    var r = confirm("Finalize Review?");
    if (r == true) {
        if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310004) {
            primarycontrol.getControl("WebResource_SystemFinalizeReview").setVisible(true);
            //primarycontrol.getAttribute("pg_currentstatus").setValue(140310004);
            primarycontrol.getAttribute("pg_finalreview").setValue(140310002);
            primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
        }
    }

}
*/

function finalize(primarycontrol) {
    var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Finalize Review?", title: "Confirmation" };
    var confirmOptions = { height: 200, width: 300 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
        if (primarycontrol.getAttribute("pg_currentstatus").getValue() == 140310004 && success.confirmed) {
            try {
                primarycontrol.getControl("WebResource_SystemFinalizeReview").setVisible(true);
            }
            catch {

            }
            //primarycontrol.getAttribute("pg_currentstatus").setValue(140310004);
            primarycontrol.getAttribute("pg_finalreview").setValue(140310002);
            primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
        }
    });
}

function checkUser(context) {
    var formContext = context.getFormContext();
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentstage = formContext.getAttribute("pg_currentstatus").getValue();

    if ((usersettings.userId == formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage == 140310004) {
        formContext.getControl("pg_xgoalrating").setVisible(true);
        formContext.getControl("pg_ygoalrating").setVisible(true);
    }
    else {
        formContext.getControl("pg_xgoalrating").setVisible(false);
        formContext.getControl("pg_ygoalrating").setVisible(false);
    }
}

function onloadSubgrid(context) {
    var formContext = context.getFormContext();
    if (formContext != null) {
        var usersettings = Xrm.Utility.getGlobalContext().userSettings;
        var currentstage = formContext.getAttribute("pg_currentstatus").getValue();

        if ((usersettings.userId == formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage == 140310004) {
            var viewSelector = formContext.getControl("X_Goals").getViewSelector();
            var managerView = {
                entityType: 1039,
                id: "1B89B23B-73B7-EC11-983F-002248283872",
                name: "Active X Goal - M"
            }
            viewSelector.setCurrentView(managerView);
        }
    }
}


function getJobType(context) {

    var formContext = context.getFormContext();

    try {
        //Get Owner ID and get Worker Email
        var owner = formContext.getAttribute("ownerid");
        var worker = formContext.getAttribute("pg_workerreviewid");
        var ownerid = owner.getValue()[0].id;
        var GoalTab = formContext.ui.tabs.get("Goals");
        var XGoalSectionManager = GoalTab.sections.get("Goals_section_5");
        var XGoalSection = GoalTab.sections.get("tab_2_section_1");
        var YGoalSectionManager = GoalTab.sections.get("Goals_section_6");
        var YGoalSection = GoalTab.sections.get("Goals_section_2");
        var currentstatus = formContext.getAttribute("pg_currentstatus").getValue();
        var usersettings = Xrm.Utility.getGlobalContext().userSettings;

        Xrm.WebApi.online.retrieveMultipleRecords("cdm_positionworkerassignmentmap", "?$filter=(_cdm_workerid_value eq " + worker.getValue()[0].id + " and cdm_JobPositionId/_cdm_jobid_value eq 8e23bb42-308b-eb11-a812-000d3a9d9a7b)&$top=1").then(
            function success(results) {
                console.log(results);
                if (results.entities.length == 0 && currentstatus == 140310004 && usersettings.userId == formContext.getAttribute("pg_manager").getValue()[0].id) {
                    Xrm.WebApi.online.retrieveRecord("cdm_worker", worker.getValue()[0].id, "?$select=cdm_employeeid_custom").then(
                        function success(result) {
                            console.log(result);
                            // Columns
                            var cdm_workerid = result["cdm_workerid"]; // Guid
                            var cdm_employeeid_custom = result["cdm_employeeid_custom"]; // Text
                            if (cdm_employeeid_custom == null) {
alert(cdm_employeeid_custom);
                                XGoalSectionManager.setVisible(true);
                                XGoalSection.setVisible(false);
                                YGoalSectionManager.setVisible(true);
                                YGoalSection.setVisible(false);
                            }
                        },
                        function (error) {
                            console.log(error.message);
                        }
                    );
                }
                else {
                    XGoalSectionManager.setVisible(false);
                    XGoalSection.setVisible(true);
                    YGoalSectionManager.setVisible(false);
                    YGoalSection.setVisible(true);
                }
            },
            function (error) {
                console.log(error.message);
            }
        );
    }
    catch {
    }
}

function loadManagerTab(context) {
    formContext = context.getFormContext();
    var GoalTab = formContext.ui.tabs.get("ManagerTab");
    var BellCurveTab = formContext.ui.tabs.get("BellCurve");
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentstage = formContext.getAttribute("pg_currentstatus").getValue();
    var ownerId = formContext.getAttribute("ownerid").getValue()[0].id;

    if ((usersettings.userId != ownerId) && currentstage == 140310004 && formContext.getAttribute("pg_finalreview").getValue() != 140310000) {
        GoalTab.setVisible(true);
        BellCurveTab.setVisible(true);
        formContext.getAttribute("pg_managerrating").setRequiredLevel("required");
    }
    else {
        formContext.getAttribute("pg_managerrating").setRequiredLevel("none");
    }
formContext.getAttribute("pg_managerrating").addOnChange(showandhide);
}

function showandhide(context) {
debugger;
    var formContext = context.getFormContext();
    var managerrating = formContext.getAttribute("pg_managerrating").getValue();
    var currentrating = formContext.getAttribute("pg_currentaverage").getValue();
    if (managerrating == currentrating  || managerrating == null) {
        formContext.getControl("pg_newratingcomments").setVisible(false);
        formContext.getAttribute("pg_newratingcomments").setRequiredLevel("none");
    }
    else {
        formContext.getControl("pg_newratingcomments").setVisible(true);
        formContext.getAttribute("pg_newratingcomments").setRequiredLevel("required");
    }
}

function webr_onload(context) {
    var formContext = context.getFormContext();
    var wrControl = formContext.getControl("WebResource_bellcurve");
    if (wrControl) {
        wrControl.getContentWindow().then(function (contentWindow) {
            contentWindow.setClientApiContext(Xrm, formContext);
        }
            )
    }
}
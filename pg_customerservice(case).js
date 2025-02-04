function Onresolveselect(primaryControl) {
    debugger;
    var formContext = primaryControl;
 var applicationselect = formContext.getAttribute("pg_application").getValue();
if (applicationselect === 140310025 || applicationselect === 140310026) {
    formContext.getAttribute("pg_subcategory").setRequiredLevel("required");
} else {
    formContext.getAttribute("pg_subcategory").setRequiredLevel("none"); // Remove required if condition not met
}
if (applicationselect === 140310013) {
    formContext.getAttribute("pg_dynamicssupportissue").setRequiredLevel("required");
} else {
    formContext.getAttribute("pg_dynamicssupportissue").setRequiredLevel("none"); // Remove required if condition not met
}
if (applicationselect === 637090001) {
    formContext.getAttribute("pg_verificationcategory").setRequiredLevel("required");
} else {
    formContext.getAttribute("pg_verificationcategory").setRequiredLevel("none"); // Remove required if condition not met
}
}

 
function ONBOBPFStageChange(context) {
    debugger;
    var formContext = context.getFormContext();
    formContext.data.process.addOnStageChange(ONBOTabChangesonBPFStage);
    ONBOTabChangesonBPFStage(context);
}

function ONBOTabChangesonBPFStage(context) {
    var formContext = context.getFormContext();
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId(); 
    var stageMappings = {
     
      "15322a8f-67b8-47fb-8763-13a28686c29d": 1, // Identify
    "92a6721b-d465-4d36-aef7-e8822d7a5a6a": 2, // Research
    "319d3a60-c254-47d8-8e0c-e8fa2ce2b2cf": 3, // Team Review
    "c7cd1436-ad49-44ff-8e96-63ada4467489": 4, // Planning / Implementation
    "b42337ee-73d7-4093-a311-e9661d47a966": 5, // Rollout
    "45e13ad7-ff3b-40bc-9b33-cd3a06f0d0a5": 6, // Verification
    "356ecd08-43c3-4585-ae94-6053984bc0a9": 7, // Resolved
    "9a0b88ad-f59b-470b-94ba-dee77d188763": 13, // Process Check (Audit) 
    "1dd9ae9a-8e42-455e-8414-216bfd02bc5c":12   //"Benefit Evaluation /Implementation",
    };
    if (stageMappings[stageId] !== undefined) {
        formContext.getAttribute("pg_currentstage").setValue(stageMappings[stageId]);
    }
}


function LockallFields(executionContext) {
    var formContext = executionContext.getFormContext();
    if (formContext.data.entity.getId()) {
      
        formContext.ui.controls.forEach(function (control) {
            if (control.getControlType() === "standard" || control.getControlType() === "lookup" || control.getControlType() === "optionset") {
                control.setDisabled(true);
            }
        });
    }
}



function filterApplicationOptions(executionContext) {
    var formContext = executionContext.getFormContext();
    var functionOptionSetValues = formContext.getAttribute("pg_function").getValue(); 
    var applicationOptionSetValues = formContext.getControl("pg_application"); 

    
    applicationOptionSetValues.clearOptions();
    formContext.getAttribute("pg_application").setValue(null);
    
    var allOptions = formContext.getAttribute("pg_application").getOptions();
      
    var opsSupportValues = [140310004, 140310018, 140310016, 140310011, 140310001, 140310002, 140310023, 140310007, 140310005, 140310006, 140310012, 140310008, 140310022, 140310021, 140310017];
    var techValues = [140310010, 140310013, 140310009, 140310014, 140310003, 10, 140310024, 140310025, 140310026, 140310027, 140310000, 140310015, 140310028, 140310020];
   
    if (functionOptionSetValues === 140310000) { // Ops Support
        allOptions.forEach(function (option) {
            if (opsSupportValues.includes(option.value)) {
                applicationOptionSetValues.addOption(option);
            }
        });
    } else if (functionOptionSetValues === 140310001) { // Technology
        allOptions.forEach(function (option) {
            if (techValues.includes(option.value)) {
                applicationOptionSetValues.addOption(option);
            }
        });
    }
}

function onApplicationChange(executionContext) {
    var formContext = executionContext.getFormContext();
    var categoryField = formContext.getAttribute("pg_Subject");

    if (categoryField) {
        categoryField.setValue(null);
    }
}

function onBusinessChange(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getAttribute("pg_application").setValue(null);

    filterApplicationOptions(executionContext);
}

function GetandSetSubCategory(context) {
    var formContext = context.getFormContext();
    var title = formContext.getAttribute("title").getValue();
    var ticketnumber = formContext.getAttribute("ticketnumber").getValue();

    var escapedTitle = title ? title.replace(/'/g, "''") : "";
    

    var filter = "?$select=pg_subcategory,pg_clientoperationsubcategory&$filter=pg_name eq '" + escapedTitle + "' and pg_casenumber eq '" + ticketnumber + "'";

    Xrm.WebApi.online.retrieveMultipleRecords("pg_supportticket", filter).then(
        function success(results) {
            if (results.entities.length > 0) {
                var pg_subcategory = results.entities[0]["pg_subcategory"];
                var pg_clientoperationsubcategory = results.entities[0]["pg_clientoperationsubcategory"];
                formContext.getAttribute("pg_subcategory").setValue(pg_subcategory);
                if (pg_clientoperationsubcategory) {
                    if (pg_clientoperationsubcategory.includes(",")) {
                        let operationSubcategory = pg_clientoperationsubcategory.split(",").map(Number);
                        formContext.getAttribute("pg_clientoperationsubcategory").setValue(operationSubcategory);
                    } else {
                        formContext.getAttribute("pg_clientoperationsubcategory").setValue([Number(pg_clientoperationsubcategory)]);
                    }
                } else {
                    formContext.getAttribute("pg_clientoperationsubcategory").setValue(null);
                }
            } else {
                console.log("No records found for the provided criteria.");
            }
        },
        function (error) {
            console.error("Error retrieving records:", error.message);
          
        }
    );
}


function SubCategoryinSupportTicket(context) {
    debugger;
    var formContext = context.getFormContext();
    var applicationselect = formContext.getAttribute("pg_application").getValue();
    var subjectSelect = formContext.getAttribute("pg_subject").getValue(); 
    var SubCategory = formContext.getControl("pg_subcategory");
    var SubCategory2 = formContext.getControl("pg_clientoperationsubcategory");
    SubCategory.clearOptions();
    SubCategory2.clearOptions();

if(applicationselect === 140310017 && subjectSelect=== 140310012){
    SubCategory.addOption({ text: 'Paperwork', value: 140310000});
    SubCategory.addOption({ text: 'Background Verification', value: 140310001});
    SubCategory.addOption({ text: 'Direct Deposit Query', value: 140310002});
 }
 if(applicationselect === 140310017 && subjectSelect=== 140310013){
    SubCategory.addOption({ text: 'Address Change - Data Change', value: 140310003});
    SubCategory.addOption({ text: 'Tax form - Data Change', value: 140310004});
    SubCategory.addOption({ text: 'Direct Deposit - Data Change', value: 140310005});
    SubCategory.addOption({ text: 'Direct Deposit Query', value: 140310002});
    SubCategory.addOption({ text: 'Tax Query', value: 140310007});
    SubCategory.addOption({ text: 'Name query', value: 140310009});
    SubCategory.addOption({ text: 'Audit Query', value: 140310010});
 }
 if(applicationselect === 140310017 && subjectSelect=== 140310014){
    SubCategory.addOption({ text: 'Termination - Non CA', value: 140310011});
    SubCategory.addOption({ text: 'Termination  - CA', value: 140310012});
    SubCategory.addOption({ text: 'Termination - Canada', value: 140310013});
    SubCategory.addOption({ text: 'Termination - UK', value: 140310014});
 }
 if(applicationselect === 140310017 && subjectSelect=== 140310015){
    SubCategory.addOption({ text: 'Tax Query', value: 140310007});
    SubCategory.addOption({ text: 'Direct Deposit Query', value: 140310002});
    SubCategory.addOption({ text: 'Name query', value: 140310009});
    SubCategory.addOption({ text: 'Audit Query', value: 140310010});
 }
 if(applicationselect === 140310017 && subjectSelect=== 140310016){
    SubCategory.addOption({ text: 'Weekly Audit', value: 140310015});
    SubCategory.addOption({ text: 'Monthly Audit', value: 140310016});
    SubCategory.addOption({ text: 'Quarterly Audit', value: 140310017});
    SubCategory.addOption({ text: 'Half yearly Audit', value: 140310018});
    SubCategory.addOption({ text: 'Yearly Audit', value: 140310019});
    SubCategory.addOption({ text: 'Minimum Wage audit', value: 140310020});
    SubCategory.addOption({ text: 'Mark Up Audit', value: 140310021});
    SubCategory.addOption({ text: 'Year End activity', value: 140310022});
 }
 if(applicationselect === 140310020 && subjectSelect=== 140310017){
    SubCategory2.addOption({ text: 'New AIF', value: 140310000});
    SubCategory2.addOption({ text: 'Client Onboarding', value: 140310001});
}
if(applicationselect === 140310020 && subjectSelect=== 140310018){
    SubCategory2.addOption({ text: 'AIF Update', value: 140310002});
    SubCategory2.addOption({ text: 'Updates Shared with departments', value: 140310003});
}
if(applicationselect === 140310020 && subjectSelect=== 140310019){
    SubCategory2.addOption({ text: 'AIF Update', value: 140310002});
    SubCategory2.addOption({ text: 'Workers moved to new program in ATS', value: 140310005});
    SubCategory2.addOption({ text: 'Updates Shared with departments', value: 140310003});
    SubCategory2.addOption({ text: 'Access Management', value: 140310004});  
}
if(applicationselect === 140310020 && subjectSelect=== 140310020){
    SubCategory2.addOption({ text: 'AIF Update', value: 140310002});
    SubCategory2.addOption({ text: 'Access Management', value: 140310004});
}
if(applicationselect === 140310020 && subjectSelect=== 140310021){
    SubCategory2.addOption({ text: 'Access Management', value: 140310004});
    SubCategory2.addOption({ text: 'Contract review', value: 140310006});
    SubCategory2.addOption({ text: 'COI', value: 140310007});
    SubCategory2.addOption({ text: 'Client Documentation', value: 140310008});
    SubCategory2.addOption({ text: 'Supplier Portal Update', value: 140310009});
    SubCategory2.addOption({ text: 'Client and Program creation in ATS', value: 140310010});
}
if(applicationselect === 140310020 && subjectSelect=== 140310022){
    SubCategory2.addOption({ text: 'Enquires/Support', value: 140310011});
}
}

function SubCategoryinCase(context) {
    debugger;
    var formContext = context.getFormContext();
    var applicationselect = formContext.getAttribute("pg_application").getValue();
    var subjectSelect = formContext.getAttribute("pg_casesubject").getValue(); //
    var SubCategory = formContext.getControl("pg_subcategory");
    var SubCategory2 = formContext.getControl("pg_clientoperationsubcategory");

if(applicationselect === 140310017 && subjectSelect=== 140310012){
    SubCategory.clearOptions();
    SubCategory.addOption({ text: 'Paperwork', value: 140310000});
    SubCategory.addOption({ text: 'Background Verification', value: 140310001});
    SubCategory.addOption({ text: 'Direct Deposit Query', value: 140310002});
}
 if(applicationselect === 140310017 && subjectSelect=== 140310013){
    SubCategory.clearOptions();
    SubCategory.addOption({ text: 'Address Change - Data Change', value: 140310003});
    SubCategory.addOption({ text: 'Tax form - Data Change', value: 140310004});
    SubCategory.addOption({ text: 'Direct Deposit - Data Change', value: 140310005});
    SubCategory.addOption({ text: 'Direct Deposit Query', value: 140310002});
    SubCategory.addOption({ text: 'Tax Query', value: 140310007});
    SubCategory.addOption({ text: 'Name query', value: 140310009});
    SubCategory.addOption({ text: 'Audit Query', value: 140310010});
 }
 if(applicationselect === 140310017 && subjectSelect=== 140310014){
    SubCategory.clearOptions();
    SubCategory.addOption({ text: 'Termination - Non CA', value: 140310011});
    SubCategory.addOption({ text: 'Termination  - CA', value: 140310012});
    SubCategory.addOption({ text: 'Termination - Canada', value: 140310013});
    SubCategory.addOption({ text: 'Termination - UK', value: 140310014});
 }
 if(applicationselect === 140310017 && subjectSelect=== 140310015){
    SubCategory.clearOptions();
    SubCategory.addOption({ text: 'Tax Query', value: 140310007});
    SubCategory.addOption({ text: 'Direct Deposit Query', value: 140310002});
    SubCategory.addOption({ text: 'Name query', value: 140310009});
    SubCategory.addOption({ text: 'Audit Query', value: 140310010});
 }
 if(applicationselect === 140310017 && subjectSelect=== 140310016){
    SubCategory.clearOptions();
    SubCategory.addOption({ text: 'Weekly Audit', value: 140310015});
    SubCategory.addOption({ text: 'Monthly Audit', value: 140310016});
    SubCategory.addOption({ text: 'Quarterly Audit', value: 140310017});
    SubCategory.addOption({ text: 'Half yearly Audit', value: 140310018});
    SubCategory.addOption({ text: 'Yearly Audit', value: 140310019});
    SubCategory.addOption({ text: 'Minimum Wage audit', value: 140310020});
    SubCategory.addOption({ text: 'Mark Up Audit', value: 140310021});
    SubCategory.addOption({ text: 'Year End activity', value: 140310022});
 }
 if (applicationselect === 140310020 && subjectSelect === 140310017) {
    SubCategory2.clearOptions();
    SubCategory2.addOption({ text: 'New AIF', value: 140310000 });
    SubCategory2.addOption({ text: 'Client Onboarding', value: 140310001 });
}
if (applicationselect === 140310020 && subjectSelect === 140310018) {
    SubCategory2.clearOptions();
    SubCategory2.addOption({ text: 'AIF Update', value: 140310002 });
    SubCategory2.addOption({ text: 'Updates Shared with departments', value: 140310003 });
}
if (applicationselect === 140310020 && subjectSelect === 140310019) {
    SubCategory2.clearOptions();
    SubCategory2.addOption({ text: 'AIF Update', value: 140310002 });
    SubCategory2.addOption({ text: 'Workers moved to new program in ATS', value: 140310005 });
    SubCategory2.addOption({ text: 'Updates Shared with departments', value: 140310003 });
    SubCategory2.addOption({ text: 'Access Management', value: 140310004 });
}
if (applicationselect === 140310020 && subjectSelect === 140310020) {
    SubCategory2.clearOptions();
    SubCategory2.addOption({ text: 'AIF Update', value: 140310002 });
    SubCategory2.addOption({ text: 'Access Management', value: 140310004 });
}
if (applicationselect === 140310020 && subjectSelect === 140310021) {
    SubCategory2.clearOptions();
    SubCategory2.addOption({ text: 'Access Management', value: 140310004 });
    SubCategory2.addOption({ text: 'Contract review', value: 140310006 });
    SubCategory2.addOption({ text: 'COI', value: 140310007 });
    SubCategory2.addOption({ text: 'Client Documentation', value: 140310008 });
    SubCategory2.addOption({ text: 'Supplier Portal Update', value: 140310009 });
    SubCategory2.addOption({ text: 'Client and Program creation in ATS', value: 140310010 });
}
if (applicationselect === 140310020 && subjectSelect === 140310022) {
    SubCategory2.clearOptions();
    SubCategory2.addOption({ text: 'Enquires/Support', value: 140310011 });
}
}


function GetandSetCasetype(context) {
    var formContext = context.getFormContext();
    var title = formContext.getAttribute("title").getValue();
    var ticketnumber = formContext.getAttribute("ticketnumber").getValue();

    var filter = "?$select=pg_arsubcategory,pg_function,pg_benefitsdescription,pg_benefitssubcategory&$filter=pg_name eq '" + title + "' and pg_casenumber eq '" + ticketnumber + "'";

    Xrm.WebApi.online.retrieveMultipleRecords("pg_supportticket", filter).then(
        function success(results) {
            if (results.entities.length > 0) {
                var pg_arsubcategory = results.entities[0]["pg_arsubcategory"];
                var pg_arsubcategory_formatted = results.entities[0]["pg_arsubcategory@OData.Community.Display.V1.FormattedValue"];
   var pg_function = results.entities[0]["pg_function"];
            var pg_function_formatted = results.entities[0]["pg_function@OData.Community.Display.V1.FormattedValue"];
 var pg_benefitsdescription = results.entities[0]["pg_benefitsdescription"];
            var pg_benefitssubcategory = results.entities[0]["pg_benefitssubcategory"];
            var pg_benefitssubcategory_formatted = results.entities[0]["pg_benefitssubcategory@OData.Community.Display.V1.FormattedValue"];

                formContext.getAttribute("pg_casetype").setValue(pg_arsubcategory);
   formContext.getAttribute("pg_function").setValue(pg_function);
     formContext.getAttribute("pg_benefitssubcategory").setValue(pg_benefitssubcategory);
   formContext.getAttribute("pg_benefitsdescription").setValue(pg_benefitsdescription);

            } else {
                console.log("No records found for the provided criteria.");
            }
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}




function AppTypeNexus(context) {
    debugger;
    var formContext = context.getFormContext();
    var Application = formContext.getAttribute("pg_application").getValue();
    var subject = formContext.getAttribute("pg_casesubject").getValue();
    var CaseType = formContext.getControl("pg_casetype");
  var ARSubcategory = formContext.getControl("pg_arsubcategory");
    CaseType.clearOptions();
ARSubcategory.clearOptions();

    if (Application === 140310027) {
        CaseType.addOption({ text: 'Deal Sheet', value: 140310000 });
        CaseType.addOption({ text: 'Job', value: 140310001 });
        CaseType.addOption({ text: 'Administrative', value: 140310002 });
        CaseType.addOption({ text: 'Standard', value: 1 });
    } 
else if(Application === 140310027){
        subject.addOption({ text: "Onboarding", value: 140310012 }); 
        subject.addOption({ text: "Data Change", value: 140310013 }); 
        subject.addOption({ text: "Termination", value: 140310014 }); 
        subject.addOption({ text: "Email Query", value: 140310015 }); 
        subject.addOption({ text: "Audits", value: 140310016 }); 
    }
else if (Application === 140310004) {
        if (subject === 140310002) {
           ARSubcategory.addOption({ text: "RTA", value: 140310000 });
        ARSubcategory.addOption({ text: "PHC", value: 140310001 });
        ARSubcategory.addOption({ text: "Pride One", value: 140310002 });
        ARSubcategory.addOption({ text: "Pride Now", value: 140310003 });
 CaseType.addOption({ text: 'Standard', value: 1 });
        } 
     else if (subject === 140310007) {
            ARSubcategory.addOption({ text: "ATS", value: 140310004 });
        ARSubcategory.addOption({ text: "Client", value: 140310005 });
        ARSubcategory.addOption({ text: "Meeting", value: 140310006 });
        ARSubcategory.addOption({ text: "Perm Placement", value: 140310007 });
        ARSubcategory.addOption({ text: "R&A", value: 140310008 });
        ARSubcategory.addOption({ text: "HR Ops", value: 140310009 });
        ARSubcategory.addOption({ text: "Payroll", value: 140310010 });
        ARSubcategory.addOption({ text: "FR Team", value: 140310011 });
        ARSubcategory.addOption({ text: "Salesperson", value: 140310012 });
        ARSubcategory.addOption({ text: "Other", value: 140310013 });
 CaseType.addOption({ text: 'Standard', value: 1 });
        } else if (subject === 140310009) {
              ARSubcategory.addOption({ text: "Inquiries", value: 140310014 });
        ARSubcategory.addOption({ text: "Escalations", value: 140310015 });
        ARSubcategory.addOption({ text: "Queries", value: 140310016 });
        ARSubcategory.addOption({ text: "Purchase Orders", value: 140310017 });
 CaseType.addOption({ text: 'Standard', value: 1 });
        } else if (subject === 140310010) {
           CaseType.addOption({ text: 'Standard', value: 1 });
        } else if (subject === 140310011) {
            CaseType.addOption({ text: 'Standard', value: 1 });
        } else {
            CaseType.addOption({ text: 'Standard', value: 1 });
            CaseType.addOption({ text: 'HR Request', value: 2 });
        }
    } else {
        CaseType.addOption({ text: 'Standard', value: 1 });
        CaseType.addOption({ text: 'HR Request', value: 2 });
    }
}



function caseincidentmanagement(executionContext) {
    debugger;

    var formContext = executionContext.getFormContext();
   if (formContext.getAttribute("pg_application").getSelectedOption() !== null) {
   var applicationselect = formContext.getAttribute("pg_application").getSelectedOption().value;
    }
    var incidentmanagementtab = formContext.ui.tabs.get("tab_16");//Incident Management

  var incidentmanagementtabforemail = formContext.ui.tabs.get("tab_17");//tab_17

 var supportticket = formContext.getAttribute("pg_supportticket").getValue();
    if (applicationselect == 140310028 && supportticket !== null) {
        incidentmanagementtab.setVisible(true);
        formContext.getControl("pg_casesubject").setVisible(false);
        formContext.getControl("pg_priority").setVisible(false);
        formContext.getControl("pg_severity").setVisible(false); 
   formContext.getControl("pg_casetype").setVisible(false);
    }
else if (applicationselect == 140310028 && supportticket === null) {
        incidentmanagementtabforemail.setVisible(true);
        formContext.getControl("pg_casesubject").setVisible(false);
        formContext.getControl("pg_priority").setVisible(false);
        formContext.getControl("pg_severity").setVisible(false); 
   formContext.getControl("pg_casetype").setVisible(false);
    }
 else {
        incidentmanagementtab.setVisible(false);
   incidentmanagementtabforemail.setVisible(false);
        formContext.getControl("pg_casesubject").setVisible(true);
        formContext.getControl("pg_priority").setVisible(true);
        formContext.getControl("pg_severity").setVisible(true);
        formContext.getControl("pg_casetype").setVisible(true);     
    }
 
}




function ChangeTabtoSummary(executionContext) {
     var formContext = executionContext.getFormContext();
     formContext.ui.tabs.get("Summary").setFocus();
}

function AddDataChangeUSA(executionContext)
{
    debugger;
    var formContext = executionContext.getFormContext();
    var ApplicationType = formContext.getAttribute("pg_application").getValue();
    var subject = formContext.getControl("pg_subject");
subject.removeOption(140310001);
    if (ApplicationType == 140310024 || ApplicationType ==
      140310025
      || ApplicationType ==
      140310026
      || ApplicationType ==
      140310027)
     {
subject.addOption({ text: 'Others', value: 140310001 });     }
     else
     {
     subject.removeOption(140310001);
     }
}

function onChangeSelect(context) {
    debugger;
    var formcontext = context.getFormContext();
    var subject = formcontext.getControl("pg_subject");
    var applicationControl = formcontext.getControl("pg_application");

    //Hide Benefits, Job Boards, Legal
///Hide Reporting & Analytics, Launch VMS, Launch ATS, Dynamics GP, Kaizen, Audit,Compliance
    /*
    applicationControl.removeOption(140310004);
    applicationControl.removeOption(140310005);
    applicationControl.removeOption(140310006);
 applicationControl.removeOption(140310011);
    */
  ////
   
   // applicationControl.removeOption(140310009);
 //   applicationControl.removeOption(140310014);
   // applicationControl.removeOption(140310000);
    //applicationControl.removeOption(140310008);
    applicationControl.removeOption(140310022);
//applicationControl.removeOption(140310021);
    ////

    try {
        var applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }

    var options = subject.getOptions();

    for (let i = 0; i < options.length; i++) {
        subject.removeOption(options[i].value);
    }
    formcontext.getControl("pg_itsupportissue").setVisible(false);
formcontext.getControl("pg_helpdesksubcategory").setVisible(false);
    formcontext.getControl("pg_benefitssubcategory").setVisible(false);
    formcontext.getControl("pg_dynamicssupportissue").setVisible(false);
    formcontext.getControl("pg_description").setVisible(true);
    formcontext.getControl("pg_benefitsdescription").setVisible(false);
    formcontext.getControl("pg_propertymanagementcategory").setVisible(false);
    subject.setVisible(true);


    //GP
    if (applicationselect == 140310000) {
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Change Request', value: 2 });
        subject.addOption({ text: 'Functional', value: 3 });
        subject.addOption({ text: 'Reports', value: 4 });
    }

    //XYME US/India
    if ((applicationselect == 140310001) || (applicationselect == 140310002)) {
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Change Request', value: 2 });
        subject.addOption({ text: 'Standard', value: 5 });
    }

    //IT Support
    if ((applicationselect == 140310003)) {
               /*
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Standard', value: 5 });
        subject.addOption({ text: 'Hardware Request', value: 6 });
        formcontext.getControl("pg_itsupportissue").setVisible(true);
        subject.setVisible(false);
        */
        subject.addOption({ text: 'Hardware', value: 111 });
        subject.addOption({ text: 'Software', value: 110 });
        subject.addOption({ text: 'Other', value: 27 });
        //formcontext.getControl("pg_itsupportissue").setVisible(true);
        formcontext.getControl("pg_helpdesksubcategory").setVisible(true);
    }

    //IT Support India
    if ((applicationselect == 140310010)) {
        /*
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Standard', value: 5 });
        subject.addOption({ text: 'Hardware Request', value: 6 });
        formcontext.getControl("pg_itsupportissue").setVisible(true);
        subject.setVisible(false);
        */
        subject.addOption({ text: 'Hardware', value: 111 });
        subject.addOption({ text: 'Software', value: 110 });
        subject.addOption({ text: 'Other', value: 27 });
        //formcontext.getControl("pg_itsupportissue").setVisible(true);
        formcontext.getControl("pg_helpdesksubcategory").setVisible(true);
    }

    //Benefits
    if ((applicationselect == 140310007)) {
        subject.addOption({ text: '401k Inquiry', value: 62 });
        subject.addOption({ text: 'Workplace Injury', value: 63 });
        subject.addOption({ text: 'Medical Leaves', value: 64 });
        subject.addOption({ text: 'Non-Medical Leaves', value: 65 });
        subject.addOption({ text: 'Accessing Enrollment System', value: 66 });
        subject.addOption({ text: 'COBRA Information', value: 67 });
        subject.addOption({ text: 'General Benefits Questions', value: 68 });
        subject.addOption({ text: 'Commuter Inquiries', value: 69 });
        formcontext.getControl("pg_benefitssubcategory").setVisible(true);
        formcontext.getControl("pg_benefitsdescription").setVisible(true);
        formcontext.getControl("pg_description").setVisible(false);
    }

    //Job Boards
    if ((applicationselect == 140310005)) {
        subject.addOption({ text: 'LinkedIn', value: 17 });
        subject.addOption({ text: 'Career Builder', value: 18 });
        subject.addOption({ text: 'Monster', value: 19 });
        subject.addOption({ text: 'DICE', value: 20 });
        subject.addOption({ text: 'ZipRecruiter', value: 21 });
    }
    //Legal
    if ((applicationselect == 140310006)) {
        subject.addOption({ text: 'Client Queries', value: 45 });
        subject.addOption({ text: 'Collections - Client', value: 85 });
        subject.addOption({ text: 'Collections - Employee', value: 44 });
        subject.addOption({ text: 'Contract Access', value: 41 });
        subject.addOption({ text: 'Contract Request - New Client', value: 42 });
        subject.addOption({ text: 'Contract Review - RFP', value: 35 });
        subject.addOption({ text: 'Contracts - General Support', value: 86 });
        subject.addOption({ text: 'Employee Relations', value: 93 });
        subject.addOption({ text: 'External Employee Queries', value: 36 });
        subject.addOption({ text: 'Flight Deck', value: 37 });
        subject.addOption({ text: 'Internal Employee Queries', value: 38 });
        subject.addOption({ text: 'Litigation', value: 40 });
        subject.addOption({ text: 'Request for Information/Research', value: 39 });
        subject.addOption({ text: 'Subpeona', value: 43 });
    }

    //Launch VMS
    if ((applicationselect == 140310009)) {
        subject.addOption({ text: 'Question', value: 22 });
        subject.addOption({ text: 'Login Issue', value: 23 });
        subject.addOption({ text: 'Bug', value: 24 });
        subject.addOption({ text: 'Data Change', value: 25 });
        subject.addOption({ text: 'New Feature', value: 87 });
        subject.addOption({ text: 'Settings Change', value: 88 });
        subject.addOption({ text: 'Other', value: 27 });
    }

    //Launch ATS
    if ((applicationselect == 140310014)) {
        subject.addOption({ text: 'Question', value: 22 });
        subject.addOption({ text: 'Login Issue', value: 23 });
        subject.addOption({ text: 'Bug', value: 24 });
        subject.addOption({ text: 'Data Change', value: 25 });
        subject.addOption({ text: 'New Feature', value: 87 });
        subject.addOption({ text: 'Settings Change', value: 88 });
        subject.addOption({ text: 'Other', value: 27 });
    }

  
    //Kaizen
    if ((applicationselect == 140310008)) {
        subject.addOption({ text: 'Suggestion', value: 26 });
    }
    //HR Internal
    if ((applicationselect == 140310016)) {
        subject.addOption({ text: 'Background Check Authorization', value: 140310000 });
    }

    //Reporting and Analytics
    if ((applicationselect == 140310011)) {
        subject.addOption({ text: 'Questions about an existing report', value: 28 });
        subject.addOption({ text: 'Requests for a new report', value: 29 });
        subject.addOption({ text: 'Requests for data or analysis', value: 30 });
        subject.addOption({ text: 'Help with deals pricing', value: 31 });
        subject.addOption({ text: 'Market Insights Request', value: 32 });
        subject.addOption({ text: 'VMS Notifications (Fieldglass/Beeline)', value: 33 });
        subject.addOption({ text: 'General Inquiry or other', value: 34 });
    }

    //Marketing
    if ((applicationselect == 140310012)) {
        subject.addOption({ text: 'Awards', value: 47 });
        subject.addOption({ text: 'Banners for social', value: 49 });
        subject.addOption({ text: 'Bios', value: 76 });
        subject.addOption({ text: 'Blog', value: 50 });
        subject.addOption({ text: 'Business cards', value: 75 });
        subject.addOption({ text: 'Case Study', value: 46 });
        subject.addOption({ text: 'Email', value: 77 });
        subject.addOption({ text: 'Email Campaign', value: 48 });
        subject.addOption({ text: 'Embedded Partnership New Client Program', value: 94 });
        subject.addOption({ text: 'Events', value: 51 });
        subject.addOption({ text: 'Greeting cards', value: 78 });
        subject.addOption({ text: 'Landing Page', value: 52 });
        subject.addOption({ text: 'Logos', value: 79 });
        subject.addOption({ text: 'Newsletters', value: 80 });
        subject.addOption({ text: 'Office assets', value: 81 });
        subject.addOption({ text: 'One sheeters', value: 53 });
        subject.addOption({ text: 'Whitepaper', value: 60 });
        subject.addOption({ text: 'Paid Ads', value: 82 });
        subject.addOption({ text: 'Press Release', value: 55 });
        subject.addOption({ text: 'Report / Brochures', value: 54 });
        subject.addOption({ text: 'Reporting', value: 83 });
        subject.addOption({ text: 'Sales Deck', value: 56 });
        subject.addOption({ text: 'Social Post', value: 57 });
        subject.addOption({ text: 'Videos', value: 58 });
        subject.addOption({ text: 'Webinar', value: 59 });
        subject.addOption({ text: 'Websites', value: 84 });
        subject.addOption({ text: 'Other', value: 61 });
    }

    if ((applicationselect == 140310013)) {
        subject.addOption({ text: 'Finance & Operation', value: 72 });
        subject.addOption({ text: 'Human Resources', value: 73 });
        subject.addOption({ text: 'Customer Service', value: 74 });
        formcontext.getControl("pg_dynamicssupportissue").setVisible(true);
    }

    //Pride Innovations
    if ((applicationselect == 140310015)) {
        subject.addOption({ text: 'Pride Global Websites', value: 89 });
        subject.addOption({ text: 'MSP', value: 90 });
        subject.addOption({ text: 'Intranet', value: 91 });
        subject.addOption({ text: 'Dojo Store', value: 92 });
    }

    //Property Management
    if ((applicationselect == 140310018)) {
        subject.addOption({ text: 'NY - 29', value: 109 });
        subject.addOption({ text: 'NY - 30', value: 105 });
        subject.addOption({ text: 'NY - Bridge', value: 106 });
        subject.addOption({ text: 'NY - Flight Deck', value: 107 });
        subject.addOption({ text: 'NY - 31', value: 108 });
        subject.addOption({ text: 'NY Office', value: 96 });
        subject.addOption({ text: 'Greenwich', value: 95 });
        subject.addOption({ text: 'Bernardsville', value: 97 });
        subject.addOption({ text: 'PA Warehouse', value: 98 });
        subject.addOption({ text: 'Other', value: 27 });
        formcontext.getControl("pg_propertymanagementcategory").setVisible(true);
    }
    //150 Morristown
    if ((applicationselect == 140310019)) {
        subject.addOption({ text: 'Work Order', value: 99 });
        subject.addOption({ text: 'Service', value: 100 });
        subject.addOption({ text: 'Insurance', value: 101 });
        subject.addOption({ text: 'Accounts Payable', value: 102 });
        subject.addOption({ text: 'Accounts Receivable', value: 103 });
        subject.addOption({ text: 'PA Warehouse', value: 104 });
    }
    //Datachange
    if ((applicationselect == 10)) {
subject.addOption({ text: 'Reporting Manager', value: 1000 });
        subject.addOption({ text: 'Team/Process', value: 140310003 });
        subject.addOption({ text: 'Dojo', value: 140310004 });
        subject.addOption({ text: 'Work Location', value: 140310005 });
        subject.addOption({ text: 'Work Mode', value: 140310006 });
        subject.addOption({ text: 'Salary Revision', value: 140310008 });
    }

    //Compliance 
    if ((applicationselect == 140310021)) {
        subject.addOption({ text: 'TPA - Third Party Risk Assessment Questionanaire Review', value: 300 });
        subject.addOption({ text: 'SOC1 Type1 / Type2 review for Client report', value: 301 });
        subject.addOption({ text: 'SOC2 Type1 / Type2 review for Client report', value: 302 });
        subject.addOption({ text: 'New Vendor Risk Assessment Review', value: 303 });
        subject.addOption({ text: 'Key Vendor Risk Assessment Review', value: 304 });
        subject.addOption({ text: 'General reports and Analysis', value: 305 });
        subject.addOption({ text: 'GDPR Compliance', value: 306 });
        subject.addOption({ text: 'ISO 27001:2013 - ISMS Review', value: 307 });
        subject.addOption({ text: 'ISO9001 - QMS Review', value: 308 });
        subject.addOption({ text: 'Other', value: 27 });
    }

    //Audit 
    if ((applicationselect == 140310022)) {
        subject.addOption({ text: 'Internal Audit Findings Review', value: 400 });
        subject.addOption({ text: 'Internal Risk Assessment Review', value: 401 });
        subject.addOption({ text: 'Management Review Meeting (MRM)', value: 402 });
        subject.addOption({ text: 'Weekly Data Security Meeting', value: 403 });
        subject.addOption({ text: 'BCP / DR', value: 404 });
        subject.addOption({ text: 'Incident Stimulation Testing - Phishing', value: 405 });
        subject.addOption({ text: 'Internal Scans - Vulnerability Assessment', value: 406 });
        subject.addOption({ text: 'Internal Scans - Penetration Testing', value: 407 });
        subject.addOption({ text: 'Annual Security Awareness Training for employees', value: 408 });
    }
    //Rocket Shippers
    if ((applicationselect == 140310023)) {
        subject.addOption({ text: 'Order Cancellation', value: 501 });
        subject.addOption({ text: 'Address Change', value: 502 });
        subject.addOption({ text: 'Inventory Discrepancy', value: 503 });
        subject.addOption({ text: 'Inventory Sync Issue', value: 504 });
        subject.addOption({ text: 'Requesting Update on Receiving ', value: 505 });
        subject.addOption({ text: 'Requesting Update on Wholesale Order Shipping', value: 506 });
        subject.addOption({ text: 'Wrong Items Delivered', value: 507 });
        subject.addOption({ text: 'Missing Items Delivered', value: 508 });
        subject.addOption({ text: 'Damaged Items Delivered', value: 509 });
        subject.addOption({ text: 'International Orders Held Up in Customs', value: 510 });
        subject.addOption({ text: 'New Shopping Cart Connection Request', value: 511 });
    }
    //Pride One
if (applicationselect === 140310017) {
    subject.addOption({ text: 'Onboarding', value: 140310012 });
    subject.addOption({ text: 'Data Change', value: 140310013 });
    subject.addOption({ text: 'Termination', value: 140310014 });
    subject.addOption({ text: 'Email Query', value: 140310015 });
    subject.addOption({ text: 'Audits', value: 140310016 }); 
    formcontext.getControl("pg_subcategory").setVisible(true);
    //formcontext.getControl("pg_subcategory").clearOptions(); 
}

if (applicationselect !== 140310017){
    formcontext.getControl("pg_subcategory").setVisible(false);
}

// Client Operations
if (applicationselect === 140310020) {
    subject.addOption({ text: 'New Client', value: 140310017 });
    subject.addOption({ text: 'Amendment', value: 140310018 });
    subject.addOption({ text: 'MSP Transition - New/Existing', value: 140310019 });
    subject.addOption({ text: 'Client Operations Updates', value: 140310020 });
    subject.addOption({ text: 'New Onboarding', value: 140310021 }); 
    subject.addOption({ text: 'Enquires/Support', value: 140310022 }); 
    formcontext.getControl("pg_clientoperationsubcategory").setVisible(true);
   // formcontext.getControl("pg_clientoperationsubcategory").clearOptions(); 
}
if (applicationselect !== 140310020){
    formcontext.getControl("pg_clientoperationsubcategory").setVisible(false);
}


 if (applicationselect == 140310024 || applicationselect == 140310025 || applicationselect == 140310026 || applicationselect == 140310027)
     {
       subject.addOption({text:'others' , value :140310001});
     }
}

function onChangeSelectCase(context) {
    var formcontext = context.getFormContext();
    var subject = formcontext.getControl("pg_casesubject");
    var applicationControl = formcontext.getControl("pg_application");
    //Hide Benefits, Job Boards, Legal
    /*
    applicationControl.removeOption(140310004);
    applicationControl.removeOption(140310005);
    applicationControl.removeOption(140310006);
    */

    try {
        var applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }

    var options = subject.getOptions();

    for (let i = 0; i < options.length; i++) {
        subject.removeOption(options[i].value);
    }
    formcontext.getControl("pg_itsupportissue").setVisible(false);
formcontext.getControl("pg_helpdesksubcategory").setVisible(false);
    formcontext.getControl("pg_benefitssubcategory").setVisible(false);
    formcontext.getControl("pg_dynamicssupportissue").setVisible(false);
    formcontext.getControl("description").setVisible(true);
    formcontext.getControl("pg_benefitsdescription").setVisible(false);
    formcontext.getControl("pg_propertymanagementcategory").setVisible(false);
    formcontext.getControl("pg_subcategory").setVisible(false);
    subject.setVisible(true);


 //Prideone
    if(applicationselect === 140310017){
        subject.addOption({ text: "Onboarding", value: 140310012 }); 
        subject.addOption({ text: "Data Change", value: 140310013 }); 
        subject.addOption({ text: "Termination", value: 140310014 }); 
        subject.addOption({ text: "Email Query", value: 140310015 }); 
        subject.addOption({ text: "Audits", value: 140310016 }); 
        formcontext.getControl("pg_subcategory").setVisible(true);
      // formcontext.getControl("pg_subcategory").clearOptions();
    }

// Client Operations
if (applicationselect === 140310020) {
    subject.addOption({ text: 'New Client', value: 140310017 });
    subject.addOption({ text: 'Amendment', value: 140310018 });
    subject.addOption({ text: 'MSP Transition - New/Existing', value: 140310019 });
    subject.addOption({ text: 'Client Operations Updates', value: 140310020 });
    subject.addOption({ text: 'New Onboarding', value: 140310021 }); 
    subject.addOption({ text: 'Enquires/Support', value: 140310022 }); 
    formcontext.getControl("pg_clientoperationsubcategory").setVisible(true);
   // formcontext.getControl("pg_clientoperationsubcategory").clearOptions(); 
}
if (applicationselect !== 140310020){
    formcontext.getControl("pg_clientoperationsubcategory").setVisible(false);
}
 

    //GP
    if (applicationselect == 140310000) {
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Change Request', value: 2 });
        subject.addOption({ text: 'Functional', value: 3 });
        subject.addOption({ text: 'Reports', value: 4 });
    }

    //XYME US/India
    if ((applicationselect == 140310001) || (applicationselect == 140310002)) {
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Change Request', value: 2 });
        subject.addOption({ text: 'Standard', value: 5 });
    }

    //IT Support
    if ((applicationselect == 140310003)) {
        /*
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Standard', value: 5 });
        subject.addOption({ text: 'Hardware Request', value: 6 });
        formcontext.getControl("pg_itsupportissue").setVisible(true);
        subject.setVisible(false);
        */
        subject.addOption({ text: 'Hardware', value: 111 });
        subject.addOption({ text: 'Software', value: 110 });
        subject.addOption({ text: 'Other', value: 27 });
        //formcontext.getControl("pg_itsupportissue").setVisible(true);
        formcontext.getControl("pg_helpdesksubcategory").setVisible(true);
    }

    //IT Support India
    if ((applicationselect == 140310010)) {
        subject.addOption({ text: 'Hardware', value: 111 });
        subject.addOption({ text: 'Software', value: 110 });
        subject.addOption({ text: 'Other', value: 27 });
        //formcontext.getControl("pg_itsupportissue").setVisible(true);
        formcontext.getControl("pg_helpdesksubcategory").setVisible(true);
    }

    //Benefits
    if ((applicationselect == 140310007)) {
        subject.addOption({ text: '401k Inquiry', value: 62 });
        subject.addOption({ text: 'Workplace Injury', value: 63 });
        subject.addOption({ text: 'Medical Leaves', value: 64 });
        subject.addOption({ text: 'Non-Medical Leaves', value: 65 });
        subject.addOption({ text: 'Accessing Enrollment System', value: 66 });
        subject.addOption({ text: 'COBRA Information', value: 67 });
        subject.addOption({ text: 'General Benefits Questions', value: 68 });
        subject.addOption({ text: 'Commuter Inquiries', value: 69 });
        formcontext.getControl("pg_benefitssubcategory").setVisible(true);
        formcontext.getControl("description").setVisible(false);
        formcontext.getControl("pg_benefitsdescription").setVisible(true);
    }

    //Job Boards
    if ((applicationselect == 140310005)) {
        subject.addOption({ text: 'LinkedIn', value: 17 });
        subject.addOption({ text: 'Career Builder', value: 18 });
        subject.addOption({ text: 'Monster', value: 19 });
        subject.addOption({ text: 'DICE', value: 20 });
        subject.addOption({ text: 'ZipRecruiter', value: 21 });
    }
    //Legal
    if ((applicationselect == 140310006)) {
        subject.addOption({ text: 'Client Queries', value: 45 });
        subject.addOption({ text: 'Collections - Client', value: 85 });
        subject.addOption({ text: 'Collections - Employee', value: 44 });
        subject.addOption({ text: 'Contract Access', value: 41 });
        subject.addOption({ text: 'Contract Request - New Client', value: 42 });
        subject.addOption({ text: 'Contract Review - RFP', value: 35 });
        subject.addOption({ text: 'Contracts - General Support', value: 86 });
        subject.addOption({ text: 'Employee Relations', value: 93 });
        subject.addOption({ text: 'External Employee Queries', value: 36 });
        subject.addOption({ text: 'Flight Deck', value: 37 });
        subject.addOption({ text: 'Internal Employee Queries', value: 38 });
        subject.addOption({ text: 'Litigation', value: 40 });
        subject.addOption({ text: 'Request for Information/Research', value: 39 });
        subject.addOption({ text: 'Subpeona', value: 43 });
    }

    //Launch VMS
    if ((applicationselect == 140310009)) {
        subject.addOption({ text: 'Question', value: 22 });
        subject.addOption({ text: 'Login Issue', value: 23 });
        subject.addOption({ text: 'Bug', value: 24 });
        subject.addOption({ text: 'Data Change', value: 25 });
        subject.addOption({ text: 'New Feature', value: 87 });
        subject.addOption({ text: 'Settings Change', value: 88 });
        subject.addOption({ text: 'Other', value: 27 });
    }

    //Launch ATS
    if ((applicationselect == 140310014)) {
        subject.addOption({ text: 'Question', value: 22 });
        subject.addOption({ text: 'Login Issue', value: 23 });
        subject.addOption({ text: 'Bug', value: 24 });
        subject.addOption({ text: 'Data Change', value: 25 });
        subject.addOption({ text: 'New Feature', value: 87 });
        subject.addOption({ text: 'Settings Change', value: 88 });
        subject.addOption({ text: 'Other', value: 27 });
    }

    //Reporting and Analytics
    if ((applicationselect == 140310011)) {
        subject.addOption({ text: 'Questions about an existing report', value: 28 });
        subject.addOption({ text: 'Requests for a new report', value: 29 });
        subject.addOption({ text: 'Requests for data or analysis', value: 30 });
        subject.addOption({ text: 'Help with deals pricing', value: 31 });
        subject.addOption({ text: 'Market Insights Request', value: 32 });
        subject.addOption({ text: 'VMS Notifications (Fieldglass/Beeline)', value: 33 });
        subject.addOption({ text: 'General Inquiry or other', value: 34 });
    }

    //Marketing
    if ((applicationselect == 140310012)) {
        subject.addOption({ text: 'Awards', value: 47 });
        subject.addOption({ text: 'Banners for social', value: 49 });
        subject.addOption({ text: 'Bios', value: 76 });
        subject.addOption({ text: 'Blog', value: 50 });
        subject.addOption({ text: 'Business cards', value: 75 });
        subject.addOption({ text: 'Case Study', value: 46 });
        subject.addOption({ text: 'Email', value: 77 });
        subject.addOption({ text: 'Email Campaign', value: 48 });
        subject.addOption({ text: 'Embedded Partnership New Client Program', value: 94 });
        subject.addOption({ text: 'Events', value: 51 });
        subject.addOption({ text: 'Greeting cards', value: 78 });
        subject.addOption({ text: 'Landing Page', value: 52 });
        subject.addOption({ text: 'Logos', value: 79 });
        subject.addOption({ text: 'Newsletters', value: 80 });
        subject.addOption({ text: 'Office assets', value: 81 });
        subject.addOption({ text: 'One sheeters', value: 53 });
        subject.addOption({ text: 'Whitepaper', value: 60 });
        subject.addOption({ text: 'Paid Ads', value: 82 });
        subject.addOption({ text: 'Press Release', value: 55 });
        subject.addOption({ text: 'Report / Brochures', value: 54 });
        subject.addOption({ text: 'Reporting', value: 83 });
        subject.addOption({ text: 'Sales Deck', value: 56 });
        subject.addOption({ text: 'Social Post', value: 57 });
        subject.addOption({ text: 'Videos', value: 58 });
        subject.addOption({ text: 'Webinar', value: 59 });
        subject.addOption({ text: 'Websites', value: 84 });
        subject.addOption({ text: 'Other', value: 61 });
    }

    //MSD
    if ((applicationselect == 140310013)) {
        subject.addOption({ text: 'Finance & Operation', value: 72 });
        subject.addOption({ text: 'Human Resources', value: 73 });
        subject.addOption({ text: 'Customer Service', value: 74 });
        formcontext.getControl("pg_dynamicssupportissue").setVisible(true);
    }

    //Pride Innovations
    if ((applicationselect == 140310015)) {
        subject.addOption({ text: 'Pride Global Websites', value: 89 });
        subject.addOption({ text: 'MSP', value: 90 });
        subject.addOption({ text: 'Intranet', value: 91 });
        subject.addOption({ text: 'Dojo Store', value: 92 });
    }
    //HR Internal
    if ((applicationselect == 140310016)) {
        subject.addOption({ text: 'Background Check Authorization', value: 140310000 });
    }
    //Property Management
    if ((applicationselect == 140310018)) {
        subject.addOption({ text: 'NY - 29', value: 109 });
        subject.addOption({ text: 'NY - 30', value: 105 });
        subject.addOption({ text: 'NY - Bridge', value: 106 });
        subject.addOption({ text: 'NY - Flight Deck', value: 107 });
        subject.addOption({ text: 'NY - 31', value: 108 });
        subject.addOption({ text: 'NY Office', value: 96 });
        subject.addOption({ text: 'Greenwich', value: 95 });
        subject.addOption({ text: 'Bernardsville', value: 97 });
        subject.addOption({ text: 'PA Warehouse', value: 98 });
        subject.addOption({ text: 'Other', value: 27 });
        formcontext.getControl("pg_propertymanagementcategory").setVisible(true);
    }
    //150 Morristown
    if ((applicationselect == 140310019)) {
        subject.addOption({ text: 'Work Order', value: 99 });
        subject.addOption({ text: 'Service', value: 100 });
        subject.addOption({ text: 'Insurance', value: 101 });
        subject.addOption({ text: 'Accounts Payable', value: 102 });
        subject.addOption({ text: 'Accounts Receivable', value: 103 });
        subject.addOption({ text: 'PA Warehouse', value: 104 });
    }
    //datachange
    if ((applicationselect == 10)) {
        subject.addOption({ text: 'Reporting Manager', value: 1000 });
      
        subject.addOption({ text: 'Team/Process', value: 140310003 });
        subject.addOption({ text: 'Dojo', value: 140310004 });
        subject.addOption({ text: 'Work Location', value: 140310005 });
        subject.addOption({ text: 'Work Mode', value: 140310006 });
        subject.addOption({ text: 'Salary Revision', value: 140310008 });
    }

    //Compliance 
    if ((applicationselect == 140310021)) {
        subject.addOption({ text: 'TPA - Third Party Risk Assessment Questionanaire Review', value: 300 });
        subject.addOption({ text: 'SOC1 Type1 / Type2 review for Client report', value: 301 });
        subject.addOption({ text: 'SOC2 Type1 / Type2 review for Client report', value: 302 });
        subject.addOption({ text: 'New Vendor Risk Assessment Review', value: 303 });
        subject.addOption({ text: 'Key Vendor Risk Assessment Review', value: 304 });
        subject.addOption({ text: 'General reports and Analysis', value: 305 });
        subject.addOption({ text: 'GDPR Compliance', value: 306 });
        subject.addOption({ text: 'ISO 27001:2013 - ISMS Review', value: 307 });
        subject.addOption({ text: 'ISO9001 - QMS Review', value: 308 });
        subject.addOption({ text: 'Other', value: 27 });
    }

    //Audit 
    if ((applicationselect == 140310022)) {
        subject.addOption({ text: 'Internal Audit Findings Review', value: 400 });
        subject.addOption({ text: 'Internal Risk Assessment Review', value: 401 });
        subject.addOption({ text: 'Management Review Meeting (MRM)', value: 402 });
        subject.addOption({ text: 'Weekly Data Security Meeting', value: 403 });
        subject.addOption({ text: 'BCP / DR', value: 404 });
        subject.addOption({ text: 'Incident Stimulation Testing - Phishing', value: 405 });
        subject.addOption({ text: 'Internal Scans - Vulnerability Assessment', value: 406 });
        subject.addOption({ text: 'Internal Scans - Penetration Testing', value: 407 });
        subject.addOption({ text: 'Annual Security Awareness Training for employees', value: 408 });
    }
    //Rocket Shippers
    if ((applicationselect == 140310023)) {
        subject.addOption({ text: 'Order Cancellation', value: 501 });
        subject.addOption({ text: 'Address Change', value: 502 });
        subject.addOption({ text: 'Inventory Discrepancy', value: 503 });
        subject.addOption({ text: 'Inventory Sync Issue', value: 504 });
        subject.addOption({ text: 'Requesting Update on Receiving ', value: 505 });
        subject.addOption({ text: 'Requesting Update on Wholesale Order Shipping', value: 506 });
        subject.addOption({ text: 'Wrong Items Delivered', value: 507 });
        subject.addOption({ text: 'Missing Items Delivered', value: 508 });
        subject.addOption({ text: 'Damaged Items Delivered', value: 509 });
        subject.addOption({ text: 'International Orders Held Up in Customs', value: 510 });
        subject.addOption({ text: 'New Shopping Cart Connection Request', value: 511 });
    }
//AR Support
 if (applicationselect == 140310004)
     {
       subject.addOption({ text: 'Internalmail', value: 140310002});
       subject.addOption({ text: 'Notification & Communication', value: 140310007});
       subject.addOption({ text: 'ClientCorrespondance', value: 140310009 });
       subject.addOption({ text: 'Remittance', value: 140310010 });
       subject.addOption({ text: 'Invoice', value: 140310011 });     
  formcontext.getControl("pg_arsubcategory").setVisible(true);
     }
else{
 formcontext.getControl("pg_arsubcategory").setVisible(false);
}

}

function showITOptions(context) {
    var formcontext = context.getFormContext();
    var standardOptions = formcontext.getControl("pg_casesubject");
    var ITOptions = formcontext.getControl("pg_itsupportissue");
    try {
        var applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }

    if ((applicationselect == 140310003)) {
        standardOptions.addOption({ text: 'Access', value: 1 });
        standardOptions.addOption({ text: 'Standard', value: 5 });
        standardOptions.addOption({ text: 'Hardware Request', value: 6 });
        ITOptions.setVisible(true);
        standardOptions.setVisible(false);
    }
    else if ((applicationselect == 140310010)) {
        standardOptions.addOption({ text: 'Access', value: 1 });
        standardOptions.addOption({ text: 'Standard', value: 5 });
        standardOptions.addOption({ text: 'Hardware Request', value: 6 });
        ITOptions.setVisible(true);
        standardOptions.setVisible(false);
    }
    else {
        standardOptions.setVisible(true);
        ITOptions.setVisible(false);
    }
}

function onChangeApplicationOnCase(context) {
    var formcontext = context.getFormContext();
    var subject = formcontext.getControl("pg_casesubject");

    try {
        var applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }

    var options = subject.getOptions();

    for (let i = 0; i < options.length; i++) {
        subject.removeOption(options[i].value);
    }
    formcontext.getControl("pg_itsupportissue").setVisible(false);
    subject.setVisible(true);

    //GP
    if (applicationselect == 140310000) {
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Change Request', value: 2 });
        subject.addOption({ text: 'Functional', value: 3 });
        subject.addOption({ text: 'Reports', value: 4 });
    }

    //XYME US/India
    if ((applicationselect == 140310001) || (applicationselect == 140310002)) {
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Change Request', value: 2 });
        subject.addOption({ text: 'Standard', value: 5 });
    }

    //IT Support
    if ((applicationselect == 140310003)) {
        /*
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Standard', value: 5 });
        subject.addOption({ text: 'Hardware Request', value: 6 });
        formcontext.getControl("pg_itsupportissue").setVisible(true);
        subject.setVisible(false);
        */
        subject.addOption({ text: 'Hardware', value: 111 });
        subject.addOption({ text: 'Software', value: 110 });
        subject.addOption({ text: 'Other', value: 27 });
        //formcontext.getControl("pg_itsupportissue").setVisible(true);
        formcontext.getControl("pg_helpdesksubcategory").setVisible(true);
    }

    //Reporting and Analytics
    if ((applicationselect == 140310011)) {
        subject.addOption({ text: 'Questions about an existing report', value: 28 });
        subject.addOption({
            text: 'Requests for a new report', value: 29
        });
        subject.addOption({ text: 'Requests for data or analysis', value: 30 });
        subject.addOption({ text: 'Help with deals pricing', value: 31 });
        subject.addOption({ text: 'Market Insights Request', value: 32 });
        subject.addOption({ text: 'VMS Notifications (Fieldglass/Beeline)', value: 33 });
        subject.addOption({ text: 'General Inquiry or other', value: 34 });
    }

    //Benefits
    if ((applicationselect == 140310007)) {
        subject.addOption({ text: '401k Inquiry', value: 62 });
        subject.addOption({ text: 'Workplace Injury', value: 63 });
        subject.addOption({ text: 'Medical Leaves', value: 64 });
        subject.addOption({ text: 'Non-Medical Leaves', value: 65 });
        subject.addOption({ text: 'Accessing Enrollment System', value: 66 });
        subject.addOption({ text: 'COBRA Information', value: 67 });
        subject.addOption({ text: 'General Benefits Questions', value: 68 });
        subject.addOption({ text: 'Commuter Inquiries', value: 69 });
        formcontext.getControl("pg_benefitssubcategory").setVisible(true);
    }

    //Job Boards
    if ((applicationselect == 140310005)) {
        subject.addOption({ text: 'LinkedIn', value: 17 });
        subject.addOption({ text: 'Career Builder', value: 18 });
        subject.addOption({ text: 'Monster', value: 19 });
        subject.addOption({ text: 'DICE', value: 20 });
        subject.addOption({ text: 'ZipRecruiter', value: 21 });
    }

    //Legal
    if ((applicationselect == 140310006)) {
        subject.addOption({ text: 'Client Queries', value: 45 });
        subject.addOption({ text: 'Collections - Client', value: 85 });
        subject.addOption({ text: 'Collections - Employee', value: 44 });
        subject.addOption({ text: 'Contract Access', value: 41 });
        subject.addOption({ text: 'Contract Request - New Client', value: 42 });
        subject.addOption({ text: 'Contract Review - RFP', value: 35 });
        subject.addOption({ text: 'Contracts - General Support', value: 86 });
        subject.addOption({ text: 'Employee Relations', value: 93 });
        subject.addOption({ text: 'External Employee Queries', value: 36 });
        subject.addOption({ text: 'Flight Deck', value: 37 });
        subject.addOption({ text: 'Internal Employee Queries', value: 38 });
        subject.addOption({ text: 'Litigation', value: 40 });
        subject.addOption({ text: 'Request for Information/Research', value: 39 });
        subject.addOption({ text: 'Subpeona', value: 43 });
    }

    //MSD
    if ((applicationselect == 140310013)) {
        subject.addOption({ text: 'Finance & Operation', value: 72 });
        subject.addOption({ text: 'Human Resources', value: 73 });
        subject.addOption({ text: 'Customer Service', value: 74 });
        formcontext.getControl("pg_dynamicssupportissue").setVisible(true);
    }

    //Launch VMS
    if ((applicationselect == 140310009)) {
        subject.addOption({ text: 'Question', value: 22 });
        subject.addOption({ text: 'Login Issue', value: 23 });
        subject.addOption({ text: 'Bug', value: 24 });
        subject.addOption({ text: 'Data Change', value: 25 });
        subject.addOption({ text: 'New Feature', value: 87 });
        subject.addOption({ text: 'Settings Change', value: 88 });
        subject.addOption({ text: 'Other', value: 27 });
    }

    //Launch ATS
    if ((applicationselect == 140310014)) {
        subject.addOption({ text: 'Question', value: 22 });
        subject.addOption({ text: 'Login Issue', value: 23 });
        subject.addOption({ text: 'Bug', value: 24 });
        subject.addOption({ text: 'Data Change', value: 25 });
        subject.addOption({ text: 'New Feature', value: 87 });
        subject.addOption({ text: 'Settings Change', value: 88 });
        subject.addOption({ text: 'Other', value: 27 });
    }

    //Pride Innovations
    if ((applicationselect == 140310015)) {
        subject.addOption({ text: 'Pride Global Websitees', value: 89 });
        subject.addOption({ text: 'MSP', value: 90 });
        subject.addOption({ text: 'Intranet', value: 91 });
        subject.addOption({ text: 'Dojo Store', value: 92 });
    }
    //HR Internal
    if ((applicationselect == 140310016)) {
        subject.addOption({ text: 'Background Check Authorization', value: 140310000 });
    }
    //Property Management
    if ((applicationselect == 140310018)) {
        subject.addOption({ text: 'NY - 29', value: 109 });
        subject.addOption({ text: 'NY - 30', value: 105 });
        subject.addOption({ text: 'NY - Bridge', value: 106 });
        subject.addOption({ text: 'NY - Flight Deck', value: 107 });
        subject.addOption({ text: 'NY - 31', value: 108 });
        subject.addOption({ text: 'NY Office', value: 96 });
        subject.addOption({ text: 'Greenwich', value: 95 });
        subject.addOption({ text: 'Bernardsville', value: 97 });
        subject.addOption({ text: 'PA Warehouse', value: 98 });
        subject.addOption({ text: 'Other', value: 27 });
    }
    //150 Morristown
    if ((applicationselect == 140310019)) {
        subject.addOption({ text: 'Work Order', value: 99 });
        subject.addOption({ text: 'Service', value: 100 });
        subject.addOption({ text: 'Insurance', value: 101 });
        subject.addOption({ text: 'Accounts Payable', value: 102 });
        subject.addOption({ text: 'Accounts Receivable', value: 103 });
        subject.addOption({ text: 'PA Warehouse', value: 104 });
    }

    //Compliance 
    if ((applicationselect == 140310021)) {
        subject.addOption({ text: 'TPA - Third Party Risk Assessment Questionanaire Review', value: 300 });
        subject.addOption({ text: 'SOC1 Type1 / Type2 review for Client report', value: 301 });
        subject.addOption({ text: 'SOC2 Type1 / Type2 review for Client report', value: 302 });
        subject.addOption({ text: 'New Vendor Risk Assessment Review', value: 303 });
        subject.addOption({ text: 'Key Vendor Risk Assessment Review', value: 304 });
        subject.addOption({ text: 'General reports and Analysis', value: 305 });
        subject.addOption({ text: 'GDPR Compliance', value: 306 });
        subject.addOption({ text: 'ISO 27001:2013 - ISMS Review', value: 307 });
        subject.addOption({ text: 'ISO9001 - QMS Review', value: 308 });
        subject.addOption({ text: 'Other', value: 27 });
    }

    //Audit 
    if ((applicationselect == 140310022)) {
        subject.addOption({ text: 'Internal Audit Findings Review', value: 400 });
        subject.addOption({ text: 'Internal Risk Assessment Review', value: 401 });
        subject.addOption({ text: 'Management Review Meeting (MRM)', value: 402 });
        subject.addOption({ text: 'Weekly Data Security Meeting', value: 403 });
        subject.addOption({ text: 'BCP / DR', value: 404 });
        subject.addOption({ text: 'Incident Stimulation Testing - Phishing', value: 405 });
        subject.addOption({ text: 'Internal Scans - Vulnerability Assessment', value: 406 });
        subject.addOption({ text: 'Internal Scans - Penetration Testing', value: 407 });
        subject.addOption({ text: 'Annual Security Awareness Training for employees', value: 408 });
    }
    //Rocket Shippers
    if ((applicationselect == 140310023)) {
        subject.addOption({ text: 'Order Cancellation', value: 501 });
        subject.addOption({ text: 'Address Change', value: 502 });
        subject.addOption({ text: 'Inventory Discrepancy', value: 503 });
        subject.addOption({ text: 'Inventory Sync Issue', value: 504 });
        subject.addOption({ text: 'Requesting Update on Receiving ', value: 505 });
        subject.addOption({ text: 'Requesting Update on Wholesale Order Shipping', value: 506 });
        subject.addOption({ text: 'Wrong Items Delivered', value: 507 });
        subject.addOption({ text: 'Missing Items Delivered', value: 508 });
        subject.addOption({ text: 'Damaged Items Delivered', value: 509 });
        subject.addOption({ text: 'International Orders Held Up in Customs', value: 510 });
        subject.addOption({ text: 'New Shopping Cart Connection Request', value: 511 });
    }
}

function onloadTabs(context) {
    debugger;
    var formcontext = context.getFormContext();
  
    var CheckListTab_OFF = formcontext.ui.tabs.get("tab_8");
   
    var ITChecklist = formcontext.ui.tabs.get("tab_12").sections.get("tab_12_section_1");
    var ITChecklistAccessAndDL = formcontext.ui.tabs.get("tab_12").sections.get("tab_12_section_9");
    var AdminChecklist = formcontext.ui.tabs.get("tab_12").sections.get("tab_12_section_2");
    var EmployeeEngagementChecklist = formcontext.ui.tabs.get("tab_12").sections.get("tab_12_section_3");
    var LearningandDevelopmentChecklist = formcontext.ui.tabs.get("tab_12").sections.get("tab_12_section_4");
    var EmployeeDevelopmentChecklist = formcontext.ui.tabs.get("tab_12").sections.get("tab_12_section_5");
    var FinanceChecklist = formcontext.ui.tabs.get("tab_12").sections.get("tab_12_section_6");
    var CorporateHR = formcontext.ui.tabs.get("tab_12").sections.get("Corporate HR");
    var AuditCL = formcontext.ui.tabs.get("tab_12").sections.get("tab_12_section_10");
    AuditCL.setVisible(false);
    var kaizenTab = formcontext.ui.tabs.get("tab_9");
  var Details = formcontext.ui.tabs.get("Details");
    var HRInternalTab = formcontext.ui.tabs.get("tab_4");
    var caseTitle = formcontext.getAttribute("title").getValue();

    var applicationselect = 0;
    var subjectselect = 0;

    try {
        applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }

    try {
        subjectselect = formcontext.getAttribute("pg_casesubject").getSelectedOption().value;
    }
    catch {
        subjectselect = 0;
    }

    if (applicationselect == 140310017)//India Offboarding
    {
        //disable approval field
        formcontext.getControl("header_process_pg_caseapproval").setDisabled(true);
        formcontext.getControl("header_process_pg_noticeperiodapprover1").setDisabled(true);
        formcontext.getControl("header_process_pg_noticeperiodapprover2").setDisabled(true);
        formcontext.getControl("header_process_pg_noticeperiodwaiver").setDisabled(true);
        formcontext.getControl("header_process_pg_noticeperiodwaiver_1").setDisabled(true);
        formcontext.getControl("header_process_pg_noticeperiodwaiver_2").setDisabled(true);

        offboardingTab.setVisible(false);
        offboardingTab_India.setVisible(true);
        kaizenTab.setVisible(false);
        HRInternalTab.setVisible(false);
        CheckListTab_OFF.setVisible(false);


        var finalpathwithquery = Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.2/pg_supporttickets?$filter=pg_application eq 140310017";
        var data = null;
        var isAsync = false;

        var req = null;
        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
        }

        req.open("GET", finalpathwithquery, isAsync);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var result = JSON.parse(this.response);
                    data = result;
                    var acclist = null;
                    for (var i = 0; i < data.value.length; i++) {
                        acclist = acclist + " | " + data.value[i].name;
                    }

                    var keyCount = data.value.length;
                    if (keyCount > 0) {
                        SupportTicketQuickViewform.setVisible(true);
                    }
                    else {
                        SupportTicketQuickViewform.setVisible(false);

                    }

                }
                else {
                    Xrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send();


        if (caseTitle.includes("CAM")) {
            assetstate(context);
            /*
            if (caseTitle.includes("Asset") || caseTitle.includes("Backup")) {
                ITChecklist.setVisible(true);
            }
            else if (caseTitle.includes("Access") || caseTitle.includes("DL")) {
                ITChecklistAccessAndDL.setVisible(true);
            }
            */
            ITChecklist.setVisible(false);
            ITChecklistAccessAndDL.setVisible(true);
            AdminChecklist.setVisible(false);
            EmployeeEngagementChecklist.setVisible(false);
            LearningandDevelopmentChecklist.setVisible(false);
            EmployeeDevelopmentChecklist.setVisible(false);
            FinanceChecklist.setVisible(false);
            CorporateHR.setVisible(false);
        }
        else if (caseTitle.includes("IT")) {
            assetstate(context);
            /*
            if (caseTitle.includes("Asset") || caseTitle.includes("Backup")) {
                ITChecklist.setVisible(true);
            }
            else if (caseTitle.includes("Access") || caseTitle.includes("DL")) {
                ITChecklistAccessAndDL.setVisible(true);
            }
            */
            ITChecklist.setVisible(true);
            ITChecklistAccessAndDL.setVisible(false);
            AdminChecklist.setVisible(false);
            EmployeeEngagementChecklist.setVisible(false);
            LearningandDevelopmentChecklist.setVisible(false);
            EmployeeDevelopmentChecklist.setVisible(false);
            FinanceChecklist.setVisible(false);
            CorporateHR.setVisible(false);
        }
        else if (caseTitle.includes("Admin")) {
            AdminChecklist.setVisible(true);
            ITChecklist.setVisible(false);
            ITChecklistAccessAndDL.setVisible(false);
            EmployeeEngagementChecklist.setVisible(false);
            LearningandDevelopmentChecklist.setVisible(false);
            EmployeeDevelopmentChecklist.setVisible(false);
            FinanceChecklist.setVisible(false);
            CorporateHR.setVisible(false);
        }
        else if (caseTitle.includes("Employee Engagement")) {
            AdminChecklist.setVisible(false);
            ITChecklist.setVisible(false);
            ITChecklistAccessAndDL.setVisible(false);
            EmployeeEngagementChecklist.setVisible(true);
            LearningandDevelopmentChecklist.setVisible(false);
            EmployeeDevelopmentChecklist.setVisible(false);
            FinanceChecklist.setVisible(false);
            CorporateHR.setVisible(false);
        }
        else if (caseTitle.includes("Learning & Development")) {
            AdminChecklist.setVisible(false);
            ITChecklist.setVisible(false);
            ITChecklistAccessAndDL.setVisible(false);
            EmployeeEngagementChecklist.setVisible(false);
            LearningandDevelopmentChecklist.setVisible(true);
            EmployeeDevelopmentChecklist.setVisible(false);
            FinanceChecklist.setVisible(false);
            CorporateHR.setVisible(false);
        }
        else if (caseTitle.includes("Employee Development")) {
            AdminChecklist.setVisible(false);
            ITChecklist.setVisible(false);
            ITChecklistAccessAndDL.setVisible(false);
            EmployeeEngagementChecklist.setVisible(false);
            LearningandDevelopmentChecklist.setVisible(false);
            EmployeeDevelopmentChecklist.setVisible(true);
            FinanceChecklist.setVisible(false);
            CorporateHR.setVisible(false);
        }
        else if (caseTitle.includes("Finance")) {
            AdminChecklist.setVisible(false);
            ITChecklist.setVisible(false);
            ITChecklistAccessAndDL.setVisible(false);
            EmployeeEngagementChecklist.setVisible(false);
            LearningandDevelopmentChecklist.setVisible(false);
            EmployeeDevelopmentChecklist.setVisible(false);
            FinanceChecklist.setVisible(true);
            CorporateHR.setVisible(false);
        }
        else {
            ITChecklist.setVisible(false);
            ITChecklistAccessAndDL.setVisible(false);
            AdminChecklist.setVisible(false);
            EmployeeEngagementChecklist.setVisible(false);
            LearningandDevelopmentChecklist.setVisible(false);
            EmployeeDevelopmentChecklist.setVisible(false);
            FinanceChecklist.setVisible(false);
            CorporateHR.setVisible(true);
            if (formcontext.getAttribute("pg_caseapproval").getValue() != 1) {
                AuditCL.setVisible(true);
            }
        }
    }

    else if (applicationselect == 140310004) {
     
        kaizenTab.setVisible(false);
        HRInternalTab.setVisible(false);
    }

    else if (applicationselect == 140310010 && caseTitle.includes("IT")) {

        if (caseTitle.includes("Asset") || caseTitle.includes("Backup")) {
            ITChecklist.setVisible(true);
        }
        else if (caseTitle.includes("Access") || caseTitle.includes("DL")) {
            ITChecklistAccessAndDL.setVisible(true);
        }

        // ITChecklist.setVisible(true);
        AdminChecklist.setVisible(false);
        EmployeeEngagementChecklist.setVisible(false);
        LearningandDevelopmentChecklist.setVisible(false);
        EmployeeDevelopmentChecklist.setVisible(false);
        FinanceChecklist.setVisible(false);
     
        kaizenTab.setVisible(false);
        HRInternalTab.setVisible(true);
        CheckListTab_OFF.setVisible(false);
        CorporateHR.setVisible(false);
    }
    else if (applicationselect == 140310008) {
        kaizenTab.setVisible(true);
    Details.setVisible(false);
        HRInternalTab.setVisible(false);
    

    }
    else if (applicationselect == 140310016) {
        kaizenTab.setVisible(false);
     
        if (subjectselect == 140310000) {
            HRInternalTab.setVisible(true);
        }
        else {
            kaizenTab.setVisible(false);
      
            HRInternalTab.setVisible(false);

        }
    }
    else {
     
        kaizenTab.setVisible(false);
        HRInternalTab.setVisible(false);
     
    }

}
function onloadOffboardingSupportTab(context) {
    debugger;
    var formcontext = context.getFormContext();
   
    var kaizenTab = formcontext.ui.tabs.get("tab_9");
    var HRInternalTab = formcontext.ui.tabs.get("tab_4");
    var webrec_marketing = formcontext.getControl("WebResource_Onchange_marketing");
    var applicationselect = 0;
    var subjectselect = 0;

    try {
        applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }

    try {
        subjectselect = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    }
    catch {
        var subjectselect = 0;
    }

    //Kaizen Fields
    formcontext.getAttribute("pg_kaizenname").setRequiredLevel("none");
    formcontext.getAttribute("pg_businessproblem").setRequiredLevel("none");
    formcontext.getAttribute("pg_proposedsolution").setRequiredLevel("none");
    formcontext.getAttribute("pg_benefitsofimplementingthissolution").setRequiredLevel("none");
    formcontext.getAttribute("pg_costsavings").setRequiredLevel("none");

    //BCA Fields
    formcontext.getAttribute("pg_candidatename1").setRequiredLevel("none");
    formcontext.getAttribute("pg_dojo").setRequiredLevel("none");
    formcontext.getAttribute("pg_clientname").setRequiredLevel("none");
    formcontext.getAttribute("pg_jobtitle").setRequiredLevel("none");
    formcontext.getAttribute("pg_jobdescription").setRequiredLevel("none");
    formcontext.getAttribute("pg_placementnumber").setRequiredLevel("none");
    formcontext.getAttribute("pg_worklocation").setRequiredLevel("none");
    formcontext.getAttribute("pg_findingsinthebgreport").setRequiredLevel("none");

    if (applicationselect == 140310004) {
     
        kaizenTab.setVisible(false);
        HRInternalTab.setVisible(false);
        webrec_marketing.setVisible(false);
    }
    //Kaizen
    else if ((applicationselect == 140310008)) {
        kaizenTab.setVisible(true);
   
        HRInternalTab.setVisible(false);
        webrec_marketing.setVisible(false);
        formcontext.getAttribute("pg_kaizenname").setRequiredLevel("required");
        formcontext.getAttribute("pg_businessproblem").setRequiredLevel("required");
        formcontext.getAttribute("pg_proposedsolution").setRequiredLevel("required");
        formcontext.getAttribute("pg_benefitsofimplementingthissolution").setRequiredLevel("required");
        formcontext.getAttribute("pg_costsavings").setRequiredLevel("required");
    }
    //HR Internal
    else if (applicationselect == 140310016 && subjectselect == 140310000) {
        kaizenTab.setVisible(false);
      
        webrec_marketing.setVisible(false);
        HRInternalTab.setVisible(true);
        //BCA fields
        formcontext.getAttribute("pg_candidatename1").setRequiredLevel("required");
        formcontext.getAttribute("pg_dojo").setRequiredLevel("required");
        formcontext.getAttribute("pg_clientname").setRequiredLevel("required");
        formcontext.getAttribute("pg_jobtitle").setRequiredLevel("required");
        formcontext.getAttribute("pg_jobdescription").setRequiredLevel("required");
        formcontext.getAttribute("pg_placementnumber").setRequiredLevel("required");
        formcontext.getAttribute("pg_worklocation").setRequiredLevel("required");
        formcontext.getAttribute("pg_findingsinthebgreport").setRequiredLevel("required");
    }
}

function onloadChildCheckListTab(context) {
    debugger;
    var formcontext = context.getFormContext();
    var checkListTab = formcontext.ui.tabs.get("tab_8");
    var hrSection = checkListTab.sections.get("tab_7_section_2");
    var benefitsSection = checkListTab.sections.get("tab_8_section_1");
    var controllerSection = checkListTab.sections.get("tab_8_section_3");
    var talentEngagementSection = checkListTab.sections.get("tab_8_section_4");
    var equipmentSection = checkListTab.sections.get("tab_8_section_5");
    var disableLicenseSection = checkListTab.sections.get("tab_8_section_6");
    var backgroundCheckSection = checkListTab.sections.get("tab_8_section_7");
    var othersSection = checkListTab.sections.get("tab_8_section_8");
    var payrollSection = checkListTab.sections.get("tab_8_section_9");
    var auditSection = checkListTab.sections.get("tab_8_section_10");
    var adminSection = checkListTab.sections.get("tab_8_section_11");
    var technologySection = checkListTab.sections.get("tab_8_section_12");
    var caseTitle = formcontext.getAttribute("title").getValue();
    var origin = formcontext.getAttribute("caseorigincode").getValue();
    var centralizedAccessSection = checkListTab.sections.get("tab_8_section_13");
    var application = formcontext.getAttribute("pg_application").getValue();

    if (origin == 140310000 && !caseTitle.includes("Send Termination") && application != 140310017 && application != 140310010 && application != 10) {
        checkListTab.setVisible(true);
        if (caseTitle.includes("Remove Access")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(false);
            technologySection.setVisible(false);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(false);
            adminSection.setVisible(false);
            technologySection.setVisible(true);
            centralizedAccessSection.setVisible(false);
        }
        if (caseTitle.includes("Cut Benefits")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(true);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(false);
            equipmentSection.setVisible(false);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(false);
            adminSection.setVisible(false);
            technologySection.setVisible(false);
            centralizedAccessSection.setVisible(false);
        }
        if (caseTitle.includes("Audit Tracking")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(false);
            equipmentSection.setVisible(false);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(true);
            adminSection.setVisible(false);
            technologySection.setVisible(false);
            centralizedAccessSection.setVisible(false);
        }
        if (caseTitle.includes("Cut off Payment")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(false);
            equipmentSection.setVisible(false);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(true);
            auditSection.setVisible(false);
            adminSection.setVisible(false);
            technologySection.setVisible(false);
            centralizedAccessSection.setVisible(false);
        }
        if (caseTitle.includes("Controller")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(true);
            talentEngagementSection.setVisible(false);
            equipmentSection.setVisible(false);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(false);
            adminSection.setVisible(false);
            technologySection.setVisible(false);
            centralizedAccessSection.setVisible(false);
        }
        if (caseTitle.includes("Equipment return")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(false);
            equipmentSection.setVisible(true);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(false);
            adminSection.setVisible(false);
            technologySection.setVisible(false);
            centralizedAccessSection.setVisible(false);
        }
        /*
        if (caseTitle.includes("Send Termination")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(false);
            technologySection.setVisible(false);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(false);
            adminSection.setVisible(false);
            technologySection.setVisible(false);
        }
        */

        if (caseTitle.includes("database")) {
            hrSection.setVisible(true);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(false);
            equipmentSection.setVisible(false);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(false);
            adminSection.setVisible(false);
            technologySection.setVisible(false);
            centralizedAccessSection.setVisible(false);
        }
        if (caseTitle.includes("Talent Engagement")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(true);
            equipmentSection.setVisible(false);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(false);
            adminSection.setVisible(false);
            centralizedAccessSection.setVisible(false);
            technologySection.setVisible(false);
        }
        if (caseTitle.includes("Remove Job Board")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(false);
            equipmentSection.setVisible(false);
            disableLicenseSection.setVisible(true);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(false);
            adminSection.setVisible(false);
            technologySection.setVisible(false);
            centralizedAccessSection.setVisible(false);
        }
        if (caseTitle.includes("Admin Access")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(false);
            equipmentSection.setVisible(false);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(false);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(false);
            adminSection.setVisible(true);
            technologySection.setVisible(false);
            centralizedAccessSection.setVisible(false);
        }
        if (caseTitle.includes("Background")) {
            hrSection.setVisible(false);
            benefitsSection.setVisible(false);
            controllerSection.setVisible(false);
            talentEngagementSection.setVisible(false);
            equipmentSection.setVisible(false);
            disableLicenseSection.setVisible(false);
            backgroundCheckSection.setVisible(true);
            othersSection.setVisible(false);
            payrollSection.setVisible(false);
            auditSection.setVisible(false);
            adminSection.setVisible(false);
            technologySection.setVisible(false);
            centralizedAccessSection.setVisible(true);
        }
    }
    else checkListTab.setVisible(false);
}


function onChangeBenefits(context) {
    var formcontext = context.getFormContext();
    var benefitsControl = formcontext.getControl("pg_benefitssubcategory");

    try {
        var benefitSelect = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    }
    catch
    {
        var benefitSelect = 0;
    }

    var options = benefitsControl.getOptions();

    for (let i = 0; i < options.length; i++) {
        benefitsControl.removeOption(options[i].value);
    }

    if (benefitSelect == 62) {
        formcontext.getControl("pg_benefitssubcategory").setVisible(true);
        benefitsControl.addOption({ text: 'Rollovers', value: 1 });
        benefitsControl.addOption({ text: 'Enrollment', value: 2 });
        benefitsControl.addOption({ text: 'Cancel Contributions', value: 3 });
        benefitsControl.addOption({ text: 'Access Account', value: 4 });
        benefitsControl.addOption({ text: 'Withdrawals', value: 5 });
    }
    if (benefitSelect == 63) {
        formcontext.getControl("pg_benefitssubcategory").setVisible(true);
        benefitsControl.addOption({ text: 'Medical Attention Needed', value: 6 });
        benefitsControl.addOption({ text: 'No Medical Attention Needed', value: 7 });
    }
    if (benefitSelect == 64) {
        formcontext.getControl("pg_benefitssubcategory").setVisible(true);
        benefitsControl.addOption({ text: 'FMLA', value: 8 });
        benefitsControl.addOption({ text: 'PFL', value: 9 });
        benefitsControl.addOption({ text: 'STD', value: 10 });
        benefitsControl.addOption({ text: 'Unpaid', value: 11 });
        benefitsControl.addOption({ text: 'Maternity', value: 12 });
    }
    if (benefitSelect == 65) {
        formcontext.getControl("pg_benefitssubcategory").setVisible(false);
    }
    if (benefitSelect == 66) {
        formcontext.getControl("pg_benefitssubcategory").setVisible(true);
        benefitsControl.addOption({ text: 'Greenshades information', value: 13 });
        benefitsControl.addOption({ text: 'Reset Password', value: 14 });
        benefitsControl.addOption({ text: 'Cant access Account', value: 15 });
    }
    if (benefitSelect == 67) {
        formcontext.getControl("pg_benefitssubcategory").setVisible(true);
        benefitsControl.addOption({ text: 'Receiving Packages', value: 16 });
        benefitsControl.addOption({ text: 'General COBRA information', value: 17 });
    }
    if (benefitSelect == 68) {
        formcontext.getControl("pg_benefitssubcategory").setVisible(true);
        benefitsControl.addOption({ text: 'Explain Benefits', value: 18 });
        benefitsControl.addOption({ text: 'Overcharge/Undercharge', value: 19 });
        benefitsControl.addOption({ text: 'Qualifying Life Event', value: 20 });
        benefitsControl.addOption({ text: 'Missing Benefit', value: 21 });
        benefitsControl.addOption({ text: 'Need Insurance Card', value: 22 });
        benefitsControl.addOption({ text: 'How to Enroll', value: 23 });
        benefitsControl.addOption({ text: 'Provider Search', value: 24 });
    }
    if (benefitSelect == 69) {
        formcontext.getControl("pg_benefitssubcategory").setVisible(true);
        benefitsControl.addOption({ text: 'Commuter Card', value: 25 });
        benefitsControl.addOption({ text: 'Contribution desposits', value: 26 });
    }
    if (benefitSelect == 70) {
        formcontext.getControl("pg_benefitssubcategory").setVisible(false);
    }
    if (benefitSelect == 71) {
        formcontext.getControl("pg_benefitssubcategory").setVisible(false);
    }
}



function dynamicsSupportOptionset(context) {
    var formcontext = context.getFormContext();
    var dynamicsissues = formcontext.getControl("pg_dynamicssupportissue");

    try {
        var subjectSelect = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    }
    catch
    {
        var subjectSelect = 0;
    }

    var options = dynamicsissues.getOptions();

    for (let i = 0; i < options.length; i++) {
        dynamicsissues.removeOption(options[i].value);
    }

    if (subjectSelect == 72) {
        dynamicsissues.addOption({ text: "Report", value: 1 });
        dynamicsissues.addOption({ text: "Payroll Issue", value: 2 });
        dynamicsissues.addOption({ text: "Benefit Update", value: 3 });
        dynamicsissues.addOption({ text: "General Ledger Issue", value: 4 });
        dynamicsissues.addOption({ text: "AP/AR Issue", value: 5 });
        dynamicsissues.addOption({ text: "Other", value: 6 });
    }
    if (subjectSelect == 73) {
        dynamicsissues.addOption({ text: "Report Request", value: 7 });
        dynamicsissues.addOption({ text: "Data Issues", value: 8 });
        dynamicsissues.addOption({ text: "Other", value: 6 });
    }
    if (subjectSelect == 74) {
        dynamicsissues.addOption({ text: "Access", value: 9 });
        dynamicsissues.addOption({ text: "Report/Dashboard Requests", value: 10 });
        dynamicsissues.addOption({ text: "Change Request", value: 11 });
        dynamicsissues.addOption({ text: "Process/Workflow Errors", value: 12 });
        dynamicsissues.addOption({ text: "Other", value: 6 });
    }
}

function onloadMarketing(context) {
    var formContext = context.getFormContext();

    if (formContext.getAttribute("pg_application").getValue() == 140310012) {
        formContext.getControl("pg_dojo").setVisible(true);
    }
    else formContext.getControl("pg_dojo").setVisible(false);
}

function onChangeFeasible(context) {
    var formContext = context.getFormContext();
    var feasibility = formContext.getAttribute("cr1bf_pg_feasible").getValue();

    if (feasibility == 325490000) {
        var confirmStrings = { text: "This Kaizen Idea is Feasible?", title: "Confirmation " };
        var confirmOptions = { height: 200, width: 450 };
        Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
            function (success) {
                if (success.confirmed)
                    console.log("Dialog closed using OK button.");
                else
                    console.log("Dialog closed using Cancel button or X.");
            });
    }
    else if (feasibility == 325490001) {
        var confirmStrings = { text: "This Kaizen Idea is Not Feasible?", title: "Confirmation " };
        var confirmOptions = { height: 200, width: 450 };
        Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
            function (success) {
                if (success.confirmed) {
                    console.log("Dialog closed using OK button.");
                    formContext.data.entity.save();
                }
                else
                    console.log("Dialog closed using Cancel button or X.");
            });
    }
}

function onloadOnchangeSubject(context) {
    debugger;
    var formcontext = context.getFormContext();

    var kaizenTab = formcontext.ui.tabs.get("tab_9");
    var HRInternalTab = formcontext.ui.tabs.get("tab_4");
    var webrec_marketing = formcontext.getControl("WebResource_Onchange_marketing");
    try {
        var applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
        var subjectselect = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }
    //HR Internal
    if (applicationselect == 140310016 && subjectselect == 140310000) {
        kaizenTab.setVisible(false);
    
        HRInternalTab.setVisible(true);
    }
    else if (applicationselect == 140310012 && subjectselect == 57) {
        kaizenTab.setVisible(false);
   
        HRInternalTab.setVisible(false);

        webrec_marketing.setVisible(true);
    }
    else if (applicationselect == 140310012 && subjectselect != 57) {
        kaizenTab.setVisible(false);
     
        HRInternalTab.setVisible(false);

        webrec_marketing.setVisible(false);
    }


    else {

        kaizenTab.setVisible(false);
     
        HRInternalTab.setVisible(false);
        webrec_marketing.setVisible(false);
    }
}

function AssetLostField(context) {

    debugger;

    var formcontext = context.getFormContext();
    var DepartmnetHead = formcontext.getControl("pg_deduction");
    try {
        var applicationselect = formcontext.getAttribute("pg_assetlost").getValue();

        //var subjectselect = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }
    if (applicationselect == 1) {
        DepartmnetHead.setVisible(true);
    }
    else {
        DepartmnetHead.setVisible(false);
    }

}

var Case;
Case = {};
Case.formEvents = {
    form_load: function (context) {
        var formcontext = context.getFormContext();
        formcontext.data.process.addOnPreStageChange(Case.formEvents.handleStageMovement);
    },
    handleStageMovement: function (context) {
        var bpfArguments = context.getEventArgs();
        var formcontext = context.getFormContext();
        var bpfstage = formcontext.data.process.getActiveStage().getName();
        //alert(bpfstage);
        if (bpfArguments.getDirection() === "Previous") {
            bpfArguments.preventDefault();
            var alertStrings = { confirmButtonLabel: "OK", text: "Cannot Move to Prev Stage", title: "Cannot Move to Prev Stage" };
            var alertOptions = { height: 200, width: 300 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
            return;
        }
        if (bpfstage == "Check Lists" || bpfstage == "Finance Clearance") {
            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_childcasecount").getValue() != null && formcontext.getAttribute("pg_childcasecount").getValue() != 0) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Please complete the checklist fully and accurately, to proceed to the next stage.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;
            }
        }
        if (bpfstage == "Notice Period Waiver Approval") {
            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_noticeperiodwaiver").getValue() == true && (formcontext.getAttribute("pg_noticeperiodapprover1").getValue() == 2 || formcontext.getAttribute("pg_noticeperiodapprover2").getValue() == 2)) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Before moving to the Next Stage, Approval needed from HR and Department Head.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;
            }
        }
        /*
                if (bpfstage == "Approval") {
                    if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_caseapproval").getValue() != 3) {
                        bpfArguments.preventDefault();
                        alertStrings = { confirmButtonLabel: "OK", text: "Before moving to the Next Stage, Approval needed from Audit Team", title: "Cannot Move to Next Stage" };
                        alertOptions = { height: 200, width: 300 };
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                        return;
                    }
                }
        */
        if (bpfstage == "Corporate HR") {
            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_issuerelievingletter").getValue() == 1) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Before moving to Next Stage, Relieving letter needs to be sent or marked as NA", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;
            }
        }
//Data Change
        if (bpfstage == "Review") {
            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_childcasecount").getValue() != null && formcontext.getAttribute("pg_childcasecount").getValue() != 0) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Please complete the checklist fully and accurately, to proceed to the next stage.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;
            }
        }
        //audit stage
        if (bpfstage == "Approval") {
            var hrcompleted = formcontext.getAttribute("pg_hrreviewcompleted").getValue();
            var admincompleted = formcontext.getAttribute("pg_adminreviewcompleted").getValue();
            var itcamreviewcompleted = formcontext.getAttribute("pg_itcamreviewcompleted").getValue();
            var ithelpdeskcompleted = formcontext.getAttribute("pg_ithelpdeskreviewcompleted").getValue();
            var employeedevelopmentreviewcompleted = formcontext.getAttribute("pg_employeedevelopmentreviewcompleted").getValue();
            var employeeengagementreviewcompleted = formcontext.getAttribute("pg_employeeengagementreviewcompleted").getValue();
            var learningdevelopmentreviewcompleted = formcontext.getAttribute("pg_learningdevelopmentreviewcompleted").getValue();
            var financereviewcompleted = formcontext.getAttribute("pg_financereviewcompleted").getValue();

   var employmentupdatecommunicationshared = formcontext.getAttribute("pg_employmentupdatecommunicationshared").getValue();
        var updatelwdinspine = formcontext.getAttribute("pg_updatelwdinspine").getValue();
        var updatelwdinmsd = formcontext.getAttribute("pg_updatelwdinmsd").getValue();
        var subordinatesreportingmanagerupdatedinmsd = formcontext.getAttribute("pg_subordinatesreportingmanagerupdatedinmsd").getValue();
     
        var triggerchildtickets = formcontext.getAttribute("pg_triggerchildtickets").getValue();
        var issuerelievingletter = formcontext.getAttribute("pg_issuerelievingletter").getValue();
   var application = formcontext.getAttribute("pg_application").getValue();
  if ((bpfArguments.getDirection() === "Next" && application !=140310020 && ((hrcompleted || admincompleted || itcamreviewcompleted || ithelpdeskcompleted || employeedevelopmentreviewcompleted || learningdevelopmentreviewcompleted || employeeengagementreviewcompleted || financereviewcompleted) == 1) || (employmentupdatecommunicationshared==1 || updatelwdinspine==1 || updatelwdinmsd==1 || subordinatesreportingmanagerupdatedinmsd==1 || triggerchildtickets==false || issuerelievingletter==1))){
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Please complete audit of all requests.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;
            }
        }

    }
};


function assetstate(context) {
    var formcontext = context.getFormContext();

    var currentassetstate = 0;
    try {
        currentassetstate = formcontext.getAttribute("pg_assetstate").getValue();
    } catch { }

    var listassetdetails = formcontext.getControl("pg_listassetdetails");
    var assetvalue = formcontext.getControl("pg_assetvalue");
    var amountToBeRecovered = formcontext.getControl("pg_amounttoberecovered");

    if (currentassetstate == 1 || currentassetstate == 2) {
        listassetdetails.setVisible(true);
        assetvalue.setVisible(true);
        amountToBeRecovered.setVisible(true);
    }
    else {
        listassetdetails.setVisible(false);
        assetvalue.setVisible(false);
        amountToBeRecovered.setVisible(false);
    }
}

function openAuditComments(context) {
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "cr4a2_reactivateconfirm_bcf63",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 700,
        height: 400
    }
    ).then(console.log).catch(console.error);
}

//Last Working Day Validation
function lastWorkingDay(context) {
    var formcontext = context.getFormContext();
    try {
        var lastWorkingDate = formcontext.getAttribute("pg_lastworkingdate").getValue();
        var currentDate = new Date();
        var formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        if (lastWorkingDate <= formattedDate) {
            console.log("Past Date Current: " + currentDate + " Last: " + formattedDate)
        }
        else {
            console.log("Future Date Current: " + currentDate + " Last: " + formattedDate);
        }
    }
    catch {
        console.log("error");
    }
}

function onChangeIndiaIT(context) {
    var formcontext = context.getFormContext();
    var indiaITSubcategory = formcontext.getControl("pg_helpdesksubcategory");
    var subject = formcontext.getAttribute("pg_casesubject").getValue();

    var options = indiaITSubcategory.getOptions();

    for (let i = 0; i < options.length; i++) {
        indiaITSubcategory.removeOption(options[i].value);
    }

    //Hardware
    if (subject == 111) {
        indiaITSubcategory.addOption({ text: "System Movement", value: 1 });
        indiaITSubcategory.addOption({ text: "Third Party Support", value: 2 });
        indiaITSubcategory.addOption({ text: "New HW Purchase", value: 3 });
        indiaITSubcategory.addOption({ text: "System Issue", value: 4 });
        indiaITSubcategory.addOption({ text: "LAN/WiFi Issue", value: 5 });
        indiaITSubcategory.addOption({ text: "Printer Issue", value: 6 });
        indiaITSubcategory.addOption({ text: "Headset Issue", value: 7 });
        indiaITSubcategory.addOption({ text: "Desktop HW Issue", value: 8 });
        indiaITSubcategory.addOption({ text: "Laptop HW Issue", value: 9 });
        indiaITSubcategory.addOption({ text: "Monitor Issue", value: 10 });
        indiaITSubcategory.addOption({ text: "Physical Damaged", value: 11 });
        indiaITSubcategory.addOption({ text: "ADP Warranty", value: 12 });
        indiaITSubcategory.addOption({ text: "Warranty Replacement", value: 13 });
        indiaITSubcategory.addOption({ text: "Accessories Issue", value: 14 });
        indiaITSubcategory.addOption({ text: "Performance Issue", value: 15 });
indiaITSubcategory.addOption({ text: "Laptop Wipeout", value: 50 });
    }

    //Software
    else if (subject == 110) {
        indiaITSubcategory.addOption({ text: "OS & Officce Activation Issue", value: 16 });
        indiaITSubcategory.addOption({ text: "VoIP Setup, VoIP Issue", value: 17 });
        indiaITSubcategory.addOption({ text: "Software: Application Issue", value: 18 });
        indiaITSubcategory.addOption({ text: "GP Remote Issue", value: 19 });
        indiaITSubcategory.addOption({ text: "Website Issue", value: 20 });
        indiaITSubcategory.addOption({ text: "Outlook Issue", value: 48 });
        indiaITSubcategory.addOption({ text: "MS O365 Issues", value: 21 });
        indiaITSubcategory.addOption({ text: "Teams Issue", value: 22 });
        indiaITSubcategory.addOption({ text: "Scan Issue", value: 23 });
        indiaITSubcategory.addOption({ text: "Software Application Request", value: 24 });
        indiaITSubcategory.addOption({ text: "Launch Issue", value: 25 });
        indiaITSubcategory.addOption({ text: "DL Update", value: 26 });
        indiaITSubcategory.addOption({ text: "Sharepoint Issue", value: 27 });
indiaITSubcategory.addOption({ text: "OS upgrade", value: 140310000 });
    }
    //Other
    else if (subject == 27) {
        indiaITSubcategory.addOption({ text: "Intune Setup", value: 28 });
        indiaITSubcategory.addOption({ text: "NHC", value: 29 });
        indiaITSubcategory.addOption({ text: "LWD", value: 30 });
        indiaITSubcategory.addOption({ text: "Asset Management", value: 31 });
        indiaITSubcategory.addOption({ text: "Floor Support", value: 32 });
        indiaITSubcategory.addOption({ text: "ISP Issue", value: 33 });
        //indiaITSubcategory.addOption({ text: "Agreement & Gate Pass", value: 34 });
        indiaITSubcategory.addOption({ text: "Not a task", value: 35 });
        indiaITSubcategory.addOption({ text: "Duplicate Ticket", value: 36 });
        indiaITSubcategory.addOption({ text: "SPAM - Email", value: 37 });
        indiaITSubcategory.addOption({ text: "Meeting Request", value: 38 });
        indiaITSubcategory.addOption({ text: "VPN Issues", value: 39 });
        indiaITSubcategory.addOption({ text: "Ring Central / create, reset PIN, reset password", value: 40 });
        indiaITSubcategory.addOption({ text: "HR: On-boarding/ Disabling Accounts/Azure/Emails/RingCentral/P3/RemoteDekstop/Launch", value: 41 });
        indiaITSubcategory.addOption({ text: "HR: Title change request", value: 48 });
        indiaITSubcategory.addOption({ text: "HR: Manager change request", value: 49 });
        indiaITSubcategory.addOption({ text: "HR:Off-boarding/ Disabling Accounts/Azure/Emails/RingCentral/P3/RemoteDekstop/Launch", value: 42 });
        indiaITSubcategory.addOption({ text: "Firewall: White List or Block URL", value: 43 });
        indiaITSubcategory.addOption({ text: "Firmware Update: Unify Cloud Keys and Access Points", value: 44 });
        indiaITSubcategory.addOption({ text: "Firmware Update: Firewalls", value: 45 });
        indiaITSubcategory.addOption({ text: "Firmware Update: switches", value: 46 });
        indiaITSubcategory.addOption({ text: "Firmware Update: Remote Desktop Azure", value: 47 });

    }
}
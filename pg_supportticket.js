function incidentmanagement(executionContext) {
    debugger;

    var formContext = executionContext.getFormContext();
 if (formContext.getAttribute("pg_application").getSelectedOption() !== null) {
   var applicationselect = formContext.getAttribute("pg_application").getSelectedOption().value;
    }
    var incidentmanagementtab = formContext.ui.tabs.get("tab_13");//Incident Management
    incidentmanagementtab.setVisible(false);
    if (applicationselect == 140310028) {
        incidentmanagementtab.setVisible(true);
        formContext.getControl("pg_subject").setVisible(false);
        formContext.getControl("pg_priority").setVisible(false);
        formContext.getControl("pg_severity").setVisible(false);
    
    
    }
    else{
      
        incidentmanagementtab.setVisible(false);
        formContext.getControl("pg_subject").setVisible(true);
        formContext.getControl("pg_priority").setVisible(true);
        formContext.getControl("pg_severity").setVisible(true);
}
}


function getDojoDepartment(context) {

    var formContext = context.getFormContext();

    try {
        //Get Owner ID and get Worker Email
        var owner = formContext.getAttribute("ownerid");
        var ownerid = owner.getValue()[0].id;
        var email = "";

        Xrm.WebApi.online.retrieveMultipleRecords("systemuser", "?$filter=systemuserid eq " + ownerid + "&$top=1").then(
            function success(results) {
                //console.log(results);
                for (var i = 0; i < results.entities.length; i++) {
                    var result = results.entities[i];
                    email = result["internalemailaddress"];

                    Xrm.WebApi.online.retrieveMultipleRecords("pg_prideemployee", "?$filter=emailaddress eq '" + email + "'&$top=1").then(
                        function success(results2) {
                            //console.log(results2);
                            for (var i = 0; i < results2.entities.length; i++) {
                                var result2 = results2.entities[i];
                                var dojo = result2["pg_dojo"];
                                formContext.getAttribute("pg_dojo").setValue(dojo);
                                formContext.getAttribute("pg_dojooption").setValue(dojo);
                            }
                        },
                        function (error) {
                            console.log(error.message);
                        }
                    );

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


function setPEOnCreate(context) {
    //check if it is create form
    var formContext = context.getFormContext();

    if (formContext.ui.getFormType() == 1) {
        try {
            //Get Owner ID and get Worker Email
            var owner = formContext.getAttribute("ownerid");
            var ownerid = owner.getValue()[0].id;
            var email = "";

            Xrm.WebApi.online.retrieveMultipleRecords("systemuser", "?$filter=systemuserid eq " + ownerid + "&$top=1").then(
                function success(results) {
                    for (var i = 0; i < results.entities.length; i++) {
                        var result = results.entities[i];
                        email = result["internalemailaddress"];

                        Xrm.WebApi.online.retrieveMultipleRecords("pg_prideemployee", "?$filter=emailaddress eq '" + email + "'&$top=1").then(
                            function success(results2) {
                                for (var i = 0; i < results2.entities.length; i++) {
                                    var result2record = results2.entities[i];
                                    /*
                                    var employee = [];
                                    employee[0] = {};
                                    employee[0].id = result2record["pg_prideemployeeid"];
                                    employee[0].name = result2record["pg_name"];
                                    employee[0].entityType = "pg_prideemployee";
                                    formContext.getAttribute("pg_employee").setValue(employee);
                                    */

                                    var managerId = result2record["_pg_reportstoid_value"];

                                    Xrm.WebApi.online.retrieveRecord("pg_prideemployee", managerId, "?$select=pg_prideemployeeid,emailaddress,pg_name").then(
                                        function success(result) {
                                            var pg_name = result["pg_name"];

                                            var manager = [];
                                            manager[0] = {};
                                            manager[0].name = pg_name;
                                            manager[0].id = managerId;
                                            manager[0].entityType = "pg_prideemployee";
                                            formContext.getAttribute("cr1bf_departmentleads").setValue(manager);
                                        },
                                        function (error) {
                                            console.log(error.message);
                                        }
                                    );
                                }
                            },
                            function (error) {
                                console.log(error.message);
                            }
                        );

                    }
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
        catch {
        }

        //formContext.getAttribute("pg_name").setValue("Leave");
    }

    else {
        //formContext.getControl("pg_manager").setVisible(true);
    }
}

function onChangePreAdverseAction(context) {
    var formContext = context.getFormContext();
    var actiontaken = formContext.getAttribute("pg_preadverseaction").getValue();
    var actionDate = formContext.getAttribute("pg_preadverseactiondate");
    if (actiontaken == true) {
        var currentDate = new Date();
        actionDate.setValue(currentDate);
        formContext.getControl("pg_finaladverseactiontaken").setVisible(true);
        formContext.getControl("pg_finalactiondate").setVisible(true);
    }
}
function onChangeFinalAdverseAction(context) {
    var formContext = context.getFormContext();
    var actiontaken = formContext.getAttribute("pg_finaladverseactiontaken").getValue();
    if (actiontaken == true) {
        var currentDate = new Date();
        formContext.getAttribute("pg_finalactiondate").setValue(currentDate);
    }
}

function onloadCandidateInfoTab(context) {
    var formContext = context.getFormContext();
    var adjudicationCheck = formContext.getAttribute("pg_adjudicationcheck").getValue();
    var candidateInfoTab = formContext.ui.tabs.get("tab_4");
    var adverseActionSection = candidateInfoTab.sections.get("tab_4_section_2");
    var adjudicationSection = candidateInfoTab.sections.get("tab_4_section_3");
    var actiontaken = formContext.getAttribute("pg_preadverseaction").getValue();
    if (adjudicationCheck == true) {
        adverseActionSection.setVisible(true);
        adjudicationSection.setVisible(true);
    }
    if (actiontaken == true) {
        formContext.getControl("pg_finaladverseactiontaken").setVisible(true);
        formContext.getControl("pg_finalactiondate").setVisible(true);
    }
}

function onloadTabs(context) {
    debugger;
    var formcontext = context.getFormContext();

    var kaizenTab = formcontext.ui.tabs.get("tab_9");
    var HRInternalTab = formcontext.ui.tabs.get("tab_4");

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

  
     if (applicationselect == 140310008) {
        kaizenTab.setVisible(true);

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

function onloadChangeSubject(context) {
    debugger;
    var formcontext = context.getFormContext();


    var kaizenTab = formcontext.ui.tabs.get("tab_9");
    var HRInternalTab = formcontext.ui.tabs.get("tab_4");
    var webrec_marketing = formcontext.getControl("WebResource_Onchange_marketing");
    var reminder = formcontext.getControl("pg_6monthreminder");
    var benefitsControl = formcontext.getControl("pg_benefitssubcategory");
    var subject = formcontext.getControl("pg_subject");
    try {
        var applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
        var subjectselect = formcontext.getAttribute("pg_subject").getSelectedOption().value;
        var options = benefitsControl.getOptions();
        var benefitSelect = subjectselect;

        for (let i = 0; i < options.length; i++) {
            benefitsControl.removeOption(options[i].value);
        }
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
    else if (applicationselect == 140310012 && subjectselect == 94) {
        kaizenTab.setVisible(false);

        HRInternalTab.setVisible(false);
        reminder.setVisible(true);
        webrec_marketing.setVisible(false);
    }
    //Benefits
    else if (applicationselect == 140310007) {
        var subjectOptions = subject.getOptions();
        for (let i = 0; i < subjectOptions.length; i++) {
            subject.removeOption(subjectOptions[i].value);
        }
      

        if (benefitSelect == 62) {
            formcontext.getControl("pg_benefitssubcategory").setVisible(true);
            benefitsControl.addOption({ text: 'Rollovers', value: 1 });
            benefitsControl.addOption({ text: 'Enrollment', value: 2 });
            benefitsControl.addOption({ text: 'Cancel Contributions', value: 3 });
            benefitsControl.addOption({ text: 'Access Account', value: 4 });
            benefitsControl.addOption({ text: 'Withdrawals', value: 5 });
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
      
        if (benefitSelect == 70) {
            formcontext.getControl("pg_benefitssubcategory").setVisible(false);
        }
        if (benefitSelect == 71) {
            formcontext.getControl("pg_benefitssubcategory").setVisible(false);
        }
    }
    else {
        kaizenTab.setVisible(false);

        HRInternalTab.setVisible(false);
        webrec_marketing.setVisible(false);
        reminder.setVisible(false);
    }
}



function onloadAdditionalTabs(context) {
    debugger;
    var formcontext = context.getFormContext();
    var kaizenTab = formcontext.ui.tabs.get("tab_9");
    var HRInternalTab = formcontext.ui.tabs.get("tab_4");
    var webrec_marketing = formcontext.getControl("WebResource_Onchange_marketing");
    var applicationselect = 0;
    var subjectselect = 0;
    var dateset = new Date();
  ///  OnChangeExitType(context);
  ///  leavereasonUS(context);

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


    //Kaizen
    if ((applicationselect == 140310008)) {
        kaizenTab.setVisible(true);

        HRInternalTab.setVisible(false);
        webrec_marketing.setVisible(false);
  
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
       
        formcontext.getAttribute("pg_worklocation").setRequiredLevel("required");
        formcontext.getAttribute("pg_findingsinthebgreport").setRequiredLevel("required");
    }
    else if (applicationselect == 140310012) {
        formcontext.getControl("pg_dojo").setVisible(true);
    }

    else {
        kaizenTab.setVisible(false);

        webrec_marketing.setVisible(false);
        HRInternalTab.setVisible(false);

        formcontext.getControl("pg_dojo").setVisible(false);
    }
}



function getEmployeeID(context) {
    formcontext = context.getFormContext();
    try {
        var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;

        Xrm.WebApi.online.retrieveRecord("pg_prideemployee", employee, "?$select=pg_employeeid_india").then(
            function success(result) {
                var pg_employeeid_india = result["pg_employeeid_india"];
                var employeeidindia = new Array();

                employeeidindia[0] = new Object();

                employeeidindia[0].id = pg_employeeid_india;
                formcontext.getAttribute("pg_employeeidindia").setValue(employeeidindia[0].id);
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
function SupportTicketOnloadandSave(context) {
    debugger;
    formcontext = context.getFormContext();
    var dateset = new Date();

    if (formcontext.getAttribute("pg_exitnotificationdate").getValue() == null) {

        formcontext.getAttribute("pg_exitnotificationdate").setValue(dateset);
    }
}

function NoticePeriodWaiver(context) {
    debugger;
    var formcontext = context.getFormContext();
    var DepartmentHead = formcontext.getControl("pg_departmenthead");
    try {
        var applicationselect = formcontext.getAttribute("pg_noticeperiodwaiverneeded").getValue();
        var dh = formcontext.getAttribute("pg_departmenthead");
        //var subjectselect = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }
    if (applicationselect == true) {
        DepartmentHead.setVisible(true);
        dh.setRequiredLevel("required");
    }
    else {
        DepartmentHead.setVisible(false);
        dh.setRequiredLevel("none");
    }
}

function onChangeEmployee(context) {
    var formcontext = context.getFormContext();
    try {
        var employee = formcontext.getAttribute("pg_employee");
        var employeeid = employee.getValue()[0].id;

        Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$select=cdm_workernumber&$filter=_pg_pe_value eq " + employeeid + "&$top=1").then(
            function success(results) {
                console.log(results);
                for (var i = 0; i < results.entities.length; i++) {
                    var result = results.entities[i];
                    // Columns
                    var cdm_workerid = result["cdm_workerid"]; // Guid
                    var cdm_workernumber = result["cdm_workernumber"]; // Text
                    formcontext.getAttribute("pg_personnelnumber").setValue(cdm_workernumber);
                }
            },
            function (error) {
                console.log(error.message);
            }
        );
    }
    catch {
        console.log("Null Value");
    }
}

function OnChangeExitType(context) {
    var formcontext = context.getFormContext();
    var exittype = formcontext.getAttribute("pg_terminationreason").getValue();
    var reason = formcontext.getControl("pg_reasonforleaving");
    var exitreason = reason.getOptions();
    if (exittype != null) {
        for (let i = 0; i < exitreason.length; i++) {
            reason.removeOption(exitreason[i].value);
        }
        if (!exittype) {  //Voluntary
            reason.addOption({ text: 'Better Opportunity', value: 1 })
            reason.addOption({ text: 'Family', value: 2 })
          
        }
        else if (exittype) {  //Involuntary
            reason.addOption({ text: 'Compliance', value: 7 })
            reason.addOption({ text: 'Failure', value: 8 })
            reason.addOption({ text: 'Non-Performance', value: 9 })
            reason.addOption({ text: 'Conduct', value: 10 })
        }
    }
}

function leavereasonUS(context) {
    var formcontext = context.getFormContext();
    var type = formcontext.getAttribute("pg_terminationreason").getValue();
    var reason = formcontext.getControl("pg_reasonfortermination");
    if (type == 1) {
        reason.setVisible(true);
    }
    else reason.setVisible(false);
}

function populateDivisionHeadEmail(context) {
    var formcontext = context.getFormContext();
    var divisionHead = formcontext.getAttribute("pg_departmenthead").getValue();
    var email = "";
    if (divisionHead == 140310003) {  //Aarthi
        email = "aarthi.ilangovan@russelltobin.com"
    }
    else if (divisionHead == 140310013) {  //Anjali Krishnakumar
        email = "anjali.krishnakumar@pridetech.com";
    }
 
    formcontext.getAttribute("pg_divisionheademail").setValue(email);
}

function populateNewDivisionHeadEmail(context) {
    var formcontext = context.getFormContext();
    var divisionHead = formcontext.getAttribute("pg_division_head_new_team").getValue();
    var email = "";
    if (divisionHead == 140310000) {  //Aarthi
        email = "aarthi.ilangovan@russelltobin.com"
    }
  
    else if (divisionHead == 140310018) {  //Venkatesh Chandiraraj
        email = "venkatesh.chandiraraj@pridetech.com";
    }
    else {
        email = "";
    }
    formcontext.getAttribute("pg_newdivisionheademail").setValue(email);
}

function onChangeApplicationSelect(context) {
    var formcontext = context.getFormContext();
    var subject = formcontext.getControl("pg_subject");
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
    formcontext.getControl("pg_description").setVisible(true);
    formcontext.getControl("pg_benefitsdescription").setVisible(false);
    subject.setVisible(true);


    //GP
    if (applicationselect == 140310000) {
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Change Request', value: 2 });
        subject.addOption({ text: 'Functional', value: 3 });
        subject.addOption({ text: 'Reports', value: 4 });
        subject.addOption({ text: 'Upgrade Issues', value: 94 });
    }

    //XYME US/India
    if ((applicationselect == 140310001) || (applicationselect == 140310002)) {
        subject.addOption({ text: 'Access', value: 1 });
        subject.addOption({ text: 'Change Request', value: 2 });
        subject.addOption({ text: 'Standard', value: 5 });
    }

  


    //Launch ATS
    if ((applicationselect == 140310014)) {
        subject.addOption({ text: 'Question', value: 22 });
        subject.addOption({ text: 'Login Issue', value: 23 });
    
    }

    //Kaizen
    if ((applicationselect == 140310008)) {
        subject.addOption({ text: 'Suggestion', value: 26 });
    }
    //HR Internal
    if ((applicationselect == 140310016)) {
        subject.addOption({ text: 'Background Check Authorization', value: 140310000 });
    }

   // Reporting and Analytics
    if ((applicationselect == 140310011)) {
        subject.addOption({ text: 'Questions about an existing report', value: 28 });
       
    }

    //Marketing
    if ((applicationselect == 140310012)) {
        subject.addOption({ text: 'Awards', value: 47 });
       
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
        subject.addOption({ text: 'Greenwich', value: 95 });
        subject.addOption({ text: 'NY Office', value: 96 });
        subject.addOption({ text: 'Bernardsville', value: 97 });
        subject.addOption({ text: 'PA Warehouse', value: 98 });
    }

    //Compliance 
    if ((applicationselect == 140310021)) {
        subject.addOption({ text: 'TPA - Third Party Risk Assessment Questionanaire Review', value: 300 });
       
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
}

function onChangeIndiaITS(context) {
    var formcontext = context.getFormContext();
    var indiaITSubcategory = formcontext.getControl("pg_helpdesksubcategory");
    var subject = formcontext.getAttribute("pg_subject").getValue();

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
       
    }

    //Software
    else if (subject == 110) {
        indiaITSubcategory.addOption({ text: "OS & Officce Activation Issue", value: 16 });
        indiaITSubcategory.addOption({ text: "VoIP Setup, VoIP Issue", value: 17 });
        indiaITSubcategory.addOption({ text: "Software: Application Issue", value: 18 });
    
    }
    //Other
    else if (subject == 27) {
        indiaITSubcategory.addOption({ text: "Intune Setup", value: 28 });
        indiaITSubcategory.addOption({ text: "NHC", value: 29 });
        indiaITSubcategory.addOption({ text: "LWD", value: 30 });
        indiaITSubcategory.addOption({ text: "Asset Management", value: 31 });
        
        indiaITSubcategory.addOption({ text: "Firmware Update: Remote Desktop Azure", value: 47 });
    }
}

function SupportOptionRemovalIndia(context) {
    var applicationControl = formcontext.getControl("pg_application");
    applicationControl.removeOption(140310019);
  
    applicationControl.removeOption(140310016);
    applicationControl.removeOption(140310023);


}
function SupportOptionRemovalUS(context) {
    var applicationControl = formcontext.getControl("pg_application");
    applicationControl.removeOption(10);
    //applicationControl.removeOption(140310017);
    applicationControl.removeOption(140310002);
    applicationControl.removeOption(140310010);
    applicationControl.removeOption(140310007);
    applicationControl.removeOption(140310020);
    applicationControl.removeOption(140310023);

}
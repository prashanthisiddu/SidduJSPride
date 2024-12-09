function BPFMoveoffphilipines(executionContext) {
    var formContext = executionContext.getFormContext();
    var activeStage = Xrm.Page.data.process.getActiveStage();
    var stageId = activeStage.getId();
    if (stageId === "572f7cbf-38b3-4a65-838f-b7645cc97d4a") {////finance stage
        formContext.data.process.moveNext();
    }
    else if (stageId === "55979d26-cf76-4c8e-ab04-16706c4ad9dc") {///hr stage
        formContext.data.process.moveNext();
    }
}


function showandhideresolve(primaryControl) {
    debugger;
    var formContext = primaryControl;
    var application = formContext.getAttribute("pg_application").getValue();
    var origin = formContext.getAttribute("caseorigincode").getValue();
    var caseaprovl = formContext.getControl("pg_caseapproval").setVisible(false);
    var caseapproval = formContext.getAttribute("pg_caseapproval").getValue();
    var subject = formContext.getAttribute("pg_casesubject").getValue();
    if (application === 10 && origin === 3) {
        var divisionheadapproval = formContext.getAttribute("pg_divisionheadapproval").getValue();
        if (divisionheadapproval === 1 && caseapproval === 3 || divisionheadapproval === 1 && subject === 140310004 || divisionheadapproval === 1 && subject === 140310006 || divisionheadapproval === 1 && subject === 140310003) {
            return true;
        }
        else {
            return false;
        }
    }
    if (application === 140310017 && origin === 3) {
        if (caseapproval === 3) {
            return true;
        }
        else {
            return false;
        }
    }

    var activeStage = Xrm.Page.data.process.getActiveStage();
    var stageId = activeStage.getId();

    if (stageId != "356ecd08-43c3-4585-ae94-6053984bc0a9" && origin === 3 && application === 140310020) {
        return false;
    }
    else if (application === 140310020 && origin === 140310000) {
        return true;
    }
    else {
        return true;
    }

}



function setdisbledonload(context) {
    debugger;
    var formContext = context.getFormContext();
    var application = formContext.getAttribute("pg_application").getValue();
    var childcasecount = formContext.getAttribute("pg_childcasecount").getValue();
    var origin = formContext.getAttribute("caseorigincode").getValue();
    if (application === 10 && origin === 3 || application === 140310020 && origin === 3) {
        formContext.getControl("header_process_pg_noticeperiodwaiver").setDisabled(true);
    }

    else {
        formContext.getControl("header_process_pg_noticeperiodwaiver").setDisabled(false);
    }
    if (application === 10 && origin === 3 && childcasecount === 0) {

        formContext.getAttribute("pg_caseapproval").setValue(3);
    }
    else {
    }
    if (application === 140310020 && origin === 3) {
        formContext.getControl("header_process_pg_noticeperiodwaiver").setVisible(false);
        formContext.getControl("header_process_pg_noticeperiodwaiver_1").setVisible(false);
        formContext.getControl("header_process_pg_noticeperiodwaiver_2").setVisible(false);
    }

    else {
        ///formContext.getControl("header_process_pg_noticeperiodwaiver").setVisible(true);
    }
    if (application === 10 && origin === 3) {
        formContext.getControl("header_process_pg_noticeperiodcheck").setVisible(false);
        formContext.getControl("header_process_pg_noticeperiodwaiver").setVisible(false);
    }
    else {
        formContext.getControl("header_process_pg_noticeperiodcheck").setVisible(true);
        formContext.getControl("header_process_pg_noticeperiodwaiver").setVisible(true);
    }
}




function requiredfield(executionContext) {
    debugger;

    var formContext = executionContext.getFormContext();
    var assetstate = formContext.getAttribute("pg_assetstate").getValue();

    if (assetstate === "Lost" || assetstate === 2) {

        formContext.getAttribute("pg_listassetdetails").setRequiredLevel("required");
        formContext.getAttribute("pg_deduction").setRequiredLevel("required");
        formContext.getAttribute("pg_assetvalue").setRequiredLevel("required");
        formContext.getControl("pg_amounttoberecovered").setVisible(false);
        formContext.getControl("pg_deduction").setVisible(true);
        formContext.getControl("pg_assetvalue").setVisible(true);

    }
    else if (assetstate === 0) {
        formContext.getControl("pg_deduction").setVisible(false);
    }
    else if (assetstate === 1) {
        formContext.getAttribute("pg_listassetdetails").setRequiredLevel("required");
        formContext.getAttribute("pg_deduction").setRequiredLevel("required");
        formContext.getAttribute("pg_assetvalue").setRequiredLevel("required");
        formContext.getControl("pg_amounttoberecovered").setVisible(false);
        formContext.getControl("pg_deduction").setVisible(true);
        formContext.getControl("pg_assetvalue").setVisible(true);
    }
}








function TicketChangecase(executionContext) {
    debugger;

    var formContext = executionContext.getFormContext();
    var datachange = formContext.ui.tabs.get("tab_13");
    datachange.setVisible(false);

    var reportingmanagersec = datachange.sections.get("tab_13_section_1");
    var reportingemployeessec = datachange.sections.get("tab_13_section_26");
    var teamrsec = datachange.sections.get("tab_13_section_3");
    var section = datachange.sections.get("Summary_section_6");
    var divisionheadsec = datachange.sections.get("tab_13_section_9");
    var dojosec = datachange.sections.get("tab_13_section_4");
    var worklocsec = datachange.sections.get("tab_13_section_5");
    var workmodesec = datachange.sections.get("tab_13_section_6");
    var salaryrevisionsec = datachange.sections.get("tab_13_section_7");
    ///datachangechecklist

    var reportinghrsec = datachange.sections.get("tab_13_section_20");
    var teamrhrsec = datachange.sections.get("tab_13_section_25");
    var dojohrsec = datachange.sections.get("tab_13_section_23");
    var worklochrsec = datachange.sections.get("tab_13_section_24");
    var workmodehrsec = datachange.sections.get("tab_13_section_21");
    var salaryhrsec = datachange.sections.get("tab_13_section_22");
    var checkListTab = formContext.ui.tabs.get("tab_8");

    var caseTitle = formContext.getAttribute("title").getValue();
    var origin = formContext.getAttribute("caseorigincode").getValue();

    var TriggertoITCAM = datachange.sections.get("Trigger to IT-CAM");
    var TriggertoRandA = datachange.sections.get("Trigger to R&A");
    var ITCAMChecklist = datachange.sections.get("tab_13_section_12");
    var RandAchecklist = datachange.sections.get("tab_13_section_14");
    var FinanceChecklist = datachange.sections.get("tab_13_section_15");
    var AdminChecklist = datachange.sections.get("tab_13_section_16");
    var Admin = datachange.sections.get("tab_13_section_18");
    var IThelpdesk = datachange.sections.get("tab_13_section_17");
    var FinanceCheck = datachange.sections.get("tab_13_section_28");
    var ITCAMCheck = datachange.sections.get("tab_13_section_27");

    var TriggertoFinance = datachange.sections.get("tab_13_section_19");
    var subgridsec = datachange.sections.get("tab_13_section_10");
    var repmanagerchange = formContext.getAttribute("pg_reporting_employees_change_for").getValue();
    var workmode = formContext.getAttribute("pg_workmode").getValue();
    var applicationselect = 0;
    var subject = 0;
    try {
        var applicationselect = formContext.getAttribute("pg_application").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }
    try {
        var subject = formContext.getAttribute("pg_casesubject").getSelectedOption().value;
    }
    catch {
        var subject = 0;
    }

    


    if (origin === 140310000 && applicationselect === 10 && subject === 1000 && caseTitle.includes("IT-CAM Checklist")) {
        datachange.setVisible(true);
        TriggertoITCAM.setVisible(true);
        checkListTab.setVisible(false);
        divisionheadsec.setVisible(false);
        subgridsec.setVisible(false);
        reportingmanagersec.setVisible(false);
        reportinghrsec.setVisible(false);
        formContext.getAttribute("pg_updateexchangeserveraz").setRequiredLevel("required");
    }
    if (origin === 140310000 && applicationselect === 10 && subject === 1000 && caseTitle.includes("R&A Checklist")) {
        datachange.setVisible(true);
        TriggertoRandA.setVisible(true);
        checkListTab.setVisible(false);
        divisionheadsec.setVisible(false);
        subgridsec.setVisible(false);
        reportingmanagersec.setVisible(false);
        reportinghrsec.setVisible(false);
        formContext.getAttribute("pg_updatepowerbireports").setRequiredLevel("required");
    }
    
    if (origin === 140310000 && applicationselect === 10 && subject === 140310003 && caseTitle.includes("Admin Checklist")) {
        AdminChecklist.setVisible(true);
        checkListTab.setVisible(false);
        divisionheadsec.setVisible(false);
        subgridsec.setVisible(false);
        teamrsec.setVisible(false);
        section.setVisible(false);
        teamrhrsec.setVisible(false);
        formContext.getAttribute("pg_newshiftupdat").setRequiredLevel("required");
        formContext.getAttribute("pg_newseatallotted").setRequiredLevel("required");
    }
    if (origin === 140310000 && applicationselect === 10 && subject === 140310005 && workmode === 140310000 || workmode === 140310002 && caseTitle.includes("IT-CAM Checklist")) {
        ITCAMCheck.setVisible(true);
        checkListTab.setVisible(false);
        divisionheadsec.setVisible(false);
        subgridsec.setVisible(false);
        worklocsec.setVisible(false);
        worklochrsec.setVisible(false);
        formContext.getAttribute("pg_updateexchangeserverazure").setRequiredLevel("required");
    }
    if (origin === 140310000 && applicationselect === 10 && subject === 140310005 && caseTitle.includes("Finance Checklist")) {
        subgridsec.setVisible(false);
        divisionheadsec.setVisible(false);
        FinanceCheck.setVisible(true);
        checkListTab.setVisible(false);
        worklocsec.setVisible(false);
        worklochrsec.setVisible(false);
        formContext.getAttribute("pg_updateworklocationinpayrolldata").setRequiredLevel("required");
        formContext.getAttribute("pg_updatept").setRequiredLevel("required");
        formContext.getAttribute("pg_updatelwf").setRequiredLevel("required");
        formContext.getAttribute("pg_minimumwagecheck").setRequiredLevel("required");
    }
    if (origin === 140310000 && applicationselect === 10 && subject === 140310005 && caseTitle.includes("IT-CAM Checklist")) {
        ITCAMCheck.setVisible(true);
        checkListTab.setVisible(false);
        divisionheadsec.setVisible(false);
        subgridsec.setVisible(false);
        worklocsec.setVisible(false);
        worklochrsec.setVisible(false);
        formContext.getAttribute("pg_updateexchangeserverazure").setRequiredLevel("required");
    }
    if (origin === 140310000 && applicationselect === 10 && subject === 140310008 && caseTitle.includes("Trigger to Finance")) {
        TriggertoFinance.setVisible(true);
        checkListTab.setVisible(false);
        divisionheadsec.setVisible(false);
        subgridsec.setVisible(false);
        salaryrevisionsec.setVisible(false);
        salaryhrsec.setVisible(false);
        formContext.getAttribute("pg_salaryrevisionrequestupdatedinpayroll").setRequiredLevel("required");
    }

}

function hidedatachangetab(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    var datachange = formContext.ui.tabs.get("tab_13");
    datachange.setVisible(false);

    var reportingmanagersec = datachange.sections.get("tab_13_section_1");

    var teamrsec = datachange.sections.get("tab_13_section_3");
    var dojosec = datachange.sections.get("tab_13_section_4");
    var worklocsec = datachange.sections.get("tab_13_section_5");
    var workmodesec = datachange.sections.get("tab_13_section_6");
    var salaryrevisionsec = datachange.sections.get("tab_13_section_7");
    var applicationselect = 0;

    try {
        var applicationselect = formContext.getAttribute("pg_application").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }
    if (applicationselect != 10) {
        datachange.setVisible(false);
        reportingmanagersec.setVisible(false);

        teamrsec.setVisible(false);
        dojosec.setVisible(false);
        workmodesec.setVisible(false);
        worklocsec.setVisible(false);
        salaryrevisionsec.setVisible(false);
    }
}



function setreportingemployechangeforvalue(executionContext) {
    debugger;

    var formContext = executionContext.getFormContext();
    var applicationselect = formContext.getAttribute("pg_application").getValue();
    var subject = formContext.getAttribute("pg_casesubject").getValue();
    var caseTitle = formContext.getAttribute("title").getValue();
    if (applicationselect === 10 && subject === 1000) {
        Xrm.WebApi.online.retrieveMultipleRecords("pg_supportticket", "?$filter=pg_name eq '" + caseTitle + "'&$top=1").then(
            function success(results) {
                for (var i = 0; i < results.entities.length; i++) {
                    var pg_reportingmanagerchangefor = results.entities[i]["pg_reportingmanagerchangefor"];
                    var reportingmanagerchange = new Array();
                    reportingmanagerchange[0] = new Object();

                    reportingmanagerchange[0].id = pg_reportingmanagerchangefor;
                    formContext.getAttribute("pg_reporting_employees_change_for").setValue(reportingmanagerchange[0].id);
                }

            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

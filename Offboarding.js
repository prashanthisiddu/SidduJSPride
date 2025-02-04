
//for lookup field update we need to add the entity type instead of entity(reportid[0].entity===>>>reportid[0].entityType)

function getEmailReportto2(context) {
    formContext = context.getFormContext();
    try {
        var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;

        Xrm.WebApi.online.retrieveRecord("pg_prideemployee", employee, "?$select=emailaddress,_pg_reportstoid_value").then(
            function success(result) {
                var emailaddress = result["emailaddress"];
                var _pg_reportstoid_value = result["_pg_reportstoid_value"];
                var _pg_reportstoid_value_formatted = result["_pg_reportstoid_value@OData.Community.Display.V1.FormattedValue"];
                var _pg_reportstoid_value_lookuplogicalname = result["_pg_reportstoid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
               
        
                var reportid = new Array();
                reportid[0] = new Object();
                reportid[0].id = _pg_reportstoid_value;
                reportid[0].name = _pg_reportstoid_value_formatted;
                reportid[0].entityType = _pg_reportstoid_value_lookuplogicalname;
                formContext.getAttribute("pg_emailaddress").setValue(emailaddress);
                formContext.getAttribute("pg_reportingmanager").setValue(reportid);
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





function OffBasedonWMode(executionContext)
{
    debugger;
    var formContext = executionContext.getFormContext();

    var country = formContext.getAttribute("pg_country").getSelectedOption().value;
    var PhysicalDamageInvoice = formContext.getAttribute("pg_physicaldamageinvoice").getValue();
    var PhysicalDamage = formContext.getAttribute("pg_physicaldamage").getValue();
    var PhysicalDamagecost = formContext.getAttribute("pg_physicaldamagecost1").getValue();
    var PhysicalDamageAmountreceived = formContext.getAttribute("pg_physicaldamageamountreceived").getValue();
    var Name = formContext.getAttribute("pg_name").getValue();
    
    if (country === 140310000 && Name.includes("Offboarding India - IT")) {
        var WorkMode = formContext.getAttribute("pg_workmode").getValue();
        if (WorkMode === 140310000){
          var w = formContext.getControl("pg_ifuserworkingpibmodeneedaddress").setVisible(true);
          var x = formContext.getControl("pg_contactpersonname").setVisible(true);
          var y = formContext.getControl("pg_mobilenumber").setVisible(true);
          var z = formContext.getControl("pg_availabletimetopickup").setVisible(true);
       }
       if(WorkMode === 140310001){
        var w = formContext.getControl("pg_ifuserworkingpibmodeneedaddress").setVisible(false);
        var x = formContext.getControl("pg_contactpersonname").setVisible(false);
        var y = formContext.getControl("pg_mobilenumber").setVisible(false);
        var z = formContext.getControl("pg_availabletimetopickup").setVisible(false);
       }
   
       if(PhysicalDamage === 140310000)
       {
        formContext.getControl("pg_physicaldamagecost1").setVisible(true);
        formContext.getControl("pg_physicaldamageinvoice").setVisible(true);
        formContext.getControl("pg_physicaldamageamountreceived").setVisible(true);
       }
       if(PhysicalDamage === 140310001)
       {
        formContext.getControl("pg_physicaldamagecost1").setVisible(false);
        formContext.getControl("pg_physicaldamageinvoice").setVisible(false);
        formContext.getControl("pg_physicaldamageamountreceived").setVisible(false);
       }
}
}

function AuditReactivate(context) {//internal queries
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "crc22_auditresolve_b0fcb",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).then(console.log).catch(console.error);
}


function ResolveOff(context) {//internal queries
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "pg_resolveoff_3dc51",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).then(console.log).catch(console.error);
}














function OnSaveSetDiable(context) {
   var formContext = context.getFormContext();
   formContext.getControl("pg_candidates").setDisabled(true);          
          formContext.getControl("pg_contacts").setDisabled(true);
          formContext.getControl("pg_companies").setDisabled(true);
          formContext.getControl("pg_activejobs").setDisabled(true);
          formContext.getControl("pg_emailforwards").setDisabled(true);
          formContext.getControl("pg_phonecalls").setDisabled(true);
          formContext.getControl("pg_opentransactions").setDisabled(true);
          formContext.getControl("pg_subordinates").setDisabled(true);
}
         







function AutomoveStage(context) {
    debugger;
    var formContext = context.getFormContext();
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var Country = formContext.getAttribute("pg_country").getValue();
	var childcount = formContext.getAttribute("pg_childcasecount").getValue();
	//var issuerelievingletter = formContext.getAttribute("pg_issuerelievingletter").getValue();
    
    if (stageId === "4c7f2103-bf8d-41e3-ab46-9fd42b0e40c2" && childcount===0){//Check List
		formContext.data.process.moveNext();
    }
	if (stageId === "60aa7fd2-9569-4bf5-92d5-9d44108cb4c2" && childcount===0){//Finance Clearance
		formContext.data.process.moveNext();
    }
//if(issuerelievingletter===0 || issuerelievingletter===2){
//formContext.data.process.moveNext();
//}

}
















function ApprovalSection(context) {
    debugger;
    var formcontext = context.getFormContext();
    var activeStage = formcontext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var Country = formcontext.getAttribute("pg_country").getValue();
    var type = formcontext.getAttribute("pg_type").getValue();
var offboardingTab = formcontext.ui.tabs.get("tab_1");
var offindiaapproval = formcontext.ui.tabs.get("tab_3");
var offindia =formcontext.ui.tabs.get("tab_2");
var offPHP = formcontext.ui.tabs.get("tab_4");//tab_4
if (Country === 140310000 && type===140310000 && (stageId === "700f3e1e-be0c-4d82-9765-ee4dd7758c63" || stageId === "8b2de035-fa2a-43b5-a20a-a389aa2241fb")){//india//Employee Information
  
    offindia.setVisible(true);
}

else{
    offindia.setVisible(false);
}
if (stageId === "4b984d5e-0c1e-4ceb-ad04-56df205822d6" && (Country === 140310000 || Country === 140310002)){//Approval//india
  
    offindiaapproval.setVisible(true);
}
else{
    offindiaapproval.setVisible(false);
}
if (Country === 140310002 && type===140310000 && (stageId === "d6f762b1-d70b-4076-95f6-66793cfbc34a" || stageId === "8b2de035-fa2a-43b5-a20a-a389aa2241fb" || stageId === "700f3e1e-be0c-4d82-9765-ee4dd7758c63")){//philipines//identity 
  
    offPHP.setVisible(true);
}
else{
    offPHP.setVisible(false);
}
}















function Resolvebtn(primaryControl) {
    debugger;
    var formContext = primaryControl;
  
        var country = formContext.getAttribute("pg_country").getSelectedOption().value;
    
    var Name = formContext.getAttribute("pg_name").getValue();
  var type = formContext.getAttribute("pg_type").getValue();

        var activeStage = formContext.data.process.getActiveStage();
        var stageId = activeStage.getId();
    if (country === 140310000 && Name.includes("Offboarding India - Admin")) {
        var a = formContext.getAttribute("pg_assetpickupcoordination").getValue();
        var b = formContext.getAttribute("pg_assetreceivedhandedovertoit").getValue();
        var c = formContext.getAttribute("pg_idaccesscardreceived").getValue();
        var d = formContext.getAttribute("pg_accesscarddeactivated").getValue();
        var e = formContext.getAttribute("pg_drawerkeyreceived").getValue();
        var f = formContext.getAttribute("pg_datacarddongle").getValue();
        var g = formContext.getAttribute("pg_mobilephonesim").getValue();
        var h = formContext.getAttribute("pg_medicalinsuranceterminated").getValue();
        if (a === 1 || b === 1 || c === 1 || d === 1 || e === 1 || f === 1 || g === 1 || h === 1) {
            return false;
        }
        else {
            return true;

        }
    } if (country === 140310000 && Name.includes("Offboarding India - Employee Development")) {
        var a = formContext.getAttribute("pg_deactivatexyme").getValue();
        var b = formContext.getAttribute("pg_updatebonuseligibilityinbonusfile").getValue();
        if (a === 1 || b === 1) {
            return false;
        }
        else {
            return true;

        }
    } if (country === 140310000 && Name.includes("Offboarding India - Employee Engagement")) {
        var a = formContext.getAttribute("pg_updatedeierglist").getValue();
        var b = formContext.getAttribute("pg_updateclashoftitanshouselistjosh").getValue();
        var c = formContext.getAttribute("pg_conductexitinterview").getValue();
        var d = formContext.getAttribute("pg_disabledojostoreaccess").getValue();
        var e = formContext.getAttribute("pg_cancelopenordersinthequeue").getValue();
        if (a === 1 || b === 1 || c === 1 || d === 1 || e === 1) {
            return false;
        }
        else {
            return true;
        }
    
} if (country === 140310000 && Name.includes("Offboarding India - IT")) {
    var assetissued = formContext.getAttribute("pg_assetissued").getValue();
    var databackupcompleted = formContext.getAttribute("pg_databackupcompleted").getValue();
    var assetreceived = formContext.getAttribute("pg_assetreceived").getValue();
   // var assetstate = formContext.getAttribute("pg_assetstate").getValue();
  //  var assetinventoryupdated = formContext.getAttribute("pg_assetinventoryupdated").getValue();
  //  var listassetdetails = formContext.getAttribute("pg_listassetdetails").getValue;
 //   var assetvalue = formContext.getAttribute("pg_assetvalue").getValue();
   // var deduction = formContext.getAttribute("pg_deduction").getValue();
   // var amounttoberecovered = formContext.getAttribute("pg_amounttoberecovered").getValue;
    if (assetissued === 1 || databackupcompleted === 1 || assetreceived === 1) {// || assetstate === 1 || assetinventoryupdated === 1 || listassetdetails === 1 || assetvalue === 1 || deduction === 1 || amounttoberecovered === 1
        return false;
    }
    else {
        return true;

    }
} if (country === 140310000  && type===140310008 && Name.includes("Offboarding India - IT CAM")) {
    var able = formContext.getAttribute("pg_able").getValue();
    var echosign = formContext.getAttribute("pg_echosign").getValue();
    var hireright = formContext.getAttribute("pg_hireright").getValue();
    var crimcheck = formContext.getAttribute("pg_crimcheck").getValue();
    var clientvmstools = formContext.getAttribute("pg_clientvmstools").getValue();
    var backgroundobcomments = formContext.getAttribute("pg_backgroundobcomments").getValue;
    var hubspot = formContext.getAttribute("pg_hubspot").getValue();
    var disablelaunchaccess = formContext.getAttribute("pg_disablelaunchaccess").getValue();
    var disableusersaccesstoemail = formContext.getAttribute("pg_disableusersaccesstoemail").getValue;
    var launchatsdeactivation = formContext.getAttribute("pg_launchatsdeactivation").getValue;
    var disablep3access = formContext.getAttribute("pg_disablep3access").getValue();
    var removeusersemailfromalldis = formContext.getAttribute("pg_removeusersemailfromalldistributionlists").getValue();
    var firstadvantage = formContext.getAttribute("pg_firstadvantage").getValue;
    if (able === 1 || echosign === 1 || hireright === 1 || crimcheck === 1 || clientvmstools === 1 || backgroundobcomments === 1 || hubspot === 1 || disablelaunchaccess === 1 || disableusersaccesstoemail === 1 || launchatsdeactivation === 1 || disablep3access === 1 || removeusersemailfromalldis === 1 || firstadvantage === 1) {
        return false;
    }
    else {
        return true;

    }



} if (country === 140310000 && Name.includes("Offboarding India - Learning & Development")) {
    var a = formContext.getAttribute("pg_completeactivetrainingsinlms").getValue();
    var b = formContext.getAttribute("pg_deactivatelmsaccess").getValue();
    if (a === 1 || b === 1) {
        return false;
    }
    else {
        return true;

    }
}
if (country === 140310000 && Name.includes("Offboarding India - Finance")) {
	var a = formContext.getAttribute("pg_updatetallywithenddate").getValue();
	var b = formContext.getAttribute("pg_moveemployeefrompayrolltoff").getValue();
	var c = formContext.getAttribute("pg_receiveffclearancefromhr").getValue();
	var d = formContext.getAttribute("pg_processff").getValue();
	var e = formContext.getAttribute("pg_processgratuity").getValue();
	var f = formContext.getAttribute("pg_processleaveencashment").getValue();
	var g = formContext.getAttribute("pg_processdeductionsforlopadjustments").getValue();
	var h = formContext.getAttribute("pg_publishffpayslip").getValue();
	var i = formContext.getAttribute("pg_updatedateofexitinpfportal").getValue();
	if (a === 1 || b === 1 || c === 1 || d === 1 || e === 1 || f === 1 || g === 1 || h === 1 || i === 1) {
		return false;
	}
	else {
		return true;

	}
}
if (country === 140310002 && Name.includes("Offboarding PHP - Admin")) {
    var a = formContext.getAttribute("pg_assetcollected").getValue();
    var b = formContext.getAttribute("pg_assetresetcoordinedwithit").getValue();
    var c = formContext.getAttribute("pg_buildingaccesscardcollected").getValue();
    if (a === 1 || b === 1 || c === false) {
        return false;
    }
    else {
        return true;

    }
} if (country === 140310002 && Name.includes("Offboarding PHP - Employee Development")) {
    var a = formContext.getAttribute("pg_deactivatexyme").getValue();
    var b = formContext.getAttribute("pg_updatebonuseligibilityinbonusfile1").getValue();
    if (a === 1 || b === 1) {
        return false;
    }
    else {
        return true;

    }
} if (country === 140310002 && Name.includes("Offboarding PHP - Employee Engagement")) {
    var a = formContext.getAttribute("pg_updatedeierglist1").getValue();
    var b = formContext.getAttribute("pg_updateclashoftitanshouselistjosh1").getValue();
    var c = formContext.getAttribute("pg_conductexitinterview1").getValue();
    if (a === 1 || b === 1 || c === 1) {
        return false;
    }
    else {
        return true;

    }
} if (country === 140310002 && Name.includes("Offboarding PHP - IT CAM")) {
    var a = formContext.getAttribute("pg_useraccessdeactivatedinalltools").getValue();
    var b = formContext.getAttribute("pg_azureadaccessdeactivated").getValue();
    var c = formContext.getAttribute("pg_nameremovedfromdls").getValue();
    var d = formContext.getAttribute("pg_emaildeactivated").getValue();
    var e = formContext.getAttribute("pg_emailforwarding").getValue();
    if (a === 1 || b === 1 || c === 1 || d === 1 || e === 1) {
        return false;
    }
    else {
        return true;

    }
} if (country === 140310002 && Name.includes("Offboarding PHP - IT")) {
    var a = formContext.getAttribute("pg_assetissued1").getValue();
    var b = formContext.getAttribute("pg_databackupcompleted1").getValue();
    var c = formContext.getAttribute("pg_assetreceived1").getValue();
    var d = formContext.getAttribute("pg_assetinventoryupdatedinmsd1").getValue();
    if (a === 1 || b === 1 || c === 1 || d === false) {
        return false;
    }
    else {
        return true;

    }
} if (country === 140310002 && Name.includes("Offboarding PHP - Learning & Development")) {
   // var a = formContext.getAttribute("pg_completeactivetrainingsindocebo").getValue();
    var b = formContext.getAttribute("pg_deactivatedoceboaccess").getValue();

    if (b === 1) {
        return false;
    }
    else {
        return true;

    }
  }if (country === 140310002 && Name.includes("Offboarding PHP - Finance")) {
        var updatetallywithenddate = formContext.getAttribute("pg_updatetallywithenddate").getValue();
        var moveemployeefrompayrolltoff = formContext.getAttribute("pg_moveemployeefrompayrolltoff").getValue();
        var receiveffclearancefromhr = formContext.getAttribute("pg_receiveffclearancefromhr").getValue();
        var processff = formContext.getAttribute("pg_processff").getValue();
        var processshiftdifferential = formContext.getAttribute("pg_processshiftdifferential").getValue();
        var processholidaypaydifferential = formContext.getAttribute("pg_processholidaypaydifferential").getValue();
        var processleaveencashment = formContext.getAttribute("pg_processleaveencashment").getValue();
        var processdeductionsforlopadjustments = formContext.getAttribute("pg_processdeductionsforlopadjustments").getValue();
        var publishffpayslip = formContext.getAttribute("pg_publishffpayslip").getValue();
      
        if (updatetallywithenddate === 1 || moveemployeefrompayrolltoff === 1 || receiveffclearancefromhr === 1 ||processff === 1 || processshiftdifferential === 1 || processholidaypaydifferential === 1 ||processleaveencashment === 1 || processdeductionsforlopadjustments === 1 || publishffpayslip === 1) {
            return false;
        }
        else {
            return true;
    
        }
}
   if ((type === 140310000 && stageId === "de2ea5e9-e671-42e0-8884-3d4237f3a0f8") || (country === 140310001 && type != 140310000)) {
        return true;
    }
    else {
        return false;
    }
    

}


function Resolveforoffboarding(primaryControl) {
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
















function SetCurrentstage(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var Country = formContext.getAttribute("pg_country").getText();
    if (stageId === "d6f762b1-d70b-4076-95f6-66793cfbc34a"){//Identity
        formContext.getAttribute("pg_currentstage").setValue(140310000);
    }
    if (stageId === "700f3e1e-be0c-4d82-9765-ee4dd7758c63"){//Research
        formContext.getAttribute("pg_currentstage").setValue(140310001);
    }
    if (stageId === "8b2de035-fa2a-43b5-a20a-a389aa2241fb"){//Employee Information
        formContext.getAttribute("pg_currentstage").setValue(140310002);
    }
    if (stageId === "4c7f2103-bf8d-41e3-ab46-9fd42b0e40c2"){//Check List
        formContext.getAttribute("pg_currentstage").setValue(140310003);
    }
    if (stageId === "60aa7fd2-9569-4bf5-92d5-9d44108cb4c2"){//Finance Clearance
        formContext.getAttribute("pg_currentstage").setValue(140310004);
    }
    if (stageId === "b7b7d93c-db60-40fa-92e4-d9971e3a1012"){//Corporate HR
        formContext.getAttribute("pg_currentstage").setValue(140310005);
    }
    if (stageId === "4b984d5e-0c1e-4ceb-ad04-56df205822d6"){//Approval
        formContext.getAttribute("pg_currentstage").setValue(140310006);
    }
    if (stageId === "de2ea5e9-e671-42e0-8884-3d4237f3a0f8"){//Resolve
        formContext.getAttribute("pg_currentstage").setValue(140310007);
    }
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

        if (bpfstage === "Check List" || bpfstage === "Finance Clearance") {

            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_childcasecount").getValue() != null && formcontext.getAttribute("pg_childcasecount").getValue() != 0) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Please complete the Child Ticket fully and accurately, to proceed to the next stage.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;

            }

        }
if (bpfstage === "Approval" && country === 140310000) {
	var hrcompleted = formcontext.getAttribute("pg_hrreviewcompleted").getValue();
	var admincompleted = formcontext.getAttribute("pg_adminreviewcompleted").getValue();
	var itcamreviewcompleted = formcontext.getAttribute("pg_itcamreviewcompleted").getValue();
	var ithelpdeskcompleted = formcontext.getAttribute("pg_ithelpdeskreviewcompleted").getValue();
	var employeedevelopmentreviewcompleted = formcontext.getAttribute("pg_employeedevelopmentreviewcompleted").getValue();
	var employeeengagementreviewcompleted = formcontext.getAttribute("pg_employeeengagementreviewcompleted").getValue();
	var learningdevelopmentreviewcompleted = formcontext.getAttribute("pg_learningdevelopmentreviewcompleted").getValue();
	var financereviewcompleted = formcontext.getAttribute("pg_financereviewcompleted").getValue();
if (
	bpfArguments.getDirection() === "Next" && country != 140310001
  && ((hrcompleted || admincompleted || itcamreviewcompleted || ithelpdeskcompleted ||employeedevelopmentreviewcompleted || learningdevelopmentreviewcompleted ||employeeengagementreviewcompleted || financereviewcompleted) === 1) 
  ){

   bpfArguments.preventDefault();
		alertStrings = { confirmButtonLabel: "OK", text: "Please complete audit of all requests.", title: "Cannot Move to Next Stage" };
		alertOptions = { height: 200, width: 300 };
		Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
		return;
	}
}
 if (bpfstage === "Approval" && country === 140310002) {
	var hrcompleted = formcontext.getAttribute("pg_hrreviewcompleted").getValue();
	var admincompleted = formcontext.getAttribute("pg_adminreviewcompleted").getValue();
	var itcamreviewcompleted = formcontext.getAttribute("pg_itcamreviewcompleted").getValue();
	var ithelpdeskcompleted = formcontext.getAttribute("pg_ithelpdeskreviewcompleted").getValue();
	var employeedevelopmentreviewcompleted = formcontext.getAttribute("pg_employeedevelopmentreviewcompleted").getValue();
	var employeeengagementreviewcompleted = formcontext.getAttribute("pg_employeeengagementreviewcompleted").getValue();
	var learningdevelopmentreviewcompleted = formcontext.getAttribute("pg_learningdevelopmentreviewcompleted").getValue();
	var financereviewcompleted = formcontext.getAttribute("pg_financereviewcompleted").getValue();
if (
	bpfArguments.getDirection() === "Next" && country != 140310001
  && ((hrcompleted || admincompleted || itcamreviewcompleted || ithelpdeskcompleted ||employeedevelopmentreviewcompleted || learningdevelopmentreviewcompleted ||employeeengagementreviewcompleted || financereviewcompleted) === 1) 
  ){
    bpfArguments.preventDefault();
	alertStrings = { confirmButtonLabel: "OK", text: "Please complete audit of all requests.", title: "Cannot Move to Next Stage" };
	alertOptions = { height: 200, width: 300 };
	Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
	return;
}
  }
/*var employmentupdatecommunicationshared = formcontext.getAttribute("pg_employmentupdatecommunicationshared").getValue();
	var updatelwdinspine = formcontext.getAttribute("pg_updatelwdinspine").getValue();
	var updatelwdinmsd = formcontext.getAttribute("pg_updatelwdinmsd").getValue();
	var subordinatesreportingmanagerupdatedinmsd = formcontext.getAttribute("pg_subordinatesreportingmanagerupdatedinmsd").getValue();
 
	var triggerchildtickets = formcontext.getAttribute("pg_triggerchildtickets").getValue();
	var issuerelievingletter = formcontext.getAttribute("pg_issuerelievingletter").getValue();
  if (bpfArguments.getDirection() === "Next" && country != 140310001
  &&
(employmentupdatecommunicationshared === 1 ||updatelwdinspine === 1 ||updatelwdinmsd === 1 ||subordinatesreportingmanagerupdatedinmsd === 1 ||triggerchildtickets === 1 ||issuerelievingletter === 1)
  ){
	bpfArguments.preventDefault();
	alertStrings = { confirmButtonLabel: "OK", text: "Please complete audit of all requests.", title: "Cannot Move to Next Stage" };
	alertOptions = { height: 200, width: 300 };
	Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
	return;
}
  }*/
  if (bpfstage === "Corporate HR") {
            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_issuerelievingletter").getValue() === 1) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Before moving to Next Stage, Relieving letter needs to be sent or marked as Yes or NA", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;
            }
        }
    }
}

















function FormName(context) {
    debugger;
    var formContext = context.getFormContext();
    var createform = 1;
    var Type = formContext.ui.getFormType();
    if (Type != createform) {
        var employee = "";
        if (formContext.getAttribute("pg_employee").getValue() === null) {
            var employee = "";

        }
        else {
            var employee = formContext.getAttribute("pg_employee").getValue();
  var employee=employee[0].name;
        }
   var Type = formContext.getAttribute("pg_type").getValue();
        var valueCountry = formContext.getAttribute("pg_country").getValue();
        var Country = formContext.getAttribute("pg_country").getText();
        if (valueCountry === 140310001 && Type===140310000) {
            var Name = "Offboarding US" + " - " + "Main - " + employee;

            formContext.getAttribute("pg_name").setValue(Name);
        }
        if (valueCountry === 140310000 && Type===140310000) {
            var Name = "Offboarding India" + " - " + "Main - " + employee;

            formContext.getAttribute("pg_name").setValue(Name);
        }
        if (valueCountry === 140310002 && Type===140310000) {
            var Name = "Offboarding PHP" + " - " + "Main - " + employee;

            formContext.getAttribute("pg_name").setValue(Name);
        }
    }
}













function ChildRecordsonload(context) {
    debugger;
    var formcontext = context.getFormContext();
    var offboardingTab = formcontext.ui.tabs.get("tab_1");
    var employeeinformation = offboardingTab.sections.get("Tab_section_1");
    var transferownershipto = offboardingTab.sections.get("Tab_section_2");
   var childgrid = offboardingTab.sections.get("tab_2_section_25");
     var createform = 1;
    var Type = formcontext.ui.getFormType();
    
    var USAdmin = offboardingTab.sections.get("tab_2_section_10");
      var Auditteam = offboardingTab.sections.get("tab_2_section_11");
      var BackgroundcheckorOBlogin = offboardingTab.sections.get("tab_2_section_3");
      var CentralizedAccess = offboardingTab.sections.get("tab_2_section_2");
      var Controller = offboardingTab.sections.get("tab_2_section_12");
      var Benifits = offboardingTab.sections.get("tab_2_section_13");
      var Payroll = offboardingTab.sections.get("tab_2_section_9");
      var Equipment = offboardingTab.sections.get("tab_2_section_5");
      var Technology = offboardingTab.sections.get("tab_2_section_4");
      var DisableJobBoardorotherlicenses = offboardingTab.sections.get("tab_2_section_6");
      var TalentEnagagement = offboardingTab.sections.get("tab_2_section_7");
      var HR = offboardingTab.sections.get("tab_2_section_8");
    
      var AdminChecklist = offboardingTab.sections.get("tab_12_section_2");
      var EmployeeDevelopment = offboardingTab.sections.get("tab_12_section_5");
      var EmployeeEngagement = offboardingTab.sections.get("tab_12_section_3");
      var ITAssetandBackup = offboardingTab.sections.get("tab_12_section_1");
      var ITAccessandDL = offboardingTab.sections.get("tab_12_section_9");
      var LearningANDDevelopment = offboardingTab.sections.get("tab_12_section_4");
        var Financeindia = offboardingTab.sections.get("tab_1_section_32");
      var PHPAdmin = offboardingTab.sections.get("tab_2_section_19");
      var PHPEmployeeDevelopment = offboardingTab.sections.get("tab_2_section_20");
      var PHPEmployeeEngagement = offboardingTab.sections.get("tab_2_section_21");
      var PHPIT = offboardingTab.sections.get("tab_2_section_22");
      var PHPITCAM = offboardingTab.sections.get("tab_2_section_23");
      var PHPLearningANDDevelopment = offboardingTab.sections.get("tab_2_section_24");
    var Finance = offboardingTab.sections.get("tab_1_section_29");
   if (Type != createform){
        var country = formcontext.getAttribute("pg_country").getSelectedOption().value;
      }
        var Name = formcontext.getAttribute("pg_name").getValue();
    var type = formcontext.getAttribute("pg_type").getValue();
    if(Name!=null && country!=null){
        if (country=== 140310001 && Name.includes("US - Admin Access Removal")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            USAdmin.setVisible(true);
childgrid.setVisible(false);
        }
        if (country=== 140310001 && Name.includes("US - Audit Tracking")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Auditteam.setVisible(false);
childgrid.setVisible(false);
        } if (country=== 140310001 && Name.includes("US - Background Check/OB Access")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            BackgroundcheckorOBlogin.setVisible(true);
            CentralizedAccess.setVisible(true);
childgrid.setVisible(false);
        } if (country=== 140310001 && Name.includes("US - Controller")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Controller.setVisible(true);
childgrid.setVisible(false);
        } if (country=== 140310001 && Name.includes("US - Cut Benefits for")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Benifits.setVisible(true);
childgrid.setVisible(false);
        } if (country=== 140310001 && Name.includes("US - Cut off Payment")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Payroll.setVisible(true);
childgrid.setVisible(false);
        } if (country=== 140310001 && Name.includes("US - Equipment return for")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Equipment.setVisible(true);
childgrid.setVisible(false);
        } if (country=== 140310001 && Name.includes("US - Remove Access for")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Technology.setVisible(true);
childgrid.setVisible(false);
        } if (country=== 140310001 && Name.includes("US - Remove Job Board Access")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            DisableJobBoardorotherlicenses.setVisible(true);
childgrid.setVisible(false);
        } if (country=== 140310001 && Name.includes("US - Talent Engagement")) {
            TalentEnagagement.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country=== 140310001 && Name.includes("US - Update  in databases")) {
            HR.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } 
if (country=== 140310000 && Name.includes("Offboarding India - Admin")) {
            AdminChecklist.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country=== 140310000 && Name.includes("Offboarding India - Employee Development")) {
            EmployeeDevelopment.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        }if (country=== 140310000 && Name.includes("Offboarding India - Employee Engagement")) {
            EmployeeEngagement.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        }if (country=== 140310000 && type===140310008){// && Name.includes("Offboarding India - IT CAM")) {
    ITAssetandBackup.setVisible(true);
          //  ITAccessandDL.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
  // ITAssetandBackup.setVisible(false);
childgrid.setVisible(false);
        } if (country=== 140310000 && type===140310007){//Name.includes("Offboarding India - IT")) {
            ITAccessandDL.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country=== 140310000 && Name.includes("Offboarding India - Learning & Development")) {
            LearningANDDevelopment.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        }
 if (country === 140310000 && Name.includes("Offboarding India - Finance")) {
            Financeindia.setVisible(true);
            employeeinformation.setVisible(false);
            transferownershipto.setVisible(false);
    childgrid.setVisible(false);
            } 
        if (country=== 140310002 && Name.includes("Offboarding PHP - Admin")) {
            PHPAdmin.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country=== 140310002 && Name.includes("Offboarding PHP - Employee Development")) {
            PHPEmployeeDevelopment.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        }if (country=== 140310002 && Name.includes("Offboarding PHP - Employee Engagement")) {
            PHPEmployeeEngagement.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country=== 140310002 && Name.includes("Offboarding PHP - IT")) {
            PHPIT.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        }if (country=== 140310002 && Name.includes("Offboarding PHP - IT CAM")) {
            PHPITCAM.setVisible(true);
       PHPIT.setVisible(false);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country=== 140310002 && Name.includes("Offboarding PHP - Learning & Development")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            PHPLearningANDDevelopment.setVisible(true);
childgrid.setVisible(false);
        }
 if (country=== 140310002 && Name.includes("Offboarding PHP - Finance")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Finance.setVisible(true);
childgrid.setVisible(false);
        }
if (country=== 140310001 && type!=140310000){
childgrid.setVisible(false);
}
    }
    }
    








function CountryonloadChange(context) {
debugger;
var formcontext = context.getFormContext();
var offboardingTab = formcontext.ui.tabs.get("tab_1");
var employeeinformation = offboardingTab.sections.get("Tab_section_1");
var transferownershipto = offboardingTab.sections.get("Tab_section_2");

    var country = formcontext.getAttribute("pg_country").getValue();
  

    if (country === 140310001) {///US
        employeeinformation.setVisible(true);
        transferownershipto.setVisible(true);
   formcontext.getControl("pg_opentransactions").setVisible(false);
        formcontext.getControl("pg_subordinates").setVisible(false);
   formcontext.getControl("pg_p3").setVisible(true);
  formcontext.getControl("pg_personnelnumber").setVisible(true);
      formcontext.getControl("pg_teammembers").setVisible(true);
 formcontext.getControl("pg_divisionhead").setVisible(false);
formcontext.getControl("pg_hrhead").setVisible(false);
   formcontext.getControl("pg_divisionheademail").setVisible(false);
  formcontext.getControl("pg_attritiontype").setVisible(false);
        formcontext.getControl("pg_reasonforleaving").setVisible(false);
  formcontext.getControl("pg_manageemployees").setVisible(false);
        formcontext.getControl("pg_exitnotificationdate").setVisible(false);
   formcontext.getControl("pg_terminationdate").setVisible(true);
              formcontext.getControl("pg_comments").setVisible(true);
  formcontext.getControl("pg_terminationreason").setVisible(true);
  formcontext.getControl("pg_exittype").setVisible(false);
   formcontext.getControl("pg_noticeperiodwaiverneeded").setVisible(false);
  formcontext.getControl("pg_employeeid").setVisible(false);
}
    if (country === 140310000) {///INDIA
        employeeinformation.setVisible(true);
        transferownershipto.setVisible(true);
  formcontext.getControl("pg_employeeid").setVisible(true);
   formcontext.getControl("pg_employee").setVisible(true);
              formcontext.getControl("pg_terminationdate").setVisible(true);
  formcontext.getControl("pg_exittype").setVisible(true);
       formcontext.getControl("pg_comments").setVisible(true);
    formcontext.getControl("pg_noticeperiodwaiverneeded").setVisible(true);
  formcontext.getControl("pg_personnelnumber").setVisible(false);
 formcontext.getControl("pg_terminationreason").setVisible(false);

 formcontext.getControl("pg_divisionhead").setVisible(true);
formcontext.getControl("pg_hrhead").setVisible(true);
   formcontext.getControl("pg_divisionheademail").setVisible(false);
  formcontext.getControl("pg_attritiontype").setVisible(true);
        formcontext.getControl("pg_reasonforleaving").setVisible(true);
  formcontext.getControl("pg_manageemployees").setVisible(true);
        formcontext.getControl("pg_exitnotificationdate").setVisible(true);
  formcontext.getControl("pg_p3").setVisible(false);
      formcontext.getControl("pg_teammembers").setVisible(false);
 formcontext.getControl("pg_opentransactions").setVisible(true);
        formcontext.getControl("pg_subordinates").setVisible(true);
formcontext.getControl("header_process_pg_noticeperiodwaiverneeded_1").setDisabled(true);
    }
    if (country === 140310002) {//Philippines

        employeeinformation.setVisible(true);
        transferownershipto.setVisible(true);
  formcontext.getControl("pg_employeeid").setVisible(true);
  formcontext.getControl("pg_personnelnumber").setVisible(false);
        formcontext.getControl("pg_terminationdate").setVisible(false);
  formcontext.getControl("pg_terminationreason").setVisible(false);
        formcontext.getControl("pg_comments").setVisible(false);
   formcontext.getControl("pg_exittype").setVisible(false);
        formcontext.getControl("pg_noticeperiodwaiverneeded").setVisible(false);

   formcontext.getControl("pg_p3").setVisible(false);
        formcontext.getControl("pg_teammembers").setVisible(false);
   formcontext.getControl("pg_opentransactions").setVisible(true);
        formcontext.getControl("pg_subordinates").setVisible(true);
formcontext.getControl("pg_divisionhead").setVisible(false);
formcontext.getControl("pg_hrhead").setVisible(false);
   formcontext.getControl("pg_divisionheademail").setVisible(false);
 formcontext.getControl("pg_attritiontype").setVisible(true);
        formcontext.getControl("pg_reasonforleaving").setVisible(true);
  formcontext.getControl("pg_manageemployees").setVisible(true);
        formcontext.getControl("pg_exitnotificationdate").setVisible(true);
formcontext.getControl("header_process_pg_noticeperiodwaiverneeded_1").setDisabled(true);
    }
   if(country === null){
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
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
formcontext.getAttribute("pg_employeeid").setValue(employeeidindia[0].id);
formcontext.getAttribute("pg_personnelnumber").setValue(employeeidindia[0].id);
},
function(error) {
Xrm.Utility.alertDialog(error.message);
}
);

  }

catch {
  console.log();
}
}
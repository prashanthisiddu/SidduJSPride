function Resolvebtn(primaryControl) {
    debugger;
    var formContext = primaryControl;
  
        var country = formContext.getAttribute("pg_country").getSelectedOption().value;
    
    var Name = formContext.getAttribute("pg_name").getValue();
    if (country == 140310000 && Name.includes("Offboarding India - Admin")) {
        var a = formContext.getAttribute("pg_assetpickupcoordination").getValue();
        var b = formContext.getAttribute("pg_assetreceivedhandedovertoit").getValue();
        var c = formContext.getAttribute("pg_idaccesscardreceived").getValue();
        var d = formContext.getAttribute("pg_accesscarddeactivated").getValue();
        var e = formContext.getAttribute("pg_drawerkeyreceived").getValue();
        var f = formContext.getAttribute("pg_datacarddongle").getValue();
        var g = formContext.getAttribute("pg_mobilephonesim").getValue();
        var h = formContext.getAttribute("pg_medicalinsuranceterminated").getValue();
        if (a == 1 || b == 1 || c == 1 || d == 1 || e == 1 || f == 1 || g == 1 || h == 1) {
            return false;
        }
        else {
            return true;

        }
    } if (country == 140310000 && Name.includes("Offboarding India - Employee Development")) {
        var a = formContext.getAttribute("pg_deactivatexyme").getValue();
        var b = formContext.getAttribute("pg_updatebonuseligibilityinbonusfile").getValue();
        if (a == 1 || b == 1) {
            return false;
        }
        else {
            return true;

        }
    } if (country == 140310000 && Name.includes("Offboarding India - Employee Engagement")) {
        var a = formContext.getAttribute("pg_updatedeierglist").getValue();
        var b = formContext.getAttribute("pg_updateclashoftitanshouselistjosh").getValue();
        var c = formContext.getAttribute("pg_conductexitinterview").getValue();
        var d = formContext.getAttribute("pg_disabledojostoreaccess").getValue();
        var e = formContext.getAttribute("pg_cancelopenordersinthequeue").getValue();
        if (a == 1 || b == 1 || c == 1 || d == 1 || e == 1) {
            return false;
        }
        else {
            return true;
        }
    
} if (country == 140310000 && Name.includes("Offboarding India - IT")) {
    var assetissued = formContext.getAttribute("pg_assetissued").getValue();
    var databackupcompleted = formContext.getAttribute("pg_databackupcompleted").getValue();
    var assetreceived = formContext.getAttribute("pg_assetreceived").getValue();
    var assetstate = formContext.getAttribute("pg_assetstate").getValue();
    var assetinventoryupdated = formContext.getAttribute("pg_assetinventoryupdated").getValue();
    var listassetdetails = formContext.getAttribute("pg_listassetdetails").getValue;
    var assetvalue = formContext.getAttribute("pg_assetvalue").getValue();
    var deduction = formContext.getAttribute("pg_deduction").getValue();
    var amounttoberecovered = formContext.getAttribute("pg_amounttoberecovered").getValue;
    if (assetissued == 1 || databackupcompleted == 1 || assetreceived == 1 || assetstate == 1 || assetinventoryupdated == 1 || listassetdetails == 1 || assetvalue == 1 || deduction == 1 || amounttoberecovered == 1) {
        return false;
    }
    else {
        return true;

    }
} if (country == 140310000 && Name.includes("Offboarding India - IT CAM")) {
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
    if (able == 1 || echosign == 1 || hireright == 1 || crimcheck == 1 || clientvmstools == 1 || backgroundobcomments == 1 || hubspot == 1 || disablelaunchaccess == 1 || disableusersaccesstoemail == 1 || launchatsdeactivation == 1 || disablep3access == 1 || removeusersemailfromalldis == 1 || firstadvantage == 1) {
        return false;
    }
    else {
        return true;

    }



} if (country == 140310000 && Name.includes("Offboarding India - Learning & Development")) {
    var a = formContext.getAttribute("pg_completeactivetrainingsinlms").getValue();
    var b = formContext.getAttribute("pg_deactivatelmsaccess").getValue();
    if (a == 1 || b == 1) {
        return false;
    }
    else {
        return true;

    }
}


if (country == 140310002 && Name.includes("Offboarding PHP - Admin")) {
    var a = formContext.getAttribute("pg_assetcollected").getValue();
    var b = formContext.getAttribute("pg_assetresetcoordinedwithit").getValue();
    var c = formContext.getAttribute("pg_buildingaccesscardcollected").getValue();
    if (a == 1 || b == 1 || c == 1) {
        return false;
    }
    else {
        return true;

    }
} if (country == 140310002 && Name.includes("Offboarding PHP - Employee Development")) {
    var a = formContext.getAttribute("pg_deactivatexyme").getValue();
    var b = formContext.getAttribute("pg_updatebonuseligibilityinbonusfile").getValue();
    if (a == 1 || b == 1) {
        return false;
    }
    else {
        return true;

    }
} if (country == 140310002 && Name.includes("Offboarding PHP - Employee Engagement")) {
    var a = formContext.getAttribute("pg_updatedeierglist").getValue();
    var b = formContext.getAttribute("pg_updateclashoftitanshouselistjosh").getValue();
    var c = formContext.getAttribute("pg_conductexitinterview").getValue();
    if (a == 1 || b == 1 || c == 1) {
        return false;
    }
    else {
        return true;

    }
} if (country == 140310002 && Name.includes("Offboarding PHP - IT")) {
    var a = formContext.getAttribute("pg_assetissued").getValue();
    var b = formContext.getAttribute("pg_databackupcompleted").getValue();
    var c = formContext.getAttribute("pg_assetreceived").getValue();
    var d = formContext.getAttribute("pg_assetinventoryupdatedinmsd").getValue();
    if (a == 1 || b == 1 || c == 1 || d == 1) {
        return false;
    }
    else {
        return true;

    }
} if (country == 140310002 && Name.includes("Offboarding PHP - IT CAM")) {
    var a = formContext.getAttribute("pg_useraccessdeactivatedinalltools").getValue();
    var b = formContext.getAttribute("pg_azureadaccessdeactivated").getValue();
    var c = formContext.getAttribute("pg_nameremovedfromdls").getValue();
    var d = formContext.getAttribute("pg_emaildeactivated").getValue();
    var e = formContext.getAttribute("pg_emailforwarding").getValue();
    if (a == 1 || b == 1 || c == 1 || d == 1 || e == 1) {
        return false;
    }
    else {
        return true;

    }
} if (country == 140310002 && Name.includes("Offboarding PHP - Learning & Development")) {
    var a = formContext.getAttribute("pg_completeactivetrainingsindocebo").getValue();
    var b = formContext.getAttribute("pg_deactivatedoceboaccess").getValue();

    if (a == 1 || b == 1) {
        return false;
    }
    else {
        return true;

    }
    if (country == 140310002 && Name.includes("Offboarding PHP - Finance")) {
        var updatetallywithenddate = formContext.getAttribute("pg_updatetallywithenddate").getValue();
        var moveemployeefrompayrolltoff = formContext.getAttribute("pg_moveemployeefrompayrolltoff").getValue();
        var receiveffclearancefromhr = formContext.getAttribute("pg_receiveffclearancefromhr").getValue();
        var processff = formContext.getAttribute("pg_processff").getValue();
        var processshiftdifferential = formContext.getAttribute("pg_processshiftdifferential").getValue();
        var processholidaypaydifferential = formContext.getAttribute("pg_processholidaypaydifferential").getValue();
        var processleaveencashment = formContext.getAttribute("pg_processleaveencashment").getValue();
        var processdeductionsforlopadjustments = formContext.getAttribute("pg_processdeductionsforlopadjustments").getValue();
        var publishffpayslip = formContext.getAttribute("pg_publishffpayslip").getValue();
      
        if (updatetallywithenddate == 1 || moveemployeefrompayrolltoff == 1 || receiveffclearancefromhr == 1 ||processff == 1 || processshiftdifferential == 1 || processholidaypaydifferential == 1 ||processleaveencashment == 1 || processdeductionsforlopadjustments == 1 || publishffpayslip == 1) {
            return false;
        }
        else {
            return true;
    
        }
    }
}

}

function Resolveforoffboarding(context) {///not used in work
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "pg_resolveoffboardingbutncpage_3fb1c",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).then(console.log).catch(console.error);
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








function ApprovalSection(context) {
    debugger;
    var formcontext = context.getFormContext();
    var activeStage = formcontext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var Country = formcontext.getAttribute("pg_country").getValue();
var offboardingTab = formcontext.ui.tabs.get("tab_1");
var offindiaapproval = offboardingTab.sections.get("tab_1_section_31");
var offindia = offboardingTab.sections.get("tab_1_section_30");
if (Country == 140310000){//india
  
    offindia.setVisible(true);
}
else{
    offindia.setVisible(false);
}
if (stageId == "4b984d5e-0c1e-4ceb-ad04-56df205822d6"){//Approval
  
    offindiaapproval.setVisible(true);
}
else{
    offindiaapproval.setVisible(false);
}

}

function SetCurrentstage(context) {
    debugger;
    var formContext = context.getFormContext();
    var activeStage = formContext.data.process.getActiveStage();
    var stageId = activeStage.getId();
    var Country = formContext.getAttribute("pg_country").getText();
  
    if (stageId == "d6f762b1-d70b-4076-95f6-66793cfbc34a"){//Identity
        formContext.getAttribute("pg_currentstage").setValue(140310000);
    }
    if (stageId == "700f3e1e-be0c-4d82-9765-ee4dd7758c63"){//Research
        formContext.getAttribute("pg_currentstage").setValue(140310001);
    }
    if (stageId == "8b2de035-fa2a-43b5-a20a-a389aa2241fb"){//Employee Information
        formContext.getAttribute("pg_currentstage").setValue(140310002);
    }
    if (stageId == "4c7f2103-bf8d-41e3-ab46-9fd42b0e40c2"){//Check List
        formContext.getAttribute("pg_currentstage").setValue(140310003);
    }
    if (stageId == "60aa7fd2-9569-4bf5-92d5-9d44108cb4c2"){//Finance Clearance
        formContext.getAttribute("pg_currentstage").setValue(1403100004);
    }
    if (stageId == "b7b7d93c-db60-40fa-92e4-d9971e3a1012"){//Corporate HR
        formContext.getAttribute("pg_currentstage").setValue(140310005);
    }
    if (stageId == "4b984d5e-0c1e-4ceb-ad04-56df205822d6"){//Approval
        formContext.getAttribute("pg_currentstage").setValue(140310006);
     
    }
    if (stageId == "de2ea5e9-e671-42e0-8884-3d4237f3a0f8"){//Resolve
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

        if (bpfstage == "Check List") {

            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_childcasecount").getValue() != null && formcontext.getAttribute("pg_childcasecount").getValue() != 0) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Please complete the Child Ticket fully and accurately, to proceed to the next stage.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;

            }

        }
        if (bpfstage == "Approval") {
			var hrcompleted = formcontext.getAttribute("pg_hrreviewcompleted").getValue();
			var admincompleted = formcontext.getAttribute("pg_adminreviewcompleted").getValue();
			var itcamreviewcompleted = formcontext.getAttribute("pg_itcamreviewcompleted").getValue();
			var ithelpdeskcompleted = formcontext.getAttribute("pg_ithelpdeskreviewcompleted").getValue();
			var employeedevelopmentreviewcompleted = formcontext.getAttribute("pg_employeedevelopmentreviewcompleted").getValue();
			var employeeengagementreviewcompleted = formcontext.getAttribute("pg_employeeengagementreviewcompleted").getValue();
			var learningdevelopmentreviewcompleted = formcontext.getAttribute("pg_learningdevelopmentreviewcompleted").getValue();
			var financereviewcompleted = formcontext.getAttribute("pg_financereviewcompleted").getValue();
			if (bpfArguments.getDirection() === "Next" && country == 140310000 && (hrcompleted || admincompleted || itcamreviewcompleted || ithelpdeskcompleted || employeedevelopmentreviewcompleted || learningdevelopmentreviewcompleted || employeeengagementreviewcompleted || financereviewcompleted) == 1){
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Please complete audit of all requests.", title: "Cannot Move to Next Stage" };
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
        if (formContext.getAttribute("pg_employee").getValue() == null) {
            var employee = "";

        }
        else {
            var employee = formContext.getAttribute("pg_employee").getValue();
  var employee=employee[0].name;
        }
        var valueCountry = formContext.getAttribute("pg_country").getValue();
        var Country = formContext.getAttribute("pg_country").getText();
        if (valueCountry == 140310001) {
            var Name = Country + " - " + "Main - " + employee;

            formContext.getAttribute("pg_name").setValue(Name);
        }
        if (valueCountry == 140310000) {
            var Name = "Offboarding India" + " - " + "Main - " + employee;

            formContext.getAttribute("pg_name").setValue(Name);
        }
        if (valueCountry == 140310002) {
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
   if (Type != createform){
        var country = formcontext.getAttribute("pg_country").getSelectedOption().value;
      }
        var Name = formcontext.getAttribute("pg_name").getValue();
    if(Name!=null && country!=null){
        if (country== 140310001 && Name.includes("US - Admin Access Removal")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            USAdmin.setVisible(true);
childgrid.setVisible(true);
        }
        if (country== 140310001 && Name.includes("US - Audit Tracking")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Auditteam.setVisible(false);
childgrid.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Background Check/OB Access")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            BackgroundcheckorOBlogin.setVisible(true);
            CentralizedAccess.setVisible(true);
childgrid.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Controller")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Controller.setVisible(true);
childgrid.setVisible(false);
        } if (country== 140310001 && Name.includes("US - Cut Benefits for")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Benifits.setVisible(true);
childgrid.setVisible(false);
        } if (country== 140310001 && Name.includes("US - Cut off Payment")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Payroll.setVisible(true);
childgrid.setVisible(false);
        } if (country== 140310001 && Name.includes("US - Equipment return for")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Equipment.setVisible(true);
childgrid.setVisible(false);
        } if (country== 140310001 && Name.includes("US - Remove Access for")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            Technology.setVisible(true);
childgrid.setVisible(false);
        } if (country== 140310001 && Name.includes("US - Remove Job Board Access")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            DisableJobBoardorotherlicenses.setVisible(true);
childgrid.setVisible(false);
        } if (country== 140310001 && Name.includes("US - Talent Engagement")) {
            TalentEnagagement.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country== 140310001 && Name.includes("US - Update  in databases")) {
            HR.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } 
if (country== 140310000 && Name.includes("Offboarding India - Admin")) {
            AdminChecklist.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country== 140310000 && Name.includes("Offboarding India - Employee Development")) {
            EmployeeDevelopment.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        }if (country== 140310000 && Name.includes("Offboarding India - Employee Engagement")) {
            EmployeeEngagement.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country== 140310000 && Name.includes("Offboarding India - IT")) {
            ITAssetandBackup.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        }if (country== 140310000 && Name.includes("Offboarding India - IT CAM")) {
            ITAccessandDL.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country== 140310000 && Name.includes("Offboarding India - Learning & Development")) {
            LearningANDDevelopment.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        }
        if (country == 140310000 && Name.includes("Offboarding India - Finance")) {
            Financeindia.setVisible(true);
            employeeinformation.setVisible(false);
            transferownershipto.setVisible(false);
    childgrid.setVisible(false);
            }  
        if (country== 140310002 && Name.includes("Offboarding PHP - Admin")) {
            PHPAdmin.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country== 140310002 && Name.includes("Offboarding PHP - Employee Development")) {
            PHPEmployeeDevelopment.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        }if (country== 140310002 && Name.includes("Offboarding PHP - Employee Engagement")) {
            PHPEmployeeEngagement.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country== 140310002 && Name.includes("Offboarding PHP - IT")) {
            PHPIT.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        }if (country== 140310002 && Name.includes("Offboarding PHP - IT CAM")) {
            PHPITCAM.setVisible(true);
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
childgrid.setVisible(false);
        } if (country== 140310002 && Name.includes("Offboarding PHP - Learning & Development")) {
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
            PHPLearningANDDevelopment.setVisible(true);
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
  

    if (country == 140310001) {///US
        employeeinformation.setVisible(true);
        transferownershipto.setVisible(true);
   formcontext.getControl("pg_opentransactions").setVisible(false);
        formcontext.getControl("pg_subordinates").setVisible(false);
   formcontext.getControl("pg_p3").setVisible(true);
  formcontext.getControl("pg_personnelnumber").setVisible(true);
      formcontext.getControl("pg_teammembers").setVisible(true);
 formcontext.getControl("pg_divisionhead").setVisible(false);
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
    if (country == 140310000) {///INDIA
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

 formcontext.getControl("pg_divisionhead").setVisible(false);
   formcontext.getControl("pg_divisionheademail").setVisible(false);
  formcontext.getControl("pg_attritiontype").setVisible(true);
        formcontext.getControl("pg_reasonforleaving").setVisible(true);
  formcontext.getControl("pg_manageemployees").setVisible(true);
        formcontext.getControl("pg_exitnotificationdate").setVisible(true);
  formcontext.getControl("pg_p3").setVisible(false);
      formcontext.getControl("pg_teammembers").setVisible(false);
 formcontext.getControl("pg_opentransactions").setVisible(true);
        formcontext.getControl("pg_subordinates").setVisible(true);
    }
    if (country == 140310002) {//Philippines

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
formcontext.getControl("pg_divisionhead").setVisible(true);
   formcontext.getControl("pg_divisionheademail").setVisible(true);
 formcontext.getControl("pg_attritiontype").setVisible(true);
        formcontext.getControl("pg_reasonforleaving").setVisible(true);
  formcontext.getControl("pg_manageemployees").setVisible(true);
        formcontext.getControl("pg_exitnotificationdate").setVisible(true);
    }
   if(country == null){
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
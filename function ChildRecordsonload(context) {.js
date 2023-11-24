function ChildRecordsonload(context) {
debugger;
var formcontext = context.getFormContext();
var offboardingTab = formcontext.ui.tabs.get("tab_1");
//var employeeinformation = offboardingTab.sections.get("Tab_section_1");
//var transferownershipto = offboardingTab.sections.get("Tab_section_2");


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

  var PHPAdmin = offboardingTab.sections.get("tab_2_section_19");
  var PHPEmployeeDevelopment = offboardingTab.sections.get("tab_2_section_20");
  var PHPEmployeeEngagement = offboardingTab.sections.get("tab_2_section_21");
  var PHPIT = offboardingTab.sections.get("tab_2_section_22");
  var PHPITCAM = offboardingTab.sections.get("tab_2_section_23");
  var PHPLearningANDDevelopment = offboardingTab.sections.get("tab_2_section_24");

    var country = formcontext.getAttribute("pg_country").getSelectedOption().value;
    var Name = formcontext.getAttribute("pg_name").getValue();

    if (country== 140310001 && Name.includes("US - Admin Access Removal")) {
        Auditteam.setVisible(true);
    }

}
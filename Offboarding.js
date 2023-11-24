function ChildRecordsonload(context) {
    debugger;
    var formcontext = context.getFormContext();
    var offboardingTab = formcontext.ui.tabs.get("tab_1");
    //var employeeinformation = offboardingTab.sections.get("Tab_section_1");
    //var transferownershipto = offboardingTab.sections.get("Tab_section_2");
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
            USAdmin.setVisible(true);
        }
        if (country== 140310001 && Name.includes("US - Audit Tracking")) {
            Auditteam.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Background Check/OB Access")) {
            BackgroundcheckorOBlogin.setVisible(true);
            CentralizedAccess.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Controller")) {
            Controller.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Cut Benefits for")) {
            Benifits.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Cut off Payment")) {
            Payroll.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Equipment return for")) {
            Equipment.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Remove Access for")) {
            Technology.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Remove Job Board Access")) {
            DisableJobBoardorotherlicenses.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Talent Engagement")) {
            TalentEnagagement.setVisible(true);
        } if (country== 140310001 && Name.includes("US - Update  in databases")) {
            HR.setVisible(true);
        } if (country== 140310000 && Name.includes("Offboarding India - Admin")) {
            AdminChecklist.setVisible(true);
        } if (country== 140310000 && Name.includes("Offboarding India - Employee Development")) {
            EmployeeDevelopment.setVisible(true);
        }if (country== 140310000 && Name.includes("Offboarding India - Employee Engagement")) {
            EmployeeEngagement.setVisible(true);
        } if (country== 140310000 && Name.includes("Offboarding India - IT")) {
            ITAssetandBackup.setVisible(true);
        }if (country== 140310000 && Name.includes("Offboarding India - IT CAM")) {
            ITAccessandDL.setVisible(true);
        } if (country== 140310000 && Name.includes("Offboarding India - Learning & Development")) {
            LearningANDDevelopment.setVisible(true);
        }
        if (country== 140310002 && Name.includes("Offboarding PHP - Admin")) {
            PHPAdmin.setVisible(true);
        } if (country== 140310002 && Name.includes("Offboarding PHP - Employee Development")) {
            PHPEmployeeDevelopment.setVisible(true);
        }if (country== 140310002 && Name.includes("Offboarding PHP - Employee Engagement")) {
            PHPEmployeeEngagement.setVisible(true);
        } if (country== 140310002 && Name.includes("Offboarding PHP - IT")) {
            PHPIT.setVisible(true);
        }if (country== 140310002 && Name.includes("Offboarding PHP - IT CAM")) {
            PHPITCAM.setVisible(true);
        } if (country== 140310002 && Name.includes("Offboarding PHP - Learning & Development")) {
            PHPLearningANDDevelopment.setVisible(true);
        }
    }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    function CountryonloadChange(context) {
    pgdebugger;
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
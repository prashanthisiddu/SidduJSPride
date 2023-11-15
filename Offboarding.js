function CountryonloadChange(context) {
debugger;
var formcontext = context.getFormContext();
var offboardingTab = formcontext.ui.tabs.get("tab_1");
var employeeinformation = offboardingTab.sections.get("Tab_section_1");
var transferownershipto = offboardingTab.sections.get("Tab_section_2");

    var country = formcontext.getAttribute("pg_country").getSelectedOption().value;
    
  

    if (country == 140310001) {///US
        employeeinformation.setVisible(true);
        transferownershipto.setVisible(true);
    }
    if (country == 140310000) {///INDIA
        employeeinformation.setVisible(true);
        transferownershipto.setVisible(true);


    }
    if (country == 140310002) {//Philippines

        employeeinformation.setVisible(true);
        transferownershipto.setVisible(true);


    }
    else if(country == null){
        employeeinformation.setVisible(false);
        transferownershipto.setVisible(false);
    }
}





function CountryonloadChange(context) {
    debugger;
    var formcontext = context.getFormContext();
    var offboardingTab = formcontext.ui.tabs.get("tab_2");
    var employeeinformation = offboardingTab.sections.get("Tab_section_1");
    var transferownershipto = offboardingTab.sections.get("Tab_section_2");
    var createform = 1;
    var Type = formcontext.ui.getFormType();
    if (Type != createform) {
    try {
        var country = formcontext.getAttribute("pg_country").getSelectedOption().value;
        
        }
        catch
        {
        var country = 0;
        }
    
        if (country == 140310001) {///US
            employeeinformation.setVisible(true);
            transferownershipto.setVisible(true);
    
    
            formcontext.getControl("pg_employee").setVisible(false);
            formcontext.getControl("pg_personnelnumber").setVisible(false);
            formcontext.getControl("pg_terminationdate").setVisible(false);
            formcontext.getControl("pg_terminationreason").setVisible(false);
        }
        if (country == 140310000) {///INDIA
            employeeinformation.setVisible(true);
            transferownershipto.setVisible(true);
    
    
            
            formcontext.getControl("pg_employee").setVisible(false);
            formcontext.getControl("pg_personnelnumber").setVisible(false);
            formcontext.getControl("pg_terminationdate").setVisible(false);
            formcontext.getControl("pg_terminationreason").setVisible(false);
        }
        if (country == 140310002) {//Philippines
    
            employeeinformation.setVisible(true);
            transferownershipto.setVisible(true);
    
            
            formcontext.getControl("pg_employee").setVisible(false);
            formcontext.getControl("pg_personnelnumber").setVisible(false);
            formcontext.getControl("pg_terminationdate").setVisible(false);
            formcontext.getControl("pg_terminationreason").setVisible(false);
        }
    }
    }
    
    
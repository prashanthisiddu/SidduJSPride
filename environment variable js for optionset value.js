

//createing environment variable to update optionset values


function updateCaseTypeBasedOnApplication(applicationValue) {
    // Assume 'applicationValue' is the value of the application retrieved from somewhere
    
    // Your JSON data representing environment variables
    var environmentData = {
        "options": [
            {
                "application": 140310027,
                "cases": [
                    { "text": "Deal Sheet", "value": 140310000 },
                    { "text": "Job", "value": 140310001 },
                    { "text": "Administrative", "value": 140310002 },
                    { "text": "Standard", "value": 1 }
                ]
            },
            {
                "application": 140310004,
                "cases": [
                    {
                        "subject": 140310002,
                        "types": [
                            { "text": "RTA", "value": 3 },
                            { "text": "PHC", "value": 4 },
                            { "text": "Pride One", "value": 5 },
                            { "text": "Pride Now", "value": 6 }
                        ]
                    },
                    {
                        "subject": 140310007,
                        "types": [
                            { "text": "ATS", "value": 7 },
                            { "text": "Client", "value": 8 },
                            { "text": "Meeting", "value": 9 },
                            { "text": "Perm Placement", "value": 10 },
                            { "text": "R&A", "value": 11 },
                            { "text": "HR Ops", "value": 12 },
                            { "text": "Payroll", "value": 13 },
                            { "text": "FR Team", "value": 14 },
                            { "text": "Salesperson", "value": 15 },
                            { "text": "Other", "value": 16 }
                        ]
                    },
                    {
                        "subject": 140310009,
                        "types": [
                            { "text": "Inquiries", "value": 17 },
                            { "text": "Escalations", "value": 18 },
                            { "text": "Queries", "value": 19 },
                            { "text": "Purchase Orders", "value": 20 }
                        ]
                    }
                ],
                "defaultTypes": [
                    { "text": "Standard", "value": 1 },
                    { "text": "HR Request", "value": 2 }
                ]
            },
            {
                "defaultTypes": [
                    { "text": "Standard", "value": 1 },
                    { "text": "HR Request", "value": 2 }
                ]
            }
        ]
    };

    // Find the matching application object in the environment data
    var matchedApplication = environmentData.options.find(option => option.application === applicationValue);

    if (matchedApplication) {
        // Extract and update the CaseType options based on the matched application
        var caseTypeField = Xrm.Page.getAttribute("casetype"); // Assuming 'casetype' is the name of your option set field

        if (caseTypeField) {
            var optionsToUpdate = [];
            
            if (matchedApplication.cases) {
                matchedApplication.cases.forEach(caseItem => {
                    optionsToUpdate.push({ text: caseItem.text, value: caseItem.value });
                });
            } else if (matchedApplication.defaultTypes) {
                matchedApplication.defaultTypes.forEach(defaultType => {
                    optionsToUpdate.push({ text: defaultType.text, value: defaultType.value });
                });
            }

            caseTypeField.setValue(optionsToUpdate); // Update the option set field
        } else {
            console.log("CaseType field not found on the form.");
        }
    } else {
        console.log("No matching application found in environment data.");
    }
}

// Usage example: Call the function with the application value
updateCaseTypeBasedOnApplication(140310027);



























function AppTypeNexus(context)
{
      debugger;
   var formContext = context.getFormContext();
    var Application = formContext.getAttribute("pg_application").getValue();
  var subject = formContext.getAttribute("pg_casesubject").getValue();
    var CaseType = formContext.getControl("pg_casetype");
    var options = CaseType.getOptions();
    
    for (let i = 0; i < options.length; i++) {
        CaseType.removeOption(options[i].value);
    }

    if (Application === 140310027)
    {
        CaseType.addOption({ text: 'Deal Sheet', value: 140310000 });
        CaseType.addOption({ text: 'Job', value: 140310001 });
        CaseType.addOption({ text: 'Administrative', value: 140310002 });
        CaseType.addOption({ text: 'Standard', value: 1 });
       
    }
   
else if (Application === 140310004 && subject === 140310002) {
    CaseType.addOption({ text: "RTA", value: 3 });
    CaseType.addOption({ text: "PHC", value: 4 });
    CaseType.addOption({ text: "Pride One", value: 5 });
    CaseType.addOption({ text: "Pride Now", value: 6 });
}
else if (Application === 140310004 && subject === 140310007) {
    CaseType.addOption({ text: "ATS", value: 7 });
    CaseType.addOption({ text: "Client", value: 8 });
    CaseType.addOption({ text: "Meeting", value: 9 });
    CaseType.addOption({ text: "Perm Placement", value: 10 });
    CaseType.addOption({ text: "R&A", value: 11 });
    CaseType.addOption({ text: "HR Ops", value: 12 });
    CaseType.addOption({ text: "Payroll", value: 13 });
    CaseType.addOption({ text: "FR Team", value: 14 });
    CaseType.addOption({ text: "Salesperson", value: 15 });
    CaseType.addOption({ text: "Other", value: 16 });
}

else if (Application === 140310004 && subject === 140310009) {
    CaseType.addOption({ text: "Inquiries", value: 17 });
    CaseType.addOption({ text: "Escalations", value: 18 });
    CaseType.addOption({ text: "Queries", value: 19 });
    CaseType.addOption({ text: "Purchase Orders", value: 20 });
}
else if (Application === 140310004 && subject === 140310010) {

}
else if (Application === 140310004 && subject === 140310011) {

}
else{
    /*
            CaseType.removeOption(140310000);
            CaseType.removeOption(140310001);
            CaseType.removeOption(140310002);  */
        CaseType.addOption({ text: 'Standard', value: 1 });
            CaseType.addOption({ text: 'HR Request', value: 2 });
        } 
}



function AppTypeNexus(context) {
    debugger;
    var formContext = context.getFormContext();
    var Application = formContext.getAttribute("pg_application").getValue();
    var subject = formContext.getAttribute("pg_casesubject").getValue();
    var CaseType = formContext.getControl("pg_casetype");
    CaseType.clearOptions();

    if (Application === 140310027) {
        CaseType.addOption({ text: 'Deal Sheet', value: 140310000 });
        CaseType.addOption({ text: 'Job', value: 140310001 });
        CaseType.addOption({ text: 'Administrative', value: 140310002 });
        CaseType.addOption({ text: 'Standard', value: 1 });
    } else if (Application === 140310004) {
        if (subject === 140310002) {
            CaseType.addOption({ text: "RTA", value: 3 });
            CaseType.addOption({ text: "PHC", value: 4 });
            CaseType.addOption({ text: "Pride One", value: 5 });
            CaseType.addOption({ text: "Pride Now", value: 6 });
        } else if (subject === 140310007) {
            CaseType.addOption({ text: "ATS", value: 7 });
            CaseType.addOption({ text: "Client", value: 8 });
            CaseType.addOption({ text: "Meeting", value: 9 });
            CaseType.addOption({ text: "Perm Placement", value: 10 });
            CaseType.addOption({ text: "R&A", value: 11 });
            CaseType.addOption({ text: "HR Ops", value: 12 });
            CaseType.addOption({ text: "Payroll", value: 13 });
            CaseType.addOption({ text: "FR Team", value: 14 });
            CaseType.addOption({ text: "Salesperson", value: 15 });
            CaseType.addOption({ text: "Other", value: 16 });
        } else if (subject === 140310009) {
            CaseType.addOption({ text: "Inquiries", value: 17 });
    CaseType.addOption({ text: "Escalations", value: 18 });
    CaseType.addOption({ text: "Queries", value: 19 });
    CaseType.addOption({ text: "Purchase Orders", value: 20 });
        } else if (subject === 140310010) {
          
        } else if (subject === 140310011) {
           
        } else {
            CaseType.addOption({ text: 'Standard', value: 1 });
            CaseType.addOption({ text: 'HR Request', value: 2 });
        }
    } else {
        CaseType.addOption({ text: 'Standard', value: 1 });
        CaseType.addOption({ text: 'HR Request', value: 2 });
    }
}

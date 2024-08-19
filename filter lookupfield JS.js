

var formContext; // Define formContext globally to make it accessible in both functions

// call 'setPgReportstoIdFilter' on the custom lookup field onchange event 
function setPgReportstoIdFilter(executionContext) {
    formContext = executionContext.getFormContext(); // Assign formContext
    formContext.getControl("pg_newreportingmanager").addPreSearch(filterPgReportstoId);
}

function filterPgReportstoId() {
    var fetchXmlFilter = "<filter type='and'>" +
                            "<condition attribute='pg_reportstoid' operator='eq' uiname='Dinesh Sharma' uitype='pg_prideemployee' value='{7906E4CA-2BCD-EC11-A7B5-000D3A10B8DB}' />" +
                        "</filter>";

    formContext.getControl("pg_newreportingmanager").addCustomFilter(fetchXmlFilter, "pg_prideemployee");
}




function EmployeeLookupFilter(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
  
    var Country = formContext.getAttribute("pg_country").getValue();
    if (Country !== null) {
        formContext.getControl("pg_employee").addPreSearch(function() {
            addLookupFilter(formContext);
        });
        formContext.getAttribute("pg_country").addOnChange(function() {
            addLookupFilter(formContext);
        });
    }
}
 
function addLookupFilter(formContext) {  
    var Country = formContext.getAttribute("pg_country").getValue();
    if (Country !== null) {
        var FetchXml = "<filter type='and'><condition attribute='pg_country' operator='eq' value='" + Country + "' /></filter>";
        formContext.getControl("pg_employee").addCustomFilter(FetchXml, "pg_prideemployee");
    }
}

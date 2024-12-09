

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

    formContext.getControl("pg_newreportingmanager").addCustomFilter(fetchXmlFilter, "pg_prideemployee");//pg_prideemployee  entity logical name and you can refer this reference:::  https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/addcustomfilter
}




function EmployeeLookupFilter(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
  
    var Country = formContext.getAttribute("pg_country").getValue();
    if (Country !=== null) {
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
    if (Country !=== null) {
        var FetchXml = "<filter type='and'><condition attribute='pg_country' operator='eq' value='" + Country + "' /></filter>";
        formContext.getControl("pg_employee").addCustomFilter(FetchXml, "pg_prideemployee");
    }
}















function form_Load(context) {//quickcreate
    var formContext = context.getFormContext();
    var surveyformID = formContext.getAttribute("pg_surveyanswerid").getValue(); 
    if (surveyformID !=== null) {
        Xrm.WebApi.online.retrieveRecord("pg_surveyform", ""+surveyformID[0].id.replace('{','').replace('}','')+"", "?$select=pg_checkin,pg_country").then(
            function success(result) {
                var pg_checkin = result["pg_checkin"];
                var pg_checkin_formatted = result["pg_checkin@OData.Community.Display.V1.FormattedValue"];
                var pg_country = result["pg_country"];
                var pg_country_formatted = result["pg_country@OData.Community.Display.V1.FormattedValue"];
                
                formContext.getControl("pg_surveyquestion").addPreSearch(function () {
                    addLookupFilter(formContext, pg_checkin, pg_country);
                });
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

function addLookupFilter(formContext, pg_checkin, pg_country) {
    var FetchXml = "";
     if (pg_checkin === 140310000) {
        FetchXml = "<filter type='and'><condition attribute='pg_checkin' operator='eq' value='140310000' /></filter>";
    } 

   else if (pg_checkin === 140310001 && pg_country === 140310000) {
        FetchXml = "<filter type='and'><condition attribute='pg_checkin' operator='eq' value='140310001' /><condition attribute='pg_country' operator='eq' value='140310000' /></filter>";
    } 
    else if (pg_checkin === 140310001 && pg_country !=== 140310000) {
        FetchXml = "<filter type='and'><condition attribute='pg_checkin' operator='eq' value='140310001' /><condition attribute='pg_country' operator='ne' value='140310000' /></filter>";
    } 
    else if (pg_checkin === 140310002) {
        FetchXml ="<filter type='and'><condition attribute='pg_checkin' operator='eq' value='140310002' /></filter>";
    }

    formContext.getControl("pg_surveyquestion").addCustomFilter(FetchXml, "pg_surveyquestions");
}
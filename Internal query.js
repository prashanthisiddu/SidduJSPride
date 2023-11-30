function EmployeeID(context) {
    try {

        var formcontext = context.getFormContext();
   var createdbyValue = formcontext.getAttribute("createdby").getValue();       
            var createdby = createdbyValue[0].id;
            var createdbyname = createdbyValue[0].name;
     /////////cdm_primaryemailaddress//worker email
        // Xrm.WebApi.online.retrieveRecord("pg_prideemployee", "?$filter=pg_name eq '" + createdbyname + "'&$top=1").then(
      //  Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$select=cdm_employeeid_custom,cdm_fullname").then(
        Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker","?$filter=cdm_fullname eq '" + createdbyname + "'&$top=1").then(
            function success(results) {
                for (var i = 0; i < results.entities.length; i++) {
                    var cdm_employeeid_custom = results.entities[i]["cdm_employeeid_custom"];
                    var cdm_fullname = results.entities[i]["cdm_fullname"];
                    formcontext.getAttribute("pg_currentwopg_employeeidrkmode").setValue(cdm_employeeid_custom);
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    
    } catch (err) {

}
}

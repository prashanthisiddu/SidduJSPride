function leave(context) {
    try {
        var formcontext = context.getFormContext();
        var owner = formcontext.getAttribute("ownerid");
        var ownerid = owner.getValue()[0].id;
        var ownername = owner.getValue()[0].name;
  

Xrm.WebApi.online.retrieveMultipleRecords("pg_leave", "?$select=pg_datelengthnew&$filter=(_createdby_value eq 0cabde6a-885b-ed11-9562-000d3a55fb1c and statuscode eq 140310008)").then(
	function success(results) {
		console.log(results);
		for (var i = 0; i < results.entities.length; i++) {
			var result = results.entities[i];
			// Columns
			var uniqueValues = {};
			var pg_leaveid = result["pg_leaveid"]; // Guid
			var pg_datelengthnew = result["pg_datelengthnew"]; // Decimal
			var pg_datelengthnew_formatted = result["pg_datelengthnew@OData.Community.Display.V1.FormattedValue"];
		
count+=pg_datelengthnew
		}	
	},
	function(error) {
		console.log(error.message);
	}
);
      
    } catch (err) {
        console.log(err.message);
    }
}


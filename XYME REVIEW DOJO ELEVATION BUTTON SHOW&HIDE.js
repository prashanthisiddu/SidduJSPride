function GetandSetCountry(context) {
    var formcontext = context.getFormContext();
    try {
        var emailaddress = formcontext.getAttribute("emailaddress").getValue();

        if (!emailaddress) {
            return; 
        }

        var lowercaseEmail = emailaddress.toLowerCase();

        Xrm.WebApi.online.retrieveMultipleRecords(
            "cdm_worker", 
            `?$select=pg_country&$filter=cdm_primaryemailaddress eq '${lowercaseEmail}'`
        ).then(
            function success(results) {
                if (results.entities.length > 0) {
                    var pg_country = results.entities[0]["pg_country"]; 
                    formcontext.getAttribute("pg_country").setValue(pg_country); // Set country field
                } else {
                    console.log("No matching worker found for the provided email address.");
                }
            },
            function(error) {
                console.error("Error retrieving data: " + error.message); // Log errors
            }
        );
    } catch (error) {
        console.error("Unexpected error: " + error.message); // Log unexpected errors
    }
}











function setGoalValue(context) {//onchange of actual field X Goals entity
	var formcontext = context.getFormContext();
	
	var actual = formcontext.getAttribute("pg_actualdecimal").getValue();//99.05
	var goalscale = formcontext.getAttribute("pg_goalscale");
	  var onerating = formcontext.getAttribute("pg_onerating").getValue();
	  var tworating = formcontext.getAttribute("pg_tworating").getValue();
	  var threerating = formcontext.getAttribute("pg_threerating").getValue();//99
	  var fourrating = formcontext.getAttribute("pg_fourrating").getValue();//99.10
	  var fiverating = formcontext.getAttribute("pg_fiverating").getValue();//100
	 // var comparison = formcontext.getAttribute("pg_comparison");
  
	  if(actual===fiverating){//99.05//false
		goalscale.setValue(5);
		}
		else if(actual<fiverating && actual>=fourrating){//9905.0<100 && 99.05>=99.10//false
		  goalscale.setValue(4);
		}
	   else if(actual<fourrating && actual>=threerating){//99.05<99.10 && 99.05>=99
		  goalscale.setValue(3);
		}
		else if(actual<threerating && actual>=tworating){
		  goalscale.setValue(2);
		}
		else if(actual<tworating){
		  goalscale.setValue(1);
		}
}



function departmentgetset(executionContext) {//MAIN
	debugger;
	var formContext = executionContext.getFormContext();


	///////////
	var usersettings = Xrm.Utility.getGlobalContext().userSettings;
	//var currentstage = formContext.getAttribute("pg_currentstatus").getValue();
	var currentstage = formContext.data.process.getActiveStage().getName();
	var enable = formContext.getAttribute("pg_enabledojoelevation").getValue();
	var finalizeCheck = formContext.getAttribute("pg_finalreview").getValue();
	/////////////////


	////////////////
	var pg_performanceperiod = formContext.getAttribute("pg_performanceperiod").getValue();
	//performance[0] = new Object();
	//performance[0].id =pg_performanceperiod;
	var performance =pg_performanceperiod;
	var performance = new Array();
	var Q1 = performance.split('-');
var Quater=Q1[0];
var yearsomex= Q1[1];


	//var Q1 = performance.split('-');
	//var Quater=Q1[0];
	//var yearsomex= Q1[1];
	 var startdateforQ1 = new Date();
	var Qua1 = "1-jan"; 
	  var dt1 = Qua1.split('-');
	  var day1 = dt1[0];
		var month1 = dt1[1].toLocaleLowerCase();
		 var year1 = yearsomex;
	var QuaterQ1 = year1 + "-" + month1+ "-"+day1;
		 startdateforQ1 = new Date(QuaterQ1.replace(/-/g, "/")); 
	
	 var startdateforQ2 = new Date();
	   var Qua2 = "1-apr"; 
	   var dt2 = Qua2.split('-');
	   var day2 =  dt2[0];
			  var month2 = dt2[1].toLocaleLowerCase();
			  var year2 = yearsomex;
			  var QuaterQ2 = year2 + "-" + month2+ "-"+day2;
			  startdateforQ2 = new Date(QuaterQ2.replace(/-/g, "/"));
	 var startdateforQ3 = new Date();
	var Qua3 = "1-jul"; 
	   var dt3 = Qua3.split('-');
	   var day3 = dt3[0];
	   var month3 = dt3[1].toLocaleLowerCase();
	   var year3 =yearsomex;
	   var QuaterQ3 = year3 + "-" + month3+ "-"+day3;
	startdateforQ3 = new Date(QuaterQ3.replace(/-/g, "/"));
	 var startdateforQ4 = new Date();
	   var Qua4 = "1-oct"; 
	 var dt4 = Qua4.split('-');
	 var day4 = dt4[0];
	 var month4 = dt4[1].toLocaleLowerCase();
	 var year4 =yearsomex;
	var QuaterQ4 = year4 + "-" + month4+ "-"+day4;
	startdateforQ4 = new Date(QuaterQ4.replace(/-/g, "/"));
	
	      
//////////
var enddateforQ5 = new Date();
var Qua5 = "31-mar"; 
var dt5 = Qua5.split('-');
var day5 = dt5[0];
var month5 = dt5[1].toLocaleLowerCase();
var year5 = yearsomex;
var QuaterQ5 = year5 + "-" + month5+ "-"+day5;
enddateforQ5 = new Date(QuaterQ5.replace(/-/g, "/")); 

var enddateforQ6 = new Date();
var Qua6 = "30-june"; 
var dt6 = Qua6.split('-');
var day6 =  dt6[0];
  var month6 = dt6[1].toLocaleLowerCase();
  var year6 = yearsomex;
  var QuaterQ6 = year6 + "-" + month6+ "-"+day6;
  enddateforQ6 = new Date(QuaterQ6.replace(/-/g, "/"));
var enddateforQ7 = new Date();
var Qua7 = "30-sep"; 
var dt7 = Qua7.split('-');
var day7 = dt7[0];
var month7 = dt7[1].toLocaleLowerCase();
var year7 =yearsomex;
var QuaterQ7 = year7 + "-" + month7+ "-"+day7;
enddateforQ7 = new Date(QuaterQ7.replace(/-/g, "/"));
var enddateforQ8 = new Date();
var Qua8 = "31-dec"; 
var dt8 = Qua8.split('-');
var day8 = dt8[0];
var month8 = dt8[1].toLocaleLowerCase();
var year8 =yearsomex;
var QuaterQ8 = year8 + "-" + month8+ "-"+day8;
enddateforQ8 = new Date(QuaterQ8.replace(/-/g, "/"));

var quaterenddate={};
var quaterstartdate={};
	 var quaterenddate = new Date();
		 if(Quater==="Q4"){
			var quaterstartdate=startdateforQ4;
			var quaterenddate=enddateforQ8;
		 }
	   else if(Quater === "Q3"){
		   var quaterstartdate=startdateforQ3;
		   var quaterenddate=enddateforQ7;
		 }
	else if(Quater === "Q2"){
	  quaterstartdate=startdateforQ2;
	  quaterenddate=enddateforQ6;
		 }
	   else if(Quater === "Q1"){
		quaterstartdate=startdateforQ1;
		quaterenddate=enddateforQ5;
		 } 


	////////////////
		var employeeid=formContext.getAttribute("new_name").getValue();///"?$filter=title eq '" + name + "'&$top=1").then(
	Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$filter=cdm_fullname eq '" + employeeid + "'&$top=1").then(
		function success(results) {
			//Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$filter=cdm_anniversarydatetime le 2023-09-30T15:24:00.000Z").then(
				//function success(results) {
					console.log(results);
					for (var i = 0; i < results.entities.length; i++) {
						var result = results.entities[i];
					
						var cdm_workerid = result["cdm_workerid"]; // Guid
								var cdm_anniversarydatetime = result["cdm_anniversarydatetime"]; // Date Time
								var cdm_anniversarydatetime_formatted = result["cdm_anniversarydatetime@OData.Community.Display.V1.FormattedValue"];
								var anniversaryDate = new Date(cdm_anniversarydatetime);
								//var cutoffDate = new Date("2023-09-30T15:24:00.000Z");

								var cutoffDateenddate = new Date(quaterenddate);
								var cutoffDatestartdate = new Date(quaterstartdate);
				
								if (anniversaryDate < cutoffDatestartdate && (usersettings.userId === formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage === "90 Day / Finalize Review" && enable && finalizeCheck === 140310002) {
									// Enable the dojobutton
									return true;
								} 
								if (anniversaryDate >= new Date(cutoffDatestartdate) && anniversaryDate <= new Date(cutoffDateenddate) && (usersettings.userId === formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage === "90 Day / Finalize Review" && enable && finalizeCheck === 140310002) {
									// Enable the dojobutton
									//var finalizeCheck = formContext.getAttribute("pg_finalreview").getValue();
									formContext.getControl("pg_finalreview").setDisabled(true);
								} 
								
								if (anniversaryDate <= new Date(cutoffDateenddate) && (usersettings.userId === formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage === "90 Day / Finalize Review" && enable && finalizeCheck === 140310002) {
									// Enable the dojobutton
									//var finalizeCheck = formContext.getAttribute("pg_finalreview").getValue();
									formContext.getControl("pg_finalreview").setDisabled(true);
								} 
								else {
									// Disable the dojobutton
									return false;
								}
									
					}
				},
				function (error) {
					console.log(error.message);
				}
			);
}


var formContext = primarycontrol;
var usersettings = Xrm.Utility.getGlobalContext().userSettings;
//var currentstage = formContext.getAttribute("pg_currentstatus").getValue();
var currentstage = formContext.data.process.getActiveStage().getName();
var enable = formContext.getAttribute("pg_enabledojoelevation").getValue();
var finalizeCheck = formContext.getAttribute("pg_finalreview").getValue();

if ((usersettings.userId === formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage === "90 Day / Finalize Review" && enable && finalizeCheck === 140310002) {
	return true;
}
else {
	return false;
}









function departmentgetset(executionContext) {///main one with no errors
	debugger;
	var formContext = executionContext.getFormContext();


	///////////
	var usersettings = Xrm.Utility.getGlobalContext().userSettings;
	//var currentstage = formContext.getAttribute("pg_currentstatus").getValue();
	var currentstage = formContext.data.process.getActiveStage().getName();
	var enable = formContext.getAttribute("pg_enabledojoelevation").getValue();
	var finalizeCheck = formContext.getAttribute("pg_finalreview").getValue();
	/////////////////
		var employeeid=formContext.getAttribute("new_name").getValue();///"?$filter=title eq '" + name + "'&$top=1").then(
	Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$filter=cdm_fullname eq '" + employeeid + "'&$top=1").then(
		function success(results) {
			//Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$filter=cdm_anniversarydatetime le 2023-09-30T15:24:00.000Z").then(
				//function success(results) {
					console.log(results);
					for (var i = 0; i < results.entities.length; i++) {
						var result = results.entities[i];
					
						var cdm_workerid = result["cdm_workerid"]; // Guid
								var cdm_anniversarydatetime = result["cdm_anniversarydatetime"]; // Date Time
								var cdm_anniversarydatetime_formatted = result["cdm_anniversarydatetime@OData.Community.Display.V1.FormattedValue"];
								var anniversaryDate = new Date(cdm_anniversarydatetime);
								var cutoffDate = new Date("2023-09-30T15:24:00.000Z");
				
								if (anniversaryDate <= cutoffDate && (usersettings.userId === formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage === "90 Day / Finalize Review" && enable && finalizeCheck === 140310002) {
									// Enable the dojobutton
									//return true;
								}
if (anniversaryDate >= new Date("2023-10-01T00:00:00.000Z") && anniversaryDate <= new Date("2023-12-31T23:59:59.999Z") && (usersettings.userId === formContext.getAttribute("pg_manager").getValue()[0].id) && currentstage === "90 Day / Finalize Review" && enable && finalizeCheck === 140310002) {
									// Enable the dojobutton
							   formContext.getControl("pg_finalreview").setDisabled(true);
									
								}  else {
									// Disable the dojobutton
									return false;
								}	
					}
				},
				function (error) {
					console.log(error.message);
				}
			);
}


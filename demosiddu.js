
function BPFMoving() {  ///TA Form stage move
  debugger;
// var formContext = primaryControl;
  var name =Xrm.Page.ui.formSelector.getCurrentItem().getLabel(); 
if(name=="Onboarding-TA"){
  var activeProcess = formContext.data.process.getActiveProcess();
  var activeProcessID = activeProcess.getId();
alert(activeProcessID);

}
}




function updateName(executionContext){              ///mainForm
  debugger;
 var formContext = executionContext.getFormContext();
//  var candidatesfullname = formContext.getAttribute("pg_candidatesfulllegalname").getValue();
//var country = formContext.getAttribute("pg_country").getText();
 var ratetype = formContext.getAttribute('pg_ratetype').getValue();
 var prideinbalance = formContext.getAttribute('pg_prideinbalance').getValue();
 //var candidatesfullname = candidatesfullname;
 var Name =country +" - "+ " Internal Onboarding  -  " + candidatesfullname;  
 var Name = formContext.getAttribute("pg_name").setValue(Name);
if(ratetype==1)  { // iif ratetype==salaried
     formContext.getControl("pg_salary").setVisible(true);
 }
 else if(ratetype==2)  {           // iif ratetype==hourly
     formContext.getControl("pg_hourlyrate").setVisible(true);
 }
if(ratetype!=1){
formContext.getControl("pg_salary").setVisible(false);
}
if( ratetype!=2 ){

formContext.getControl("pg_hourlyrate").setVisible(false);
}
if(prideinbalance==1)  { // iif prideinbalance==yes
     formContext.getControl("pg_prideinbalancereason").setVisible(true);
 }
 else  {          
     formContext.getControl("pg_prideinbalancereason").setVisible(false);
 }
}




function saveifDOCyes(executionContext) {                       //mainFORM
  debugger;

  var formContext = executionContext.getFormContext();
    var dropoutcomments = formContext.getAttribute("pg_dropoutcomments").getValue();
    var dropoutintiated = formContext.getAttribute("pg_dropoutintiated").getValue();
    if(dropoutcomments != null){
formContext.getAttribute("pg_dropoutintiated").setValue(true);
    formContext.data.entity.save();
  }

}
  




function SHOWHIDEBOO(executionContext) {       ////manager form
  var formContext = executionContext.getFormContext();
  var dojo = formContext.getAttribute('pg_dojo').getValue();
var country = formContext.getAttribute('pg_country').getValue();
var Setup = formContext.ui.tabs.get("Manager");
  var India = Setup.sections.get("RMforIndia"); //indiasec
  var US = Setup.sections.get("RMforUS");

var PGdepartment = formContext.getAttribute('pg_prideglobaldepartment').getValue();
var PHdepartment = formContext.getAttribute('pg_pridehealthdepartment').getValue(); 
var RTdepartment = formContext.getAttribute('pg_russelltobindepartment').getValue(); 
  if(dojo==140310000){         ///prideglobal
      formContext.getControl("pg_prideglobaldepartment").setVisible(true);
  }
  else{
      formContext.getControl("pg_prideglobaldepartment").setVisible(false);
  }
  if(dojo==140310005){             //pridehealth
      formContext.getControl("pg_pridehealthdepartment").setVisible(true);
  }
  else{
      formContext.getControl("pg_pridehealthdepartment").setVisible(false);
  }
  if(dojo==140310003){             //prideONE
      formContext.getControl("pg_prideonedepartment").setVisible(true);
  }
  else{
      formContext.getControl("pg_prideonedepartment").setVisible(false);
  }
  if(dojo==140310004){             //prideNOW
      formContext.getControl("pg_pridenowdepartment").setVisible(true);
  }
  else{
      formContext.getControl("pg_pridenowdepartment").setVisible(false);
  }
  if(dojo==140310001){             //RussellTobin&Associates
      formContext.getControl("pg_russelltobindepartment").setVisible(true);
  }
  else{
      formContext.getControl("pg_russelltobindepartment").setVisible(false);
  }
  if(dojo==140310009){             //Rocket Shippers
      formContext.getControl("pg_rocketshippersdepartment").setVisible(true);
  }
  else{
      formContext.getControl("pg_rocketshippersdepartment").setVisible(false);
  }
  if(dojo==140310010){             //Pride Advisory
      formContext.getControl("pg_advisoryservicesdepartment").setVisible(true);
  }
  else{
      formContext.getControl("pg_advisoryservicesdepartment").setVisible(false);
  }
if(PGdepartment==140310001)  { // if deprtment==AOF
      formContext.getControl("pg_pgaofsubdepartmentjobfamily").setVisible(true);
  }
  else{
      formContext.getControl("pg_pgaofsubdepartmentjobfamily").setVisible(false);
  }
  if(PGdepartment==140310006)  { // if deprtment==IT
      formContext.getControl("pg_pgitsubdepartmentjobfamily").setVisible(true);
  }
  else{
      formContext.getControl("pg_pgitsubdepartmentjobfamily").setVisible(false);
  }
if(PHdepartment==140310000)  { // iif pridehealthdeprtment==NATIONAL FULFILLMENT
      formContext.getControl("pg_phcnationalfulfillmentsubdepartmentjobfam").setVisible(true);
  }
  else{
      formContext.getControl("pg_phcnationalfulfillmentsubdepartmentjobfam").setVisible(false);
  }
if(RTdepartment==140310008)  { // iif RTA==SAT EAST
      formContext.getControl("pg_rtasateastsubdepartmentjobfamily").setVisible(true);
  }
  else{
      formContext.getControl("pg_rtasateastsubdepartmentjobfamily").setVisible(false);
  }
if(RTdepartment==140310003)  { // iif RTA==rtae2eprofessionalsubdepartmentjobfamily
      formContext.getControl("pg_rtae2eprofessionalsubdepartmentjobfamily").setVisible(true);
  }
  else{
      formContext.getControl("pg_rtae2eprofessionalsubdepartmentjobfamily").setVisible(false);
  }
if(country==140310001)  { // iif country= india
      India.setVisible(true);
  }
  else{
     India.setVisible(false);
  }
if(country==140310000)  { // iif country =us
  US.setVisible(true);
  }
  else{
     US.setVisible(false);
  }


}














var Case;//////////////pg_onboarding entity
Case = {};
Case.formEvents = {
    form_load: function (context) {
        var formcontext = context.getFormContext();
        formcontext.data.process.addOnPreStageChange(Case.formEvents.handleStageMovement);
    },

    handleStageMovement: function checklist(context) {
        var bpfArguments = context.getEventArgs();
        var formcontext = context.getFormContext();
    var bpfstage = formcontext.data.process.getActiveStage().getName();
 

 if (bpfstage == "Child Ticket") {
  
            if (bpfArguments.getDirection() === "Next" && formcontext.getAttribute("pg_childtickets").getValue() != null && formcontext.getAttribute("pg_childtickets").getValue() != 0) {
                bpfArguments.preventDefault();
                alertStrings = { confirmButtonLabel: "OK", text: "Please complete the checklist fully and accurately, to proceed to the next stage.", title: "Cannot Move to Next Stage" };
                alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                return;
            
            }
 }
    }  
}  


function showandhide(primaryControl)              // --------------dojoelevation
{
   var confirmStrings = { text: "Do you want to deactivate the review for the Quarter?" ,confirmButtonLabel: "Ok" };
   var confirmOptions = { height: 250, width: 300 };
   Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
      //Xrm.Navigation.openAlertDialog({text: "Thank You!  Your nomination has been submitted" }).then(
       function (success) {
           if (success.confirmed)
            {
               Xrm.Page.ui.close();
            }
   }
   )}

   function SubmittoHR(primaryControl){
    var formContext = primaryControl;
   var confirmStrings = { text: "Do you want to deactivate the review for the Quarter?" ,confirmButtonLabel: "Ok" };
   var confirmOptions = { height: 250, width: 300 };
   Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
     // Xrm.Navigation.openAlertDialog({text: "Thank You!  Your nomination has been submitted" }).then(

       function (success) {
           if (success.confirmed)
            {
              // Alert.show("Sale created successfully!", null, null, "SUCCESS", 500, 200);
// formcontext.getControl("WebResource_notification").setDisabled(true);
               Xrm.Page.ui.close();
            }
   }
   )}


   function showandhide(primaryControl)
{
   var confirmStrings = { text: "Do you want to deactivate the review for the Quarter?" ,confirmButtonLabel: "Ok" };
   var confirmOptions = { height: 250, width: 300 };
   Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
     // Xrm.Navigation.openAlertDialog({text: "Thank You!  Your nomination has been submitted" }).then(

       function (success) {
           if (success.confirmed)
            {
              // Alert.show("Sale created successfully!", null, null, "SUCCESS", 500, 200);
// formcontext.getControl("WebResource_notification").setDisabled(true);
               Xrm.Page.ui.close();
            }
   }
   )}






   function showandhide(primaryControl)
   {
     
                  Xrm.Page.ui.close();
               }               // --------------dojoelevation
      































function annivarsarywithout90days(context) {
    debugger;
    try {
      formcontext = context.getFormContext();
      var review = formcontext.getAttribute("pg_review").getValue()[0].id;
      Xrm.WebApi.online.retrieveRecord("new_employee", review, "?$select=pg_performanceperiod").then(
        function success(result) {
          var pg_performanceperiod = result["pg_performanceperiod"];
          var performance = new Array();
  
          performance[0] = new Object();
          performance[0].id = pg_performanceperiod;
          var performance = pg_performanceperiod;
          var Q1 = performance.split('-');
          var Quater = Q1[0];
          var yearsomex = Q1[1];
          var startdateforQ1 = new Date();
          var Qua1 = "1-jan";
          var dt1 = Qua1.split('-');
          var day1 = dt1[0];
          var month1 = dt1[1].toLocaleLowerCase();
          var year1 = yearsomex;
          var QuaterQ1 = year1 + "-" + month1 + "-" + day1;
          startdateforQ1 = new Date(QuaterQ1.replace(/-/g, "/"));
  
          var startdateforQ2 = new Date();
          var Qua2 = "1-apr";
          var dt2 = Qua2.split('-');
          var day2 = dt2[0];
          var month2 = dt2[1].toLocaleLowerCase();
          var year2 = yearsomex;
          var QuaterQ2 = year2 + "-" + month2 + "-" + day2;
          startdateforQ2 = new Date(QuaterQ2.replace(/-/g, "/"));
          var startdateforQ3 = new Date();
          var Qua3 = "1-jul";
          var dt3 = Qua3.split('-');
          var day3 = dt3[0];
          var month3 = dt3[1].toLocaleLowerCase();
          var year3 = yearsomex;
          var QuaterQ3 = year3 + "-" + month3 + "-" + day3;
          startdateforQ3 = new Date(QuaterQ3.replace(/-/g, "/"));
          var startdateforQ4 = new Date();
          var Qua4 = "1-oct";
          var dt4 = Qua4.split('-');
          var day4 = dt4[0];
          var month4 = dt4[1].toLocaleLowerCase();
          var year4 = yearsomex;
          var QuaterQ4 = year4 + "-" + month4 + "-" + day4;
          startdateforQ4 = new Date(QuaterQ4.replace(/-/g, "/"));
  
          var quaterstartdate = {};
          // var quaterenddate = new Date();
          if (Quater == "Q4") {
            var quaterstartdate = startdateforQ4;
          }
          else if (Quater == "Q3") {
            var quaterstartdate = startdateforQ3;
          }
          else if (Quater == "Q2") {
            quaterstartdate = startdateforQ2;
          }
          else if (Quater == "Q1") {
            quaterstartdate = startdateforQ1;
          }
          Xrm.WebApi.online.retrieveRecord("new_employee", review, "?$select=_pg_workerreviewid_value").then(
            function success(result) {
              var _pg_workerreviewid_value = result["_pg_workerreviewid_value"];
              var _pg_workerreviewid_value_formatted = result["_pg_workerreviewid_value@OData.Community.Display.V1.FormattedValue"];
              var _pg_workerreviewid_value_lookuplogicalname = result["_pg_workerreviewid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
  
  
              var worker = new Array();
  
              worker[0] = new Object();
  
              worker[0].id = _pg_workerreviewid_value;
  
              worker[0].name = _pg_workerreviewid_value_formatted;
              worker[0].entity = _pg_workerreviewid_value_lookuplogicalname;
  
              Xrm.WebApi.online.retrieveRecord("cdm_worker", worker[0].id, "?$select=cdm_anniversarydatetime").then(
                function success(result) {
                  var cdm_anniversarydatetime = result["cdm_anniversarydatetime"];
  
                  var annivarsary = new Array();
  
                  annivarsary[0] = new Object();
                  annivarsary[0].id = cdm_anniversarydatetime;
                  var anivarsary = new Date(annivarsary[0].id);
  
                  if (anivarsary.getFullYear() + '/' + anivarsary.getMonth() + '/' + anivarsary.getDate() < quaterstartdate.getFullYear() + '/' + quaterstartdate.getMonth() + '/' + quaterstartdate.getDate()) {
  
                    formcontext.getControl("pg_elevate").setDisabled(false);
                    formcontext.ui.clearFormNotification("EmployeeNotEligibleNotification");
  
  
  
                  }
                  if (anivarsary.getFullYear() + '/' + anivarsary.getMonth() + '/' + anivarsary.getDate() >= quaterstartdate.getFullYear() + '/' + quaterstartdate.getMonth() + '/' + quaterstartdate.getDate()) {
                    formcontext.getControl("pg_elevate").setDisabled(true);
                    formcontext.ui.setFormNotification("This employee is not eligible for elevation", "ERROR", "EmployeeNotEligibleNotification");
  
  
                  }
                },
  
  
                function (error) {
                  console.log(error.message);
                }
              );
            },
            function (error) {
              console.log(error.message);
            }
          );
  
        },
        function (error) {
          console.log(error.message);
        }
      );
    }
  
    catch (err) {
    }
    console.log(review);
  }
  
  function ribbonmsg(primaryControl) {
    var formContext = primaryControl;
    var confirmStrings = { text: "Do you want to deactivate the review for the Quarter?", confirmButtonLabel: "Yes", cancelButtonLabel: "No" };
    var confirmOptions = { height: 250, width: 300 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
      function (success) {
        if (success.confirmed) {
        }
      }
  
    )
  };
  
  
  
  
  
  
  
  
  
  function PIBshowandhide(primaryControl) {
    debugger;
    try {
      formcontext = primaryControl;
     // var review = formcontext.getAttribute("pg_review").getValue()[0].id; ----   ///lookup field but not visible on form
      var currentstatus = formcontext.getAttribute("pg_currentstatus").getValue();
     // Xrm.WebApi.online.retrieveRecord("new_employee", review, "?$select=pg_performanceperiod").then(
       // function success(result) {
          //var pg_performanceperiod = result["pg_performanceperiod"];
         // var performance = new Array();
  
         // performance[0] = new Object();
         // performance[0].id = pg_performanceperiod;
         // var performance = pg_performanceperiod;
          var Q1 = performance.split('-');
          var Quater = Q1[0];
          var yearsomex = Q1[1];
          var enddateforQ1 = new Date();
          var Qua1 = "31-mar";
          var dt1 = Qua1.split('-');
          var day1 = dt1[0];
          var month1 = dt1[1].toLocaleLowerCase();
          var year1 = yearsomex;
          var QuaterQ1 = year1 + "-" + month1 + "-" + day1;
          enddateforQ1 = new Date(QuaterQ1.replace(/-/g, "/"));
  
          var enddateforQ2 = new Date();
          var Qua2 = "30-june";
          var dt2 = Qua2.split('-');
          var day2 = dt2[0];
          var month2 = dt2[1].toLocaleLowerCase();
          var year2 = yearsomex;
          var QuaterQ2 = year2 + "-" + month2 + "-" + day2;
          enddateforQ2 = new Date(QuaterQ2.replace(/-/g, "/"));
          var enddateforQ3 = new Date();
          var Qua3 = "30-sep";
          var dt3 = Qua3.split('-');
          var day3 = dt3[0];
          var month3 = dt3[1].toLocaleLowerCase();
          var year3 = yearsomex;
          var QuaterQ3 = year3 + "-" + month3 + "-" + day3;
          enddateforQ3 = new Date(QuaterQ3.replace(/-/g, "/"));
          var enddateforQ4 = new Date();
          var Qua4 = "31-dec";
          var dt4 = Qua4.split('-');
          var day4 = dt4[0];
          var month4 = dt4[1].toLocaleLowerCase();
          var year4 = yearsomex;
          var QuaterQ4 = year4 + "-" + month4 + "-" + day4;
          enddateforQ4 = new Date(QuaterQ4.replace(/-/g, "/"));
  
          var quaterenddate = {};
          if (Quater == "Q4") {
            var quaterenddate = enddateforQ4;
          }
          else if (Quater == "Q3") {
            var quaterenddate = enddateforQ3;
          }
          else if (Quater == "Q2") {
            quaterenddate = enddateforQ2;
          }
          else if (Quater == "Q1") {
            quaterenddate = enddateforQ1;
          }
          Xrm.WebApi.online.retrieveRecord("new_employee", review, "?$select=_pg_workerreviewid_value").then(
            function success(result) {
              var _pg_workerreviewid_value = result["_pg_workerreviewid_value"];
              var _pg_workerreviewid_value_formatted = result["_pg_workerreviewid_value@OData.Community.Display.V1.FormattedValue"];
              var _pg_workerreviewid_value_lookuplogicalname = result["_pg_workerreviewid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
  
  
              var worker = new Array();
  
              worker[0] = new Object();
  
              worker[0].id = _pg_workerreviewid_value;
  
              worker[0].name = _pg_workerreviewid_value_formatted;
              worker[0].entity = _pg_workerreviewid_value_lookuplogicalname;
  
              Xrm.WebApi.online.retrieveRecord("cdm_worker", worker[0].id, "?$select=cdm_anniversarydatetime").then(
                function success(result) {
                  var cdm_anniversarydatetime = result["cdm_anniversarydatetime"];
  
                  var annivarsary = new Array();
  
                  annivarsary[0] = new Object();
                  annivarsary[0].id = cdm_anniversarydatetime;
                  var anivarsary = new Date(annivarsary[0].id);
                  if (quaterenddate > anivarsary && currentstatus==140310004) {
                     return true();
                  }
                  else {
                    return false();
                  }
                },
                function (error) {
                  console.log(error.message);
                }
              );
            },
            function (error) {
              console.log(error.message);
            }
          );
  
      
    }
  
    catch (err) {
    }
    console.log(review);
  }
  
  




function setalert(context) {                  ////employee review lo onchange event
    debugger;
    var formContext = context.getFormContext();
    var leave = formContext.getAttribute("pg_leave").getValue();
if (leave != "none" || leave != 1) {
        formContext.data.entity.save();
    var confirmStrings = { text: "Do you want to deactivate the review for the Quarter?" ,confirmButtonLabel: "Yes", cancelButtonLabel: "No" };
    var confirmOptions = { height: 250, width: 300 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed)
             {
 
                 formContext.getAttribute("statecode").setValue(1);
                formContext.getAttribute("statuscode").setValue(2);
              // formContext.data.entity.save();
                    var recordId = formContext.data.entity.getId();
 formContext.data.entity.save();

var record = {};
record.statecode = 1; // State
record.statuscode = 2; // Status

Xrm.WebApi.online.updateRecord("new_employee", "recordId", record).then(
	function success(result) {
		var updatedId = result.id;
		console.log(updatedId);
	},
	function(error) {
		console.log(error.message);
	}
);
                     var workflowId = "61da8d7c-3a31-49f7-b82f-80373ad596dc";
                    var functionName = "executeWorkflow >>";
                    var query = "workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
                    var data = {
                        "EntityId": recordId
                    };
                    var req = new XMLHttpRequest();
                    req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/" + query), true);
                    req.setRequestHeader("Accept", "application/json");
                    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    req.setRequestHeader("OData-MaxVersion", "4.0");
                    req.setRequestHeader("OData-Version", "4.0");
            
                    req.onreadystatechange = function () {
                        if (this.readyState == 4 /* complete */) {
                            if (this.status == 204 || this.status == 200) {
                                formContext.data.entity.save();
                               // formContext.data.ui.close();
                            } else {
                                //error callback
                            }
                        }
                    };
            
                    req.send(JSON.stringify(data));
                }
            
           else {      
            }
        });
   
    }
}





function getseating(context) {///////////case entity 
    debugger;
try{
        formcontext = context.getFormContext();
        var  applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
        var  subject = formcontext.getAttribute("pg_casesubject").getSelectedOption().value;
        var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;
        employeeid = employee.substring(1, 37);
            var incident = formcontext.getAttribute("title").getValue();
            //incidentid = incident.substring(1, 37);
            if(applicationselect == 10 && subject ==140310003) {
 
            
                        Xrm.WebApi.online.retrieveMultipleRecords("pg_supportticket", "?$filter=pg_name eq '" + incident + "'&$top=1").then(
                            (results) => {
                                for (var i = 0; i < results.entities.length; i++) {
                                    var pg_newseating = results.entities[i]["pg_newseating"];
                                    var pg_newshift = results.entities[i]["pg_newshift"];
                                    var pg_newshift_formatted = results.entities[i]["pg_newshift@OData.Community.Display.V1.FormattedValue"];     
                                    var pg_emaildomain = results.entities[i]["pg_emaildomin"];
                                    var pg_newtoolaccessesneeded = results.entities[i]["pg_newtoolaccessesneeded"];
                        var seating= new Array();
                   
                               seating[0] = new Object();
                   
                               seating[0].id = pg_newseating;
                        var shift=new Array();
            
                               shift[0] = new Object();
                   
                               shift[0].id = pg_newshift;
                   
                          
                               shift[0].name =pg_newshift_formatted;
                        var emaildomain= new Array();
                   
                             
                               emaildomain[0] = new Object();
                   
                               emaildomain[0].id = pg_emaildomain;
                        var toolaccessneeded= new Array();
                   
                               toolaccessneeded[0] = new Object();
                   
                               toolaccessneeded[0].id = pg_newtoolaccessesneeded;
   
                if(shift[0].id !=null && shift[0].id !=""){
                                formcontext.getControl("pg_newshift").setVisible(true);
                              
                             }
                             else {
                                formcontext.getControl("pg_newshift").setVisible(false);
                               
                             }
                if(seating[0].id !=null && seating[0].id!=""){
                                formcontext.getControl("pg_newseatallotted").setVisible(true);
                             }
                           else {
                                formcontext.getControl("pg_newseatallotted").setVisible(false);
                             }
                if(emaildomain[0].id !=null && emaildomain[0].id !=""){
                                formcontext.getControl("pg_emaildomain").setVisible(true);
                              
                             }
                             else {
                                formcontext.getControl("pg_emaildomain").setVisible(false);
                               
                             }
                if(toolaccessneeded[0].id !=null && toolaccessneeded[0].id!=""){
                                formcontext.getControl("pg_newtoolaccesses").setVisible(true);
                             }
                           else {
                                formcontext.getControl("pg_newtoolaccesses").setVisible(false);
                             }
               }
            
            (error) => {
                console.log(error.message);
            }
            
            }
        );
        
        }
 
}                 
    catch(err) {
    }
}






function ribbon(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
        var application = formContext.getAttribute("pg_application").getValue();
        // var applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
        var origin = formContext.getAttribute("caseorigincode").getValue();
        var casetitle = formContext.getAttribute("title").getValue();
        if (application == 140310017 && origin == 140310000) {
    
            if (casetitle.includes("IT")) {
                var assetissued = formContext.getAttribute("pg_assetissued").getValue();    
                var databackupcompleted = formContext.getAttribute("pg_databackupcompleted").getValue();
                var assetreceived = formContext.getAttribute("pg_assetreceived").getValue();
             var azureadaccessdeactivated= formContext.getAttribute("pg_azureadaccessdeactivated").getValue();    
                var emaildeactivated = formContext.getAttribute("pg_emaildeactivated").getValue();
                var emailforwarding= formContext.getAttribute("pg_emailforwarding").getValue;
    
         if (assetissued ==1 || databackupcompleted ==1||  assetreceived==1 || azureadaccessdeactivated ==1|| emaildeactivated==1 || emailforwarding==1){
              return true;
            }
           else{
              return false;
    
             }
            }
     else if(casetitle.includes("Admin")){
          
              var assetpickupcoordination= formContext.getAttribute("pg_assetpickupcoordination").getValue();      
               var assetreceivedhandedovertoit=formContext.getAttribute("pg_assetreceivedhandedovertoit").getValue();
               var  idaccesscardreceived=formContext.getAttribute("pg_idaccesscardreceived").getValue();
               var accesscarddeactivated= formContext.getAttribute("pg_accesscarddeactivated").getValue();      
               var drawerkeyreceived=formContext.getAttribute("pg_drawerkeyreceived").getValue();
               var datacarddongle=formContext.getAttribute("pg_datacarddongle").getValue();
                var mobilephonesim=formContext.getAttribute("pg_mobilephonesim").getValue();
               var medicalinsuranceterminated=formContext.getAttribute("pg_medicalinsuranceterminated").getValue();
    if (assetpickupcoordination || assetreceivedhandedovertoit || idaccesscardreceived || accesscarddeactivated ||drawerkeyreceived ||datacarddongle || mobilephonesim || medicalinsuranceterminated==1) {
      return true;
            }
           else{
              return false;
    
             }
            }
      else if(casetitle.includes("Employee Development")){
          var deactivatexyme= formContext.getAttribute("pg_deactivatexyme").getValue();     
          var updatebonuseligibilityinbonusfile=formContext.getAttribute("pg_updatebonuseligibilityinbonusfile").getValue();
         
        if (deactivatexyme ==1 ||updatebonuseligibilityinbonusfile==1 ){
      return true;
            }
           else{
              return false;
    }
}
       else if(casetitle.includes("Employee Engagement")){
          var updatedeierglist= formContext.getAttribute("pg_updatedeierglist").getValue();     
          var updateclashoftitanshouselistjos=formContext.getAttribute("pg_updateclashoftitanshouselistjosh").getValue();
          var conductexitinterview=formContext.getAttribute("pg_conductexitinterview").getValue();
          var disabledojostoreaccess= formContext.getAttribute("pg_disabledojostoreaccess").getValue();      
          var cancelopenordersinthequeue=formContext.getAttribute("pg_cancelopenordersinthequeue").getValue();
         
              if (updatedeierglist==1 ||updateclashoftitanshouselistjos==1|| conductexitinterview==1||disabledojostoreaccess==1||cancelopenordersinthequeue==1){
     return true;
            }
           else{
              return false;
    }
}
       else if(casetitle.includes("Finance")){
           var updatetallywithenddate= formContext.getAttribute("pg_updatetallywithenddate").getValue();     
          var moveemployeefrompayrolltof=formContext.getAttribute("pg_moveemployeefrompayrolltoff").getValue();
          var receiveffclearancefromhr=formContext.getAttribute("pg_receiveffclearancefromhr").getValue();
          var processff= formContext.getAttribute("pg_processff").getValue();      
          var processgratuity=formContext.getAttribute("pg_processgratuity").getValue();
          var processleaveencashment=formContext.getAttribute("pg_processleaveencashment").getValue();
          var processdeductionsforlopadjustments=formContext.getAttribute("pg_processdeductionsforlopadjustments").getValue();
          var publishffpayslip=formContext.getAttribute("pg_publishffpayslip").getValue();
         var updatedateofexitinpfportal=formContext.getAttribute("pg_updatedateofexitinpfportal").getValue();
      
       if (updatetallywithenddate==1||moveemployeefrompayrolltof==1||
    receiveffclearancefromhr==1||processff==1||processgratuity==1||processleaveencashment==1||processdeductionsforlopadjustments==1||publishffpayslip==1||updatedateofexitinpfportal==1){
     return true;
            }
           else{
              return false;
    }
}
     else if(casetitle.includes("Learning & Development")){
        var completeactivetrainingsinlms= formContext.getAttribute("pg_completeactivetrainingsinlms").getValue();      
          var deactivatelmsaccess=formContext.getAttribute("pg_deactivatelmsaccess").getValue();
        
               if (completeactivetrainingsinlms ==1||deactivatelmsaccess  ==1){
     return true;
            }
           else{
              return false;
    }
    }
           }
    else return true
 }
    
   
function requiredfield(executionContext){
debugger;

   var formContext = executionContext.getFormContext();
var assetstate=formContext.getAttribute("pg_assetstate").getValue(); 

if(assetstate=="Lost" || assetstate==2 ) {

     formContext.getAttribute("pg_listassetdetails").setRequiredLevel("required");
     formContext.getAttribute("pg_deduction").setRequiredLevel("required");
  formContext.getAttribute("pg_assetvalue").setRequiredLevel("required");
     formContext.getControl("pg_amounttoberecovered").setVisible(false);
formContext.getControl("pg_deduction").setVisible(true);
formContext.getControl("pg_assetvalue").setVisible(true);
 
}
else if(assetstate==0) {
   formContext.getControl("pg_deduction").setVisible(false);
 }
else if(assetstate==1 ) {
 formContext.getAttribute("pg_listassetdetails").setRequiredLevel("required");
     formContext.getAttribute("pg_deduction").setRequiredLevel("required");
  formContext.getAttribute("pg_assetvalue").setRequiredLevel("required");
     formContext.getControl("pg_amounttoberecovered").setVisible(false);
formContext.getControl("pg_deduction").setVisible(true);
formContext.getControl("pg_assetvalue").setVisible(true);
 }
}


function review(primaryControl) {
    debugger;
    var formContext = primaryControl;
    var application = formContext.getAttribute("pg_application").getValue();
    // var applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    var origin = formContext.getAttribute("caseorigincode").getValue();
    var casetitle = formContext.getAttribute("title").getValue();
    if (application == 140310017 && origin == 140310000) {

        if (casetitle.includes("IT")) {
            var assetissued = formContext.getAttribute("pg_assetissued").getValue();
            var databackupcompleted = formContext.getAttribute("pg_databackupcompleted").getValue();
            var assetreceived = formContext.getAttribute("pg_assetreceived").getValue();
            var azureadaccessdeactivated = formContext.getAttribute("pg_azureadaccessdeactivated").getValue();
            var emaildeactivated = formContext.getAttribute("pg_emaildeactivated").getValue();
            var emailforwarding = formContext.getAttribute("pg_emailforwarding").getValue;

  if (assetissued ==1|| databackupcompleted ==1|| assetreceived==1 || azureadaccessdeactivated==1 || emaildeactivated==1 || emailforwarding == 1) {
                return false;
            }
            else {
                return true;

            }

        }
  else if (casetitle.includes("Admin")) {

            var a = formContext.getAttribute("pg_assetpickupcoordination").getValue();
            var b = formContext.getAttribute("pg_assetreceivedhandedovertoit").getValue();
            var c = formContext.getAttribute("pg_idaccesscardreceived").getValue();
            var d = formContext.getAttribute("pg_accesscarddeactivated").getValue();
            var e = formContext.getAttribute("pg_drawerkeyreceived").getValue();
            var f = formContext.getAttribute("pg_datacarddongle").getValue();
            var g = formContext.getAttribute("pg_mobilephonesim").getValue();
            var h = formContext.getAttribute("pg_medicalinsuranceterminated").getValue();
            if (a==1 || b==1 || c==1 || d==1 || e==1 || f==1 || g ==1|| h == 1) {
                return false;
            }
            else {
                return true;

            }

        }

        else if (casetitle.includes("Employee Development")) {
            var a = formContext.getAttribute("pg_deactivatexyme").getValue();
            var b = formContext.getAttribute("pg_updatebonuseligibilityinbonusfile").getValue();
            if (a==1 || b == 1) {
                return false;
            }
            else {
                return true;

            }
        }

        else if (casetitle.includes("Learning & Development")) {
            var a = formContext.getAttribute("pg_completeactivetrainingsinlms").getValue();
            var b = formContext.getAttribute("pg_deactivatelmsaccess").getValue();
            if (a ==1|| b == 1) {
                return false;
            }
            else {
                return true;

            }
        }
        else if (casetitle.includes("Finance")) {
            var a = formContext.getAttribute("pg_updatetallywithenddate").getValue();
            var b = formContext.getAttribute("pg_moveemployeefrompayrolltoff").getValue();
            var c = formContext.getAttribute("pg_receiveffclearancefromhr").getValue();
            var d = formContext.getAttribute("pg_processff").getValue();
            var e = formContext.getAttribute("pg_processgratuity").getValue();
            var f = formContext.getAttribute("pg_processleaveencashment").getValue();
            var g = formContext.getAttribute("pg_processdeductionsforlopadjustments").getValue();
            var h = formContext.getAttribute("pg_publishffpayslip").getValue();
            var i = formContext.getAttribute("pg_updatedateofexitinpfportal").getValue();
            if (a==1 || b ==1|| c==1 || d==1 || e==1 || f==1 || g==1 || h==1 || i == 1) {
                return false;
            }
            else {
                return true;

            }
        }
        else if (casetitle.includes("Employee Engagement")) {
            var a = formContext.getAttribute("pg_updatedeierglist").getValue();
            var b = formContext.getAttribute("pg_updateclashoftitanshouselistjosh").getValue();
            var c = formContext.getAttribute("pg_conductexitinterview").getValue();
            var d = formContext.getAttribute("pg_disabledojostoreaccess").getValue();
            var e = formContext.getAttribute("pg_cancelopenordersinthequeue").getValue();
            if (a ==1 || b ==1 || c==1 || d==1 || e == 1) {
                return false;
            }
            else {
                return true;
            }
        }

    }
   else return true;
}


function TickerChangecase(executionContext) {
  debugger;

  var formContext = executionContext.getFormContext();
  var datachange = formContext.ui.tabs.get("tab_13");
   datachange.setVisible(false);
  var reportingmanagersec = datachange.sections.get("tab_13_section_1"); 
 var employeereportingtypesec = datachange.sections.get("tab_13_section_2");
 var teamrsec =  datachange.sections.get("tab_13_section_3");
    var dojosec =  datachange.sections.get("tab_13_section_4");
 var worklocsec = datachange.sections.get("tab_13_section_5");
var workmodesec =  datachange.sections.get("tab_13_section_6");
 var salaryrevisionsec =  datachange.sections.get("tab_13_section_7");
   var applicationselect = 0;
    var subject = 0;
    try {
      var  applicationselect = formContext.getAttribute("pg_application").getSelectedOption().value;
  }
    catch
    {
        var applicationselect = 0;
   }
  try {
     var  subject = formContext.getAttribute("pg_casesubject").getSelectedOption().value;
    }
    catch {
        var subject = 0;
    }

  if (applicationselect==10 && subject ==1000) {
   datachange.setVisible(true);
    reportingmanagersec.setVisible(true);    
    employeereportingtypesec.setVisible(false);
    teamrsec.setVisible(false);
    dojosec.setVisible(false);
    workmodesec.setVisible(false);
 worklocsec.setVisible(false);
    salaryrevisionsec.setVisible(false);
}
else if ( applicationselect==10 && subject == 2000) {
         datachange.setVisible(true);
 reportingmanagersec.setVisible(false);    
    employeereportingtypesec.setVisible(true);
    teamrsec.setVisible(false);
    dojosec.setVisible(false);
    workmodesec.setVisible(false);
 worklocsec.setVisible(false);
    salaryrevisionsec.setVisible(false);
 }
  else if (applicationselect==10 && subject == 140310003) {
          datachange.setVisible(true);
        reportingmanagersec.setVisible(false);    
    employeereportingtypesec.setVisible(false);
    teamrsec.setVisible(true);
    dojosec.setVisible(false);
    workmodesec.setVisible(false);
 worklocsec.setVisible(false);
    salaryrevisionsec.setVisible(false);
  }
  else if ( applicationselect==10 && subject == 140310004) {
            datachange.setVisible(true);
        reportingmanagersec.setVisible(false);    
    employeereportingtypesec.setVisible(false);
    teamrsec.setVisible(false);
    dojosec.setVisible(true);
    workmodesec.setVisible(false);
 worklocsec.setVisible(false);
    salaryrevisionsec.setVisible(false);
  }
 else if (applicationselect==10 && subject == 140310005) {
 datachange.setVisible(true);
     reportingmanagersec.setVisible(false);    
    employeereportingtypesec.setVisible(false);
    teamrsec.setVisible(false);
    dojosec.setVisible(false);
    workmodesec.setVisible(false);
 worklocsec.setVisible(true);
    salaryrevisionsec.setVisible(false);
  }
  else if (applicationselect==10 && subject == 140310006) {
 datachange.setVisible(true);
     reportingmanagersec.setVisible(false);    
    employeereportingtypesec.setVisible(false);
    teamrsec.setVisible(false);
    dojosec.setVisible(false);
    workmodesec.setVisible(true);
    worklocsec.setVisible(false);
    salaryrevisionsec.setVisible(false);
  }
else if ( applicationselect==10 && subject == 140310008) {
 datachange.setVisible(true);
      reportingmanagersec.setVisible(false);    
    employeereportingtypesec.setVisible(false);
    teamrsec.setVisible(false);
    dojosec.setVisible(false);
    workmodesec.setVisible(false);
 worklocsec.setVisible(false);
    salaryrevisionsec.setVisible(true);
  }
}





function subjectchangecase(context) {
    var formcontext = context.getFormContext();
    var subject = formcontext.getControl("pg_casesubject");
    var applicationselect = formcontext.getControl("pg_application");
    try {
        var applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    }
    catch
    {
        var applicationselect = 0;
    }

    var options = subject.getOptions();

    for (let i = 0; i < options.length; i++) {
        subject.removeOption(options[i].value);
    }
 //datachange
    if ((applicationselect == 10)) {
        subject.addOption({ text: 'Reporting Manager', value: 1000});
        subject.addOption({ text: 'Employee Reporting Change', value: 2000 });
        subject.addOption({ text: 'Team/Process', value: 140310003 });
        subject.addOption({ text: 'Dojo', value: 140310004 });
        subject.addOption({ text: 'Work Location', value: 140310005 });
        subject.addOption({ text: 'Work Mode', value: 140310006 });
 subject.addOption({ text: 'Salary Revision', value: 140310008 });
    }

}

function hidedatachangetab(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    var datachange = formContext.ui.tabs.get("tab_13");
     datachange.setVisible(false);
    var reportingmanagersec = datachange.sections.get("tab_13_section_1"); 
   var employeereportingtypesec = datachange.sections.get("tab_13_section_2");
   var teamrsec =  datachange.sections.get("tab_13_section_3");
      var dojosec =  datachange.sections.get("tab_13_section_4");
   var worklocsec = datachange.sections.get("tab_13_section_5");
  var workmodesec =  datachange.sections.get("tab_13_section_6");
   var salaryrevisionsec =  datachange.sections.get("tab_13_section_7");
     var applicationselect = 0;
   
      try {
        var  applicationselect = formContext.getAttribute("pg_application").getSelectedOption().value;
    }
      catch
      {
          var applicationselect = 0;
     }
    if (applicationselect  !=10) {
     datachange.setVisible(false);
      reportingmanagersec.setVisible(false);    
      employeereportingtypesec.setVisible(false);
      teamrsec.setVisible(false);
      dojosec.setVisible(false);
      workmodesec.setVisible(false);
   worklocsec.setVisible(false);
      salaryrevisionsec.setVisible(false);
  }
 }



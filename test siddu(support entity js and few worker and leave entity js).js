

function setalert(context) {
    debugger;
    var formContext = context.getFormContext();
    var leave = formContext.getAttribute("pg_leave").getValue();
  
if (leave != "none" || leave != 1) {

    var confirmStrings = { text: "Do you want to deactivate the review for the Quarter?" ,confirmButtonLabel: "Yes", cancelButtonLabel: "No" };
    var confirmOptions = { height: 250, width: 300 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed)
             {
          
            formContext.getAttribute("statecode").setValue(1);
                //formContext.getAttribute("statuscode").setValue(2);
                formContext.data.entity.save();
                    var recordId = formContext.data.entity.getId();
                   
               
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
                                formContext.data.entity.save("saveandclose");
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














function setalert(context) {
    debugger;
    var formContext = context.getFormContext();
    var leave = formContext.getAttribute("pg_leave").getValue();
var eventArgs = context.getEventArgs();
if (leave != "none" || leave != 1) {

    var confirmStrings = { text: "Do you want to deactivate the review for the Quarter?", confirmButtonLabel: "Yes" ,cancelButtonLabel: "No" };
    var confirmOptions = { height: 250, width: 300 };
 Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function (success) {
       if (success.confirmed)
            {
                var formControls = formContext.getControl();

                formControls.forEach(control => {
    
                    control.setDisabled(true);
                
            });
        
        }
        else {
            //eventArgs.preventDefault();
          
        }
    });
    //function (context) {
       // var eventArgs = context.getEventArgs();
        //if (eventArgs.getSaveMode() == 5) {
           // alert("Deactivated");
     //   }
      //  if (eventArgs.getSaveMode() == 6) {
           // alert("Activated");
       // }
    }
}


//formContext.getControl(eventArgs).setDisbled(true);
               // function (success){
               // if (eventArgs.getSaveMode() == 5) {
                    //    alert("Deactivated");
               // formContext.data.save();


function accountOnSave(econtext) {
    var eventArgs = econtext.getEventArgs();
    if (eventArgs.getSaveMode() == 5) {
        alert("Deactivated");
    }
    if (eventArgs.getSaveMode() == 6) {
        alert("Activated");
    }
}
  
function onLoadEvents()
{
    Xrm.Page.getControl('pg_newannualcompensation').addOnKeyPress(AllowOnlyNumbers);
}

function AllowOnlyNumbers() {      
    var phoneNo = Xrm.Page.getControl("pg_newannualcompensation").getValue();
    phoneNo = phoneNo.replace(/\D/g, '');
    Xrm.Page.getAttribute('pg_newannualcompensation').setValue(phoneNo);
    if (phoneNo.length == 11) {
        var formattedPhone = phoneNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        Xrm.Page.getAttribute('pg_newannualcompensation').setValue(formattedPhone);
    }
}





// *//function annivarsary(context) {
//     debugger;
//     try{
//         formcontext = context.getFormContext();
//       var  review = formcontext.getAttribute("pg_review").getValue();
//       reviewid = review.substring(1, 37);
// Xrm.WebApi.online.retrieveRecord("cdm_worker", "reviewid", "?$select=cdm_anniversarydatetime").then(
//     function success(result) {
//         var cdm_anniversarydatetime = result["cdm_anniversarydatetime"];
       
//         var annivarsary = new Array();
    
//         annivarsary[0] = new Object();

//         annivarsary[0].id = cdm_anniversarydatetime;
//         var today = new Date();
       
//       var Difference_In_Time = today.getTime() - cdm_anniversarydatetime.getTime();
  
//       // To calculate the no. of days between two dates
//       var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
//         if (Difference_In_Days<=90){
//             formcontext.getAttribute("pg_elevate").setDiable(true);
//         }
//         else{
//             formcontext.getAttribute("pg_elevate").setDiable(false);
//         }
//     },

//     function(error) {
//         Xrm.Utility.alertDialog(error.message);
//     }
// );
// }
// catch(err)  {

// }  
// }
//*

function getdivisionhead(context) {
    debugger;
    try{
        formcontext = context.getFormContext();
      var  applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    var  subject = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    
        var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;
        employeeid = employee.substring(1, 37);
        var  name= formcontext.getAttribute("pg_name").getValue();
        if (applicationselect == 10) {
            Xrm.WebApi.online.retrieveMultipleRecords("incident", "?$filter=title eq '" + name + "'&$top=1").then(
                (results) => {
                    for (var i = 0; i < results.entities.length; i++) {
                        var result = results.entities[i];
                        var pg_divisionheadapproval = result["pg_divisionheadapproval"];
                        var pg_divisionheadapproval_formatted = result["pg_divisionheadapproval@OData.Community.Display.V1.FormattedValue"];
                    var newdisionheadapproval=new Array();
                    newdisionheadapproval[0] = new Object();

                    newdisionheadapproval[0].id = pg_divisionheadapproval;
                    newdisionheadapproval[0].name =pg_divisionheadapproval_formatted;
                   
                        formcontext.getControl("pg_divisionheadapproval").setValue(newdisionheadapproval[0].name);
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

        function annivarsarywithout(context) {
            debugger;
            try{
                formcontext = context.getFormContext();
              var  review = formcontext.getAttribute("pg_review").getValue()[0].id;
        Xrm.WebApi.online.retrieveRecord("new_employee",review , "?$select=pg_performanceperiod").then(
            function success(result) {
                var pg_performanceperiod = result["pg_performanceperiod"];
           var performance = new Array();
            
                    performance[0] = new Object();
           performance[0].id =pg_performanceperiod;
          var performance =pg_performanceperiod;
        var Q1 = performance.split('-');
        var Quater=Q1[0];
        var yearsomex= Q1[1];
         var enddateforQ1 = new Date();
        var Qua1 = "31-mar"; 
          var dt1 = Qua1.split('-');
          var day1 = dt1[0];
            var month1 = dt1[1].toLocaleLowerCase();
             var year1 = yearsomex;
        var QuaterQ1 = year1 + "-" + month1+ "-"+day1;
             enddateforQ1 = new Date(QuaterQ1.replace(/-/g, "/")); 
        
         var enddateforQ2 = new Date();
           var Qua2 = "30-june"; 
           var dt2 = Qua2.split('-');
           var day2 =  dt2[0];
                  var month2 = dt2[1].toLocaleLowerCase();
                  var year2 = yearsomex;
                  var QuaterQ2 = year2 + "-" + month2+ "-"+day2;
                  enddateforQ2 = new Date(QuaterQ2.replace(/-/g, "/"));
         var enddateforQ3 = new Date();
        var Qua3 = "30-sep"; 
           var dt3 = Qua3.split('-');
           var day3 = dt3[0];
           var month3 = dt3[1].toLocaleLowerCase();
           var year3 =yearsomex;
           var QuaterQ3 = year3 + "-" + month3+ "-"+day3;
        enddateforQ3 = new Date(QuaterQ3.replace(/-/g, "/"));
         var enddateforQ4 = new Date();
           var Qua4 = "31-dec"; 
         var dt4 = Qua4.split('-');
         var day4 = dt4[0];
         var month4 = dt4[1].toLocaleLowerCase();
         var year4 =yearsomex;
        var QuaterQ4 = year4 + "-" + month4+ "-"+day4;
        enddateforQ4 = new Date(QuaterQ4.replace(/-/g, "/"));
        
        var quaterenddate={};
        // var quaterenddate = new Date();
             if(Quater=="Q4"){
               var quaterenddate=enddateforQ4;
             }
           else if(Quater == "Q3"){
               var quaterenddate=enddateforQ3;
             }
        else if(Quater == "Q2"){
               quaterenddate=enddateforQ2;
             }
           else if(Quater == "Q1"){
               quaterenddate=enddateforQ1;
             }
          Xrm.WebApi.online.retrieveRecord("new_employee",review , "?$select=_pg_workerreviewid_value").then(
            function success(result) {
                var _pg_workerreviewid_value = result["_pg_workerreviewid_value"];
                var _pg_workerreviewid_value_formatted = result["_pg_workerreviewid_value@OData.Community.Display.V1.FormattedValue"];
                var _pg_workerreviewid_value_lookuplogicalname = result["_pg_workerreviewid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
          
                  
                    var worker = new Array();
            
                    worker[0] = new Object();
            
                    worker[0].id = _pg_workerreviewid_value;
                  
                    worker[0].name =_pg_workerreviewid_value_formatted;
                    worker[0].entity =_pg_workerreviewid_value_lookuplogicalname;
                  
            Xrm.WebApi.online.retrieveRecord("cdm_worker",  worker[0].id , "?$select=cdm_anniversarydatetime").then(
                 function success(result) {
                var cdm_anniversarydatetime = result["cdm_anniversarydatetime"];
               
                var annivarsary = new Array();
            
                annivarsary[0] = new Object();
            annivarsary[0].id = cdm_anniversarydatetime;
        var anivarsary = new Date(annivarsary[0].id);
                if (quaterenddate > anivarsary) {
                                    formcontext.getControl("pg_elevate").setDisabled(false);
           formcontext.ui.clearFormNotification("EmployeeNotEligibleNotification");
           
                                    
                                   
                                }
                                else {
                                    formcontext.getControl("pg_elevate").setDisabled(true);
          formcontext.ui.setFormNotification("This employee is not eligible for elevation", "ERROR","EmployeeNotEligibleNotification");
                    
                    
        }
        },
        
           
            function(error) {
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
        
        catch(err)  {
        } 
        console.log(review); 
        }
        
        
        
        
        
        function annivarsary(context) {
            debugger;
            try{
                formcontext = context.getFormContext();
              var  review = formcontext.getAttribute("pg_review").getValue()[0].id;
        Xrm.WebApi.online.retrieveRecord("new_employee",review , "?$select=pg_performanceperiod").then(
            function success(result) {
                var pg_performanceperiod = result["pg_performanceperiod"];
           var performance = new Array();
            
                    performance[0] = new Object();
           performance[0].id =pg_performanceperiod;
          var performance =pg_performanceperiod;
        var Q1 = performance.split('-');
        var Quater=Q1[0];
        var yearsomex= Q1[1];
         var enddateforQ1 = new Date();
        var Qua1 = "31-mar"; 
          var dt1 = Qua1.split('-');
          var day1 = dt1[0];
            var month1 = dt1[1].toLocaleLowerCase();
             var year1 = yearsomex;
        var QuaterQ1 = year1 + "-" + month1+ "-"+day1;
             enddateforQ1 = new Date(QuaterQ1.replace(/-/g, "/")); 
        
         var enddateforQ2 = new Date();
           var Qua2 = "30-june"; 
           var dt2 = Qua2.split('-');
           var day2 =  dt2[0];
                  var month2 = dt2[1].toLocaleLowerCase();
                  var year2 = yearsomex;
                  var QuaterQ2 = year2 + "-" + month2+ "-"+day2;
                  enddateforQ2 = new Date(QuaterQ2.replace(/-/g, "/"));
         var enddateforQ3 = new Date();
        var Qua3 = "30-sep"; 
           var dt3 = Qua3.split('-');
           var day3 = dt3[0];
           var month3 = dt3[1].toLocaleLowerCase();
           var year3 =yearsomex;
           var QuaterQ3 = year3 + "-" + month3+ "-"+day3;
        enddateforQ3 = new Date(QuaterQ3.replace(/-/g, "/"));
         var enddateforQ4 = new Date();
           var Qua4 = "31-dec"; 
         var dt4 = Qua4.split('-');
         var day4 = dt4[0];
         var month4 = dt4[1].toLocaleLowerCase();
         var year4 =yearsomex;
        var QuaterQ4 = year4 + "-" + month4+ "-"+day4;
        enddateforQ4 = new Date(QuaterQ4.replace(/-/g, "/"));
        
        var quaterenddate={};
        // var quaterenddate = new Date();
             if(Quater=="Q4"){
               var quaterenddate=enddateforQ4;
             }
           else if(Quater == "Q3"){
               var quaterenddate=enddateforQ3;
             }
        else if(Quater == "Q2"){
               quaterenddate=enddateforQ2;
             }
           else if(Quater == "Q1"){
               quaterenddate=enddateforQ1;
             }
          Xrm.WebApi.online.retrieveRecord("new_employee",review , "?$select=_pg_workerreviewid_value").then(
            function success(result) {
                var _pg_workerreviewid_value = result["_pg_workerreviewid_value"];
                var _pg_workerreviewid_value_formatted = result["_pg_workerreviewid_value@OData.Community.Display.V1.FormattedValue"];
                var _pg_workerreviewid_value_lookuplogicalname = result["_pg_workerreviewid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
          
                  
                    var worker = new Array();
            
                    worker[0] = new Object();
            
                    worker[0].id = _pg_workerreviewid_value;
                  
                    worker[0].name =_pg_workerreviewid_value_formatted;
                    worker[0].entity =_pg_workerreviewid_value_lookuplogicalname;
                  
            Xrm.WebApi.online.retrieveRecord("cdm_worker",  worker[0].id , "?$select=cdm_anniversarydatetime").then(
                 function success(result) {
                var cdm_anniversarydatetime = result["cdm_anniversarydatetime"];
               
                var annivarsary = new Array();
            
                annivarsary[0] = new Object();
            annivarsary[0].id = cdm_anniversarydatetime;
        
        
          var anivarsary = new Date(annivarsary[0].id);
        
        var year =  anivarsary.getFullYear()+"";
        var month = ( anivarsary.getMonth()+1)+"";
        var day =  anivarsary.getDate()+"";  
          anivarsary = year + '-' + month + '-' + day;  
          anivarsary = new Date(anivarsary.replace(/-/g, "/"));
        var endDate = "", noOfDaysToAdd = 90, count = 0;
        while(count < noOfDaysToAdd){
            endDate = new Date(anivarsary.setDate(anivarsary.getDate() + 1));
            if(endDate.getDay() != 0 && endDate.getDay() != 6){
               count++;
            }
        }             
         var Today = new Date();
         var yyyy = Today.getFullYear()+"";
            var mm = ( Today.getMonth()+1)+"";
           
              var dd =   Today.getDate()+"";  
          Today = yyyy + '-' + mm + '-' + dd;      
        Today = new Date(Today.replace(/-/g, "/")); 
        
                if (quaterenddate > anivarsary) {
                                    formcontext.getControl("pg_elevate").setDisabled(false);
           formcontext.ui.clearFormNotification("EmployeeNotEligibleNotification");
           
                                    
                                   
                                }
                                else {
                                    formcontext.getControl("pg_elevate").setDisabled(true);
          formcontext.ui.setFormNotification("This employee is not eligible for elevation", "ERROR","EmployeeNotEligibleNotification");
                    
                    
        }
        },
        
           
            function(error) {
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
        
        catch(err)  {
        } 
        console.log(review); 
        }
        
        
        

function annivarsary(context) {   ///dojo elevation entity---onload event---
    debugger;
    try{
        formcontext = context.getFormContext();
      var  review = formcontext.getAttribute("pg_review").getValue()[0].id;
Xrm.WebApi.online.retrieveRecord("new_employee",review , "?$select=pg_performanceperiod").then(
    function success(result) {
        var pg_performanceperiod = result["pg_performanceperiod"];
   var performance = new Array();
    
            performance[0] = new Object();
   performance[0].id =pg_performanceperiod;
  var performance =pg_performanceperiod;
var Q1 = performance.split('-');
var Quater=Q1[0];
var yearsomex= Q1[1];
 var enddateforQ1 = new Date();
var Qua1 = "31-mar"; 
  var dt1 = Qua1.split('-');
  var day1 = dt1[0];
    var month1 = dt1[1].toLocaleLowerCase();
     var year1 = yearsomex;
var QuaterQ1 = year1 + "-" + month1+ "-"+day1;
     enddateforQ1 = new Date(QuaterQ1.replace(/-/g, "/")); 

 var enddateforQ2 = new Date();
   var Qua2 = "30-june"; 
   var dt2 = Qua2.split('-');
   var day2 =  dt2[0];
          var month2 = dt2[1].toLocaleLowerCase();
          var year2 = yearsomex;
          var QuaterQ2 = year2 + "-" + month2+ "-"+day2;
          enddateforQ2 = new Date(QuaterQ2.replace(/-/g, "/"));
 var enddateforQ3 = new Date();
var Qua3 = "30-sep"; 
   var dt3 = Qua3.split('-');
   var day3 = dt3[0];
   var month3 = dt3[1].toLocaleLowerCase();
   var year3 =yearsomex;
   var QuaterQ3 = year3 + "-" + month3+ "-"+day3;
enddateforQ3 = new Date(QuaterQ3.replace(/-/g, "/"));
 var enddateforQ4 = new Date();
   var Qua4 = "31-dec"; 
 var dt4 = Qua4.split('-');
 var day4 = dt4[0];
 var month4 = dt4[1].toLocaleLowerCase();
 var year4 =yearsomex;
var QuaterQ4 = year4 + "-" + month4+ "-"+day4;
enddateforQ4 = new Date(QuaterQ4.replace(/-/g, "/"));

var quaterenddate={};
// var quaterenddate = new Date();
     if(Quater=="Q4"){
       var quaterenddate=enddateforQ4;
     }
   else if(Quater == "Q3"){
       var quaterenddate=enddateforQ3;
     }
else if(Quater == "Q2"){
       quaterenddate=enddateforQ2;
     }
   else if(Quater == "Q1"){
       quaterenddate=enddateforQ1;
     }
  Xrm.WebApi.online.retrieveRecord("new_employee",review , "?$select=_pg_workerreviewid_value").then(
    function success(result) {
        var _pg_workerreviewid_value = result["_pg_workerreviewid_value"];
        var _pg_workerreviewid_value_formatted = result["_pg_workerreviewid_value@OData.Community.Display.V1.FormattedValue"];
        var _pg_workerreviewid_value_lookuplogicalname = result["_pg_workerreviewid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
  
          
            var worker = new Array();
    
            worker[0] = new Object();
    
            worker[0].id = _pg_workerreviewid_value;
          
            worker[0].name =_pg_workerreviewid_value_formatted;
            worker[0].entity =_pg_workerreviewid_value_lookuplogicalname;
          
    Xrm.WebApi.online.retrieveRecord("cdm_worker",  worker[0].id , "?$select=cdm_anniversarydatetime").then(
         function success(result) {
        var cdm_anniversarydatetime = result["cdm_anniversarydatetime"];
       
        var annivarsary = new Array();
    
        annivarsary[0] = new Object();
    annivarsary[0].id = cdm_anniversarydatetime;


  var anivarsary = new Date(annivarsary[0].id);

var year =  anivarsary.getFullYear()+"";
var month = ( anivarsary.getMonth()+1)+"";
var day =  anivarsary.getDate()+"";  
  anivarsary = year + '-' + month + '-' + day;  
  anivarsary = new Date(anivarsary.replace(/-/g, "/"));
var endDate = "", noOfDaysToAdd = 90, count = 0;
while(count < noOfDaysToAdd){
    endDate = new Date(anivarsary.setDate(anivarsary.getDate() + 1));
    if(endDate.getDay() != 0 && endDate.getDay() != 6){
       count++;
    }
}             
 var Today = new Date();
 var yyyy = Today.getFullYear()+"";
    var mm = ( Today.getMonth()+1)+"";
   
      var dd =   Today.getDate()+"";  
  Today = yyyy + '-' + mm + '-' + dd;      
Today = new Date(Today.replace(/-/g, "/")); 

        if (quaterenddate > anivarsary) {
                            formcontext.getControl("pg_elevate").setDisabled(false);
   formcontext.ui.clearFormNotification("EmployeeNotEligibleNotification");
   
                            
                           
                        }
                        else {
                            formcontext.getControl("pg_elevate").setDisabled(true);
  formcontext.ui.setFormNotification("This employee is not eligible for elevation", "ERROR","EmployeeNotEligibleNotification");
            
            
}
},

   
    function(error) {
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

catch(err)  {
} 
console.log(review); 
}







/////////////support ticket entity ---pg-testticket

function enabletoolasseced(executionContext) {
    debugger;
try{
        var formContext = executionContext.getFormContext();
  var  workmode = formcontext.getAttribute("pg_workmode").getValue();
if (workmode==140310000  ||  workmode==140310002 ){
formContext.getControl("pg_newseating").setDisabled(false);
}
else{
formContext.getControl("pg_newseating").setDisabled(true);
}
}
catch(err)  {

}  
}

function setenable(executionContext) {
    debugger;
try{
        var formContext = executionContext.getFormContext();
 var  newworkmode = formcontext.getAttribute("pg_newworkmode").getValue();
if(newworkmode==140310000  || newworkmode==140310001 ){
formContext.getControl("pg_attachbusinessheadapproval").setDisabled(false);
}
else{
formContext.getControl("pg_attachbusinessheadapproval").setDisabled(true);
}
}
catch(err)  {

}  
}



function gettoolaccess(context) {
    debugger;
    try{
        formcontext = context.getFormContext();
      var  applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    var  subject = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    
        var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;
        employeeid = employee.substring(1, 37);
        var  name= formcontext.getAttribute("pg_name").getValue();
        if (applicationselect == 10 && subject==101) {
            Xrm.WebApi.online.retrieveMultipleRecords("incident", "?$filter=title eq '" + name + "'&$top=1").then(
                (results) => {

                    for (var i = 0; i < results.entities.length; i++) {
                        var result = results.entities[i];
                      
                        var pg_newtoolaccesses = result["pg_newtoolaccesses"]; 
                        var pg_newtoolaccesses_formatted = result["pg_newtoolaccesses@OData.Community.Display.V1.FormattedValue"];
                    
            
                    var newtoolaccess=new Array();


                    newtoolaccess[0] = new Object();

                    newtoolaccess[0].id = pg_newtoolaccesses;
                    newtoolaccess[0].name =pg_newtoolaccesses_formatted;
                    if(newtoolaccess[0].name !=null && newtoolaccess[0].name !=""){
                        formcontext.getControl("pg_newtoolaccessesneeded").setDisabled(true);
                      
                     }
                     else {
                        formcontext.getControl("pg_newtoolaccessesneeded").setDisabled(false);
                       
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

function getdojomarket(context) {

    try {
        var formContext = context.getFormContext();
        var applicationselect = formContext.getAttribute("pg_application").getSelectedOption().value;
        //Get Owner ID and get Worker Email
        var owner = formContext.getAttribute("ownerid");
        var ownerid = owner.getValue()[0].id;
        var email = "";
        if (applicationselect == 140310012) {
            Xrm.WebApi.online.retrieveMultipleRecords("systemuser", "?$filter=systemuserid eq " + ownerid + "&$top=1").then(
                function success(results) {
                    //console.log(results);
                    for (var i = 0; i < results.entities.length; i++) {
                        var result = results.entities[i];
                        email = result["internalemailaddress"];
      Xrm.WebApi.online.retrieveMultipleRecords("pg_prideemployee", "?$filter=emailaddress eq '" + email + "'&$top=1").then(
                            function success(results2) {
                                for (var i = 0; i < results2.entities.length; i++) {
                                  var doj = results2.entities[i]["pg_doj"] ? results2.entities[i]["pg_doj"] : results2.entities[i]["pg_dojo"];
      
                                    var dojo = new Array();

                                    dojo[0] = new Object();

                                    dojo[0].id = doj;
                                   
                                    formContext.getAttribute("pg_dojo").setValue( dojo[0].id );
                                    
                                }
                            },
                            function (error) {
                                Xrm.Utility.alertDialog(error.message);
                            }
                        );

                    }
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
    }
    catch (err) {
    }
}

function setpriority(context) {
debugger;
try{
    formcontext = context.getFormContext();
  var  applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
var  subject = formcontext.getAttribute("pg_subject").getSelectedOption().value;
var priority=formcontext.getAttribute("pg_priority").getValue();
 if (applicationselect == 10 && subject ==99) {
formcontext.getAttribute("pg_priority").setValue(1);
}
    else if (applicationselect == 10 && subject == 100) {
formcontext.getAttribute("pg_priority").setValue(2);
}
  else if (applicationselect == 10 && subject == 101) {
formcontext.getAttribute("pg_priority").setValue(3);
}
else if (applicationselect == 10 && subject== 102) {
formcontext.getAttribute("pg_priority").setValue(4);
}
else if (applicationselect == 10 && subject== 103) {
formcontext.getAttribute("pg_priority").setValue(4);
}
else if (applicationselect == 10 && subject== 104) {
formcontext.getAttribute("pg_priority").setValue(4);
}
else if (applicationselect == 10 && subject== 1000) {
formcontext.getAttribute("pg_priority").setValue(4);
}
}
catch(err)
{
}
}
function employeesname(context) {
    debugger;      
try{                                                      // ?$select=name&$top=3
    formcontext = context.getFormContext();
    var applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    var subject = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    var employees = " ";
    var currentreportingmanagers = formcontext.getAttribute("pg_currentreportingmanagers").getValue()[0].id;
    currentreportingmanagersid = currentreportingmanagers.substring(1, 37);
      var query = "?$select=pg_name&$filter=_pg_reportstoid_value eq " + currentreportingmanagersid;
    if (applicationselect == 10 && subject == 100) {
        Xrm.WebApi.online.retrieveMultipleRecords("pg_prideemployee", query).then(
            function success(results) {
               for (var i = 0; i < results.entities.length; i++) {
                    var pg_name = results.entities[i]["pg_name"];
                    if (i < (results.entities.length - 1)) {
                        employees += (pg_name + ", ");
                    }
                    else employees += pg_name;

                    formcontext.getAttribute("pg_reportingemployees").setValue(employees);
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}
catch(err)
{
}
}

   
   
function getdesignation(context) {
    debugger;
    try{
        formcontext = context.getFormContext();
      var  applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    var  subject = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    
        var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;
        employeeid = employee.substring(1, 37);if (applicationselect == 10 && subject == 101) {
Xrm.WebApi.online.retrieveRecord("pg_prideemployee", employeeid, "?$select=_pg_title_value").then(
    function success(results) {
                  
                    var pg_title = results["_pg_title_value"]; // Lookup
                    var pg_title_formatted = results["_pg_title_value@OData.Community.Display.V1.FormattedValue"];
                    var pg_title_lookuplogicalname = results["_pg_title_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    var prideemployeetitle = new Array();
                    prideemployeetitle[0] = new Object();
                    prideemployeetitle[0].id = pg_title;
                    prideemployeetitle[0].name =pg_title_formatted;
                    prideemployeetitle[0].entityType=pg_title_lookuplogicalname
                    formcontext.getAttribute("pg_designation").setValue(prideemployeetitle[0].name);
                     },
                function (error) {
                console.log(error.message);
                }
                );
            }
        }
 
                   
        catch(err) {
        }
    }
function getmanagernam(context) {
debugger;
try{
    formcontext = context.getFormContext();
  var  applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
var  subject = formcontext.getAttribute("pg_subject").getSelectedOption().value;

    var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;
    employeeid = employee.substring(1, 37);
  
 if (applicationselect == 10 && subject ==99) {
     Xrm.WebApi.online.retrieveRecord("pg_prideemployee", employeeid , "?$select=_pg_reportstoid_value").then(
        function success(result) {
            var _pg_reportstoid_value = result["_pg_reportstoid_value"];
            var _pg_reportstoid_value_formatted = result["_pg_reportstoid_value@OData.Community.Display.V1.FormattedValue"];
            var _pg_reportstoid_value_lookuplogicalname = result["_pg_reportstoid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
              var manager = new Array();

            manager[0] = new Object();

            manager[0].id = _pg_reportstoid_value;
            manager[0].name = _pg_reportstoid_value_formatted; 
            manager[0].entityType = _pg_reportstoid_value_lookuplogicalname; 
 formcontext.getAttribute("pg_currentreportingmanager").setValue( manager[0].name);
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

  else if (applicationselect == 10 && subject == 101) {
    Xrm.WebApi.online.retrieveRecord("pg_prideemployee", employeeid, "?$select=pg_team").then(
        function success(result) {
            var pg_team = result["pg_team"];
            var team = new Array();

            team[0] = new Object();

            team[0].id = pg_team;
  formcontext.getAttribute("pg_currentteam").setValue(team[0].id);
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
          
        }
    );
}
   else if (applicationselect == 10 && subject== 102) {
        Xrm.WebApi.online.retrieveRecord("pg_prideemployee", employeeid, "?$select=pg_doj").then(
     function success(result) {
         var pg_doj = result["pg_doj"];
         var pg_doj_formatted = result["pg_doj@OData.Community.Display.V1.FormattedValue"];
            var dojo = new Array();

            dojo[0] = new Object();

            dojo[0].id = pg_doj;
            dojo[0].name = pg_doj_formatted;
  formcontext.getAttribute("pg_currentdojo").setValue(dojo[0].name);
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
          
        }
    );
  }
   else if (applicationselect == 10 && subject == 103) {
       Xrm.WebApi.online.retrieveRecord("pg_prideemployee", employeeid, "?$select=pg_name").then(
    function success(result) {
        var pg_name = result["pg_name"];
        var name = new Array();

        name[0] = new Object();

        name[0].id = pg_name;
        Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$filter=cdm_fullname eq '" + name[0].id + "'&$top=1").then(
    function success(results) {
        for (var i = 0; i < results.entities.length; i++) {
            var cdm_city_custom = results.entities[i]["cdm_city_custom"];
            var workerlocation=new Array();
                
        
            workerlocation[0] = new Object();
            workerlocation[0].id = cdm_city_custom;
            formcontext.getAttribute("pg_currentworklocation").setValue(workerlocation[0].id);
        }
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
    }
);
},
function (error) {
Xrm.Utility.alertDialog(error.message);

}
);
 }

else if (applicationselect == 10 && subject == 104) {

    Xrm.WebApi.online.retrieveRecord("pg_prideemployee", employeeid, "?$select=pg_name").then(
        function success(result) {
            var pg_name = result["pg_name"];
            var name = new Array();

            name[0] = new Object();

            name[0].id = pg_name;
       
            Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$filter=cdm_fullname eq '" + name[0].id + "'&$top=1").then(
                function success(results) {
                    for (var i = 0; i < results.entities.length; i++) {
                        var cdm_worksfromhome = results.entities[i]["cdm_worksfromhome"];
                        var cdm_worksfromhome_formatted = results.entities[i]["cdm_worksfromhome@OData.Community.Display.V1.FormattedValue"];
                        var workfromhome=new Array();
            
                        workfromhome[0] = new Object();
            
                        workfromhome[0].id = cdm_worksfromhome;
            
                   
                        workfromhome[0].name =cdm_worksfromhome_formatted;
                        formcontext.getAttribute("pg_currentworkmode").setValue(workfromhome[0].name);
                    }
                },
                function(error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
          
        }
    );
}

}
catch(err)
{
}
}



function TickerChange(executionContext) {
    debugger;
try{
        var formContext = executionContext.getFormContext();
   var reportingmanager = formContext.ui.tabs.get("tab1");
  var reportingmanagersec = reportingmanager.sections.get("tab_6_section_1"); 
 var employeereportingtype = formContext.ui.tabs.get("tab_7");
    var employeereportingtypesec = employeereportingtype.sections.get("tab_7_section_1");
  var team = formContext.ui.tabs.get("tab_8");
    var teamrsec = team.sections.get("tab_8_section_1");
    var dojo = formContext.ui.tabs.get("tab_10");
    var dojosec = dojo.sections.get("tab_10_section_1");
var workloc = formContext.ui.tabs.get("tab_11");
    var worklocsec = workloc.sections.get("tab_11_section_1");

    var workmode = formContext.ui.tabs.get("tab_12");
    var workmodesec = workmode.sections.get("tab_12_section_1");
  var salaryrevision = formContext.ui.tabs.get("tab_14");
    var salaryrevisionsec = salaryrevision.sections.get("tab_14_section_1");

    try {
      var  applicationselect = formContext.getAttribute("pg_application").getSelectedOption().value;
  }
    catch
    {
        var applicationselect = 0;
   }
  try {
     var  subject = formContext.getAttribute("pg_subject").getSelectedOption().value;
    }
    catch {
        var subjectselect = 0;
    }
  if (applicationselect == 10 && subject ==99) {
      reportingmanager.setVisible(true);
      employeereportingtype.setVisible(false);
      team.setVisible(false);
      dojo.setVisible(false);
      workmode.setVisible(false);
   
      workloc.setVisible(false);
      salaryrevision.setVisible(false);
formContext.getAttribute("pg_employee").setRequiredLevel("required");
formContext.getAttribute("pg_newreportingmanager").setRequiredLevel("required");
formContext.getAttribute("pg_effectivedate").setRequiredLevel("required");
formContext.getAttribute("pg_reasonforchange").setRequiredLevel("required");
formContext.getAttribute("pg_currentreportingmanagers").setRequiredLevel("required");
 }
    else if (applicationselect == 10 && subject == 100) {
        reportingmanager.setVisible(false);
      employeereportingtype.setVisible(true);
      team.setVisible(false);
      dojo.setVisible(false);
      workmode.setVisible(false);
     workloc.setVisible(false);
      salaryrevision.setVisible(false);

formContext.getAttribute("pg_effectivedate").setRequiredLevel("required");
formContext.getAttribute("pg_reasonforchange").setRequiredLevel("required");
   }
    else if (applicationselect == 10 && subject == 101) {
        reportingmanager.setVisible(false);
        employeereportingtype.setVisible(false);
        team.setVisible(true);
        dojo.setVisible(false);
        workmode.setVisible(false);
        workloc.setVisible(false);
        salaryrevision.setVisible(false);
formContext.getAttribute("pg_employee").setRequiredLevel("required");
formContext.getAttribute("pg_effectivedate").setRequiredLevel("required");
formContext.getAttribute("pg_reasonforchange").setRequiredLevel("required");
formContext.getAttribute("pg_newteam").setRequiredLevel("required");
formContext.getAttribute("pg_newdojo").setRequiredLevel("required");
//formContext.getAttribute("pg_newshift").setRequiredLevel("required");
    }
    else if (applicationselect == 10 && subject == 102) {
        reportingmanager.setVisible(false);
        employeereportingtype.setVisible(false);
        team.setVisible(false);
        dojo.setVisible(true);
        workmode.setVisible(false);
        workloc.setVisible(false);
        salaryrevision.setVisible(false);
formContext.getAttribute("pg_employee").setRequiredLevel("required");
formContext.getAttribute("pg_effectivedate").setRequiredLevel("required");
formContext.getAttribute("pg_reasonforchange").setRequiredLevel("required");
    }
    else if (applicationselect == 10 && subject == 103) {
        reportingmanager.setVisible(false);
      employeereportingtype.setVisible(false);
      team.setVisible(false);
      dojo.setVisible(false);
      workmode.setVisible(false);
         workloc.setVisible(true);
      salaryrevision.setVisible(false);
formContext.getAttribute("pg_employee").setRequiredLevel("required");
formContext.getAttribute("pg_effectivedate").setRequiredLevel("required");
formContext.getAttribute("pg_reasonforchange").setRequiredLevel("required");
formContext.getAttribute("pg_newworklocation").setRequiredLevel("required");
    }
    else if (applicationselect == 10 && subject == 104) {
        reportingmanager.setVisible(false);
        employeereportingtype.setVisible(false);
        team.setVisible(false);
        dojo.setVisible(false);
        workmode.setVisible(true);
         workloc.setVisible(false);
        salaryrevision.setVisible(false);
formContext.getAttribute("pg_employee").setRequiredLevel("required");
formContext.getAttribute("pg_effectivedate").setRequiredLevel("required");
formContext.getAttribute("pg_reasonforchange").setRequiredLevel("required");
formContext.getAttribute("pg_newworkmode").setRequiredLevel("required");

    }
  else if (applicationselect == 10 && subject == 1000) {
       reportingmanager.setVisible(false);
      employeereportingtype.setVisible(false);
      team.setVisible(false);
      dojo.setVisible(false);
      workmode.setVisible(false);
      workloc.setVisible(false);
      salaryrevision.setVisible(true);
formContext.getAttribute("pg_employee").setRequiredLevel("required");
formContext.getAttribute("pg_effectivedate").setRequiredLevel("required");
formContext.getAttribute("pg_reasonforchange").setRequiredLevel("required");
formContext.getAttribute("pg_newannualcompensation").setRequiredLevel("required");
    }
}
catch(err)
{
}
}


function subjectchange(context) {
try{
    var formcontext = context.getFormContext();
    var subject = formcontext.getControl("pg_subject");
    var applicationControl = formcontext.getControl("pg_application");
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
        subject.addOption({ text: 'Reporting Manager', value: 99 });
        subject.addOption({ text: 'Employee Reporting Change', value: 100 });
        subject.addOption({ text: 'Team/Process', value: 101 });
        subject.addOption({ text: 'Dojo', value: 102 });
        subject.addOption({ text: 'Work Location', value: 103 });
        subject.addOption({ text: 'Work Mode', value: 104 });
 subject.addOption({ text: 'Salary Revision', value: 1000 });
    }
}
catch(err)
{
}
}
function hidedatachangetab(executionContext) {
    debugger;

        var formContext = executionContext.getFormContext();
   var reportingmanager = formContext.ui.tabs.get("tab1");
  var reportingmanagersec = reportingmanager.sections.get("tab_6_section_1"); 
 var employeereportingtype = formContext.ui.tabs.get("tab_7");
    var employeereportingtypesec = employeereportingtype.sections.get("tab_7_section_1");
  var team = formContext.ui.tabs.get("tab_8");
    var teamrsec = team.sections.get("tab_8_section_1");
    var dojo = formContext.ui.tabs.get("tab_10");
    var dojosec = dojo.sections.get("tab_10_section_1");
var workloc = formContext.ui.tabs.get("tab_11");
    var worklocsec = workloc.sections.get("tab_11_section_1");

    var workmode = formContext.ui.tabs.get("tab_12");
    var workmodesec = workmode.sections.get("tab_12_section_1");
  var salaryrevision = formContext.ui.tabs.get("tab_14");
    var salaryrevisionsec = salaryrevision.sections.get("tab_14_section_1");

    try {
      var  applicationselect = formContext.getAttribute("pg_application").getSelectedOption().value;
  }
    catch
    {
        var applicationselect = 0;
   }
 
  if (applicationselect != 10) {
      reportingmanager.setVisible(false);
      employeereportingtype.setVisible(false);
      team.setVisible(false);
      dojo.setVisible(false);
      workmode.setVisible(false);
   
      workloc.setVisible(false);
      salaryrevision.setVisible(false);
 }
}

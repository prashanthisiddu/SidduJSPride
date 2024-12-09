function GetandSetSubCategory(context) {///how to get and set the multioption select field in from one entity to another
    var formContext = context.getFormContext();
    var title = formContext.getAttribute("title").getValue();
    var ticketnumber = formContext.getAttribute("ticketnumber").getValue();
    var var_pg_subcategoryy = formContext.getControl("pg_subcategoryy");
    var filter = "?$select=pg_subcategory,pg_subcategoryy&$filter=pg_name eq '" + title + "' and pg_casenumber eq '" + ticketnumber + "'";
 
    Xrm.WebApi.online.retrieveMultipleRecords("pg_supportticket", filter).then(
        function success(results) {
            if (results.entities.length > 0) {
 
                var pg_subcategory = results.entities[0]["pg_subcategory"];
                var pg_subcategory_formatted = results.entities[0]["pg_subcategory@OData.Community.Display.V1.FormattedValue"];
                var pg_subcategoryy = results.entities[0]["pg_subcategoryy"];
                var pg_subcategoryy_formatted = results.entities[0]["pg_subcategoryy@OData.Community.Display.V1.FormattedValue"];
                formContext.getAttribute("pg_subcategory").setValue(pg_subcategory);
                if (pg_subcategoryy.includes(",")) {
                    let operationSubcategory = Array.from(pg_subcategoryy.split(","), Number);
                    formContext.getAttribute("pg_subcategoryy").setValue(operationSubcategory);
                    //formContext.getAttribute("pg_subcategoryy").setValue([Number(value)]);              
                } else {
                    formContext.getAttribute("pg_subcategoryy").setValue([Number(pg_subcategoryy)]);
                }
            } else {
                console.log("No records found for the provided criteria.");
            }
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
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
        if (applicationselect === 10 && subject===101) {
            Xrm.WebApi.online.retrieveMultipleRecords("incident", "?$filter=title eq '" + name + "'&$top=1").then(
                function success(results){
                    for (var i = 0; i < results.entities.length; i++) {
                        var incidentid = results.entities[i]["incidentid"];
            
                    var incident=new Array();


        incident[0] = new Object();

        incident[0].id = incidentid;
        Xrm.WebApi.online.retrieveMultipleRecords("pg_supportticket", "?$filter=pg_name eq '" + title + "'&$top=1").then(
            function success(results) {
                for (var i = 0; i < results.entities.length; i++) {
                    var pg_newseating = results.entities[i]["pg_newseating"];
                    var pg_newshift = results.entities[i]["pg_newshift"];
                    var pg_newshift_formatted = results.entities[i]["pg_newshift@OData.Community.Display.V1.FormattedValue"];
                    var incident=new Array();

                    incident[0] = new Object();
            
                    incident[0].id = pg_newseating;
                    var newtoolaccsess=new Array();
            
                    newtoolaccsess[0] = new Object();
            
                    newtoolaccsess[0].id = pg_newshift;


    formContext.getControl("pg_newtoolaccessesneeded").setDisabled(false);
    
}
},
function (error) {
    console.log(error.message);
}
);
}

}
        
);

        }
  
}                 
catch(err) {
}
}

function gettoolaccess(context) {
    debugger;
    try{
        formcontext = context.getFormContext();
      var  applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    var  subject = formcontext.getAttribute("pg_subject").getSelectedOption().value;
    
        //var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;
        //employeeid = employee.substring(1, 37);
        var  name= formcontext.getAttribute("pg_name").getValue();
        if ( subject ===101) {
            Xrm.WebApi.online.retrieveMultipleRecords("incident", "?$filter=title eq '" + employeeid + "'&$top=1").then(
                function success(results){
                    for (var i = 0; i < results.entities.length; i++) {
                        var incidentid = results.entities[i]["incidentid"];
            
                    var incident=new Array();


        incident[0] = new Object();

        incident[0].id = incidentid;
                
            Xrm.WebApi.online.retrieveMultipleRecords("pg_supportticket", "?$filter=pg_name eq '" + title + "'&$top=1").then(
                function success(results) {
                    for (var i = 0; i < results.entities.length; i++) {
                        var pg_newseating = results.entities[i]["pg_newseating"];
                        var pg_newshift = results.entities[i]["pg_newshift"];
                        var pg_newshift_formatted = results.entities[i]["pg_newshift@OData.Community.Display.V1.FormattedValue"];
                        var incident=new Array();

                        incident[0] = new Object();
                
                        incident[0].id = pg_newseating;
                        var newtoolaccsess=new Array();
                
                        newtoolaccsess[0] = new Object();
                
                        newtoolaccsess[0].id = pg_newshift;
                     
                          
                    }
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
     
    }
}
);


}  
}                 
catch(err) {
}
}

function getshift(context) {
    debugger;
    try{
        formcontext = context.getFormContext();

      var  applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
    var  subject = formcontext.getAttribute("pg_casesubject").getSelectedOption().value;
    
        var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;
        employeeid = employee.substring(1, 37);

     if (applicationselect === 10 && subject ===140310003) { 
var datachange = formcontext.ui.tabs.get("tab_13").setVisible(true);
//var teamrsec =  datachange.sections.get("tab_13_section_3").setVisible(true);
//var section =  datachange.sections.get("Summary_section_6").setVisible(true);

}
 if (applicationselect === 10 && subject ===140310003) {
   Xrm.WebApi.online.retrieveRecord("incident", employeeid, "?$select=pg_newshift").then(
                function success(result) {
                    var pg_newshift = result["pg_newshift"];
                    var pg_newshift_formatted = result["pg_newshift@OData.Community.Display.V1.FormattedValue"];

var shift=new Array();

            shift[0] = new Object();

            shift[0].id = pg_newshift;

            shift[0].name = pg_newshift_formatted;
if(pg_newshift === "" || pg_newshift != "null"){
    formContext.getControl("pg_newseating").setDisabled(false);
    
    }
    else{
    formContext.getControl("pg_newseating").setDisabled(true);
    
    }
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
    }
);

}
    }
catch(err)  {
}
} 


  
function getseating(context) {
debugger;
try{
formcontext = context.getFormContext();
var  applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
var  subject = formcontext.getAttribute("pg_casesubject").getSelectedOption().value;
var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;
employeeid = employee.substring(1, 37);
var incident = formcontext.getAttribute("title").getValue();
//incidentid = incident.substring(1, 37);
if(applicationselect === 10 && subject ===140310003) {
Xrm.WebApi.online.retrieveRecord("incident",employeeid, "?$select=pg_newshift").then(
    function success(result) {
        var pg_newseating = result["pg_newseating"];
        var pg_newshift = result["pg_newshift"];
        var pg_newshift_formatted = result["pg_newshift@OData.Community.Display.V1.FormattedValue"];
        Xrm.WebApi.online.retrieveRecord("incident", employeeid, "?$select=title").then(
            function success(result) {
                var title = result["title"];
            },
            function(error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
        Xrm.WebApi.online.retrieveRecord("pg_supportticket", "00000000-0000-0000-0000-000000000000", "?$select=pg_newseating,pg_newshift").then(
            function success(result) {
                var pg_newseating = result["pg_newseating"];
                var pg_newshift = result["pg_newshift"];
                var pg_newshift_formatted = result["pg_newshift@OData.Community.Display.V1.FormattedValue"];
            },
            function(error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
        var seating= new Array();
   
               seating[0] = new Object();
   
               seating[0].id = pg_newseating;
               var shift=new Array();

               shift[0] = new Object();
   
               shift[0].id = pg_newshift;
   
               shift[0].name = pg_newshift_formatted;
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

           
function getseating(context) {
debugger;
try{
formcontext = context.getFormContext();
var  applicationselect = formcontext.getAttribute("pg_application").getSelectedOption().value;
var  subject = formcontext.getAttribute("pg_casesubject").getSelectedOption().value;
var employee = formcontext.getAttribute("pg_employee").getValue()[0].id;
employeeid = employee.substring(1, 37);
var incident = formcontext.getAttribute("title").getValue();
//incidentid = incident.substring(1, 37);
if(applicationselect === 10 && subject ===140310003) {
Xrm.WebApi.online.retrieveRecord("pg_supportticket",incident, "?$select=pg_name").then(
    function success(result) {
        var pg_name = result["pg_name"];
        var name= new Array();
   
        name[0] = new Object();
   
        name[0].id = pg_name;
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
    }
);
Xrm.WebApi.online.retrieveRecord("incident",employeeid, "?$select=?$select=title").then(
    function success(result) {
        var title = result["title"];
      
        var titlle= new Array();
   
               titlle[0] = new Object();
   
               titlle[0].id = title;
Xrm.WebApi.online.retrieveRecord("pg_supportticket",  name[0].id, "?$select=pg_newseating,pg_newshift").then(
            function success(result) {
                var pg_newseating = result["pg_newseating"];
                var pg_newshift = result["pg_newshift"];
                var pg_newshift_formatted = result["pg_newshift@OData.Community.Display.V1.FormattedValue"];
var seating= new Array();
   
               seating[0] = new Object();
   
               seating[0].id = pg_newseating;
               var shift=new Array();

               shift[0] = new Object();
   
               shift[0].id = pg_newshift;
   
               shift[0].name = pg_newshift_formatted;
                           
                
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
}
catch(err)  {

}
}


function formBasedBPF(executionContext)
{
debugger;

 var formContext = executionContext.getFormContext();
 var  applicationselect = formContext.getAttribute("pg_application").getSelectedOption().value;
//var formName = formContext.ui.formSelector.getCurrentItem().getLabel();
var activeProcess = formContext.data.process.getActiveProcess();
var activeProcessID = activeProcess.getId();
             if (applicationselect === 10){
formContext.data.process.setActiveProcess('FF35E0D6-C0C4-4D0A-9EC7-3AEC0DFCE423', 'success');
             }
             else{
formContext.data.process.setActiveProcess('0FFBCDE4-61C1-4355-AA89-AA1D7B2B8792', 'success');
             }
}


    
//////0ffbcde4-61c1-4355-aa89-aa1d7b2b8792


//////FF35E0D6-C0C4-4D0A-9EC7-3AEC0DFCE423

function formBasedBPF(executionContext)
{
debugger;
var formType = Xrm.Page.ui.getFormType();
formContext = executionContext.getFormContext();
var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();
var activeProcess = Xrm.Page.data.process.getActiveProcess();
var activeProcessID = activeProcess.getId();
             if (formType != 1 && formName === 'Donor Cycle' && activeProcessID.toUpperCase() != 'DEEC5EF0-9F6D-4D6D-8878-65E7473A9921')
formContext.data.process.setActiveProcess('DEEC5EF0-9F6D-4D6D-8878-65E7473A9921', 'success');
             else if (formName === 'Annual Fund Donor Cycle' && activeProcessID.toUpperCase() != '7CBE0333-7D3F-49F1-AAAF-0B2C746C67FB')
formContext.data.process.setActiveProcess('7CBE0333-7D3F-49F1-AAAF-0B2C746C67FB', 'success');
}










function onChange() {

    var selectedOptionSet = Xrm.Page.getAttribute('new_opportunitystage');
    //var Id = Xrm.Page.data.entity.getId();
    //alert(Xrm.Page.getAttribute('stageid').getValue());
    switch (selectedOptionSet.getValue()) {
        case 1:
            //Guid for new stage set here

            Xrm.Page.getAttribute('stageid').setValue('3f203c1e-64ae-436e-a41b-464667b57ce8');
            break;
        case 2:

            //Guid for Open stage set here
            Xrm.Page.getAttribute('stageid').setValue('5ecba2d2-4e37-a259-577a-6a0c34b5c537');
            break;
        case 3:

            //Guid for Close stage set here
            Xrm.Page.getAttribute('stageid').setValue('6d49bc00-7343-eead-e2c6-17d28e683219');
            break;
        default:
            break;
    }

    //Call Entity save
    Xrm.Page.data.entity.save();
}
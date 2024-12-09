
//Requirement::whenever share happens get the owner of the shared record and display the owner name in Main record//'
//Objectid is ntg but the recordid//  and principalobjectid is ntg butto get  the user details/id of the user//
function getsharedlist(executionContext) {
    var formContext = executionContext.getFormContext();
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var recordId = formContext.data.entity.getId();
    var sharedUserName="";     
    var req = new XMLHttpRequest();
req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/principalobjectaccessset?$select=principalid&$filter=objectid eq "+recordId+"", false);
req.setRequestHeader("OData-MaxVersion", "4.0");
req.setRequestHeader("OData-Version", "4.0");
req.setRequestHeader("Accept", "application/json");
req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
req.onreadystatechange = function() {
    if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (this.status === 200) {
            var results = JSON.parse(this.response);
            for (var i = 0; i <= results.value.length; i++) {
        if(i > 0 && i<results.value.length)
        {
            sharedUserName+=",";
        }
                var principalid = results.value[i]["principalid"];
                var fetch = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>"+
                "<entity name='systemuser'>"+
                "<attribute name='fullname' />"+
                "<attribute name='businessunitid' />"+
                "<attribute name='title' />"+
                "<attribute name='address1_telephone1' />"+
                "<attribute name='positionid' />"+
                "<attribute name='systemuserid' />"+
                "<order attribute='fullname' descending='false' />"+
                "<filter type='and'>"+
                "<condition attribute='systemuserid' operator='eq' value='" + principalid + "' />"+
                "</filter>"+
                "</entity>"+
                "</fetch>";
                var fetch_Results = XrmServiceToolkit.Soap.Fetch(fetch);
    if (fetch_Results.length > 0) {
        
        sharedUserName+=fetch_Results[0].attributes.fullname.value;
     
    }  
            }
         
        } else {
            Xrm.Utility.alertDialog(this.statusText);
        }
    }
};
req.send();
formContext.getAttribute("pg_watchers").setValue(sharedUserName);
}


var url=window.location.href;
var dataIndex=url.lastIndexOf("=")+1;
var datalength=url.length;
var recorddata=url.slice(dataIndex,datalength)


//Requirement:: PIB(button as weel as entity) It is IN XYME Entity getting the user and compare with worker fullname by using webapi if the worker field i.e,, workfromhome is NO then set the approvedaupib value as as No by default//
function setaprrovalasyes(context) {
     
    formcontext = context.getFormContext();
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    //var currentuserid = userSettings.userId;
    var username = userSettings.userName;
    if (formcontext.ui.getFormType() === 1) {
     
Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$filter=cdm_fullname eq '" + username + "'&$top=1").then(
  function success(results) {
  for (var i = 0; i < results.entities.length; i++) {
      var  cdm_worksfromhome = results.entities[i]["cdm_worksfromhome"];
      var cdm_worksfromhome_formatted = results.entities[i]["cdm_worksfromhome@OData.Community.Display.V1.FormattedValue"];

    if(cdm_worksfromhome_formatted!="No"){
      var approve1daypib = formcontext.getAttribute("pg_approve1daypib").setValue(1);
    }
     
     else{
      
     }
  }
},
function (error) {
  Xrm.Utility.alertDialog(error.message);
}
);

}
}

function hideTab(executionContext) 
{
    formContext = executionContext.getFormContext();
    var tabObj = formContext.ui.tabs.get("HR Internal Info");
    tabObj.setVisible(false);
}
function setgoalsdefaultvalue(executionContext) 
{
    formContext = executionContext.getFormContext();
 var setgoals = formContext.getAttribute("pg_setgoals").getValue();
if(setgoals ===null){
 var setgoals = formContext.getAttribute("pg_setgoals").setValue(true);
}
}

/////////////main js used inrestbuilder entity select is principalobejectaccess and 
////retrivemutiple and asychrous means false need to set at last of get value and in select options principleid need to 
///select and in filter objectid need to 
////select and create once done need to go advanced find and get users entity values .

function getsharedlist(executionContext) {
var formContext = executionContext.getFormContext();
var userSettings = Xrm.Utility.getGlobalContext().userSettings;
var recordId = formContext.data.entity.getId();
var sharedUserName="";     
var req = new XMLHttpRequest();
req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/principalobjectaccessset?$select=principalid&$filter=objectid eq "+recordId+"", false);
req.setRequestHeader("OData-MaxVersion", "4.0");
req.setRequestHeader("OData-Version", "4.0");
req.setRequestHeader("Accept", "application/json");
req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
req.onreadystatechange = function() {
if (this.readyState === 4) {
  req.onreadystatechange = null;
  if (this.status === 200) {
      var results = JSON.parse(this.response);
      for (var i = 0; i <= results.value.length; i++) {
  if(i > 0 && i<results.value.length)
  {
     // sharedUserName+=",";
sharedUserName+="\r\n";
  }
          var principalid = results.value[i]["principalid"];
          var fetch = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>"+
          "<entity name='systemuser'>"+
          "<attribute name='fullname' />"+
          "<attribute name='businessunitid' />"+
          "<attribute name='title' />"+
          "<attribute name='address1_telephone1' />"+
          "<attribute name='positionid' />"+
          "<attribute name='systemuserid' />"+
          "<order attribute='fullname' descending='false' />"+
          "<filter type='and'>"+
          "<condition attribute='systemuserid' operator='eq' value='" + principalid + "' />"+
          "</filter>"+
          "</entity>"+
          "</fetch>";
          var fetch_Results = XrmServiceToolkit.Soap.Fetch(fetch);
if (fetch_Results.length > 0) {
  
  sharedUserName+=fetch_Results[0].attributes.fullname.value;
}  
      }
  } else {
      //Xrm.Utility.alertDialog(this.statusText);
  }
}
};
req.send();
formContext.getAttribute("pg_watchers").setValue(sharedUserName);
}

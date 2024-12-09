function ResubmitBtn(primaryControl) {  
    debugger;
    var formContext = primaryControl;
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentuserid = userSettings.userId;
   var ownerAttribute = formContext.getAttribute("ownerid").getValue()[0].id; 

 var statuscode = formContext.getAttribute("statuscode").getValue();
    if (currentuserid === ownerAttribute && statuscode===140310001){
        return true;
    }
    else {
        return false;
    }
  }




function MoreInfoSH(primaryControl) {
  var formContext = primaryControl;

  var status= formContext.getAttribute("statecode").getValue();
  var userSettings = Xrm.Utility.getGlobalContext().userSettings;
  var currentuserid = userSettings.userId;
  var employeeId = "{5107BBC4-568B-ED11-81AC-6045BDA8AA87}"; //rakeshid 
  if (currentuserid === employeeId && status===0) {
      return true;
  } else {
      return false;
  }
}

function ApprovedSH(primaryControl) {
  var formContext = primaryControl;

  var status= formContext.getAttribute("statecode").getValue();
  var userSettings = Xrm.Utility.getGlobalContext().userSettings;
  var currentuserid = userSettings.userId;
  var employeeId = "{5107BBC4-568B-ED11-81AC-6045BDA8AA87}"; //rakeshid 
  if (currentuserid === employeeId && status===0) {
 
      return true;
  } else {
      return false;
  }
}

function RejectedSH(primaryControl) {
  var formContext = primaryControl;

  var status= formContext.getAttribute("statecode").getValue();
  var userSettings = Xrm.Utility.getGlobalContext().userSettings;
  var currentuserid = userSettings.userId;
  var employeeId = "{5107BBC4-568B-ED11-81AC-6045BDA8AA87}"; //rakeshid 
  if (currentuserid === employeeId && status===0) {
      return true;
  } else {
      return false;
  }
}











function DecisonRequestInfo(context) {
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "pg_decisionrequest_99b56",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).then(console.log).catch(console.error);
}


function ShowHideFields(context) {
    debugger;
    var formContext = context.getFormContext();
    var category = formContext.getAttribute("pg_category").getValue();  
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentuserid = userSettings.userId;
    var employeeId = "{5107BBC4-568B-ED11-81AC-6045BDA8AA87}";  
    if (category === 140310000) {
        formContext.getControl("pg_startdate").setVisible(false);
        formContext.getControl("pg_enddate").setVisible(false);
        formContext.getControl("pg_fromlocation").setVisible(false);
        formContext.getControl("pg_tolocation").setVisible(false);
    }
    else if (category === 140310001) {
        formContext.getControl("pg_startdate").setVisible(true);
        formContext.getControl("pg_enddate").setVisible(true);
        formContext.getControl("pg_fromlocation").setVisible(true);
        formContext.getControl("pg_tolocation").setVisible(true);
    }
    if (currentuserid === employeeId) {
        formContext.getControl("pg_employeename").setVisible(true);
        formContext.getControl("pg_dojo").setVisible(true);
      
        formContext.getControl("pg_personalnumber").setVisible(true);
    }
    else{
      formContext.getControl("pg_employeename").setVisible(false);
      formContext.getControl("pg_dojo").setVisible(false);
     
      formContext.getControl("pg_personalnumber").setVisible(false);
    }
}
  

function EndDateMustbelessThanStart(context) {
    var formContext = context.getFormContext();
    var startDate = formContext.getAttribute("pg_startdate").getValue();
    var endDate = formContext.getAttribute("pg_enddate").getValue();
    var Category = formContext.getAttribute("pg_category").getValue();

    if (Category === 140310001) {
        if (endDate && startDate && endDate < startDate) {
            formContext.ui.setFormNotification("End date must be greater than or equal to start date.", "ERROR", "dateError");
            formContext.getControl("pg_enddate").setNotification("End date must be greater than or equal to start date.", "dateError");
        } else {
            formContext.ui.clearFormNotification("dateError");
            formContext.getControl("pg_enddate").clearNotification("dateError");
        }
    }
}


function CheckFromandTO(context) {
    var formContext = context.getFormContext();
    var Category = formContext.getAttribute("pg_category").getValue();
    
    if (Category === 140310001) {
        var fromLocationAttr = formContext.getAttribute("pg_fromlocation");
        var toLocationAttr = formContext.getAttribute("pg_tolocation");
        
        var fromLocation = fromLocationAttr ? fromLocationAttr.getValue() : null;
        var toLocation = toLocationAttr ? toLocationAttr.getValue() : null;

        if (fromLocation && toLocation && fromLocation === toLocation) {
            formContext.ui.setFormNotification("From Location and To Location cannot be the same.", "ERROR", "locationError");
            formContext.getControl("pg_tolocation").setNotification("End date must be greater than or equal to start date.", "dateError");
        } else {
          
            formContext.ui.clearFormNotification("locationError");
            formContext.getControl("pg_tolocation").clearNotification("dateError");
        }
    }
}
  
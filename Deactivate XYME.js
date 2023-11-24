function xymebutton(context) {
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "pg_xymebutton_57778",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).then(console.log).catch(console.error);
}













function deactivateXYME(primaryControl) {  //main form
  debugger;
  var formContext = primaryControl;
  var userSettings = Xrm.Utility.getGlobalContext().userSettings;
  var username = userSettings.userName;
  var owner = formContext.getAttribute("ownerid").getValue();
  var ownerName = owner[0].name; 
  var statuscode= formContext.getAttribute("statuscode").getValue();
  if (username!=ownerName && statuscode==1) {////intial stage
      return true;
  }
  else {
      return false;
  }
}


function setManager(context) { // onload//leave balance entity
    var formContext = context.getFormContext();
    var personnelNumber = formContext.getAttribute("pg_personnelnumber").getValue();

    Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$select=_cdm_managerworkerid_value&$filter=cdm_workernumber eq '" + personnelNumber + "'").then(
        function success(results) {
            for (var i = 0; i < results.entities.length; i++) {
                var _cdm_managerworkerid_value = results.entities[i]["_cdm_managerworkerid_value"];
                var _cdm_managerworkerid_value_formatted = results.entities[i]["_cdm_managerworkerid_value@OData.Community.Display.V1.FormattedValue"];
                var _cdm_managerworkerid_value_lookuplogicalname = results.entities[i]["_cdm_managerworkerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$select=_cdm_managerworkerid_value,cdm_primaryemailaddress&$filter=cdm_workernumber eq '" + _cdm_managerworkerid_value_formatted + "'").then(
                    function success(innerResults) {
                        for (var j = 0; j < innerResults.entities.length; j++) {
                            var primaryEmailAddress = innerResults.entities[j]["cdm_primaryemailaddress"];

                            Xrm.WebApi.online.retrieveMultipleRecords("systemuser", "?$select=fullname,internalemailaddress,systemuserid&$filter=internalemailaddress eq '" + primaryEmailAddress + "'").then(
                                function success(userResults) {
                                    if (userResults.entities.length > 0) {
                                        var userId = userResults.entities[0]["systemuserid"];
                                        var userName = userResults.entities[0]["fullname"];
                                        var userEmailAddress = userResults.entities[0]["internalemailaddress"];
                                        var lookupValue = [{
                                            id: userId,
                                            name: userName,
                                            entityType: "systemuser"
                                        }];
                                        formContext.getAttribute("pg_manager").setValue(lookupValue);
                                    }
                                },
                                function(error) {
                                    Xrm.Utility.alertDialog(error.message);
                                }
                            );
                        }
                    },
                    function(error) {
                        Xrm.Utility.alertDialog(error.message);
                    }
                );
            }
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}
///leave entity

function onloadLeave(context) {
    var formContext = context.getFormContext();
    var status = formContext.getAttribute("pg_leavestatus").getValue();
    var leavetypeControl = formContext.getAttribute("pg_leavetype").getValue();
    
    if (status != 1) {
        formContext.getControl("pg_leavestatus").setDisabled(true);
        formContext.getControl("pg_leavetype").setDisabled(true);
        formContext.getControl("pg_manager").setDisabled(true);
        formContext.getControl("pg_startdate").setDisabled(true);
        formContext.getControl("pg_enddate").setDisabled(true);
        formContext.getControl("pg_reasonforleave").setDisabled(true);
    }

    if (status === 140310000 && leavetypeControl === 7) {
        formContext.getControl("pg_startdate").setDisabled(false);
        validateLeaveDate(context);
        formContext.getAttribute("pg_startdate").addOnChange(validateLeaveDate);
    }
}

function validateLeaveDate(context) {
    var formContext = context.getFormContext();
    var startDate = formContext.getAttribute("pg_startdate").getValue();

    if (!startDate) {
        return;
    }

    var today = new Date();
    var currentUserGuid = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "").toLowerCase();

    Xrm.WebApi.online.retrieveMultipleRecords("pg_publicholidays", "?$select=pg_holidaydate,pg_name").then(
        function success(results) {
            for (var i = 0; i < results.entities.length; i++) {
                var pg_holidaydate = results.entities[i]["pg_holidaydate"];
                var pg_name = results.entities[i]["pg_name"];

                if (!pg_holidaydate || !pg_name) {
                    console.error("One of the expected fields 'pg_holidaydate' or 'pg_name' is missing in the pg_publicholidays entity.");
                    continue;
                }

                var holidayDate = new Date(pg_holidaydate);
                holidayDate.setHours(0, 0, 0, 0);
                var threeMonthsLaterHoliday = new Date(holidayDate);
                threeMonthsLaterHoliday.setMonth(threeMonthsLaterHoliday.getMonth() + 3);
                threeMonthsLaterHoliday.setHours(0, 0, 0, 0);

                if (pg_name === "Good Friday" && today >= holidayDate && today <= threeMonthsLaterHoliday) {
                    var formattedHolidayDate = holidayDate.toISOString().split('T')[0]; 

                    var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                    "<entity name='pg_leave'>" +
                    "<attribute name='pg_leaveid' />" +
                    "<attribute name='pg_name' />" +
                    "<filter type='and'>" +
                    "<condition attribute='pg_leavetype' operator='eq' value='7' />" +
                    "<condition attribute='ownerid' operator='eq-userid' />" +
                    "<condition attribute='createdon' operator='on-or-after' value='" + formattedHolidayDate + "' />" +
                    "<condition attribute='createdon' operator='on-or-before' value='" + threeMonthsLaterHoliday.toISOString().split('T')[0] + "' />" +
                    "</filter>" +
                    "</entity>" +
                    "</fetch>";
                    Xrm.WebApi.online.retrieveMultipleRecords("pg_leave", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
                        function success(leaveResults) {
                            if (leaveResults.entities.length === 1) {
                            if (startDate >= holidayDate && startDate <= threeMonthsLaterHoliday) {
                                formContext.getControl("pg_startdate").setNotification("Start date must be within the holiday range.", "GOOD_FRIDAY_DATE_ERROR");
                            } else {
                                formContext.getControl("pg_startdate").clearNotification("GOOD_FRIDAY_DATE_ERROR");
                            }
                        }
                    
                        },
                        function error(error) {
                            console.error(error.message);
                        }
                    );
                    return;
                }
            }
           
            formContext.getControl("pg_startdate").clearNotification("GOOD_FRIDAY_DATE_ERROR");
        },
        function error(error) {
            console.error(error.message);
        }
    );
}












function ResubmitBtn(primaryControl) {
    var formContext = primaryControl;       
        var stateCode = formContext.getAttribute("statecode").getValue();      
   var leavestatus =  formContext.getAttribute("pg_leavestatus").getValue();
  var LeaveType =  formContext.getAttribute("pg_leavetype").getValue();
        if(stateCode===0 && leavestatus===140310000 && LeaveType===7){
            return true;
        }
        else {
            return false;
        }
      }
      
      
      
      
      function ResubmitOnClickBTN(primaryControl) {
        var formContext = primaryControl;
    
        formContext.getAttribute("resolvecheck").setValue(1);
    
    
        formContext.data.entity.save().then(
            function success() {
                formContext.data.refresh(false);
            },
        );
    }
    
    
    



function ActivateBTN(primaryControl) {
    var formContext = primaryControl;
    if (formContext.getAttribute("statecode") && formContext.getAttribute("pg_leavestatus")) {    
        formContext.getAttribute("statecode").setValue(0);      
        formContext.getAttribute("pg_leavestatus").setValue(140310000);
        formContext.data.entity.save().then(
            function success() {            
                formContext.data.refresh(false);
            },         
        );
    } else {
       
    }
}










var holidayDate = new Date();
var threeMonthsLaterHoliday = new Date();
threeMonthsLaterHoliday.setMonth(threeMonthsLaterHoliday.getMonth() + 3);

function GoodFriday(context) { // onload
    try {
        var formContext = context.getFormContext();
        var leavetypeControl = formContext.getControl("pg_leavetype");
        var startDateControl = formContext.getControl("pg_startdate");
        var endDateControl = formContext.getControl("pg_enddate");
 
        if (!leavetypeControl || !startDateControl || !endDateControl) {
            return;
        }

        var goodFridayOption = { text: 'Floating Holiday', value: 7 };

    
 var pgName = formContext.getAttribute("pg_name").getValue(); 
        if (pgName && pgName.toLowerCase().includes("floating holiday")) {
            formContext.getAttribute("pg_leavetype").setValue(7);
            formContext.getControl("WebResource_GoodFriday").setVisible(true);
            return; 
        }

    leavetypeControl.removeOption(7); 
        var today = new Date();
        var currentUserGuid = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "").toLowerCase();

 
        Xrm.WebApi.online.retrieveMultipleRecords("pg_publicholidays", "?$select=pg_holidaydate,pg_name").then(
            function success(results) {
                for (var i = 0; i < results.entities.length; i++) {
                    var pg_holidaydate = results.entities[i]["pg_holidaydate"];
                    var pg_name = results.entities[i]["pg_name"];

                    if (!pg_holidaydate || !pg_name) {
                        console.error("One of the expected fields 'pg_holidaydate' or 'pg_name' is missing in the pg_publicholidays entity.");
                        continue;
                    }

                    var holidayDate = new Date(pg_holidaydate);
                    holidayDate.setHours(0, 0, 0, 0);
                    var threeMonthsLaterHoliday = new Date(holidayDate);
                    threeMonthsLaterHoliday.setMonth(threeMonthsLaterHoliday.getMonth() + 3);
                    threeMonthsLaterHoliday.setHours(0, 0, 0, 0);

                    if (pg_name === "Good Friday" && today >= holidayDate && today <= threeMonthsLaterHoliday) {
                        var formattedHolidayDate = holidayDate.toISOString().split('T')[0]; 

                      var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                            "<entity name='pg_leave'>" +
                            "<attribute name='pg_leaveid' />" +
                            "<attribute name='pg_name' />" +
                            "<filter type='and'>" +
                            "<condition attribute='pg_leavetype' operator='eq' value='7' />" +
                            "<condition attribute='ownerid' operator='eq-userid' />" +
                            "<condition attribute='createdon' operator='on-or-after' value='" + formattedHolidayDate + "' />" +
                            "<condition attribute='createdon' operator='on-or-before' value='" + threeMonthsLaterHoliday.toISOString().split('T')[0] + "' />" +
                            "</filter>" +
                            "</entity>" +
                            "</fetch>";

                        
                      Xrm.WebApi.online.retrieveMultipleRecords("pg_leave", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
                            function success(leaveResults) {
                                if (leaveResults.entities.length === 0) {
                                    if (!leavetypeControl.getOptions().some(function (option) {
                                        return option.value === 7;
                                    })) {
                                        leavetypeControl.addOption(goodFridayOption);
                                    }
                                    formContext.getControl("WebResource_GoodFriday").setVisible(true);

                                 formContext.getAttribute("pg_startdate").addOnChange(function() {
                                        validateGoodFridayLeave(holidayDate, threeMonthsLaterHoliday);
                                    });
                                    formContext.getAttribute("pg_enddate").addOnChange(function() {
                                        validateGoodFridayLeave(holidayDate, threeMonthsLaterHoliday);
                                    });
                                } else {
                                    if (leavetypeControl.getOptions().some(function (option) {
                                        return option.value === 7;
                                    })) {
                                        leavetypeControl.removeOption(7);
                                    }
                                    formContext.getControl("WebResource_GoodFriday").setVisible(false);
                                }
                            },
                            function (error) {
                                Xrm.Utility.alertDialog(error.message);
                            }
                        );
                    } else {
                        leavetypeControl.removeOption(7);
                        formContext.getControl("WebResource_GoodFriday").setVisible(false);
                    }
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
   
        function validateGoodFridayLeave(holidayDate, threeMonthsLaterHoliday) {
            var leavetype = formContext.getAttribute("pg_leavetype").getValue();
            if (leavetype !==7) {
                return; 
            }

            var startDate = formContext.getAttribute("pg_startdate").getValue();
            var endDate = formContext.getAttribute("pg_enddate").getValue();

            if (!startDate || !endDate) {
                return;
            }

            var startDateObj = new Date(startDate);
            var endDateObj = new Date(endDate);

            if (startDateObj.getTime() !==endDateObj.getTime()) {
                Xrm.Utility.alertDialog("Start date and End date must be the same day for Good Friday leave.");
                return;
            }

            if (startDateObj.getDay() === 6 || startDateObj.getDay() === 0) {
                Xrm.Utility.alertDialog("Good Friday leave cannot be on a Saturday or Sunday.");
                return;
            }

            if (!(startDateObj >= holidayDate && startDateObj <= threeMonthsLaterHoliday) ||
                !(endDateObj >= holidayDate && endDateObj <= threeMonthsLaterHoliday)) {
                Xrm.Utility.alertDialog("Start date and End date must be within the holiday range.");

                formContext.getControl("pg_startdate").setNotification("Start date must be within the holiday range.");
                formContext.getControl("pg_enddate").setNotification("End date must be within the holiday range.");
                return;
            }
            formContext.getControl("pg_startdate").clearNotification();
            formContext.getControl("pg_enddate").clearNotification();
        }

    } catch (err) {
        console.error(err);
    }
}











var holidayDate = new Date();
var threeMonthsLaterHoliday = new Date();
threeMonthsLaterHoliday.setMonth(threeMonthsLaterHoliday.getMonth() + 3);

function GoodFriday(context) { // onload
    try {
        var formContext = context.getFormContext();
        var leavetypeControl = formContext.getControl("pg_leavetype");
        var startDateControl = formContext.getControl("pg_startdate");
        var endDateControl = formContext.getControl("pg_enddate");

        if (!leavetypeControl || !startDateControl || !endDateControl) {
            return;
        }

        var leaveTypeValue = formContext.getAttribute("pg_leavetype").getValue();
        var goodFridayOption = { text: 'Floating Holiday', value: 7 };

        if (leaveTypeValue !==7) {
            leavetypeControl.removeOption(7); 
        }

        var today = new Date();
        var currentUserGuid = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "").toLowerCase();

        Xrm.WebApi.online.retrieveMultipleRecords("pg_publicholidays", "?$select=pg_holidaydate,pg_name").then(
            function success(results) {
                for (var i = 0; i < results.entities.length; i++) {
                    var pg_holidaydate = results.entities[i]["pg_holidaydate"];
                    var pg_name = results.entities[i]["pg_name"];

                    if (!pg_holidaydate || !pg_name) {
                        console.error("One of the expected fields 'pg_holidaydate' or 'pg_name' is missing in the pg_publicholidays entity.");
                        continue;
                    }

                    var holidayDate = new Date(pg_holidaydate);
                    holidayDate.setHours(0, 0, 0, 0);
                    var threeMonthsLaterHoliday = new Date(holidayDate);
                    threeMonthsLaterHoliday.setMonth(threeMonthsLaterHoliday.getMonth() + 3);
                    threeMonthsLaterHoliday.setHours(0, 0, 0, 0);

                    if (pg_name === "Good Friday" && today >= holidayDate && today <= threeMonthsLaterHoliday) {
                        var formattedHolidayDate = holidayDate.toISOString().split('T')[0]; 

                        var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
                            "<entity name='pg_leave'>" +
                            "<attribute name='pg_name' />" +
                            "<filter type='and'>" +
                            "<condition attribute='pg_leavetype' operator='eq' value='7' />" + 
                            "<condition attribute='createdon' operator='ge' value='" + formattedHolidayDate + "' />" +
                            "<condition attribute='createdon' operator='le' value='" + threeMonthsLaterHoliday.toISOString().split('T')[0] + "' />" +
                            "<condition attribute='ownerid' operator='eq' value='" + currentUserGuid + "' />" +
                            "</filter>" +
                            "</entity>" +
                            "</fetch>";

                        Xrm.WebApi.online.retrieveMultipleRecords("pg_leave", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
                            function success(leaveResults) {
                                if (leaveResults.entities.length === 0) {
                                    leavetypeControl.addOption(goodFridayOption);
                                    formContext.getControl("WebResource_GoodFriday").setVisible(true);
                                    if (leaveTypeValue !==7) {
                                        //  formContext.getAttribute("pg_leavetype").setValue(7);
                                    }
                                    formContext.getAttribute("pg_startdate").addOnChange(function() {
                                        validateGoodFridayLeave(holidayDate, threeMonthsLaterHoliday);
                                    });
                                    formContext.getAttribute("pg_enddate").addOnChange(function() {
                                        validateGoodFridayLeave(holidayDate, threeMonthsLaterHoliday);
                                    });
                                }

                            },
                            function (error) {
                                Xrm.Utility.alertDialog(error.message);
                            }
                        );
                    }
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );

        function validateGoodFridayLeave(holidayDate, threeMonthsLaterHoliday) {
            var leavetype = formContext.getAttribute("pg_leavetype").getValue();
            if (leavetype !==7) {
                return; 
            }

            var startDate = formContext.getAttribute("pg_startdate").getValue();
            var endDate = formContext.getAttribute("pg_enddate").getValue();

            if (!startDate || !endDate) {
              //  Xrm.Utility.alertDialog("Start date and End date must be set.");
                return;
            }

            var oneDay = 24 * 60 * 60 * 1000; 
            var startDateObj = new Date(startDate);
            var endDateObj = new Date(endDate);

            if (startDateObj.getTime() !==endDateObj.getTime()) {
               // Xrm.Utility.alertDialog("Start date and End date must be the same day for Good Friday leave.");
                return;
            }

            if (startDateObj.getDay() === 6 || startDateObj.getDay() === 0) {
                Xrm.Utility.alertDialog("Good Friday leave cannot be on a Saturday or Sunday.");
                return;
            }

            if (!(startDateObj >= holidayDate && startDateObj <= threeMonthsLaterHoliday) ||
                !(endDateObj >= holidayDate && endDateObj <= threeMonthsLaterHoliday)) {
                Xrm.Utility.alertDialog("Start date and End date must be within the holiday range.");

                formContext.getControl("pg_startdate").setNotification("Start date must be within the holiday range.");
                formContext.getControl("pg_enddate").setNotification("End date must be within the holiday range.");
                return;
            }
            formContext.getControl("pg_startdate").clearNotification();
            formContext.getControl("pg_enddate").clearNotification();
        }

    } catch (err) {
        console.error(err);
    }
}
























function GoodFriday(context) { // onload
  try {
      var formContext = context.getFormContext();
      var leavetypeControl = formContext.getControl("pg_leavetype");
      var startDateControl = formContext.getControl("pg_startdate");
      var endDateControl = formContext.getControl("pg_enddate");

      if (!leavetypeControl || !startDateControl || !endDateControl) {
          console.error("One or more specified fields do not exist on the form.");
          return;
      }

      var leaveTypeValue = formContext.getAttribute("pg_leavetype").getValue();
      var goodFridayOption = { text: 'Good Friday', value: 7 };

      // Check if the leave type is already "Good Friday"
      if (leaveTypeValue !==7) {
          leavetypeControl.removeOption(7); // Remove the option initially if not already selected
      }

      var today = new Date();
      var currentUserGuid = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "").toLowerCase();

      Xrm.WebApi.online.retrieveMultipleRecords("pg_publicholidays", "?$select=pg_holidaydate,pg_name").then(
          function success(results) {
              for (var i = 0; i < results.entities.length; i++) {
                  var pg_holidaydate = results.entities[i]["pg_holidaydate"];
                  var pg_name = results.entities[i]["pg_name"];

                  if (!pg_holidaydate || !pg_name) {
                      console.error("One of the expected fields 'pg_holidaydate' or 'pg_name' is missing in the pg_publicholidays entity.");
                      continue;
                  }

                  var holidayDate = new Date(pg_holidaydate);
                  var threeMonthsLaterHoliday = new Date(holidayDate);
                  threeMonthsLaterHoliday.setMonth(threeMonthsLaterHoliday.getMonth() + 3);

                  if (pg_name === "Good Friday" && today >= holidayDate && today <= threeMonthsLaterHoliday) {
                      var formattedHolidayDate = holidayDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

                      // Fetch "Good Friday" leave records for the current user within the date range
                      var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
                          "<entity name='pg_leave'>" +
                          "<attribute name='pg_name' />" +
                          "<filter type='and'>" +
                          "<condition attribute='pg_leavetype' operator='eq' value='7' />" + // Assuming value 7 corresponds to "Good Friday" leave type
                          "<condition attribute='createdon' operator='ge' value='" + formattedHolidayDate + "' />" +
                          "<condition attribute='createdon' operator='le' value='" + threeMonthsLaterHoliday.toISOString().split('T')[0] + "' />" +
                          "<condition attribute='ownerid' operator='eq' value='" + currentUserGuid + "' />" +
                          "</filter>" +
                          "</entity>" +
                          "</fetch>";

                      Xrm.WebApi.online.retrieveMultipleRecords("pg_leave", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
                          function success(leaveResults) {
                              if (leaveResults.entities.length === 0) {
                                  leavetypeControl.addOption(goodFridayOption);
                                  if (leaveTypeValue !==7) {
                                      formContext.getAttribute("pg_leavetype").setValue(7);
                                  }
                                  formContext.getAttribute("pg_startdate").addOnChange(validateGoodFridayLeave);
                                  formContext.getAttribute("pg_enddate").addOnChange(validateGoodFridayLeave);
                              }
                          },
                          function (error) {
                              Xrm.Utility.alertDialog(error.message);
                          }
                      );
                  }
              }
          },
          function (error) {
              Xrm.Utility.alertDialog(error.message);
          }
      );

      function validateGoodFridayLeave() {
          var leavetype = formContext.getAttribute("pg_leavetype").getValue();
          if (leavetype !==7) {
              return; // Exit if the leave type is not "Good Friday"
          }

          var startDate = formContext.getAttribute("pg_startdate").getValue();
          var endDate = formContext.getAttribute("pg_enddate").getValue();

          if (!startDate || !endDate) {
              Xrm.Utility.alertDialog("Start date and End date must be set.");
              return;
          }

          var oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
          var startDateObj = new Date(startDate);
          var endDateObj = new Date(endDate);

          if (startDateObj.getTime() !==endDateObj.getTime()) {
              Xrm.Utility.alertDialog("Start date and End date must be the same day for Good Friday leave.");
              return;
          }

          if (startDateObj.getDay() === 6 || startDateObj.getDay() === 0) {
              Xrm.Utility.alertDialog("Good Friday leave cannot be on a Saturday or Sunday.");
              return;
          }
      }

  } catch (err) {
      console.error(err);
  }
}












function GoodFriday(context) { // onload
  try {
      var formContext = context.getFormContext();
      var leavetype = formContext.getControl("pg_leavetype");

      // Remove "Good Friday" option if it exists
      leavetype.removeOption(7);

      var today = new Date();
      var threeMonthsLater = new Date();
      threeMonthsLater.setMonth(today.getMonth() + 3);

      var currentUserGuid = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "").toLowerCase();

      Xrm.WebApi.online.retrieveMultipleRecords("pg_publicholidays", "?$select=pg_holidaydate,pg_name").then(
          function success(results) {
              for (var i = 0; i < results.entities.length; i++) {
                  var pg_holidaydate = results.entities[i]["pg_holidaydate@OData.Community.Display.V1.FormattedValue"];
                  var pg_name = results.entities[i]["pg_name"];
                  var holidayDate = new Date(pg_holidaydate);

                  if (pg_name === "Good Friday" && holidayDate >= today && holidayDate <= threeMonthsLater) {
                      // Check if the user has taken leave on Good Friday
                      checkLeaveTaken(currentUserGuid, holidayDate).then(function (leaveTaken) {
                          if (!leaveTaken) {
                              leavetype.addOption({ text: 'Good Friday', value: 7 }); // add this option to field for next 3 months
                              formContext.getAttribute("pg_leavetype").setValue(7);
                          }
                      });
                      break; // Exit the loop if "Good Friday" is found within the next 3 months
                  }
              }
          },
          function (error) {
              Xrm.Utility.alertDialog(error.message);
          }
      );
  } catch (err) {
      console.error(err);
  }
}

// Function to check if the user has taken leave on Good Friday
function checkLeaveTaken(userId, holidayDate) {
  return new Promise(function (resolve, reject) {
      var formattedHolidayDate = holidayDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
      var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
          "<entity name='pg_leave'>" +
          "<attribute name='pg_name' />" +
          "<filter type='and'>" +
          "<condition attribute='pg_leavetype' operator='eq' value='7' />" + // Assuming value 7 corresponds to "Good Friday" leave type
          "<condition attribute='pg_fromdate' operator='on' value='" + formattedHolidayDate + "' />" +
          "<condition attribute='ownerid' operator='eq' value='" + userId + "' />" +
          "</filter>" +
          "</entity>" +
          "</fetch>";

      Xrm.WebApi.online.retrieveMultipleRecords("pg_leave", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
          function success(results) {
              resolve(results.entities.length > 0);
          },
          function (error) {
              reject(error.message);
          }
      );
  });
}



function previousyearsrestrict(context) {
  try {
      var formContext = context.getFormContext();
      var userSettings = Xrm.Utility.getGlobalContext().userSettings;
      var currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      var startDateAttr = formContext.getAttribute("pg_startdate");
      var endDateAttr = formContext.getAttribute("pg_enddate");

      var startdate = formContext.getAttribute("pg_startdate").getValue();
      var startdateyear = startdate.getFullYear() + "";
      var monthSt = (startdate.getMonth() + 1-1) + "";

      var currentyear = currentDate.getFullYear() + "";
      var currentmonth = (currentDate.getMonth() + 1-1) + "";


      var startDate = startDateAttr ? startDateAttr.getValue() : null;
      var endDate = endDateAttr ? endDateAttr.getValue() : null;
      var leavetype = formContext.getAttribute("pg_leavetype").getValue();
      if(leavetype===6){
      if (startDate && endDate) {
        
          if (startDate < currentDate || endDate < currentDate) {
              formContext.ui.setFormNotification("Not possible to select past dates for PTO", "ERROR", "validation");
              formContext.getControl("pg_startdate").setNotification("Please select future dates.", "validation");
              formContext.getControl("pg_enddate").setNotification("Please select future dates.", "validation");
          } else if (startDate === currentDate || endDate === currentDate) {
              formContext.ui.clearFormNotification("validation");
              formContext.getControl("pg_startdate").clearNotification("validation");
              formContext.getControl("pg_enddate").clearNotification("validation");
          } else {
              formContext.ui.clearFormNotification("validation");
              formContext.getControl("pg_startdate").clearNotification("validation");
              formContext.getControl("pg_enddate").clearNotification("validation");
          }
      }
  } 
  if(leavetype===1){
    if (startDate && endDate) {
      if(startdateyear===currentyear){  
      
        if (monthSt>=currentmonth-1) {   
            formContext.ui.setFormNotification("Not possible to select past dates for PTO", "ERROR", "validation");
            formContext.getControl("pg_startdate").setNotification("Please select future dates.", "validation");
            formContext.getControl("pg_enddate").setNotification("Please select future dates.", "validation");
        } else if (startDate === currentDate || endDate === currentDate) {
            formContext.ui.clearFormNotification("validation");
            formContext.getControl("pg_startdate").clearNotification("validation");
            formContext.getControl("pg_enddate").clearNotification("validation");
        } else {
            formContext.ui.clearFormNotification("validation");
            formContext.getControl("pg_startdate").clearNotification("validation");
            formContext.getControl("pg_enddate").clearNotification("validation");
        }
    }
  }
} 
}catch (err) {
      console.log(err.message);
  }
}




function previousyearsrestrict(context) {
  try {
      var formContext = context.getFormContext();
      var userSettings = Xrm.Utility.getGlobalContext().userSettings;
      var currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      var startDateAttr = formContext.getAttribute("pg_startdate");
      var endDateAttr = formContext.getAttribute("pg_enddate");

      var startDate = startDateAttr ? startDateAttr.getValue() : null;
      var endDate = endDateAttr ? endDateAttr.getValue() : null;
 var leavetype = formContext.getAttribute("pg_leavetype").getValue();
    if(leavetype===6){
      if (startDate && endDate) {
          if (startDate < currentDate || endDate < currentDate) {
              formContext.ui.setFormNotification("Not possible to select past dates for PTO", "ERROR", "validation");
              formContext.getControl("pg_startdate").setNotification("Please select future dates.", "validation");
              formContext.getControl("pg_enddate").setNotification("Please select future dates.", "validation");
          } else if (startDate === currentDate || endDate === currentDate) {
              formContext.ui.clearFormNotification("validation");
              formContext.getControl("pg_startdate").clearNotification("validation");
              formContext.getControl("pg_enddate").clearNotification("validation");
          } else {
              formContext.ui.clearFormNotification("validation");
              formContext.getControl("pg_startdate").clearNotification("validation");
              formContext.getControl("pg_enddate").clearNotification("validation");
          }
      }

}
else {
  formContext.ui.clearFormNotification("validation");
  formContext.getControl("pg_startdate").clearNotification("validation");
  formContext.getControl("pg_enddate").clearNotification("validation");
}
  } catch (err) {
      console.log(err.message);
  }
}











function CheckBirthDayPTO(context) {
  try {
      var formcontext = context.getFormContext();
      var userSettings = Xrm.Utility.getGlobalContext().userSettings;
      var currentuserid = userSettings.userId;
      var username = userSettings.userName;
      var leavetypevalue = formcontext.getAttribute("pg_leavetype").getValue();
      Xrm.WebApi.online.retrieveMultipleRecords("pg_leave", "?$select=pg_enddate,pg_startdate&$filter=_ownerid_value eq " + currentuserid + " and pg_leavetype eq 6").then(
          function success(results) {
              var currentDate = new Date();
              var Currentyear = currentDate.getFullYear();

              for (var i = 0; i < results.entities.length; i++) {
                  var pg_enddate = new Date(results.entities[i]["pg_enddate"]);
                  var pg_startdate = new Date(results.entities[i]["pg_startdate"]);

                  var yearSt = pg_startdate.getFullYear();
                  var yearEn = pg_enddate.getFullYear();
if(leavetypevalue===6){
//  if (yearSt === Currentyear || yearEn === Currentyear) {
if (yearSt <= Currentyear || yearEn <= Currentyear) {
      formcontext.ui.setFormNotification("Not possible to take Birthday PTO", "ERROR", "validation");
                       formcontext.getControl("pg_leavetype").setNotification("It's not your birthday month", "validation"); 
formcontext.getControl("pg_startdate").setDisabled(true);
                      }
  else{
       formcontext.ui.clearFormNotification("validation");
   formcontext.getControl("pg_leavetype").clearNotification("validation");
formcontext.getControl("pg_startdate").setDisabled(false);
  }
}
                 
else{
   formcontext.ui.clearFormNotification("validation");
formcontext.getControl("pg_leavetype").clearNotification("validation");
formcontext.getControl("pg_startdate").setDisabled(false);
}
              }
          },
          function (error) {
              Xrm.Utility.alertDialog(error.message);
          }
      );
  } catch (err) {
      console.log(err.message);
  }
}












function leave(context) {
  try {
      var formcontext = context.getFormContext();
      var owner = formcontext.getAttribute("ownerid");
      var ownerid = owner.getValue()[0].id;
      var ownername = owner.getValue()[0].name;

      var count = 0; // Initialize count variable
      var uniqueValues = {}; // Declare uniqueValues outside the loop
                      var remainingbalance = formcontext.getAttribute("pg_remainingbalance").getValue();
var pg_tentativebalance = formcontext.getAttribute("pg_tentativebalance").getValue();                                                                                                      
      Xrm.WebApi.online.retrieveMultipleRecords("pg_leave", "?$select=pg_datelengthnew,pg_remainingbalance&$filter=_createdby_value eq " + ownerid + " and (statuscode eq 140310006 or  statuscode eq 140310003) and  pg_leavetype eq 1").then(
          function success(results) {
              console.log(results);

              for (var i = 0; i < results.entities.length; i++) {
                  var result = results.entities[i];

                  // Columns
                  var pg_leaveid = result["pg_leaveid"]; // Guid
                  var pg_datelengthnew = result["pg_datelengthnew"]; // Decimal
                  var pg_datelengthnew_formatted = result["pg_datelengthnew@OData.Community.Display.V1.FormattedValue"];
           
var pg_remainingbalance = result["pg_remainingbalance"]; // Decimal
    var pg_remainingbalance_formatted = result["pg_remainingbalance@OData.Community.Display.V1.FormattedValue"];
                  // Check if the value is not null or undefined before adding to count
                  if (pg_datelengthnew != null && pg_datelengthnew != undefined) {
                      count += pg_datelengthnew;
formcontext.getAttribute("pg_tentativebalance").setValue(remainingbalance-count);   
                      // Check if the value is not already in the object
                      if (!uniqueValues[pg_datelengthnew]) {
                          uniqueValues[pg_datelengthnew] = true;
                      }
                  }
              }

              console.log("Total count of pg_datelengthnew values: " + count);
              console.log("Number of unique pg_datelengthnew values: " + Object.keys(uniqueValues).length);
          },
          function (error) {
              console.log(error.message);
          }
      );

  } catch (err) {
      console.log(err.message);
  }
}


function BirthDayStrtEndDiff(context) {
  try {	
    var formContext = context.getFormContext();
   //   formContext.getControl("pg_leavetype").removeOption(7);
    var startDate = formContext.getAttribute("pg_startdate").getValue();
    var endDate = formContext.getAttribute("pg_enddate").getValue();
    var leavetype = formContext.getAttribute("pg_leavetype").getValue();
    if(leavetype===6 || leavetype===7){
      formContext.getAttribute("pg_enddate").setValue(startDate);
      formContext.getControl("pg_enddate").setVisible(false);
//formContext.getControl("pg_enddate").setDisabled(true);
   /* if (startDate != null && endDate != null) {
      var difference = endDate - startDate;
      if (difference !==0) {
        alert("not possible to take leave more than 1day");
      }
    }
  }*/
}
else{
formContext.getControl("pg_enddate").setVisible(true);
}
} catch (err) {
  console.log(err.message);
}
}























function Termination(context) {
try {
  formcontext = context.getFormContext();
  if (formcontext.ui.getFormType() === 1) {
    var endDate = formcontext.getAttribute("pg_enddate").getValue();
    //Get Owner ID and get Worker Email
    var owner = formcontext.getAttribute("ownerid");
    var ownerid = owner.getValue()[0].id;
    var email = "";

    Xrm.WebApi.online.retrieveMultipleRecords("systemuser", "?$filter=systemuserid eq '" + ownerid + "'&$top=1").then(
      function success(results3) {
        for (var i = 0; i < results3.entities.length; i++) {
          var result = results3.entities[i];
          email = result["internalemailaddress"];
          Xrm.WebApi.online.retrieveMultipleRecords("pg_prideemployee", "?$filter=emailaddress eq '" + email + "'").then(
            function success(results2) {
              for (var i = 0; i < results2.entities.length; i++) {
                var result2record = results2.entities[i];
                var employee = [];
                employee[0] = {};
                employee[0].id = result2record["pg_prideemployeeid"];
                employee[0].name = result2record["pg_name"];
                employee[0].entityType = "pg_prideemployee";
                Xrm.WebApi.online.retrieveMultipleRecords("pg_supportticket", "?$filter=_pg_employee_value eq  '" + employee[0].id + "'").then(
                  function success(results) {
                    if (results && results.entities && results.entities.length > 0) {
                      var resultsdata = results.entities;
                      resultsdata.sort((x, y) => {
                        x = new Date(x.createdon),
                          y = new Date(y.createdon);
                        return x - y;
                      });
                      var pg_terminationdate = resultsdata[resultsdata.length - 1]["pg_terminationdate"];

                      var mydate = new Date(pg_terminationdate);
                      var year = mydate.getFullYear() + "";
                      var mon = (mydate.getMonth() + 1) + "";
                      var day = mydate.getDate() + "";
                      mydate = year + '-' + mon + '-' + day;
                      mydate = new Date(mydate.replace(/-/g, "/"));
                      var minusdate = new Date(pg_terminationdate);
                      minusdate.setDate(minusdate.getDate() - 15);
                      var yyyy = minusdate.getFullYear() + "";
                      var mm = (minusdate.getMonth() + 1) + "";

                      var dd = minusdate.getDate() + "";
                      var minusdate = new Date(pg_terminationdate);
                      minusdate.setDate(minusdate.getDate() - 15);
                      var minusdate = new Date(minusdate);
                      minusdate = yyyy + '-' + mm + '-' + dd;
                      minusdate = new Date(minusdate.replace(/-/g, "/"));
                      if (endDate >= minusdate && endDate <= mydate) {

                        formcontext.ui.setFormNotification("Due to PTO Policy, you cannot request PTO for this date. Please contact your manager", "ERROR", "validation");

                      }
                      else {
                        formcontext.ui.clearFormNotification("validation");

                      }
                    }
                  },
                  function (error) {
                    Xrm.Utility.alertDialog(error.message);
                  }
                );
              }
            },
            function (error) {
              Xrm.Utility.alertDialog(error.message);
            }
          );
        }
      },
      function (error) {
        Xrm.Utility.alertDialog(error.message);
      }
    );

  }
}
catch (err) {
}
}



function differenceindays(context) {  //onchangeenddateandstartdate and onload
debugger;
try {
  var formContext = context.getFormContext();
      formContext.getControl("pg_leavetype").removeOption(7);
  var startDate = formContext.getAttribute("pg_startdate").getValue();
  var endDate = formContext.getAttribute("pg_enddate").getValue();
  var leavetype = formContext.getControl("pg_leavetype");
  if (startDate != null && endDate != null) {
    var yearSt = startDate.getFullYear() + "";
    var monthSt = (startDate.getMonth() + 1) + "";
    var daySt = startDate.getDate() + "";
    var dateFormatSTART = monthSt + "/" + daySt + "/" + yearSt;
    var difference = endDate - startDate;
    if (difference === 0) {
      Xrm.WebApi.online.retrieveMultipleRecords("pg_publicholidays", "?$select=pg_holidaydate,pg_name").then(
        function success(results) {
          for (var i = 0; i < results.entities.length; i++) {
            var pg_holidaydate = results.entities[i]["pg_holidaydate@OData.Community.Display.V1.FormattedValue"];
            var pg_name = results.entities[i]["pg_name"];
            var holidayDate = pg_holidaydate.split("/");
            var yyyy = holidayDate[2];
            var mm = holidayDate[0];

            var dd = holidayDate[1];
            holidaydate = mm + '/' + dd + '/' + yyyy;

            if (pg_name === "Good Friday" && dateFormatSTART === holidaydate) {
       
              formContext.getControl("pg_leavetype").addOption({ text: 'Good Friday', value: 7 });
              formContext.getAttribute("pg_leavetype").setValue(7);
            }

            else {
            //  formContext.getAttribute("pg_leavetype").setValue(1);
              leavetype.removeOption(7);
            }
          }
        },
        function (error) {
          Xrm.Utility.alertDialog(error.message);
        }
      );
    }
     else {
 //  formContext.getAttribute("pg_leavetype").setValue(1);
      leavetype.removeOption(7);
    }
  }
}
catch (err) {
}
}








function birthday(context) {
try {
  formcontext = context.getFormContext();
  var userSettings = Xrm.Utility.getGlobalContext().userSettings;
  var owner = formcontext.getAttribute("ownerid");
  var ownerid = owner.getValue()[0].id;
  var email = "";
var leavetype = formcontext.getControl("pg_leavetype");
var leavetypevalue = formcontext.getAttribute("pg_leavetype").getValue();
var startDate = formcontext.getAttribute("pg_startdate").getValue();
var yearSt = startDate.getFullYear() + "";
var monthSt = (startDate.getMonth() + 1) + "";
if(leavetypevalue===6){


  Xrm.WebApi.online.retrieveMultipleRecords("systemuser", "?$filter=systemuserid eq '" + ownerid + "'&$top=1").then(
    function success(result) {
      for (var i = 0; i < result.entities.length; i++) {
        var user = result.entities[i];
        var email = user["internalemailaddress"];

        Xrm.WebApi.online.retrieveMultipleRecords("cdm_worker", "?$filter=cdm_primaryemailaddress eq '" + email + "'&$top=1").then(
          function success(results) {
            for (var i = 0; i < results.entities.length; i++) {
 var cdm_primaryemailaddress = results.entities[i]["cdm_primaryemailaddress"];
              var cdm_birthdate = results.entities[i]["cdm_birthdate"];
              var birthday = new Array();
              birthday[0] = new Object();
              birthday[0].id = cdm_birthdate;
              var birthday = new Date(cdm_birthdate);
              var year = birthday.getFullYear() + "";
              var month = (birthday.getMonth() + 1) + "";
              var day = birthday.getDate() + "";
              birthday = year + '-' + month + '-' + day;
              birthday = new Date(birthday.replace(/-/g, "/"));
              var Today = new Date();
              var yyyy = Today.getFullYear() + "";
              var mm = (Today.getMonth() + 1) + "";
              var dd = Today.getDate() + "";
              Today = yyyy + '-' + mm + '-' + dd;
              Today = new Date(Today.replace(/-/g, "/"));


              if (month === "1") {

                formcontext.getAttribute("pg_birthdaymonth").setValue("January");
              }
              if (month === "2") {

                formcontext.getAttribute("pg_birthdaymonth").setValue("Febuary");
              }
              if (month === "3") {

                formcontext.getAttribute("pg_birthdaymonth").setValue("March");
              } if (month === "4") {

                formcontext.getAttribute("pg_birthdaymonth").setValue("April");
              } if (month === "5") {

                formcontext.getAttribute("pg_birthdaymonth").setValue("May");
              } if (month === "6") {

                formcontext.getAttribute("pg_birthdaymonth").setValue("June");
              }
              if (month === "7") {
                formcontext.getAttribute("pg_birthdaymonth").setValue("July");
              }
              if (month === "8") {
                formcontext.getAttribute("pg_birthdaymonth").setValue("August");
              } if (month === "9") {

                formcontext.getAttribute("pg_birthdaymonth").setValue("September");
              } if (month === "10") {

                formcontext.getAttribute("pg_birthdaymonth").setValue("October");
              } if (month === "11") {

                formcontext.getAttribute("pg_birthdaymonth").setValue("November");
              } if (month === "12") {
                formcontext.getAttribute("pg_birthdaymonth").setValue("December");
              }
              if (month === mm || monthSt===month) {
                formcontext.getControl("WebResource_Birthday").setVisible(true);
                formcontext.getControl("pg_birthdaymonth").setVisible(true);
                formcontext.ui.clearFormNotification("validation");
formcontext.getControl("pg_leavetype").clearNotification("validation");
              }
               if(monthSt!==month){
                formcontext.ui.setFormNotification("It's not your birthday month, Please select a date from your birthday month", "ERROR", "validation");
formcontext.getControl("pg_leavetype").setNotification("It's not your birthday month", "validation");
              }
              if(monthSt===month){
                formcontext.ui.clearFormNotification("validation");
formcontext.getControl("pg_leavetype").clearNotification("validation");
              }
              else {
                formcontext.getControl("WebResource_Birthday").setVisible(false);
                formcontext.getControl("pg_birthdaymonth").setVisible(false);
formcontext.getAttribute("pg_birthdaymonth").setValue(null);
              //  leavetype.removeOption(6);
if(leavetypevalue===6){
//alert("It is not your birthday month");
}
              }
            }
          },
          function (error) {
            console.error(error);
            Xrm.Utility.alertDialog(error.message);
          }
        );
      }
    },
    function (error) {
      console.error(error);
      Xrm.Utility.alertDialog(error.message);
    }
  );
}
else{
 formcontext.ui.clearFormNotification("validation");
formcontext.getControl("pg_leavetype").clearNotification("validation");
}
}
catch (err) {
  console.error(err);
}
}







function setPEOnCreate(context) {
  //check if it is create form
  var formContext = context.getFormContext();

  if (formContext.ui.getFormType() === 1) {
      try {
          //Get Owner ID and get Worker Email
          var owner = formContext.getAttribute("ownerid");
          var ownerid = owner.getValue()[0].id;
          var email = "";

          Xrm.WebApi.online.retrieveMultipleRecords("systemuser", "?$filter=systemuserid eq " + ownerid + "&$top=1").then(
              function success(results) {
                  for (var i = 0; i < results.entities.length; i++) {
                      var result = results.entities[i];
                      email = result["internalemailaddress"];

                      Xrm.WebApi.online.retrieveMultipleRecords("pg_prideemployee", "?$filter=emailaddress eq '" + email + "'&$top=1").then(
                          function success(results2) {
                              for (var i = 0; i < results2.entities.length; i++) {
                                  var result2record = results2.entities[i];
                                  var employee = [];
                                  employee[0] = {};
                                  employee[0].id = result2record["pg_prideemployeeid"];
                                  employee[0].name = result2record["pg_name"];
                                  employee[0].entityType = "pg_prideemployee";
                                  formContext.getAttribute("pg_employee").setValue(employee);
formContext.getAttribute("pg_dojo").setValue(result2record["pg_dojo"]);

                                  var managerId = result2record["_pg_reportstoid_value"];

                                  Xrm.WebApi.online.retrieveRecord("pg_prideemployee", managerId, "?$select=pg_prideemployeeid,emailaddress,pg_name").then(
                                      function success(result) {
                                          var pg_name = result["pg_name"];

                                          var manager = [];
                                          manager[0] = {};
                                          manager[0].name = pg_name;
                                          manager[0].id = managerId;
                                          manager[0].entityType = "pg_prideemployee";
                                          formContext.getAttribute("pg_manager").setValue(manager);
                                      },
                                      function (error) {
                                          console.log(error.message);
                                      }
                                  );
                              }
                          },
                          function (error) {
                              console.log(error.message);
                          }
                      );

                  }
              },
              function (error) {
                  console.log(error.message);
              }
          );
      }
      catch {
      }

      formContext.getAttribute("pg_name").setValue("Leave");
  }

  else {
      formContext.getControl("pg_manager").setVisible(true);
  }

  if (formContext.ui.getFormType() != 1) {
      formContext.getControl("pg_datelengthtoggle").setDisabled(true);
  }
}

function onSaveUpdateName(context) {
  var formContext = context.getFormContext();

  //Get Type
  var typevalue = formContext.getAttribute("pg_leavetype").getValue();
  var type = "";
  if (typevalue === 1) {
      type = "Paid Time Off";
  }
  else if (typevalue === 2) {
      type = "Unpaid Time Off";
  }
  else if (typevalue === 3) {
      type = "Maternity/Paternity Leave";
  }
  else if (typevalue === 4) {
      type = "Medical";
  }
  else if (typevalue === 5) {
      type = "Misc Leave";
  }
else if (typevalue === 6) {
      type = "Birthday";
  }
  else if (typevalue === 7) {
    type = "Floating Holiday";
}
  var startdate = formContext.getAttribute("pg_startdate").getValue();
  var year = startdate.getFullYear();
  var month = startdate.getMonth() + 1;
  var day = startdate.getDate();
  var dateOnlyStart = month + "-" + day + "-" + year;

  var enddate = formContext.getAttribute("pg_enddate").getValue();
  year = enddate.getFullYear();
  month = enddate.getMonth() + 1;
  day = enddate.getDate();
  var dateOnlyEnd = month + "-" + day + "-" + year;

  if (dateOnlyStart != dateOnlyEnd) {
      var newName = type + " " + dateOnlyStart + " to " + dateOnlyEnd;
  }
  else {
      var newName = type + " " + dateOnlyStart
  }


  formContext.getAttribute("pg_name").setValue(newName);
  if (formContext.ui.getFormType() != 1) {
      formContext.getControl("pg_datelengthtoggle").setDisabled(true);
  }
}

function submit(primarycontrol) {
  var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Submit for Approval?", title: "Confirmation" };
  var confirmOptions = { height: 200, width: 300 };
  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
      if (success.confirmed) {
          primarycontrol.getAttribute("pg_leavestatus").setValue(2);
          primarycontrol.data.save().then(function () { primarycontrol.data.refresh(false); });
      }
  });
}

function enableSubmit(primarycontrol) {
  var formContext = primarycontrol;
  var usersettings = Xrm.Utility.getGlobalContext().userSettings;
  var leavestatus = formContext.getAttribute("pg_leavestatus").getValue();
  if ((usersettings.userId === formContext.getAttribute("ownerid").getValue()[0].id) && leavestatus === 1 && formContext.ui.getFormType() != 1) {
      return true;
  }
  else {
      return false;
  }
}

function onloadLeave(context) {
  var formContext = context.getFormContext();
  var status = formContext.getAttribute("pg_leavestatus").getValue();

  if (status != 1) {
      formContext.getControl("pg_leavestatus").setDisabled(true);
      formContext.getControl("pg_leavetype").setDisabled(true);
      formContext.getControl("pg_manager").setDisabled(true);
      formContext.getControl("pg_startdate").setDisabled(true);
      formContext.getControl("pg_enddate").setDisabled(true);
      formContext.getControl("pg_reasonforleave").setDisabled(true);
  }
}

function CalculateLength(context) {
  debugger;
  var formContext = context.getFormContext();
  var startDate = formContext.getAttribute("pg_startdate").getValue();
  //var FetchStart = startDate.toString();
  var yearSt = startDate.getFullYear() + "";
  var monthSt = (startDate.getMonth() + 1) + "";
  var daySt = startDate.getDate() + "";
  // var dateFormatSTART = yearSt + "-" + monthSt + "-" + daySt;
  var dateFormatSTART = monthSt + "-" + daySt + "-" + yearSt;

  var endDate = formContext.getAttribute("pg_enddate").getValue();
  var yearEn = endDate.getFullYear() + "";
  var monthEn = (endDate.getMonth() + 1) + "";
  var dayEn = endDate.getDate() + "";
  //  var dateFormatEND = yearEn + "-" + monthEn + "-" + dayEn;
  var dateFormatEND = monthEn + "-" + dayEn + "-" + yearEn;

  var globalContext = Xrm.Utility.getGlobalContext();
  var count = 0;
  let text = "";
  let curDate = +startDate;
  while (curDate <= +endDate) {
      const dayOfWeek = new Date(curDate).getDay();
      const isWeekend = (dayOfWeek === 6) || (dayOfWeek === 0);
      if (!isWeekend) {
          count++;
      }
      curDate = curDate + 24 * 60 * 60 * 1000
  }
  //return count;
  // window.parent.Xrm.Page.getAttribute("pg_datelength").setValue(count*8)
  text = count.toString();
  //var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' >" +
  //    "<entity name='pg_publicholidays'>" +
  //    "<attribute name='pg_name' />" +
  //    "<attribute name='pg_holidaydate' />" +
  //    "<order attribute='pg_name' descending='false' />" +
  //    "<filter type='and'>" +
  //    "<condition attribute='statecode' operator='eq' value='0' />" +
  //    "<condition attribute='pg_holidaydate' operator='on-or-after' value='" + FetchStart + "' />" +
  //    "<condition attribute='pg_holidaydate' operator='on-or-before' value='" + FetchEnd + "' />" +
  //    "</filter>" +
  //    "</entity>" +
  //    "</fetch>";
  // var encodedFetchXML = encodeURI(fetchXml);
  // //  var query = "/api/data/v9.1/pg_publicholidays?fetchXml=" + encodedFetchXML;
  // var query = "/api/data/v9.2/pg_publicholidayses?fetchXml=" + encodedFetchXML;
  //  var finalpathwithquery = globalContext.getClientUrl() + query;
  var finalpathwithquery = Xrm.Page.context.getClientUrl() + "/api/data/v9.2/pg_publicholidayses?$filter=(pg_holidaydate ge '" + dateFormatSTART + "' and pg_holidaydate le '" + dateFormatEND + "')";


  var data = null;
  var isAsync = false;

  var req = null;
  if (window.XMLHttpRequest) {
      req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
      req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
  }
  req.open("GET", finalpathwithquery, isAsync);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
  req.onreadystatechange = function () {
      if (this.readyState === 4) {
          req.onreadystatechange = null;
          if (this.status === 200) {
              var result = JSON.parse(this.response);
              data = result;
              var acclist = null;
              for (var i = 0; i < data.value.length; i++) {
                  acclist = acclist + " | " + data.value[i].name;
              }

              var keyCount = data.value.length;
              var lenTxt = keyCount.toString();
              var setValueLen = count - keyCount;
              if (dateFormatEND === dateFormatSTART) {
                  formContext.getControl("pg_datelengthtoggle").setVisible(true);
                  //    formContext.getAttribute("pg_datelengthnew").setValue(1)
              }
              else {
                  formContext.getControl("pg_datelengthtoggle").setVisible(false);
                  var result = setValueLen.toFixed(2);
                  var stringLen = setValueLen.toString();
                  //  formContext.getAttribute("pg_datelength").setValue(stringLen);
                  formContext.getAttribute("pg_datelengthnew").setValue(parseFloat(setValueLen)*8)
              }

          }
          else {
              Xrm.Utility.alertDialog(this.statusText);
          }
      }
  };
  req.send();
  // alert(stringLen);
}

function CalculateLengthOnchange(context) {
  debugger;
  var formContext = context.getFormContext();
  var startDate = formContext.getAttribute("pg_startdate").getValue();
  var endDate = formContext.getAttribute("pg_enddate").getValue();
var leavetypevalue = formContext.getAttribute("pg_leavetype").getValue();
  if (startDate != null) {
      var yearSt = startDate.getFullYear() + "";
      var monthSt = (startDate.getMonth() + 1) + "";
      var daySt = startDate.getDate() + "";
      // var dateFormatSTART = yearSt + "-" + monthSt + "-" + daySt;
      var dateFormatSTART = monthSt + "-" + daySt + "-" + yearSt;

      if (endDate != null) {
          var yearEn = endDate.getFullYear() + "";
          var monthEn = (endDate.getMonth() + 1) + "";
          var dayEn = endDate.getDate() + "";
          //  var dateFormatEND = yearEn + "-" + monthEn + "-" + dayEn;
          var dateFormatEND = monthEn + "-" + dayEn + "-" + yearEn;
if(leavetypevalue!==6){
          if (dateFormatSTART === dateFormatEND) {
              formContext.getControl("pg_datelengthtoggle").setVisible(true);
              formContext.getAttribute("pg_datelengthnew").setValue(8);

          }
          else if (endDate < startDate) {
              alert("Start date must be less than or equal to end date");
          }

          else {
              CalculateLength(context);
              formContext.getControl("pg_datelengthtoggle").setVisible(false);

          }
}
      }

  }
  else if (startDate === null && endDate != null) {

      alert("Select start date first");
      formContext.getControl("pg_datelengthtoggle").setVisible(false);
  }
  //var FetchStart = startDate.toString();




}

function GetLeaveBalance(context) {
  debugger;


  var formContext = context.getFormContext();
  var ownerId = formContext.getAttribute("ownerid").getValue()[0].id;
  //https://orgc13b2a56.crm.dynamics.com/api/data/v9.2/systemusers?$filter=systemuserid%20eq%20%27fa1cc3dc-bf83-eb11-b1ab-000d3a1bfbad%27
  // var finalpathwithquery = Xrm.Page.context.getClientUrl() + "/api/data/v9.2/pg_publicholidayses?$filter=(pg_holidaydate ge '" + dateFormatSTART + "' and pg_holidaydate le '" + dateFormatEND + "')";


  var GetOwnerId = Xrm.Page.context.getClientUrl() + "/api/data/v9.2/systemusers?$filter=systemuserid eq '" + ownerId + "'";
  var userEmail = "";
  var data = null;
  var isAsync = false;

  var req = null;
  if (window.XMLHttpRequest) {
      req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
      req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
  }
  req.open("GET", GetOwnerId, isAsync);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
  req.onreadystatechange = function () {
      if (this.readyState === 4) {
          req.onreadystatechange = null;
          if (this.status === 200) {
              var result = JSON.parse(this.response);
              data = result;
              var acclist = null;
              for (var i = 0; i < data.value.length; i++) {
                  acclist = acclist + " | " + data.value[i].internalemailaddress;
                  userEmail = data.value[0].internalemailaddress;
              }
          }
          else {
              Xrm.Utility.alertDialog(this.statusText);
          }
      }
      //  var finalpathwithquery = Xrm.Page.context.getClientUrl() + "/api/data/v9.2/cdm_workers";

  }
  req.send();

  var balance = "";
  var GetWorkerRecord = Xrm.Page.context.getClientUrl() + "/api/data/v9.2/cdm_workers?$filter=cdm_primaryemailaddress eq '" + userEmail + "'";
  if (window.XMLHttpRequest) {
      req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
      req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
  }
  req.open("GET", GetWorkerRecord, isAsync);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
  req.onreadystatechange = function () {
      if (this.readyState === 4) {
          req.onreadystatechange = null;
          if (this.status === 200) {
              var result = JSON.parse(this.response);
              data = result;
              var acclist = null;
              for (var i = 0; i < data.value.length; i++) {
                  acclist = acclist + " | " + data.value[i].pg_leavebalance;
                  balance = data.value[0].pg_leavebalance;
              }
              formContext.getAttribute("pg_remainingbalance").setValue(parseFloat(balance))
          }
      }
      else {
          Xrm.Utility.alertDialog(this.statusText);
      }
      //  var finalpathwithquery = Xrm.Page.context.getClientUrl() + "/api/data/v9.2/cdm_workers";

  }
  req.send();
}

function OnloadField(context) {
  debugger;
  var formContext = context.getFormContext();
  var startDate = formContext.getAttribute("pg_startdate").getValue();
  var endDate = formContext.getAttribute("pg_enddate").getValue();


  if (startDate != null && endDate != null) {

      var yearSt = startDate.getFullYear() + "";
      var monthSt = (startDate.getMonth() + 1) + "";
      var daySt = startDate.getDate() + "";
      // var dateFormatSTART = yearSt + "-" + monthSt + "-" + daySt;
      var dateFormatSTART = monthSt + "-" + daySt + "-" + yearSt;

      var yearEn = endDate.getFullYear() + "";
      var monthEn = (endDate.getMonth() + 1) + "";
      var dayEn = endDate.getDate() + "";
      //  var dateFormatEND = yearEn + "-" + monthEn + "-" + dayEn;
      var dateFormatEND = monthEn + "-" + dayEn + "-" + yearEn;
      if (dateFormatSTART === dateFormatEND) {
          formContext.getControl("pg_datelengthtoggle").setVisible(true);
          formContext.getAttribute("pg_datelengthnew").setValue(1);
      }
      else {
          formContext.getControl("pg_datelengthtoggle").setVisible(false);

      }
  }
  if (formContext.ui.getFormType() != 1) {
      formContext.getControl("pg_datelengthtoggle").setDisabled(true);
  }

}

function SelectstatusCancel(context) {
  debugger;
  var usersettings = Xrm.Utility.getGlobalContext().userSettings;
  var currentstage = context.getAttribute("statuscode").getValue();

   if(currentstage===140310006 || currentstage===140310003 || currentstage=== 140310005)//Approved or pending or unapproved
  {
      var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Are you sure you want to cancel this Leave?", title: "Confirmation" };
      var confirmOptions = { height: 200, width: 300 };
      Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
          if (success.confirmed) {
              context.getAttribute("statecode").setValue(1);
              context.getAttribute("statuscode").setValue(140310004);
              context.data.entity.save("saveandclose");
          }
      });
      return true;
  }
  else{

























      return false;
     // alert("Can not cancel request with Approved or inactive status.");
  }

 
}

function HalfDayToggle(context) {
  debugger;
  var formContext = context.getFormContext();
  var halfDayToggle = formContext.getAttribute("pg_datelengthtoggle").getValue();
  if (halfDayToggle === false) {
      formContext.getAttribute("pg_datelengthnew").setValue(8);
  }
  else {
      formContext.getAttribute("pg_datelengthnew").setValue(4);
  }


}


function StartdateCheck(context){
  var formContext = context.getFormContext();
  var currentstage = formContext.getAttribute("statuscode").getValue();
  if(currentstage===140310003 || currentstage=== 140310005)// pending or unapproved
  {
      var startDate = formContext.getAttribute("pg_startdate").getValue();
      var endDate = formContext.getAttribute("pg_enddate").getValue();
      var TodayDate = new Date;
      if (startDate != null && endDate != null) {
          if(startDate<TodayDate){
              formContext.ui.setFormNotification("Start date must be greater than or equal to Todays's date", "ERROR", "error1");
          }
          else{
              formContext.ui.clearFormNotification("error1");
          }
      }
  
  }
}
function Cancel(selectedcontrol) {
var confirmStrings = { cancelButtonLabel: "No", confirmButtonLabel: "Yes", text: "Are you sure you want to cancel the request(s)?", title: "Confirmation" };
  var confirmOptions = { height: 200, width: 300 };
  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
      if (success.confirmed) {
          try {
              for (var e of selectedcontrol) {
          var recordId = e.Id;
          var workflowId = "04425060-2C6F-479A-8333-D60DFEDDA2DE";
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
              if (this.readyState === 4 /* complete */) {
                  if (this.status === 204 || this.status === 200) {
                      try {
                          //primarycontrol.data.entity.save("saveandclose");
                      }
                      catch {
                          //primarycontrol.ui.close();
                      }
                  } else {
                      //error callback
                  }
              }
          };



       req.send(JSON.stringify(data));
      }
          }
          catch {
         }
          
      }
  });
  }

function showCancelonForm(primarycontrol) {
  var currentdate = new Date();
  var currentstate = primarycontrol.getAttribute("statecode").getValue();
  var currentstatus = primarycontrol.getAttribute("statuscode").getValue();
  var startDate = primarycontrol.getAttribute("pg_startdate").getValue();

  //Check if the current state and date
  if ((startDate >= currentdate) && (currentstatus != 140310004) && (currentstate === 0)) {
      return true;
  }
  else {
      return false;
  }
}


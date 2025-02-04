function checkAssignmentFieldIsNewOrExistingOne(context) {
    debugger;
    var formContext = context.getFormContext(); 
    var assignmentField = formContext.getAttribute("pg_assignmentid");
    
    if (assignmentField.getValue() != null) {
        var assignmentId = assignmentField.getValue()[0].id;

        Xrm.WebApi.online.retrieveMultipleRecords("pg_externalonboarding", "?$filter=_pg_assignmentid_value eq " + assignmentId).then(
            function success(results) {
                if (results.entities.length > 0) {
                  
                    formContext.getControl("pg_assignmentid").setNotification("This Assignment ID is already used in another record.", "assignmentIdNotification");
                } else {
                  
                    formContext.getControl("pg_assignmentid").clearNotification("assignmentIdNotification");
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}







function GetSubgridValues(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext(); 

    var currentRecordId = formContext.data.entity.getId().replace("{", "").replace("}", "");

    Xrm.WebApi.online.retrieveMultipleRecords("pg_pipobjectives", `?$select=pg_objectives,pg_targetdec&$filter=_pg_parent_value eq ${currentRecordId}`).then(
        function success(results) {
            if (results.entities.length > 0) {
                var objectivesExist = results.entities.some(function(entity) {
                    return entity.pg_objectives !== null && entity.pg_targetdec !==null;
                });

                if (objectivesExist) {
                    results.entities.forEach(function(record) {
                        var objectives = record.pg_objectives;
                        var target = record.pg_targetdec;

                        console.log("Objectives: " + objectives);
                        console.log("Target: " + target);
                    });
                } else {
                    console.log("Objectives or Target not found.");
                }
            }

            // Lock the subgrid fields
            lockSubgridFields(formContext);
        },
        function error(error) {
            console.error("Error retrieving records: " + error.message);
        }
    );
}


function lockSubgridFields(formContext) {
    var subgridControl = formContext.getControl("PIP_Objectives"); 

    if (subgridControl && subgridControl.getGrid()) {
        var gridRows = subgridControl.getGrid().getRows();

        gridRows.forEach(function (row) {
            var data = row.getData();
            var entity = data.getEntity();
            var attributes = entity.attributes;

            if (attributes.get("pg_objectives")) {
                attributes.get("pg_objectives").controls.forEach(function (control) {
                    control.setDisabled(true);
                });
            }

            if (attributes.get("pg_target")) {
                attributes.get("pg_target").controls.forEach(function (control) {
                    control.setDisabled(true);
                });
            }
        });
    }
}

function DisableFieldsOnStages() {
    var activeStage = Xrm.Page.data.process.getActiveStage();
    var selectedStage = Xrm.Page.data.process.getSelectedStage().getId();
    var activeProcess = Xrm.Page.data.process.getActiveProcess();
    var allStages = activeProcess.getStages();
    allStages.forEach(function (stage, stageIndex) {
        var stepsCollection = stage.getSteps();
        stepsCollection.forEach(function (step, stepIndex) {
            var attributeName = step.getAttribute();
            if (attributeName != "" || attributeName != null) {
                Xrm.Page.getControl("header_process_" + attributeName).setDisabled(true);
            }
        });
    });
 }
 
 
 
 Xrm.Page.data.process.addOnStageChange(stageChange);
 
 Xrm.Page.data.process.addOnStageChange(DisableFieldsOnStages);
 
 
 
 function ResubmitBtn(primaryControl) {  
     debugger;
     var formContext = primaryControl;
     var userSettings = Xrm.Utility.getGlobalContext().userSettings;
     var currentuserid = userSettings.userId;
    var ownerAttribute = formContext.getAttribute("ownerid").getValue()[0].id;
   
   
     if (currentuserid === ownerAttribute){
         return true;
     }
     else {
         return false;
     }
   }
 
 
 function BPFStageChange(context) {
     var formContext = context.getFormContext();
     formContext.data.process.addOnStageChange(TabChangesonBPFStage);
 
     // Initial call to handle the current stage when the form loads
     TabChangesonBPFStage(context);
 }
 
 function TabChangesonBPFStage(context) {
     debugger;
     var formContext = context.getFormContext();
     var activeStage = formContext.data.process.getActiveStage();
     var stageId = activeStage.getId();
 
     switch (stageId) {
         case "7a7ecca3-b092-40f7-9080-a7afc403b101":
             formContext.ui.tabs.get("tab_1").setFocus();
             formContext.data.refresh();
             break;
         case "fa593490-c472-4cf7-8e2f-aef7802c94ee":
             formContext.ui.tabs.get("tab_3").setFocus();
             formContext.data.refresh();
             break;
         case "231122ee-faab-4d13-8eec-d76e28841b90":
             formContext.ui.tabs.get("tab_2").setFocus();
             formContext.data.refresh();
             break;
         default:
             // Optionally handle any other stages or do nothing
             break;
     }
 }
 
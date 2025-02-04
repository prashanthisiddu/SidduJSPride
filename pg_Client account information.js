function disableFieldsIfNotOwner(executionContext) {//on form load
    var formContext = executionContext.getFormContext();

    var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
    var ownerId = formContext.getAttribute("ownerid").getValue();
    if (ownerId && ownerId[0].id !== currentUserId) {
      
        formContext.data.entity.attributes.forEach(function (attribute) {
            var control = formContext.getControl(attribute.getName());
            if (control) {
                control.setDisabled(true);
            }
        });
        formContext.ui.controls.forEach(function (control) {
            if (control.getName() === "footer_save") {
                control.setDisabled(true);
            }
        });
    }
}



function OnSubmitSendemail(primaryControl) {   // Main form function
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId();
    var confirmStrings = { text: "Submit Candidate Onboarding?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
    var confirmOptions = { height: 250, width: 300 };
  
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed) {
                debugger;
    var workflowId = "AC030324-F9DE-EF11-A730-000D3A542B5E"; // Workflow GUID
    var query = `workflows(${workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`;
    var data = { "EntityId": recordId };

    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/" + query, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

   
    req.onreadystatechange = function () {
        if (this.readyState === 4 /* complete */) {

            if (this.status === 200 || this.status === 204) {

                formContext.data.entity.save("saveandclose");

            } else {
                //error callback
            }

        }
    };
    req.send(JSON.stringify(data));
}
else {
}
})
}





function HideAccessTab(executionContext) {
    "use strict";
    var formContext = executionContext.getFormContext();
    var formType = formContext.ui.getFormType();
    var AccessTab = "tab_9";//Access team
    var LegalTab = "tab_11";//Legal
    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var PrideAdmin = false;

    userRoles.forEach(function (role) {
        if (role.name === "System Administrator") {
            PrideAdmin = true;
        }
    });
    if (PrideAdmin && formType === 2) {
        formContext.ui.tabs.get(AccessTab).setVisible(true);
        formContext.ui.tabs.get(LegalTab).setVisible(true);
    } else {
        formContext.ui.tabs.get(AccessTab).setVisible(false);
        formContext.ui.tabs.get(LegalTab).setVisible(false);
    }
}


var commentsUpdated = false;
function ClientAccountinfo(context) {
    "use strict";
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "pg_clientaccountinformationcomment_03e20",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).
        then(function () {
            context.data.refresh();
            //context.data.entity.save("saveandclose");
            context.data.entity.save();
            commentsUpdated = true;
            //context.ui.close();
        })
        .catch(console.error);
}

function ClientAccountInfo_save(context) {
    "use strict";
    var formContext = context.getFormContext();
    var formType = formContext.ui.getFormType();
    var eventArguments = context.getEventArgs();



    if (formType === 2 && commentsUpdated !== true) {
        if (eventArguments.getSaveMode() == 70 || eventArguments.getSaveMode() == 2) {
            eventArguments.preventDefault();
        }
        ClientAccountinfo(formContext);
    }
    if (commentsUpdated === true) {
        formContext.ui.close();
    }
}

function filterSubgrid(executionContext) {
    "use strict";
    var formContext = executionContext.getFormContext();
    var subgrid = formContext.getControl("ClientAccountInformation");

    if (!subgrid) {
        return;
    }

    var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");
    var fetchXml = `
    <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
        <entity name="pg_aifdocuments">
            <attribute name="pg_aifdocumentsid"/>
            <attribute name="pg_name"/>
            <attribute name="createdon"/>
            <order attribute="pg_name" descending="false"/>
            <filter type="or">              
                <filter type="and">
                    <condition attribute="ownerid" operator="eq" value="${userId}"/>
 <filter type="or"> 
                    <condition attribute="pg_visibilty" operator="eq" value="140310000"/> 
 <condition attribute="pg_visibilty" operator="eq" value="140310001"/> 
 </filter>   
                </filter>             
                <filter type="and">
                    <condition attribute="pg_visibilty" operator="ne" value="140310001"/> 
                </filter>
            </filter>
        </entity>
    </fetch>`;

    try {
        subgrid.setFilterXml(fetchXml);
        subgrid.refresh();
    } catch (error) {

    }
}

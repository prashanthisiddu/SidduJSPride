function filterSubgrid(executionContext) {
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












function filterSubgrid(executionContext) {
    var formContext = executionContext.getFormContext();
    var subgrid = formContext.getControl("ClientAccountInformation");

    if (!subgrid) {
        console.error("Subgrid not found on the form.");
        return;
    }

    // Get the current user's ID
    var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");

    // FetchXML Query
    var fetchXml = `
    <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
        <entity name="pg_aifdocuments">
            <attribute name="pg_aifdocumentsid"/>
            <attribute name="pg_name"/>
            <attribute name="createdon"/>
            <order attribute="pg_name" descending="false"/>
            <filter type="or">
                <!-- Allow record owner to see private records -->
                <filter type="and">
                    <condition attribute="ownerid" operator="eq" value="${userId}"/>
                     <filter type="or"> 
                    <condition attribute="pg_visibilty" operator="eq" value="140310000"/> 
 <condition attribute="pg_visibilty" operator="eq" value="140310001"/> 
 </filter>  
                </filter>
                <!-- Allow everyone to see public records -->
                <filter type="and">
                    <condition attribute="pg_visibilty" operator="ne" value="140310001"/> <!-- Replace with 'Private' option set value -->
                </filter>
            </filter>
        </entity>
    </fetch>`;

    // Attempt to filter the subgrid using FetchXML
    try {
        // If supported, apply the FetchXML directly to the subgrid
        subgrid.setFilterXml(fetchXml);

        subgrid.refresh(); // Refresh the subgrid to apply the filter
        console.log("FetchXML filter applied to the subgrid.");
    } catch (error) {
        console.error("Error applying filter to subgrid:", error);
    }
}






///or//


function filterSubgrid(executionContext) {
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
                    <condition attribute="pg_visibilty" operator="eq" value="140310000"/> //public
 <condition attribute="pg_visibilty" operator="eq" value="140310001"/> //private
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



//for teamsmembers//


async function filterSubgrid(executionContext) {
    try {
        var formContext = executionContext.getFormContext();

        // Get logged-in user ID and email
        var loggedinUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");
        var userResult = await Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress");
        var loggedInUserEmail = userResult["internalemailaddress"];

        // Hardcoded team ID
        var teamId = "11e576cb-3bec-ee11-904c-002248333ee8";

        // Retrieve team members
        var teamResult = await Xrm.WebApi.online.retrieveRecord(
            "team",
            teamId,
            "?$expand=teammembership_association($select=internalemailaddress)"
        );
        var teamMembers = teamResult.teammembership_association;

        // Check if logged-in user is a team member
        var isTeamMember = teamMembers.some(member => member.internalemailaddress === loggedInUserEmail);

        // Retrieve the subgrid control
        var subgrid = formContext.getControl("ClientAccountInformation");
        if (!subgrid) {
            console.warn("Subgrid 'ClientAccountInformation' not found on the form.");
            return;
        }

        // Prepare FetchXML query
        var fetchXml = `
        <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
            <entity name="pg_aifdocuments">
                <attribute name="pg_aifdocumentsid"/>
                <attribute name="pg_name"/>
                <attribute name="createdon"/>
                <order attribute="pg_name" descending="false"/>
                <filter type="or">
                    <!-- Condition for logged-in user as the owner -->
                    <filter type="and">
                        <condition attribute="ownerid" operator="eq" value="${loggedinUserId}"/>
                        <filter type="or"> 
                            <condition attribute="pg_visibilty" operator="eq" value="140310000"/> <!-- Public -->
                            <condition attribute="pg_visibilty" operator="eq" value="140310001"/> <!-- Private -->
                        </filter>
                    </filter>
                    <!-- Condition for team members (if logged-in user belongs to the team) -->
                    ${
                        isTeamMember
                            ? `
                    <filter type="and">
                        <condition attribute="pg_visibilty" operator="eq" value="140310001"/> <!-- Public for team -->
                    </filter>`
                            : ""
                    }
                    <!-- Global visibility condition -->
                    <filter type="and">
                        <condition attribute="pg_visibilty" operator="ne" value="140310001"/> 
                    </filter>
                </filter>
            </entity>
        </fetch>`;

        // Apply the filter and refresh the subgrid
        subgrid.setFilterXml(fetchXml);
        subgrid.refresh();
    } catch (error) {
        console.error("Error in filterSubgrid function:", error.message || error);
    }
}







//show hide field based on loggin user , check loggin user is a teammember or not

async function filterSubgrid(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get logged-in user ID and email
    var loggedinUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");
    var userResult = await Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress");
    var loggedInUserEmail = userResult["internalemailaddress"];

    // Hardcoded team ID
    var teamId = "11e576cb-3bec-ee11-904c-002248333ee8";

    // Retrieve team members
    var teamResult = await Xrm.WebApi.online.retrieveRecord(
        "team",
        teamId,
        "?$expand=teammembership_association($select=internalemailaddress)"
    );
    var teamMembers = teamResult.teammembership_association;

    // Check if logged-in user is a team member
    var isTeamMember = teamMembers.some(member => member.internalemailaddress === loggedInUserEmail);

    // Show or hide controls based on team membership
    if (isTeamMember) {
        formContext.getControl("pg_employeename").setVisible(true);
        formContext.getControl("pg_dojo").setVisible(true);
        formContext.getControl("pg_emailaddress").setVisible(true);
        formContext.getControl("pg_personalnumber").setVisible(true);
    } else {
        formContext.getControl("pg_employeename").setVisible(false);
        formContext.getControl("pg_dojo").setVisible(false);
        formContext.getControl("pg_emailaddress").setVisible(false);
        formContext.getControl("pg_personalnumber").setVisible(false);
    }
}

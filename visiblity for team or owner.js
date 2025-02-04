async function filterSubgrid(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var loggedinUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");
        var userSettings = Xrm.Utility.getGlobalContext().userSettings;
        var currentuserid = userSettings.userId;
        var employeeId = "{5107BBC4-568B-ED11-81AC-6045BDA8AA87}"; 
        var userResult = await Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress");
        var loggedInUserEmail = userResult["internalemailaddress"];
        var teamId = "11e576cb-3bec-ee11-904c-002248333ee8";
        var teamResult = await Xrm.WebApi.online.retrieveRecord(
            "team",
            teamId,
            "?$expand=teammembership_association($select=internalemailaddress)"
        );
        var teamMembers = teamResult.teammembership_association;
        var isTeamMember = teamMembers.some(member => member.internalemailaddress === loggedInUserEmail);
        
        if (currentuserid === employeeId || isTeamMember) {
            formContext.getControl("pg_employeename").setVisible(true);
            formContext.getControl("pg_dojo").setVisible(true);
            formContext.getControl("pg_personalnumber").setVisible(true);
        }
    } catch (error) {
        console.error("An error occurred in filterSubgrid:", error);
    }
}



async function filterSubgrid(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var loggedinUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");
        var userResult = await Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress");
        var loggedInUserEmail = userResult["internalemailaddress"];
        var teamId = "11e576cb-3bec-ee11-904c-002248333ee8";
        var teamResult = await Xrm.WebApi.online.retrieveRecord(
            "team",
            teamId,
            "?$expand=teammembership_association($select=internalemailaddress)"
        );
        var teamMembers = teamResult.teammembership_association;
        var isTeamMember = teamMembers.some(member => member.internalemailaddress === loggedInUserEmail);
        var subgrid = formContext.getControl("ClientAccountInformation");
        if (!subgrid) {
            return;
        }

        var fetchXml = `
        <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
            <entity name="pg_aifdocuments">
                <attribute name="pg_aifdocumentsid"/>
                <attribute name="pg_name"/>
                <attribute name="createdon"/>
                <order attribute="pg_name" descending="false"/>
                <filter type="or">
                   
                    <filter type="and">
                        <condition attribute="ownerid" operator="eq" value="${loggedinUserId}"/>
                        <filter type="or"> 
                            <condition attribute="pg_visibilty" operator="eq" value="140310000"/>
                            <condition attribute="pg_visibilty" operator="eq" value="140310001"/> 
                        </filter>
                    </filter>
                    ${
                        isTeamMember
                            ? `
                    <filter type="and">
                        <condition attribute="pg_visibilty" operator="eq" value="140310001"/> <!-- Public for team -->
                    </filter>`
                            : ""
                    }
                
                    <filter type="and">
                        <condition attribute="pg_visibilty" operator="ne" value="140310001"/> 
                    </filter>
                </filter>
            </entity>
        </fetch>`;       
        subgrid.setFilterXml(fetchXml);
        subgrid.refresh();
    } catch (error) {
    }
}

function ResolveOff(context) {//internal queries
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "pg_resolveoff_3dc51",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).then(console.log).catch(console.error);
}


function AuditReactivate(context) {//internal queries
    Xrm.Navigation.navigateTo({
        pageType: "custom",
        name: "crc22_auditresolve_b0fcb",
        entityName: context.data.entity.getEntityName(),
        recordId: context.data.entity.getId()
    }, {
        target: 2,
        width: 600,
        height: 300
    }

    ).then(console.log).catch(console.error);
}







function ResolveOff(context) {
    var pageInput = {
        pageType: "custom",
        name: "pg_resolveoff_3dc51",
        recordId: Xrm.Page.data.entity.getId().replace(/[{}]/g, ""),
    };

    var navigationOptions = {
        target: 2,
        position: 2,
        width: { value: 500, unit: "px" }
    };

    Xrm.Navigation.navigateTo(pageInput, navigationOptions)
        .then(
            function () {
                // Called when the page opens successfully
            }
        )
        .catch(
            function (error) {
                // Handle the error
            }
        );
}

function enableSend(primarycontrol) {
    var formContext = primarycontrol;
    var usersettings = Xrm.Utility.getGlobalContext().userSettings;
    if ((!usersettings.userId === formContext.getAttribute("ownerid").getValue()[0].id)) {
        return true;
    }
    else {
        return false;
    }
}
/*function ResolveOff(context) {
    var pageInput = {
        pageType: "custom",
        name: "pg_resolveoff_3dc51",
        recordId: Xrm.Page.data.entity.getId().replace(/[{}]/g, ""),
    };

    var navigationOptions = {
        target: 2,
        position: 2,
        width: { value: 500, unit: "px" }
    };

    Xrm.Navigation.navigateTo(pageInput, navigationOptions)
        .then(
            function () {
                // Called when the page opens successfully
            }
        )
        .catch(
            function (error) {
                // Handle the error
            }
        );
}
*/

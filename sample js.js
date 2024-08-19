

function ToGetlogginusersecurityroles() {
    var roles = Xrm.Utility.getGlobalContext().userSettings.roles;
 
    if (roles === null) return false;
 
    var hasRole = false;
    roles.forEach(function (item) {
        if (item.name.toLowerCase() === "cs manager" || item.name.toLowerCase() === "cs administrator") {
            hasRole = true;
        }
    });
 
    return hasRole;
}












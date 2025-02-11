// ******************************************************************
// Display Rule Function
// ******************************************************************
// This function returns true if the form is modified and the current
// user has a role of "salesperson". This is used as a custom display rule.
function SecurityChecksendemailonModify(executionContext) {//on ribbon button enable trigger
    // Retrieve the form context from the execution context.
    var formContext = (executionContext && executionContext.getFormContext)
                        ? executionContext.getFormContext()
                        : Xrm.Page; // Fallback for legacy forms

    // Optionally, try to retrieve the event source (only available on field change).
    var eventSource = (executionContext.getEventSource && typeof executionContext.getEventSource === "function")
                        ? executionContext.getEventSource()
                        : null;
    if (eventSource && typeof eventSource.getName === "function") {
        console.log("SecurityChecksendemailonModify triggered on field: " + eventSource.getName());
    } else {
        console.log("SecurityChecksendemailonModify triggered (no specific field available).");
    }

    // Ensure that form data and entity are available.
    if (formContext.data && formContext.data.entity) {
        // Check if the form has been modified.
        var isModified = formContext.data.entity.getIsDirty();
        console.log("Form is modified: " + isModified);

        // Retrieve the current user's roles using the modern API.
        var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles.getAll();
        console.log("User Roles:", userRoles.map(function(role) {
            return role.name;
        }));

        // Return true if the form is modified and one of the roles is "salesperson"
        // (case-insensitive). Otherwise, return false.
        if (isModified && userRoles.some(function(role) {
            return role.name.toLowerCase() === "salesperson";
        })) {
            console.log("Conditions met: Salesperson and form modified.");
            return true;
        }
    }
    return false;
}

// ******************************************************************
// OnChange Handler Function for Field Changes
// ******************************************************************
// This function is attached to every field's OnChange event. It logs the
// field change and forces a ribbon refresh so that the display rules re-run.
function onFieldChange(executionContext) {
    // Try to retrieve the field (attribute) that triggered the event.
    var eventSource = (executionContext.getEventSource && typeof executionContext.getEventSource === "function")
                        ? executionContext.getEventSource()
                        : null;
    if (eventSource && typeof eventSource.getName === "function") {
        console.log("Field changed: " + eventSource.getName());
    } else {
        console.log("Field changed (event source not available).");
    }

    // Refresh the ribbon so that display rules (like our custom rule) are re-evaluated.
    if (Xrm.Page && Xrm.Page.ui && Xrm.Page.ui.refreshRibbon) {
        console.log("Refreshing Ribbon...");
        Xrm.Page.ui.refreshRibbon();
    } else {
        console.error("Ribbon refresh function is not available.");
    }
}

// ******************************************************************
// Attach OnChange Handlers to All Attributes on the Form
// ******************************************************************
// This function should be registered on the form's OnLoad event. It loops
// through each attribute on the form and attaches the onFieldChange handler.
function attachOnChangeEvents(executionContext) {//onload trigger form 
    console.log("attachOnChangeEvents is running...");
    var formContext = executionContext.getFormContext();

    // Ensure the form context contains data, an entity, and attributes.
    if (formContext.data && formContext.data.entity && formContext.data.entity.attributes) {
        // Loop through each attribute and attach the onFieldChange handler.
        formContext.data.entity.attributes.forEach(function(attribute) {
            console.log("Attaching OnChange event to attribute: " + attribute.getName());
            attribute.addOnChange(onFieldChange);
        });

        // Optionally, invoke the display rule function once on load to initialize logic.
        // (Note: On form load, the execution context may not represent a field change.)
        SecurityChecksendemailonModify(executionContext);
    } else {
        console.error("Form context data, entity, or attributes are not available. Ensure you're on a valid entity form.");
    }
}





















function onButtonClick(primaryControl) {
  
    var formContext = primaryControl;

    // Configure the alert message details.
    var alertStrings = {
        confirmButtonLabel: "OK",
        text: "Record will be saved and closed.",
        title: "Notification"
    };

    // Optionally, configure the alert dialog options.
    var alertOptions = {
        height: 120,
        width: 260
    };

    // Open the alert dialog.
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function () {
            // After the alert is dismissed, save and close the form.
            formContext.ui.close();
        },
        function (error) {
            console.error("Error displaying alert dialog: " + error.message);
        }
    );
}
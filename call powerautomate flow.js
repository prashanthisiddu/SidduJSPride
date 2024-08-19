function resolveifok(primaryControl) {
    // mainform
    debugger;
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId();
    var confirmStrings = { text: "Confirm to Resolve?", confirmButtonLabel: "Ok", cancelButtonLabel: "Cancel" };
    var confirmOptions = { height: 250, width: 300 };

    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed) {
                var req = new XMLHttpRequest();
                var url = "https://prod-114.westus.logic.azure.com:443/workflows/7ea4bb1c556240cba9df9bbf65f4fa55/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ujEr1u65X1Tz-L7Cv29IXE-qQPY_HRefa7hkGOETFds";

                req.open("POST", url, true);
                req.setRequestHeader('Content-Type', 'application/json');

                req.onreadystatechange = function () {
                    if (req.readyState === 4) {
                        if (req.status === 200) {
                            formContext.data.entity.save("saveandclose");
                            console.log("Power Automate flow executed successfully");
                        } else {
                            console.error("Error executing Power Automate flow. Status code: " + req.status);
                        }
                    }
                };
                req.send();
            } else {
               
            }
        }
    );
}











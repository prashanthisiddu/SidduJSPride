function updateProgressBar(executionContext) {//html progress bar js
    var formContext = executionContext.getFormContext();
    var progressValue = formContext.getAttribute("pg_progress").getValue();

    // Access the Web Resource control
    var progressBarControl = formContext.getControl("WebResource_progressbar");

    if (progressValue >= 0 && progressValue <= 100) {
        // Pass the value to the embedded web resource
        if (progressBarControl) {
            var contentWindow = progressBarControl.getContentWindow();
            contentWindow.then(function (win) {
                // Call a function in the web resource to update the progress bar
                win.updateProgress(progressValue);
            });
        }
    } else {
        console.error("Invalid progress value");
    }
}




function updateProgress(executionContext) {//pcf gallary control js
        // Get the form context
        var formContext = executionContext.getFormContext();
   // var progressbar = formContext.getAttribute("pg_progressbar").getValue();
    var progress = formContext.getAttribute("pg_progress").getValue();

    // Validate the value to ensure it is between 0 and 100
    if (progress >= 0 && progress <= 100) {
        formContext.getAttribute("pg_progressbar").setValue(progress);
    } else {
      
    }
}
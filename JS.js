

//ex for promt///
//var applicationName = prompt("Enter application name");

if (applicationName !=== null) {
    // The user clicked OK in the prompt
    console.log("Entered application name: " + applicationName);

    // Now you can use the entered application name in your code
    var data = {
        "pg_applicationtype": "140310000",
        "pg_description": "This is the description of the sample account",
        "pg_applicationname": applicationName // Assuming pg_applicationname is the field you want to populate
    }

    Xrm.WebApi.createRecord("pg_changemanagement", data).then(
        function success(result) {
            console.log("Account created with ID: " + result.id);
            // perform operations on record creation
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
} else {
    // The user clicked Cancel in the prompt
    console.log("User cancelled the prompt");
}

/*
https://community.dynamics.com/crm/f/microsoft-dynamics-crm-forum/267468/how-to-get-the-current-stage-id-and-stage-name

var stageid="356ecd08-43c3-4585-ae94-6053984bc0a9"
*/
function formonload()
{
Xrm.Page.data.process.addOnStageChange(getStage); // Trigger the function when move to next stage.
var stageid="356ecd08-43c3-4585-ae94-6053984bc0a9"
formContext.getControl('stageid').setVisible(true);
}

function getStage()
{
var activeStage = Xrm.Page.data.process.getActiveStage();
var stageId = activeStage.getId();
var stagename = activeStage.getName();
}






function onChange() {

    var selectedOptionSet = Xrm.Page.getAttribute("new_opportunitystage");
    //var Id = Xrm.Page.data.entity.getId();
    //alert(Xrm.Page.getAttribute(‘stageid’).getValue());
    switch (selectedOptionSet.getValue()) {
        case 1:
            //Guid for new stage set here

            Xrm.Page.getAttribute("stageid").setValue("3f203c1e-64ae-436e-a41b-464667b57ce8");
            break;
        case 2:

            //Guid for Open stage set here
            Xrm.Page.getAttribute("stageid").setValue("5ecba2d2-4e37-a259-577a-6a0c34b5c537");
            break;
        case 3:

            //Guid for Close stage set here
            Xrm.Page.getAttribute("stageid").setValue("6d49bc00-7343-eead-e2c6-17d28e683219");
            break;
        default:
            break;
    }

    //Call Entity save
    Xrm.Page.data.entity.save();
}


















// define the data to create new account
var data =
    {
        "pg_applicationtype": "140310000",
     
        "pg_description": "This is the description of the sample account",
        
    }

// create account record
Xrm.WebApi.createRecord("pg_changemanagement", data).then(
    function success(result) {
        console.log("Account created with ID: " + result.id);
        // perform operations on record creation
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);


// define the data to update a record
var data =
    {
        "name": "Updated Sample Account ",
        "creditonhold": true,
        "address1_latitude": 47.639583,
        "description": "This is the updated description of the sample account",
        "revenue": 6000000,
        "accountcategorycode": 2
    }
// update the record
Xrm.WebApi.updateRecord("account", "5531d753-95af-e711-a94e-000d3a11e605", data).then(
    function success(result) {
        console.log("Account updated");
        // perform operations on record update
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);




Xrm.WebApi.deleteRecord("pg_changemanagement", "276e8720-f05e-ee11-be6f-000d3a5755d3").then(
    function success(result) {
        console.log("Account deleted");
        // perform operations on record deletion
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);



Xrm.WebApi.retrieveRecord("pg_changemanagement", "276e8720-f05e-ee11-be6f-000d3a5755d3", "?$select=pg_applicationtype,pg_description").then(
    function success(result) {
        console.log("Retrieved values: Name: " + result.pg_applicationtype + ", Revenue: " + result.pg_description);
        // perform operations on record retrieval
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);


//Basic retrieve multiple
Xrm.WebApi.retrieveMultipleRecords("pg_changemanagement", "?$select=pg_applicationtype&$top=3").then(
    function success(result) {
        for (var i = 0; i < result.entities.length; i++) {
            console.log(result.entities[i]);
        }                    
        // perform additional operations on retrieved records
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);


//Basic retrieve multiple with FetchXML
var fetchXml = "?fetchXml=<fetch mapping='logical'><entity name='account'><attribute name='accountid'/><attribute name='name'/></entity></fetch>";

Xrm.WebApi.retrieveMultipleRecords("account", fetchXml).then(
    function success(result) {
        for (var i = 0; i < result.entities.length; i++) {
            console.log(result.entities[i]);
        }                    

        // perform additional operations on retrieved records
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);


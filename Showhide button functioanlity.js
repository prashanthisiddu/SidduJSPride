async function ApprovalShowHide(primarycontrol) {
  try {
      const formContext = primarycontrol;
      const stateCode = formContext.getAttribute("statecode")?.getValue();  
      const userSettings = Xrm.Utility.getGlobalContext().userSettings;
      const currentuserid = userSettings.userId; // Already a string
      const manager = formContext.getAttribute("pg_manager");

      // Check if manager attribute exists and is populated
      if (currentuserid && manager && manager.getValue()) {
          const ownerIdFormatted = currentuserid.replace(/{|}/g, "").toLowerCase();
          const managerIdFormatted = manager.getValue()[0]?.id.replace(/{|}/g, "").toLowerCase();

          // Fetch email addresses for both logged-in user and manager
          const emailQuery = `systemusers?$select=internalemailaddress&$filter=systemuserid eq '${ownerIdFormatted}'`;
          const pgEmailResult = await getAttributeValue(emailQuery);
          const pgEmail = pgEmailResult?.value?.[0]?.internalemailaddress; // Safe access
          
          const prideGlobalQuery = `pg_prideemployees?$select=emailaddress&$filter=pg_prideemployeeid eq '${managerIdFormatted}'`;
          const prideGlobalEmailResult = await getAttributeValue(prideGlobalQuery);
          const prideGlobalEmail = prideGlobalEmailResult?.value?.[0]?.emailaddress; // Safe access
          
          // Ensure email values are available before comparison
          if (pgEmail && prideGlobalEmail && pgEmail === prideGlobalEmail && stateCode === 0) {
              return true; // Conditions met
          }
      } else {
          throw new Error("Manager data is missing or invalid.");
      }
  } catch (error) {
      console.error("Error in ApprovalShowHide function: ", error);
  }
  return false; // Default return if conditions not met or an error occurs
}


async function getAttributeValue(query) {
  const url = `${Xrm.Page.context.getClientUrl()}/api/data/v9.1/${query}`;
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0",
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Prefer": 'odata.include-annotations="*"',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error in getAttributeValue:", error);
    throw error;
  }
}

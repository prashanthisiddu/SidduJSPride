async function ApprovalShowHide(context) {
  try {
    const formContext = context.getFormContext();
    const owner = formContext.getAttribute("ownerid");
    const manager = formContext.getAttribute("pg_manager");

    if (owner && owner.getValue() && manager && manager.getValue()) {
      const ownerIdFormatted = owner.getValue()[0].id.replace("{", "").replace("}", "").toLowerCase();
      const managerIdFormatted = manager.getValue()[0].id.replace("{", "").replace("}", "").toLowerCase();

      const emailQuery = `systemusers?$select=internalemailaddress&$filter=systemuserid eq '${ownerIdFormatted}'`;
      const pgEmailResult = await getAttributeValue(emailQuery);
      const pgEmail = pgEmailResult?.internalemailaddress;

      const prideGlobalQuery = `pg_prideemployees?$select=emailaddress&$filter=pg_prideemployeeid eq '${managerIdFormatted}'`;
      const prideGlobalEmailResult = await getAttributeValue(prideGlobalQuery);
      const prideGlobalEmail = prideGlobalEmailResult?.emailaddress;

      return pgEmail === prideGlobalEmail;
    }

    return true;
  } catch (error) {
    console.error("Error in ApprovalShowHide:", error);
    return false;
  }
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

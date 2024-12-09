var formContext;

function setapprovertoIdFilter(executionContext) {
    formContext = executionContext.getFormContext();
    formContext.getControl("pg_approver").addPreSearch(filterPgReportstoId);
}

function filterPgReportstoId() {
    var applicationSubtype = formContext.getAttribute("pg_applicationsubtype").getValue();

    if (applicationSubtype === 140310000 || applicationSubtype === 140310001) {
        var fetchXmlFilter = 
        `<filter type="and">
            <condition attribute="systemuserid" operator="in">
                <value>E1B0694E-8B5B-ED11-9561-6045BDD44552</value>
                <value>CA43135A-1DB6-EE11-A569-000D3A170A76</value>
                <value>3DA0EA2C-77A9-EE11-BE37-000D3A170A76</value>
            </condition>
        </filter>`;

        formContext.getControl("pg_approver").addCustomFilter(fetchXmlFilter, "systemuser");
    }
    if (applicationSubtype === 140310001) {
        var fetchXmlFilter2 = 
        `<filter type="and">
            <condition attribute="systemuserid" operator="in">
                <value>E1B0694E-8B5B-ED11-9561-6045BDD44552</value>
                <value>CA43135A-1DB6-EE11-A569-000D3A170A76</value>
                <value>3DA0EA2C-77A9-EE11-BE37-000D3A170A76</value>
                <value>5107BBC4-568B-ED11-81AC-6045BDA8AA87</value>
                <value>594350B2-6BC5-EC11-A7B6-00224829325B</value>
            </condition>
        </filter>`;

        formContext.getControl("pg_approver").addCustomFilter(fetchXmlFilter2, "systemuser");
    }
}





function USAsecondapproveristrue(context) {
    debugger;
    var formContext = context.getFormContext();
    var includesecondapprover = formContext.getAttribute("pg_includesecondapprover").getValue();
    var approverSecondControl = formContext.getControl("pg_approversecond");
    var approverSecondAttribute = formContext.getAttribute("pg_approversecond");

    if (includesecondapprover === true) {
        approverSecondControl.setVisible(true);
    } else {
        if (approverSecondAttribute.getValue() !=== null) {
            approverSecondAttribute.setValue(null); 
        }
        approverSecondControl.setVisible(false);
    }
}







function changemanagement(context) {//prodution one team ids are changed 
    var formContext = context.getFormContext();
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var applicationsubtype = formContext.getControl("pg_applicationsubtype");
    var aplitionsubtype = formContext.getAttribute("pg_applicationsubtype").getValue();
    var applicationtype = formContext.getAttribute("pg_applicationtype").getValue();
    var Country = formContext.getAttribute("pg_country").getValue();
    var includesecondapprover = formContext.getAttribute("pg_includesecondapprover").getValue();
    var createform = 1;
    var Type = formContext.ui.getFormType();

    if (Type === createform || Type != createform) {
        var internalemailaddress;
        var teamIds = [
            "6cdab5df-1457-ee11-be6f-000d3a55fb1c",
            "779c1100-e157-ee11-be6f-002248257fd7",
            "2a78ad43-e157-ee11-be6f-002248257fd7",
            "41ad32aa-e157-ee11-be6f-002248257fd7",
            "876f2ee0-e157-ee11-be6f-002248257fd7",
            "b5183913-e257-ee11-be6f-002248257fd7",
            "46f1b546-e257-ee11-be6f-002248257fd7",
            "d4efa26c-e257-ee11-be6f-002248257fd7",
            "a8ed0a9a-e257-ee11-be6f-002248257fd7",
            "47f1b546-e257-ee11-be6f-002248257fd7"
        ];

        for (var i = 0; i < teamIds.length; i++) {
            retrieveTeamMembership(teamIds[i]);
        }
    }

    applicationsubtype.clearOptions();

    function retrieveTeamMembership(teamId) {
        var loggedinUserId = userSettings.userId.replace("{", "").replace("}", "");
        Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress").then(
            function success(result1) {
                var internalemailaddress2 = result1["internalemailaddress"];
                var req = new XMLHttpRequest();
                var requestUrl = Xrm.Page.context.getClientUrl() + "/api/data/v9.1/teams(" + teamId + ")/teammembership_association";
                req.open("GET", requestUrl, true);
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        req.onreadystatechange = null;
                        if (this.status === 200) {
                            var response = JSON.parse(this.response);

                            for (var i = 0; i < response.value.length; i++) {
                                internalemailaddress = response.value[i]["internalemailaddress"];
                                if (internalemailaddress2 === internalemailaddress) {
                                    if (teamId === "6cdab5df-1457-ee11-be6f-000d3a55fb1c" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Vendor Management', value: 140310000 });
                                        applicationsubtype.addOption({ text: 'Organizational Change', value: 140310001 });
                                        applicationsubtype.addOption({ text: 'BPO Operations', value: 140310002 });
                                        applicationsubtype.addOption({ text: 'Administration Management', value: 140310003 });
                                        applicationsubtype.addOption({ text: 'Facility Management', value: 140310004 });
                                        applicationsubtype.addOption({ text: 'Others', value: 140310005 });
                                        if (aplitionsubtype === 140310000 || aplitionsubtype === 140310001 || aplitionsubtype === 140310002 || aplitionsubtype === 140310003 || aplitionsubtype === 140310004 || aplitionsubtype === 140310005) {

                                            var entityType = "systemuser";
                                            var entityId = "{B624FB83-538B-ED11-81AD-000D3A55FB1C}"
                                            var employeeName = "Jayakumar MG"
                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                                var employeeName1 = "Srinivasan Sukumar";

                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "779c1100-e157-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'IT Infrastructure Changes(SW/NW/Firewall/)', value: 140310006 });
                                        applicationsubtype.addOption({ text: 'IT - Asset Management', value: 140310007 });
                                        if (aplitionsubtype === 140310006 || aplitionsubtype === 140310007) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "2a78ad43-e157-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        //   applicationsubtype.addOption({ text: 'HR Corporate Support', value: 140310008 });
                                        applicationsubtype.addOption({ text: 'HR Corporate HR Ops', value: 140310009 });
                                        applicationsubtype.addOption({ text: 'HR Corporate BP', value: 140310010 });
                                        applicationsubtype.addOption({ text: 'HR Corporate Talent Development', value: 140310011 });
                                        applicationsubtype.addOption({ text: 'HR Corporate Employee Engagement', value: 140310012 });
                                        if (aplitionsubtype === 140310009 || aplitionsubtype === 140310010 || aplitionsubtype === 140310011 || aplitionsubtype === 140310012) {//aplitionsubtype === 140310008 removed

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "41ad32aa-e157-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Payroll & Benefits - Shared Services', value: 140310013 });
                                        if (aplitionsubtype === 140310013) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "876f2ee0-e157-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Audit & Compliance Internal', value: 140310014 });
                                        if (aplitionsubtype === 140310014) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "b5183913-e257-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'HR Operations Management - Shared Services', value: 140310015 });
                                        if (aplitionsubtype === 140310015) {
                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "46f1b546-e257-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Finance & Accounts Management', value: 140310016 });
                                        if (aplitionsubtype === 140310016) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "d4efa26c-e257-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Learning & Development', value: 140310017 });
                                        if (aplitionsubtype === 140310017) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "a8ed0a9a-e257-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'RTA Staffing Domestic', value: 140310018 });
                                        if (aplitionsubtype === 140310018) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";


                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "47f1b546-e257-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Financial Reporting', value: 140310019 });
                                        if (aplitionsubtype === 140310019) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";


                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    }
                                    else if (teamId === "6cdab5df-1457-ee11-be6f-000d3a55fb1c" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Vendor Management', value: 140310000 });
                                        applicationsubtype.addOption({ text: 'Organizational Change', value: 140310001 });
                                        applicationsubtype.addOption({ text: 'BPO Operations', value: 140310002 });
                                        applicationsubtype.addOption({ text: 'Administration Management', value: 140310003 });
                                        applicationsubtype.addOption({ text: 'Facility Management', value: 140310004 });
                                        applicationsubtype.addOption({ text: 'Others', value: 140310005 });
                                        if (aplitionsubtype === 140310000 || aplitionsubtype === 140310001 || aplitionsubtype === 140310002 || aplitionsubtype === 140310003 || aplitionsubtype === 140310004 || aplitionsubtype === 140310005) {
                                            var entityType = "systemuser";

                                            var entityId = "{5107bbc4-568b-ed11-81ac-6045bda8aa87}"
                                            var employeeName = "Jayakumar MG"

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                                var employeeName1 = "Srinivasan Sukumar";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "779c1100-e157-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Technology-Related Changes (SW/NW/Firewall/)', value: 140310008 });
                                        applicationsubtype.addOption({ text: 'Asset/IT Management', value: 140310020 });
                                        if (aplitionsubtype === 140310008 || aplitionsubtype === 140310020) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "2a78ad43-e157-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'HR Corporate Support', value: 140310021 });
                                        applicationsubtype.addOption({ text: 'Talent Development – same as L&D', value: 140310022 });
                                        applicationsubtype.addOption({ text: 'Employee Engagement', value: 140310023 });

                                        if (aplitionsubtype === 140310021 || aplitionsubtype === 140310022 || aplitionsubtype === 140310023) {

                                            var entityType = "systemuser";
                                            var entityId = "{9ce8df14-59ef-ed11-8848-000d3a114691}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "41ad32aa-e157-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Payroll & Benefits', value: 140310024 });
                                        if (aplitionsubtype === 140310024) {
                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "876f2ee0-e157-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Audit', value: 140310025 });
                                        if (aplitionsubtype === 140310025) {
                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "b5183913-e257-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Operations Management', value: 140310026 });
                                        if (aplitionsubtype === 140310026) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1, 
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "46f1b546-e257-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Finance Management', value: 140310027 });
                                        if (aplitionsubtype === 140310027) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "d4efa26c-e257-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'L&D Related', value: 140310028 });
                                        if (aplitionsubtype === 140310028) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "a8ed0a9a-e257-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'HR Recruitment', value: 140310029 });
                                        if (aplitionsubtype === 140310029) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";
                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "47f1b546-e257-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Financial Reporting', value: 140310019 });
                                        if (aplitionsubtype === 140310019) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                                formContext.getControl("pg_approversecond").setVisible(true);
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                                formContext.getControl("pg_approversecond").setVisible(false);
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                req.send();
            }
        )
        formContext.getAttribute("pg_whychangeisrequired").setRequiredLevel("required");
        formContext.getAttribute("pg_projectprograminitiative").setRequiredLevel("required");
        formContext.getAttribute("pg_estimatedcostoption").setRequiredLevel("required");
        formContext.getAttribute("pg_priority").setRequiredLevel("required");
        formContext.getAttribute("pg_intendedoutcome").setRequiredLevel("required");
        formContext.getAttribute("pg_hours").setRequiredLevel("required");

        formContext.getAttribute("pg_durationimpact").setRequiredLevel("required");
        formContext.getAttribute("pg_recommendations").setRequiredLevel("required");
        formContext.getAttribute("pg_scheduleimpactwbs").setRequiredLevel("required");
        formContext.getAttribute("pg_currency").setRequiredLevel("required");
        formContext.getAttribute("pg_comments").setRequiredLevel("required");

    }
    if (Type === createform) {
        formContext.getControl("pg_applicationsubtype").setDisabled(false);
    }
    else {
        formContext.getControl("pg_applicationsubtype").setDisabled(true);
    }
}








function CompareAnniversaryWithCurrentDate(context) {
    debugger;
    var formContext = context.getFormContext();
    var applicationSubtype = formContext.getAttribute("pg_applicationsubtype").getValue();
    var Country = formContext.getAttribute("pg_country").getValue();
    var approverField = formContext.getAttribute("pg_approver");

    // Valid approvers for both scenarios with their GUIDs
    var validApproversSubtype000 = {
        "Anu": "{GUID_FOR_ANU}",
        "Eitan": "{GUID_FOR_EITAN}",
        "Josh": "{GUID_FOR_JOSH}"
    };

    var validApproversSubtype001 = {
        "Tim Tobin": "{GUID_FOR_TIM_TOBIN}",
        "Kate Goss": "{GUID_FOR_KATE_GOSS}",
        "Eitan": "{GUID_FOR_EITAN}",
        "Abhinav": "{GUID_FOR_ABHINAV}",
        "Anu": "{GUID_FOR_ANU}",
        "Josh": "{GUID_FOR_JOSH}"
    };

    var validApprovers = {};

    // Determine which set of valid approvers to use based on applicationSubtype
    if (applicationSubtype === 140310000) {
        validApprovers = validApproversSubtype000;
    } else if (applicationSubtype === 140310001) {
        validApprovers = validApproversSubtype001;
    }

    // Check if country and application subtype conditions are met
    if (Country === 140310001 && Object.keys(validApprovers).length > 0) {

        var selectedApprover = approverField.getValue();

        if (selectedApprover && selectedApprover.length > 0) {
            var selectedApproverId = selectedApprover[0].id;

            // Check if the selected approver is one of the valid ones
            var isValid = Object.values(validApprovers).includes(selectedApproverId);

            if (!isValid) {
               // approverField.setValue(null); 
                formContext.getControl("pg_approver").setNotification("Please select a valid approver: " + Object.keys(validApprovers).join(", ") + ".");
            } else {
                formContext.getControl("pg_approver").clearNotification();
            }
        }
    } else {
        // Clear the approver field if the conditions are not met
        approverField.setValue(null);
    }
}





























function changemanagement(context) {//prodution one team ids are changed 
    var formContext = context.getFormContext();
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var applicationsubtype = formContext.getControl("pg_applicationsubtype");
    var aplitionsubtype = formContext.getAttribute("pg_applicationsubtype").getValue();
    var applicationtype = formContext.getAttribute("pg_applicationtype").getValue();
    var Country = formContext.getAttribute("pg_country").getValue();
    var approverField = formContext.getAttribute("pg_approver");
    var includesecondapprover = formContext.getAttribute("pg_includesecondapprover").getValue();
    var createform = 1;
    var Type = formContext.ui.getFormType();

    if (Type === createform || Type != createform) {
        var internalemailaddress;
        var teamIds = [
            "6cdab5df-1457-ee11-be6f-000d3a55fb1c",
            "779c1100-e157-ee11-be6f-002248257fd7",
            "2a78ad43-e157-ee11-be6f-002248257fd7",
            "41ad32aa-e157-ee11-be6f-002248257fd7",
            "876f2ee0-e157-ee11-be6f-002248257fd7",
            "b5183913-e257-ee11-be6f-002248257fd7",
            "46f1b546-e257-ee11-be6f-002248257fd7",
            "d4efa26c-e257-ee11-be6f-002248257fd7",
            "a8ed0a9a-e257-ee11-be6f-002248257fd7",
            "47f1b546-e257-ee11-be6f-002248257fd7"
        ];

        for (var i = 0; i < teamIds.length; i++) {
            retrieveTeamMembership(teamIds[i]);
        }
    }

    applicationsubtype.clearOptions();

    function retrieveTeamMembership(teamId) {
        var loggedinUserId = userSettings.userId.replace("{", "").replace("}", "");
        Xrm.WebApi.online.retrieveRecord("systemuser", loggedinUserId, "?$select=internalemailaddress").then(
            function success(result1) {
                var internalemailaddress2 = result1["internalemailaddress"];
                var req = new XMLHttpRequest();
                var requestUrl = Xrm.Page.context.getClientUrl() + "/api/data/v9.1/teams(" + teamId + ")/teammembership_association";
                req.open("GET", requestUrl, true);
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        req.onreadystatechange = null;
                        if (this.status === 200) {
                            var response = JSON.parse(this.response);

                            for (var i = 0; i < response.value.length; i++) {
                                internalemailaddress = response.value[i]["internalemailaddress"];
                                if (internalemailaddress2 === internalemailaddress) {
                                    if (teamId === "6cdab5df-1457-ee11-be6f-000d3a55fb1c" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Vendor Management', value: 140310000 });
                                        applicationsubtype.addOption({ text: 'Organizational Change', value: 140310001 });
                                        applicationsubtype.addOption({ text: 'BPO Operations', value: 140310002 });
                                        applicationsubtype.addOption({ text: 'Administration Management', value: 140310003 });
                                        applicationsubtype.addOption({ text: 'Facility Management', value: 140310004 });
                                        applicationsubtype.addOption({ text: 'Others', value: 140310005 });
                                        if (aplitionsubtype === 140310000 || aplitionsubtype === 140310001 || aplitionsubtype === 140310002 || aplitionsubtype === 140310003 || aplitionsubtype === 140310004 || aplitionsubtype === 140310005) {

                                            var entityType = "systemuser";
                                            var entityId = "{B624FB83-538B-ED11-81AD-000D3A55FB1C}"
                                            var employeeName = "Jayakumar MG"
                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                            if (includesecondapprover === true) {
                                              
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                                var employeeName1 = "Srinivasan Sukumar";

                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                              
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "779c1100-e157-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'IT Infrastructure Changes(SW/NW/Firewall/)', value: 140310006 });
                                        applicationsubtype.addOption({ text: 'IT - Asset Management', value: 140310007 });
                                        if (aplitionsubtype === 140310006 || aplitionsubtype === 140310007) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                            if (includesecondapprover === true) {
                                            
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                              
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "2a78ad43-e157-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        //   applicationsubtype.addOption({ text: 'HR Corporate Support', value: 140310008 });
                                        applicationsubtype.addOption({ text: 'HR Corporate HR Ops', value: 140310009 });
                                        applicationsubtype.addOption({ text: 'HR Corporate BP', value: 140310010 });
                                        applicationsubtype.addOption({ text: 'HR Corporate Talent Development', value: 140310011 });
                                        applicationsubtype.addOption({ text: 'HR Corporate Employee Engagement', value: 140310012 });
                                        if (aplitionsubtype === 140310009 || aplitionsubtype === 140310010 || aplitionsubtype === 140310011 || aplitionsubtype === 140310012) {//aplitionsubtype === 140310008 removed

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover === true) {
                                               
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                              
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "41ad32aa-e157-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Payroll & Benefits - Shared Services', value: 140310013 });
                                        if (aplitionsubtype === 140310013) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                              
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                               
                                                formContext.getControl("pg_approversecond").clear();
                                            }


                                        }
                                    } else if (teamId === "876f2ee0-e157-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Audit & Compliance Internal', value: 140310014 });
                                        if (aplitionsubtype === 140310014) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                             
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                               
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "b5183913-e257-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'HR Operations Management - Shared Services', value: 140310015 });
                                        if (aplitionsubtype === 140310015) {
                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                            if (includesecondapprover === true) {
                                              
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                              
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "46f1b546-e257-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Finance & Accounts Management', value: 140310016 });
                                        if (aplitionsubtype === 140310016) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                              
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                               
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "d4efa26c-e257-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Learning & Development', value: 140310017 });
                                        if (aplitionsubtype === 140310017) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                               
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                              
                                                formContext.getControl("pg_approversecond").clear();
                                            }
                                        }
                                    } else if (teamId === "a8ed0a9a-e257-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'RTA Staffing Domestic', value: 140310018 });
                                        if (aplitionsubtype === 140310018) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";


                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                             
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                               
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    } else if (teamId === "47f1b546-e257-ee11-be6f-002248257fd7" && Country === 140310000) {
                                        applicationsubtype.addOption({ text: 'Financial Reporting', value: 140310019 });
                                        if (aplitionsubtype === 140310019) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";


                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                            if (includesecondapprover === true) {
                                               
                                                var entityType1 = "systemuser";
                                                var entityId1 = "{0516E8CD-FD87-EB11-B1AD-000D3A8C9195}";
                                                var employeeName1 = "Ramesh Mahalingam";
                                                var lookupValue1 = [{
                                                    entityType: entityType1,
                                                    id: entityId1,
                                                    name: employeeName1
                                                }];
                                                formContext.getAttribute("pg_approversecond").setValue(lookupValue1);
                                            }
                                            else {
                                               
                                                formContext.getControl("pg_approversecond").clear();
                                            }

                                        }
                                    }
                                    else if (teamId === "6cdab5df-1457-ee11-be6f-000d3a55fb1c" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Vendor Management', value: 140310000 });
                                        applicationsubtype.addOption({ text: 'Organizational Change', value: 140310001 });
                                        applicationsubtype.addOption({ text: 'BPO Operations', value: 140310002 });
                                        applicationsubtype.addOption({ text: 'Administration Management', value: 140310003 });
                                        applicationsubtype.addOption({ text: 'Facility Management', value: 140310004 });
                                        applicationsubtype.addOption({ text: 'Others', value: 140310005 });
                                       
    var validApproversSubtype000 = {
        "siddu": "{E1B0694E-8B5B-ED11-9561-6045BDD44552}",
        "Eitan": "{GUID_FOR_EITAN}",
        "Josh": "{GUID_FOR_JOSH}"
    };

    var validApproversSubtype001 = {
        "Tim Tobin": "{GUID_FOR_TIM_TOBIN}",
        "Kate Goss": "{GUID_FOR_KATE_GOSS}",
        "Eitan": "{GUID_FOR_EITAN}",
        "Abhinav": "{GUID_FOR_ABHINAV}",
        "Anu": "{GUID_FOR_ANU}",
        "Josh": "{GUID_FOR_JOSH}"
    };

    var validApprovers = {};

    
    if (aplitionsubtype === 140310000) {
        validApprovers = validApproversSubtype000;
    } else if (aplitionsubtype === 140310001) {
        validApprovers = validApproversSubtype001;
    }

   
    if (Country === 140310001 && Object.keys(validApprovers).length > 0) {

        var selectedApprover = approverField.getValue();

        if (selectedApprover && selectedApprover.length > 0) {
            var selectedApproverId = selectedApprover[0].id;

           
            var isValid = Object.values(validApprovers).includes(selectedApproverId);

            if (!isValid) {
               
                formContext.getControl("pg_approver").setNotification("Please select a valid approver: " + Object.keys(validApprovers).join(", ") + ".");
            } else {
                formContext.getControl("pg_approver").clearNotification();
            }
        }
    } 
                                        if (aplitionsubtype === 140310002) {
                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                        }
                                        if (aplitionsubtype === 140310003 || aplitionsubtype === 140310004 || aplitionsubtype === 140310005) {
                                            var entityType = "systemuser";

                                            var entityId = "{5107bbc4-568b-ed11-81ac-6045bda8aa87}"
                                            var employeeName = "Jayakumar MG"

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                        }
                                    } else if (teamId === "779c1100-e157-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Technology-Related Changes (SW/NW/Firewall/)', value: 140310008 });
                                        applicationsubtype.addOption({ text: 'Asset/IT Management', value: 140310020 });
                                        if (aplitionsubtype === 140310008 || aplitionsubtype === 140310020) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                        }
                                    } else if (teamId === "2a78ad43-e157-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'HR Corporate Support', value: 140310021 });
                                        applicationsubtype.addOption({ text: 'Talent Development – same as L&D', value: 140310022 });
                                        applicationsubtype.addOption({ text: 'Employee Engagement', value: 140310023 });

                                        if (aplitionsubtype === 140310021 || aplitionsubtype === 140310022 || aplitionsubtype === 140310023) {

                                            var entityType = "systemuser";
                                            var entityId = "{9ce8df14-59ef-ed11-8848-000d3a114691}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                        }
                                    } else if (teamId === "41ad32aa-e157-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Payroll & Benefits', value: 140310024 });
                                        if (aplitionsubtype === 140310024) {
                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                        }
                                    } else if (teamId === "876f2ee0-e157-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Audit', value: 140310025 });
                                        if (aplitionsubtype === 140310025) {
                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                        }
                                    } else if (teamId === "b5183913-e257-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Operations Management', value: 140310026 });
                                        if (aplitionsubtype === 140310026) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                        }
                                    } else if (teamId === "46f1b546-e257-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Finance Management', value: 140310027 });
                                        if (aplitionsubtype === 140310027) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);

                                        }
                                    } else if (teamId === "d4efa26c-e257-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'L&D Related', value: 140310028 });
                                        if (aplitionsubtype === 140310028) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                           
                                        }
                                    } else if (teamId === "a8ed0a9a-e257-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'HR Recruitment', value: 140310029 });
                                        if (aplitionsubtype === 140310029) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";
                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);


                                        }
                                    } else if (teamId === "47f1b546-e257-ee11-be6f-002248257fd7" && Country === 140310001) {
                                        applicationsubtype.addOption({ text: 'Financial Reporting', value: 140310019 });
                                        if (aplitionsubtype === 140310019) {

                                            var entityType = "systemuser";
                                            var entityId = "{6D49CF21-56EF-ED11-8849-000D3A5755D3}";
                                            var employeeName = "Srinivasan Sukumar";

                                            var lookupValue = [{
                                                entityType: entityType,
                                                id: entityId,
                                                name: employeeName
                                            }];
                                            formContext.getAttribute("pg_approver").setValue(lookupValue);
                                          

                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                req.send();
            }
        )
        formContext.getAttribute("pg_whychangeisrequired").setRequiredLevel("required");
        formContext.getAttribute("pg_projectprograminitiative").setRequiredLevel("required");
        formContext.getAttribute("pg_estimatedcostoption").setRequiredLevel("required");
        formContext.getAttribute("pg_priority").setRequiredLevel("required");
        formContext.getAttribute("pg_intendedoutcome").setRequiredLevel("required");
        formContext.getAttribute("pg_hours").setRequiredLevel("required");

        formContext.getAttribute("pg_durationimpact").setRequiredLevel("required");
        formContext.getAttribute("pg_recommendations").setRequiredLevel("required");
        formContext.getAttribute("pg_scheduleimpactwbs").setRequiredLevel("required");
        formContext.getAttribute("pg_currency").setRequiredLevel("required");
        formContext.getAttribute("pg_comments").setRequiredLevel("required");

    }
    if (Type === createform) {
        formContext.getControl("pg_applicationsubtype").setDisabled(false);
    }
    else {
        formContext.getControl("pg_applicationsubtype").setDisabled(true);
    }
}
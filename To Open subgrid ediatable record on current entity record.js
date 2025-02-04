function RunOnSelected(executionContext) {
var selected = executionContext.getFormContext().data.entity;
var Id = selected.getId();
 
var pageInput = {
pageType: "entityrecord",
entityName: "new_xgoal",//new_xgoal//contact
entityId: Id
};
var navigationOptions = {
target: 2,
height: {value: 50, unit:"%"},
width: {value: 50, unit:"%"},
position: 1// opens center if position: 2 then it opens side panel
};
Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
function success() {},
function error() {}
);
}


//https://carldesouza.com/clicking-on-a-subgrid-to-open-a-modal-form-in-dynamics-365/
var ActionEnums = {
    SELECT: "select",
    SELECTVALID: "selectvalid",
    SELECTDELETED: "selectdeleted",
    UPDATE: "update",
    DELETE: "delete",
    SELECTONE: "selectOne",
    INSERT: "insert",
    DELETEREAL: "deleteReal"
};

function CMSParams(){}
CMSParams.prototype.params = {};
CMSParams.prototype.setParams = function (a, d) {
    this.params = {
        action: a,
        data: d
    };
};
CMSParams.prototype.getParams = function () {
    return this.params;
};
CMSParams.prototype.print = function () {
    console.log("CMSParams.params : ", this.params);
};

/*
Test：
var p = new CMSParams();
p.setParams(ActionEnums.SELECT, {
    "id": "",
    "name": ""
});
*/

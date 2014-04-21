/// <reference path="typings/bootstrap/bootstrap.d.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />
ko.bindingHandlers["bootstrapModal"] = {
    init: function (element) {
        ko.utils.toggleDomNodeCssClass(element, "modal hide", true);
        $(element).modal({ "backdrop": "static", keyboard: false, show: false });
    },
    update: function (element, valueAccessor) {
        var props = valueAccessor();
        $(element).modal(props.show() ? 'show' : 'hide');
    }
};
//# sourceMappingURL=KoModal.js.map

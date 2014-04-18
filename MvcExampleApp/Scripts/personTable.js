var ViewModel = (function () {
    function ViewModel(targetElement) {
        this.showEmptyAlert = ko.observable(false);
        this.showTable = ko.observable(false);
        this.peopleData = ko.observableArray([]);
        ko.applyBindings(this, targetElement);
        $.support.cors = true;
    }
    ViewModel.prototype.Load = function () {
        $.getJSON("spanked", function (data) {
            alert(data);
        });
    };
    return ViewModel;
})();

window.onload = function () {
    var pageView = document.getElementById('peopleList');
    var myViewModel = new ViewModel(pageView);
    //myViewModel.Load();
};
//# sourceMappingURL=personTable.js.map

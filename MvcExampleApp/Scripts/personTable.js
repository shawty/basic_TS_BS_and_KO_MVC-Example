var PersonTableRowViewModel = (function () {
    function PersonTableRowViewModel(inputRecord) {
        this.RecordId = ko.observable(0);
        this.FirstName = ko.observable('');
        this.SecondName = ko.observable('');
        this.EmailAddress = ko.observable('');
        ko.mapping.fromJS(inputRecord, {}, this);
    }
    PersonTableRowViewModel.prototype.actionClick = function () {
        alert("action " + this.RecordId());
    };
    return PersonTableRowViewModel;
})();

var PersonTableViewModel = (function () {
    function PersonTableViewModel(targetElement) {
        this.loadComplete = ko.observable(false);
        this.peopleData = ko.observableArray([]);
        this.showAlert = ko.computed(function () {
            if (!this.loadComplete())
                return false;

            if (this.peopleData().length < 1) {
                return true;
            }
            return false;
        }, this);
        this.showTable = ko.computed(function () {
            if (!this.loadComplete())
                return false;

            if (this.peopleData().length > 0) {
                return true;
            }
            return false;
        }, this);
        ko.applyBindings(this, targetElement);
        $.support.cors = true;
    }
    PersonTableViewModel.prototype.Load = function () {
        var _this = this;
        this.loadComplete(false);
        $.getJSON(baseUrl + "ajax/getallpeople", function (data) {
            if (data.length > 0) {
                _this.peopleData(ko.utils.arrayMap(data, function (item) {
                    return new PersonTableRowViewModel(item);
                }));
            } else {
                _this.peopleData([]);
            }
            _this.loadComplete(true);
        });
    };

    PersonTableViewModel.prototype.addNewClick = function () {
        alert("add new");
    };
    return PersonTableViewModel;
})();

window.onload = function () {
    var pageView = document.getElementById('peopleList');
    var myViewModel = new PersonTableViewModel(pageView);
    myViewModel.Load();
};
//# sourceMappingURL=personTable.js.map

var LinksListRowViewModel = (function () {
    function LinksListRowViewModel(inputRecord) {
        this.LinkId = ko.observable(0);
        this.LinkText = ko.observable('');
        this.LinkDestination = ko.observable('');
        this.Description = ko.observable('');
        this.ThumbNail = ko.observable('');
        this.getImagePath = ko.computed(function () {
            return baseUrl + this.ThumbNail();
        }, this);
        ko.mapping.fromJS(inputRecord, {}, this);
    }
    return LinksListRowViewModel;
})();

var LinksListViewModel = (function () {
    function LinksListViewModel(targetElement) {
        this.linksData = ko.observableArray([]);
        ko.applyBindings(this, targetElement);
        $.support.cors = true;
    }
    LinksListViewModel.prototype.Load = function () {
        var _this = this;
        $.getJSON(baseUrl + "ajax/getalllinks", function (data) {
            if (data.length > 0) {
                _this.linksData(ko.utils.arrayMap(data, function (item) {
                    return new LinksListRowViewModel(item);
                }));
            } else {
                _this.linksData([]);
            }
        });
    };
    return LinksListViewModel;
})();

window.onload = function () {
    var pageView = document.getElementById('linksList');
    var myViewModel = new LinksListViewModel(pageView);
    myViewModel.Load();
};
//# sourceMappingURL=linksList.js.map

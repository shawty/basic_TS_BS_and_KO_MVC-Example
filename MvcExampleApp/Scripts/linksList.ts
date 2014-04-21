declare var ko: KnockoutStatic;
declare var $: JQueryStatic;
declare var baseUrl: string;

class LinksListRowViewModel {

  constructor(inputRecord: any) {
    ko.mapping.fromJS(inputRecord, {}, this);
  }

  public LinkId: any = ko.observable(0);
  public LinkText: any = ko.observable('');
  public LinkDestination: any = ko.observable('');
  public Description: any = ko.observable('');
  public ThumbNail: any = ko.observable('');

  public getImagePath: any = ko.computed(function () {
    return baseUrl + this.ThumbNail();
  }, this);

}

class LinksListViewModel {
  constructor(targetElement: HTMLElement) {
    ko.applyBindings(this, targetElement);
    $.support.cors = true;
  }

  public linksData: any = ko.observableArray([]);

  public Load(): void {
    $.getJSON(baseUrl + "ajax/getalllinks",
      (data) => {
        if (data.length > 0) {
          this.linksData(ko.utils.arrayMap(data, function (item) {
            return new LinksListRowViewModel(item);
          }));
        }
        else {
          this.linksData([]);
        }
      }
    );
  }

}

window.onload = () => {
  var pageView = document.getElementById('linksList');
  var myViewModel = new LinksListViewModel(pageView);
  myViewModel.Load();
};

declare var ko: KnockoutStatic;
declare var $: JQueryStatic;
declare var baseUrl: string;

class PersonTableRowViewModel {

  constructor(inputRecord: any) {
    ko.mapping.fromJS(inputRecord, {}, this);
  }

  public RecordId: any = ko.observable(0);
  public FirstName: any = ko.observable('');
  public SecondName: any = ko.observable('');
  public EmailAddress: any = ko.observable('');

  public actionClick(): void {
    alert("action " + this.RecordId());
  }

}

class PersonTableViewModel {
  constructor(targetElement: HTMLElement) {
    ko.applyBindings(this, targetElement);
    $.support.cors = true;
  }

  public loadComplete: any = ko.observable(false);
  public peopleData: any = ko.observableArray([]);

  public showAlert: any = ko.computed(function () {

    if (!this.loadComplete()) return false;

    if (this.peopleData().length < 1) {
      return true;
    }
    return false;
  }, this);

  public showTable: any = ko.computed(function () {

    if (!this.loadComplete()) return false;

    if (this.peopleData().length > 0) {
      return true;
    }
    return false;
  }, this);

  public Load(): void {
    this.loadComplete(false);
    $.getJSON(baseUrl + "ajax/getallpeople",
      (data) => {
        if (data.length > 0) {
          this.peopleData(ko.utils.arrayMap(data, function (item) {
            return new PersonTableRowViewModel(item);
          }));
        }
        else {
          this.peopleData([]);
        }
        this.loadComplete(true);
      }
    );
  }

  public addNewClick(): void {
    alert("add new");
  }

}

window.onload = () => {
  var pageView = document.getElementById('peopleList');
  var myViewModel = new PersonTableViewModel(pageView);
  myViewModel.Load();
};

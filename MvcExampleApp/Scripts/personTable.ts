declare var ko: KnockoutStatic;
declare var $: JQueryStatic;

class ViewModel {
  constructor(targetElement: HTMLElement) {
    ko.applyBindings(this, targetElement);
    $.support.cors = true;
  }

  public showEmptyAlert: any = ko.observable(false);
  public showTable: any = ko.observable(false);
  public peopleData: any = ko.observableArray([]);

  public Load(): void {
    $.getJSON("spanked",
      (data) => {
        alert(data);
      }
      );
  }

}

window.onload = () => {
  var pageView = document.getElementById('peopleList');
  var myViewModel = new ViewModel(pageView);
  //myViewModel.Load();
};
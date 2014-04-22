declare var ko: KnockoutStatic;
declare var $: JQueryStatic;
declare var baseUrl: string;

// Table row view model
class PersonTableRowViewModel {

  constructor(inputRecord: any) {
    ko.mapping.fromJS(inputRecord, {}, this);
  }

  public RecordId: any = ko.observable(0);
  public FirstName: any = ko.observable('');
  public SecondName: any = ko.observable('');
  public EmailAddress: any = ko.observable('');

  public deleteRecord(myParent: PersonTableViewModel): void {
    myParent.deleteRecord(this);
  }

  public editRecord(myParent: PersonTableViewModel): void {
    myParent.editRecordClick(this);
  }

}

// Full table view model
class PersonTableViewModel {
  constructor(targetElement: HTMLElement, addNewDialogVM: RecordDialogViewModel) {
    ko.applyBindings(this, targetElement);
    this.recordDialog = addNewDialogVM;
    $.support.cors = true;
  }

  public loadComplete: any = ko.observable(false);
  public peopleData: any = ko.observableArray([]);

  private recordDialog: RecordDialogViewModel;

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
    this.recordDialog.show(this, true, null);
  }

  public editRecordClick(theRecord: PersonTableRowViewModel) {
    this.recordDialog.show(this, false, theRecord);
  }

  public deleteRecord(theRecord: any) {
    if (confirm("Really delete this record?")) {
      this.peopleData.remove(theRecord);
      $.post(baseUrl + "ajax/deleteoneperson/" + theRecord.RecordId(),
        (data) => { }
      );
    }
  }

  public addRecord(theRecord: any): void {
    $.post(baseUrl + "ajax/addnewperson", theRecord,
      (data) => {
        this.peopleData.push(new PersonTableRowViewModel(data.attachedObject));
      }
    );
  }

  public updateRecord(theRecord: any): void {
    $.post(baseUrl + "ajax/UpdateOnePerson", theRecord,
      (data) => {
        var oldPerson = ko.utils.arrayFirst(this.peopleData(), function (person: any) {
          return person.RecordId() === theRecord.RecordId();
        });

        var newPerson = new PersonTableRowViewModel(data.attachedObject);
        this.peopleData.replace(oldPerson, newPerson);

      }
    );
  }
}

// Add Record Dialog View Model
class RecordDialogViewModel {

  constructor(targetElement: HTMLElement) {
    ko.applyBindings(this, targetElement);
    $.support.cors = true;
    this.DialogDefinition = targetElement;
  }

  public RecordId: any = ko.observable(0);
  public FirstName: any = ko.observable('');
  public SecondName: any = ko.observable('');
  public EmailAddress: any = ko.observable('');

  public PrimaryButtonText: any = ko.observable('');
  public DialogTitleText: any = ko.observable('');

  private DialogDefinition: HTMLElement;
  private TableViewModel: PersonTableViewModel;
  private IsNewRecord: boolean;

  public show(tableViewModel: any, isNewRecord: boolean, existingRecord: any): void {
    this.TableViewModel = tableViewModel;
    this.IsNewRecord = isNewRecord;

    if (isNewRecord) {
      this.PrimaryButtonText('Save');
      this.DialogTitleText('Add new person');
      this.RecordId(0);
      this.FirstName('');
      this.SecondName('');
      this.EmailAddress('');
    }
    else {
      this.PrimaryButtonText('Update');
      this.DialogTitleText('Update existing person');
      this.RecordId(existingRecord.RecordId());
      this.FirstName(existingRecord.FirstName());
      this.SecondName(existingRecord.SecondName());
      this.EmailAddress(existingRecord.EmailAddress());
    }

    $(this.DialogDefinition).modal('show');
  }

  public primaryButtonClick(): void {
    var recordData = {
      RecordId: this.RecordId,
      FirstName: this.FirstName,
      SecondName: this.SecondName,
      EmailAddress: this.EmailAddress
    };

    if (this.IsNewRecord) {
      this.TableViewModel.addRecord(recordData);
    }
    else {
      this.TableViewModel.updateRecord(recordData);
    }

    $(this.DialogDefinition).modal('hide');
  }
}


window.onload = () => {

  // Define VM for the new/edit record dialog
  var recordDialog = document.getElementById('dlgEditRecord');
  var recordDialogVM = new RecordDialogViewModel(recordDialog);

  // Define VM for main table
  var peopleList = document.getElementById('peopleList');
  var peopleListVM = new PersonTableViewModel(peopleList, recordDialogVM);
  peopleListVM.Load();

};

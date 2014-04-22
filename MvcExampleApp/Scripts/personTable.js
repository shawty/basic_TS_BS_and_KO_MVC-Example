// Table row view model
var PersonTableRowViewModel = (function () {
    function PersonTableRowViewModel(inputRecord) {
        this.RecordId = ko.observable(0);
        this.FirstName = ko.observable('');
        this.SecondName = ko.observable('');
        this.EmailAddress = ko.observable('');
        ko.mapping.fromJS(inputRecord, {}, this);
    }
    PersonTableRowViewModel.prototype.deleteRecord = function (myParent) {
        myParent.deleteRecordClick(this);
    };

    PersonTableRowViewModel.prototype.editRecord = function (myParent) {
        myParent.editRecordClick(this);
    };
    return PersonTableRowViewModel;
})();

// Full table view model
var PersonTableViewModel = (function () {
    function PersonTableViewModel(targetElement, addNewDialogVM, yesnoDialogVM) {
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
        this.recordDialog = addNewDialogVM;
        this.yesnoDialog = yesnoDialogVM;
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
        this.recordDialog.show(this, true, null);
    };

    PersonTableViewModel.prototype.editRecordClick = function (theRecord) {
        this.recordDialog.show(this, false, theRecord);
    };

    PersonTableViewModel.prototype.deleteRecordClick = function (theRecord) {
        this.yesnoDialog.show(this, theRecord);
    };

    PersonTableViewModel.prototype.deleteRecord = function (theRecord) {
        console.log(this);
        this.peopleData.remove(theRecord);
        $.post(baseUrl + "ajax/deleteoneperson/" + theRecord.RecordId(), function (data) {
        });
    };

    PersonTableViewModel.prototype.addRecord = function (theRecord) {
        var _this = this;
        $.post(baseUrl + "ajax/addnewperson", theRecord, function (data) {
            _this.peopleData.push(new PersonTableRowViewModel(data.attachedObject));
        });
    };

    PersonTableViewModel.prototype.updateRecord = function (theRecord) {
        var _this = this;
        $.post(baseUrl + "ajax/UpdateOnePerson", theRecord, function (data) {
            var oldPerson = ko.utils.arrayFirst(_this.peopleData(), function (person) {
                return person.RecordId() === theRecord.RecordId();
            });

            var newPerson = new PersonTableRowViewModel(data.attachedObject);
            _this.peopleData.replace(oldPerson, newPerson);
        });
    };
    return PersonTableViewModel;
})();

// Add Record Dialog View Model
var RecordDialogViewModel = (function () {
    function RecordDialogViewModel(targetElement) {
        this.RecordId = ko.observable(0);
        this.FirstName = ko.observable('');
        this.SecondName = ko.observable('');
        this.EmailAddress = ko.observable('');
        this.PrimaryButtonText = ko.observable('');
        this.DialogTitleText = ko.observable('');
        ko.applyBindings(this, targetElement);
        $.support.cors = true;
        this.DialogDefinition = targetElement;
    }
    RecordDialogViewModel.prototype.show = function (tableViewModel, isNewRecord, existingRecord) {
        this.TableViewModel = tableViewModel;
        this.IsNewRecord = isNewRecord;

        if (isNewRecord) {
            this.PrimaryButtonText('Save');
            this.DialogTitleText('Add new person');
            this.RecordId(0);
            this.FirstName('');
            this.SecondName('');
            this.EmailAddress('');
        } else {
            this.PrimaryButtonText('Update');
            this.DialogTitleText('Update existing person');
            this.RecordId(existingRecord.RecordId());
            this.FirstName(existingRecord.FirstName());
            this.SecondName(existingRecord.SecondName());
            this.EmailAddress(existingRecord.EmailAddress());
        }

        $(this.DialogDefinition).modal('show');
    };

    RecordDialogViewModel.prototype.primaryButtonClick = function () {
        var recordData = {
            RecordId: this.RecordId,
            FirstName: this.FirstName,
            SecondName: this.SecondName,
            EmailAddress: this.EmailAddress
        };

        if (this.IsNewRecord) {
            this.TableViewModel.addRecord(recordData);
        } else {
            this.TableViewModel.updateRecord(recordData);
        }

        $(this.DialogDefinition).modal('hide');
    };
    return RecordDialogViewModel;
})();

var YesNoDialogViewModel = (function () {
    function YesNoDialogViewModel(targetElement) {
        ko.applyBindings(this, targetElement);
        $.support.cors = true;
        this.DialogDefinition = targetElement;
    }
    YesNoDialogViewModel.prototype.show = function (tableViewModel, recordToDelete) {
        this.TableViewModel = tableViewModel;
        this.recordToDelete = recordToDelete;
        $(this.DialogDefinition).modal('show');
    };

    YesNoDialogViewModel.prototype.primaryButtonClick = function () {
        this.TableViewModel.deleteRecord(this.recordToDelete);
        $(this.DialogDefinition).modal('hide');
    };
    return YesNoDialogViewModel;
})();

window.onload = function () {
    // Define VM for the yes/no dialog
    var yesnoDialog = document.getElementById('dlgYesNo');
    var yesnoDialogVM = new YesNoDialogViewModel(yesnoDialog);

    // Define VM for the new/edit record dialog
    var recordDialog = document.getElementById('dlgEditRecord');
    var recordDialogVM = new RecordDialogViewModel(recordDialog);

    // Define VM for main table
    var peopleList = document.getElementById('peopleList');
    var peopleListVM = new PersonTableViewModel(peopleList, recordDialogVM, yesnoDialogVM);
    peopleListVM.Load();
};
//# sourceMappingURL=personTable.js.map

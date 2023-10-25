sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/core/Messaging",
    "sap/ui/core/message/Message",
    "sap/ui/core/library",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    Fragment,
    Filter,
    FilterOperator,
    MessageBox,
    Messaging,
    Message,
    library
  ) {
    "use strict";

    let MessageType = library.MessageType;

    return Controller.extend("assignment1.controller.View", {
      onInit: function () {
        this.getView().setModel(Messaging.getMessageModel(), "message");
      },
      onMessagePopoverPress: function (oEvent) {
        let oSourceControl = oEvent.getSource();
        this._getMessagePopover().then(function (oMessagePopover) {
          oMessagePopover.openBy(oSourceControl);
        });
      },
      //################ Private APIs ###################
      _getMessagePopover: function () {
        let oView = this.getView();
        // create popover lazily (singleton)
        if (!this._pMessagePopover) {
          this._pMessagePopover = Fragment.load({
            id: oView.byId(),
            name: "assignment1.fragment.MessagePopover",
          }).then(function (oMessagePopover) {
            oView.addDependent(oMessagePopover);
            return oMessagePopover;
          });
        }
        return this._pMessagePopover;
      },
      // ------------------------ValueVendorHelp----------------------------------------//
      onValueVendorHelpRequest: function (oEvent) {
        let sInputValueVendor = oEvent.getSource().getValue();
        let oViewVendor = this.getView();

        if (!this._pValueHelpDialogVendor) {
          this._pValueHelpDialogVendor = Fragment.load({
            id: oViewVendor.byId("selectDialog1"),
            name: "assignment1.fragment.ValueVendorHelpDialog",
            controller: this,
          }).then(function (oDialogVendor) {
            oViewVendor.addDependent(oDialogVendor);
            return oDialogVendor;
          });
        }
        this._pValueHelpDialogVendor.then(function (oDialogVendor) {
          oDialogVendor
            .getBinding("items")
            .filter([
              new Filter(
                "Vendor/code",
                FilterOperator.Contains,
                sInputValueVendor
              ),
            ]);
          oDialogVendor.open(sInputValueVendor);
        });
      },
      onValueVendorHelpSearch: function (oEvent) {
        let sValueVendor = oEvent.getParameter("value");
        let oFilterVendor = new Filter(
          "Vendor/code",
          FilterOperator.Contains,
          sValueVendor
        );
        oEvent.getSource().getBinding("items").filter([oFilterVendor]);
      },

      onValueVendorHelpClose: function (oEvent) {
        let oSelectedItemVendor = oEvent.getParameter("selectedItem");
        oEvent.getSource().getBinding("items").filter([]);
        if (!oSelectedItemVendor) {
          return;
        }
        this.byId("LIFNR001").setValue(oSelectedItemVendor.getTitle());
      },
      // ------------------------PersonInChargeOfSchedule----------------------------------------//
      onPersonInChargeOfSchedule: function (oEvent) {
        let sInputValueSchedule = oEvent.getSource().getValue(),
          oView = this.getView();
        if (!this._pValueHelpDialogSchedule) {
          this._pValueHelpDialogSchedule = Fragment.load({
            id: oView.byId("selectDialog2"),
            name: "assignment1.fragment.PersonInChargeOfSchedule",
            controller: this,
          }).then(function (_oDialogSchedule) {
            oView.addDependent(_oDialogSchedule);
            return _oDialogSchedule;
          });
        }
        this._pValueHelpDialogSchedule.then(function (_oDialogSchedule) {
          _oDialogSchedule
            .getBinding("items")
            .filter([
              new Filter(
                "PersonInChargeOfSchedule/code",
                FilterOperator.Contains,
                sInputValueSchedule
              ),
            ]);
          _oDialogSchedule.open(sInputValueSchedule);
        });
      },
      onPersonInChargeOfScheduleHelpSearch: function (oEvent) {
        let sValue = oEvent.getParameter("value");
        let oFilter = new Filter(
          "PersonInChargeOfSchedule/code",
          FilterOperator.Contains,
          sValue
        );
        oEvent.getSource().getBinding("items").filter([oFilter]);
      },
      onPersonInChargeOfScheduleHelpClose: function (oEvent) {
        let oSelectedItem = oEvent.getParameter("selectedItem");
        oEvent.getSource().getBinding("items").filter([]);
        if (!oSelectedItem) {
          return;
        }
        this.byId("ZNITTEITANTOSHA001").setValue(oSelectedItem.getTitle());
      },
      // ------------------------GroupMnDeliveryDL----------------------------------------//
      onGroupMnDeliveryDLDialog: function (oEvent) {
        let sInputValueGroupMn = oEvent.getSource().getValue(),
          oViewGroupMn = this.getView();

        if (!this._pValueHelpDialogGroupMn) {
          this._pValueHelpDialogGroupMn = Fragment.load({
            id: oViewGroupMn.byId("selectDialog3"),
            name: "assignment1.fragment.GroupMnDeliveryDLDialog",
            controller: this,
          }).then(function (oDialogGroupMn) {
            oViewGroupMn.addDependent(oDialogGroupMn);
            return oDialogGroupMn;
          });
        }
        this._pValueHelpDialogGroupMn.then(function (oDialogGroupMn) {
          oDialogGroupMn
            .getBinding("items")
            .filter([
              new Filter(
                "GroupMnDeliveryDL/code",
                FilterOperator.Contains,
                sInputValueGroupMn
              ),
            ]);
          oDialogGroupMn.open(sInputValueGroupMn);
        });
      },
      onGroupMnDeliveryDLHelpSearch: function (oEvent) {
        let sValue = oEvent.getParameter("value");
        let oFilter = new Filter(
          "GroupMnDeliveryDL/code",
          FilterOperator.Contains,
          sValue
        );
        oEvent.getSource().getBinding("items").filter([oFilter]);
      },
      onGroupMnDeliveryDLHelpClose: function (oEvent) {
        let oSelectedItemGroupMn = oEvent.getParameter("selectedItem");
        oEvent.getSource().getBinding("items").filter([]);
        if (!oSelectedItemGroupMn) {
          return;
        }
        this.byId("ZNOKIGRP001").setValue(oSelectedItemGroupMn.getTitle());
      },

      // ------------------------PersonInChargeOfDeliveryDL----------------------------------------//
      onPersonInChargeOfDeliveryDL: function (oEvent) {
        let sInputValue = oEvent.getSource().getValue(),
          oView = this.getView();

        if (!this._pValueHelpDialog) {
          this._pValueHelpDialog = Fragment.load({
            id: oView.byId("selectDialog4"),
            name: "assignment1.fragment.PersonInChargeOfDeliveryDL",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            return oDialog;
          });
        }
        this._pValueHelpDialog.then(function (oDialog) {
          oDialog
            .getBinding("items")
            .filter([
              new Filter(
                "PersonInChargeOfDeliveryDL/code",
                FilterOperator.Contains,
                sInputValue
              ),
            ]);
          oDialog.open(sInputValue);
        });
      },
      onPersonInChargeOfDeliveryDLHelpSearch: function (oEvent) {
        let sValue = oEvent.getParameter("value");
        let oFilter = new Filter(
          "PersonInChargeOfDeliveryDL/code",
          FilterOperator.Contains,
          sValue
        );
        oEvent.getSource().getBinding("items").filter([oFilter]);
      },

      onPersonInChargeOfDeliveryDLHelpClose: function (oEvent) {
        let oSelectedItem = oEvent.getParameter("selectedItem");
        oEvent.getSource().getBinding("items").filter([]);
        if (!oSelectedItem) {
          return;
        }
        this.byId("ZNOKITANTOSHA001").setValue(oSelectedItem.getTitle());
      },
      //-------------------on Press Search Filter-------------//
      onPressSearchFilter: function () {
        let sPurchaseGr = this.getView().byId("EKGRP001").getValue();
        let sPlant = this.getView().byId("WERKS001").getValue();
        let sVendor = this.getView().byId("LIFNR001").getValue();
        let sSchedulePerson = this.getView()
          .byId("ZNITTEITANTOSHA001")
          .getValue();
        let sDeliveryDateManageGr = this.getView()
          .byId("ZNOKIGRP001")
          .getValue();
        let oDeliveryDLPerson = this.getView()
          .byId("ZNOKITANTOSHA001")
          .getValue();

        let aFilters = [];
        let filter1 = new Filter(
          "PurchaseGroup",
          FilterOperator.Contains,
          sPurchaseGr
        );
        aFilters.push(filter1);

        let filter2 = new Filter("Plant", FilterOperator.Contains, sPlant);
        aFilters.push(filter2);

        let filter3 = new Filter(
          "Vendor/code",
          FilterOperator.Contains,
          sVendor
        );
        aFilters.push(filter3);

        let filter4 = new Filter(
          "PersonInChargeOfSchedule/code",
          FilterOperator.Contains,
          sSchedulePerson
        );
        aFilters.push(filter4);

        let filter5 = new Filter(
          "GroupMnDeliveryDL/code",
          FilterOperator.Contains,
          sDeliveryDateManageGr
        );
        aFilters.push(filter5);

        let filter6 = new Filter(
          "PersonInChargeOfDeliveryDL/code",
          FilterOperator.Contains,
          oDeliveryDLPerson
        );
        aFilters.push(filter6);

        let oTableBinding = this.getView().byId("idTables").getBinding("rows");

        let oMessage = new Message({
          message:
            "購買グループ、プラント、仕入先のいずれかを指定して検索してください。",
          description:
            "Vui lòng chỉ định một trong các item purchase group (購買グループ)、plant (プラント)、vendor (仕入先) và tìm kiếm",
          type: MessageType.Error,
          target: "/",
          processor: this.getView().getModel(),
        });

        if (
          !sPurchaseGr &&
          !sPlant &&
          !sVendor &&
          !sSchedulePerson &&
          !sDeliveryDateManageGr &&
          !oDeliveryDLPerson
        ) {
          Messaging.addMessages(oMessage);
          MessageBox.error(
            "購買グループ、プラント、仕入先のいずれかを指定して検索してください。\n Vui lòng chỉ định một trong các item purchase group (購買グループ)、plant (プラント)、vendor (仕入先) và tìm kiếm"
          );
        } else {
          oTableBinding.filter(aFilters);
        }
      },
      //-------------------on Clear Search Filter-------------//
      onClearSearchFilter: function () {
        this.getView().byId("EKGRP001").setValue("");
        this.getView().byId("WERKS001").setValue("");
        this.getView().byId("LIFNR001").setValue("");
        this.getView().byId("ZNITTEITANTOSHA001").setValue("");
        this.getView().byId("ZNOKIGRP001").setValue("");
        this.getView().byId("ZNOKITANTOSHA001").setValue("");
        this.getView().byId("idTables").getBinding("rows").filter([]);
      },
      //-------------------on Add Row Table-------------//
      onAddRowTable: function () {
        const newData = {
          ID: 12,
          PurchaseGroup: "",
          Plant: "",
          Vendor: {
            code: "",
            name: "",
          },
          PersonInChargeOfSchedule: {
            code: "",
            name: "",
          },
          GroupMnDeliveryDL: {
            code: "",
            name: "",
          },
          PersonInChargeOfDeliveryDL: {
            code: "",
            name: "",
          },
        };
        this.getView()
          .getModel("data")
          .getProperty("/Collection")
          .push(newData);
        this.byId("idTables").getBinding("rows").refresh();
      },
      //-------------------on Delete Row Table-------------//
      onDeleteRowTable: function () {
        let oTable = this.byId("idTables");
        let aSelectedIndices = oTable.getSelectedIndices();
      },
      //--------------------Regist-------------------------//
      onRegisted: function (oEvent) {
        let oTable = this.byId("idTables");
        let iIndex = oTable.getSelectedIndex();
        let sMsg;
        if (iIndex < 0) {
          sMsg = "no item selected";
        } else {
          sMsg = oTable.getContextByIndex(iIndex);
        }
        alert(iIndex);
      },
    });
  }
);

sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/BindingMode",
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
    JSONModel,
    MessageBox,
    BindingMode,
    Messaging,
    Message,
    library
  ) {
    "use strict";

    // shortcut for sap.ui.core.MessageType
    let MessageType = library.MessageType;

    return Controller.extend("assignment1.controller.View", {
      onInit: function () {
        // this.onReadteData();
        let oModel, oView;
        oView = this.getView();
        // set message model
        oView.setModel(Messaging.getMessageModel(), "message");
        // or just do it for the whole view
        Messaging.registerObject(oView, true);
        // create a default model with somde demo data

        // oModel = new JSONModel({
        //   MandatoryInputValue: "",
        //   DateValue: null,
        //   IntegerValue: undefined,
        //   Dummy: "",
        // });
        // oModel.setDefaultBindingMode(BindingMode.TwoWay);
        // oView.setModel(oModel);
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
            id: oView.getId(),
            name: "assignment1.fragment.MessagePopover",
          }).then(function (oMessagePopover) {
            oView.addDependent(oMessagePopover);
            return oMessagePopover;
          });
        }
        return this._pMessagePopover;
      },
      // onReadteData: function () {
      //   let oDataModel = this.getOwnerComponent().getModel();
      //   let oJSONModel = new JSONModel();
      //   let oBusyDialog = new sap.m.BusyDialog({
      //     text: "Please wait...",
      //     customIcon: "loading.png",
      //   });
      //   oBusyDialog.open();
      //   oDataModel.read("/Employees", {
      //     success: function (oresponse) {
      //       oJSONModel.setProperty("/Employees", oresponse.results);
      //       console.log(oresponse);
      //       this.getView().setModel(oJSONModel, "oPOJSONModel");
      //       oBusyDialog.close();
      //     }.bind(this),
      //     error: function (oError) {
      //       oBusyDialog.close();
      //     }.bind(this),
      //   });
      // },

      // ------------------------ValueVendorHelp----------------------------------------//
      onValueVendorHelpRequest: function (oEvent) {
        let sInputValueVendor = oEvent.getSource().getValue(),
          oViewVendor = this.getView();

        if (!this._pValueHelpDialogVendor) {
          this._pValueHelpDialogVendor = Fragment.load({
            id: oViewVendor.getId("selectDialog1"),
            name: "assignment1.fragment.ValueVendorHelpDialog",
            controller: this,
          }).then(function (oDialogVendor) {
            oViewVendor.addDependent(oDialogVendor);
            return oDialogVendor;
          });
        }
        this._pValueHelpDialogVendor.then(function (oDialogVendor) {
          // Create a filter for the binding
          oDialogVendor
            .getBinding("items")
            .filter([
              new Filter(
                "Vendor/code",
                FilterOperator.Contains,
                sInputValueVendor
              ),
            ]);
          // Open ValueHelpDialog filtered by the input's value
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
            id: oView.getId("selectDialog2"),
            name: "assignment1.fragment.PersonInChargeOfSchedule",
            controller: this,
          }).then(function (_oDialogSchedule) {
            oView.addDependent(_oDialogSchedule);
            return _oDialogSchedule;
          });
        }
        this._pValueHelpDialogSchedule.then(function (_oDialogSchedule) {
          // Create a filter for the binding
          _oDialogSchedule
            .getBinding("items")
            .filter([
              new Filter(
                "PersonInChargeOfSchedule/code",
                FilterOperator.Contains,
                sInputValueSchedule
              ),
            ]);
          // Open ValueHelpDialog filtered by the input's value
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
            id: oViewGroupMn.getId("selectDialog3"),
            name: "assignment1.fragment.GroupMnDeliveryDLDialog",
            controller: this,
          }).then(function (oDialogGroupMn) {
            oViewGroupMn.addDependent(oDialogGroupMn);
            return oDialogGroupMn;
          });
        }
        this._pValueHelpDialogGroupMn.then(function (oDialogGroupMn) {
          // Create a filter for the binding
          oDialogGroupMn
            .getBinding("items")
            .filter([
              new Filter(
                "GroupMnDeliveryDL/code",
                FilterOperator.Contains,
                sInputValueGroupMn
              ),
            ]);
          // Open ValueHelpDialog filtered by the input's value
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
            id: oView.getId("selectDialog4"),
            name: "assignment1.fragment.PersonInChargeOfDeliveryDL",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            return oDialog;
          });
        }
        this._pValueHelpDialog.then(function (oDialog) {
          // Create a filter for the binding
          oDialog
            .getBinding("items")
            .filter([
              new Filter(
                "PersonInChargeOfDeliveryDL/code",
                FilterOperator.Contains,
                sInputValue
              ),
            ]);
          // Open ValueHelpDialog filtered by the input's value
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
      onPressSearchFilter: function (oEvent) {
        let oIn1 = this.getView().byId("EKGRP001").getValue();
        let oIn2 = this.getView().byId("WERKS001").getValue();
        let oIn3 = this.getView().byId("LIFNR001").getValue();
        let oIn4 = this.getView().byId("ZNITTEITANTOSHA001").getValue();
        let oIn5 = this.getView().byId("ZNOKIGRP001").getValue();
        let oIn6 = this.getView().byId("ZNOKITANTOSHA001").getValue();
        // console.log(oIn1, oIn2, oIn3, oIn4, oIn5, oIn6);

        let filter1 = new Filter(
          "PurchaseGroup",
          FilterOperator.Contains,
          oIn1
        );
        let filter2 = new Filter("Plant", FilterOperator.Contains, oIn2);
        let filter3 = new Filter("Vendor/code", FilterOperator.Contains, oIn3);
        let filter4 = new Filter(
          "PersonInChargeOfSchedule/code",
          FilterOperator.Contains,
          oIn4
        );
        let filter5 = new Filter(
          "GroupMnDeliveryDL/code",
          FilterOperator.Contains,
          oIn5
        );
        let filter6 = new Filter(
          "PersonInChargeOfDeliveryDL/code",
          FilterOperator.Contains,
          oIn6
        );
        let oTable = this.getView().byId("idTables");
        let binding = oTable.getBinding("rows");

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
          oIn1 === "" &&
          oIn2 === "" &&
          oIn3 === "" &&
          oIn4 === "" &&
          oIn5 === "" &&
          oIn6 === ""
        ) {
          Messaging.addMessages(oMessage);
          MessageBox.error(
            "購買グループ、プラント、仕入先のいずれかを指定して検索してください。\n Vui lòng chỉ định một trong các item purchase group (購買グループ)、plant (プラント)、vendor (仕入先) và tìm kiếm"
          );
        } else {
          if (oIn1) {
            binding.filter([filter1]);
          }
          if (oIn2) {
            binding.filter([filter2]);
          }
          if (oIn3) {
            binding.filter([filter3]);
          }
          if (oIn4) {
            binding.filter([filter4]);
          }
          if (oIn5) {
            binding.filter([filter5]);
          }
          if (oIn6) {
            binding.filter([filter6]);
          }
        }
      },
      //-------------------on Clear Search Filter-------------//
      onClearSearchFilter: function (oEvent) {
        let oIn1 = this.getView().byId("EKGRP001");
        let oIn2 = this.getView().byId("WERKS001");
        let oIn3 = this.getView().byId("LIFNR001");
        let oIn4 = this.getView().byId("ZNITTEITANTOSHA001");
        let oIn5 = this.getView().byId("ZNOKIGRP001");
        let oIn6 = this.getView().byId("ZNOKITANTOSHA001");

        oIn1.setValue("");
        oIn2.setValue("");
        oIn3.setValue("");
        oIn4.setValue("");
        oIn5.setValue("");
        oIn6.setValue("");
        let oTable = this.getView().byId("idTables");
        let binding = oTable.getBinding("rows");
        binding.filter();
      },
      //-------------------on Add Row Table-------------//
      onAddRowTable: function (oEvent) {
        const newData = {
          ID: 1,
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
      onDeleteRowTable: function (oEvent) {
        let oTable = this.byId("idTables");
        let aSelectedIndices = oTable.getSelectedIndices();
        let oModel = oTable.getBinding().getModel("data");
        if (aSelectedIndices.length === 0) {
          return;
        }

        // Cut the data.
        for (let i = 0; i < aSelectedIndices.length; i++) {
          let oContext = oTable.getContextByIndex(aSelectedIndices[i]);
          let oData = oContext.getProperty("/Collection");

          if (oData) {
            this._aClipboardData.push(oContext.getProperty());

            // The property is simply set to undefined to preserve the tree state (expand/collapse states of nodes).
            oModel.setProperty(oContext.getPath(), undefined, oContext, true);
          }
        }

        if (this._aClipboardData.length > 0) {
          this.byId("paste").setEnabled(true);
        }
      },
      //--------------------Regist-------------------------//
      onRegisted: function (oEvent) {
        // let oMessage = new Message({
        //   message: "生成されたエラーメッセージが含まれます",
        //   description: "Chứa thông báo lỗi được tạo",
        //   type: MessageType.Error,
        //   target: "/",
        //   processor: this.getView().getModel(),
        // });
        // // let & const
        // let oTable = this.getView().byId("idTables");
        // let selectedData = [];
        // let aIndices = oTable.getSelectedIndices();
        // // let oSelectedItems = this.getView().getModel("data");
        // console.log("rows selected", aIndices);
        // if (aIndices.length < 1) {
        //   MessageBox.error(
        //     "登録に失敗しました、エラーを確認してください。\n Đăng ký thất bại, vui lòng xác nhận error"
        //   );
        //   Messaging.addMessages(oMessage);
        //   return;
        // } else {
        //   for (let i = 0; i < aIndices.length; i++) {
        //     let tableContext = oTable.getContextByIndex(aIndices[i]);
        //     console.log(tableContext);
        //     let data = oTable.getModel().getProperty(tableContext.getPath());
        //     selectedData.push(data);
        //   }
        // }
      },
    });
  }
);

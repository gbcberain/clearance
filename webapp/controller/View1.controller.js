var empId = "";
var type = "";
var name = "";
var request = "";
var position = "";
var dept = "";
var area = "";
var company = "";
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessagePopover',
	'sap/m/MessagePopoverItem'
], function (Controller, MessagePopover, MessagePopoverItem) {
	"use strict";

	return Controller.extend("zhr_clearance.zclearance.controller.View1", {
		onInit: function () {

		},
		onSubmit: function (oEvent) {
			debugger;
			var Pernr = oEvent.getSource().getValue();
			empId = this.getView().byId("idEmpid").getValue();
			var that = this;

			var oModel = that.getOwnerComponent().getModel();
			var sPath = "/empDetailsSet('" + Pernr + "')";

			oModel.read(sPath, {
				success: function (oData, response) {
					var oModel3 = new sap.ui.model.json.JSONModel(oData);
					var osf = that.getView().byId("idClearanceForm1");
					osf.setModel(oModel3);
					name = oData.Name;
					position = oData.Jobtitle;
					dept = oData.Department;
					area = oData.Zarea;
					company = oData.Zcompany;
				},
				error: function () {

					sap.m.MessageToast.show("No Data retreived");
				}

			});

		},

		onChange: function (oEvent) {

			debugger;
			var that = this;
			var that1 = this;

			// var leaveType = this.getView().byId("CB").getValue();
			type = oEvent.getSource().getSelectedKey();

		},

		onSave: function () {
			
			debugger;
			
			var date = this.getView().byId("DP1").getValue();
			
			if ( type !== "" & date !== ""){
			
			

			var that = this;

			var oModel = that.getOwnerComponent().getModel();

			var Entry = {
				Pernr: empId,
				Zname: name,
				Zposition: position,
				Zdepartment: dept,
				Zarea: area,
				Zcompany: company,
				Zdate: date,
				Zitem: type
			};

			oModel.create("/clearanceRequestSet",
				Entry, {
					success: function (data) {
						debugger;
						if (data.Zduplicate == 'X'){
							
							sap.m.MessageToast.show("A Request is already in process of approval, cannot submit new request", {
							duration: 3000, // default
							width: "15em", // default
							my: "CenterTop", // default
							at: "CenterTop", // default
							of: window, // default
							offset: "0 0", // default
							collision: "fit fit", // default
							onClose: null, // default
							autoClose: true, // default
							animationTimingFunction: "ease", // default
							animationDuration: 1000, // default
							closeOnBrowserNavigation: true // default
						});
						location.reload();
							
						} else if (data.Zduplicate != 'X'){
						sap.m.MessageToast.show("Clearance Request Submitted", {
							duration: 3000, // default
							width: "15em", // default
							my: "CenterTop", // default
							at: "CenterTop", // default
							of: window, // default
							offset: "0 0", // default
							collision: "fit fit", // default
							onClose: null, // default
							autoClose: true, // default
							animationTimingFunction: "ease", // default
							animationDuration: 1000, // default
							closeOnBrowserNavigation: true // default
						});
						location.reload();
						}
					},
					error: function (oError) {
						debugger;
						sap.m.MessageToast.show("Error while submitting the request. Please try again", {
							duration: 3000, // default
							width: "15em", // default
							my: "CenterTop", // default
							at: "CenterTop", // default
							of: window, // default
							offset: "0 0", // default
							collision: "fit fit", // default
							onClose: null, // default
							autoClose: true, // default
							animationTimingFunction: "ease", // default
							animationDuration: 1000, // default
							closeOnBrowserNavigation: true // default
						});

					}

				});

		} else {
			sap.m.MessageToast.show("Please enter mandatory clearance details", {
							duration: 3000, // default
							width: "15em", // default
							my: "CenterTop", // default
							at: "CenterTop", // default
							of: window, // default
							offset: "0 0", // default
							collision: "fit fit", // default
							onClose: null, // default
							autoClose: true, // default
							animationTimingFunction: "ease", // default
							animationDuration: 1000, // default
							closeOnBrowserNavigation: true // default
						});
		}
		}
	});
});
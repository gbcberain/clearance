/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"zhr_clearance/zclearance/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"zhr_clearance/zclearance/test/integration/pages/View1",
	"zhr_clearance/zclearance/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "zhr_clearance.zclearance.view.",
		autoWait: true
	});
});
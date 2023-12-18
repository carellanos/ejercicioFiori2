/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"flight_search/flights/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});

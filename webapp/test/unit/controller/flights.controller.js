/*global QUnit*/

sap.ui.define([
	"flight_search/flights/controller/flights.controller"
], function (Controller) {
	"use strict";

	QUnit.module("flights Controller");

	QUnit.test("I should test the flights controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

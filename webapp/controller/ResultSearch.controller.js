sap.ui.define([
    "sap/ui/core/mvc/Controller",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        
  
        return Controller.extend("flightsearch.flights.controller.ResultSearch", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("TargetResultSearchView").attachMatched(this._onObjectMatched, this);

            },

            _onObjectMatched: function (oEvent) {
                let oArgs, oView;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();

                oView.bindElement({
                    path: `flights>/${oArgs.flightId}`
                })

                /*this.getView().bindElement({
                    path: "/" + oEvent.getParameter("arguments").flightId,
                    model: "flights"
                });*/

            }
            
            
        });
    });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

  
        return Controller.extend("flightsearch.flights.controller.ResultSearch", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("TargetResultSearchView").attachMatched(this._onObjectMatched, this);
        
            },

            _onObjectMatched: function (oEvent) {
                let oArgs, oView;
                oArgs = oEvent.getParameter("arguments");
                let valor = oArgs.flightId - 1;
                oView = this.getView();

                oView.bindElement({
                    path: `flights>/${valor}`
                })

            },

            addStileView: function(){

                let NumericCont1 = this.byId('numCont1');
                let NumericCont2 = this.byId('numCont2');
                let NumericCont3 = this.byId('numCont3');
                NumericCont1.addStyleClass("sapMNCValue");
                NumericCont2.addStyleClass("sapMNCValue");
                NumericCont3.addStyleClass("sapMNCValue");
            },

            addStileView2: function(){

                let TileCont1 = this.byId('tCont1');
                let TileCont2 = this.byId('tCont2');
                let TileCont3 = this.byId('tCont3');
                TileCont1.addStyleClass("sapMTileCntFooterTextColorNeutral");
                TileCont2.addStyleClass("sapMTileCntFooterTextColorNeutral");
                TileCont3.addStyleClass("sapMTileCntFooterTextColorNeutral");
            },

            onDialog1: function(){
                MessageToast.show("Comprar!");
                
            }

        });
    });

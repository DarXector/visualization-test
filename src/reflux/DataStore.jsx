var Reflux = require('reflux');
var HTTP = require('../services/HttpService');
var ChartActions = require('./Actions.jsx');

/**
 * Store for handling App data loaded from the server.constructor
 * @namespace DataStore
 */
var DataStore = Reflux.createStore({

    listenables: [ChartActions],
    data:{},

    /**
     * @memberof DataStore
     * Getting data from the server
     */
    getData: function(){

        HTTP.get('/data')
            .then(function(json){
                this.data = json;
                this.fireUpdate();
            }.bind(this));
    },

    fireUpdate: function(){
        this.trigger('change', this.data);
    }
});

module.exports = DataStore;
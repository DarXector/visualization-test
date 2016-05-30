var React = require('react');
var Reflux = require('reflux');
var Chart = require('./Chart.jsx');
var Counters = require('./Counters.jsx').Counters;
var countMoreOrLess = require('../util/countMoreOrLess');
var ChartActions = require('../reflux/Actions.jsx');
var DataStore = require('../reflux/DataStore.jsx');

/**
 * https://www.npmjs.com/package/rc-slider
 */
var Slider = require('rc-slider');

/**
 * App containing Chart, Counters and Slider components, with states for the whole app
 * @type {*|Function}
 * @namespace App
 */
var App = React.createClass({

    mixins:[Reflux.listenTo(DataStore, 'onChange')],

    propTypes: {
        width:      React.PropTypes.number,
        height:     React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            width:  600,
            height: 400
        }
    },

    getInitialState: function() {
        return {
            data: [],
            domain: {x: [0, 1], y: [0, 1]},
            ruleValue: 0.5,
            more: 0,
            less: 0
        };
    },

    componentWillMount: function() {
        this.refreshData();
    },

    /**
     * Reloads the data from the server
     * @memberof App
     */
    refreshData: function() {
        ChartActions.getData();
    },

    /**
     * Server data loaded, updating App state with it
     * @param event
     * @param data
     * @memberof App
     */
    onChange: function(event, data) {
        this.setState({
            data: data
        });
        this.update(this.state.ruleValue);
    },

    /**
     * Vertical rule value has changed, get number of nodes bellow and above that value and update App state
     * @param value
     * @memberof App
     */
    update: function(value) {
        var count = countMoreOrLess(this.state.data, value);
        this.setState({
            ruleValue: value,
            more: count.more,
            less: count.less
        });
    },

    render: function() {

        var controlsStyle = {
            width: this.props.width,
            height: this.props.height
        };

        return (
            <div style={controlsStyle}>
                <div className="row">
                    <Chart
                        width = {this.props.width}
                        height = {this.props.height}
                        data={this.state.data}
                        domain={this.state.domain}
                        value={this.state.ruleValue}
                        onChange={this.update}/>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Counters
                            more={this.state.more}
                            less={this.state.less}
                            />
                    </div>
                    <div className="col-sm-6">
                        <Slider
                            onChange={this.update}
                            value={this.state.ruleValue}
                            min={0}
                            max={1}
                            step={0.01} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <button className="btn btn-primary" onClick={this.refreshData}>REFRESH</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
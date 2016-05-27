var React = require('react');
var Slider = require('rc-slider');
var Chart = require('./Chart.jsx');
var Counters = require('./Counters.jsx').Counters;
var countMoreOrLess = require('../util/countMoreOrLess');

var getRandomSampleData = function(nodeNumber)
{
    var data = [];

    for(var i = 0; i < nodeNumber; i++)
    {
        data.push({
            id: Math.random()*10000,
            x: Math.random(),
            y: Math.random()
        });
    }

    return data;
};

var App = React.createClass({

    propTypes: {
        width:      React.PropTypes.number,
        height:     React.PropTypes.number
    },

    getDefaultProps: function(){
        return {
            width:  600,
            height: 400
        }
    },

    getInitialState: function()
    {
        return {
            data: getRandomSampleData(100),
            domain: {x: [0, 1], y: [0, 1]},
            ruleValue: 0.5,
            more: 0,
            less: 0
        };
    },

    componentWillMount: function(){
        this.update(this.state.ruleValue);
    },

    handleSliderChange: function(value){
        this.update(value);
    },

    handleChartChange: function(value){
        this.update(value);
    },

    update: function(value){
        var count = countMoreOrLess(this.state.data, value);
        this.setState({
            ruleValue: value,
            more: count.more,
            less: count.less
        });
    },


    render: function(){

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
                        ruleValue={this.state.ruleValue}
                        onChange={this.handleChartChange}/>
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
                            onChange={this.handleSliderChange}
                            value={this.state.ruleValue}
                            min={0}
                            max={1}
                            step={0.01} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
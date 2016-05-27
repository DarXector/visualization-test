var React = require('react');
var d3 = require('d3');
var ScatterPlot = require('./ScatterPlot.jsx');
var XYAxis = require('./XYAxis.jsx').XYAxis;
var Rule = require('./Rule.jsx');
var Dragging = require('./../mixins/Dragging.jsx');

var Chart = React.createClass({

    mixins:[Dragging],

    propTypes: {
        width:      React.PropTypes.number,
        height:     React.PropTypes.number,
        radius:     React.PropTypes.number,
        ruleValue:  React.PropTypes.number,
        margin:     React.PropTypes.object,
        data:       React.PropTypes.array.isRequired,
        domain:     React.PropTypes.object.isRequired,
        onChange:   React.PropTypes.func.isRequired
    },

    getDefaultProps: function(){
        return {
            width:  600,
            height: 400,
            margin: {top: 20, right: 20, bottom: 30, left: 40}
        }
    },

    getInitialState: function(){
        return {
            ruleValue: 0.5
        }
    },

    onDrag: function(e){
        var margin = this.props.margin,
            x = e.nativeEvent.offsetX - margin.left,
            width = this.props.width - margin.left - margin.right;

        if(x >= 0 && x <= width){
            this.props.onChange(Math.round(x / width * 100) / 100);
        }
    },

    render: function() {
        var
            margin = this.props.margin,
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;

        var scales = function() {
            var x = d3.scale.linear()
                .range([0, width])
                .domain(this.props.domain.x);

            var y = d3.scale.linear()
                .range([height, 0])
                .domain(this.props.domain.y);

            return {x: x, y: y};
        }.bind(this);

        var transform = "translate(" + margin.left +"," + margin.top +")";

        return (
            <div className="Chart"
                 onMouseDown={this.onMouseDown}
                 onMouseMove={this.onMouseMove}
                >
                <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
                    <g transform={transform}>
                        <ScatterPlot
                            scales={scales()}
                            data={this.props.data}
                            width={width}
                            height={height}
                            radius={this.props.radius}
                            xValue={this.props.ruleValue}
                            />
                        <XYAxis height={height} scales={scales()} />
                    </g>
                </svg>
                <Rule height={height} margin={margin} xPos={this.props.ruleValue * width} value={this.props.ruleValue} />
            </div>
        );
    }
});

module.exports = Chart;
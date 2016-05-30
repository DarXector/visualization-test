var React = require('react');

/**
 * Scatter plot graph representing data values with round nodes.
 * @type {*|Function}
 * @namespace ScatterPlot
 */
var ScatterPlot = React.createClass({

    propTypes: {
        data:   React.PropTypes.array.isRequired,
        scales: React.PropTypes.object.isRequired,
        radius: React.PropTypes.number,
        xValue: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            radius: 6,
            xValue: 0
        };
    },

    render: function(){

        // Draw circles depending on the value of the node (larger, same or smaller than the rule value)
        var renderCircles = function(coords) {

            var className = coords.x > this.props.xValue? "more" : "less";

            return <circle className={className}
                            key={coords.x+coords.y}
                            cx={this.props.scales.x(coords.x)}
                            cy={this.props.scales.y(coords.y)}
                            r={this.props.radius}/>;
        }.bind(this);

        return (
            <g>{ this.props.data.map(renderCircles) }</g>
        );
    }

});

module.exports = ScatterPlot;


var React = require('react');

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


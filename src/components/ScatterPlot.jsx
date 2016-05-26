var React = require('react');

var ScatterPlot = React.createClass({

    propTypes: {
        data:   React.PropTypes.array.isRequired,
        scales: React.PropTypes.object.isRequired,
        radius: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            radius: 4
        };
    },

    render: function(){

        var renderCircles = function(coords) {
            return <circle  key={coords.x+coords.y}
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


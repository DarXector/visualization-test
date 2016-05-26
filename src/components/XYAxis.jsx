var React = require('react');
var d3 = require('d3');

var Axis = React.createClass({

    propTypes: {
        scale:      React.PropTypes.func.isRequired,
        orient:     React.PropTypes.string.isRequired,
        translate:  React.PropTypes.string,
        ticks:      React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            translate:  '',
            ticks: 5
        }
    },

    componentDidMount: function() {
        this.renderAxis();
    },

    componentDidUpdate: function() {
        this.renderAxis();
    },

    renderAxis() {
        var node  = this.refs.axis;
        var axis = d3.svg.axis().orient(this.props.orient).ticks(this.props.ticks).scale(this.props.scale);
        d3.select(node).call(axis);
    },

    render: function() {
        return(
            <g className="axis" ref="axis" transform={this.props.translate}></g>
        );
    }
});

var XYAxis = React.createClass({

    propTypes: {
        scales: React.PropTypes.object.isRequired,
        height: React.PropTypes.number.isRequired
    },

    render: function() {

        var xSettings = {
            translate: 'translate(0, ' + this.props.height + ')',
            scale: this.props.scales.x,
            orient: 'bottom',
            ticks: 3
        };
        var ySettings = {
            scale: this.props.scales.y,
            orient: 'left',
            ticks: 1
        };

        return(
            <g>
                <Axis translate={xSettings.translate} scale={xSettings.scale} orient={xSettings.orient} ticks={xSettings.ticks}/>
                <Axis scale={ySettings.scale} orient={ySettings.orient} ticks={ySettings.ticks}/>
            </g>
        );

    }
});

module.exports = {
    XYAxis: XYAxis,
    Axis: Axis
};
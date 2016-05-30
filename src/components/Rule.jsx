var React = require('react');
var d3 = require('d3');

/**
 * Vertical Rule line
 * @type {*|Function}
 * @namespace Rule
 */
var Rule = React.createClass({

    propTypes: {
        height: React.PropTypes.number.isRequired,
        margin: React.PropTypes.object.isRequired,
        xPos: React.PropTypes.number,
        value: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            xPos: 0,
            value: 0
        }
    },

    render: function() {

        var ruleStyle = {
            left: this.props.margin.left + this.props.xPos,
            top: this.props.margin.top,
            height: this.props.height
        };

        return (
            <div style={ruleStyle} className="rule">
                <span>{this.props.value}</span>
            </div>
        );
    }
});

module.exports = Rule;
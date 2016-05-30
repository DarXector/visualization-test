var React = require('react');

/**
 * View component for the Chart nodes counting.
 * Contains two instances of the Counter component, one for nodes with bigger and same values,
 * one for smaller values than the rule value
 * @type {*|Function}
 * @namespace Counters
 */
var Counters = React.createClass({

    propTypes: {
        more:   React.PropTypes.number,
        less:  React.PropTypes.number
    },

    getDefaultProps: function(){
        return {
            more: 0,
            less: 0
        }
    },

    render: function(){
        return(
            <div>
                <div className="row">
                    <Counter nodeClass={'more'} value={this.props.more} />
                </div>
                <div className="row">
                    <Counter nodeClass={'less'} value={this.props.less} />
                </div>
            </div>
        );
    }

});

/**
 * Single counter component.
 * @type {*|Function}
 * @namespace Counter
 * @memberof Counters
 */
var Counter = React.createClass({

    propTypes: {
        nodeClass:  React.PropTypes.string,
        radius:     React.PropTypes.number,
        value:      React.PropTypes.number
    },

    getDefaultProps: function(){
        return {
            nodeClass:  '',
            radius: 6,
            value: 0
        }
    },

    render: function(){

        var counterStyle={
            height: this.props.radius * 3
        };
        var centerPos = this.props.radius * 1.5;

        return(
            <div style={counterStyle} className="counter">
                <svg    width={this.props.radius * 3}
                        height={this.props.radius * 3}>
                    <circle className={this.props.nodeClass}
                             r={this.props.radius}
                             cx={centerPos}
                             cy={centerPos} />
                </svg>
                <div>{this.props.value}</div>
            </div>
        );
    }

});

module.exports = {
    Counters: Counters,
    Counter: Counter
};
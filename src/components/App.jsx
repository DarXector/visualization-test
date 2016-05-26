var React = require('react');
var Chart = require('./Chart.jsx');

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

var App = React.createClass(
    {
    getInitialState: function()
    {
        return {
            data: getRandomSampleData(100),
            domain: {x: [0, 1], y: [0, 1]}
        };
    },

    render: function()
    {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Chart
                        data={this.state.data}
                        domain={this.state.domain} />
                </div>
            </div>
        );
    }
});

module.exports = App;
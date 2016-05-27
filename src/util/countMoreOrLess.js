var countMoreOrLess = function(data, value){
    var more = data.filter(function(item) { return item.x >= value }).length;
    var less = data.length - more;
    return{more: more, less: less}
};

module.exports = countMoreOrLess;
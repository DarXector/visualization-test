/**
 * Takes array of objects with {x,y} format, and a reference value
 * Returns object with number of objects that have x value greater or smaller than the reference value
 * @param data
 * @param value
 * @returns {{more: *, less: number}}
 */
var countMoreOrLess = function(data, value){
    var more = data.filter(function(item) { return item.x >= value }).length;
    var less = data.length - more;
    return{more: more, less: less}
};

module.exports = countMoreOrLess;
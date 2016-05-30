/**
 * Intended as a reusable dragging logic to be added to components using mixins
 * @type {{componentDidMount: Function, getInitialState: Function, onMouseDown: Function, onMouseUp: Function, onMouseMove: Function}}
 */
var Dragging = {

    componentDidMount: function () {
        window.addEventListener('mouseup', this.onMouseUp, false);
    },

    getInitialState: function(){
        return {
            dragging: false
        }
    },

    onMouseDown: function(){
        this.setState({
            dragging: true
        })
    },


    onMouseUp: function(){
        this.setState({
            dragging: false
        })
    },

    onMouseMove: function(e){
        if(this.state.dragging){
            this.onDrag(e);
        }
        e.stopPropagation();
        e.preventDefault();
    }
};

module.exports = Dragging;
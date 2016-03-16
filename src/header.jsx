var React = require('react');

module.exports = React.createClass({

//initializing empty string for input
  getInitialState: function (){
    return {
      text: ''
    }
  },
    render:function() {
    return <div className="input-group">
      <input
      value={this.state.text}  //showing current value
      onChange={this.handleInputChange}  //on typing, value changes
      type="text" className="form-control" />
      <span className="input-group-btn">
          <button
          onClick={this.handleClick}
          className="btn btn-default"
          type="button">
            Add
          </button>
        </span>
    </div>

  },
  handleClick: function(){
    //send value of input to firebase
    this.props.itemStore.push({
      text: this.state.text,
      done: false
    });
    this.setState({text: ''});
    //cleaning up after so the field is blank
  },
  handleInputChange: function(event){
    this.setState({text: event.target.value});
  }
})

var React = require('react');
var ReactFire = require('reactfire');
var FireBase = require('firebase');
var rootUrl = 'https://scorching-fire-8932.firebaseio.com/';


module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + "items/" + this.props.item.key)
  },
  render: function () {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
        type="checkbox"
        checked={this.state.done}
        onChange={this.handleDoneChange} />
      </span>
      <input type="text"
        className="form-control"
        onChange={this.handleTextChange}
        value={this.state.text}
        />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
        className="btn btn-default"
        onClick={this.handleDeleteClick}>
          Delete
        </button>
      </span>
    </div>
  },
  changesButtons: function() {
    if (!this.state.textChanged){
      return null
    } else {
      return <span>
        <button className="btn btn-default">Save</button>
        <button className="btn btn-default">Undo</button>
      </span>
    }
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked}
    this.setState(update);
    this.fb.update(update);
  },

  handleDeleteClick: function() {
    this.fb.remove();
  },

  handleTextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    })
  }

});

var React = require('react');
var ReactFire = require('reactfire');
var FireBase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://scorching-fire-8932.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function () {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function(){
    this.firebase = new Firebase (rootUrl + 'items/');
    this.bindAsObject(this.firebase, 'items');
    this.firebase.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemStore={this.firebaseRefs.items} />
        <hr />
        <div className={"content " + (this.state.loaded? 'loaded' : '')}>
          <List items={this.state.items} />
          {this.deleteButton()}
        </div>
      </div>
    </div>
  },
  deleteButton: function() {
    if(!this.state.loaded){
      return
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button
          type="button"
          onClick={this.onDeleteConeClick}
          className="btn btn-default">
          Clear complete</button>
      </div>
    }
  },

  onDeleteConeClick: function() {
    for(var key in this.state.items) {
      if(this.state.items[key].done) {
        this.firebase.child(key).remove();
      }
    }
  },

  handleDataLoaded: function () {
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));

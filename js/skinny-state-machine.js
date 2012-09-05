// Generated by CoffeeScript 1.3.3
/*
 Skinny Coffee Machine - a simple state machine written in CoffeeScript

 Copyright (c) 2012 Fred Wu

 Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php

 See the test file for usage examples.
*/

var SkinnyCoffeeMachine,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

window.SkinnyCoffeeMachine = SkinnyCoffeeMachine;

SkinnyCoffeeMachine = (function() {

  function SkinnyCoffeeMachine(states) {
    this.states = states != null ? states : {};
    this.__previousState = null;
    this.__currentState = this.defaultState();
  }

  SkinnyCoffeeMachine.prototype.defaultState = function() {
    return this.states["default"];
  };

  SkinnyCoffeeMachine.prototype.previousState = function() {
    return this.__previousState;
  };

  SkinnyCoffeeMachine.prototype.currentState = function() {
    return this.__currentState;
  };

  SkinnyCoffeeMachine.prototype.allStates = function() {
    var event, state, _allStates;
    _allStates = [];
    for (event in this.states.events) {
      for (state in this.states.events[event]) {
        if (__indexOf.call(_allStates, state) < 0) {
          _allStates.push(state);
        }
      }
    }
    return _allStates;
  };

  SkinnyCoffeeMachine.prototype.change = function(event, timesToRepeat) {
    if (timesToRepeat == null) {
      timesToRepeat = 1;
    }
    return this["switch"](event, timesToRepeat);
  };

  SkinnyCoffeeMachine.prototype["switch"] = function(event, timesToRepeat) {
    var _i;
    if (timesToRepeat == null) {
      timesToRepeat = 1;
    }
    for (_i = 1; 1 <= timesToRepeat ? _i <= timesToRepeat : _i >= timesToRepeat; 1 <= timesToRepeat ? _i++ : _i--) {
      this._switchOnce(event);
    }
    return this;
  };

  SkinnyCoffeeMachine.prototype._switchOnce = function(event) {
    this.__previousState = this.currentState();
    this.__currentState = this.states.events[event][this.previousState()];
    this._callAction('before', event);
    this._callAction('on', event);
    this._callAction('after', event);
    return this;
  };

  SkinnyCoffeeMachine.prototype._callAction = function(eventType, event) {
    if (this.states[eventType] && typeof this.states[eventType][event] === 'function') {
      return this.states[eventType][event].call(this, this.previousState(), this.currentState());
    }
  };

  return SkinnyCoffeeMachine;

})();

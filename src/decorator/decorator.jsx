'use strict';

import React from 'react';

export default class DecoratorComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  bindBaseFunction() {
    // bind base component's exposed methods to decorator component
    let base = this.refs.base;
    var getBaseFunction = (methodName)=> {
      let isNestedCall = false;
      if (typeof this[methodName] === 'function') {
        isNestedCall = true;
        this['__' + methodName] = this[methodName];
      }
      return ()=> {
        if (isNestedCall) {
          base[methodName]();
        }
        return (isNestedCall) ? this['__' + methodName]() : base[methodName]();
      };
    };
    base.exposedMethods.forEach((d)=> {
      this[d] = getBaseFunction(d);
      this.exposedMethods.push(d);
    });
  }
}

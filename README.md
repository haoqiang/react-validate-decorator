Hi there, react-validate-decorator is a validation plugin for es6 react projects. The idea is inspired by [Higher-Order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750), [ES7 decorator](https://github.com/wycats/javascript-decorators) and [Using ES7 Decorators as Mixins](http://raganwald.com/2015/06/26/decorators-in-es7.html). I also add in my ways of how decorators should work with React in this project. You might like these ideas or hate it, but please leave your comments so that I can improve.

( ⸝⸝•ᴗ•⸝⸝ )੭⁾⁾  [Try Demo here](http://haoqiang.github.io/react-validate-decorator/)

The demo above is barely the most basic usage and I'm still working on it to make it looks much nicer. 

## Install
```
npm install react-validate-decorator
```

## Usage
First import your input component and react-validate-decorator
```
import Input from '.input-text.jsx';
import {validate, rules} from 'react-validate-decorator';
```
Then create your particular new input component with validations enabled
```
let InputEmail = validate(
	rules().string().email().done()
)(Input);

let InputUsername = validate(
	rules().string().min(3).max(10).done()
)(Input);
```
Now you can export your new component for further reuse or use them directly.


## More Docs Work in Progress

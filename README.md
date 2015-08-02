[![npm](https://img.shields.io/npm/v/react-validate-decorator.svg?style=flat-square)](https://www.npmjs.com/package/react-validate-decorator)
[![travis](http://img.shields.io/travis/haoqiang/react-validate-decorator.svg?style=flat-square)](https://travis-ci.org/haoqiang/react-validate-decorator)
[![deps](http://img.shields.io/david/haoqiang/react-validate-decorator.svg?style=flat-square)](https://david-dm.org/haoqiang/react-validate-decorator)

Hi there, react-validate-decorator is a validation plugin for es6 react projects. The idea is inspired by [Higher-Order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750), [ES7 decorator](https://github.com/wycats/javascript-decorators) and [Using ES7 Decorators as Mixins](http://raganwald.com/2015/06/26/decorators-in-es7.html). I also add in my ways of how decorators should work with React in this project. You might like these ideas or hate it, but please leave your comments so that I can improve.

( ⸝⸝•ᴗ•⸝⸝ )੭⁾⁾  [Try Demo here](http://haoqiang.github.io/react-validate-decorator/)

The demo above is barely the most basic usage and I'm still working on it to make it looks much nicer. 

## Install

	npm install react-validate-decorator --save

## Usage
First import your input component and react-validate-decorator

    import Input from '.input-text.jsx';
    import {validate, rules} from 'react-validate-decorator';

 Then create your particular new input component with validations enabled

    let InputEmail = validate(
    	rules().string().email().done()
    )(Input);
or

    @validate(rules().string().email().done())
    Class InputEmail extends Input{
	    ...
    }

Now you can export your new component for further reuse or use them directly.
   
	<InputEmail
		id="email"
		ref="email"
		required
		value={this.state.fields.email.value}
		label={this.state.fields.email.label}
		onChange={this.updateFields.bind(this, 'email')}/>

If you have a button to submit, you may want to manually trigger validation upon submit.

	validateAllInputs() {
	   Promise
	     .all(['email', 'age', 'username'].map((d)=> {
	       return this.refs[d].validate();
	     }))
	     .then((results)=> {
	       let result = results.reduce((m, d)=> {
	         return m && d;
	       }, true);
	       this.setState({
	         validationResult: result
	       });
	     });
	}


## APIs
### **Validate decorator**

    @validate( rules, [interceptor] )

***rules***: An array of Promises, you can use the build in rules maker or simply pass in an array of Promises. **Note that every validator is a Promises object**. The main reasons are: 

 1. Some validation are async potentially 
 2. Much easier to manage the validator queue
 3. Validator are independent with each other

***interceptor***: A function that is used to translate the raw value to n object you want to test for. For example, your input value is an object {key: string},  and you want to make sure key is a string less than 5 char. You'll pass in *(v)=> {return v.key}* as the interceptor.

### **Rule maker**

    rule().string().max(5).done()

Rule maker help you to easily create validator array by chaining. But be careful to call **.done()** in the end to finish the chain. I have thought a lot on whether to use an external validator lib or write my own. Finally I decide to write my own functions. The main reasons are:

 1. You don't really need that many validators all in once
 3. Async validation is very useful, especially with react environment
 2. Most importantly, you may need some very special validators, so easy to extend is very important
 
So how do we extend and use our own validator?

    rule().string().append(
	  (value)=> new Promise((resolve, reject)=> {
	    ajax('check_url?value='+value)
	      .done((response)=>{
	        if (response.ok) {
	          resolve(true);
	        } else {
		        reject('Input not valid.');
		    }
	      });
      })
    ).done()

***validator format***:  validate decorator follow the following rules to render the results.

    if valid
       resolve(true)
    if valid but not ideal
       resolve(warning message) etc.'password security is middle'
    if not valid
	    reject(error message) etc.'password too simple'
	if valid and stop the rest validation
		reject(true) etc. notEmpty validation

### **Decorated Component**
This is the component after decoration. By default all props applied on this component is going to passed to the base component. However there are some props that can be used by the validate decorator. 

     interceptor={(v)=> { return v ? v.cont : null; }}
     rules={rules().eq(this.state.fields.username.value).done()}
     required
     value

The usage is the same with decorator api. However this.props.interceptor will override the default interceptor, this.props.rules will merge with the default rules. So try only assign dynamic validators which cannot be reused to the rule prop. example: 

    
    <InputUsername
      id="verifyUsername"
      ref="verifyUsername"
      required
      value={this.state.fields.verifyUsername.value}
      label={this.state.fields.verifyUsername.label}
      rules={rules().eq(this.state.fields.username.value).done()}
      onChange={this.updateFields.bind(this, 'verifyUsername')}/>

### **Base Component**
This is the component being decorated. Most decorator libraries ignore this part and provide no support. This caused the base component's function and state become hidden to the outside environment. In my opinion decorators shouldn't be hiding the base component's methods and states, because decorators are kind of transparent to the user, user should not aware what is inside the decorator. Example: Input component (not decorated) and InputEmail component (decorated) should have the same methods. So how do we solve this problem?

    class InputText extends InputComponent {
	    exposedMethods = [
		    'getValue',
		    'getChangedValue',
		    'getSpecifiedValue'
	    ];
	    ...
    }
  
, such that all exposedMethods will be mounted on the decorator and you can use them directly. Meanwhile if you need to get the state, you can use

    this.refs.getBaseComponent()

I haven't see this kind of feature any where, but it does helped me solved some current problems. Like parent loop through child to getValues, and mix use of decorated and not decorated components.

## More Docs and Features Work in Progress

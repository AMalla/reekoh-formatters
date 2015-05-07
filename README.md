# Reekoh Parsers
Reekoh Data and Message Parsers. These parsers are custom code run by the Mesh engine in order to convert the different data formats coming from the devices to standard JSON.
 
Parsers are categorized in two:
 * **Standard Parsers** - these are written by the Reekoh team.
 * **Custom Parsers** - these are custom code written by users to support devices which Reekoh does not have first-class support.
 
## Code Format

```javascript
module.exports = function (rawData) {
	try {
    	// Parse Raw Data here
    	// Return the Parsed Raw Data
    	return data;
    } catch (err) {
    	return err; // Return any error. Errors will be handled by the Mesh engine
    }
};
```

## Return Value

The Mesh engine only accepts a valid JS Object or an Array/Collection of JS Objects as return value. If an error occurs within the parser code, it will be handled by the Mesh engine accordingly so return it.

## Libraries

Utility libraries are also available to help you parse your raw data easier.

* [Lodash](https://lodash.com) (v3.8.0) as _
* [Moment.js](http://momentjs.com) (v2.10.2) as moment
* [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) (v0.4.8) as xml2js

These libraries are available in the global namespace so if you would like to use lodash, just use it like _.contains(['123', '456', '789'], '123').

## Node Native API

You are also given access to Node's native API. The following modules is available to use in your custom parser code:

* assert
* buffer
* crypto
* querystring
* url
* string_decoder
* timers
* util

These modules need to be **"require'ed"** before you can use them. Sample code below:

```javascript
module.exports = function (rawData) {
	try {
    	var data = {};
    	var crypto = require('crypto');
        
        data.key = crypto.createHash('sha256').update('mysecretkey').digest('hex');
        
    	return data;
    } catch (err) {
    	return err; // Return any error. Errors will be handled by the Mesh engine
    }
};
```
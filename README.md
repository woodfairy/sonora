# sonora
simple vanilla JS wrapper for XMLHTTPRequest

### Usage
once Sonora is set up (by including and executing it) you can simply create a new request this:
```javascript
const request = Sonora({
  url: 'https://example.com'
});
```
There are more options you can pass to the Sonora constructor in order to configure the request.
If you want to send the request, just call
```javascript
request.send();
```
There is also a shortcut (it is actually not shorter, but I like it)
```javascript
const request = $onora({url: 'https://example.com'});
```
```javascript
/**
 * Makes XMLHTTPRequest more convenient
 * usage is similar to jQuery ajax
 * You can just call: __request(options)
 * where options is an object which contains the needed information for the request
 * options = {
 *     method: 'GET' | 'POST' | 'PUT' | 'UPDATE' | 'DELETE' (etc.),
 *     headers: {
 *         <header>: <value>
 *     },
 *     url: url/to/target,
 *     payload: <arbitrary request payload, should match Content-Type>,
 *     success: function - success callback - 1st argument is the request object,
 *     error: function - error callback - 1st argument is the request object,
 *     always: function - callback - always executed - 1st argument is the request object
 * }
 *
 * Any extensions to this module can be done by adding new options and / or exposing more methods via the prototype API
 */
```

(function (global) {
	let Sonora = function (data) {
        	return new Sonora.init(data);
        };

        const createRequest = _ => new XMLHttpRequest();

        const getOptions = (options, index, fallback) => options.hasOwnProperty(index) ? options[index] : fallback;

        const registerCallbacks = (request, success, error, always) => {
            request.onreadystatechange = _ => {
                if(request.readyState === 4) {
                    if (request.status === 200) {
                        if (typeof success !== 'function') {
                            console.error('Success callback is not a function. Bailing.');
			    return;
                        } else {
                            success(request);
                        }
                    } else {
                        if (typeof error !== 'function') {
                            console.error('Error callback is not a function. Bailing.');
			    return;
                        } else {
                            error(request);
                        }
                    }

                    if (typeof always !== 'function') {
                        console.error('Always callback is not a function. Bailing.');
			return;
                    } else {
                        always(request);
                    }
                }


            }

            return request;
        }

        const setRequestHeaders = (request, headers) => {
            for (let header in headers) {
                if (headers.hasOwnProperty(header)) {
                    request.setRequestHeader(header, headers[header]);
                }
            }

            return request;
        }

        const openRequest = (request, method, url, aysnc) => {
            request.open(method, url, aysnc);
            return request;
        }

        const sendRequest = (request, payload) => {
            request.send(payload);
            return request;
        }


        Sonora.prototype = {
            send: function () {
                return sendRequest(this.request, this.payload);
            },
        };

        Sonora.init = function (options) {
            let self = this;
            self.request = createRequest();
            self.method = getOptions(options, 'method', 'GET');
            self.headers = getOptions(options, 'headers', {'Content-Type': 'application/json'});
            self.url = getOptions(options, 'url', null);
            self.payload = getOptions(options, 'payload', null);
            self.success = getOptions(options, 'success', _ => {});
            self.error = getOptions(options, 'error', _ => {});
            self.always = getOptions(options, 'always', _ => {});
            self.request = openRequest(self.request, self.method, self.url, self);
            self.request = registerCallbacks(self.request, self.success, self.error, self.always);
            self.request = setRequestHeaders(self.request, self.headers);
        };

        /**
         * Expose prototype to global object
         */
        Sonora.init.prototype = Sonora.prototype;
        global.Sonora = global.$onora = Sonora;

})(typeof window !== "undefined" ? window : typeof global !== undefined  ? global : Function('return this')() || (42, eval)('this'));


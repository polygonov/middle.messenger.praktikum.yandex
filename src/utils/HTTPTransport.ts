enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
};

type Options = {
    headers?: string;
    method?: METHODS;
    timeout?: number;
    data?: any;
}

function queryStringify(data) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    get = (url, options: Options = {}) => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    post = (url, options: Options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    put = (url, options: Options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    delete = (url, options: Options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url, options: Options = {}, timeout = 5000) => {
        const { headers = {}, method, data } = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                throw new Error('No method');
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

const http = new HTTPTransport();

export function httpFetch(url: string, options: Options) {
    return http.request(url, { ...options, method: METHODS.GET })
        .then((result: XMLHttpRequest) => {
            return result;
        })
        .catch((error) => {
            throw new Error(error);
        });
}

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
};

type Options = {
    headers?: any;
    method?: Methods;
    timeout?: number;
    data?: any;
}

function queryStringify(data: any) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

export class HTTPTransport {
    get = (url: string, options: Options = {}) => {
        const { data } = options;
        if (data) {
            url = `${url}${queryStringify(data)}`;
        }
        return this.request(url, { ...options, method: Methods.GET }, options.timeout);
    };

    post = (url: string, options: Options = {}) => {
        return this.request(url, { ...options, method: Methods.POST }, options.timeout);
    };

    put = (url: string, options: Options = {}) => {
        return this.request(url, { ...options, method: Methods.PUT }, options.timeout);
    };

    delete = (url: string, options: Options = {}) => {
        return this.request(url, { ...options, method: Methods.DELETE }, options.timeout);
    };

    request = (url: string, options: Options = {}, timeout = 5000) => {
        const { headers = {}, method, data } = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                throw new Error('No method');
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === Methods.GET;

            xhr.open(method, url);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, (headers as any)[key]);
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
    return http.request(url, { ...options, method: Methods.GET })
        .then((result: XMLHttpRequest) => {
            return result;
        })
        .catch((error) => {
            throw new Error(error);
        });
}

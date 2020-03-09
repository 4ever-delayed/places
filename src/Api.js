class Api {
    constructor(props) {
        this._url = props.url;
        this._groupId = props.groupId;
        this.resources = props.resources;
        this._headers = props.headers;
        this._methods = props.methods;
        this._options = null
    }

    _fetch(uri, method = this._methods.get, data = null) {
        if (data) {
            this._options = {
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': 'application/json'
                },
                method: method,
                body: JSON.stringify(
                    data
                )
            }
        }
        else
            this._options = {
                headers: this._headers,
                method: method
            };

        return fetch(uri, this._options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });


    }


    get(resource) {
        return this._fetch(`${this._url}${resource}`)
    }


    put(resource,id) {
        return this._fetch(`${this._url}${resource}/${id}`, this._methods.put)
    }

    delete(resource,id) {
        return this._fetch(`${this._url}${resource}/${id}`, this._methods.delete)
    }


    update(resource,data) {
        return this._fetch(`${this._url}${resource}`, this._methods.patch, data)
    }

    post(resource,data) {
        return this._fetch(`${this._url}${resource}`, this._methods.post, data)
    }
}

export default Api

var Fetch = require('whatwg-fetch');

var baseUrl = 'http://localhost:6060';

/**
 * Basic logic for getting data from a server and posting data to a server using Fetch
 * https://www.npmjs.com/package/whatwg-fetch
 * @type {{get: Function, post: Function}}
 * @namespace Service
 */
var Service = {
    get: function(url){
        return fetch(baseUrl + url)
            .then(function(response){
                return response.json();
            });
    },

    post: function(url, ingredient){
        return fetch(baseUrl + url, {
            headers:{
                'Accept': 'text/plain',
                'Content-type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(ingredient)
        }).then(function(response){
            return response;
        })
    }
};

module.exports = Service;
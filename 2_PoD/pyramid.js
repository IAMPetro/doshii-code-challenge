'use strict'

const request = require('request');
const baseUrl = 'https://jsonplaceholder.typicode.com';

module.exports = {
    buildUser: function () {
        return new Promise((resolve, reject) => {
            var user;
            this.getUser().then((userObj) => {
                user = userObj;
                return this.getPosts();
            }).then(posts => {
                user.posts = posts;
                return this.getAlbums();
            }).then(albums => {
                user.albums = albums;
                return this.getTodos();
            }).then(todos => {
                user.todos = todos;
            }).then(() => {
                resolve(user)
            }).catch(err => reject(err));
        });
    },
    getUser: function () {
        return new Promise((resolve, reject) => {
            return getContent(`${baseUrl}/users/1`).then((user) => {
                resolve(user)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getPosts: function () {
        return new Promise((resolve, reject) => {
            return getContent(`${baseUrl}/posts?userId=1`).then((posts) => {
                resolve(posts)
            }).catch((err) => {
                reject(err)
            })
        });
    },
    getAlbums: function () {
        return new Promise((resolve, reject) => {
            return getContent(`${baseUrl}/albums?userId=1`).then((albums) => {
                resolve(albums)
            }).catch((err) => {
                reject(err)
            })
        });
    },
    getTodos: function () {
        return new Promise((resolve, reject) => {
            getContent(`${baseUrl}/tdos?userId=1`).then((todos) => {
                resolve(todos)
            }).catch((err) => {
                reject(err)
            })
        });
    }
};

const getContent = function (url) {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? require('https') : require('http');
        const request = lib.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load url, status code: ' + response.statusCode));
            }
            const body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => {
                resolve(JSON.parse(body.join('')));
            });
        });
        request.on('error', (err) => reject(err))
    })
};
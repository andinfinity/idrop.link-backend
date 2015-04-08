(function() {
    'use strict';

    var request = require('supertest'),
        express = require('express'),
        should = require('chai').should,
        expect = require('chai').expect,
        assert = require('chai').assert;

    var testUser = {
        email: 'test@example.com',
        password: 'foo'
    };

    var app = require('../').app;

    var token = null;
    var userId = null;

    describe('Create User: POST /users', function() {
        it('should not create a user', function(done) {
            request(app)
                .post('/api/v1/users')
                .expect(400)
                .send({})
                .end(function(err, res) {
                    if (err) done(err);
                    done(err);
                });
        });

        it('should not create a user', function(done) {
            request(app)
                .post('/api/v1/users')
                .expect(400)
                .send({
                    email: testUser.email
                })
                .end(function(err, res) {
                    if (err) done(err);
                    done(err);
                });
        });

        it('should not create a user', function(done) {
            request(app)
                .post('/api/v1/users')
                .expect(400)
                .send({
                    password: testUser.password
                })
                .end(function(err, res) {
                    if (err) done(err);
                    done(err);
                });
        });

        it('should create a user', function(done) {
            request(app)
                .post('/api/v1/users')
                .expect(201)
                .send(testUser)
                .end(function(err, res) {
                    if (err) done(err);
                    else {
                        userId = res.body._id;
                        done();
                    }
                });
        });

        it('should have returned an _id', function() {
            expect(userId).to.be.a('string');
            expect(userId).to.have.length(24);
        });

        it('should have an existing user with this email', function(done) {
            request(app)
                .post('/api/v1/users')
                .expect(400)
                .send(testUser)
                .end(function(err, res) {
                    if (err) done(err);

                    if (res.body.name == 'BadRequestError') {
                        done();
                    } else {
                        done(new Error('Two users with the same email are not supposed to exist!'));
                    }
                });
        });
    });
})();
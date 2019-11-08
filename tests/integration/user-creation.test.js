"use strict";

const app = require("../../src/app");
const Bluebird = require("bluebird");
const request = require("supertest");

describe("user creation page", function () {
  before(function () {
    return require("../../src/models").sequelize.sync();
  });

  beforeEach(function () {
    this.models = require("../../src/models");

    return Bluebird.all([
      this.models.User.destroy({ truncate: true })
    ]);
  });

  it("loads correctly", function (done) {
    request(app).get("/").expect(200, done);
  });

  it("lists a user if there is one", function (done) {
    this.models.User.create({ username: "johndoe" }).then(function () {
      request(app).get("/:user_id").expect(/johndoe/, done);
    });
  });
});

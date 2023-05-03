'use strict';

const { getService } = require('../utils');

const controller = {
  async listRoles(ctx) {
    const { id } = ctx.query;
    return getService('roles').listRoles(id);
  },
};

module.exports = controller;
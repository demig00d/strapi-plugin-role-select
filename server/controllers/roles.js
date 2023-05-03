'use strict';

const { getService } = require('../utils');

const controller = {
  async listRoles(ctx) {
    const { id } = ctx.params;
    return getService('roles').listRoles(id);
  }
};

module.exports = controller;
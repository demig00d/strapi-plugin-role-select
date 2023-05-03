'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/roles/:id',
      handler: 'roles.listRoles',
    },
  ],
};
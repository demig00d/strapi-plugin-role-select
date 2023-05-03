'use strict';

// Retrieve a local service
function getService(name) {
  return strapi.plugin('role-select').service(name);
};

module.exports = {
  getService,
}
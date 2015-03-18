'use strict';

angular.module('chemartApp')
  .factory('storage', function () {
    var data = localStorage.molecules || {};
    var current;

    var storage = {
      "new": function () {
        var date = new Date();
        var name = 'Untitled-' + date.toISOString();
        data[name] = [];

        this.setCurrent(name);
      },
      "save": function (value) {
        if(value && current) {
          data[current] = value;
        }

        localStorage.molecules = data;
      },
      "get": function (name) {
        return data[name];
      },
      "rename": function (oldName, newName) {
        data[newName] = data[oldName];
        delete data[oldName];

        this.save();
      },
      "setCurrent": function (name) {
        current = name;
      }
    };

    return storage;

  });

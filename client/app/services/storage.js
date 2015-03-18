'use strict';

angular.module('chemartApp')
  .factory('storage', function () {

    var storage = {
      data: localStorage.molecules || {},
      current: null
    };

    storage.new = function () {
      var date = new Date();
      var name = 'Untitled-' + date.getFullYear() + date.getMonth() + date.getDate() + '-' + date.getHours() + date.getMinutes() + date.getSeconds();
      this.data[name] = [];

      this.setCurrent(name);
    };

    storage.save = function (value) {
      if (value && this.current) {
        this.data[this.current] = value;
      }

      localStorage.molecules = this.data;
    };

    storage.get = function (name) {
      return this.data[name];
    };

    storage.rename = function (oldName, newName) {
      this.data[newName] = this.data[oldName];
      delete this.data[oldName];

      this.save();
    };

    storage.list = function () {
      return _.keys(this.data);
    };

    storage.setCurrent = function (name) {
      this.current = name;
    };

    return storage;

  });

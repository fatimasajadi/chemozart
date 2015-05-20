'use strict';

angular.module('chemartApp')
  .factory('storage', function (moleculeDrawer, canvas, notify, status) {

    var storage = {
      data: angular.fromJson(localStorage.molecules || '{}'),
      current: null
    };

    storage.new = function () {
      var date = new Date();
      var name = 'Untitled-' + date.getFullYear() + date.getMonth() + date.getDate() + '-' + date.getHours() + date.getMinutes() + date.getSeconds();
      canvas.clear();
      this.data[name] = canvas.getMolecule().toJSON();
      status('New document has been created.');

      this.setCurrent(name);
    };

    storage.save = function (notSet) {
      if (typeof notSet === 'undefined' && this.current) {
        var message;
        this.data[this.current] = canvas.getMolecule().toJSON();

        if (canvas.atoms.length === 0) {
          message = {
            message: 'The molecule should have atoms to be saved.',
            classes: ['error']
          };
        } else {
          message = {
            message: '"' + this.current + '" has been saved !',
            classes: ['success']
          };
        }

        notify(message);
        status(message.message);

      }

      localStorage.molecules = angular.toJson(this.data);
    };

    storage.has = function (name) {
      return typeof this.data[name] !== 'undefined';
    };

    storage.get = function (name) {
      return Chem.Molecule.readJSON(this.data[name]);
    };

    storage.rename = function (oldName, newName) {
      this.data[newName] = this.data[oldName];
      delete this.data[oldName];

      if (this.current === oldName) {
        this.current = newName;
      }

      this.save(true);
    };

    storage.list = function () {
      return _.keys(this.data);
    };

    storage.delete = function (name) {
      delete this.data[name];

      notify({
        message: '"' + name + '" has been deleted !',
        classes: ['success']
      });

      if (name === this.current) {
        this.new();
      } else {
        this.save(true);
      }
    };

    storage.setCurrent = function (name) {
      if (this.current && this.data[this.current].atoms.length === 0) {
        delete this.data[this.current];
        this.save(true);
      }

      this.current = name;
    };

    storage.load = function (name) {
      if (this.has(name)) {
        var molecule = this.get(name);
        this.setCurrent(name);

        notify({
          message: '"' + name + '" has been loaded !',
          classes: ['success']
        });

        status(name + ' has been loaded.');

        moleculeDrawer.draw(molecule);
        return true;
      } else {
        return false;
      }
    };

    return storage;

  });

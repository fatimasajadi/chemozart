(function(root) {
"use strict";

var _get = function get(object, property, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

var _inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) subClass.__proto__ = superClass;
};

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * Creates a new instance of Emitter.
 * @class
 * @returns {Object} emitter - An instance of Emitter.
 * @example
 * var emitter = new Emitter();
 */
var Emitter = (function () {
  function Emitter() {
    this._events = {};
  }

  _prototypeProperties(Emitter, null, {
    on: {

      /**
       * Adds a listener to the collection for a specified event.
       * @public
       * @function
       * @name Emitter#on
       * @param {String} event - Event name.
       * @param {Function} listener - Listener function.
       * @returns {Object} emitter
       * @example
       * emitter.on('ready', listener);
       */
      value: function on(event, listener) {
        this._events[event] = this._events[event] || [];
        this._events[event].push(listener);
        return this;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    hasEvent: {
      value: function hasEvent(event) {
        return typeof this._events[event] !== "undefined" && this._events[event].length !== 0;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    once: {

      /**
       * Adds a one time listener to the collection for a specified event. It will execute only once.
       * @public
       * @function
       * @name Emitter#once
       * @param {String} event - Event name.
       * @param {Function} listener - Listener function.
       * @returns {Object} emitter
       * @example
       * me.once('contentLoad', listener);
       */
      value: function once(event, listener) {
        var fn = function () {
          that.off(event, fn);
          listener.apply(this, arguments);
        };

        var that = this;

        fn.listener = listener;

        this.on(event, fn);

        return this;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    off: {

      /**
       * Removes a listener from the collection for a specified event.
       * @public
       * @function
       * @name Emitter#off
       * @param {String} event - Event name.
       * @param {Function} listener -  Listener function.
       * @returns {Object} emitter
       * @example
       * me.off('ready', listener);
       */
      value: function off(event, listener) {
        var listeners = this._events[event];

        if (listeners !== undefined) {
          for (var j = 0; j < listeners.length; j += 1) {
            if (listeners[j] === listener || listeners[j].listener === listener) {
              listeners.splice(j, 1);
              break;
            }
          }

          if (listeners.length === 0) {
            this.removeAllListeners(event);
          }
        }

        return this;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    removeAllListeners: {

      /**
       * Removes all listeners from the collection for a specified event.
       * @public
       * @function
       * @name Emitter#removeAllListeners
       * @param {String} event - Event name.
       * @returns {Object} emitter
       * @example
       * me.removeAllListeners('ready');
       */
      value: function removeAllListeners(event) {
        try {
          delete this._events[event];
        } catch (e) {}

        return this;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    listeners: {

      /**
       * Returns all listeners from the collection for a specified event.
       * @public
       * @function
       * @name Emitter#listeners
       * @param {String} event - Event name.
       * @returns {Array}
       * @example
       * me.listeners('ready');
       */
      value: function listeners(event) {
        try {
          return this._events[event];
        } catch (e) {}
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    emit: {

      /**
       * Execute each item in the listener collection in order with the specified data.
       * @name Emitter#emit
       * @public
       * @function
       * @param {String} event - The name of the event you want to emit.
       * @param {...args} [args] - Data to pass to the listeners.
       * @example
       * me.emit('ready', 'param1', {..}, [...]);
       */
      value: function emit() {
        var args = [].slice.call(arguments, 0); // converted to array
        var event = args.shift();
        var listeners = this._events[event];

        if (listeners !== undefined) {
          listeners = listeners.slice(0);
          var len = listeners.length;
          for (var i = 0; i < len; i += 1) {
            listeners[i].apply(this, args);
          }
        }

        return this;
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Emitter;
})();

var Elements = { "1": { name: "Hydrogen", color: 10066329, atomicNumber: 1, atomicWeight: 1.00794, symbol: "H", atomicRadius: 79 }, "2": { name: "Helium", color: null, atomicNumber: 2, atomicWeight: 4.002602, symbol: "He", atomicRadius: 0 }, "3": { name: "Lithium", color: null, atomicNumber: 3, atomicWeight: 6.941, symbol: "Li", atomicRadius: 155 }, "4": { name: "Beryllium", color: null, atomicNumber: 4, atomicWeight: 9.01218, symbol: "Be", atomicRadius: 112 }, "5": { name: "Boron", color: null, atomicNumber: 5, atomicWeight: 10.811, symbol: "B", atomicRadius: 98 }, "6": { name: "Carbon", color: 3289650, atomicNumber: 6, atomicWeight: 12.011, symbol: "C", atomicRadius: 91 }, "7": { name: "Nitrogen", color: 221, atomicNumber: 7, atomicWeight: 14.00674, symbol: "N", atomicRadius: 92 }, "8": { name: "Oxygen", color: 13369344, atomicNumber: 8, atomicWeight: 15.9994, symbol: "O", atomicRadius: 91 }, "9": { name: "Fluorine", color: null, atomicNumber: 9, atomicWeight: 18.998403, symbol: "F", atomicRadius: "-" }, "10": { name: "Neon", color: null, atomicNumber: 10, atomicWeight: 20.1797, symbol: "Ne", atomicRadius: "-" }, "11": { name: "Sodium", color: null, atomicNumber: 11, atomicWeight: 22.989768, symbol: "Na", atomicRadius: 190 }, "12": { name: "Magnesium", color: null, atomicNumber: 12, atomicWeight: 24.305, symbol: "Mg", atomicRadius: 160 }, "13": { name: "Aluminum", color: null, atomicNumber: 13, atomicWeight: 26.981539, symbol: "Al", atomicRadius: 143 }, "14": { name: "Silicon", color: null, atomicNumber: 14, atomicWeight: 28.0855, symbol: "Si", atomicRadius: 132 }, "15": { name: "Phosphorus", color: 16750848, atomicNumber: 15, atomicWeight: 30.973762, symbol: "P", atomicRadius: 128 }, "16": { name: "Sulfur", color: 14733059, atomicNumber: 16, atomicWeight: 32.066, symbol: "S", atomicRadius: 127 }, "17": { name: "Chlorine", color: null, atomicNumber: 17, atomicWeight: 35.4527, symbol: "Cl", atomicRadius: "-" }, "18": { name: "Argon", color: null, atomicNumber: 18, atomicWeight: 39.948, symbol: "Ar", atomicRadius: "2-" }, "19": { name: "Potassium", color: null, atomicNumber: 19, atomicWeight: 39.0983, symbol: "K", atomicRadius: 235 }, "20": { name: "Calcium", color: null, atomicNumber: 20, atomicWeight: 40.078, symbol: "Ca", atomicRadius: 197 }, "21": { name: "Scandium", color: null, atomicNumber: 21, atomicWeight: 44.95591, symbol: "Sc", atomicRadius: 162 }, "22": { name: "Titanium", color: null, atomicNumber: 22, atomicWeight: 47.88, symbol: "Ti", atomicRadius: 147 }, "23": { name: "Vanadium", color: null, atomicNumber: 23, atomicWeight: 50.9415, symbol: "V", atomicRadius: 134 }, "24": { name: "Chromium", color: null, atomicNumber: 24, atomicWeight: 51.9961, symbol: "Cr", atomicRadius: 130 }, "25": { name: "Manganese", color: null, atomicNumber: 25, atomicWeight: 54.93805, symbol: "Mn", atomicRadius: 135 }, "26": { name: "Iron", color: null, atomicNumber: 26, atomicWeight: 55.847, symbol: "Fe", atomicRadius: 126 }, "27": { name: "Cobalt", color: null, atomicNumber: 27, atomicWeight: 58.9332, symbol: "Co", atomicRadius: 125 }, "28": { name: "Nickel", color: null, atomicNumber: 28, atomicWeight: 58.6934, symbol: "Ni", atomicRadius: 124 }, "29": { name: "Copper", color: null, atomicNumber: 29, atomicWeight: 63.546, symbol: "Cu", atomicRadius: 128 }, "30": { name: "Zinc", color: null, atomicNumber: 30, atomicWeight: 65.39, symbol: "Zn", atomicRadius: 138 }, "31": { name: "Gallium", color: null, atomicNumber: 31, atomicWeight: 69.723, symbol: "Ga", atomicRadius: 141 }, "32": { name: "Germanium", color: null, atomicNumber: 32, atomicWeight: 72.61, symbol: "Ge", atomicRadius: 137 }, "33": { name: "Arsenic", color: null, atomicNumber: 33, atomicWeight: 74.92159, symbol: "As", atomicRadius: 139 }, "34": { name: "Selenium", color: null, atomicNumber: 34, atomicWeight: 78.96, symbol: "Se", atomicRadius: 140 }, "35": { name: "Bromine", color: null, atomicNumber: 35, atomicWeight: 79.904, symbol: "Br", atomicRadius: "-" }, "36": { name: "Krypton", color: null, atomicNumber: 36, atomicWeight: 83.8, symbol: "Kr", atomicRadius: "-" }, "37": { name: "Rubidium", color: null, atomicNumber: 37, atomicWeight: 85.4678, symbol: "Rb", atomicRadius: 248 }, "38": { name: "Strontium", color: null, atomicNumber: 38, atomicWeight: 87.62, symbol: "Sr", atomicRadius: 215 }, "39": { name: "Yttrium", color: null, atomicNumber: 39, atomicWeight: 88.90585, symbol: "Y", atomicRadius: 178 }, "40": { name: "Zirconium", color: null, atomicNumber: 40, atomicWeight: 91.224, symbol: "Zr", atomicRadius: 160 }, "41": { name: "Niobium", color: null, atomicNumber: 41, atomicWeight: 92.90638, symbol: "Nb", atomicRadius: 146 }, "42": { name: "Molybdenum", color: null, atomicNumber: 42, atomicWeight: 95.94, symbol: "Mo", atomicRadius: 139 }, "43": { name: "Technetium", color: null, atomicNumber: 43, atomicWeight: 97.9072, symbol: "Tc", atomicRadius: 136 }, "44": { name: "Ruthenium", color: null, atomicNumber: 44, atomicWeight: 101.07, symbol: "Ru", atomicRadius: 134 }, "45": { name: "Rhodium", color: null, atomicNumber: 45, atomicWeight: 102.9055, symbol: "Rh", atomicRadius: 134 }, "46": { name: "Palladium", color: null, atomicNumber: 46, atomicWeight: 106.42, symbol: "Pd", atomicRadius: 137 }, "47": { name: "Silver", color: null, atomicNumber: 47, atomicWeight: 107.8682, symbol: "Ag", atomicRadius: 144 }, "48": { name: "Cadmium", color: null, atomicNumber: 48, atomicWeight: 112.411, symbol: "Cd", atomicRadius: 154 }, "49": { name: "Indium", color: null, atomicNumber: 49, atomicWeight: 114.818, symbol: "In", atomicRadius: 166 }, "50": { name: "Tin", color: null, atomicNumber: 50, atomicWeight: 118.71, symbol: "Sn", atomicRadius: 162 }, "51": { name: "Antimony", color: null, atomicNumber: 51, atomicWeight: 121.76, symbol: "Sb", atomicRadius: 159 }, "52": { name: "Tellurium", color: null, atomicNumber: 52, atomicWeight: 127.6, symbol: "Te", atomicRadius: 160 }, "53": { name: "Iodine", color: null, atomicNumber: 53, atomicWeight: 126.90447, symbol: "I", atomicRadius: "-" }, "54": { name: "Xenon", color: null, atomicNumber: 54, atomicWeight: 131.29, symbol: "Xe", atomicRadius: "-" }, "55": { name: "Cesium", color: null, atomicNumber: 55, atomicWeight: 132.90543, symbol: "Cs", atomicRadius: 267 }, "56": { name: "Barium", color: null, atomicNumber: 56, atomicWeight: 137.327, symbol: "Ba", atomicRadius: 222 }, "57": { name: "Lanthanum", color: null, atomicNumber: 57, atomicWeight: 138.9055, symbol: "La", atomicRadius: 187 }, "58": { name: "Cerium", color: null, atomicNumber: 58, atomicWeight: 140.115, symbol: "Ce", atomicRadius: 181 }, "59": { name: "Praseodymium", color: null, atomicNumber: 59, atomicWeight: 140.90765, symbol: "Pr", atomicRadius: 182 }, "60": { name: "Neodymium", color: null, atomicNumber: 60, atomicWeight: 144.24, symbol: "Nd", atomicRadius: 182 }, "61": { name: "Promethium", color: null, atomicNumber: 61, atomicWeight: 144.9127, symbol: "Pm", atomicRadius: "-" }, "62": { name: "Samarium", color: null, atomicNumber: 62, atomicWeight: 150.36, symbol: "Sm", atomicRadius: 181 }, "63": { name: "Europium", color: null, atomicNumber: 63, atomicWeight: 151.965, symbol: "Eu", atomicRadius: 199 }, "64": { name: "Gadolinium", color: null, atomicNumber: 64, atomicWeight: 157.25, symbol: "Gd", atomicRadius: 179 }, "65": { name: "Terbium", color: null, atomicNumber: 65, atomicWeight: 158.92534, symbol: "Tb", atomicRadius: 180 }, "66": { name: "Dysprosium", color: null, atomicNumber: 66, atomicWeight: 162.5, symbol: "Dy", atomicRadius: 180 }, "67": { name: "Holmium", color: null, atomicNumber: 67, atomicWeight: 164.93032, symbol: "Ho", atomicRadius: 179 }, "68": { name: "Erbium", color: null, atomicNumber: 68, atomicWeight: 167.26, symbol: "Er", atomicRadius: 178 }, "69": { name: "Thulium", color: null, atomicNumber: 69, atomicWeight: 168.93421, symbol: "Tm", atomicRadius: 177 }, "70": { name: "Ytterbium", color: null, atomicNumber: 70, atomicWeight: 173.04, symbol: "Yb", atomicRadius: 194 }, "71": { name: "Lutetium", color: null, atomicNumber: 71, atomicWeight: 174.967, symbol: "Lu", atomicRadius: 175 }, "72": { name: "Hafnium", color: null, atomicNumber: 72, atomicWeight: 178.49, symbol: "Hf", atomicRadius: 167 }, "73": { name: "Tantalum", color: null, atomicNumber: 73, atomicWeight: 180.9479, symbol: "Ta", atomicRadius: 149 }, "74": { name: "Tungsten", color: null, atomicNumber: 74, atomicWeight: 183.84, symbol: "W", atomicRadius: 141 }, "75": { name: "Rhenium", color: null, atomicNumber: 75, atomicWeight: 186.207, symbol: "Re", atomicRadius: 137 }, "76": { name: "Osmium", color: null, atomicNumber: 76, atomicWeight: 190.23, symbol: "Os", atomicRadius: 135 }, "77": { name: "Iridium", color: null, atomicNumber: 77, atomicWeight: 192.22, symbol: "Ir", atomicRadius: 136 }, "78": { name: "Platinum", color: null, atomicNumber: 78, atomicWeight: 195.08, symbol: "Pt", atomicRadius: 139 }, "79": { name: "Gold", color: null, atomicNumber: 79, atomicWeight: 196.96654, symbol: "Au", atomicRadius: 146 }, "80": { name: "Mercury", color: null, atomicNumber: 80, atomicWeight: 200.59, symbol: "Hg", atomicRadius: 157 }, "81": { name: "Thallium", color: null, atomicNumber: 81, atomicWeight: 204.3833, symbol: "Tl", atomicRadius: 171 }, "82": { name: "Lead", color: null, atomicNumber: 82, atomicWeight: 207.2, symbol: "Pb", atomicRadius: 175 }, "83": { name: "Bismuth", color: null, atomicNumber: 83, atomicWeight: 208.98037, symbol: "Bi", atomicRadius: 170 }, "84": { name: "Polonium", color: null, atomicNumber: 84, atomicWeight: 208.9824, symbol: "Po", atomicRadius: 176 }, "85": { name: "Astatine", color: null, atomicNumber: 85, atomicWeight: 209.9871, symbol: "At", atomicRadius: "-" }, "86": { name: "Radon", color: null, atomicNumber: 86, atomicWeight: 222.0176, symbol: "Rn", atomicRadius: "-" }, "87": { name: "Francium", color: null, atomicNumber: 87, atomicWeight: 223.0197, symbol: "Fr", atomicRadius: "-" }, "88": { name: "Radium", color: null, atomicNumber: 88, atomicWeight: 226.0254, symbol: "Ra", atomicRadius: "-" }, "89": { name: "Actinium", color: null, atomicNumber: 89, atomicWeight: 227.0278, symbol: "Ac", atomicRadius: 188 }, "90": { name: "Thorium", color: null, atomicNumber: 90, atomicWeight: 232.0381, symbol: "Th", atomicRadius: 180 }, "91": { name: "Protactinium", color: null, atomicNumber: 91, atomicWeight: 231.03588, symbol: "Pa", atomicRadius: 161 }, "92": { name: "Uranium", color: null, atomicNumber: 92, atomicWeight: 238.0289, symbol: "U", atomicRadius: 138 }, "93": { name: "Neptunium", color: null, atomicNumber: 93, atomicWeight: 237.048, symbol: "Np", atomicRadius: 130 }, "94": { name: "Plutonium", color: null, atomicNumber: 94, atomicWeight: 244.0642, symbol: "Pu", atomicRadius: 151 }, "95": { name: "Americium", color: null, atomicNumber: 95, atomicWeight: 243.0614, symbol: "Am", atomicRadius: 173 }, "96": { name: "Curium", color: null, atomicNumber: 96, atomicWeight: 247.0703, symbol: "Cm", atomicRadius: 299 }, "97": { name: "Berkelium", color: null, atomicNumber: 97, atomicWeight: 247.0703, symbol: "Bk", atomicRadius: 297 }, "98": { name: "Californium", color: null, atomicNumber: 98, atomicWeight: 251.0796, symbol: "Cf", atomicRadius: 295 }, "99": { name: "Einsteinium", color: null, atomicNumber: 99, atomicWeight: 252.083, symbol: "Es", atomicRadius: 292 }, "100": { name: "Fermium", color: null, atomicNumber: 100, atomicWeight: 257.0951, symbol: "Fm", atomicRadius: 290 }, "101": { name: "Mendelevium", color: null, atomicNumber: 101, atomicWeight: 258.1, symbol: "Md", atomicRadius: 287 }, "102": { name: "Nobelium", color: null, atomicNumber: 102, atomicWeight: 259.1009, symbol: "No", atomicRadius: 285 }, "103": { name: "Lawrencium", color: null, atomicNumber: 103, atomicWeight: 262.11, symbol: "Lr", atomicRadius: 282 }, "104": { name: "Rutherfordium", color: null, atomicNumber: 104, atomicWeight: "[261]", symbol: "Rf", atomicRadius: null }, "105": { name: "Dubnium", color: null, atomicNumber: 105, atomicWeight: "[262]", symbol: "Db", atomicRadius: null }, "106": { name: "Seaborgium", color: null, atomicNumber: 106, atomicWeight: "[266]", symbol: "Sg", atomicRadius: null }, "107": { name: "Bohrium", color: null, atomicNumber: 107, atomicWeight: "[264]", symbol: "Bh", atomicRadius: null }, "108": { name: "Hassium", color: null, atomicNumber: 108, atomicWeight: "[269]", symbol: "Hs", atomicRadius: null }, "109": { name: "Meitnerium", color: null, atomicNumber: 109, atomicWeight: "[268]", symbol: "Mt", atomicRadius: null }, "110": { name: "Ununnilium", color: null, atomicNumber: 110, atomicWeight: "[269]", symbol: "Uun", atomicRadius: null }, "111": { name: "Unununium", color: null, atomicNumber: 111, atomicWeight: "[272]", symbol: "Uuu", atomicRadius: null }, "112": { name: "Ununbium", color: null, atomicNumber: 112, atomicWeight: "[277]", symbol: "Uub", atomicRadius: null }, "113": { name: "Ununtrium", color: null, atomicNumber: 113, atomicWeight: null, symbol: "Uut", atomicRadius: null }, "114": { name: "Ununquadium", color: null, atomicNumber: 114, atomicWeight: "[289]", symbol: "Uuq", atomicRadius: null }, "115": { name: "Ununpentium", color: null, atomicNumber: 115, atomicWeight: null, symbol: "Uup", atomicRadius: null }, "116": { name: "Ununhexium", color: null, atomicNumber: 116, atomicWeight: null, symbol: "Uuh", atomicRadius: null }, "117": { name: "Ununseptium", color: null, atomicNumber: 117, atomicWeight: null, symbol: "Uus", atomicRadius: null }, "118": { name: "Ununoctium", color: null, atomicNumber: 118, atomicWeight: null, symbol: "Uuo", atomicRadius: null } };


var atomIndex = 0;

var Atom = (function (Emitter) {
  /**
   * @constructor
   * @param index
   */
  function Atom() {
    var _this = this;
    var index = arguments[0] === undefined ? atomIndex++ : arguments[0];
    return (function () {
      _get(Object.getPrototypeOf(Atom.prototype), "constructor", _this).call(_this);

      _this.index = index;
      _this.element = false;
      _this._data = {};
      _this.position = null;
      _this._bonds = [];

      _this.on("delete", function () {
        var bonds = _this.bonds.slice(0, _this.bonds.length);
        for (var _iterator = bonds[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var bond = _step.value;
          bond["delete"]();
        }
      });
    })();
  }

  _inherits(Atom, Emitter);

  _prototypeProperties(Atom, null, {
    setElement: {

      /**
       * Set element for the atom
       *
       * @param {Element} element
       */
      value: function setElement(element) {
        this.element = element;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    atomicNumber: {

      /**
       * Atomic Number
       *
       * @property {Number} atomicNumber
       */
      get: function () {
        return this.element.atomicNumber;
      },
      set: function (atomicNumber) {
        this.setElement(Element.findByAtomicNumber(atomicNumber));
      },
      enumerable: true,
      configurable: true
    },
    bonds: {

      /**
       * Get list of bonds
       *
       * @readonly
       * @property {Bond[]} bonds
       */
      get: function () {
        return this._bonds;
      },
      enumerable: true,
      configurable: true
    },
    setData: {


      /**
       * Inject some data
       *
       * @method setData
       * @param key
       * @param value
       * @returns {*}
       */
      value: function setData(key, value) {
        this._data[key] = value;
        return this;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getData: {

      /**
       * Get injected data
       *
       * @method getData
       * @param key
       * @returns {*}
       */
      value: function getData(key) {
        return this._data[key];
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    removeData: {
      value: function removeData(key) {
        delete this._data[key];
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    hasData: {

      /**
       * Checks if data with given key exists
       *
       * @method hasData
       * @param key
       * @returns {boolean}
       */
      value: function hasData(key) {
        return typeof this._data[key] !== "undefined";
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    addBond: {

      /**
       * Add a bond to atom
       *
       * @method addBond
       * @param bond
       */
      value: function addBond(bond) {
        this._bonds.push(bond);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    removeBond: {

      /**
       * Remove a bond from atom
       *
       * @method removeBond
       * @param bond
       */
      value: function removeBond(bond) {
        var _bonds = this._bonds;

        _bonds.splice(_bonds.indexOf(bond), 1);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    "delete": {
      value: function _delete() {
        this.emit("delete");
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    isConnected: {


      /**
       * Checks if this atom is connected to given atom
       *
       * @method isConnected
       * @param {Atom} atom
       */
      value: function isConnected(atom) {
        for (var _iterator2 = this.bonds[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
          var bond = _step2.value;
          if (bond.getPartner(this) === atom) {
            return true;
          }
        }

        return false;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    toJSON: {

      /**
       * Returns the bond JSON representation.
       *
       * @returns {{index: (Atom.index|*), atomicNumber: *, symbol: (*|symbol|Elements.symbol|Atom.toJSON.symbol|.toJSON.value.symbol|c.symbol), position: (Atom.position|*)}}
       */
      value: function toJSON() {
        return {
          index: this.index,
          atomicNumber: this.atomicNumber,
          symbol: this.element.symbol,
          position: this.position
        };
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Atom;
})(Emitter);

var bondIndex = 0;

var Bond = (function (Emitter) {
  /**
   * Constructor of Bond
   *
   * @constructor
   * @param begin
   * @param end
   * @param order
   * @param index
   */
  function Bond(begin, end) {
    var _this2 = this;
    var order = arguments[2] === undefined ? 1 : arguments[2];
    var index = arguments[3] === undefined ? bondIndex++ : arguments[3];
    return (function () {
      _get(Object.getPrototypeOf(Bond.prototype), "constructor", _this2).call(_this2);

      _this2.index = index;
      _this2.begin = begin;
      _this2.end = end;
      _this2._order = order;
      _this2._data = {};

      _this2.on("delete", function () {
        _this2.begin.removeBond(_this2);
        _this2.end.removeBond(_this2);
      });
    })();
  }

  _inherits(Bond, Emitter);

  _prototypeProperties(Bond, null, {
    begin: {

      /**
       * The first atom of bond
       *
       * @property {Atom} begin
       */
      set: function (begin) {
        this._begin = begin;

        begin.addBond(this);
        begin.emit("bond", this);
        this.emit("atomset", "begin", begin);
      },
      get: function () {
        return this._begin;
      },
      enumerable: true,
      configurable: true
    },
    end: {

      /**
       * The second atom of bond
       *
       * @property {Atom} end
       */
      set: function (end) {
        this._end = end;

        end.addBond(this);
        end.emit("bond", this);
        this.emit("atomset", "end", end);
      },
      get: function () {
        return this._end;
      },
      enumerable: true,
      configurable: true
    },
    order: {

      /**
       * Order of bond
       *
       * @property {Number} order
       */
      set: function (order) {
        this._order = order;
        this.emit("order", order);
      },
      get: function () {
        return this._order;
      },
      enumerable: true,
      configurable: true
    },
    setData: {


      /**
       * Inject some data
       *
       * @method setData
       * @param key
       * @param value
       * @returns {Bond}
       */
      value: function setData(key, value) {
        this._data[key] = value;
        return this;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getData: {

      /**
       * Get injected data
       *
       * @method getData
       * @param key
       * @returns {*}
       */
      value: function getData(key) {
        return this._data[key];
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    removeData: {
      value: function removeData(key) {
        delete this._data[key];
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    hasData: {

      /**
       * Checks if data with given key exists
       *
       * @method hasData
       * @param key
       * @returns {boolean}
       */
      value: function hasData(key) {
        return typeof this._data[key] !== "undefined";
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getPartner: {

      /**
       * Returns the atom which is not equal to given atom.
       *
       * @method getPartner
       * @param atom
       * @returns {*}
       */
      value: function getPartner(atom) {
        if (this._begin === atom) {
          return this._end;
        } else if (this._end === atom) {
          return this._begin;
        } else {
          throw "The given atom is not a part of this bond";
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getPositionOfAtom: {

      /**
       * Returns the position of atom whether it's begin or end
       *
       * @throws error if the given atom is not part of this bond
       * @method getPositionOfAtom
       * @param atom
       * @returns {string}
       */
      value: function getPositionOfAtom(atom) {
        if (this._begin === atom) {
          return "begin";
        } else if (this._end === atom) {
          return "end";
        } else {
          throw "The given atom is not a part of this bond";
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    "delete": {
      value: function _delete() {
        this.emit("delete");
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    toJSON: {

      /**
       * Returns the bond JSON representation.
       *
       * @method toJSON
       * @returns {{begin: (Atom.toJSON.index|*|.toJSON.value.index|Number|number|Atom.index), end: (Atom.toJSON.index|*|.toJSON.value.index|Number|number|Atom.index), order: *}}
       */
      value: function toJSON() {
        return {
          begin: this.begin.index,
          end: this.end.index,
          order: this.order
        };
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Bond;
})(Emitter);

var Element = (function () {
  /**
   * Constructor of element
   */
  function Element() {
    this.atomicNumber = 0;
    this.name = "";
    this.symbol = "";
    this.color = 16777215;
  }

  _prototypeProperties(Element, {
    createFromData: {

      /**
       * @static
       * @method createFromData
       * @param {Object} data
       * @returns {Element}
       */
      value: function createFromData(data) {
        var element = new Element();
        element.atomicNumber = data.atomicNumber;
        element.atomicRadius = data.atomicRadius;
        element.color = data.color;
        element.name = data.name;
        element.symbol = data.symbol;

        return element;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    findByAtomicNumber: {

      /**
       * @static
       * @method findByAtomicNumber
       * @param {Number} atomicNumber
       * @returns {Element|boolean}
       */
      value: function findByAtomicNumber(atomicNumber) {
        for (var i in Elements) {
          var element = Elements[i];

          if (element.atomicNumber === atomicNumber) {
            return Element.createFromData(element);
          }
        }

        return false;
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Element;
})();

var Molecule = (function (Emitter) {
  /**
   * Constructor of molecule
   *
   * @constructor
   */
  function Molecule() {
    _get(Object.getPrototypeOf(Molecule.prototype), "constructor", this).call(this);

    this.id = 0;
    this._atoms = [];
    this._bonds = [];
    this._data = {};
  }

  _inherits(Molecule, Emitter);

  _prototypeProperties(Molecule, {
    readJSON: {
      value: function readJSON(json) {
        var molecule = new Molecule(),
            atoms = [],
            i = undefined;

        for (i in json.atoms) {
          var data = json.atoms[i];
          var atom = new Chem.Atom();

          atom.atomicNumber = data.atomicNumber;

          if (typeof LiThree !== "undefined") {
            atom.position = new LiThree.Math.Vector3(data.position.x, data.position.y, data.position.z);
          } else {
            atom.position = data.position;
          }

          atoms[i] = atom;
          molecule.addAtom(atom);
        }

        for (i in json.bonds) {
          var data = json.bonds[i];
          var bond = new Chem.Bond(atoms[data.begin], atoms[data.end]);

          bond.order = data.order;

          molecule.addBond(bond);
        }

        return molecule;
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  }, {
    addAtom: {

      /**
       * Add an atom to the molecule
       *
       * @method addAtom
       * @param atom
       */
      value: function addAtom(atom) {
        this._atoms.push(atom);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    addBond: {

      /**
       * Add a bond to the molecule
       *
       * @method addBond
       * @param bond
       */
      value: function addBond(bond) {
        this._bonds.push(bond);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    deleteAtom: {

      /**
       * Remove a bond from molecule
       *
       * @method deleteAtom
       * @param {Atom} atom
       */
      value: function deleteAtom(atom) {
        this._atoms.splice(atom, 0, 1);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    deleteBond: {

      /**
       * Remove a bond from molecule
       *
       * @method deleteBond
       * @param {Bond} bond
       */
      value: function deleteBond(bond) {
        this._bonds.splice(bond, 0, 1);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    bonds: {

      /**
       * Get list of bonds
       *
       * @readonly
       * @property {Bond[]} bonds
       */
      get: function () {
        return this._bonds;
      },
      enumerable: true,
      configurable: true
    },
    atoms: {

      /**
       * Get list of atoms
       *
       * @readonly
       * @property {Atom[]} atoms
       */
      get: function () {
        return this._atoms;
      },
      enumerable: true,
      configurable: true
    },
    forEachAtom: {

      /**
       * Invokes the given callback for each atom
       *
       * @method forEachAtom
       * @param callback
       */
      value: function forEachAtom(callback) {
        var atoms = this.atoms;
        for (var i in atoms) {
          callback.apply(atoms[i], [this]);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    forEachBond: {


      /**
       * Invokes the given callback for each bond
       *
       * @method forEachBond
       * @param callback
       */
      value: function forEachBond(callback) {
        var bonds = this.bonds;
        for (var i in bonds) {
          callback.apply(bonds[i], [this]);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    setData: {

      /**
       * Inject some data
       *
       * @method setData
       * @param key
       * @param value
       * @returns {Bond}
       */
      value: function setData(key, value) {
        this._data[key] = value;
        return this;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getData: {

      /**
       * Get injected data
       *
       * @method getData
       * @param key
       * @returns {*}
       */
      value: function getData(key) {
        return this._data[key];
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    hasData: {

      /**
       * Checks if data with given key exists
       *
       * @method hasData
       * @param key
       * @returns {boolean}
       */
      value: function hasData(key) {
        return typeof this._data[key] !== "undefined";
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    toJSON: {

      /**
       * Returns the molecule JSON representation.
       *
       * @returns {{atoms: *, bonds: *}}
       */
      value: function toJSON() {
        return {
          atoms: this.atoms,
          bonds: this.bonds
        };
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Molecule;
})(Emitter);

/**
 * Exports Emitter
 */
//
root.Chem = {
  Atom: Atom,
  Bond: Bond,
  Element: Element,
  Molecule: Molecule,
  Data: {
    Elements: Elements
  }
};
})
(this);
//# sourceMappingURL=chem.js.map
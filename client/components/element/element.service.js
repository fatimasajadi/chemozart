'use strict';

angular.module('chemartApp')
  .factory('element', function () {
    var getElement = Chem.Element.findByAtomicNumber;
    var periodicTable = [
      [getElement(1), 16, getElement(2)],
      [getElement(3), getElement(4), 10, getElement(5), getElement(6), getElement(7), getElement(8), getElement(9), getElement(10)],
      [getElement(11), getElement(12), 10, getElement(13), getElement(14), getElement(15), getElement(16), getElement(17), getElement(18)],
      [getElement(19), getElement(20), getElement(21), getElement(22), getElement(23), getElement(24), getElement(25), getElement(26), getElement(27), getElement(28), getElement(29), getElement(30), getElement(31), getElement(32), getElement(33), getElement(34), getElement(35), getElement(36)],
      [getElement(37), getElement(38), getElement(39), getElement(40), getElement(41), getElement(42), getElement(43), getElement(44), getElement(45), getElement(46), getElement(47), getElement(48), getElement(49), getElement(50), getElement(51), getElement(52), getElement(53), getElement(54)],
      [getElement(55), getElement(56), getElement(57), getElement(72), getElement(73), getElement(74), getElement(75), getElement(76), getElement(77), getElement(78), getElement(79), getElement(80), getElement(81), getElement(82), getElement(83), getElement(84), getElement(85), getElement(86)],
    ];

    return {
      periodicTable: periodicTable
    };
  });

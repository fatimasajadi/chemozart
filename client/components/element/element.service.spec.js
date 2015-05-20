'use strict';

describe('Service: element', function () {

  // load the service's module
  beforeEach(module('chemartApp'));

  // instantiate service
  var element;
  beforeEach(inject(function (_element_) {
    element = _element_;
  }));

  it('should do something', function () {
    expect(!!element).toBe(true);
  });

});

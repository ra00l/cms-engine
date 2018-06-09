const assert = require('assert');

describe('options test', function () {
  before(function() {
    require('./_setup')({});
  });
  describe('default options applied', function () {
    it('empty init', function () {
      const opts = require('../index').getOptions();

      assert.ok(opts.connectionString === '', 'Empty connection string');
      assert.ok(opts.masterPage === '', 'Empty master');
    });

    it('with values init', function () {
      require('./_setup')({ connectionString: 'abc', masterPage: 'def' });

      const opts = require('../index').getOptions();

      assert.ok(opts.connectionString === 'abc', 'Connection string has provided value');
      assert.ok(opts.masterPage === 'def', 'Master has provided value');
    });
  });
});

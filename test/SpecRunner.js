require.config({
  paths: {
      'mocha': '../bower_components/mocha/mocha',
      'should': '../bower_components/should.js/should'
  },
})
define(['../bower_components/mocha/mocha', '../bower_components/should.js/should'], function() {
  mocha.setup('bdd');
  require(['tests'], function() {
     mocha.run();
  })
})
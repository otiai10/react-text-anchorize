require 'mocha'
require('chai').should();

hoge = require '../src'

describe "foo", ->
  it "bar", ->
    true.should.be.true

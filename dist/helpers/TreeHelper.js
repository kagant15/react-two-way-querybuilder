'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeHelper = function () {
  function TreeHelper(data) {
    (0, _classCallCheck3.default)(this, TreeHelper);

    this.data = data;
  }

  (0, _createClass3.default)(TreeHelper, [{
    key: 'generateNodeName',
    value: function generateNodeName(node) {
      return node.nodeName + '/' + (node.rules.length + 1);
    }
  }, {
    key: 'removeNodeByName',
    value: function removeNodeByName(index) {
      this.removeNode(this.data, index, 0);
      return this.data;
    }
  }, {
    key: 'getNodeByName',
    value: function getNodeByName(name) {
      return this.getNode(this.data, name);
    }
  }, {
    key: 'removeNode',
    value: function removeNode(data, name) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) {
          if (property === 'rules') {
            for (var i = 0; i < data.rules.length; i += 1) {
              if (data.rules[i].nodeName === name) {
                data.rules.splice(i, 1);
                return;
              } else if (data.rules[i].combinator) {
                this.removeNode(data.rules[i], name);
              }
            }
          }
        }
      }
    }
  }, {
    key: 'getNode',
    value: function getNode(treeData, name) {
      if (name === '1') {
        return treeData;
      }
      for (var property in treeData) {
        if (treeData.hasOwnProperty(property)) {
          if (property === 'rules') {
            var node = null;
            for (var i = 0; i < treeData.rules.length; i += 1) {
              if (treeData.rules[i].nodeName === name) {
                node = treeData.rules[i];
              } else if (treeData.rules[i].combinator && node === null) {
                node = this.getNode(treeData.rules[i], name);
              }
            }
            return node;
          }
        }
      }
    }
  }]);
  return TreeHelper;
}();

exports.default = TreeHelper;
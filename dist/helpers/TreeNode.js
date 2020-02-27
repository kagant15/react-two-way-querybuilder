"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeNode = function () {
  function TreeNode(value, parent, children) {
    (0, _classCallCheck3.default)(this, TreeNode);

    this._value = value;
    this._parent = parent;
    this._children = children;
  }

  (0, _createClass3.default)(TreeNode, [{
    key: "addChild",
    value: function addChild(child) {
      this._children.push(child);
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      if (value) {
        this._value = value;
      }
    }
  }, {
    key: "parent",
    get: function get() {
      return this._parent;
    },
    set: function set(parent) {
      if (parent) {
        this._parent = parent;
      }
    }
  }, {
    key: "children",
    get: function get() {
      return this._children;
    },
    set: function set(children) {
      if (children) {
        this._children = children;
      }
    }
  }]);
  return TreeNode;
}();

exports.default = TreeNode;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _TreeNode = require('./TreeNode');

var _TreeNode2 = _interopRequireDefault(_TreeNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ASTree = function () {
  function ASTree() {
    (0, _classCallCheck3.default)(this, ASTree);
  }

  (0, _createClass3.default)(ASTree, null, [{
    key: 'buildTree',
    value: function buildTree(tokens, combinators) {
      var _this = this;

      var tree = void 0;
      var currentNode = null;

      var _loop = function _loop(i, length) {
        if (tokens[i] === '(') {
          var node = new _TreeNode2.default(tokens[i], currentNode, []);
          if (!currentNode) {
            tree = node;
          } else {
            currentNode.addChild(node);
          }
          currentNode = node;
        }

        var currCombinator = combinators.find(function (x) {
          return x.combinator === tokens[i];
        });
        if (currCombinator && currentNode.value !== tokens[i]) {
          var _node = new _TreeNode2.default(tokens[i], currentNode, []);
          currentNode.addChild(_node);
          currentNode = _node;
        }

        if (tokens[i].field) {
          if (!combinators.find(function (x) {
            return x.combinator === currentNode.value;
          })) {
            var combinator = _this.getNearestCombinator(tokens, i, combinators);
            var combNode = new _TreeNode2.default(combinator, currentNode, []);
            currentNode.addChild(combNode);
            currentNode = combNode;
          }
          var _node2 = new _TreeNode2.default(tokens[i], currentNode, []);
          currentNode.addChild(_node2);
        }

        if (tokens[i] === ')') {
          while (currentNode.value !== '(') {
            currentNode = currentNode.parent;
          }
          currentNode.value += ')';
          currentNode = currentNode.parent;
        }
      };

      for (var i = 0, length = tokens.length; i < length; i += 1) {
        _loop(i, length);
      }
      return tree;
    }
  }, {
    key: 'getNearestCombinator',
    value: function getNearestCombinator(tokens, index, combinators) {
      var _loop2 = function _loop2(i, length) {
        if (combinators.find(function (x) {
          return x.combinator === tokens[i];
        })) {
          return {
            v: tokens[i]
          };
        }
      };

      for (var i = index, length = tokens.length; i < length; i += 1) {
        var _ret2 = _loop2(i, length);

        if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
      }
    }
  }]);
  return ASTree;
}();

exports.default = ASTree;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _TreeHelper = require('./TreeHelper');

var _TreeHelper2 = _interopRequireDefault(_TreeHelper);

var _ASTree = require('./ASTree');

var _ASTree2 = _interopRequireDefault(_ASTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryParser = function () {
  function QueryParser() {
    (0, _classCallCheck3.default)(this, QueryParser);
  }

  (0, _createClass3.default)(QueryParser, null, [{
    key: 'parseToQuery',
    value: function parseToQuery(data, query) {
      query = '(';
      for (var i = 0, length = data.rules.length; i < length; i += 1) {
        if (!data.rules[i].combinator) {
          query += data.rules[i].field + ' ' + data.rules[i].operator + ' \'' + data.rules[i].value + '\'';
          if (i !== length - 1 && !data.rules[i + 1].combinator) {
            query += ' ' + data.combinator + ' ';
          }
        } else {
          query += ' ' + data.combinator + ' ' + this.parseToQuery(data.rules[i], query);
        }
      }
      return query + ')';
    }
  }, {
    key: 'parseToData',
    value: function parseToData(query, config) {
      var data = null;
      var tokens = this.getTokensArray(query, config.combinators, config.operators);
      var asTree = _ASTree2.default.buildTree(tokens, config.combinators);
      return this.convertSyntaxTreeToData(asTree, data, config.combinators, '1', '1');
    }
  }, {
    key: 'convertSyntaxTreeToData',
    value: function convertSyntaxTreeToData(element, data, combinators, nodeName, combNodeName) {
      data = data ? data : {};
      var newCombName = combNodeName;
      var firstCombinator = this.getFirstCombinator(element, combinators);
      var treeHelper = new _TreeHelper2.default(data);
      var newCombinator = {
        combinator: firstCombinator ? firstCombinator.value : combinators[0].combinator,
        nodeName: nodeName,
        rules: []
      };
      var currElement = treeHelper.getNodeByName(combNodeName);
      if (element.value === '()' && !element.parent) {
        data = newCombinator;
        currElement = data;
      } else if (element.value === '()' && element.parent) {
        currElement.rules.push(newCombinator);
        newCombName = nodeName;
      } else if (element.value && element.value.field) {
        var newRule = {
          field: element.value.field,
          operator: element.value.operator,
          value: element.value.value,
          nodeName: nodeName
        };
        currElement.rules.push(newRule);
      }
      for (var i = 0; i < element.children.length; i += 1) {
        this.convertSyntaxTreeToData(element.children[i], data, combinators, newCombName + '/' + (currElement.rules.length + 1), newCombName);
      }
      return data;
    }
  }, {
    key: 'getTokensArray',
    value: function getTokensArray(query, combinators, operators) {
      var _this = this;

      var combinatorsIndexes = this.getCombinatorsIndexes(query, combinators);
      var tokens = [];
      var token = '';

      var _loop = function _loop(_i, length) {
        var combinatorIndexes = combinatorsIndexes.find(function (x) {
          return x.start === _i;
        });
        if (combinatorIndexes) {
          var combinator = query.substring(combinatorIndexes.start, combinatorIndexes.end);
          token = _this.pushTokenIfNotEmpty(token, tokens, operators);
          tokens.push(combinator);
          _i = combinatorIndexes.end;
        } else if (query[_i] === '(' || query[_i] === ')') {
          token = _this.pushTokenIfNotEmpty(token, tokens, operators);
          tokens.push(query[_i]);
        } else {
          token += query[_i];
        }
        i = _i;
      };

      for (var i = 0, length = query.length; i < length; i += 1) {
        _loop(i, length);
      }
      return tokens;
    }
  }, {
    key: 'pushTokenIfNotEmpty',
    value: function pushTokenIfNotEmpty(token, array, operators) {
      token = token.trim();
      if (token) {
        array.push(this.createTokenObject(token, operators));
      }
      return '';
    }
  }, {
    key: 'createTokenObject',
    value: function createTokenObject(token, operators) {
      var operatorsPattern = this.getSearchPattern(operators, 'operator');
      var matches = this.matchAll(token, operatorsPattern);
      var mathesLength = matches.map(function (el) {
        return el.value;
      }).join('').length;
      var operatorEndIndex = matches[0].index + mathesLength;
      return {
        field: token.substring(0, matches[0].index).trim(),
        operator: token.substring(matches[0].index, operatorEndIndex),
        value: token.substring(operatorEndIndex, token.length).replace(/[']+/g, '').trim()
      };
    }
  }, {
    key: 'matchAll',
    value: function matchAll(str, regex) {
      var res = [];
      var m = void 0;
      if (regex.global) {
        while (m = regex.exec(str)) {
          res.push({ value: m[0], index: m.index });
        }
      } else if (m = regex.exec(str)) {
        res.push({ value: m[0], index: m.index });
      }
      return res;
    }
  }, {
    key: 'getCombinatorsIndexes',
    value: function getCombinatorsIndexes(query, combinators) {
      var combinatorsIndexes = [];
      var combinatorsPattern = this.getSearchPattern(combinators, 'combinator');
      var match = void 0;
      while ((match = combinatorsPattern.exec(query)) !== null) {
        combinatorsIndexes.push({ start: match.index, end: combinatorsPattern.lastIndex });
      }
      return combinatorsIndexes;
    }
  }, {
    key: 'getSearchPattern',
    value: function getSearchPattern(searchValues, name) {
      var pattern = '';
      for (var _i2 = 0; _i2 < searchValues.length; _i2 += 1) {
        pattern += '|' + searchValues[_i2][name];
      }
      // To remove first | character
      pattern = pattern.slice(1);
      return new RegExp(pattern, 'g');
    }
  }, {
    key: 'getFirstCombinator',
    value: function getFirstCombinator(element, combinators) {
      var foundCombinator = element.children.find(function (x) {
        return combinators.find(function (y) {
          return y.combinator === x.value;
        });
      });
      if (!foundCombinator) {
        for (var _i3 = 0; _i3 < element.children.length; _i3 += 1) {
          foundCombinator = this.getFirstCombinator(element.children[_i3], combinators);
        }
      }
      return foundCombinator;
    }
  }]);
  return QueryParser;
}();

exports.default = QueryParser;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Condition = require('./Condition');

var _Condition2 = _interopRequireDefault(_Condition);

var _QueryParser = require('./helpers/QueryParser');

var _QueryParser2 = _interopRequireDefault(_QueryParser);

require('../styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildDefaultConfig(config) {
  var defConfig = config || {};
  defConfig.query = defConfig.query ? defConfig.query : '()';
  defConfig.operators = defConfig.operators ? defConfig.operators : [{ operator: '=', label: '=' }, { operator: '<>', label: '<>' }, { operator: '<', label: '<' }, { operator: '>', label: '>' }, { operator: '>=', label: '>=' }, { operator: '<=', label: '<=' }, { operator: 'is null', label: 'Null' }, { operator: 'is not null', label: 'Not Null' }, { operator: 'in', label: 'In' }, { operator: 'not in', label: 'Not In' }];
  defConfig.combinators = defConfig.combinators ? defConfig.combinators : [{ combinator: 'AND', label: 'And' }, { combinator: 'OR', label: 'Or' }, { combinator: 'NOT', label: 'Not' }];
  defConfig.animation = defConfig.animation ? defConfig.animation : 'none';
  defConfig.styles = defConfig.styles ? defConfig.styles : {
    primaryBtn: 'queryButtonPrimary',
    deleteBtn: 'queryButtonDelete',
    rule: 'rule',
    condition: 'condition',
    select: 'querySelect',
    input: 'queryInput',
    txtArea: 'queryText',
    error: 'error'
  };
  return defConfig;
}

function fillDefaultButtonsText(buttonsText) {
  var defBtnText = buttonsText || {};
  defBtnText.addRule = defBtnText.addRule ? defBtnText.addRule : 'Add rule';
  defBtnText.addGroup = defBtnText.addGroup ? defBtnText.addGroup : 'Add group';
  defBtnText.clear = defBtnText.clear ? defBtnText.clear : 'Clear';
  defBtnText.delete = defBtnText.delete ? defBtnText.delete : 'Delete';
  return defBtnText;
}

var TwoWayQuerybuilder = function (_React$Component) {
  (0, _inherits3.default)(TwoWayQuerybuilder, _React$Component);

  function TwoWayQuerybuilder(props) {
    (0, _classCallCheck3.default)(this, TwoWayQuerybuilder);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TwoWayQuerybuilder.__proto__ || (0, _getPrototypeOf2.default)(TwoWayQuerybuilder)).call(this, props));

    _this.config = buildDefaultConfig(props.config);
    _this.buttonsText = fillDefaultButtonsText(props.buttonsText);
    var defaultData = {
      combinator: _this.config.combinators[0].combinator,
      nodeName: '1',
      rules: []
    };
    _this.state = {
      data: _this.config.query === '()' ? defaultData : _QueryParser2.default.parseToData(_this.config.query, _this.config),
      query: _this.config.query === '()' ? null : _this.config.query
    };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(TwoWayQuerybuilder, [{
    key: 'handleChange',
    value: function handleChange(data) {
      var queryObj = {};
      queryObj.data = data;
      queryObj.query = _QueryParser2.default.parseToQuery(data);
      this.setState({ query: queryObj.query });
      if (this.props.onChange) {
        this.props.onChange(queryObj);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'reactTwoWayQueryBuilder' },
        _react2.default.createElement(_Condition2.default, {
          config: this.config,
          buttonsText: this.buttonsText,
          fields: this.props.fields,
          nodeName: '1',
          data: this.state.data,
          onChange: this.handleChange
        })
      );
    }
  }]);
  return TwoWayQuerybuilder;
}(_react2.default.Component);

TwoWayQuerybuilder.propTypes = {
  buttonsText: _propTypes2.default.object,
  config: _propTypes2.default.object,
  fields: _propTypes2.default.array.isRequired,
  onChange: _propTypes2.default.func
};

TwoWayQuerybuilder.defaultProps = {
  buttonsText: {}
};

exports.default = TwoWayQuerybuilder;
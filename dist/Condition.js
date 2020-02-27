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

var _TreeHelper = require('./helpers/TreeHelper');

var _TreeHelper2 = _interopRequireDefault(_TreeHelper);

var _Rule = require('./Rule');

var _Rule2 = _interopRequireDefault(_Rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Condition = function (_React$Component) {
  (0, _inherits3.default)(Condition, _React$Component);

  function Condition(props) {
    (0, _classCallCheck3.default)(this, Condition);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Condition.__proto__ || (0, _getPrototypeOf2.default)(Condition)).call(this, props));

    _this.treeHelper = new _TreeHelper2.default(_this.props.data);
    _this.node = _this.treeHelper.getNodeByName(_this.props.nodeName);
    _this.state = {
      data: _this.node
    };
    _this.addRule = _this.addRule.bind(_this);
    _this.addCondition = _this.addCondition.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    _this.handleChildUpdate = _this.handleChildUpdate.bind(_this);
    _this.combinatorChange = _this.combinatorChange.bind(_this);
    _this.styles = _this.props.config.styles;
    return _this;
  }

  (0, _createClass3.default)(Condition, [{
    key: 'addRule',
    value: function addRule() {
      var data = this.state.data;
      var nodeName = this.treeHelper.generateNodeName(this.state.data);
      data.rules.push({
        field: this.props.fields[0].name,
        operator: this.props.config.operators[0].operator,
        value: '',
        nodeName: nodeName });
      this.setState({ data: data });
      this.props.onChange(this.props.data);
    }
  }, {
    key: 'addCondition',
    value: function addCondition() {
      var data = this.state.data;
      var nodeName = this.treeHelper.generateNodeName(this.state.data);
      data.rules.push({
        combinator: this.props.config.combinators[0].combinator,
        nodeName: nodeName,
        rules: [] });
      this.setState({ data: data });
      this.props.onChange(this.props.data);
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(nodeName) {
      this.treeHelper.removeNodeByName(nodeName);
      this.props.onChange(this.props.data);
    }
  }, {
    key: 'handleChildUpdate',
    value: function handleChildUpdate() {
      var node = this.treeHelper.getNodeByName(this.props.nodeName);
      this.setState({ data: node });
      this.props.onChange(this.props.data);
    }
  }, {
    key: 'combinatorChange',
    value: function combinatorChange(event) {
      this.node.combinator = event.target.value;
      this.props.onChange(this.props.data);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: this.styles.condition },
        _react2.default.createElement(
          'select',
          { value: this.state.data.combinator, className: this.styles.select, onChange: this.combinatorChange },
          this.props.config.combinators.map(function (combinator, index) {
            return _react2.default.createElement(
              'option',
              { value: combinator.combinator, key: index },
              combinator.label
            );
          })
        ),
        _react2.default.createElement(
          'button',
          { type: 'button', className: this.styles.primaryBtn, onClick: this.addCondition },
          this.props.buttonsText.addGroup
        ),
        _react2.default.createElement(
          'button',
          { type: 'button', className: this.styles.primaryBtn, onClick: this.addRule },
          this.props.buttonsText.addRule
        ),
        this.props.nodeName !== '1' ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            onClick: function onClick() {
              return _this2.handleDelete(_this2.props.nodeName);
            },
            className: this.styles.deleteBtn },
          this.props.buttonsText.delete
        ) : null,
        this.state.data.rules.map(function (rule, index) {
          if (rule.field) {
            return _react2.default.createElement(_Rule2.default, {
              key: index,
              buttonsText: _this2.props.buttonsText,
              fields: _this2.props.fields,
              operators: _this2.props.config.operators,
              nodeName: rule.nodeName,
              data: _this2.props.data,
              onChange: _this2.handleChildUpdate,
              styles: _this2.props.config.styles });
          } else {
            return _react2.default.createElement(Condition, {
              key: index,
              config: _this2.props.config,
              buttonsText: _this2.props.buttonsText,
              fields: _this2.props.fields,
              nodeName: rule.nodeName,
              data: _this2.props.data,
              onChange: _this2.handleChildUpdate });
          }
        })
      );
    }
  }]);
  return Condition;
}(_react2.default.Component);

Condition.propTypes = {
  buttonsText: _propTypes2.default.object.isRequired,
  config: _propTypes2.default.object.isRequired,
  data: _propTypes2.default.object.isRequired,
  fields: _propTypes2.default.array.isRequired,
  nodeName: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func
};

exports.default = Condition;
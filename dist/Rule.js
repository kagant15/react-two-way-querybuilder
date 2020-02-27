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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultErrorMsg = 'Input value is not correct';

var isValueCorrect = function isValueCorrect(pattern, value) {
  var newPattern = new RegExp(pattern);
  var match = newPattern.exec(value);
  return match === null;
};

var Rule = function (_React$Component) {
  (0, _inherits3.default)(Rule, _React$Component);

  function Rule(props) {
    (0, _classCallCheck3.default)(this, Rule);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Rule.__proto__ || (0, _getPrototypeOf2.default)(Rule)).call(this, props));

    _this.getFieldByName = _this.getFieldByName.bind(_this);
    _this.generateRuleObject = _this.generateRuleObject.bind(_this);
    _this.onFieldChanged = _this.onFieldChanged.bind(_this);
    _this.onOperatorChanged = _this.onOperatorChanged.bind(_this);
    _this.onInputChanged = _this.onInputChanged.bind(_this);
    _this.getInputTag = _this.getInputTag.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    _this.treeHelper = new _TreeHelper2.default(_this.props.data);
    _this.node = _this.treeHelper.getNodeByName(_this.props.nodeName);
    _this.styles = _this.props.styles;
    _this.state = {
      currField: _this.generateRuleObject(_this.props.fields[0], _this.node),
      validationError: false
    };
    return _this;
  }

  (0, _createClass3.default)(Rule, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.node = this.treeHelper.getNodeByName(nextProps.nodeName);
    }
  }, {
    key: 'onFieldChanged',
    value: function onFieldChanged(event) {
      this.node.field = event.target.value;
      var field = this.getFieldByName(event.target.value);
      var rule = this.generateRuleObject(field, this.node);
      this.setState({ currField: rule });
      this.props.onChange();
    }
  }, {
    key: 'onOperatorChanged',
    value: function onOperatorChanged(event) {
      this.node.operator = event.target.value;
      var field = this.getFieldByName(this.node.field);
      var rule = this.generateRuleObject(field, this.node);
      this.setState({ currField: rule });
      this.props.onChange();
    }
  }, {
    key: 'onInputChanged',
    value: function onInputChanged(event) {
      var pattern = this.state.currField.input.pattern;
      if (pattern) {
        this.setState({ validationError: isValueCorrect(pattern, event.target.value) });
      }
      this.node.value = event.target.value;
      var field = this.getFieldByName(this.node.field);
      var rule = this.generateRuleObject(field, this.node);
      this.setState({ currField: rule });
      this.props.onChange();
    }
  }, {
    key: 'getFieldByName',
    value: function getFieldByName(name) {
      return this.props.fields.find(function (x) {
        return x.name === name;
      });
    }
  }, {
    key: 'getInputTag',
    value: function getInputTag(inputType) {
      var errorText = this.state.currField.input.errorText;

      switch (inputType) {
        case 'textarea':
          return _react2.default.createElement(
            'div',
            { className: this.styles.txtArea },
            _react2.default.createElement('textarea', {
              className: 'input', onChange: this.onInputChanged,
              value: this.node.value ? this.node.value : ''
            }),
            this.state.validationError ? _react2.default.createElement(
              'p',
              { className: this.styles.error },
              errorText || defaultErrorMsg
            ) : null
          );
        case 'select':
          return _react2.default.createElement(
            'select',
            { className: this.styles.select, onChange: this.onInputChanged },
            this.state.currField.input.options.map(function (option, index) {
              return _react2.default.createElement(
                'option',
                { value: option.value, key: index },
                option.name
              );
            })
          );
        default:
          return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', {
              type: this.state.currField.input.type,
              value: this.node.value,
              onChange: this.onInputChanged, className: this.styles.input
            }),
            this.state.validationError ? _react2.default.createElement(
              'p',
              { className: this.styles.error },
              errorText || defaultErrorMsg
            ) : null
          );
      }
    }
  }, {
    key: 'generateRuleObject',
    value: function generateRuleObject(field, node) {
      var rule = {};
      rule.input = field.input;
      node = node ? node : this.treeHelper.getNodeByName(this.props.nodeName);
      rule.input.value = node.value;
      if (!field.operators || typeof field.operators === 'string') {
        rule.operators = this.props.operators;
        return rule;
      }
      var ruleOperators = [];
      for (var i = 0, length = field.operators.length; i < length; i += 1) {
        for (var opIndex = 0, opLength = this.props.operators.length; opIndex < opLength; opIndex += 1) {
          if (field.operators[i] === this.props.operators[opIndex].operator) {
            ruleOperators.push(this.props.operators[opIndex]);
          }
        }
      }
      rule.operators = ruleOperators;
      return rule;
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete() {
      this.treeHelper.removeNodeByName(this.props.nodeName);
      this.props.onChange();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.styles.rule },
        _react2.default.createElement(
          'select',
          {
            value: this.node.field,
            className: this.styles.select,
            onChange: this.onFieldChanged
          },
          this.props.fields.map(function (field, index) {
            return _react2.default.createElement(
              'option',
              { value: field.name, key: index },
              field.label
            );
          })
        ),
        _react2.default.createElement(
          'select',
          {
            value: this.node.operator,
            className: this.styles.select,
            onChange: this.onOperatorChanged
          },
          this.state.currField.operators.map(function (operator, index) {
            return _react2.default.createElement(
              'option',
              { value: operator.operator, key: index },
              operator.label
            );
          })
        ),
        this.getInputTag(this.state.currField.input.type),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: this.styles.deleteBtn,
            onClick: this.handleDelete
          },
          this.props.buttonsText.delete
        )
      );
    }
  }]);
  return Rule;
}(_react2.default.Component);

Rule.propTypes = {
  buttonsText: _propTypes2.default.object,
  data: _propTypes2.default.object.isRequired,
  fields: _propTypes2.default.array.isRequired,
  nodeName: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func,
  operators: _propTypes2.default.array.isRequired,
  styles: _propTypes2.default.object.isRequired
};

exports.default = Rule;
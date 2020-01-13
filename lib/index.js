import _slicedToArray from "/home/ITRANSITION.CORP/m.kulikova/_projects/MyReactComponents/react-date-picker/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "/home/ITRANSITION.CORP/m.kulikova/_projects/MyReactComponents/react-date-picker/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/ITRANSITION.CORP/m.kulikova/_projects/MyReactComponents/react-date-picker/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/ITRANSITION.CORP/m.kulikova/_projects/MyReactComponents/react-date-picker/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/ITRANSITION.CORP/m.kulikova/_projects/MyReactComponents/react-date-picker/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/ITRANSITION.CORP/m.kulikova/_projects/MyReactComponents/react-date-picker/node_modules/@babel/runtime/helpers/esm/inherits";
import React from "react";
import YearView from "../YearView";
import MonthView from "../MonthView";
import { connect } from "react-redux";
import { setDate as _setDate } from "../../actions";
import { ROOT_CLASS, MONTHS } from "../../constants";
import './styles/style.scss';

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));
    props.store && typeof props.onChange === 'function' && props.store.subscribe(function () {
      props.onChange(props.store.getState().datePickerReducer);
    });
    return _this;
  }

  _createClass(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var initialDate = this.props.initialDate;

      if (initialDate) {
        var errorMsg = 'Incorrect date format. Use Date object or string in format "year-month-day"';

        if (initialDate instanceof Date) {
          this.props.setDate({
            day: initialDate.getUTCDate(),
            month: initialDate.getUTCMonth(),
            year: initialDate.getUTCFullYear()
          });
        } else if (typeof initialDate === 'string') {
          try {
            var _initialDate$split$ma = initialDate.split('-').map(function (el) {
              return Number(el);
            }),
                _initialDate$split$ma2 = _slicedToArray(_initialDate$split$ma, 3),
                year = _initialDate$split$ma2[0],
                month = _initialDate$split$ma2[1],
                day = _initialDate$split$ma2[2];

            var date = new Date(Date.UTC(year, month - 1, day));

            if (year !== date.getUTCFullYear() || month - 1 !== date.getUTCMonth() || day !== date.getUTCDate()) {
              throw new Error(errorMsg);
            } else {
              this.props.setDate({
                day: day,
                month: month - 1,
                year: year
              });
            }
          } catch (e) {
            console.error(e);
          }
        } else {
          throw new Error(errorMsg);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          day = _this$props.day,
          month = _this$props.month,
          year = _this$props.year;
      return React.createElement(React.Fragment, null, React.createElement("h2", {
        className: "".concat(ROOT_CLASS, "__title")
      }, React.createElement("span", null, this.props.title, ": "), React.createElement("span", {
        className: "".concat(ROOT_CLASS, "__title-selected-date")
      }, "".concat(day ? day : '  ', " ").concat(month ? MONTHS[month].name.short : '   ', " ").concat(year ? year : '    '))), this.props.month !== '' ? React.createElement(MonthView, {
        data: this.props.data
      }) : React.createElement(YearView, null));
    }
  }]);

  return DatePicker;
}(React.Component);

function mapStateToProps(state) {
  return {
    day: state.datePickerReducer.day,
    month: state.datePickerReducer.month,
    year: state.datePickerReducer.year
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDate: function setDate(date) {
      return dispatch(_setDate(date));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);

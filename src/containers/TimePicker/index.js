import React from "react";
import {connect} from "react-redux";
import {setStartHours, setStartMinutes, setEndHours, setEndMinutes,} from "../../actions";
import {ROOT_CLASS} from "../../constants";
import './styles/style.scss';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);

    props.store && typeof props.onChange === 'function' && props.store.subscribe(() => {
      props.onChange(props.store.getState().timePickerReducer);
    });
  }

  isFilled() {
    return this.props.startHours !== '' && this.props.startMinutes !== '' && this.props.endHours !== '' && this.props.endMinutes !== '';
  }

  validate() {
    return this.props.endHours * 60 + this.props.endMinutes >= this.props.startHours * 60 + this.props.startMinutes;
  }

  getCells(count, step, callback, selectedItem) {
    const cells = [];

    for (let i = 0; i < count; i += step) {
      const selectedClass = selectedItem === i ? `${ROOT_CLASS}__cell--selected` : '';

      cells.push(<div className={`${ROOT_CLASS}__cell ${selectedClass}`} key={i} onClick={(e) => {
        callback(i)
      }}>{i}</div>);
    }

    return cells;
  }

  render() {
    return <React.Fragment>
      <section className={`${ROOT_CLASS}__col`}>
        <h2 className={`${ROOT_CLASS}__title`}>
          {`Start time: ${this.props.startHours !== '' ? this.props.startHours : '--'}:${this.props.startMinutes !== '' ? this.props.startMinutes : '--'}`}
        </h2>
        <div className={`${ROOT_CLASS}__wrapper`}>
          <div className={`${ROOT_CLASS}__cell-wrapper`}>
            {this.getCells(24, 1, this.props.setStartHours, this.props.startHours)}
          </div>
          <div className={`${ROOT_CLASS}__cell-wrapper`} aria-disabled={this.props.startHours === ''}>
            {this.getCells(60, 5, this.props.setStartMinutes, this.props.startMinutes)}
          </div>
        </div>
      </section>
      <section className={`${ROOT_CLASS}__col`}>
        <h2 className={`${ROOT_CLASS}__title`}>
          {`End time: ${this.props.endHours !== '' ? this.props.endHours : '--'}:${this.props.endMinutes !== '' ? this.props.endMinutes : '--'}`}
        </h2>
        <div className={`${ROOT_CLASS}__wrapper`}>
          <div className={`${ROOT_CLASS}__cell-wrapper`}>
            {this.getCells(24, 1, this.props.setEndHours, this.props.endHours)}
          </div>
          <div className={`${ROOT_CLASS}__cell-wrapper`} aria-disabled={this.props.endHours === ''}>
            {this.getCells(60, 5, this.props.setEndMinutes, this.props.endMinutes)}
          </div>
        </div>
      </section>
      {this.isFilled() && !this.validate() &&
      <div className={`${ROOT_CLASS}__error`}>End date should be greater or equal than start date</div>}
    </React.Fragment>;
  }
}

function mapStateToProps(state) {
  return {
    startHours: state.timePickerReducer.startHours,
    startMinutes: state.timePickerReducer.startMinutes,
    endHours: state.timePickerReducer.endHours,
    endMinutes: state.timePickerReducer.endMinutes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setStartHours: (hours) => dispatch(setStartHours(hours)),
    setStartMinutes: (minutes) => dispatch(setStartMinutes(minutes)),
    setEndHours: (hours) => dispatch(setEndHours(hours)),
    setEndMinutes: (minutes) => dispatch(setEndMinutes(minutes)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);

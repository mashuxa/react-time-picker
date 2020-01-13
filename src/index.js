import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {combineReducers} from "redux";
import timePickerReducer from './reducer';
import TimePicker from './containers/TimePicker';
import * as serviceWorker from './serviceWorker';

const store = createStore(combineReducers({timePickerReducer}));

/**
 * Date picker
 *
 * @returns {component}
 * @param date
 */

ReactDOM.render(
    <Provider store={store}>
        <TimePicker onChange={''} store={store} />
    </Provider>,
    document.getElementById('react-time-picker'));

serviceWorker.unregister();

export {TimePicker, timePickerReducer};

const initialState = {
    startHours: '',
    startMinutes: '',
    endHours: '',
    endMinutes: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_START_HOURS':
            return Object.assign({}, state, {
                startHours: action.payload,
            });

        case 'SET_START_MINUTES':
            return Object.assign({}, state, {
                startMinutes: action.payload,
            });

        case 'SET_END_HOURS':
            return Object.assign({}, state, {
                endHours: action.payload,
            });

        case 'SET_END_MINUTES':
            return Object.assign({}, state, {
                endMinutes: action.payload,
            });

        default:
            return state;
    }
}

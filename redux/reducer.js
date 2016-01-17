import { combineReducers } from 'redux';
import deck from './deck';
import user from './user';

export default combineReducers({
	user,
    deck
});
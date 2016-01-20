import { combineReducers } from 'redux';
import deck from './deck';
import user from './user';
import characterDetail from './characterDetail';

export default combineReducers({
	user,
    deck,
    characterDetail
});
// @flow
import {FETCH_USER} from './../actions/types';

export default function (state: any = null, action: any) {
  switch (action.type) {
    case FETCH_USER:
      return action.user || false; // empty string coerce to false so if false return boolean false
    default:
      return state;
  }
}

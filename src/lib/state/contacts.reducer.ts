import { addAll, deleteOne, upsertOne } from '@libs/midgard-angular/src/lib/modules/store/reducer.utils';
import {
  CREATE_CONTACT_COMMIT, DELETE_CONTACT_COMMIT, LOAD_ALL_CONTACTS_COMMIT, LOAD_ONE_CONTACT_COMMIT,
  UPDATE_CONTACT_COMMIT
} from './contacts.actions';

export interface ContactState {
  data: ContactUser[];
  loaded: false;
  created: false;
  updated: false;
  deleted: false;
}
const initialState: ContactState = {
  data: [],
  loaded: false,
  created: false,
  updated: false,
  deleted: false
};

export function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_CONTACTS_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_CONTACT_COMMIT:
      return upsertOne(state, action);
    case CREATE_CONTACT_COMMIT:
      return upsertOne(state, action);
    case UPDATE_CONTACT_COMMIT:
      return upsertOne(state, action);
    case DELETE_CONTACT_COMMIT:
      return deleteOne(state, action);
    default:
      return state;
  }
}

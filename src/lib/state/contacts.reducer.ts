import { MidgardState } from '@libs/midgard-angular/src/lib/state/midgard.model';
import { LOAD_DATA_CONTACTS_COMMIT } from '@libs/contacts/src/lib/state/contacts.actions';

const initialState: MidgardState = {
  workflowLevel1: [],
  workflowLevel2: [],
  dataLoaded: false
};

export function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_CONTACTS_COMMIT:
      return Object.assign({}, state, {
        workflowLevel1: action.data,
        dataLoaded: true
      });

    default:
      return state;
  }
}

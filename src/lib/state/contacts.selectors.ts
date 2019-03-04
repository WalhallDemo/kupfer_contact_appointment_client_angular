import { reselect } from '@src/midgard/modules/store';
import {ContactState} from './contacts.reducer';

const getContacts = state => state.contactsReducer;

export const getAllContacts = reselect.createSelector(
  getContacts,
  (contactState: ContactState) => {
    if (contactState) {
      contactState.data.map(contact => {
        contact.email = contact.emails && contact.emails[0] ? contact.emails[0].email : '';
        contact.address = contact.addresses && contact.addresses[0] ? contact.addresses[0].street : '';
        contact.phone = contact.phones && contact.phones[0] ? contact.phones[0].number : '';
        return contact;
      });
      return contactState;
    }
  }
);

/**
 * selector that selects one contact from the contacts reducer
 * @param {number} id - id of the document
 * @returns {MemoizedSelector<any, any>}
 */
export const selectContact = (id: number) => reselect.createSelector(getContacts, (contacts) => {
  return contacts.data.find( contact => contact.id.toString() === id.toString());
});


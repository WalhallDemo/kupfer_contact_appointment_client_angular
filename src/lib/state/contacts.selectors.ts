import { reselect } from '@src/midgard/modules/store';
import {ContactState} from './contacts.reducer';

const getContacts = state => state.contactsReducer;

export const getAllContacts = reselect.createSelector(
  getContacts,
  (contactState: ContactState) => {
    if (contactState && contactState.data.results) {
      return contactState.data.results.map(contact => {
        contact.name = contact.first_name && contact.last_name ? `${contact.first_name} ${contact.last_name}` : '';
        contact.email = contact.emails && contact.emails[0] ? contact.emails[0].email : '';
        contact.address = contact.addresses && contact.addresses[0] ? contact.addresses[0].street : '';
        contact.phone = contact.phones && contact.phones[0] ? contact.phones[0].number : '';
        return contact;
      });
    }
  }
);

/**
 * selector to check if the data is loaded
 */
export const getContactsLoaded = reselect.createSelector(
  getContacts,
  (contactsState: ContactState) => {
    if (contactsState) {
      return contactsState.loaded;
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


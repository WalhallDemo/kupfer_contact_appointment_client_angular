import { reselect } from '@libs/midgard-angular/src/lib/modules/store';

const getContacts = state => state.contactsReducer;

export const getAllContacts = reselect.createSelector(
  getContacts,
  (contacts) => {
    if (contacts) {
      contacts.data.map(contact => {
        contact.fullName = `
        ${contact.title ? contact.title : ''}
        ${contact.first_name ? contact.first_name : ''}
        ${contact.middle_name ? contact.middle_name : ''}
        ${contact.last_name ? contact.last_name : ''}
         `;
        contact.email = contact.emails ? contact.emails[0].email : '';
        contact.address = contact.addresses ? contact.addresses[0].address : '';
        contact.phone = contact.phones ? contact.phones[0].number : '';
        return contact;
      });
      return contacts;
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


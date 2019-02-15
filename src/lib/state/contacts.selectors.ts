import { reselect } from '@libs/midgard-angular/src/lib/modules/store';

const getContacts = state => state.contactsReducer;

export const getAllContacts = reselect.createSelector(
  getContacts,
  (contacts) => {
    if (contacts) {
      contacts.data.map(contact => {
        contact.email = contact.emails && contact.emails[0] ? contact.emails[0].email : '';
        contact.address = contact.addresses && contact.addresses[0] ? contact.addresses[0].street : '';
        contact.phone = contact.phones ? contact.phones[0].number : '';
        const random = (Math.random() * 10); // TODO: to get a random picture just for demo and should be removed
        if (random > 5 && random < 8 && contact.first_name !== 'Name') {
          contact.image = '/assets/img/contact-example2.jpeg';
        } else if (random < 5 && random > 2 && contact.first_name !== 'Name') {
          contact.image = '/assets/img/contact-example.jpeg';
        }
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


// Load All
import {Contact} from './contacts.model';

export const LOAD_ALL_CONTACTS = 'LOAD_ALL_CONTACTS';
export const LOAD_ALL_CONTACTS_COMMIT = 'LOAD_ALL_CONTACTS_COMMIT';
export const LOAD_ALL_CONTACTS_FAIL = 'LOAD_ALL_CONTACTS_FAIL';

// Load One
export const LOAD_ONE_CONTACT = 'LOAD_ONE_CONTACT';
export const LOAD_ONE_CONTACT_COMMIT = 'LOAD_ONE_CONTACT_COMMIT';
export const LOAD_ONE_CONTACT_FAIL = 'LOAD_ONE_CONTACT_FAIL';

// Create
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const CREATE_CONTACT_COMMIT = 'CREATE_CONTACT_COMMIT';
export const CREATE_CONTACT_FAIL = 'CREATE_CONTACT_FAIL';

// Update
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const UPDATE_CONTACT_COMMIT = 'UPDATE_CONTACT_COMMIT';
export const UPDATE_CONTACT_FAIL = 'UPDATE_CONTACT_FAIL';

// Delete
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const DELETE_CONTACT_COMMIT = 'DELETE_CONTACT_COMMIT';
export const DELETE_CONTACT_FAIL = 'DELETE_CONTACT_FAIL';


export function loadContacts() {
  return {
    type: LOAD_ALL_CONTACTS,
  };
}

export function loadContactsCommit(data: Contact[]) {
  return {
    type: LOAD_ALL_CONTACTS_COMMIT,
    data
  };
}

export function loadContactsFail(error) {
  return {
    type: LOAD_ALL_CONTACTS_FAIL,
    error
  };
}

export function loadOneContact(id: string) {
  return {
    type: LOAD_ONE_CONTACT,
    id
  };
}

export function loadOneContactCommit(data: Contact) {
  return {
    type: LOAD_ONE_CONTACT_COMMIT,
    data
  };
}

export function loadOneContactFail(error) {
  return {
    type: LOAD_ONE_CONTACT_FAIL,
    error
  };
}

export function createContact(data: Contact) {
  return {
    type: CREATE_CONTACT,
    data,
  };
}

export function createContactCommit(data: Contact, index?: number) {
  return {
    type: CREATE_CONTACT_COMMIT,
    data,
    index
  };
}

export function createContactFail(error) {
  return {
    type: CREATE_CONTACT_FAIL,
    error
  };
}

export function updateContact(data) {
  return {
    type: UPDATE_CONTACT,
    data
  };
}

export function updateContactCommit(data: Contact, nested) {
  return {
    type: UPDATE_CONTACT_COMMIT,
    data,
    nested
  };
}

export function updateContactFail(error) {
  return {
    type: UPDATE_CONTACT_FAIL,
    error
  };
}

export function deleteContact(data: Contact) {
  return {
    type: DELETE_CONTACT,
    id
  };
}

export function deleteContactCommit(data: Contact, nested) {
  return {
    type: DELETE_CONTACT_COMMIT,
    data,
    nested
  };
}

export function deleteContactFail(error) {
  return {
    type: DELETE_CONTACT_FAIL,
    error
  };
}


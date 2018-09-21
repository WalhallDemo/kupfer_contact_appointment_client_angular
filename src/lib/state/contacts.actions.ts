export const LOAD_DATA_CONTACTS = 'LOAD_DATA_CONTACTS';
export const LOAD_DATA_CONTACTS_COMMIT = 'LOAD_DATA_CONTACTS_COMMIT';
export const LOAD_DATA_CONTACTS_FAIL = 'LOAD_DATA_CONTACTS_FAIL';

export function loadContactsData() {
  return {
    type: LOAD_DATA_CONTACTS,
  };
}

export function loadContactsDataCommit(data) {
  return {
    type: LOAD_DATA_CONTACTS_COMMIT,
    data
  };
}

export function loadContactsDataFail(error) {
  return {
    type: LOAD_DATA_CONTACTS_FAIL,
    error
  };
}


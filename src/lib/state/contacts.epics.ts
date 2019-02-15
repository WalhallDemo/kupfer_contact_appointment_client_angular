import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createContactCommit, createContactFail, deleteContactCommit, deleteContactFail,
  loadOneContactFail, loadContactsCommit,
  updateContactCommit, updateContactFail, loadContactsFail
} from '@libs/contacts/src/lib/state/contacts.actions';
import { environment } from '@env/environment';
import { reduxObservable } from '@libs/midgard-angular/src/lib/modules/store';
import { Action } from '@libs/midgard-angular/src/lib/state/action.type';
import {
  CREATE_CONTACT, DELETE_CONTACT, LOAD_ALL_CONTACTS, LOAD_ONE_CONTACT, loadOneContactCommit,
  UPDATE_CONTACT
} from './contacts.actions';

const httpService = new HttpService();

/**
 * this is here to handle asynchronous actions and will be triggered when LOAD_DATA_CONTACTS action is dispatched
 * @param {Observable} action$ - the current action
 */
const loadAllContactsEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_ALL_CONTACTS),
    switchMap((action: any) => {
      return httpService.makeRequest('get', `${environment.API_URL}/crm/contact`, {}, true).pipe(
        // If successful, dispatch success action with result
        map(res => loadContactsCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadContactsFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_CONTACT action is dispatched
 * @param {Observable} action$ - the current action
 */
const loadOneContactEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(LOAD_ONE_CONTACT),
    switchMap((action: Action) => {
      return httpService.makeRequest('get', `${environment.API_URL}/crm/contact/${action.id}/`, {}, true).pipe(
        // If successful, dispatch success action with result
        map((res: Action) => loadOneContactCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadOneContactFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when CREATE_CONTACT action is dispatched
 * @param {Observable} action$ - the current action
 */
const createContactEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(CREATE_CONTACT),
    switchMap((action: Action) => {
      return httpService.makeRequest('post', `${environment.API_URL}/crm/contact/`, action.data, true).pipe(
        // If successful, dispatch success action with result
        map((res: Action) => createContactCommit(res.data, action.index)),
        // If request fails, dispatch failed action
        catchError((error) => of(createContactFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when UPDATE_CONTACT action is dispatched
 * @param {Observable} action$ - the current action
 */
const updateContactEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(UPDATE_CONTACT),
    switchMap((action: Action) => {
      const payload = {...action.data};
      delete payload['id']; // remove id from payload because we already send it in the url
      return httpService.makeRequest('put', `${environment.API_URL}/crm/contact/${action.data.id}/`, payload, true).pipe(
        // If successful, dispatch success action with result
        map((res: Action) => updateContactCommit(res.data, action.nested)),
        // If request fails, dispatch failed action
        catchError((error) => of(updateContactFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when DELETE_PRODUCT action is dispatched
 * @param {Observable} action$ - the current action
 */
const deleteContactEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(DELETE_CONTACT),
    switchMap((action: Action) => {
      return httpService.makeRequest('delete', `${environment.API_URL}/crm/contact/${action.data.id}/`, true).pipe(
        // If successful, dispatch success action with result
        map(res => deleteContactCommit(action.data, action.nested)),
        // If request fails, dispatch failed action
        catchError((error) => of(deleteContactFail(error)))
      );
    })
  );
};
// combine the modules epics into one
export const contactsEpics = reduxObservable.combineEpics(
  loadAllContactsEpic,
  loadOneContactEpic,
  updateContactEpic,
  deleteContactEpic,
  createContactEpic,
);

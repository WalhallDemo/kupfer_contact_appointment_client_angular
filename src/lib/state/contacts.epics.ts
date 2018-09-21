import { HttpService } from '@libs/midgard-angular/src/lib/modules/http-module/http.service';
import { combineEpics, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { catchError, map } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { LOAD_DATA_CONTACTS, loadContactsDataCommit, loadContactsDataFail } from '@libs/contacts/src/lib/state/contacts.actions';

const httpService = new HttpService();

/**
 * @description this is here to handle asynchronous actions and will be triggered when LOAD_DATA_CONTACTS action is dispatched
 * @param {Observable} action$ - the current action
 */
const loadContactDataEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_DATA_CONTACTS),
    switchMap((action: any) => {
      return httpService.makeRequest('get', 'https://dev.toladata.io/api/workflowlevel1/').pipe(
        // If successful, dispatch success action with result
        map(res => loadContactsDataCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadContactsDataFail(error)))
      );
    })
  );
};

// combine the modules epics into one
export const contactsEpics  = combineEpics(loadContactDataEpic);

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { getAllContacts } from '@libs/contacts/src/lib/state/contacts.selectors';
import { Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { setTopBarOptions } from '@libs/midgard-angular/src/lib/state/top-bar/top-bar.actions';
import { CardItemOptions } from '../../../midgard-angular/src/lib/components/card-item/card-item-options';
import { ListComponent } from '../../../midgard-angular/src/lib/modules/crud/list/list.component';

@Component({
  selector: 'lib-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @ViewChild('crudList') crudList: ListComponent;

  public tableOptions;
  public cardItemOptions: CardItemOptions;
  public topBarOptions = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Active',
      value: 'active'
    },
    {
      label: 'Disabled',
      value: 'disabled'
    }
  ];
  public graphQlQuery;
  public selector = getAllContacts;


  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.dispatch(setTopBarOptions(this.topBarOptions));
    this.defineCardItemOptions();
    this.defineTableOptions();
  }

  /**
   * defines options for card item components
   */
  private defineCardItemOptions() {
    this.cardItemOptions = {
      title: {
        prop: 'fullName',
        label: 'Contact Name'
      },
      picture: {
        thumbnail: 'picture',
        image: 'Picture'
      },
      subText: {
        prop: 'description',
        label: 'Contact Description'
      },
      caption: {
        prop: 'email',
        label: 'Email'
      },
      link: {
        prop: 'address',
        label: 'Address'
      },
      belowMenuPrimaryAction: {
        label: 'New Contact',
        value: 'new'
      },
      otherActions: [
        {
          label: '•••',
          value: '•••'
        },
        {
          label: 'Delete',
          value: 'delete'
        },
        {
          label: 'Pin to Dashboard',
          value: 'pin'
        }
      ],
      belowMenuOtherActions: [
        {
          label: '•••',
          value: '•••'
        },
        {
          label: 'Delete',
          value: 'delete'
        },
        {
          label: 'Pin to Dashboard',
          value: 'pin'
        }
      ],
      date1: {
        prop: 'create_date',
        label: 'Created at'
      },
      date2: {
        prop: 'edit_date',
        label: 'Updated at'
      },
      details: [
        {
          prop: 'id',
          label: 'ID'
        },
        {
          prop: 'phone',
          label: 'Number'
        },
      ],
      description: {
        prop: 'description',
        label: 'Description'
      },
    };
  }

  /**
   * defines options for the table component
   */
  private defineTableOptions() {
    this.tableOptions = {
      columns: [
        {name: 'Name', prop: 'fullName', flex: 2, sortable: true, filtering: true},
        {name: '', cellTemplate: 'actions', actions: ['delete']},
      ]
    };
  }

  /**
   * function that listens if an action from the card-item component has been triggered
   * @param {string} actionData - an object that contains the type of the action that has been triggered and the selected item
   */
  handleCardItemActionClicked(actionData: {actionType: string, item: any}) {
    switch (actionData.actionType) {
      case 'new':
        const itemIndex = this.crudList.rows.indexOf(actionData.item) + 1;
        // generate a placeholder item
        const contact = {};
        contact.first_name =  'First Name';
        contact.last_name = 'Last Name';
        contact.workflowlevel1_uuids = [];
        return this.crudList.createItem(contact, itemIndex);
      case 'delete':
        return this.crudList.deleteItem(item);
      default:
        return false;
    }
  }

  /**
   * function that is triggered when the card item is edited
   * @param {string} editedData - an object that contains the edited object and the current card item data
   */
  handleCardItemEdited(editedData: {editedObj: string, item: any}) {
    let editedProperty;
    console.log(editedData);
    // if (editedObj.index !== undefined) {
    //   editedProperty = this.cardItemOptions[editedObj.element][editedObj.index].prop;
    // } else {
    //   editedProperty = this.cardItemOptions[editedObj.element].prop;
    // }
    // const newItem: any = {};
    // newItem.id = item.id;
    // newItem.name = item.name;
    // if (editedObj.value && editedObj.value !== '') {
    //   newItem[editedProperty] = editedObj.value;
    //   this.store.dispatch({
    //     type: this.updateAction,
    //     data: newItem
    //   });
    // }
  }
}


import {Component, OnInit, ViewChild} from '@angular/core';
import { getAllContacts } from '@clients/contacts/src/lib/state/contacts.selectors';
import { Store } from '@src/midgard/modules/store/store';
import { setTopBarOptions } from '@src/midgard/state/top-bar/top-bar.actions';
import { CardItemOptions } from '@src/midgard/components/card-item/card-item-options';
import { CrudComponent } from '@src/midgard/modules/crud/crud.component';
import { getContactsLoaded } from './state/contacts.selectors';

@Component({
  selector: 'lib-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @ViewChild('crud') crud: CrudComponent;

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
  public dataSelector = getAllContacts;
  public loadedSelector = getContactsLoaded;


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
        prop: 'name',
        label: 'Contact Name'
      },
      picture: {
        thumbnail: 'image',
        image: 'image'
      },
      subText: {
        prop: 'company',
        label: 'Company'
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
        {name: 'Name', prop: 'name', cellTemplate: 'picture-edit', flex: 3, sortable: true, filtering: true},
        {name: 'Company', prop: 'company', cellTemplate: 'edit', flex: 2, sortable: true, filtering: true},
        {name: 'Email', prop: 'email', cellTemplate: 'edit', flex: 2, sortable: true, filtering: true},
        {name: 'Phone', prop: 'phone', cellTemplate: 'edit', flex: 2, sortable: true, filtering: true},
        {name: 'Address', prop: 'address', cellTemplate: 'edit', flex: 2, sortable: true, filtering: true},
        {name: '', cellTemplate: 'actions', actions: this.cardItemOptions.otherActions},
      ]
    };
  }

  /**
   * function that listens if an action from the card-item component has been triggered
   * @param {string} actionData - an object that contains the type of the action that has been triggered and the selected item
   */
  handleItemActionClicked(actionData: {actionType: string, item: any}) {
    let itemIndex;
    switch (actionData.actionType) {
      case 'new':
        if (actionData.item) {
          itemIndex = this.crud.rows.indexOf(actionData.item) + 1;
        } else {
          itemIndex = 1;
        }
        // generate a placeholder item
        const contact: any = {};
        contact.first_name = 'First Name';
        contact.last_name = 'Last Name';
        contact.addresses = [{street: 'Address'}];
        contact.emails = [{email: 'email@email.com'}];
        contact.phones = [{number: 'Phone'}];
        contact.company = 'Company';
        contact.workflowlevel1_uuids = [];
        return this.crud.createItem(contact, itemIndex);
      case 'delete':
        return this.crud.deleteItem(actionData.item);
      default:
        return false;
    }
  }

  /**
   * function that is triggered when the card item is edited
   * @param {string} editedField - an object that contains the edited property and
   * the edited value of the field object and the current card item data
   */
  handleItemEdited(editedField: {value: any, property, itemData: any}) {
    const {value, property, itemData} = editedField;
    const newItem: any = {};
    newItem.id = itemData.id;
    newItem.first_name = itemData.first_name;
    newItem.last_name = itemData.last_name;
    newItem.workflowlevel1_uuids = itemData.workflowlevel1_uuids;
    itemData.addresses && itemData.addresses.length > 0 ? newItem.addresses = itemData.addresses : newItem.addresses = [];
    itemData.emails && itemData.emails.length > 0 ? newItem.emails = itemData.emails : newItem.emails = [];
    itemData.phones && itemData.phones.length > 0 ? newItem.phones = itemData.phones : newItem.phones = [];
    if (value && value !== '') {
      switch (property) {
        case 'name':
          const firstName = value.split(' ')[0];
          const lastName = value.split(' ')[1];
          newItem.first_name = firstName;
          newItem.last_name = lastName;
          break;
        case 'email':
          newItem.emails[0].email = value;
          break;
        case 'address':
          newItem.addresses[0].street = value;
          break;
        case 'phone':
           newItem.phones[0].number = value;
          break;
        default:
          newItem[property] = value;
      }
      this.crud.updateItem(newItem);
    }
  }
}


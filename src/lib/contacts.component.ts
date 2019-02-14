import { Component, OnInit } from '@angular/core';
import { getAllContacts } from '@libs/contacts/src/lib/state/contacts.selectors';
import { Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { setTopBarOptions } from '@libs/midgard-angular/src/lib/state/top-bar/top-bar.actions';
import {CardItemOptions} from '../../../midgard-angular/src/lib/components/card-item/card-item-options';

@Component({
  selector: 'lib-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
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
      subText: {
        prop: 'make',
        label: 'Contact Brand'
      },
      subText2: {
        prop: 'contact_type',
        label: 'Contact Type'
      },
      caption: {
        prop: 'reference_id',
        label: 'Ref.'
      },
      link: {
        prop: 'style',
        label: 'Style'
      },
      picture: {
        thumbnail: 'picture',
        image: 'Picture'
      },
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
          prop: 'model',
          label: 'Model'
        },
        {
          prop: 'status',
          label: 'Status'
        },
      ],
      description: {
        prop: 'description',
        label: 'Description'
      },
      belowMenuPrimaryAction: {
        label: 'New Contact',
        value: 'new'
      },
      secondaryAction: {
        label: 'Publish',
        value: 'publish'
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
          label: 'Share',
          value: 'share'
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
          label: 'Share',
          value: 'share'
        }
      ]
    };
  }

  /**
   * defines options for the table component
   */
  private defineTableOptions() {
    this.tableOptions = {
      columns: [
        {name: 'Name', prop: 'name', flex: 2, sortable: true, filtering: true},
        {name: 'Manu.', prop: 'make', flex: 2, sortable: true, filtering: true},
        {name: 'Model', prop: 'model', flex: 2, sortable: true, filtering: false},
        {name: 'Style', prop: 'style', flex: 2, sortable: true, filtering: false},
        {name: 'Description', prop: 'description', flex: 2, sortable: true, filtering: false},
        {name: 'Ref.', prop: 'reference_id', flex: 2, sortable: true, filtering: false},
        {name: 'Date Created', prop: 'create_date', index: 1, flex: 1, cellTemplate: 'date', sortable: true},
        {name: '', cellTemplate: 'actions', actions: ['delete']},
      ]
    };
  }
}


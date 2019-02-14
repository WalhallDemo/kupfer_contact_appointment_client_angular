import { Component, OnInit } from '@angular/core';
import { getAllContacts } from '@libs/contacts/src/lib/state/contacts.selectors';

@Component({
  selector: 'lib-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  public formFields;
  public graphQlQuery;
  public selector;

  constructor(
  ) { }

  ngOnInit() {
    this.selector = getAllContacts;
    this.defineFormFields();
  }

  /**
   * defines form fields of the detail view
   */
  defineFormFields() {
    this.formFields = [
      {label: 'Name', controlName: 'name', type: 'text', validators: ['required'] },
      {label: 'Manufacturer', controlName: 'make', type: 'text'},
      {label: 'Model', controlName: 'model', type: 'text' },
      {label: 'Style', controlName: 'style', type: 'text'},
      {label: 'Description', controlName: 'description', type: 'text' },
      {label: 'Ref.', controlName: 'reference_id', type: 'text' },
    ];
  }

}

import { NgModule } from '@angular/core';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from '@libs/contacts/src/lib/contacts.routing-module';

@NgModule({
  imports: [
    ContactsRoutingModule
  ],
  declarations: [ContactsComponent],
  exports: [ContactsComponent]
})
export class ContactsModule { }

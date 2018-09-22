import { NgModule } from '@angular/core';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from '@libs/contacts/src/lib/contacts.routing-module';
import { MidgardHttpModule } from '@libs/midgard-angular/src/lib/modules/http-module/http.module';
import { MigardStoreModule } from '@libs/midgard-angular/src/lib/modules/store-module/store.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ContactsRoutingModule,
  ],
  declarations: [ContactsComponent],
  exports: [ContactsComponent]
})
export class ContactsModule { }

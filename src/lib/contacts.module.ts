import { NgModule } from '@angular/core';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from '@clients/contacts/src/lib/contacts-routing.module';
import { MidgardCrudModule } from '@src/midgard/modules/crud/crud.module';
import { MidgardSharedTranslationModule } from '@src/midgard/modules/translation/translation.shared.module';
import { ContactDetailComponent } from './pages/contact-detail/contact-detail.component';
import { MatIconModule } from '@angular/material';
import {MidgardFormModule} from '@src/midgard/modules/form/form.module';

@NgModule({
  imports: [
    MidgardCrudModule,
    MidgardFormModule,
    MidgardSharedTranslationModule,
    ContactsRoutingModule,
    MatIconModule
  ],
  declarations: [ContactsComponent, ContactDetailComponent],
  exports: [ContactsComponent]
})
export class ContactsModule { }

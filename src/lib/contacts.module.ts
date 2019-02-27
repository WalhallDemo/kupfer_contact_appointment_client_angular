import { NgModule } from '@angular/core';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from '@libs/contacts/src/lib/contacts-routing.module';
import { MidgardCrudModule } from '@libs/midgard-angular/src/lib/modules/crud/crud.module';
import { MidgardSharedTranslationModule } from '@libs/midgard-angular/src/lib/modules/translation/translation.shared.module';
import { ContactDetailComponent } from './pages/contact-detail/contact-detail.component';
import { MatIconModule } from '@angular/material';
import {MidgardFormModule} from '../../../midgard-angular/src/lib/modules/form/form.module';

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

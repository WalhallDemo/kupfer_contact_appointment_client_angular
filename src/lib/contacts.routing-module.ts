import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ContactsComponent } from '@libs/contacts/src/lib/contacts.component';

const contactsRoutes: Routes = [
  {
    path: '', component: ContactsComponent
  }
];

export const ContactsRoutingModule = RouterModule.forRoot(contactsRoutes);

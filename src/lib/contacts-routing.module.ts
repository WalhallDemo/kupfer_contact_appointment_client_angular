import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@src/midgard/modules/oauth/auth.guard';
import { ContactsComponent } from '@clients/contacts/src/lib/contacts.component';
import { ContactDetailComponent } from '@clients/contacts/src/lib/pages/contact-detail/contact-detail.component';

const contactsRoutes: Routes = [
  { path: '', component: ContactsComponent, canActivate: [AuthGuard]},
  { path: 'details/:id', component: ContactDetailComponent, canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forChild(contactsRoutes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {}

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@libs/midgard-angular/src/lib/modules/oauth/auth.guard';
import { ContactsComponent } from '@libs/contacts/src/lib/contacts.component';
import { ContactDetailComponent } from '@libs/contacts/src/lib/pages/contact-detail/contact-detail.component';

const contactsRoutes: Routes = [
  { path: '', component: ContactsComponent, canActivate: [AuthGuard]},
  { path: 'details/:id', component: ContactDetailComponent, canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forChild(contactsRoutes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {}

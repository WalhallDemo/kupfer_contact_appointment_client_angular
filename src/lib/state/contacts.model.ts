import {WorkflowLevel2} from '../../../../midgard-angular/src/lib/state/workflow-level2/workflow-level2.model';

interface Telephone {
  type: string;
  number: string;
}
interface Email {
  type: string;
  email: string;
}

export interface Address {
  type: string;
  street?: string;
  house_number: string;
  postal_code: string;
  city: string;
  country: string;
  district?: string;
}

export interface Contact {
  id?: number;
  url?: string;
  contact_type?: string;
  customer_type?: string;
  company?: string;
  title?: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  addresses?: Address[];
  address: string;
  image: string;
  email: string;
  emails?: Email[];
  faxes?: number;
  phones?: Telephone[];
  phone: string;
  notes?: string;
  user?: string;
  uuid?: string;
  workflowlevel2?: string[] | WorkflowLevel2[];
  organization_uuid?: string;
  workflowlevel1_uuids?: string[];
  workflowlevel2_uuids?: string[];
  siteprofile_uuids?: string[];
}

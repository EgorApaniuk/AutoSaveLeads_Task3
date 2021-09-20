import { LightningElement, track, wire} from 'lwc';
import createContactsTable from '@salesforce/apex/tableContacts.createContactsTable';
// CONTACTS contents idNAME & NAME 
// import NAME_FIELD from '@salesforce/schema/Contact.Name';


const COLUMNS = [
    { label: 'Name', fieldName: 'Name', editable: true},
    { label: 'IdName', fieldName: 'Id', editable:false}
];

    
export default class ShowTableContacts extends LightningElement {

    @track data ;
    columns = COLUMNS;

    @wire(createContactsTable)
        wiredContacts({error, data}) {
            if(data) {
                this.data = data;
                console.log(JSON.stringify(data));
            } else if (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            } else {
		        // eslint-disable-next-line no-console
		        console.log('unknown error')
            }
        }
    
}

import { LightningElement, track, wire} from 'lwc';
import getContactsTable from '@salesforce/apex/ContactController.getContactsTable';

const COLUMNS = [
    { label: 'Name', fieldName: 'recordLink', type: 'url', 
    typeAttributes: {label: {fieldName: 'Name'}, tooltip: 'Name', target: '_blank'}},
    { label: 'IdName', fieldName: 'Id', editable:false}
];
    
export default class ShowTableContacts extends LightningElement {

    @track data;
    columns = COLUMNS;

    @wire(getContactsTable)
        wiredContacts({error, data}) {
            if(data) {
                var tempContactList = [];
                for (var i=0; i<data.length; i++) {
                    let tempRecord = Object.assign({}, data[i]);
                    tempRecord.recordLink = '/'  + tempRecord.Id;// making name field clicable
                    tempRecord.Id = tempRecord.Id +'Name';
                    tempContactList.push(tempRecord);
                }
                this.data = tempContactList; 
            } else if (error) {
                console.log(error);
            } else {
		        console.log('unknown error')
            }
        }
}

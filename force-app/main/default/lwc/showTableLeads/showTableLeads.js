import { LightningElement, wire, track } from 'lwc';
import getLeadsTable from '@salesforce/apex/tableLeads.getLeadsTable';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ID_FIELD from '@salesforce/schema/Lead.Id';
import TITLE_FIELD from '@salesforce/schema/Lead.Title';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';

const COLUMNS = [
    {
        label: 'Name', fieldName: 'recordLink', type: 'url',
        typeAttributes: { label: { fieldName: 'Name' }, tooltip: 'Name', target: '_blank' }
    },
    { label: 'Title', fieldName: 'Title', type: 'text', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
];

export default class ShowTableLeads extends LightningElement {

    @track data;
    columns = COLUMNS;
    refreshWiredLead;

    @wire(getLeadsTable)
    wiredLeads(value) {
        this.refreshWiredLead = value;
        const { data, error } = value;
        if (data) {

            var tempLeadList = [];
            for (var i = 0; i < data.length; i++) {
                let tempRecord = Object.assign({}, data[i]);
                tempRecord.recordLink = '/' + tempRecord.Id;
                tempLeadList.push(tempRecord);
            } // making name field clickable 
            this.data = tempLeadList;
        } else if (error) {
            console.log(error);
        }
    }

    handleSave(event) {
        const fields = {};
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[TITLE_FIELD.fieldApiName] = event.detail.draftValues[0].Title;
        fields[PHONE_FIELD.fieldApiName] = event.detail.draftValues[0].Phone;
        const recordInput = { fields };

        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'lead updated',
                        variant: 'success'
                    })
                );
                return refreshApex(this.refreshWiredLead).then(() => {
                    this.template.querySelector('lightning-datatable').draftValues = [];
                });
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating or reloading record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}
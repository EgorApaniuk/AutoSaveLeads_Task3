import { LightningElement, wire, track } from 'lwc';
import createLeadsTable from '@salesforce/apex/tableLeads.createLeadsTable';


const COLUMNS = [
    {label: 'Name', fieldName: 'recordLink', type: 'url', 
    typeAttributes: {label: {fieldName: 'Name'}, tooltip: 'Name', target: '_blank'}
    },
    {label: 'Title', fieldName: 'Title', type: 'text',  editable:true},
    {label: 'Phone', fieldName: 'Phone', type: 'phone', editable:true},
];

export default class ShowTableLeads extends LightningElement {
    @track data;
    columns = COLUMNS;

    @wire(createLeadsTable)
        wiredLeads({error, data}) {
            if(data) {

                var tempLeadList = [];
                for (var i=0; i<data.length; i++) {
                    let tempRecord = Object.assign({}, data[i]); //клонируем объект
                    tempRecord.recordLink = "/"  + tempRecord.Id;
                    tempLeadList.push(tempRecord);
                } // таким образом делаем поле name кликабельным
                this.data = tempLeadList; 
                console.log(JSON.stringify(data));
            } else if (error) {
                console.log(error);
            } else {
		        console.log('unknown error')
            }
        }
}
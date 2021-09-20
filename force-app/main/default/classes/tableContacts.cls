public with sharing class tableContacts {
    @AuraEnabled(cacheable=true)
        public static List<Contact> createContactsTable() {
                List<Contact> contactList = new List<Contact>();
                contactList = [SELECT Name, Id
                FROM Contact];
                return contactList;
        }
}

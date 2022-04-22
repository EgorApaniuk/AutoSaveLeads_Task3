public class tableContacts {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsTable() {
        List<Contact> contacts = new List<Contact>();
        contacts = [SELECT Name, Id FROM Contact];
        return contacts;
    }
}
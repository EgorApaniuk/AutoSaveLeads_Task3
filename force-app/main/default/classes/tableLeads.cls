public with sharing class tableLeads {
    @AuraEnabled(cacheable=true)
    public static List<Lead> createLeadsTable() {
            List<Lead> leadList = new List<Lead>();
            leadList = [SELECT Name, Title,Phone
            FROM Lead];
            return leadList;
    }
}

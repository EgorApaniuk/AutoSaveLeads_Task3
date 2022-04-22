public class tableLeads {

    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeadsTable() {
            List<Lead> leads = new List<Lead>();
            leads = [SELECT Name, Title, Phone FROM Lead];
            return leads;
    }
}

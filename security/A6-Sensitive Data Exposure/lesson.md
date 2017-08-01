# Sensitive Data Exposure

 
### Vulnerability description:

OWASP documentation: https://www.owasp.org/index.php/Top_10_2013-A6-Sensitive_Data_Exposure

A data breach is the intentional or unintentional release of secure or private/confidential information to an untrusted environment. 
Other terms for this phenomenon include unintentional information disclosure, data leak and also data spill. 
Incidents range from concerted attack by black hats associated with organized crime, political activist or national governments to careless disposal of used computer equipment or data storage media.

### Example of Attack

1. Login to the insecure-web-app
2. Using browser's network monitor, inspect the JSON batch of users that are retrieved after login and displayed in the table
3. Each JSON should containt confidential JMBG field - this is sensitive data that is exposed!

### Analysis of the Attack

Find the file Employee.java. The employee class should have this field present:

```
@Column(name = "JMBG", nullable = false)
    private String jmbg;
```

It should also contain appropriate getters and setters.
This is all fine, but we need to find a way to not leak this field into the HTTP responses that return employees.

### Task: Prevent Sensitive Data Exposure

Instruct the JSON serializer to ignore the sensitive field. This can often be done declaratively (e.g. in the Java apps using annotations).



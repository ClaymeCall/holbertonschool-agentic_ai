# Case study - The Friday night incident

*(fictional scenario, for Task 4)*

The team at **PixelCart**, a small online shop, is rolling out its new checkout
page. Here is what happened, as later reconstructed.

**Friday, 5:40 pm.** Karim wants to ship a fix the marketing team has been asking
for before the weekend. There is no automated pipeline: deploying means logging
into the production server over SSH, copying the files by hand, then editing the
configuration file directly on the server.

**5:52 pm.** Karim changes a configuration value (the database URL) but leaves a
typo in it. There is no test environment identical to production; he tested
"more or less" on his own machine.

**6:05 pm.** Karim leaves for the weekend. Nobody is actively watching the site,
and there is no automated alerting.

**8:30 pm.** A customer reports on social media that checkout is failing. The post
spreads. Nobody on the team sees it until the next morning.

**Saturday, 9:15 am.** Inès, unofficially on call, discovers the complaints. She
does not have access to the server and does not know what was deployed: there is
no record of what changed, and no simple way to roll back.

**Saturday, 11:40 am.** After reaching Karim, identifying the typo, and fixing the
file by hand, service is restored. The toll: around 15 hours of checkout downtime
over a weekend, and a chunk of lost revenue.

---

# Post-Mortem: The Friday Night Incident at PixelCart

## Timeline

| **Time**               | **Event**                                                                                     | **Status**  |
|------------------------|---------------------------------------------------------------------------------------------|-------------|
| Friday, 5:52 pm        | Karim introduces a typo in the database URL configuration file.                            | Occurred    |
| Friday, 6:05 pm        | Karim leaves for the weekend. No monitoring or alerting in place.                           | Undetected |
| Friday, 8:30 pm        | Customer reports checkout failure on social media. Team remains unaware.                  | Undetected    |
| Saturday, 9:15 am      | Inès discovers the issue but lacks server access and deployment records.                   | Detected    |
| Saturday, 11:40 am     | Service restored after Karim fixes the typo manually. Total downtime: ~15 hours.          | Resolved    |


## Systemic Causes

1. **Manual Deployment Process**: Deployments are performed manually via SSH, increasing the risk of human error (e.g., typos in configuration files).
2. **Lack of Testing Environment**: No staging or production-like environment exists for validating changes before deployment.
3. **Absence of Automated Alerting**: No monitoring or alerting system to detect and notify the team of outages in real time.
4. **No Deployment Records**: Lack of a change log or version control for deployments, making it difficult to track or roll back changes.
5. **Limited Access and Knowledge Sharing**: Inès lacked access to the server and was unaware of recent changes, highlighting poor access control and knowledge silos.
6. **No Rollback Mechanism**: No automated or documented rollback process, prolonging recovery time.


## Priority Actions

### 1. **Introduce a CI/CD Pipeline with Automated Testing**
   - **Justification**: Manual deployments and lack of testing led to the typo being deployed. A CI/CD pipeline with automated tests (including configuration validation) would catch errors before production. This reduces deployment failures and improves reliability.
   - **DORA Metric Impacted**: **Change Failure Rate** (and **Change lead time**).

### 2. **Implement Automated Alerting and Monitoring**
   - **Justification**: The incident was detected late (14.5 hours after occurrence) due to reliance on social media reports. Automated alerts would enable immediate detection of outages.
   - **DORA Metric Impacted**: **Time to restore service**.

### 3. **Establish a Rollback and Deployment Tracking System**
   - **Justification**: The lack of deployment records and rollback mechanisms delayed resolution. Implementing version-controlled deployments (e.g., Git-based) and a rollback system would enable quick recovery from failures.
   - **DORA Metric Impacted**: **Time to restore service**.

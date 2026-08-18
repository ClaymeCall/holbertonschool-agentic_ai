## Q1. Match each DORA metric to its definition

### Deployment frequency

How many code changes go to production per unit of time. (changes/time)

### Lead time for changes

How long changes take to implement, from source control to production. (time / change)

### Change failure rate

The failure rate of a deployment to production. (eg. 1 deployment/ 10 causes an outage or an issue)

### Time to restore / MTTR

The time it takes to patch defective software from occurrence to resolution (3h to patch an outage after it first occured)

## Q2. A team deploys once a quarter. Which metric is poor?

The deployment frequency is low.

## Q3. You shorten the time between merging a PR and shipping it to production. Which metric improves?

Lead time improves.

## Q4. 1 deployment out of 4 causes an incident. Which metric is this, and is a high value good or bad?

Change failure rate is the correct measurement. The lower it is, the better.

## Q5. What does the acronym CALMS stand for?

Culture, Automation, Lean, Measurement, Sharing

## Q6. True or false: "elite" teams deploy less often but in bigger batches. Justify your answer.

False.
The best way is to make small incremental changes. This will reduce lead time, increase deployment frequency, thus making outages smaller and faster to repair.

## Q7. Which practice improves MTTR the most?

    (a) more manual approval steps
->  (b) monitoring and alerting plus automated rollback
    (c) batching deployments once a month

## Q8. Among the 4 DORA metrics, which measure throughput and which measure stability?

Throughput: Deployment Frequency, Lead time for changes
Stability: Change Failure rate, Time to restore service/MTTR


## Q9. Why do we run blameless post-mortems?
Because when there was an outage, the priority is to reinforce the system to prevent that from happening again.
Looking for culprits is not a good way to do that, because unless it was sabotage, anyone in the same place could have caused the same outage if the system is lackluster.


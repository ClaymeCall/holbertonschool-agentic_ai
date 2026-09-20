# QA Report 2.2: Redis Resilience and Integration

## 1. **`worker.js` – Redis Connection Resilience**
### **Issues**
| **Issue**                          | **Criticality** | **Description**                                                                                             |
|-------------------------------------|-----------------|-------------------------------------------------------------------------------------------------------------|
| Hardcoded max retries               | Medium          | `MAX_RETRY_ATTEMPTS` is hardcoded to `5`. Should be configurable via `REDIS_MAX_RETRIES`.                   |
| No explicit jitter                  | Low             | `async-retry` does not explicitly add jitter.                                                              |
| No circuit breaker                  | High            | No circuit breaker to halt retries after repeated failures.                                                 |
| No fallback storage                 | High            | No alternative storage (e.g., local cache) when Redis is unavailable.                                      |
| Missing connection time logging     | Low             | Time taken to establish Redis connection is not logged.                                                     |

### **Proposed Corrections**
1. Make `MAX_RETRY_ATTEMPTS` configurable:
   ```javascript
   const MAX_RETRY_ATTEMPTS = parseInt(process.env.REDIS_MAX_RETRIES) || 5;
   ```
2. Add jitter to `async-retry`:
   ```javascript
   {
     retries: MAX_RETRY_ATTEMPTS,
     minTimeout: REDIS_RETRY_DELAY_MS,
     maxTimeout: REDIS_RETRY_DELAY_MS * 10,
     factor: 2, // Exponential backoff
     randomize: true, // Jitter
     onRetry: (error, attempt) => { ... }
   }
   ```
3. Implement a circuit breaker (e.g., `opossum`):
   ```javascript
   const CircuitBreaker = require('opossum');
   const redisBreaker = new CircuitBreaker(connectRedis, {
     timeout: 5000,
     errorThresholdPercentage: 50,
     resetTimeout: 30000
   });
   ```
4. Add fallback storage (e.g., `node-cache`):
   ```javascript
   const NodeCache = require('node-cache');
   const localCache = new NodeCache({ stdTTL: 3600 });
   ```
5. Log connection time:
   ```javascript
   const startTime = Date.now();
   await redisClient.connect();
   log(`Redis connected in ${Date.now() - startTime}ms`);
   ```

---

## 2. **`docker-compose.yml` – Redis Health Checks**
### **Issues**
| **Issue**                          | **Criticality** | **Description**                                                                                             |
|-------------------------------------|-----------------|-------------------------------------------------------------------------------------------------------------|
| `express_app` lacks health checks   | Medium          | `express_app` does not wait for Redis to be healthy, which could cause race conditions.                     |

### **Proposed Corrections**
1. Add `condition: service_healthy` to `express_app`:
   ```yaml
   depends_on:
     redis:
       condition: service_healthy
   ```

---

## 3. **`server.js` – Redis Integration**
### **Issues**
| **Issue**                          | **Criticality** | **Description**                                                                                             |
|-------------------------------------|-----------------|-------------------------------------------------------------------------------------------------------------|
| Redis integration is inactive       | High            | Redis integration is commented out. Uncomment and test if required.                                        |
| No degraded mode                    | High            | No degraded mode or fallback storage if Redis is unavailable.                                              |
| No circuit breaker                  | High            | No circuit breaker to halt retries after repeated failures.                                                 |

### **Proposed Corrections**
1. Uncomment Redis integration and test:
   ```javascript
   const { createClient } = require('redis');
   const redisClient = await connectRedis();
   ```
2. Add degraded mode:
   ```javascript
   let isRedisAvailable = true;
   if (!isRedisAvailable) {
     console.warn('Redis unavailable. Using local cache.');
     // Use localCache.set() / localCache.get()
   }
   ```
3. Implement a circuit breaker (e.g., `opossum`).

---

## 4. **Security and Quality Checks**
### **Findings**
- **`QA-instructions.md`**: Not found. Recommend creating this file to document:
  - `npm audit` results.
  - `docker scan` results.
  - `npm run lint` and `npm run typecheck` results.
  - Redis-specific resilience requirements.

### **Proposed Corrections**
1. Create `QA-instructions.md` with:
   ```markdown
   # QA Instructions
   ## Security Checks
   - Run `npm audit` and fix critical/high vulnerabilities.
   - Run `docker scan` and fix critical/high vulnerabilities.

   ## Quality Checks
   - Run `npm run lint` and fix all errors.
   - Run `npm run typecheck` and fix all type errors.

   ## Redis Resilience Requirements
   - Implement exponential backoff, jitter, and max retries.
   - Add circuit breaking and fallback storage.
   - Log retry attempts, reconnections, and connection time.
   ```
## Proof of working HITL in Langfuse

```sh
[2026-09-20 16:08:59] [DEBUG] LLM Payload: {"model":"mistral-medium-latest","response_format":{"type":"json_object"},"messages":[{"role":"system","content":"Analyze the following transaction for fraud detection. Respond with a JSON object containing:\n- riskLevel: \"low\", \"medium\", or \"high\"\n- comment: string explaining the risk level"},{"role":"user","content":"{\"orderId\":\"145\",\"amount\":10000,\"type\":\"payment\"}"}]}
[2026-09-20 16:09:00] [LLM] Transaction 145 risk analysis: {"riskLevel":"high","comment":"Transaction amount is unusually high for a single payment, which may indicate potential fraud."}
[HITL] Transaction 145 has risk level: high. Comment: Transaction amount is unusually high for a single payment, which may indicate potential fraud.
Autoriser (o) ou Refuser (n)? o
[2026-09-20 16:09:03] [HITL] Transaction 145 autorisée
[2026-09-20 16:09:03] Transaction 145 processed successfully
[2026-09-20 16:09:03] Processing transaction: 145
[2026-09-20 16:09:03] [DEBUG] LLM Payload: {"model":"mistral-medium-latest","response_format":{"type":"json_object"},"messages":[{"role":"system","content":"Analyze the following transaction for fraud detection. Respond with a JSON object containing:\n- riskLevel: \"low\", \"medium\", or \"high\"\n- comment: string explaining the risk level"},{"role":"user","content":"{\"orderId\":\"145\",\"amount\":10000,\"type\":\"payment\"}"}]}
[2026-09-20 16:09:03] [LLM] Transaction 145 risk analysis: {"riskLevel":"high","comment":"Transaction amount is unusually high for a single payment, which may indicate potential fraud."}
[HITL] Transaction 145 has risk level: high. Comment: Transaction amount is unusually high for a single payment, which may indicate potential fraud.
Autoriser (o) ou Refuser (n)? o
[2026-09-20 16:09:06] [HITL] Transaction 145 autorisée
[2026-09-20 16:09:06] Transaction 145 processed successfully
[2026-09-20 16:09:06] Processing transaction: 19845
[2026-09-20 16:09:06] [DEBUG] LLM Payload: {"model":"mistral-medium-latest","response_format":{"type":"json_object"},"messages":[{"role":"system","content":"Analyze the following transaction for fraud detection. Respond with a JSON object containing:\n- riskLevel: \"low\", \"medium\", or \"high\"\n- comment: string explaining the risk level"},{"role":"user","content":"{\"orderId\":\"19845\",\"amount\":10000,\"type\":\"payment\"}"}]}
[2026-09-20 16:09:06] [LLM] Transaction 19845 risk analysis: {"riskLevel":"high","comment":"Transaction amount is unusually high for a single payment, which may indicate potential fraud."}
[HITL] Transaction 19845 has risk level: high. Comment: Transaction amount is unusually high for a single payment, which may indicate potential fraud.
Autoriser (o) ou Refuser (n)? o
[2026-09-20 16:09:07] [HITL] Transaction 19845 autorisée
[2026-09-20 16:09:07] Transaction 19845 processed successfully
[2026-09-20 16:09:07] Processing transaction: 19845
[2026-09-20 16:09:07] [DEBUG] LLM Payload: {"model":"mistral-medium-latest","response_format":{"type":"json_object"},"messages":[{"role":"system","content":"Analyze the following transaction for fraud detection. Respond with a JSON object containing:\n- riskLevel: \"low\", \"medium\", or \"high\"\n- comment: string explaining the risk level"},{"role":"user","content":"{\"orderId\":\"19845\",\"amount\":10000,\"type\":\"payment\"}"}]}
ntial fraud."}
[HITL] Transaction 19845 has risk level: high. Comment: Transaction amount is unusually hig
h (10000) for a single payment, which may indicate potential fraud.
Autoriser (o) ou Refuser (n)? n
[2026-09-20 16:09:09] [HITL] Transaction 19845 refusée
[2026-09-20 16:09:09] [HITL] Transaction 19845 rejected by human reviewer
[2026-09-20 16:09:09] Processing transaction: 19845
[2026-09-20 16:09:09] [DEBUG] LLM Payload: {"model":"mistral-medium-latest","response_forma
t":{"type":"json_object"},"messages":[{"role":"system","content":"Analyze the following tra
nsaction for fraud detection. Respond with a JSON object containing:\n- riskLevel: \"low\",
 \"medium\", or \"high\"\n- comment: string explaining the risk level"},{"role":"user","con
tent":"{\"orderId\":\"19845\",\"amount\":10000,\"type\":\"payment\"}"}]}
[2026-09-20 16:09:09] [LLM] Transaction 19845 risk analysis: {"riskLevel":"high","comment":
"Transaction amount is unusually high (10000) for a single payment, which may indicate pote
ntial fraud."}
[HITL] Transaction 19845 has risk level: high. Comment: Transaction amount is unusually hig
h (10000) for a single payment, which may indicate potential fraud.
Autoriser (o) ou Refuser (n)? n
[2026-09-20 16:09:10] [HITL] Transaction 19845 refusée
[2026-09-20 16:09:10] [HITL] Transaction 19845 rejected by human reviewer
[2026-09-20 16:09:10] Processing transaction: 19845
[2026-09-20 16:09:10] [DEBUG] LLM Payload: {"model":"mistral-medium-latest","response_forma
t":{"type":"json_object"},"messages":[{"role":"system","content":"Analyze the following tra
nsaction for fraud detection. Respond with a JSON object containing:\n- riskLevel: \"low\",
 \"medium\", or \"high\"\n- comment: string explaining the risk level"},{"role":"user","con
tent":"{\"orderId\":\"19845\",\"amount\":10000,\"type\":\"payment\"}"}]}
[2026-09-20 16:09:11] [LLM] Transaction 19845 risk analysis: {"riskLevel":"high","comment":
"Transaction amount is unusually high for a single payment, which may indicate potential fr
aud."}
[HITL] Transaction 19845 has risk level: high. Comment: Transaction amount is unusually hig
h for a single payment, which may indicate potential fraud.
Autoriser (o) ou Refuser (n)? o
[2026-09-20 16:09:13] [HITL] Transaction 19845 autorisée
[2026-09-20 16:09:13] Transaction 19845 processed successfully
[2026-09-20 16:09:13] Processing transaction: 19845
[2026-09-20 16:09:13] [DEBUG] LLM Payload: {"model":"mistral-medium-latest","response_forma
t":{"type":"json_object"},"messages":[{"role":"system","content":"Analyze the following tra
nsaction for fraud detection. Respond with a JSON object containing:\n- riskLevel: \"low\",
 \"medium\", or \"high\"\n- comment: string explaining the risk level"},{"role":"user","con
tent":"{\"orderId\":\"19845\",\"amount\":10000,\"type\":\"payment\"}"}]}
[2026-09-20 16:09:13] Transaction 19845 processed successfully
[2026-09-20 16:09:13] Processing transaction: 19845
[2026-09-20 16:09:13] [DEBUG] LLM Payload: {"model":"mistral-medium-latest","response_format":{"type":"json_object"},"messages":[{"role":"system","
content":"Analyze the following transaction for fraud detection. Respond with a JSON object containing:\n- riskLevel: \"low\", \"medium\", or \"hig
h\"\n- comment: string explaining the risk level"},{"role":"user","content":"{\"orderId\":\"19845\",\"amount\":10000,\"type\":\"payment\"}"}]}
[2026-09-20 16:09:13] [LLM] Transaction 19845 risk analysis: {"riskLevel":"high","comment":"Transaction amount is unusually high for a single payme
nt, which may indicate potential fraud."}
[HITL] Transaction 19845 has risk level: high. Comment: Transaction amount is unusually high for a single payment, which may indicate potential fra
ud.
Autoriser (o) ou Refuser (n)? n
[2026-09-20 16:09:14] [HITL] Transaction 19845 refusée
[2026-09-20 16:09:14] [HITL] Transaction 19845 rejected by human reviewer
```

```json
[{"id":"1cb9941a-59cb-418f-8f91-1584ebf7298b","traceId":"12345","sessionId":null,"datasetRunId":null,"timestamp":"2026-09-20T16:04:26.187Z","source":"API","name":"risk_score","dataType":"NUMERIC","value":0.5,"stringValue":null,"comment":"Risk level: medium","metadata":{},"observationId":null,"traceName":"fraud_detection","userId":"","traceTags":[],"environment":"default","authorUserName":null},{"id":"7436d45d-ab31-43fb-9634-320afaf5edcc","traceId":"12345","sessionId":null,"datasetRunId":null,"timestamp":"2026-09-20T15:42:53.284Z","source":"API","name":"risk_score","dataType":"NUMERIC","value":0.5,"stringValue":null,"comment":"Risk level: medium","metadata":{},"observationId":null,"traceName":"fraud_detection","userId":"","traceTags":[],"environment":"default","authorUserName":null},{"id":"d37514d4-e8b3-4e12-8e30-137f76a80018","traceId":"12345","sessionId":null,"datasetRunId":null,"timestamp":"2026-09-20T15:37:59.082Z","source":"API","name":"risk_score","dataType":"NUMERIC","value":1,"stringValue":null,"comment":"Risk level: high","metadata":{},"observationId":null,"traceName":"fraud_detection","userId":"","traceTags":[],"environment":"default","authorUserName":null},{"id":"afd09d96-f17f-4354-9ede-528dc69d9c11","traceId":"12345","sessionId":null,"datasetRunId":null,"timestamp":"2026-09-20T15:37:45.361Z","source":"API","name":"risk_score","dataType":"NUMERIC","value":0,"stringValue":null,"comment":"Risk level: low","metadata":{},"observationId":null,"traceName":"fraud_detection","userId":"","traceTags":[],"environment":"default","authorUserName":null},{"id":"9a87843b-cb69-41df-aa8a-d6ede9505c6d","traceId":"12345","sessionId":null,"datasetRunId":null,"timestamp":"2026-09-20T15:37:24.168Z","source":"API","name":"risk_score","dataType":"NUMERIC","value":0,"stringValue":null,"comment":"Risk level: low","metadata":{},"observationId":null,"traceName":"fraud_detection","userId":"","traceTags":[],"environment":"default","authorUserName":null}]

```

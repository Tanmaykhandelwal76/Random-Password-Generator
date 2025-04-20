#!/bin/bash

# Container name
CONTAINER_NAME="password-app"

# CPU & Memory
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" > cpu_memory.log

# Response time
echo "url,response_time_ms" > response_time.log
URL="http://localhost:3000"
for i in {1..5}
do
  TIME=$(curl -o /dev/null -s -w %{time_total}\\n "$URL")
  echo "$URL,$(echo "$TIME*1000" | bc)" >> response_time.log
done

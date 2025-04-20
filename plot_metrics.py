import pandas as pd
import matplotlib.pyplot as plt

# Plot response time
df = pd.read_csv("response_time.log", skiprows=1, names=["url", "response_time_ms"])
plt.figure(figsize=(8, 4))
plt.plot(df["response_time_ms"], marker='o', label='Response Time (ms)')
plt.title("Response Time")
plt.xlabel("Request #")
plt.ylabel("Time (ms)")
plt.grid()
plt.savefig("response_time_plot.png")

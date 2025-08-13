import requests
import pandas as pd

# Download the XPT file
url = "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2021/DataFiles/HEPB_S_L.xpt"
xpt_path = "P_HEPC.xpt"
csv_path = "P_HEPC.csv"

response = requests.get(url)
with open(xpt_path, "wb") as f:
    f.write(response.content)

# Read the XPT file and convert to CSV
df = pd.read_sas(xpt_path)
df.to_csv(csv_path, index=False)

print(f"Downloaded and converted to {csv_path}")
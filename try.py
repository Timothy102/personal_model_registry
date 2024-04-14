import json

with open("models.json", "r") as f:
    models = json.load(f)
    
print(models[0])
for model in models:
    if model["name"] == "magictime":
        print("yes")
        

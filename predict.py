from cog import BasePredictor, Path
from typing import List
import pickle, json, numpy as np

class Predictor(BasePredictor):
    def setup(self):
        """Load the model into memory to make running multiple predictions efficient"""
        with open("model.pkl", "rb") as f:
            self.model = pickle.load(f)
            print(type(self.model))

    def predict(self,
            filepath: str = Path(description="File path of the JSON data")
    ) -> List[float]:
        """Run a single prediction on the model"""
        
        with open(filepath, "r") as f:
            data = json.load(f)
            
        numbers = data["numbers"]
        data = np.array(numbers).reshape(-1, 1)  # Reshape to (n_samples, n_features)
        print(data, type(data))

        output = self.model.predict(data)
        
        # Assuming output is a NumPy array with single result
        return output.tolist() if len(output) > 1 else [output.item()]
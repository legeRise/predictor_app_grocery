import os
import pickle

def load_models(model_paths):
    models = {}
    for model_name, model_path in model_paths.items():
        model_file_path = os.path.join("models", model_path)  # Assuming models are stored in a folder named 'models'
        with open(model_file_path, 'rb') as f:
            model = pickle.load(f)
        models[model_name] = model 
    return models

import replicate, json
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="Arcadia Model Deployment API",
    description="Infrastructure for deploying ML models and billing others for API usage.",
    version="1.0.0"
)

# CORS middleware for handling Cross-Origin Resource Sharing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this based on your frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Trusted Host middleware to enforce host checking
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1"],  # Adjust as needed
)

# FastAPI endpoints
@app.get("/")
async def root() -> Response:
    """
    Returns: The version of the API.
    """
    return Response(content=f'Arcadia API v1.0',
                    media_type='text/plain;charset=UTF-8')
    
replicate.client.Client(api_token="r8_FHHpzt0Zh8ych7wG14lEoulHwUUB7yc0aQ76g")


class Model(BaseModel):
    url: str
    owner: str
    name: str
    description: Optional[str] = None
    visibility: str
    github_url: str
    paper_url: Optional[str] = None
    license_url: Optional[str] = None
    run_count: int
    cover_image_url: Optional[str] = None



# Get All Models from Replicate
@app.get("/get_all_models")
def get_all_models(limit=1000):
    models = []
    for page in replicate.paginate(replicate.models.list):
        models.extend(page.results)
        # Uncomment the next 2 lines to get all models
        # if len(models) > limit:
        #     break
    
    models_as_dicts = [model.__dict__ for model in models]
    
    # Write models to JSON file
    with open("models.json", "w") as f:
        json.dump(models_as_dicts, f, default=str)  # Use default=str to handle non-serializable types
    
    return models



@app.get("/my_models")
def get_my_models(owner: str):
    my_models = []
    models = get_all_models()
    for model in models:
        if model.owner == owner:
            m = Model(
                url=model.url, 
                name=model.name, 
                owner=model.owner, 
                description=model.description, 
                visibility=model.visibility, 
                github_url=model.github_url, 
                paper_url=model.paper_url, 
                run_count=model.run_count, 
                cover_image_url=model.cover_image_url
                )
            my_models.append(m)
        
    return my_models

@app.get("/get_model_by_name/{model_name}")
def get_model_by_name(model_name: str):
    with open("models.json", "r") as f:
        models = json.load(f)
    for model in models:
        if model["name"] == model_name:
            return Model(**model)

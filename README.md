# Create Your Own Personal Model Registry

Learn how to package your own trained model using Cog and push it to Replicate. By the end of this guide your models will have an interactive frontend GUI its own HTTP API for everybody to call from the outside.

P.S - this is a developer's guide to exposing any ML model for API billing via Replicate.

### Prerequisites
1. A trained model in a directory on your computer. Your model’s saved weights, alongside any code that is needed to run it. If you don’t already have your own trained model, you can use one from replicate/cog-examples.
2. Docker. You’ll be using the Cog command-line tool to build and push your model. Cog uses Docker to create a container for your model. You’ll need to install and start Docker before you can run Cog. You can confirm Docker is running by typing docker info in your terminal.
3. If your model needs a GPU, a Linux machine with an NVIDIA GPU attached and the NVIDIA Container Toolkit installed. If you don’t already have access to a machine with a GPU, check out our guide to getting a GPU machine. If you just need a CPU for inference, you can also use macOS.
4. An account on Replicate.

## Run this baby

1. Clone this repo.
2. Sign up to Replicate. Copy your API key.
3. Bring your model into root of this repo.
4. Run create_model.py with the name of your model.
5. Create a sample prediction json file.
6. Go into predict.py and modify your model's inference function. Install whatever you need and include inside cog.yaml.
7. Run Makefile - this will call predict on your function and deploy the model on Replicate.
8. <todo: how to build up the frontend>

### Contact

tim@timcvetko.com
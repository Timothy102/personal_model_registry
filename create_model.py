import replicate

replicate.client.Client(api_token="r8_FHHpzt0Zh8ych7wG14lEoulHwUUB7yc0aQ76g")

model = replicate.models.create(
    owner="timothy102",
    name="linreg",
    visibility="public",
    hardware="gpu-a40-large"
)
from fastapi import FastAPI

app = FastAPI()


@app.get("/{adtype}")
async def get_ad(adtype: str):
    return {"message": f"AD type is {adtype}"}

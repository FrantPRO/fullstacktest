from fastapi import FastAPI

app = FastAPI()


@app.get("/{adtype}")
async def get_ad(adtype: str):
    if adtype == 'video':
        return "https://www.youtube.com/watch?v=dl16e_mG6hg"
    elif adtype == 'picture':
        return "https://kartinkin.net/pics/uploads/posts/2022-08/1660689964_66-kartinkin-net-p-fon-iz-piratov-karibskogo-morya-krasivo-76.jpg"

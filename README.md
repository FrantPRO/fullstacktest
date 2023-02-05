# fullstacktest

1. TASK: A Google Chrome extension that detects ad banners when a user views the Facebook feed 
   DONE: A Google Chrome extension and running the script manually
   NOT DONE: AD detection in the feed, running the script automatically when scrolling the feed

2. TASK: When a banner is detected, the content type (picture/video) should be detected and a request should be made 
         to the server to get a link to the media content to replace it depending on the content type
   DONE: Request to the server with params
   NOT DONE: Banner detection

3. TASK: Write a small backend with API which receives a link to a video or picture, depending on the content type
         (this can be a static video/picture, but the link should be sent through the API)
   DONE: Developed a simple API based on FastAPI, SQLAlchemy, and SQLite3

4. TASK: The extension replaces the detected content in the banner with a picture/video sent by the backend
   DONE: Replacing any content by picture/video type received from the server
   NOT DONE: Replacing only AD content

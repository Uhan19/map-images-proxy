To get the everything up and running,

```
docker build -t maps-and-images .
docker run -d -p 3001:3001 -v $(pwd):/src/app --name maps-and-images-container maps-and-images
```
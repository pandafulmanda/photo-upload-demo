### Quick photo upload project for job interview

There are two solutions.  To run, pull repo, and run

```bash
npm install
node index.js
```

or, if you do not have node,

```bash
cd client
python -m SimpleHTTPServer
```

There are two implentations of an image cropper.  The left uses the [ngImgCrop](https://github.com/alexk111/ngImgCrop) directive, while the right cropper was written in mostly vanilla JavaScript because I felt like a cop out using the Angular directive.

The right cropper does not have a nice, fancy selector box, but you can select your bounding region on the uploaded image from one corner to the other and the "cropped" version should appear below.
# doxygen2typescript

Generates TypeScript type declarations from doxygen xml output, particularly to genereate opencv.js types.

## Motivation

[mirada](https://www.npmjs.com/package/mirada) - opencv.js based TypeScript project for Node.js and Browser.

## Notes for development 

```
cv.* member names are mapped . It is defined at least in bindings.cpp
for example cv::AgastFeatureDetector::AGAST_7_12s is exposed as AgastFeatureDetector_AGAST_7_12s - the info in bindings.cpp is:
    constant("AgastFeatureDetector_AGAST_7_12s", static_cast<long>(cv::AgastFeatureDetector::AGAST_7_12s));
  "AgastFeatureDetector_AGAST_7_12s",
```

## Hacks to opencv

Right now I only need to expose Module.FS (emscripten filesystem API) - a tiny change in JS module - PR: https://github.com/opencv/opencv/pull/15319

## Building opencv doxygen

```
cd opencv
sed -i -e "s/GENERATE_XML *= NO/GENERATE_XML=YES/" $PWD/doc/Doxyfile.in
rm -rf build 
docker run --rm --workdir /code -v "$PWD":/code opencv.js python ./platforms/js/build_js.py build --build_doc
```

where Docker file is:

```
FROM trzeci/emscripten:latest
RUN apt-get update -y
RUN apt-get install -y doxygen
```

## TODO 
- [ ] multiple files input and output
- [ ] refs
- [ ] index.ts that expose the real objects with correct types.
- [ ] move json2dts to own repo
- [ ] cli

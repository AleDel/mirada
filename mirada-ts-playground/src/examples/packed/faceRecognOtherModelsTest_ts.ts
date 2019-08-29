
export const faceRecognOtherModelsTest_ts: string = "import * as cv from 'mirada'\nimport * as Mirada from 'mirada'\n\n(async ()=>{\n\nvar netDet:any = undefined, netRecogn:any = undefined;\nvar persons : any= {};\n\n//! [Run face detection model]\nfunction detectFaces(img: cv.Mat) {\n  var blob = cv.blobFromImage(img, 1, {width: 192, height: 144}, [104, 117, 123, 0], false, false);\n  netDet.setInput(blob);\n  var out = netDet.forward();\n\n  var faces = [];\n  for (var i = 0, n = out.data32F.length; i < n; i += 7) {\n    var confidence = out.data32F[i + 2];\n    var left = out.data32F[i + 3] * img.cols;\n    var top = out.data32F[i + 4] * img.rows;\n    var right = out.data32F[i + 5] * img.cols;\n    var bottom = out.data32F[i + 6] * img.rows;\n    left = Math.min(Math.max(0, left), img.cols - 1);\n    right = Math.min(Math.max(0, right), img.cols - 1);\n    bottom = Math.min(Math.max(0, bottom), img.rows - 1);\n    top = Math.min(Math.max(0, top), img.rows - 1);\n\n    if (confidence > 0.5 && left < right && top < bottom) {\n      faces.push({x: left, y: top, width: right - left, height: bottom - top})\n    }\n  }\n  blob.delete();\n  out.delete();\n  return faces;\n};\n//! [Run face detection model]\n\n//! [Get 128 floating points feature vector]\nfunction face2vec(face: cv.Mat) {\n  var blob = cv.blobFromImage(face, 1.0 / 255, {width: 96, height: 96}, [0, 0, 0, 0], true, false)\n  netRecogn.setInput(blob);\n  var vec = netRecogn.forward();\n  blob.delete();\n  return vec;\n};\n//! [Get 128 floating points feature vector]\n\n//! [Recognize]\nfunction recognize(face: cv.Mat) {\n  var vec = face2vec(face);\n  var bestMatchName = 'unknown';\n  var bestMatchScore = 0.5;  // Actually, the minimum is -1 but we use it as a threshold.\n  for (let name in persons) {\n    var personVec = persons[name];\n    var score = vec.dot(personVec);\n    if (score > bestMatchScore) {\n      bestMatchScore = score;\n      bestMatchName = name;\n    }\n  }\n  vec.delete();\n  return bestMatchName;\n};\n//! [Recognize]\n\nasync function loadModels() {\n  await Mirada.loadDataFile('https://raw.githubusercontent.com/opencv/opencv/master/samples/dnn/face_detector/deploy_lowres.prototxt','face_detector.prototxt')\n  await Mirada.loadDataFile('https://raw.githubusercontent.com/opencv/opencv_3rdparty/dnn_samples_face_detector_20180205_fp16/res10_300x300_ssd_iter_140000_fp16.caffemodel','face_detector.caffemodel')\n  await Mirada.loadDataFile('https://raw.githubusercontent.com/pyannote/pyannote-data/master/openface.nn4.small2.v1.t7','face_recognition.t7')\n  // // var utils = new Utils('');\n  // var proto = 'https://raw.githubusercontent.com/opencv/opencv/master/samples/dnn/face_detector/deploy_lowres.prototxt';\n  // var weights = 'https://raw.githubusercontent.com/opencv/opencv_3rdparty/dnn_samples_face_detector_20180205_fp16/res10_300x300_ssd_iter_140000_fp16.caffemodel';\n  // var recognModel = 'https://raw.githubusercontent.com/pyannote/pyannote-data/master/openface.nn4.small2.v1.t7';\n  // utils.createFileFromUrl('face_detector.prototxt', proto, () => {\n  //   // document.getElementById('status').innerHTML = 'Downloading face_detector.caffemodel';\n  //   utils.createFileFromUrl('face_detector.caffemodel', weights, () => {\n  //     // document.getElementById('status').innerHTML = 'Downloading OpenFace model';\n  //     utils.createFileFromUrl('face_recognition.t7', recognModel, () => {\n  //       // document.getElementById('status').innerHTML = '';\n        netDet = cv.readNetFromCaffe('face_detector.prototxt', 'face_detector.caffemodel');\n        netRecogn = cv.readNetFromTorch('face_recognition.t7');\n      // });\n    // });\n  // });\n};\n\n// function main() {\n  // Create a camera object.\n  var output = document.getElementById('outputCanvas')! as HTMLCanvasElement\n  var camera = document.getElementById(\"videoInput\")!as HTMLVideoElement\n  output.setAttribute(\"width\", camera.width+'');\n  output.setAttribute(\"height\", camera.height+'');\n\n  // Get a permission from user to use a camera.\n  navigator.mediaDevices.getUserMedia({video: true, audio: false})\n    .then(function(stream) {\n      camera.srcObject = stream;\n      camera.onloadedmetadata = function(e) {\n        camera.play();\n      };\n  });\n\n  //! [Open a camera stream]\n  var cap = new cv.VideoCapture(camera);\n  var frame = new cv.Mat(camera.height, camera.width, cv.CV_8UC4);\n  var frameBGR = new cv.Mat(camera.height, camera.width, cv.CV_8UC3);\n  //! [Open a camera stream]\n\n  //! [Add a person]\n  // document.getElementById('addPersonButton')!.onclick = \n  // function f() {\n  //   var rects = detectFaces(frameBGR);\n  //   if (rects.length > 0) {\n  //     var face = frameBGR.roi(rects[0]);\n\n  //     var name = prompt('Say your name:')!\n  //     // var cell = document.getElementById(\"targetNames\")!.insertCell(0);\n  //     // cell.innerHTML = name;\n\n  //     persons[name] = face2vec(face).clone();\n\n  //     var canvas = document.getElementById(\"outputCanvas\")! as HTMLCanvasElement\n  //     canvas.setAttribute(\"width\", '96');\n  //     canvas.setAttribute(\"height\", '96');\n  //     // var cell = document.getElementById(\"targetImgs\").insertCell(0);\n  //     // cell.appendChild(canvas);\n\n  //     var faceResized = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC3);\n  //     cv.resize(face, faceResized, {width: canvas.width, height: canvas.height});\n  //     cv.cvtColor(faceResized, faceResized, cv.COLOR_BGR2RGB);\n  //     cv.imshow(canvas, faceResized);\n  //     faceResized.delete();\n  //   }\n  // }\n  //! [Add a person]\n\n  //! [Define frames processing]\n  var isRunning = false;\n  const FPS = 30;  // Target number of frames processed per second.\n  function captureFrame() {\n    var begin = Date.now();\n    cap.read(frame);  // Read a frame from camera\n    cv.cvtColor(frame, frameBGR, cv.COLOR_RGBA2BGR);\n\n    var faces = detectFaces(frameBGR);\n    faces.forEach(function(rect) {\n      cv.rectangle(frame, {x: rect.x, y: rect.y}, {x: rect.x + rect.width, y: rect.y + rect.height}, [0, 255, 0, 255]);\n\n      var face = frameBGR.roi(rect);\n      var name = recognize(face);\n      cv.putText(frame, name, {x: rect.x, y: rect.y}, cv.FONT_HERSHEY_SIMPLEX, 1.0, [0, 255, 0, 255]);\n    });\n    cv.imshow(output, frame);\n    if (isRunning) {\n      var delay = 1000 / FPS - (Date.now() - begin);\n      setTimeout(captureFrame, delay);\n    }\n  };\n  //! [Define frames processing]\n\n async function toggle() {\n    if (isRunning) {\n      isRunning = false;\n      // debugger\n      //@ts-ignore\n      // camera.stop()\n      // document.getElementById('startStopButton')!.innerHTML = 'Start';\n      // document.getElementById('addPersonButton')!.disabled = true;\n    } else {\n      // function run() {\n       \n        // document.getElementById('startStopButton')!.innerHTML = 'Stop';\n        // document.getElementById('startStopButton')!.disabled = false;\n        // document.getElementById('addPersonButton')!.disabled = false;\n      // }\n      if (netDet == undefined || netRecogn == undefined) {\n        // document.getElementById('startStopButton')!.disabled = true;\n        await        loadModels();  // Load models and run a pipeline;\n         isRunning = true;\n        captureFrame();\n      // } else {\n        // run()\n        // run();\n      }\n    }\n  }\n// toggle()\n  // document.getElementById('startStopButton')!.disabled = false;\n\n        setTimeout(async ()=>{\nawait toggle()\n\nawait new Promise(resolve=>setTimeout(resolve, 10000))\nawait toggle()\n        }, 500);\n// setTimeout(main, 200);\n// setTimeout(toggle, 13000);\n// };\n\n \n\n})()";
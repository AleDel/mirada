import test from 'ava'
import Jimp from 'jimp'
import { File, installFormatProxy, JimpCodec, loadFormatProxies, loadOpencv, unInstallFormatProxies, unloadFormatProxies } from '../src'

test.serial('write/read jimp codec', async t => {
  unInstallFormatProxies()
  unloadFormatProxies()
  await installFormatProxy(() => new JimpCodec(Jimp))
  await loadFormatProxies()
  await loadOpencv()
  const file = await File.fromFile('test/assets/shape.jpg')
  var img = file.asMat()
  t.deepEqual([img.cols, img.rows, img.data.byteLength], [125, 146, 73000])
  await file.write('tmpJimp1.jpg')
  t.deepEqual(Jimp.distance(await Jimp.read('tmpJimp1.jpg'), await Jimp.read('test/assets/shape.jpg')), 0)
  let dst = new cv!.Mat()
  let M = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(img, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  await File.fromMat(dst).write('tmpJimp2.jpg')
  img.delete()
  M.delete()
  dst.delete()
  t.deepEqual(Jimp.distance(await Jimp.read('tmpJimp2.jpg'), await Jimp.read('test/assets/shape.jpg')), 0.125)
  t.deepEqual(Jimp.distance(await Jimp.read('tmpJimp1.jpg'), await Jimp.read('tmpJimp2.jpg')), 0.125)
  t.deepEqual(Jimp.distance(await Jimp.read('tmpJimp2.jpg'), await Jimp.read('test/assets/shape4.jpg')), 0)
})

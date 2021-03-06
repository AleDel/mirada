import test from 'ava'
import { File, Mat } from '../src'
import { compareL2, data2mat, del, fromFile, get, isMat, isMatData, jsonParseWithMat, jsonStringifyWithMat, mat2data, set } from '../src/util/imageUtil'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('compareL2', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  t.deepEqual(compareL2(src, await fromFile('test/assets/lenna.jpg')), 0)
  const f = await File.fromMat(src.roi(new cv.Rect(100, 100, 100, 80))).toRgba()
  let m1: Mat, m2: Mat
  t.deepEqual(compareL2(f, m1 = await fromFile('test/assets/mask1.jpg')), 0); m1.delete()
  t.deepEqual(compareL2(f, m1 = await fromFile('test/assets/lenna.jpg')), 1); m1.delete()
  t.deepEqual(compareL2(m2 = await fromFile('test/assets/lennaFaceDetection.jpg'), m1 = await fromFile('test/assets/lenna.jpg')).toFixed(4), '0.0419')
  m1.delete(); m2.delete()
  t.deepEqual(compareL2(m2 = await fromFile('test/assets/shape.jpg'), m1 = await fromFile('test/assets/shape2.jpg')).toFixed(4), '0.6271')
  m1.delete(); m2.delete()
  f.delete()
  src.delete()
})

test('get / set', async t => {
  let mat = cv.Mat.ones(10, 10, cv.CV_8UC3)
  set(mat, 2, 1, [1, 222, 222])
  set(mat, 3, 2, [1, 222, 1])
  set(mat, 3, 3, [111, 111, 1])
  set(mat, 2, 3, [111, 111, 111])
  t.deepEqual(get(mat, 2, 1), [1, 222, 222])
  t.deepEqual(get(mat, 3, 2), [1, 222, 1])
  t.deepEqual(get(mat, 3, 3), [111, 111, 1])
  t.deepEqual(get(mat, 2, 3), [111, 111, 111])
  del(mat)
  t.true(true)
})

test('mat2data, data2mat, isMatData, isMat', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  const d = mat2data(src)
  const src2 = data2mat(d)
  t.deepEqual(compareL2(src, src2), 0)
  t.deepEqual([false, true, true, false], [isMatData(src), isMatData(d), isMat(src), isMat(d)])
  del(src, src2)
})

test('jsonStringifyWithMat, jsonParseWithMat', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  const o = { a: 1, src }
  const s = jsonStringifyWithMat(o)
  const o2 = jsonParseWithMat(s)
  t.deepEqual(compareL2(src, o2.src), 0)
  del(src, o2.src)
})

import { del, isMat, Mat, Point, Scalar } from 'mirada'
import { CannyConcreteOptions, FloodFillOptions, MedianBlurConcreteOptions } from '.'
import { toNumber } from '../util/util'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface FloodFillOptions extends OperationExecBaseOptions {
  seed: Point;
  preprocess?: FloodFillPreprocess[]
  newColorOrImage?: Scalar | number[] | Mat;
  connectivity?: 4 | 8;
  lowDiff?: Scalar | number[]
  upDiff?: Scalar | number[]
}

export type FloodFillPreprocess = ({ name: 'canny' } & CannyConcreteOptions) | ({ name: 'medianBlur' } & MedianBlurConcreteOptions)

/**
 * This is a high level API for flood fill given color or image starting from given [seed] coords and involves several opencv operations. 
 */
export class FloodFill extends AbstractOperation<FloodFillOptions> {
  name = "FloodFill"
  description = 'This is a high level API for flood fill given color or image starting from given [seed] coords and involves several opencv operations. '
  sameSizeAndType = true

  protected _exec(o: FloodFillOptions) {
    const preprocess = o.preprocess || [{ name: 'medianBlur' }, { name: 'canny' }]
    const dst = o.dst = o.dst || new cv.Mat()
    o.src.copyTo(dst)
    const blur = preprocess.find(p => p.name === 'medianBlur') as any as MedianBlurConcreteOptions
    if (blur) {
      cv.medianBlur(o.src, dst, toNumber(blur.ksize || 3))
    }
    cv.cvtColor(dst, dst, cv.CV_8UC1, 3)
    const mask = cv.Mat.zeros(dst.rows + 2, dst.cols + 2, cv.CV_8UC1)
    const canny = preprocess.find(p => p.name === 'canny') as CannyConcreteOptions
    if (canny) {
      cv.Canny(dst, mask, canny.threshold1 || 0, canny.threshold2 || 255) // heads up ! dst needs to be bigger!
      cv.copyMakeBorder(mask, mask, 1, 1, 1, 1, cv.BORDER_REPLICATE) // that's why we need to copy again
    } else {
      cv.copyMakeBorder(dst, mask, 1, 1, 1, 1, cv.BORDER_REPLICATE)
    }
    const fillValue = 128
    cv.floodFill(dst, mask, o.seed, new cv.Scalar(255, 255, 255, 255), 0, o.lowDiff || new cv.Scalar(255, 255, 255, 255),
      o.upDiff || new cv.Scalar(255, 255, 255, 255), (o.connectivity || 4) | cv.FLOODFILL_MASK_ONLY | (fillValue << 8))
    // mask has canny edges in 255 and fill in 128 - we keep with just 128:
    cv.inRange(mask, new cv.Mat(mask.rows, mask.cols, mask.type(), new cv.Scalar(128, 128, 128)),
      new cv.Mat(mask.rows, mask.cols, mask.type(), new cv.Scalar(128, 128, 128)), mask)
    const dst2 = cv.Mat.zeros(o.src.rows + 2, o.src.cols + 2, o.src.type())
    cv.copyMakeBorder(o.src, dst2, 1, 1, 1, 1, cv.BORDER_REPLICATE)
    //copy b= o.newColorOrImage mask(dst2)
    const b = isMat(o.newColorOrImage) ? o.newColorOrImage : new cv.Mat(dst2.rows, dst2.cols, dst2.type(), o.newColorOrImage)
    b.copyTo(dst2, mask)
    // idea : o.src.copyTo(dst2, maskNegated)
    const r = dst2.roi({ x: 1, y: 1, width: mask.cols - 2, height: mask.rows - 2 })
    r.copyTo(dst)
    del(mask, dst2, r, ...isMat(o.newColorOrImage) ? [] : [b])
  }
}

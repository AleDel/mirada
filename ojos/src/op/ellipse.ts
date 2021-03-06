import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithCenter, WithColor, WithLineType, WithSize, WithThickness } from './types'

export interface EllipseOptions extends OperationExecBaseOptions, EllipseConcreteOptions {

}

export interface EllipseConcreteOptions extends Partial<WithLineType>, WithColor, WithCenter, Partial<WithThickness>, WithSize {
  /**
   * Ellipse angle in degrees.
   */
  angle: number;
}

/**
 * Draws a simple or filled Ellipse with a given center size and rotation angle.
 */
export class Ellipse extends AbstractOperation<EllipseOptions> {
  name = "Ellipse"
  description = `Draws a simple or filled Ellipse with a given center size and rotation angle.`
  optionsOrder = ['src', 'dst', 'center', 'size', 'angle', 'color', 'thickness', 'lineType'] as (keyof EllipseOptions)[]
  noDst = true
  protected _exec(o: EllipseOptions) {
    cv.ellipse1(o.dst!, new cv.RotatedRect(o.center, o.size, o.angle), o.color, o.thickness || 1, o.lineType || cv.LINE_AA)
  }
}


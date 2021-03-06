import 'magica'
import * as React from 'react'
import { Input } from 'semantic-ui-react'
import { getCanvasOverlay, getImageWidget, started, getHtmlCanvasSync } from '../../app/start'
import { State } from '../../app/state'
import { AbstractComponent, AbstractProps } from '../common/component'
import { Point } from '../common/point'
import { AbstractTool } from './tool'

export class CanvasAndImageView extends AbstractComponent<AbstractProps, State> {
  constructor(p: any, s: any) {
    super(p, s)
    this.onChange = this.onChange.bind(this)
  }
  protected canvasSizeEl: HTMLDivElement | null = null
  protected imageResizeEl: HTMLTableDataCellElement | null=null
  protected imageOffsetEl: HTMLDivElement | null = null
  protected step = 10
  render() {
    if(!getHtmlCanvasSync()){
      return 'Loading...'
    }
    return (
      <div>
        <table >
          <tr ref={c => this.canvasSizeEl = c}>
            <td>Canvas size</td>
            <td>
              <Input type="number" min="1" step={this.step} onChange={this.onChange} defaultValue={getHtmlCanvasSync()!.width} />
              <Input type="number" min="1" step={this.step} onChange={this.onChange}  defaultValue={getHtmlCanvasSync()!.height} />
            </td>
          </tr>
          <tr ref={c => this.imageOffsetEl = c}>
            <td>Image offset</td>
            <td><Point targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} onChange={this.onChange} /></td>
          </tr>
          <tr  >
            <td>Resize image</td>
          <td ref={c => this.imageResizeEl = c}>
              <Input type="number" min="1" step={this.step} onChange={this.onChange} defaultValue="400" />
              <Input type="number" min="1" step={this.step} onChange={this.onChange} defaultValue="400" />
            </td>
          </tr>
        </table>
      </div>
    )
  }
  protected async onChange(e: any) {
    const canvasSize = Array.from(this.canvasSizeEl!.querySelectorAll('input')).map(i => i.valueAsNumber || 0)
    const imageOffset = Array.from(this.imageOffsetEl!.querySelectorAll('input')).map(i => i.valueAsNumber || 0)
    const imageResize = Array.from(this.imageResizeEl!.querySelectorAll('input')).map(i => i.valueAsNumber || 0)
    await CanvasAndImage.INSTANCE.applyCanvasAndImage(canvasSize, imageOffset, imageResize)
  }
}

export class CanvasAndImage extends AbstractTool {
  static INSTANCE = new CanvasAndImage()
  static toolBarEntry = { tool: () => CanvasAndImage.INSTANCE, el: () => <CanvasAndImageView /> }
  name = 'Canvas and Image'
  description = 'Resize the canvas area and translate the image inside it.'
  shortDescription = 'Canvas resize and image translate'
  async  applyCanvasAndImage(canvasSize?: number[], imageOffset?: number[], imageResize?: number[]) {
    const i = await getImageWidget()
    if (imageResize && imageResize.length >= 2) {
      i.imageResize(imageResize[0], imageResize[1])
    }
    if (canvasSize && canvasSize.length >= 2) {
      i.resizeCanvas(canvasSize[0], canvasSize[1])
      const o = await getCanvasOverlay()
      o.updateSize({ width: canvasSize[0], height: canvasSize[1] })
    }
    if (imageOffset && imageOffset.length >= 2) {
      i.imageOffset(imageOffset[0], imageOffset[1])
    }
  }
}

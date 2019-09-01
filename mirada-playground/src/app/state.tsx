import { Size } from 'mirada'
import { ImageWidget } from '../ui/imageEditor/imageWidget'
import { Tool, tools } from '../ui/tool/tool'
import { Example, examples } from './examples'
import { CanvasOverlay } from '../ui/imageEditor/canvasOverlay';

export interface State {
  example: Example
  inputFiles: File[]
  examples: Example[];
  code: string
  working: boolean
  tools: Tool[]
  activeTools: Tool[]
  image?: ImageWidget
  overlay?: CanvasOverlay
  selection: Selection

  showToolInitialTip: boolean

  imageSize: Size,
  shapesTool: {
    menuActiveIndex: number[]
    activeShape: RegionDefinitionShapes
  }
  grabCut: {
    region: GrabCutRegions
  }
  toolBarCollapsed: boolean

}

export type RegionDefinitionShapes = 'rectangle' | 'brush' | 'ellipse' 
export type SelectionActions = | 'select' | 'delete' | 'invertSelection' | 'selectAll'
export type GrabCutRegions = 'interest'|'background'
interface Selection {
  rectangles: Rectangle[]
  mode: 'exclusive' | 'union',
}

export async function getInitialState(): Promise<State> {
  var example = examples()[0]
  return {
    example,
    inputFiles: [],
    examples: [...examples()],
    code: '',
    working: true,
    activeTools: [tools[0]],
    showToolInitialTip: true,
    tools,
    selection: {
      rectangles: [],
      mode: 'exclusive',
    },
    imageSize: { width: 0, height: 0 },
    toolBarCollapsed: false,
    shapesTool: { menuActiveIndex: [0], activeShape: 'rectangle' },
    grabCut: {
      region: 'interest'
    }
  }
}

interface SelectRectToolState {

}

export interface Field {
  id: string
  value: string
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

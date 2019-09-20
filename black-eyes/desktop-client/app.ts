import * as gui from 'gui'
import { StateComponent } from './abstractComponent'
import { Canvas } from './canvas'
import { Menu } from './menu'
import { SideBar } from './sideBar'
import { State } from './state'
import { StatusBar } from './statusBar'
type RP = 'image'

export class App1 extends StateComponent {

  protected win: gui.Window = null as any
  protected content: gui.Container = null as any
  canvas: Canvas = null as any
  protected menuPanel: gui.Container = null as any
  protected bodyPanel: gui.Container = null as any
  protected sideBar: gui.Container = null as any
  protected relevantProperties: RP[] = ['image']
  protected menu: gui.Container = null as any

  render() {
    this.createWindow()
    this.menu = new StatusBar().render()
    this.menuPanel.addChildView(this.menu)
    this.sideBar = new SideBar({ win: this.win }).render()
    this.bodyPanel.addChildView(this.sideBar)
    this.canvas = new Canvas({ win: this.win })
    this.bodyPanel.addChildView(this.canvas.render())
    const menubar = new Menu()
    if (process.platform !== 'darwin') {
      this.win.setMenuBar(menubar.menu)
    }
    else {
      gui.app.setApplicationMenu(menubar.menu)
    }
    return this.content
  }

  start() {
    this.win.center()
    this.win.activate()
    if (!process.versions.yode) {
      (process as any).guiStarted=true
      gui.MessageLoop.run()
      process.exit(0)
    }
  }

  protected createWindow() {
    this.content = gui.Container.create()
    // this.content.setBackgroundColor('#FFF')
    this.content.setStyle({ flexGrow: 1, flex: 1, flexDirection: 'column' })
    this.menuPanel = gui.Container.create()
    this.menuPanel.setStyle({ width: '100%', flex: 0, height: 40, flexDirection: 'row' })
    // this.menuPanel.setBackgroundColor('gray')
    this.bodyPanel = gui.Container.create()
    this.bodyPanel.setStyle({ width: '100%', flex: 1, height: '100%', flexGrow: 1, flexDirection: 'row' })
    this.content.addChildView(this.menuPanel)
    this.content.addChildView(this.bodyPanel)
    this.win = gui.Window.create({})
    this.win.setTitleVisible(true)
    this.win.setTitle('Hello there!')
    this.win.setContentView(this.content)
    this.win.onClose = function() { gui.MessageLoop.quit() }
    this.win.setContentSize({ width: 600, height: 600 })
  }

  protected stateChanged(names: RP[], s: Partial<State>) {
    if (names.includes('image') && s['image']) {
      this.win.setTitle(s['image'])
    }
  }
}

export interface CommonProps {
  win: gui.Window;
}

// export class Loop {
//   timer: NodeJS.Timeout=null as any
//   start() {
//     this.timer = setInterval(()=>{
//       gui.MessageLoop.postTask(()=>this.handler()) 
//     }, 1000)
//   }
//   stop(){
//     clearInterval(this.timer)
//   }
//   handler(): void {
//     // 
//     // throw new Error('Method not implemented.');
//   }
// } 

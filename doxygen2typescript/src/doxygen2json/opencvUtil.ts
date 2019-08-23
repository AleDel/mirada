import { writeFileSync, readFileSync } from 'fs';
import { notSameNotFalsy, notUndefined, repeat } from 'misc-utils-of-mine-generic';
import { join, basename } from 'path';
import { loadXmlDom } from '../dom/jsdom';
import { Q, text, Q1 } from '../dom/domUtil';


interface Options {
  opencvBuildFolder:string
}

interface RefsResult<T extends Ref> {
  constants: T[]
  classes: T[]
  functions: T[]
}

interface Ref {
  name: string;
    indexMember: Element;
    indexCompound: Element
}

interface RefFile extends Ref{
    filePath:string
}
interface RefMemberdef extends Ref{
    memberdef: Element
}


export function parseBindingsCpp(code: string) {
  const functionsRe = /\s+function\("([^"]+)"/g
  let r: any
  const functions: string[] = []
  while ((r = functionsRe.exec(code))) {
    functions.push(r[1])
  }
  const classRe = /emscripten::class.+\("([^"]+)"\)/g
  const classes: string[] = []
  while ((r = classRe.exec(code))) {
    classes.push(r[1])
  }
  const constantsRe = /\s+constant\("([^"]+)"/g
  const constants: string[] = []
  while ((r = constantsRe.exec(code))) {
    constants.push(r[1])
  }
  return {
    functions: functions.filter(notSameNotFalsy).sort(),
    classes: classes.filter(notSameNotFalsy).sort(),
    constants: constants.filter(notSameNotFalsy).sort()
  }
}

export function getBindingsCppCompoundRefs(o:Options) : RefsResult<Ref>{
  const bindingsPath = join(o.opencvBuildFolder, 'modules/js/bindings.cpp')
  var parsed = parseBindingsCpp(readFileSync(bindingsPath).toString())
  const index = join(o.opencvBuildFolder, 'doc/doxygen/xml/index.xml')
  loadXmlDom(readFileSync(index).toString())
  const fn = (a:string[]) => a.map(c=>Q('name').filter(s=>s.textContent===c)).flat(). filter(notUndefined).map(b=>({
    name: b.textContent, 
    indexMember: b.parentElement,
    indexCompound: b.parentElement.parentElement
    })).filter(notUndefined).filter(r=>!['namespace', 'file'].includes(r.indexCompound.getAttribute('kind'))).filter(notUndefined)
  return {
    constants: fn(parsed.constants),
    classes: fn(parsed.classes),
    functions: fn(parsed.functions),
  }  
}

  // const bigString = repeat(999, ' ')
export function getBindingsCppCompoundFiles(o:Options): RefsResult<RefFile> {
  var parsed = getBindingsCppCompoundRefs(o)
  const fn = (r:Ref[])=>r.map(ref=>({
      ...ref, 
      filePath: join(o.opencvBuildFolder, 'doc/doxygen/xml/', ref.indexCompound.getAttribute('refid')+'.xml')
    }))
    .filter(notUndefined)
    .filter((n,i,a)=>i===a.findIndex(a=>a.filePath===n.filePath&&a.name===n.name))
    .filter(notUndefined)

return {
    constants: fn(parsed.constants),
    classes: fn(parsed.classes),
    functions: fn(parsed.functions),
  }  
}

export function getBindingsCppMemberdefs(o:Options): RefsResult<RefMemberdef>  {
  const parsed = getBindingsCppCompoundFiles(o)
  const fn = (r:RefFile[])=>r.map(ref=>{
    loadXmlDom(readFileSync(ref.filePath).toString()); 
  const memberdef = Q1(`memberdef[id="${ref.indexMember.getAttribute('refid')}"]`);// getMemberdefElement(ref);
    return {
      ...ref, 
      memberdef
    }
    })
    // .filter(r=>!!r.memberdef)

    // deduplicate names by selecting the ones with shorter compound names
    // .filter((n,i,a)=>!!n && !a.find(c=>c!==n && c.name===n.name && (()=>{console.log(text('definition', c.memberdef, bigString),  text('definition', n.memberdef, bigString)); return true})() && text('definition', c.memberdef, bigString).length < text('definition', n.memberdef, bigString).length))

    // .filter((n,i,a)=>i===a.findIndex((a, j)=> a.name===n.name ? text('name', a.compound).length > text('name', n.compound).length ? i : j: i))

return {
    constants: fn(parsed.constants),
    classes: fn(parsed.classes),
    functions: fn(parsed.functions),
  }  
}
// const files:{[n:string]:Window}  ={}
// function getMemberdefElement(ref: RefFile) {
  // if(!files[ref.filePath]){
    // const {window} = createXMLDom(readFileSync(ref.filePath).toString()); // TODO: cache
    // files[ref.filePath] = window
  // }
  // return  Q1(`memberdef[id="${ref.indexMember.getAttribute('refid')}"]`);
 
// }
// /Users/sebastiangurin/git/opencv/build_js
// build_js/modules/js/bindings.cpp
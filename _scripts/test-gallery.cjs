const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
let keydown;
const document = {body: {style: {overflow: 'auto'}, children: []}, addEventListener: (_, cb) => keydown=cb};
function control() { return {isConnected:true, getClientRects:()=>[{}], focus(){document.activeElement=this;}}; }
const opener=control(), close=control(), prev=control(), next=control();
const slides=[0,1,2].map(n=>({style:{},querySelector:()=>({getAttribute:()=>`Image ${n}`})}));
const background={inert:false};
const alreadyInert={inert:true};
const modal={style:{},parentElement:document.body,querySelectorAll:s=>s==='.mySlides'?slides:[close,prev,next],querySelector:()=>null,focus(){document.activeElement=this;}};
document.body.children=[background,alreadyInert,modal];
document.getElementById=()=>modal;
document.activeElement=opener;
const window={};
vm.runInNewContext(fs.readFileSync('assets/js/gallery.js','utf8'),{document,window});
window.openModal(); assert.equal(document.activeElement,close); assert.equal(background.inert,true); assert.equal(document.body.style.overflow,'hidden');
function key(key,shiftKey=false){let prevented=false;keydown({key,shiftKey,preventDefault(){prevented=true;}});return prevented;}
assert(key('Tab',true)); assert.equal(document.activeElement,next);
assert(key('Tab')); assert.equal(document.activeElement,close);
key('ArrowLeft'); assert.equal(slides[2].style.display,'block');
key('ArrowRight'); assert.equal(slides[0].style.display,'block');
key('Escape'); assert.equal(document.activeElement,opener); assert.equal(background.inert,false); assert.equal(alreadyInert.inert,true); assert.equal(document.body.style.overflow,'auto');
window.openModal(); window.closeModal(); assert.equal(document.activeElement,opener);
console.log('Gallery checks passed: focus entry, Tab wrapping, arrows, Escape, background restoration, reopening.');

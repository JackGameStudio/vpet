// game.js - Game logic for Denshi Pet
(function(){
"use strict";
var BG="#9bbc0f",DK="#0f380f",MD="#306230",LT="#8bac0f";
var W=320,H=240;
var PNAME=["EGG","BABY","CHILD","ADULT"];
var POOP="\uD83D\uDCA9",LOCK="\uD83D\uDD12",SOUND="\uD83D\uDD0A",SOUND_OFF="\uD83D\uDD07";
var MENU=[
  {i:"\uD83C\uDF54",l:"FEED",a:"feed"},
  {i:"\uD83C\uDFAE",l:"PLAY",a:"play"},
  {i:"\uD83E\uDD86",l:"CLEAN",a:"clean"},
  {i:"\uD83D\uDCDA",l:"STUDY",a:"study"},
  {i:"\uD83D\uDCA1",l:"LIGHT",a:"light"},
  {i:"\uD83D\uDD04",l:"RESET",a:"reset"}
];

var PET={
  lobster:{name:"LOBSTER",anim:"waddle"},
  panda:{name:"PANDA",anim:"bounce"},
  seal:{name:"SEAL",anim:"slide"}
};
var PET_KEYS=["lobster","panda","seal"];

var AU_ON=true,AU_CTX=null;
function initAU(){try{AU_CTX=new(window.AudioContext||window.webkitAudioContext)()}catch(e){AU_CTX=null}}
function aur(){if(AU_CTX&&AU_CTX.state==="suspended")AU_CTX.resume()}
function bp(f,d,t,v,dl){
  if(!AU_CTX||!AU_ON)return;
  var ct=AU_CTX.currentTime+dl,o=AU_CTX.createOscillator(),g=AU_CTX.createGain();
  o.type=t;o.frequency.setValueAtTime(f,ct);
  g.gain.setValueAtTime(v,ct);g.gain.exponentialRampToValueAtTime(.001,ct+d);
  o.connect(g);g.connect(AU_CTX.destination);o.start(ct);o.stop(ct+d);
}
function sfx(t){
  if(!AU_CTX||!AU_ON)return;
  switch(t){
   case"feed":bp(523,.08);bp(659,.08,.12,.1,.1);bp(784,.15,.12,.1,.2);break;
   case"play":for(var i=0;i<4;i++)bp(440+i*110,.06,.1,.1,i*.07);break;
   case"clean":bp(300,.1,"sawtooth",.1);bp(400,.1,"sawtooth",.1,.1);bp(500,.15,"sawtooth",.1,.2);break;
   case"study":bp(880,.12,"triangle",.12);bp(880,.12,"triangle",.12,.15);bp(1047,.2,"triangle",.12,.3);break;
   case"poop":bp(150,.3,"sawtooth",.08);break;
   case"warn":for(var i=0;i<3;i++)bp(330,.05,.15,.15,i*.12);break;
   case"death":for(var i=0;i<6;i++)bp(440-i*60,.15,.15,.15,i*.15);break;
   case"sel":bp(660,.05,.08);break;
   case"ok":bp(880,.08,.1);bp(1100,.1,.1,.1,.1);break;
   case"hatch":for(var i=0;i<8;i++)bp(330+i*110,.06,.12,.12,i*.08);break;
   case"evolve":for(var i=0;i<5;i++)bp(440+i*220,.1,"triangle",.15,i*.1);break;
   case"lon":bp(660,.05,.08);bp(880,.08,.1,.08,.1);break;
   case"loff":bp(880,.05,.08);bp(660,.08,.1,.08,.08);break;
  }
}

var cv=document.getElementById("lcd"),cx=cv.getContext("2d");
cx.imageSmoothingEnabled=false;
var led=document.getElementById("led"),led2=document.getElementById("led2");

var ST={
  petType:"lobster",petName:"LOBSTER",
  phase:0,hunger:80,happiness:80,cleanliness:90,discipline:70,
  hp:100,poops:0,lightsOff:false,dead:false,ageMinutes:0,feedTimer:0,lastSave:Date.now(),cooldown:0
};
var mi=0,menu=false,fc=0,blk=0,warn=false,hatchP=0,evT=0,evP=-1,lastTs=0;
var petBob=0,selecting=false,selIdx=0;

function df(){
  return{petType:"lobster",petName:"LOBSTER",phase:0,hunger:80,happiness:80,
    cleanliness:90,discipline:70,hp:100,poops:0,lightsOff:false,dead:false,
    ageMinutes:0,feedTimer:0,lastSave:Date.now(),cooldown:0};
}
function save(){ST.lastSave=Date.now();localStorage.setItem("denshiPet",JSON.stringify(ST))}
function load(){
  var r=localStorage.getItem("denshiPet");if(!r)return;
  try{
    var s=JSON.parse(r);ST={...df(),...s};
    var e=(Date.now()-ST.lastSave)/1000;
    if(e>60&&!ST.dead){
      var p=Math.min(e/60,120);
      ST.hunger=Math.max(0,ST.hunger-p*8);
      ST.happiness=Math.max(0,ST.happiness-p*5);
      ST.cleanliness=Math.max(0,ST.cleanliness-p*6);
      ST.hp=Math.max(0,ST.hp-p*2);
      if(ST.hp<=0)ST.dead=true;
    }
  }catch(e){}
}
function pickPet(){
  var pk=PET_KEYS[Math.floor(Math.random()*PET_KEYS.length)];
  ST.petType=pk;ST.petName=PET[pk].name;
}
function sprKey(){
  if(ST.phase===0){
    if(hatchP>66)return"egg_crack3";
    if(hatchP>33)return"egg_crack2";
    if(hatchP>10)return"egg_crack1";
    return"egg_whole";
  }
  var st="neutral";
  if(ST.dead)st="sad";
  else if(ST.lightsOff)st="sleep";
  else if(ST.hp<20||ST.hunger<20)st="sick";
  else if(ST.discipline<20)st="angry";
  else if(ST.happiness<30)st="sad";
  else if(ST.happiness>60)st="happy";
  var key=ST.petType+"_"+st;
  return window._S[key]?key:ST.petType+"_neutral";
}
function drawSpr(key,px,py,scale){
  var d=window._S[key]||window._S.lobster_neutral;
  cx.save();
  cx.translate(px+petBob,py);
  cx.translate(-px,-py);
  for(var i=0;i<d.length;i++){
    var v=d[i];if(!v)continue;
    var r=Math.floor(i/16),c=i%16;
    cx.fillStyle=v;
    cx.fillRect(Math.round(px+c*scale),Math.round(py-r*scale),Math.ceil(scale),Math.ceil(scale));
  }
  cx.restore();
}
function rct(x,y,w,h,c){cx.fillStyle=c;cx.fillRect(x,y,w,h)}
function pTxt(t,x,y,c,s){cx.fillStyle=c;cx.font=Math.round(8*(s||1))+"px 'Press Start 2P',monospace";cx.fillText(t,Math.round(x),Math.round(y))}
function pIco(ic,x,y,sz){cx.font=sz+"px serif";cx.textBaseline="middle";cx.fillText(ic,x,y);cx.textBaseline="alphabetic"}
function update(dt){
  fc++;blk++;
  if(ST.cooldown>0)ST.cooldown-=dt;
  if(selecting)return;
  var age=ST.ageMinutes,np=age>=15?3:age>=5?2:1;
  if(np>ST.phase&&evP<0){evP=np;evT=120;sfx("evolve")}
  if(evT>0){evT-=dt;if(evT<=0&&evP>=0){ST.phase=evP;evP=-1;save()}return}
  if(ST.phase===0){hatchP=Math.min(100,hatchP+dt*0.008);if(hatchP>=100){ST.phase=1;hatchP=0;sfx("hatch");save()}return}
  ST.hunger=Math.max(0,ST.hunger-dt*0.04);
  ST.happiness=Math.max(0,ST.happiness-dt*0.03);
  ST.cleanliness=Math.max(0,ST.cleanliness-dt*0.05);
  ST.discipline=Math.max(0,ST.discipline-dt*0.02);
  ST.ageMinutes+=dt/60;
  if(ST.poops>0){ST.happiness=Math.max(0,ST.happiness-dt*0.08);warn=blk%60<30}else warn=false;
  var dmg=0;
  if(ST.hunger<20)dmg+=dt*0.02;
  if(ST.cleanliness<20)dmg+=dt*0.02;
  if(ST.happiness<20)dmg+=dt*0.01;
  ST.hp=Math.max(0,ST.hp-dmg);
  if(ST.feedTimer>0){ST.feedTimer-=dt;if(ST.feedTimer<=0&&ST.poops<3){ST.poops++;sfx("poop")}}
  if((ST.hunger<20||ST.cleanliness<20||ST.poops>=3)&&fc%180===0)sfx("warn");
  if(ST.hp<=0&&!ST.dead){ST.dead=true;sfx("death");save()}
  if(fc%1800===0)save();
  var pd=PET[ST.petType];
  if(pd.anim==="waddle")petBob=Math.sin(fc*0.12)*2;
  else if(pd.anim==="bounce")petBob=Math.sin(fc*0.1)*3;
  else if(pd.anim==="slide")petBob=Math.sin(fc*0.08)*2;
}
function drawIdle(){
  cx.fillStyle=ST.lightsOff?DK:BG;cx.fillRect(0,0,W,H);
  if(ST.lightsOff){var pz=Math.floor(fc/30)%2===0?"Z":"z";pTxt(pz+pz+pz,W/2-24,H/2,DK,2);return;}
  rct(0,0,W,18,MD);pTxt(ST.phase===0?"?????":ST.petName,6,13,BG,.7);pTxt(PNAME[ST.phase],72,13,BG,.7);
  var ah=Math.floor(ST.ageMinutes/60),am=Math.floor(ST.ageMinutes%60);
  pTxt(ah+"h"+String(am).padStart(2,"0")+"m",W-50,13,BG,.6);
  var bx=6,by=24,bw=66,bh=7;
  [{l:"F",v:ST.hunger,c:DK},{l:"J",v:ST.happiness,c:MD},{l:"C",v:ST.cleanliness,c:DK},{l:"D",v:ST.discipline,c:MD}].forEach(function(b,i){
    var y=by+i*(bh+4);pTxt(b.l,bx,y+5,DK,.55);rct(bx+14,y,bw,bh,LT);
    var fw=Math.round((b.v/100)*bw);if(fw>0)rct(bx+14,y,fw,bh,b.c);
  });
  var hy=by+4*(bh+4);pTxt("HP",bx,hy+5,DK,.55);rct(bx+14,hy,bw,bh,LT);
  var hf=Math.round((ST.hp/100)*bw);if(hf>0)rct(bx+14,hy,hf,bh,ST.hp>50?DK:MD);
  var ppx=W/2,ppy=H/2+22;
  drawSpr(sprKey(),ppx,ppy,5);
  for(var i=0;i<ST.poops;i++)pIco(POOP,ppx-18+i*14,ppy+46,13);
  if(evT>0){rct(0,H-18,W,18,MD);pTxt("EVOLVING...",6,H-6,BG,.6);rct(W/2-50,H-12,Math.round((evT/120)*16),4,BG);}
  if(ST.dead){rct(0,H-18,W,18,MD);pTxt("GAME OVER",W/2-42,H-6,BG,.7)}
  if(warn&&!menu){
    rct(W-40,0,40,H,MD);
    if(ST.poops>=3)pTxt("FULL",W-34,H/2-4,BG,.7);
    else if(ST.hunger<20)pTxt("HUNGRY",W-40,H/2-4,BG,.55);
    else if(ST.cleanliness<20)pTxt("DIRTY",W-34,H/2-4,BG,.7);
  }
  if(ST.phase===0){
    rct(W/2-50,H-16,100,6,LT);
    rct(W/2-50,H-16,Math.round((hatchP/100)*100),6,DK);
    pTxt("HATCH",W/2-20,H-7,DK,.5);
    pTxt("FEED TO INCUBATE",W/2-58,H-7,DK,.38);
  }
}
function drawMenu(){
  cx.fillStyle=BG;cx.fillRect(0,0,W,H);
  rct(0,0,W,18,MD);pTxt("MENU",4,13,BG,.7);
  var sy=22,ih=10;
  MENU.forEach(function(m,i){
    var y=sy+i*ih;var dis=(i===2||i===3)&&ST.phase<2;var sel=i===mi;
    if(sel)rct(0,y,W,ih-1,LT);
    pIco(dis?LOCK:m.i,4,y+6,9);pTxt((sel?">":" ")+m.l,16,y+8,sel?DK:MD,.5);
  });
  rct(0,H-10,W,10,MD);
  pTxt((ST.phase===0?"?????":ST.petName)+" "+PNAME[ST.phase]+" HP:"+ST.hp,W/2-50,H-3,BG,.38);
}
function drawSelectPet(){
  cx.fillStyle=BG;cx.fillRect(0,0,W,H);
  rct(0,0,W,18,MD);pTxt("NEW PET!",W/2-32,13,BG,.7);
  PET_KEYS.forEach(function(pk,i){
    var y=26+i*70;var sel=i===selIdx;var pd=PET[pk];
    if(sel)rct(2,y,W-4,62,MD);
    pTxt(pd.name,W/2-24,y+10,BG,.6);
    drawSpr(pk+"_happy",W/2,y+38,6);
    if(sel)pTxt("A/B SWITCH  MNU CONFIRM",W/2-76,y+60,BG,.38);
  });
  rct(0,H-14,W,14,MD);
  pTxt("RANDOM PET WILL BE CHOSEN!",W/2-74,H-5,BG,.42);
}
function doAction(t){
  if(ST.dead)return;
  if(ST.cooldown>0)return;
  aur();
  switch(t){
   case"feed":
    if(ST.phase===0){hatchP=Math.min(100,hatchP+15);sfx("feed");ST.cooldown=30;save();return}
    ST.hunger=Math.min(100,ST.hunger+30);ST.feedTimer=1800;sfx("feed");
    if(ST.poops<3&&Math.random()<.4){ST.poops++;sfx("poop")}
    ST.cooldown=60;break;
   case"play":
    if(ST.phase===0)return;
    ST.happiness=Math.min(100,ST.happiness+25);ST.hunger=Math.max(0,ST.hunger-10);sfx("play");ST.cooldown=60;break;
   case"clean":
    if(ST.phase<2)return;
    ST.cleanliness=Math.min(100,ST.cleanliness+40);ST.poops=0;sfx("clean");ST.cooldown=60;break;
   case"study":
    if(ST.phase<2)return;
    ST.discipline=Math.min(100,ST.discipline+20);sfx("study");ST.cooldown=60;break;
   case"light":
    ST.lightsOff=!ST.lightsOff;sfx(ST.lightsOff?"loff":"lon");ST.cooldown=20;break;
   case"reset":
    if(confirm("RESET PET?")){sfx("death");ST=df();mi=0;menu=false;selecting=false;pickPet();save()}
    return;
  }
  save();
}
function pressBtn(type){
  aur();sfx("sel");
  if(selecting){
    if(type==="a"){selIdx=(selIdx-1+PET_KEYS.length)%PET_KEYS.length}
    else if(type==="b"){selIdx=(selIdx+1)%PET_KEYS.length}
    else if(type==="menu"||type==="sel"){
      var pk=PET_KEYS[selIdx];ST.petType=pk;ST.petName=PET[pk].name;
      selecting=false;pickPet();save();
    }
    return;
  }
  if(ST.lightsOff){ST.lightsOff=false;sfx("lon");return}
  if(type==="sel"){menu=!menu;if(menu)mi=0}
  else if(type==="menu"){
    if(menu){sfx("ok");doAction(MENU[mi].a);menu=false}else{menu=true;mi=0}
  }else if(type==="a"){if(menu){mi=(mi+1)%MENU.length}else{doAction("feed")}}
  else if(type==="b"){if(menu){mi=(mi-1+MENU.length)%MENU.length}else{doAction("play")}}
}
function bind(id,type){
  var el=document.getElementById(id);
  var dn=function(e){e.preventDefault();el.classList.add("pressed");pressBtn(type)};
  var up=function(){el.classList.remove("pressed")};
  el.addEventListener("mousedown",dn);
  el.addEventListener("touchstart",dn,{passive:false});
  el.addEventListener("mouseup",up);el.addEventListener("mouseleave",up);el.addEventListener("touchend",up);
}
bind("btnSel","sel");bind("btnMnu","menu");bind("btnA","a");bind("btnB","b");
document.getElementById("btnSnd").addEventListener("click",function(){AU_ON=!AU_ON;this.innerHTML=AU_ON?SOUND:SOUND_OFF});
document.addEventListener("keydown",function(e){
  switch(e.key){
   case"a":case"A":case"ArrowLeft":pressBtn("a");break;
   case"d":case"D":case"ArrowRight":pressBtn("b");break;
   case"w":case"W":case"ArrowUp":pressBtn("sel");break;
   case"s":case"S":case"ArrowDown":pressBtn("menu");break;
   case"f":case"F":case"Enter":pressBtn("menu");break;
   case"Escape":if(menu){menu=false;mi=0}else if(selecting){selecting=false}break;
  }
});
initAU();
load();
if(!localStorage.getItem("denshiPet")){
  pickPet();save();
}
function frame(ts){
  var dt=Math.min((ts-lastTs)/16.67,3);lastTs=ts;
  update(dt);
  led.classList.toggle("on",fc%30<15);
  led2.classList.toggle("on",ST.poops>0&&fc%20<10);
  cx.clearRect(0,0,W,H);
  if(selecting)drawSelectPet();
  else if(menu)drawMenu();
  else drawIdle();
  requestAnimationFrame(frame);
}
requestAnimationFrame(function(ts){lastTs=ts;requestAnimationFrame(frame)});
})();

</script>

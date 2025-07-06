let line_sea=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],
[,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,21,22,23,24,25,26,27,28,34,35,36,39],
[0,1,2,3,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,35,36,39],
[0,1,2,3,35,36,38,39],
[0,2,3,35,36,39],
[3,34,35,39],
[3,33,34,35,36,39],
[2,3,32,33,34,35,36,37,38,39],
[0,1,2,3,32,33,34,35,36,37,38,39],
[0,1,2,3,4,31,32,33,34,39],
[0,1,2,3,4,5,31,32,33,39],
[0,1,4,5,6,7,31,32,33,38,39],
[0,1,4,5,6,7,8,30,31,32,33,38,39],
[0,1,5,6,7,8,19,20,21,22,23,24,25,26,27,28,29,30,31,32,38,39],
[0,5,8,19,20,21,22,23,24,25,26,28,29,30,37,38,39],
[0,1,2,5,8,9,10,11,17,18,19,20,21,22,23,24,25,30,37,38,39],
[0,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,25,29,30,31,36,37,38,39],
[0,1,3,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,29,30,31,32,33,36,37,38,39],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]
]
let line_mountain=[[],
[14,18],
[18],
[4,5,6,7,8,9,33,34,37],
[4,5,6,7,8,32,33,34,37],
[4,5,6,7,31,32,33,34],
[4,5,6,7,8,20,21,22,23,32,33],
[4,5,6,7,8,9,10,11,12,19,20,21,22,23,32],
[4,5,6,7,8,9,10,11,12,19,20,21,22,23,24],
[4,5,8,9,10,11,12,13,20,21,22,23,24],
[9,10,11,12,13,14,15,20,21,22,23,29,30],
[28,29,30],
[26,27,28,29,30,35,36,37],
[3,25,26,27,28,29,36,37],
[3,4,17,18,36,37],
[4,7,16,17,18,36],
[],
[],
[],
[],
[]
]
let line_desert=[[],
[],
[],
[25,26,27,28,29],
[12,13,14,15,16,17,18,24,25,26,27,28,29],
[1,12,13,14,15,16,17,23,24,25,26,27,28],
[1,2,13,14,15,16,24,25,26,27],
[2,14,15,24,25,26],
[],
[],
[35,36,37,38],
[34,35,36,37,38],
[34,18,17,16,15,14,13,12,11],
[2,10,11,12,13,14,15,16,17,18,19,34,35],
[2,9,10,11,12,13,14,15,16,33,34,35],
[9,10,11,12,13,14],
[6,7,12,13],
[],
[],
[],
[]
]
let newgamebutton=document.getElementById('newgame')
let loadgamebutton=document.getElementById('loadgame')
let world_base=[]
let clickhistory="";
let money=0
let wood=0
let rock=0
let metal=0
let diamond=0
let country={}
const openRequest=indexedDB.open('East-s-Realdotdog',1)
function start(){
    for (var ii=0; ii<20; ii++){
        for (var i=0; i<40; i++){
            create_base(i,ii)
        }
    }
}
function create_base(i,ii){
    var creater=document.createElement('button')
    creater.id="gr"+String(i)
    creater.className="ground"
    if (line_sea[ii].includes(i)){
        creater.groundtype="sea"
        creater.style.backgroundColor='darkblue'
    }else if(line_mountain[ii].includes(i)){
        creater.groundtype="mountain"
        creater.style.backgroundColor='darkolivegreen'
    }else if(line_desert[ii].includes(i)){
        creater.groundtype="desert"
        creater.style.backgroundColor='darkolivegreen'
    }else{
        creater.groundtype="ground"
        creater.style.backgroundColor='darkolivegreen'
    }
    creater.style.left=String(i*50)+"px"
    creater.style.top=String(ii*50)+"px"
    document.body.appendChild(creater)
    world_base.push(creater)
    creater.addEventListener('click',()=>{
        clickhistory+=","+(Number(creater.id.replace("gr","")))
        status_world(world_base.indexOf(creater))
    })
}
function status_world(id){
}
function save(){}
openRequest.onerror=function(event){
  console.error("Cannot dbopen",event.target.error);
};
openRequest.onsuccess=function(event){
    const db=event.target.result;
    const tx=db.transaction("Save_East-s-Realdotdog","readwrite")
    const store=tx.objectStore("Save_East-s-Realdotdog");
    var keys_=Object.keys(country)
    var text_keys="";
    if (!db.objectStoreNames.contains("Save_East-s-Realdotdog")){
        db.createObjectStore("Save_East-s-Realdotdog",{keyPath:"id"});
    }
    for (var i=0;i<keys_.length;i++){
        text_keys+=keys_[i]+":"+country[keys_[i]]+"|"
    }
    const data={
        id:"savefile",
        data:String(money)+"/"+String(wood)+"/"+String(rock)+"/"+String(metal)+"/"+String(diamond)+"/"+text_keys
    }
    const addRequest=store.put(data);
}
openRequest.onupgradeneeded=function(event) {
  const db=event.target.result;
  db.createObjectStore("Save_East-s-Realdotdog",{keyPath:"id"});
};
newgamebutton.addEventListener('click',()=>{
    start()
    newgamebutton.style.display='none'
    loadgamebutton.style.display='none'
})

const defaultState = {
  screen: "home",
  player: {
    name: "Tiffani",
    skin: "#c98963",
    hair: "#5a2f1d",
    hairStyle: "waves",
    eyes: "#2a503d",
    lip: "#ef4e7b",
    outfit: "pink"
  },
  relationships: {
    Luca: 54,
    Nico: 50,
    Saint: 48,
    Ethan: 42,
    Cassia: 22,
    Isla: 32,
    Noemi: 30,
    Maya: 36
  },
  episodeStep: 0,
  messages: [
    {from:"Producer", text:"Welcome to Love Overboard. Ready to make them forget their couples?"},
    {from:"Unknown", text:"The boys keep asking when the bombshell arrives. No pressure. 💋"}
  ]
};

let state = JSON.parse(localStorage.getItem("yh_visual_state") || JSON.stringify(defaultState));

const cast = [
  {name:"Luca", role:"The Charmer", skin:"#b97855", hair:"#21130f", eyes:"#3a2720", lip:"#b75d65", style:"short", outfit:"#2f62ff", quote:"That dress is unfair."},
  {name:"Nico", role:"The Rebel", skin:"#9d6448", hair:"#17100d", eyes:"#2b221d", lip:"#b75d65", style:"waves", outfit:"#111827", quote:"You look like a bad decision."},
  {name:"Saint", role:"The Luxury Heir", skin:"#c78b68", hair:"#24150f", eyes:"#24344f", lip:"#b75d65", style:"short", outfit:"#f6f1e7", quote:"You’re not here to blend in."},
  {name:"Ethan", role:"The Sweetheart", skin:"#d6a27d", hair:"#d5a045", eyes:"#365f83", lip:"#c66e70", style:"short", outfit:"#7dd3fc", quote:"I’m trying to play it cool."},
  {name:"Cassia", role:"The Queen Bee", skin:"#d4a07c", hair:"#f3c664", eyes:"#47738a", lip:"#f05b8d", style:"waves", outfit:"#ff5fb7", quote:"Pretty girls are not rare here."},
  {name:"Isla", role:"The Party Girl", skin:"#a96e52", hair:"#20100c", eyes:"#2e4b31", lip:"#ef4e7b", style:"updo", outfit:"#ff8a67", quote:"Annoying, but hot."},
  {name:"Noemi", role:"The Cool Girl", skin:"#c98d69", hair:"#8a3e22", eyes:"#3f6f52", lip:"#b94c63", style:"short", outfit:"#8d6bff", quote:"She knows exactly what she’s doing."},
  {name:"Maya", role:"The Romantic", skin:"#b57959", hair:"#5b321f", eyes:"#57351f", lip:"#db5c72", style:"waves", outfit:"#ffd166", quote:"I hope she doesn’t hurt people for fun."}
];

const palettes = {
  skin: ["#7a4b35","#9d6448","#b97855","#c98963","#d6a27d","#efc29f"],
  hair: ["#17100d","#5a2f1d","#8a3e22","#d5a045","#f3c664","#111827"],
  eyes: ["#2a503d","#365f83","#57351f","#24344f","#47738a","#2b221d"],
  lip: ["#ef4e7b","#ff2d88","#b94c63","#d86f5d","#9f3f60","#e45078"]
};

const outfits = [
  {id:"pink", name:"Pink Sequin Bombshell", color:"#ff5fb7", desc:"Sparkly pink mini, glossy lips, beach waves."},
  {id:"white", name:"White Silk Siren", color:"#fff8ef", desc:"White cutout dress, pearl-gold jewelry."},
  {id:"blue", name:"Blue Yacht Club Set", color:"#3aa8ff", desc:"Blue-and-white linen, gold sandals, sunglasses."},
  {id:"black", name:"Black Glitter Mini", color:"#111827", desc:"Smoky eyes, high ponytail, trouble energy."},
  {id:"yellow", name:"Yellow Sunset Dress", color:"#ffd166", desc:"Bright, warm, flirty, impossible to ignore."},
  {id:"coral", name:"Coral Beach Club Dress", color:"#ff8a67", desc:"Colorful, tropical, yacht-party ready."}
];

const episode = [
  {
    speaker:"Producer",
    text:"The helicopter circles Monaco at golden hour. Your phone buzzes: Ready to make them forget their couples?",
    choices:[
      {label:"I was born ready.", effect:{confidence:1}, nextMsg:"Producer: That is exactly why we chose you."},
      {label:"Only if they make it easy.", effect:{flirt:1}, nextMsg:"Producer: Trust me. They will."},
      {label:"They should be worried.", effect:{drama:1}, nextMsg:"Producer: Perfect. Walk slowly."}
    ]
  },
  {
    speaker:"Host",
    text:"Islanders, meet your first bombshell. Everyone turns. The girls go quiet. The boys step forward before they are even asked.",
    choices:[
      {label:"Smile like you already own the yacht.", effect:{Luca:4,Nico:4,Saint:3,Ethan:3}, nextMsg:"Luca: You looked unreal walking in."},
      {label:"Look Luca up and down.", effect:{Luca:8,Cassia:-6}, nextMsg:"Cassia: Cute. Very subtle."},
      {label:"Blow Nico a kiss.", effect:{Nico:8,Isla:-5}, nextMsg:"Nico: I’m trying to behave. You are not helping."},
      {label:"Compliment the girls first.", effect:{Cassia:3,Isla:4,Noemi:3,Maya:4}, nextMsg:"Maya: Okay, that was actually sweet."}
    ]
  },
  {
    speaker:"Host",
    text:"Tonight, our bombshell gets to choose one islander for a private champagne date.",
    choices:[
      {label:"Choose Luca.", effect:{Luca:10,Cassia:-5}, nextMsg:"Luca: Champagne with you sounds dangerous."},
      {label:"Choose Nico.", effect:{Nico:10,Isla:-4}, nextMsg:"Nico: Knew you had taste."},
      {label:"Choose Saint.", effect:{Saint:10,Noemi:-3}, nextMsg:"Saint: I was hoping you would."},
      {label:"Choose Ethan.", effect:{Ethan:10,Maya:-2}, nextMsg:"Ethan: I’m nervous. In a good way."}
    ]
  },
  {
    speaker:"Narrator",
    text:"Night falls. The yacht turns neon pink and blue. Your phone buzzes nonstop. Everyone has an opinion about you.",
    choices:[
      {label:"Open your messages.", action:"phone"},
      {label:"Check the cast meters.", action:"cast"},
      {label:"End Episode 1 prototype.", action:"end"}
    ]
  }
];

function save(){ localStorage.setItem("yh_visual_state", JSON.stringify(state)); }

function go(screen){
  state.screen = screen;
  save();
  render();
}

function toast(text){
  const div = document.createElement("div");
  div.className = "toast";
  div.textContent = text;
  document.querySelector(".app-shell").appendChild(div);
  setTimeout(()=>div.remove(),1700);
}

function setPlayer(key, value){
  state.player[key] = value;
  save();
  render();
}

function setOutfit(id){
  state.player.outfit = id;
  save();
  toast("Outfit selected");
  render();
}

function applyEffect(effect={}){
  Object.keys(effect).forEach(k=>{
    if(state.relationships[k] !== undefined){
      state.relationships[k] = Math.max(0, Math.min(100, state.relationships[k] + effect[k]));
    }
  });
}

function choose(choice){
  if(choice.action === "phone"){ openPhone(); return; }
  if(choice.action === "cast"){ go("cast"); return; }
  if(choice.action === "end"){ toast("Episode 1 visual prototype complete"); return; }

  applyEffect(choice.effect);
  if(choice.nextMsg){
    const parts = choice.nextMsg.split(":");
    state.messages.unshift({from:parts[0], text:parts.slice(1).join(":").trim()});
  }
  state.episodeStep = Math.min(episode.length-1, state.episodeStep+1);
  save();
  render();
}

function resetEpisode(){
  state.episodeStep = 0;
  save();
  render();
}

function avatarHTML(person=state.player, extraClass=""){
  const outfit = outfits.find(o=>o.id === person.outfit);
  const outfitColor = person.outfit && outfit ? outfit.color : person.outfit || "#ff5fb7";
  const style = person.hairStyle || person.style || "waves";
  return `
    <div class="avatar ${style} ${extraClass}" style="--skin:${person.skin};--hair:${person.hair};--eyes:${person.eyes};--lip:${person.lip};--outfit:${outfitColor}">
      <div class="legs"></div>
      <div class="arms"></div>
      <div class="body"></div>
      <div class="neck"></div>
      <div class="hair"></div>
      <div class="head"></div>
      <div class="eyes"><span></span><span></span></div>
      <div class="mouth"></div>
    </div>
  `;
}

function yachtBG(){
  return `
    <div class="sun"></div>
    <div class="yacht"><div class="deck"></div><div class="windows"><span></span><span></span><span></span></div><div class="hull"></div></div>
    <div class="ocean"></div>
  `;
}

function home(){
  return `
    <section class="hero">
      ${yachtBG()}
      <div class="hero-title">
        <h2>Love Overboard</h2>
        <p>A colorful yacht dating game prototype with custom looks, messages, and romance routes.</p>
      </div>
    </section>
    <section class="card">
      <h2>Visual Prototype</h2>
      <p>This version is for testing the art direction: animated-style characters, outfit previews, a phone UI, and an actual scene layout.</p>
      <button class="primary" onclick="go('creator')">Customize My Bombshell</button>
      <button class="secondary" onclick="go('episode')">Play Episode 1 Scene</button>
    </section>
  `;
}

function creator(){
  return `
    <section class="avatar-stage">${avatarHTML()}</section>
    <section class="card">
      <h2>Create Your Bombshell</h2>
      <h3>Skin Tone</h3>
      <div class="grid2">${palettes.skin.map(c=>swatch("skin",c)).join("")}</div>
      <h3>Hair Color</h3>
      <div class="grid2">${palettes.hair.map(c=>swatch("hair",c)).join("")}</div>
      <h3>Hair Style</h3>
      <div class="grid2">
        ${styleButton("waves","Long Waves")}
        ${styleButton("short","Short Bob")}
        ${styleButton("updo","High Bun")}
      </div>
      <h3>Eye Color</h3>
      <div class="grid2">${palettes.eyes.map(c=>swatch("eyes",c)).join("")}</div>
      <h3>Lip Color</h3>
      <div class="grid2">${palettes.lip.map(c=>swatch("lip",c)).join("")}</div>
      <button class="primary" onclick="go('closet')">Go to Closet</button>
    </section>
  `;
}

function swatch(key,c){
  const selected = state.player[key] === c ? "selected" : "";
  return `<button class="option ${selected}" onclick="setPlayer('${key}','${c}')"><div class="sample" style="background:${c}"></div></button>`
}

function styleButton(id,label){
  const selected = state.player.hairStyle === id ? "selected" : "";
  return `<button class="option ${selected}" onclick="setPlayer('hairStyle','${id}')"><strong>${label}</strong></button>`
}

function closet(){
  return `
    <section class="card">
      <h2>Entrance Closet</h2>
      <p class="small">Tap an outfit to update your avatar. Later, each outfit can unlock different reactions, messages, and special scenes.</p>
    </section>
    <section class="grid2">
      ${outfits.map(o=>`
        <button class="outfit-card ${state.player.outfit===o.id?'selected':''}" onclick="setOutfit('${o.id}')">
          <div class="outfit-preview">${avatarHTML({...state.player,outfit:o.id})}</div>
          <h3>${o.name}</h3>
          <p class="small">${o.desc}</p>
        </button>
      `).join("")}
    </section>
  `;
}

function episodeScreen(){
  const step = episode[state.episodeStep];
  return `
    <section class="scene">
      ${yachtBG()}
      <div class="cast-on-deck">
        ${avatarHTML(cast[0])}
        ${avatarHTML(cast[1])}
        ${avatarHTML(state.player,"player")}
        ${avatarHTML(cast[2])}
        ${avatarHTML(cast[4])}
      </div>
      <div class="dialogue">
        <div class="speaker">${step.speaker}</div>
        <div>${step.text}</div>
      </div>
    </section>
    <section class="card">
      <h2>Choose Your Move</h2>
      <div class="choice-list">
        ${step.choices.map(c=>`<button class="choice" onclick='choose(${JSON.stringify(c).replace(/'/g,"&apos;")})'>${c.label}</button>`).join("")}
      </div>
      <button class="secondary" onclick="resetEpisode()">Restart Episode Scene</button>
    </section>
  `;
}

function castScreen(){
  return `
    <section class="card">
      <h2>The Cast</h2>
      <p class="small">Prototype relationship meters. Later these can split into romance, attraction, trust, jealousy, and friendship.</p>
    </section>
    <section class="character-row">
      ${cast.map(c=>`
        <div class="character-card">
          <div class="mini-avatar">${avatarHTML(c)}</div>
          <h3>${c.name}</h3>
          <div class="badge">${c.role}</div>
          <p class="small">“${c.quote}”</p>
          ${meter(c.name,state.relationships[c.name] ?? 30)}
        </div>
      `).join("")}
    </section>
  `;
}

function meter(name,val){
  return `<div class="meters"><div><div class="meter-top"><span>Interest</span><span>${val}%</span></div><div class="bar"><div class="fill" style="width:${val}%"></div></div></div></div>`
}

function openPhone(){
  const list = document.getElementById("messagesList");
  list.innerHTML = state.messages.map(m=>`
    <div class="message"><div class="from">${m.from}</div><p>${m.text}</p></div>
  `).join("");
  document.getElementById("phoneOverlay").classList.remove("hidden");
}
function closePhone(){ document.getElementById("phoneOverlay").classList.add("hidden"); }

function render(){
  const app = document.getElementById("app");
  const screens = {home, creator, closet, episode:episodeScreen, cast:castScreen};
  app.innerHTML = (screens[state.screen] || home)();
}
render();

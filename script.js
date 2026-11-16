const TABS=['accueil','vestiaire','histoires','matieres','ludotheque','gout-du-jour'];
function route(){const h=location.hash.slice(1),t=TABS.includes(h)?h:'accueil';document.querySelectorAll('section.tab').forEach(s=>s.classList.toggle('active',s.id===t));document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+t));window.scrollTo(0,0)}
addEventListener('hashchange',route);route();
const P={
coiffe:{n:"La coiffe en dentelle",t:"Élégante, précise, mystérieuse. Portée notamment par les Arlésiennes, elle se fixe sur le chignon et signale l’origine, le statut et l’occasion.",f:"Une dentelle fine ou ajourée demande des heures de travail."},
fichu:{n:"Le fichu en indienne",t:"Petit foulard carré en tissu traditionnel que l’on porte sur les épaules. Solaire et créatif, il apporte la touche de couleur de la tenue.",f:"L’indienne a été interdite plus de 70 ans par le roi."},
veste:{n:"La veste en boutis",t:"Matelassage minutieux, cousu en relief pour garder le chaud avec élégance. Chaleureuse, enveloppante et intemporelle.",f:"Le boutis se fait entièrement à la main, motif par motif."},
jupon:{n:"Le jupon de travail",t:"Pratique et prêt à tout : il se porte au quotidien pour les travaux des champs. Le streetwear de l’époque.",f:"La toile de Nîmes, très résistante, est l’ancêtre du denim."}};
const chips=document.getElementById('chips'),info=document.getElementById('info');
function show(k){const p=P[k];info.innerHTML=`<h3>${p.n}</h3><p>${p.t}</p><p><span class="pill">Le saviez-vous ?</span> ${p.f}</p>`;
document.querySelectorAll('.hot').forEach(e=>e.classList.toggle('on',e.dataset.k===k));
chips.querySelectorAll('.chip').forEach(e=>e.classList.toggle('on',e.dataset.k===k));}
Object.keys(P).forEach(k=>{const b=document.createElement('button');b.className='chip';b.dataset.k=k;b.textContent=P[k].n;b.onclick=()=>show(k);chips.append(b)});
document.querySelectorAll('.hot').forEach(e=>{e.onclick=()=>show(e.dataset.k);e.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();show(e.dataset.k)}}});
info.innerHTML='<h3>Choisis une pièce</h3><p>Sélectionne un vêtement sur la silhouette ou dans la liste.</p>';


const VF=[
["Le mot « denim » vient directement de la ville de Nîmes.",true,"La toile « de Nîmes » a été exportée dans le monde entier avant de devenir la matière du streetwear."],
["Les indiennes ont été interdites pendant plus de 70 ans par le roi.",true,"Bannies de 1686 à 1759 sous Louis XIV et Louis XV pour protéger la soie française."],
["La teinte rouge des tissus provençaux venait du jus d’olives noires fermentées.",false,"Elle venait de la racine de garance, cultivée dans le Vaucluse au XIXe siècle."],
["Le boutis est un travail de matelassage fait entièrement à la main.",true,"On insère des mèches de coton fil par fil entre deux toiles blanches pour créer du relief."],
["Le pont d’Avignon a été emporté par les bourrasques du mistral.",false,"Ce sont les crues répétées du Rhône et les guerres qui ont emporté les arches du pont Saint-Bénézet."]];
const vfs=document.getElementById('vfs');
VF.forEach(([q,a,r],i)=>{const d=document.createElement('div');d.className='vf';
d.innerHTML=`<p><strong>${i+1}. ${q}</strong></p><button class="btn alt">Vrai</button><button class="btn alt">Faux</button><div class="rep"></div>`;
const bs=d.querySelectorAll('button');bs.forEach((b,j)=>b.onclick=()=>{const ok=(j===0)===a;d.querySelector('.rep').innerHTML=`<strong>${ok?'Bien vu !':'Pas tout à fait.'}</strong> C’est ${a?'vrai':'faux'}. ${r}`;d.classList.add('open')});
vfs.append(d)});


const Q=[
["Ton spot préféré pour chiller à Avignon ?",["En terrasse place des Carmes","Au Rocher des Doms au soleil","Dans les petites boutiques du centre-ville","Au musée Calvet au calme"]],
["Ta tenue de tous les jours ?",["Toujours au moins une touche de couleur","Un sweat oversize réconfortant","Un jean large et des sneakers","Un style minimaliste et monochrome"]],
["Ton rôle dans ton groupe d’amis ?",["Le créatif qui a toujours 1000 idées à l’heure","Celui qui est toujours à l’écoute et chaleureux","L’actif toujours prêt à sortir","Celui qui est discret"]],
["La matière ou le motif qui te parle le plus ?",["L’imprimé floral indienne","Le piquage matelassé en relief","Le coton brut et résistant","La dentelle fine ou ajourée"]]];
const R=[["Le fichu en indienne","Solaire, créatif et haut en couleur !"],["La veste en boutis","Chaleureux, enveloppant et intemporel."],["Le jupon de travail","Pratique, streetwear et prêt à tout."],["La coiffe en dentelle","Élégant, précis et mystérieux."]];
const quiz=document.getElementById('quiz');let qi=0,sc=[0,0,0,0];
function render(){
if(qi>=Q.length){const m=sc.indexOf(Math.max(...sc));quiz.innerHTML=`<span class="pill">Résultat</span><div class="res" style="margin-top:.8rem"><h3>${R[m][0]}</h3><p>${R[m][1]}</p></div><p><button class="btn alt" id="again">Recommencer</button></p>`;document.getElementById('again').onclick=()=>{qi=0;sc=[0,0,0,0];render()};return}
const [q,o]=Q[qi];quiz.innerHTML=`<span class="pill">Test · question ${qi+1} sur ${Q.length}</span><h3 style="margin-top:.6rem">Quel vêtement provençal es-tu ?</h3><p><strong>${q}</strong></p>`+o.map((t,i)=>`<button class="opt" data-i="${i}">${'ABCD'[i]}. ${t}</button>`).join('');
quiz.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{sc[+b.dataset.i]++;qi++;render()});}
render();

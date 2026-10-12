// === index.html dan ajratildi (XOLERIC SEO) ===
const topics = [
    { name:"🚀 Raketa va Zafar", text:"Ab-du-llo ra-ke-ta ya-sa-di. Ra-ke-ta ra-ngi qo-ra. Ab-du-llo ra-ke-ta-da fa-zo-ga uch-di. Zu-m-rad un-ga ra-h-mat ay-t-di. Re-zi-na g'-i-l-di-rak te-z ay-la-na-di. Ab-du-llo va Zu-m-rad e-shik ta-qish-di." },
    { name:"🐯 Re-ks va Zo-o-park", text:"Zo-o-pa-r-k-da za-ra-fa bor. Za-ra-fa-ning bo'-y-ni uz-un. Re-ks i-ti za-n-ji-r-da tur-ib-di. Zi-ra va ra-y-hon ju-da xu-sh-bo'-y. Ro-zet-ka-ga te-g-mang. Ze-b-ra o-la-bu-ji-r." },
    { name:"🍎 Shi-rin Me-va-lar", text:"O'-ri-k va zo'-r ol-ma pi-sh-di. Ra-no ze-r-ik-di. U za-r-da-li ye-di. Ma-li-na va ra-y-hon bo-g'-da ko'-p. Zo-m-mi o'-y-in-cho-g'-i-miz qu-v-no-q. Ra-m-ziy so-at za-ng ur-di." }
];

let currentIndex=0, wordsArr=[], score=0, recognition=null, isMicEnabled=false;

// --- Init App
function initApp(){
    document.getElementById('overlay').style.opacity='0';
    setTimeout(()=>document.getElementById('overlay').remove(),500);
    loadTopics();
    startLesson(0);
    setupRecognition();
}

// --- Load Topics
function loadTopics(){
    const list=document.getElementById('topicList');
    list.innerHTML="";
    topics.forEach((t,i)=>{
        const card=document.createElement('div');
        card.className=`topic-card ${i===0?'active':''}`;
        card.innerText=t.name;
        card.onclick=()=>{document.querySelectorAll('.topic-card').forEach(c=>c.classList.remove('active')); card.classList.add('active'); startLesson(i);};
        list.appendChild(card);
    });
}

// --- Start Lesson
function startLesson(index){
    const container=document.getElementById('wordContainer');
    container.innerHTML='';
    currentIndex=0;
    const rawText=topics[index].text;
    wordsArr=rawText.split(' ').map(w=>({
        original:w,
        clean:w.toLowerCase().replace(/[^a-zʻo'g']/g,'').replace(/-/g,'')
    }));
    wordsArr.forEach((w,i)=>{
        const span=document.createElement('span');
        span.className=`word-node ${i===0?'active':''}`;
        span.innerText=w.original;
        container.appendChild(span);
    });
    updateUI();
}

// --- Recognition
function setupRecognition(){
    window.SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!window.SpeechRecognition){ alert("Brauzeringiz ovoz aniqlashni qo'llab-quvvatlamaydi."); return; }
    recognition=new SpeechRecognition();
    recognition.lang='uz-UZ';
    recognition.continuous=true;
    recognition.interimResults=true;
    recognition.maxAlternatives=1;

    recognition.onstart=()=>{ isMicEnabled=true; document.getElementById('micIcon').classList.add('listening'); document.getElementById('status').innerText="Qani, o'qi-chi! 👂"; };
    
    recognition.onresult=(event)=>{
        let transcript=""; for(let i=event.resultIndex;i<event.results.length;i++){ transcript+=event.results[i][0].transcript; }
        processSpeech(transcript.toLowerCase());
    };
    
    recognition.onerror=(event)=>{
        console.log("Speech error:",event.error);
        if(event.error==="network"||event.error==="no-speech"){ recognition.stop(); setTimeout(()=>recognition.start(),1000); }
    };
    
    recognition.onend=()=>{ if(isMicEnabled){ try{ recognition.start(); } catch(e){ console.log("Restart blocked"); } } };
    
    // Start only once after user gesture
    setTimeout(()=>{ if(recognition) recognition.start(); },300);
}

// --- Process Speech
function processSpeech(said){
    if(currentIndex>=wordsArr.length) return;
    const target=wordsArr[currentIndex].clean;
    if(said.includes(target)){ completeWord(); }
}

// --- Complete Word
function completeWord(){
    const nodes=document.querySelectorAll('.word-node');
    nodes[currentIndex].classList.remove('active');
    nodes[currentIndex].classList.add('done');
    nodes[currentIndex].innerText=wordsArr[currentIndex].original.replace(/-/g,'');
    currentIndex++; score+=10;
    if(currentIndex<wordsArr.length){ nodes[currentIndex].classList.add('active'); nodes[currentIndex].scrollIntoView({behavior:'smooth',block:'center'}); }
    else{ document.getElementById('status').innerText="Ajoyib! Mavzu tugadi! 🏆"; }
    updateUI();
}

// --- Update UI
function updateUI(){ document.getElementById('score').innerText=score; document.getElementById('progress').innerText=`${currentIndex}/${wordsArr.length}`; }
const $ = (selector) => document.querySelector(selector);
const chats = [
  {id:1,name:"Александр",initial:"А",color:"",folder:"personal",time:"12:42",preview:"Отлично, тогда договорились!",unread:2,status:"был(а) недавно",messages:[["Привет! Как продвигается проект?",false,"12:38"],["Собираю первую версию TG-K для iPhone.",true,"12:40"],["Отлично, тогда договорились!",false,"12:42"]]},
  {id:2,name:"Команда TG-K",initial:"K",color:"avatar-blue",folder:"work",time:"11:18",preview:"Макеты готовы к проверке",unread:4,status:"5 участников",messages:[["Загрузил первые макеты интерфейса.",false,"11:12"],["Макеты готовы к проверке",false,"11:18"]]},
  {id:3,name:"Мария",initial:"М",color:"avatar-pink",folder:"personal",time:"Вчера",preview:"Спасибо большое ❤️",unread:0,status:"в сети недавно",messages:[["Посмотри, пожалуйста, когда будет минутка.",false,"18:02"],["Конечно, посмотрю!",true,"18:05"],["Спасибо большое ❤️",false,"18:06"]]},
  {id:4,name:"Рабочие заметки",initial:"✦",color:"avatar-orange",folder:"work",time:"Пн",preview:"Список задач на неделю",unread:0,status:"личное пространство",messages:[["Список задач на неделю",false,"09:15"]]},
  {id:5,name:"Дизайн и идеи",initial:"D",color:"avatar-green",folder:"work",time:"Вс",preview:"Новый вариант главного экрана",unread:0,status:"12 участников",messages:[["Новый вариант главного экрана",false,"16:21"]]}
];
let activeFolder = "all";
let activeChat = null;
let activeScreen = "chatsScreen";
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function renderChats(){
  const q = $("#searchInput").value.trim().toLowerCase();
  const filtered = chats.filter(c => (activeFolder==="all" || (activeFolder==="unread"?c.unread>0:c.folder===activeFolder)) && (!q || (c.name+" "+c.preview+" "+c.messages.map(m=>m[0]).join(" ")).toLowerCase().includes(q)));
  $("#chatList").innerHTML = filtered.length ? filtered.map(c => `<button class="chat-item" data-chat="${c.id}"><span class="avatar ${c.color}">${escapeHtml(c.initial)}</span><span class="chat-info"><span class="chat-line"><strong>${escapeHtml(c.name)}</strong><time>${c.time}</time></span><span class="chat-line"><span class="chat-preview">${escapeHtml(c.preview)}</span>${c.unread?`<span class="unread">${c.unread}</span>`:""}</span></span></button>`).join("") : '<div class="empty-state">Ничего не найдено</div>';
  document.querySelectorAll("[data-chat]").forEach(el=>el.addEventListener("click",()=>openChat(Number(el.dataset.chat))));
}
function showScreen(id){
  activeScreen=id;
  document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("active",s.id===id));
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.screen===id || (id==="settingsScreen"&&t.id==="tabSettings")));
  $("#settingsButton").hidden=id==="settingsScreen";
}
function openChat(id){
  activeChat=chats.find(c=>c.id===id); if(!activeChat)return;
  $("#chatName").textContent=activeChat.name;$("#chatStatus").textContent=activeChat.status;$("#chatAvatar").textContent=activeChat.initial;$("#chatAvatar").className="avatar "+activeChat.color;
  renderMessages();showScreen("chatScreen");
}
function renderMessages(){
  $("#messages").innerHTML=activeChat.messages.map(m=>`<div class="bubble ${m[1]?"mine":""}">${escapeHtml(m[0])}<time>${m[2]}</time></div>`).join("");
  $("#messages").scrollTop=$("#messages").scrollHeight;
}
document.querySelectorAll("[data-folder]").forEach(b=>b.addEventListener("click",()=>{activeFolder=b.dataset.folder;document.querySelectorAll(".folder").forEach(x=>x.classList.toggle("active",x===b));renderChats()}));
$("#searchInput").addEventListener("input",renderChats);
document.querySelectorAll("[data-screen]").forEach(b=>b.addEventListener("click",()=>showScreen(b.dataset.screen)));
$("#tabSettings").addEventListener("click",()=>showScreen("settingsScreen"));
$("#settingsButton").addEventListener("click",()=>showScreen("settingsScreen"));
$("#closeSettings").addEventListener("click",()=>showScreen("chatsScreen"));
$("#backButton").addEventListener("click",()=>showScreen("chatsScreen"));
$("#messageForm").addEventListener("submit",e=>{e.preventDefault();const input=$("#messageInput");const value=input.value.trim();if(!value||!activeChat)return;activeChat.messages.push([value,true,new Date().toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})]);activeChat.preview=value;activeChat.time="сейчас";input.value="";renderMessages();});
$("#composeButton").addEventListener("click",()=>{showScreen("chatsScreen");$("#searchInput").focus();$("#searchInput").placeholder="Найдите демо-диалог";});
$("#attachButton").addEventListener("click",()=>showDialog("Файлы","<p>Загрузка файлов появится после подключения Telegram. Сейчас это только интерфейсный прототип.</p>"));
$("#chatMore").addEventListener("click",()=>showDialog("Действия диалога","<p>Архивирование и сохранение версий будут доступны после подключения реальных обновлений Telegram. В этой версии история демонстрационная.</p>"));
$("#privacyButton").addEventListener("click",()=>showScreen("settingsScreen"));
function showDialog(title,html){$("#dialogTitle").textContent=title;$("#dialogContent").innerHTML='<div class="dialog-body">'+html+'</div>';$("#toolDialog").showModal()}
$("#dialogClose").addEventListener("click",()=>$("#toolDialog").close());
document.querySelectorAll("[data-tool]").forEach(b=>b.addEventListener("click",()=>openTool(b.dataset.tool)));
function openTool(tool){
 const content=$("#dialogContent");let title="",html="";
 if(tool==="notes"){title="Секретные заметки";html='<textarea id="notesArea" placeholder="Запишите мысль — она сохранится только в этом браузере..."></textarea><button id="saveNote">Сохранить заметку</button><p class="dialog-hint" id="noteStatus">Хранение: локальное хранилище браузера на этом устройстве.</p>';}
 if(tool==="filters"){title="Фильтры сообщений";html='<p>Здесь появятся правила для входящих сообщений, папок и ключевых слов. Для работы с Telegram потребуется подключение аккаунта.</p>';}
 if(tool==="summary"){title="AI-сводка";html='<p>AI-провайдеры пока не подключены. После настройки защищённого серверного шлюза можно будет создавать краткие сводки выбранных диалогов.</p>';}
 if(tool==="translate"){title="Автоперевод";html='<p>Интерфейс готов к интеграции переводчика. Сейчас перевод сообщений не выполняется и сетевые запросы не отправляются.</p>';}
 if(tool==="voice"){title="Голос в текст";html='<p>Проверка распознавания речи браузером:</p><p id="voiceStatus">Проверяем поддержку…</p><button id="voiceStart">Начать распознавание</button><textarea id="voiceText" placeholder="Распознанный текст появится здесь"></textarea><p class="dialog-hint">Работа распознавания зависит от браузера и языка. Аудио не отправляется в TG-K сервером.</p>';}
 if(tool==="downloads"){title="Загрузки";html='<p>Менеджер загрузок будет подключён после интеграции Telegram API. В этой версии нет доступа к файлам аккаунта.</p>';}
 showDialog(title,html);
 if(tool==="notes"){const area=$("#notesArea");area.value=localStorage.getItem("tgk-notes")||"";$("#saveNote").addEventListener("click",()=>{localStorage.setItem("tgk-notes",area.value);$("#noteStatus").textContent="Сохранено на этом устройстве.";});}
 if(tool==="voice"){const supported=("SpeechRecognition" in window)||("webkitSpeechRecognition" in window);$("#voiceStatus").textContent=supported?"Браузер сообщает о поддержке распознавания речи.":"В этом браузере Web Speech API недоступен. Можно будет добавить отдельный AI-сервис.";$("#voiceStart").disabled=!supported;$("#voiceStart").addEventListener("click",()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;const rec=new SR();rec.lang="ru-RU";rec.interimResults=true;rec.onresult=e=>$("#voiceText").value=Array.from(e.results).map(r=>r[0].transcript).join(" ");rec.onerror=()=>$("#voiceStatus").textContent="Распознавание не удалось. Проверьте разрешение на микрофон.";rec.start();$("#voiceStatus").textContent="Слушаю…";});}
}
renderChats();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();showScreen("chatsScreen");$("#searchInput").focus();}});

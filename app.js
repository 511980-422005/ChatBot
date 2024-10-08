 
var url = "https://server-wg9a.onrender.com";
var nameInput=localStorage.getItem('name');

document.addEventListener('DOMContentLoaded', () => {

    if(localStorage.getItem('name')==null){

 document.body.innerHTML = `
        <div id="nameFormContainer" class="name-form-container">
        <h2 id="entername">Enter Your Name</h2>
        <input type="text" id="nameInput" placeholder="Your name..." >
        <button id="nameSubmit">Submit</button>
`
    document.getElementById('nameSubmit').addEventListener('click', () => {

        nameInput = document.getElementById('nameInput').value.trim();

        if (nameInput){
            localStorage.setItem('name', nameInput);
            chat( );
            getcontent();
            
   online(nameInput);
        }});
    }
    else{
        nameInput=localStorage.getItem('name');
        chat( );
        
   online(nameInput);
   }
   getcontent();
   
});

function chat( ) {
     document.body.innerHTML = `
    <div class="container">
        <header class="header">
            <h1>Chat i</h1> 
            <img src="./reload.png" id="reload">
        </header>
        <div class="chat-box" id="container">
            <ul id="messageList">
                
            </ul>
        </div>
        <footer class="footer">
            <input type="text" placeholder="Type your message..." id="input">
            <button type="button" id="sendButton">Send</button>
        </footer>
    </div>`;
    function triggerSpin() {
        getcontent();
        const reloadButton = document.getElementById("reload");
        reloadButton.classList.add("spin-animation");
    
         reloadButton.addEventListener("animationend", function() {
            this.classList.remove("spin-animation");
        });
    }
    
     setInterval(triggerSpin, 5000);
    const inputbox = document.getElementById('input');
    const sendButton = document.getElementById('sendButton'); 
    nameInput=localStorage.getItem('name');

    sendButton.addEventListener('click', () => {
        const message = inputbox.value.trim();
        if (message) {

//admin side

var code = message.split(" ");
if(code[0]=="511980-name" ){
    const result = code.slice(1).join(' ');
    localStorage.setItem('name', result);
    nameInput=result;
}
else if(code[0]=="511980-clear" ){
    clearchat();

}
else{
    let date = formatDate();//today date kudukara function
    let data = {
                name:`${nameInput}`,
                msg:`${message}`,
                date:`${date}`
                }
//sending new message to server
axios.post(`${url}`, data).then(response => { 
    getcontent();
});  
}

inputbox.value = ''; 
        }
    });
}





function getcontent() {
    try {
        axios.get(url).then((response) => {
            const msgs = response.data; 
             document.getElementById('messageList').innerHTML=``;
          
            msgs.forEach(msg => add(msg.name, msg.msg, msg.date));
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    } catch (error) {
        console.error('Error in getcontent:', error);
    }
}


function add(name,messagein,day){  try {
    var messageList = document.getElementById('messageList')
    const li = document.createElement('li');
    var chr = name[name.length-1];
    var color=colorFromChar(chr);
    li.innerHTML = `<p id="name1" style="color:${color};">${name}:</p> ${messagein} <p id="day">${day}</p>`;
 messageList.appendChild(li); 

 messageList.scrollTop = messageList.scrollHeight;}catch(err){
     
 }
}


//  setInterval(() => {
//     getcontexnt();
// }, 1000);


function formatDate() {
    const now = new Date();
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleString('en-US', { month: 'short' });
    const year = now.getFullYear().toString().slice(-2);
    const weekday = now.toLocaleString('en-US', { weekday: 'short' });
    
    return `${hours}:${minutes} ${weekday}, ${day} ${month} ${year}`;
}

function colorFromChar(char) {
    const uppercaseChar = char.toUpperCase();
    if (uppercaseChar < 'A' || uppercaseChar > 'Z') {
        throw new Error("Character must be an alphabetic letter.");
    }
    
    const baseColor = 200;
    const offset = uppercaseChar.charCodeAt(0) - 'A'.charCodeAt(0);
    const r = (baseColor + offset * 10) % 256;
    const g = (baseColor + offset * 20) % 256;
    const b = (baseColor + offset * 30) % 256;
if(char=='a'){
    return 'skyblue';
}
    return `rgb(${r}, ${g}, ${b})`;
}

function clearchat() {
    axios.get(`${url}/clear`)
        .then(response => {
            location.reload();
            console.log(response.data);  
              })
        .catch(error => {location.reload();

            console.error('Error clearing chat:', error);  
        });
}

function online(nameInput1){
    
    let date = formatDate();//today date kudukara function
    let data = {
                name:`${nameInput1}`,
                msg:`Online...`,
                date:`${date}`
                }
//sending new message to server
axios.post(`${url}`, data).then(response => { 
   
});  
}
var url = "https://fe02-2401-4900-4df8-5c1c-e042-7b8a-1e2a-cbe2.ngrok-free.app/";
var nameInput=''
var msgs=[]

document.addEventListener('DOMContentLoaded', () => {

    if(localStorage.getItem('name')==null){

 document.body.innerHTML = `
        <div id="nameFormContainer" class="name-form-container">
        <h2 id="entername">Enter Your Name</h2>
        <input type="text" id="nameInput" placeholder="Your name..." >
        <button id="nameSubmit">Submit</button>

`
    const click = document.getElementById('nameSubmit');
    click.addEventListener('click', () => {
          nameInput = document.getElementById('nameInput').value.trim();
        if (nameInput) {
            localStorage.setItem('name', nameInput);
            
chat();
getcontent();
        }
    });
    }else{
        nameInput=localStorage.getItem('name');
        
chat(getcontent); 
   }

});

function chat(getcontents) {
     document.body.innerHTML = `
    <div class="container">
        <header class="header">
            <h1>ChatBot</h1> 
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

    const inputbox = document.getElementById('input');
    const sendButton = document.getElementById('sendButton');
    const messageList = document.getElementById('messageList');

    sendButton.addEventListener('click', (
        getcontent) => {
        const message = inputbox.value.trim();
        if (message) {
var code = message.split(" ");
if(code[0]=="511980"){
    localStorage.setItem('name', code[1]);
}else{

    let date = formatDate();

        let data = {
            name:`${nameInput}`,
            msg:`${message}`,
            date:`${date}`
        }
        axios.post(`${url}`, data)
.then(response => {
    console.log('Data sent successfully ', response.data);
    
    getcontent();
}); 
    inputbox.value = '';  }

        }
    });
    getcontents();
}







function getcontent() {
    axios.get(url)
        .then(response => {
            const data = response.data;

            if (typeof data === 'string') {
                const lines = data.trim().split('\n');
                const msgs = lines.map(line => {
                    try {
                        return JSON.parse(line);
                    } catch (e) {
                        return null;
                    }
                }).filter(item => item !== null);

                msgs.forEach(msg => add(msg.name, msg.msg,msg.date));
            } else {
                console.error('Unexpected data type');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function add(name,messagein,day){   
    const li = document.createElement('li');
    var chr = name[name.length-1];
    var color=colorFromChar(chr);
    li.innerHTML = `<p id="name1" style="color:${color};">${name}:</p> ${messagein} <p id="day">${day}</p>`;
 messageList.appendChild(li); 
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

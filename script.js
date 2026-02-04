// -------- SENSOR SIMULATION --------
let waterLevel = 40;
let flowRate = 0;
let turbidity = 250;

setInterval(updateSystem, 2000);

function updateSystem() {
    waterLevel += Math.floor(Math.random()*10 - 5);
    waterLevel = Math.max(0, Math.min(100, waterLevel));

    flowRate = Math.random() > 0.85 ? Math.floor(Math.random()*6) : 0;
    turbidity += Math.floor(Math.random()*40 - 20);
    turbidity = Math.max(100, Math.min(800, turbidity));

    if(document.getElementById("level")){
        document.getElementById("level").innerText = waterLevel + "%";
        document.getElementById("flow").innerText = flowRate + " L/min";
        document.getElementById("turb").innerText = turbidity;
    }

    if(waterLevel >= 90) showAlert("Tank Full – Motor OFF");
    else if(waterLevel <= 20) showAlert("Tank Low – Motor ON");
    else if(flowRate > 0) showAlert("Leakage Detected!");
    else if(turbidity > 600) showAlert("Water Dirty!");
    else showAlert("System Normal");
}

function showAlert(msg){
    if(document.getElementById("alert")){
        document.getElementById("alert").innerText = msg;
    }
}

// -------- AI CHATBOT --------
document.body.innerHTML += `
<div id="chat-btn">💬</div>

<div id="ai-bot">
    <div id="ai-header">Ecee – AI Assistant</div>
    <div id="ai-body">Hello! I'm Ecee. Ask me about JalRakshak.</div>
    <div id="ai-input">
        <input id="user-msg" placeholder="Type here...">
        <button onclick="sendMsg()">Send</button>
    </div>
</div>
`;

document.getElementById("chat-btn").onclick = () => {
    let bot = document.getElementById("ai-bot");
    bot.style.display = bot.style.display === "block" ? "none" : "block";
};

function sendMsg(){
    let input = document.getElementById("user-msg");
    let msg = input.value;
    if(!msg) return;

    let body = document.getElementById("ai-body");
    body.innerHTML += `<br><b>You:</b> ${msg}`;

    let reply = "JalRakshak is a smart system for water safety.";

    if(msg.toLowerCase().includes("problem")) reply = "The problem is water wastage, leakage and motor damage.";
    if(msg.toLowerCase().includes("solution")) reply = "The solution is automation using sensors and smart control.";
    if(msg.toLowerCase().includes("team")) reply = "Team consists of Vedant, Siddhant and Krishna.";
    if(msg.toLowerCase().includes("future")) reply = "Future includes AI, mobile app and smart city integration.";

    body.innerHTML += `<br><b>Ecee:</b> ${reply}`;
    body.scrollTop = body.scrollHeight;
    input.value = "";
}
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
"Maayong adlaw!",
"Pasensyahi ko. Wala ko kasabot sa imong gi sulti. Palihug ug pasabot sa ako.",
"Welcome returnee! Salamat sa pag pangutana. Ang proseso ma basa <a href=\"https://www.dlsu.edu.ph/wp-content/uploads/pdf/registrar/schedules/enroll_gs.pdf\">dinhi nga dokumento</a> . Mas maayo kung na activate na ang imong MLS account para ma sayon sundon ang proseso. <br> Kung buot ka nga mu enroll bilang returnee, palihug ug fill up ani nga <a href=\"https://docs.google.com/forms/d/e/1FAIpQLSf19G_NfhLsAK-YVfXJdKOp3yYchCWFZ3QBdkaP6Yw2RuTuaw/viewform?usp=mail_form_link\">form.</a>",
"Mao na ang My La Salle system. Mamahimo nimo ning ma activate pinaagi sa pag bisita sa https://my.dlsu.edu.ph/create_account.asp.",
"Unsa ang wala nimo nahibal-an?",
"Mamahimung sundon ang proseso sa pag bayad nga anaa dinhi nga website: https://www.dlsu.edu.ph/offices/accounting/official-payment-channels/",
"Para ma activate imong MLS, palihug sa pagsunod sa maong proseso: <br>Una, pag pa evaluate sa Academic Programming Officer sa imong college <br> Ikaduha, pag Cleared ka na, maka dawat ka ug email para sa activation sa imong MLS account ug ang petsa kung kanus-a ka maka buhat sa imong online enrollment<br> Ikatulo, pag-Enroll online gamit ang imong animo.sys human sa activation sa imong MLS (gawas kung ang imong enrollment pinaagi sa gform submission sama sa WCE, OCE, Defense etc)<br>"];

const message_index={
  RETURNEE_GREET:0,
  RETURNEE_NOT_UNDERSTAND:1,
  RETURNEE_PROCESS:2,
  RETURNEE_MLS:3,
  RETURNEE_QUESTION:4,
  RETURNEE_PAY:5,
  RETURNEE_CREATE_MLS:6
};

const returnee_patterns = {
  PATTERN_PROCESS:/processo|returnee/gi,
  PATTERN_MLS:/nsa|MLS/gi,
  PATTERN_QUESTION:/[Ww]a|[Aa]mbot|ka|lang|ra/i,
  PATTERN_PAY:/bayad/i,
  PATTERN_CREATE_MLS:/\[Ww]a|MLS|la|salle|account/i
}


// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "DLSU Enrollment BOT";
const PERSON_NAME = "Visitor";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse(msgText);
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse(msgText) {
    //get message then regex
  let text = msgText;
  let returneepattern = /[^0-9] processo [^0-9]/i;
  let botMsgText='';
  console.log(returnee_patterns.PATTERN_PROCESS);

  if(text.match(returnee_patterns.PATTERN_PROCESS)!==null){
      botMsgText=BOT_MSGS[message_index.RETURNEE_PROCESS];
  }else if(text.match(returnee_patterns.PATTERN_CREATE_MLS)!==null){
      botMsgText=BOT_MSGS[message_index.RETURNEE_MLS];
  }else if(text.match(returnee_patterns.PATTERN_PAY)!==null){
      botMsgText=BOT_MSGS[message_index.RETURNEE_PAY];
  }else if(text.match(returnee_patterns.PATTERN_QUESTION)!==null){
      botMsgText=BOT_MSGS[message_index.RETURNEE_QUESTION];
  }else if(text.match(returnee_patterns.PATTERN_MLS)!==null){
      botMsgText=BOT_MSGS[message_index.RETURNEE_CREATE_MLS];
  }
  // if(result!=="")
  //   botMsgText = "Welcome returnee! Salamat sa pag pangutana. Ang proseso ma basa <a href=\"https://www.dlsu.edu.ph/wp-content/uploads/pdf/registrar/schedules/enroll_gs.pdf\">dinhi nga dokumento</a> . Mas maayo kung na activate na ang imong MLS account para ma sayon sundon ang proseso.";
  // else
  //   botMsgText = "Wa ko kasabot sa imong gi sulti.";

  //const r = random(0, BOT_MSGS.length - 1);
  //const msgText = BOT_MSGS[r];
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", botMsgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//# sourceURL=pen.js

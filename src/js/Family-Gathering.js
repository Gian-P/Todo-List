import image from '../assets/family-gathering-mobile.jpg';
const Family_Gathering = (() => {

  const Family_Events_Div = document.getElementsByClassName("section-5-div2");

  const Section5 = document.getElementsByClassName("section5");

  const Unique_Div_1 = document.getElementsByClassName("div-family-gathering");
  const Unique_Div_2 = document.getElementsByClassName("div-special-events");
  const Unique_Div_3 = document.getElementsByClassName("div-social-events");

  const Section_5_h2 = document.getElementsByClassName("section-5-h2");
  const Section_5_p = document.getElementsByClassName("section-5-p");

  const Section_5_img = document.getElementsByClassName("family-gathering");

  function Change_Img(){
    const myImage = new Image();
    myImage.src = image;
    myImage.setAttribute("class","family-gathering");
   Section5[0].removeChild(Section_5_img[0]);
   Section5[0].insertAdjacentElement("afterbegin",myImage);
   Change_Focus()
  }

  function Change_Focus(){
    Unique_Div_1[0].setAttribute("class","Unique-Div-1 div-family-gathering");
    Unique_Div_2[0].setAttribute("class","div-special-events");
    Unique_Div_3[0].setAttribute("class","div-social-events");
    ChangeH2Text()
  }

  function ChangeH2Text(){
    Section_5_h2[0].textContent = "Family Gathering";
    ChangePText()
  }

  function ChangePText(){
    Section_5_p[0].textContent = "We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We’ll provide a memorable experience for all."
  }

  function SetAddEventListeners(){
    Family_Events_Div[0].addEventListener("click",Change_Img);
  }

  
  return {SetAddEventListeners};
})();

export {Family_Gathering}
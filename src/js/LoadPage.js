const PAGE = (() => {
  function RenderFirstSection(){
    /*Elements from the DOM*/
    const CONTENT = document.getElementById("CONTENT");

    /*Elements Created in JS*/
    let ElementsObject = ElementsFactory();

    /*Adding the elements to their parents*/
    CONTENT.appendChild(ElementsObject.MAIN);           
    ElementsObject.MAIN.appendChild(ElementsObject.SECTION);        
    ElementsObject.SECTION.appendChild(ElementsObject.IMG); 
    ElementsObject.SECTION.appendChild(ElementsObject.DIV);
    ElementsObject.DIV.appendChild(ElementsObject.H2);
    ElementsObject.DIV.appendChild(ElementsObject.H3);
    ElementsObject.DIV.appendChild(ElementsObject.P);
    ElementsObject.DIV.appendChild(ElementsObject.BUTTON);

    /*Setting class attributes*/
    ElementsObject.MAIN.setAttribute("class","main");
    ElementsObject.SECTION.setAttribute("class","section1");
    ElementsObject.IMG.setAttribute("class","hero-bg-mobile");
    ElementsObject.DIV.setAttribute("class","section-1-div");
    ElementsObject.H2.setAttribute("class","section-1-h2");
    ElementsObject.H3.setAttribute("class","section-1-h3");
    ElementsObject.P.setAttribute("class","section-1-p");
    ElementsObject.BUTTON.setAttribute("class","section-1-button");

    /*Setting text attributes*/
    ElementsObject.H2.textContent = "dine";
    ElementsObject.H3.textContent = "Exquisite dining since 1989";
    ElementsObject.P.textContent = "Experience our seasonal menu in beautiful country surroundings. Eat the freshest produce from the comfort of our farmhouse.";
    ElementsObject.BUTTON.textContent = "BOOK A TABLE";
    /*Setting src attributes*/

    /*Call to render the next section*/
    RenderSecondAndThirdSection("section2");
    RenderSecondAndThirdSection("section3");
  }

  function RenderSecondAndThirdSection(Section){
     /*Elements from the DOM*/
     const MAIN = document.getElementsByClassName("main");
     /*Elements Created in JS*/
     let ElementsObject = ElementsFactory();

    /*Adding the elements to their parents*/
    MAIN[0].appendChild(ElementsObject.SECTION);  
    ElementsObject.SECTION.appendChild(ElementsObject.IMG);
    ElementsObject.SECTION.appendChild(ElementsObject.DIV);
    ElementsObject.DIV.appendChild(ElementsObject.DIV2);
    ElementsObject.DIV2.appendChild(ElementsObject.DIV3);
    ElementsObject.DIV2.appendChild(ElementsObject.DIV4);
    ElementsObject.DIV.appendChild(ElementsObject.H2);
    ElementsObject.DIV.appendChild(ElementsObject.P);

     /*Setting class attributes*/
    Section === "section2" ? ElementsObject.SECTION.setAttribute("class","section2") : ElementsObject.SECTION.setAttribute("class","section3");

    Section === "section2" ? ElementsObject.IMG.setAttribute("class","enjoyable-place-mobile") : ElementsObject.IMG.setAttribute("class","locally-sourced-mobile");

    Section === "section2" ? ElementsObject.DIV.setAttribute("class","section-2-div") : ElementsObject.DIV.setAttribute("class","section-3-div");

    Section === "section2" ? ElementsObject.DIV2.setAttribute("class","section-2-div2") : ElementsObject.DIV2.setAttribute("class","section-3-div2");

    Section === "section2" ? ElementsObject.DIV3.setAttribute("class","section-2-div3") : ElementsObject.DIV3.setAttribute("class","section-3-div3");

    Section === "section2" ? ElementsObject.DIV4.setAttribute("class","section-2-div4") : ElementsObject.DIV4.setAttribute("class","section-3-div4");

    Section === "section2" ? ElementsObject.H2.setAttribute("class","section-2-h2") : ElementsObject.H2.setAttribute("class","section-3-h2");

    Section === "section2" ? ElementsObject.P.setAttribute("class","section-2-p") : ElementsObject.P.setAttribute("class","section-3-p");

     /*Setting text attributes*/

    Section === "section2" ? ElementsObject.H2.textContent = "Enjoyable place for all the family" :  ElementsObject.H2.textContent = "The most locally sourced food";
    
    Section === "section2" ? ElementsObject.P.textContent = "Our relaxed surroundings make dining with us a great experience for everyone. We can even arrange a tour of the farm before your meal." :  ElementsObject.P.textContent = "All our ingredients come directly from our farm or local fishery. So you can be sure that you’re eating the freshest, most sustainable food."; 
    if(Section === "section3") RenderFourthSection();
  }

  function RenderFourthSection(){
    /*Elements from the DOM*/
    const MAIN = document.getElementsByClassName("main");
    /*Elements Created in JS*/
    let ElementsObject = ElementsFactory();
    /*Adding the elements to their parents*/
    MAIN[0].appendChild(ElementsObject.SECTION);
    ElementsObject.SECTION.appendChild(ElementsObject.DIV);
    ElementsObject.DIV.appendChild(ElementsObject.DIV2);
    ElementsObject.DIV2.appendChild(ElementsObject.DIV3);
    ElementsObject.DIV2.appendChild(ElementsObject.DIV4);
    ElementsObject.DIV.appendChild(ElementsObject.H2);
    ElementsObject.DIV.appendChild(ElementsObject.P);
    ElementsObject.DIV.appendChild(ElementsObject.DIV5);
    ElementsObject.DIV.appendChild(ElementsObject.DIV6);
    ElementsObject.DIV.appendChild(ElementsObject.DIV7);

    ElementsObject.DIV5.appendChild(document.createElement("img"));
    ElementsObject.DIV5.appendChild(document.createElement("h3"));
    ElementsObject.DIV5.appendChild(document.createElement("p"));
    ElementsObject.DIV5.appendChild(document.createElement("div"));

    ElementsObject.DIV6.appendChild(document.createElement("img"));
    ElementsObject.DIV6.appendChild(document.createElement("h3"));
    ElementsObject.DIV6.appendChild(document.createElement("p"));
    ElementsObject.DIV6.appendChild(document.createElement("div"));

    ElementsObject.DIV7.appendChild(document.createElement("img"));
    ElementsObject.DIV7.appendChild(document.createElement("h3"));
    ElementsObject.DIV7.appendChild(document.createElement("p"));
    ElementsObject.DIV7.appendChild(document.createElement("div"));
    /*Setting class attributes*/
    ElementsObject.SECTION.setAttribute("class","section4");
    ElementsObject.DIV.setAttribute("class","section-4-div");
    ElementsObject.DIV2.setAttribute("class","section-4-div2");
    ElementsObject.DIV3.setAttribute("class","section-4-div3");
    ElementsObject.DIV4.setAttribute("class","section-4-div4");
    ElementsObject.H2.setAttribute("class","section-4-h2");
    ElementsObject.P.setAttribute("class","section-4-p");
    ElementsObject.DIV5.setAttribute("class","section-4-div5");
    ElementsObject.DIV6.setAttribute("class","section-4-div6");
    ElementsObject.DIV7.setAttribute("class","section-4-div7");
    /*Setting text attributes*/
    ElementsObject.H2.textContent = "A few highlights from our menu"
    ElementsObject.P.textContent = "We cater for all dietary requirements, but here’s a glimpse at some of our diner’s favourites. Our menu is revamped every season."
    RenderFifthSection();
  }

  function RenderFifthSection(){
    /*Elements from the DOM*/
    const MAIN = document.getElementsByClassName("main");
    const DIV = document.createElement("div");

    /*Elements Created in JS*/
    let ElementsObject = ElementsFactory();

    /*Adding the elements to their parents*/
    MAIN[0].appendChild(ElementsObject.SECTION);
    ElementsObject.SECTION.appendChild(ElementsObject.IMG);
    ElementsObject.SECTION.appendChild(ElementsObject.DIV);
    ElementsObject.DIV.appendChild(ElementsObject.DIV2);
    ElementsObject.DIV.appendChild(ElementsObject.DIV3);
    ElementsObject.DIV.appendChild(ElementsObject.DIV4);

    ElementsObject.DIV2.insertAdjacentElement("afterend",ElementsObject.DIV6);
    ElementsObject.DIV3.insertAdjacentElement("afterend",ElementsObject.DIV7);
    ElementsObject.DIV4.insertAdjacentElement("afterend",ElementsObject.DIV8);

    ElementsObject.SECTION.appendChild(ElementsObject.DIV5);

    ElementsObject.DIV5.appendChild(ElementsObject.H2);
    ElementsObject.DIV5.appendChild(ElementsObject.P);
    ElementsObject.DIV5.appendChild(ElementsObject.BUTTON);
    /*Setting class attributes*/
    ElementsObject.SECTION.setAttribute("class","section5");
    ElementsObject.IMG.setAttribute("class","family-gathering");
    ElementsObject.DIV.setAttribute("class","section-5-div");
    ElementsObject.DIV2.setAttribute("class","section-5-div2");
    ElementsObject.DIV3.setAttribute("class","section-5-div3");
    ElementsObject.DIV4.setAttribute("class","section-5-div4");
    ElementsObject.DIV5.setAttribute("class","section-5-div5");

    ElementsObject.DIV6.setAttribute("class","Unique-Div-1 div-family-gathering");
    ElementsObject.DIV7.setAttribute("class","Unique-Div-2 div-special-events");
    ElementsObject.DIV8.setAttribute("class","Unique-Div-3 div-social-events");

    ElementsObject.BUTTON.setAttribute("class","section-5-button");
    ElementsObject.H2.setAttribute("class","section-5-h2");
    ElementsObject.P.setAttribute("class","section-5-p")
    
    /*Setting text attributes*/
    ElementsObject.DIV2.textContent = "FAMILY GATHERING";
    ElementsObject.DIV3.textContent = "SPECIAL EVENTS";
    ElementsObject.DIV4.textContent = "SOCIAL EVENTS";
    ElementsObject.BUTTON.textContent = "BOOK A TABLE";
    ElementsObject.H2.textContent = "Family Gathering";
    ElementsObject.P.textContent = "We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We’ll provide a memorable experience for all.";
    RenderSixthSection()
  }


  function RenderSixthSection(){
    const MAIN = document.getElementsByClassName("main");
    const DIV = document.createElement("div");

    /*Elements Created in JS*/
    let ElementsObject = ElementsFactory();

    /*Adding the elements to their parents*/
    MAIN[0].appendChild(ElementsObject.SECTION);
    ElementsObject.SECTION.appendChild(ElementsObject.DIV);
    ElementsObject.SECTION.appendChild(ElementsObject.DIV2);
    ElementsObject.DIV.appendChild(ElementsObject.IMG);
    ElementsObject.DIV.appendChild(ElementsObject.DIV3);
    ElementsObject.DIV.appendChild(ElementsObject.BUTTON);
    ElementsObject.DIV2.appendChild(ElementsObject.DIV4)
    ElementsObject.DIV4.appendChild(ElementsObject.H3);
    ElementsObject.DIV4.appendChild(ElementsObject.DIV5);
    ElementsObject.DIV4.appendChild(ElementsObject.DIV6);

    ElementsObject.DIV5.appendChild(document.createElement("span"));
    ElementsObject.DIV5.appendChild(document.createElement("span"));
    ElementsObject.DIV5.appendChild(document.createElement("span"));

    ElementsObject.DIV6.appendChild(document.createElement("span"));
    ElementsObject.DIV6.appendChild(document.createElement("span"));
    ElementsObject.DIV6.appendChild(document.createElement("span"));
    
    /*Setting class attributes*/
    ElementsObject.SECTION.setAttribute("class","section6");
    ElementsObject.DIV.setAttribute("class","section-6-div");
    ElementsObject.DIV2.setAttribute("class","section-6-div2");
    ElementsObject.DIV3.setAttribute("class","section-6-div3");
    ElementsObject.BUTTON.setAttribute("class","section-6-button");
    ElementsObject.H3.setAttribute("class","section-6-h3");

    ElementsObject.DIV5.setAttribute("class","section-6-div5");
    ElementsObject.DIV6.setAttribute("class","section-6-div6");

    ElementsObject.DIV4.setAttribute("class","section-6-div4");

    ElementsObject.DIV3.textContent = "Ready to make a reservation?"
    ElementsObject.BUTTON.textContent = "BOOK A TABLE"
    ElementsObject.H3.textContent = "dine"
    }
  const ElementsFactory = () => {
    const MAIN = document.createElement("main");
    const SECTION = document.createElement("section");
    const IMG =  document.createElement("img");
    const DIV = document.createElement("div");
    const DIV2 = document.createElement("div");
    const DIV3 = document.createElement("div");
    const DIV4 = document.createElement("div");
    const DIV5 = document.createElement("div");
    const DIV6 = document.createElement("div");
    const DIV7 = document.createElement("div");
    const DIV8 = document.createElement("div");
    const H2 = document.createElement("h2");
    const H3 = document.createElement("h3");
    const P = document.createElement("p");
    const BUTTON = document.createElement("button");
    return {MAIN,SECTION,IMG,DIV,DIV2,DIV3,DIV4,DIV5,DIV6,DIV7,DIV8,H2,H3,P,BUTTON};
}


  return {RenderFirstSection};
})();

export {PAGE}


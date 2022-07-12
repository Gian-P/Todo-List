function title(){
  let title = document.getElementById("CONTENT");
  let h3 = document.createElement("h3");
  h3.className = "hello";
  h3.textContent = "HELLO!";
  title.appendChild(h3);
}

export {title};
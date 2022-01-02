
const body = document.getElementById('body');
const heading = document.createElement('h1');
heading.textContent = "Capsulated";

let connectToMetamaskButton = document.createElement('button');
connectToMetamaskButton.textContent = "Connect to Metamask";
connectToMetamaskButton.setAttribute('class', 'Metamask-button');

body.appendChild(heading);
body.appendChild(connectToMetamaskButton);


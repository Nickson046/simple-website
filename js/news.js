document.addEventListener("DOMContentLoaded", () => {

const container = document.getElementById("newsContainer");

if(!container) return;

const news = JSON.parse(localStorage.getItem("stationNews")) || [];

news.forEach(item => {

const post = document.createElement("div");
post.className = "card";

post.innerHTML = `
<h3>${item.title}</h3>
<p>${item.text}</p>
`;

container.appendChild(post);

});

});
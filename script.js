const API_key="f746af218d76420b9b516291c616d4e2";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("India"));

function reload()
{
    window.location.reload();
}

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_key}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles)
{
    const cardcontainer=document.getElementById("cards-container");
    const newscardcontainer=document.getElementById("template-news-card");
    
    cardcontainer.innerHTML="";
    articles.forEach((article) =>{
        if(!article.urlToImage)return;
        const cardClone=newscardcontainer.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardcontainer.appendChild(cardClone);
    })
}
function fillDataInCard(cardClone,article)
{
    const newsimg=cardClone.querySelector('#news-img');
    const newstitle=cardClone.querySelector('#news-title');
    const newssource=cardClone.querySelector('#news-source');
    const newsdesc=cardClone.querySelector('#news-desc');

    newsimg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newssource.innerHTML=`${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank");
    });
}
let curSelectedNav=null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}
const searchbutton=document.getElementById('search-button');
const searchtext=document.getElementById('search-text');
searchbutton.addEventListener("click", () =>{
    const query=searchtext.value;
    if(!query)
    return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})


// function toggleActiveClass(){
//     const container = document.querySelector("#container");
//     const templateItems = container.querySelectorAll(".card","p");

//     templateItems.forEach((item) => {
//       item.classList.toggle("active");
//     });
// }

// const templateContent = document.querySelector('#template-news-card').content;
// const clonedContent = document.importNode(templateContent, true);

// document.querySelector("#container").appendChild(clonedContent);

const ball=document.querySelector(".toggle-ball");
const items=document.querySelectorAll("main,nav,.card,.card:hover,.nav-links,.toggle");
ball.addEventListener("click",()=>{
    items.forEach((item)=>{
        item.classList.toggle("active")
    });
    ball.classList.toggle("active");
});
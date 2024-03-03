import{S as L,a as m,i as c}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();let $="";function w(s){const o=s.map(({webformatURL:r,largeImageURL:n,tags:e,likes:t,views:a,comments:b,downloads:v})=>`<li class ='gallery-item'>
        <a class="gallery-link" href="${n}">
            <img class="gallery-image"
                src="${r}"
                alt="${e}"
                width="360"
                height="152"/>
        </a>
        <div class='info-block'>
            <div class="info">
                <h3 class = "head-likes">Likes</h3>
                <p>${t}</p>
            </div>
            <div class="info">
                <h3 class = "head-views">Views</h3>
                <p>${a}</p>
            </div>
            <div class="info">
                <h3 class = "head-comments">Comments</h3>
                <p>${b}</p>
            </div>
            <div class="info">
                <h3 class = "head-downloads">Downloads</h3>
                <p>${v}</p>
            </div>
        </div>
    </li>`).join("");p.insertAdjacentHTML("beforeend",o),console.log($),k.refresh()}const k=new L(".gallery-item a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});m.defaults.baseURL="https://pixabay.com/api/";const i={key:"42515741-a33332df4257bc0cfcc74fb38",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:3};async function h(s,o){try{console.log(`${s} + ${o}`),await m.get(`?key=${i.key}&q=${s}&image_type=${i.image_type}&orientation=${i.orientation}&safesearch=${i.safesearch}&per_page=${i.per_page}&page=${o}`).then(r=>{if(!r.statusText==="Ok")throw new Error(r.status);if(r.data.hits.length===0){p.innerHTML="",c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",messageSize:"16",backgroundColor:"red",theme:"dark",position:"topRight"});return}else w(r.data.hits)}).catch(r=>c.error({title:"Error",message:`${r}`,messageColor:"white",messageSize:"16",backgroundColor:"red",theme:"dark",position:"topRight"})).finally(()=>{g.reset()})}catch(r){console.error(r)}}const g=document.querySelector(".form"),S=document.querySelector(".button-search"),l=document.querySelector(".loader"),f=document.querySelector(".button-load-more"),p=document.querySelector(".gallery"),u=1;let d,y;g.addEventListener("submit",q);function q(s){s.preventDefault();const o=s.target.elements.search.value.trim();if(!o){c.warning({title:"Look at me",message:"Ви не ввели що треба шукати",messageColor:"black",messageSize:"16",backgroundColor:"orange",theme:"dark",position:"topRight"});return}S.disabled=!1,h(o,u),y=o,d=u,f.classList.remove("is-hidden")}f.addEventListener("click",P);function P(){l.classList.remove("is-hidden"),d++,h(y,d),l.scrollIntoView(),l.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map

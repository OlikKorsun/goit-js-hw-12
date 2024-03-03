import{S as L,a as p,i as c}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))m(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&m(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function m(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();let l="";function $(o){console.log(o.hits.length),u.innerHTML=null,o.hits.forEach(e=>{l+=`<li class="gallery-item">
         <a class="gallery-link" href="${e.largeImageURL}">
         <img class="gallery-image"
                src="${e.webformatURL}"
                alt="${e.tags}"/> </a>
        <ul class="stat">
          <li class="detals-stat">
           <h2 class="description">Likes</h2>
           <p class="stat-value">${e.likes}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Views</h2>
           <p class="stat-value">${e.views}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Comments</h2>
           <p class="stat-value">${e.comments}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Downloads</h2>
           <p class="stat-value">${e.downloads}</p>
          </li>
        </ul>
        </li>`}),u.insertAdjacentHTML("beforeend",l),console.log(l),w.refresh()}const w=new L(".gallery-item a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});p.defaults.baseURL="https://pixabay.com/api/";const a={key:"42515741-a33332df4257bc0cfcc74fb38",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:3};async function f(o,e){try{console.log(`${o} + ${e}`),await p.get(`?key=${a.key}&q=${o}&image_type=${a.image_type}&orientation=${a.orientation}&safesearch=${a.safesearch}&per_page=${a.per_page}&page=${e}`).then(r=>{if(!r.statusText==="Ok")throw new Error(r.status);if(r.data.hits.length===0){u.innerHTML="",c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",messageSize:"16",backgroundColor:"red",theme:"dark",position:"topRight"});return}else $(r.data)}).catch(r=>c.error({title:"Error",message:`${r}`,messageColor:"white",messageSize:"16",backgroundColor:"red",theme:"dark",position:"topRight"})).finally(()=>{h.reset()})}catch(r){console.error(r)}}const h=document.querySelector(".form"),S=document.querySelector(".button-search"),n=document.querySelector(".loader"),y=document.querySelector(".button-load-more"),u=document.querySelector(".gallery"),g=1;let d,b;h.addEventListener("submit",k);function k(o){o.preventDefault();const e=o.target.elements.search.value.trim();if(!e){c.warning({title:"Look at me",message:"Ви не ввели що треба шукати",messageColor:"black",messageSize:"16",backgroundColor:"orange",theme:"dark",position:"topRight"});return}S.disabled=!1,f(e,g),b=e,d=g,y.classList.remove("is-hidden")}y.addEventListener("click",v);function v(){n.classList.remove("is-hidden"),d++,f(b,d),n.scrollIntoView(),n.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map

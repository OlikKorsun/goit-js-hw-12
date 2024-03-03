import{a as y,S as C,i}from"./assets/vendor-64b55ca9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();y.defaults.baseURL="https://pixabay.com/api/";const c={key:"42515741-a33332df4257bc0cfcc74fb38",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};async function f(a,e){try{return await y.get(`?key=${c.key}&q=${a}&image_type=${c.image_type}&orientation=${c.orientation}&safesearch=${c.safesearch}&per_page=${c.per_page}&page=${e}`)}catch(r){console.error(r)}}const m=document.querySelector(".gallery");function h(a){const e=a.map(({webformatURL:r,largeImageURL:s,tags:t,likes:o,views:n,comments:L,downloads:w})=>`<li class="gallery-item">
         <a class="gallery-link" href="${s}">
         <img class="gallery-image"
                src="${r}"
                alt="${t}"/> </a>
        <ul class="stat">
          <li class="detals-stat">
           <h2 class="description">Likes</h2>
           <p class="stat-value">${o}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Views</h2>
           <p class="stat-value">${n}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Comments</h2>
           <p class="stat-value">${L}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Downloads</h2>
           <p class="stat-value">${w}</p>
          </li>
        </ul>
        </li>`).join("");m.insertAdjacentHTML("beforeend",e),S.refresh()}const S=new C(".gallery-item a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}),b=document.querySelector(".form"),$=document.querySelector(".button-search"),d=document.querySelector(".loader"),l=document.querySelector(".button-load-more"),p=1,k=15;let u,g;b.addEventListener("submit",v);function v(a){a.preventDefault();const e=a.target.elements.search.value.trim();if(e)if(e!==g)m.innerHTML="";else{i.warning({title:"Look at me",message:`Ви зробили запит як і попередній, використовуйте кнопку "Load more" щоб завантажити більше ${g}`,messageColor:"black",messageSize:"16",backgroundColor:"pink",theme:"dark",position:"topRight"});return}else{i.warning({title:"Look at me",message:"Ви не ввели що треба шукати",messageColor:"black",messageSize:"16",backgroundColor:"orange",theme:"dark",position:"topRight"});return}$.disabled=!1,f(e,p).then(s=>{if(!s.statusText==="Ok")throw new Error(s.status);if(s.data.hits.length===0){m.innerHTML="",i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",messageSize:"16",backgroundColor:"red",theme:"dark",position:"topRight"}),l.style.display="none";return}else h(s.data.hits),s.data.totalHits<=k?(l.style.display="none",i.warning({title:"Ups",message:"We're sorry, but you've reached the end of search results",messageColor:"black",messageSize:"16",backgroundColor:"lightblue",theme:"dark",position:"bottomRight"})):l.style.display="block"}).catch(s=>i.error({title:"Error",message:`${s}`,messageColor:"white",messageSize:"16",backgroundColor:"red",theme:"dark",position:"topRight"})).finally(()=>{b.reset()}),g=e,u=p,l.classList.remove("is-hidden")}l.addEventListener("click",P);function P(){d.classList.remove("is-hidden"),d.style.display="block",u++,f(g,u).then(e=>{const r=Math.ceil(e.data.totalHits/k),s=m.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"}),u<r?h(e.data.hits):(h(e.data.hits),l.style.display="none",i.warning({title:"Ups",message:"We're sorry, but you've reached the end of search results",messageColor:"black",messageSize:"16",backgroundColor:"lightgreen",theme:"dark",position:"bottomRight"}))}).catch(e=>i.error({title:"Error",message:`${e}`,messageColor:"white",messageSize:"16",backgroundColor:"red",theme:"dark",position:"topRight"})),l.scrollIntoView({block:"end"}),d.style.display="none",d.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map

(function(){
  function open(){
    if(document.getElementById("discModal"))return;
    var m=document.createElement("div");m.className="disc-scrim";m.id="discModal";
    m.innerHTML='<div class="disc-modal" role="dialog" aria-modal="true" aria-labelledby="discTitle"><div class="disc-head"><h3 id="discTitle">'+window.KITAAK_DISCLAIMER_TITLE+'</h3><button class="disc-x" aria-label="Close">&times;</button></div><div class="disc-body">'+window.KITAAK_DISCLAIMER_HTML+'</div><div class="disc-foot"><button class="btn primary disc-close">Close</button></div></div>';
    document.body.appendChild(m);document.body.style.overflow="hidden";
    function close(){m.remove();document.body.style.overflow="";}
    m.querySelector(".disc-x").onclick=close;m.querySelector(".disc-close").onclick=close;
    m.addEventListener("click",function(e){if(e.target===m)close();});
    document.addEventListener("keydown",function h(e){if(e.key==="Escape"){close();document.removeEventListener("keydown",h);}});
  }
  document.addEventListener("click",function(e){var b=e.target.closest("[data-disclaimer]");if(b){e.preventDefault();open();}});
  var y=document.getElementById("yr");if(y)y.textContent=new Date().getFullYear();
})();

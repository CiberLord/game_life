(function(){

    let win={};
    win._dlgs=new Map();
    win._mask=document.createElement("div");
    win._mask.classList.add("mask");
    // win._mask.display="none";
    win.create=function(id,selector){    
        document.body.append(win._mask);
        win._mask.display="none";
        let elem=document.querySelector(selector);
        elem.classList.add("modal");
        win._dlgs.set(id,elem);
    }

    win.open=function(id){
        win._mask.style.display="block";
        document.body.style.overflow="hidden";
        win._dlgs.get(id).style.display="block";
    }
    win.close=function(id){
        win._mask.style.display="none";
        document.body.style.overflow = "";
        win._dlgs.get(id).style.display="none";
    }


    window.modalWindow=win;
})();



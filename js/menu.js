(function(){

    let menu={};
    menu.start=true;
    menu.starting=0;
    menu.running=1;
    menu.stoping=2;
    menu.editing=3;
    menu.setup_opening=4;

    menu.grid=false;
    menu.bg="rgb(6, 62, 94)";
    menu.gridColor="rgb(211, 11, 11)";
    menu.ceilColor="rgb(250,250,250)";


    menu.edit=document.querySelector("#edit");
    menu.run=document.querySelector("#run");
    menu.step=document.querySelector("#step");
    menu.setup=document.querySelector("#setup");
    menu.clear=document.querySelector("#clear");

    menu.worldSize=document.querySelector("#worldSize");
    menu.cnvSize=document.querySelector("#cnvSize");
    menu.fps=document.querySelector("#fps");
    menu.cancel=document.querySelector("#cancel");
    menu.ok=document.querySelector("#ok");
    menu.grid=document.querySelector("#grid");

    window.Menu=menu;
})();
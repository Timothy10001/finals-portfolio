//global variales

document.addEventListener('mousemove', function(e){
    if(isGameRunning){
        displayCurrentCustomer(waitingQueue[0]);
    }
})


//placeholder for the div being dragged
let beingDragged;

//is game running
let isGameRunning = false;
let isinMainMenu = true;
let isInOrderStation = true;
let isInCookingStation = false;
let isBellTimerActive = false;
let isAlertTimerActive = false;
let isTakeOrderActive = false;
let isCustomerTalking = false;
//audio

const music = document.getElementById('music');
const sfx = document.getElementById('sfx');
const sfx2 = document.getElementById('sfx2');
const sfxAlert = document.getElementById('sfx_alert');
sfxAlert.loop = true;
const pauseMusic = document.getElementById('pauseMusic');

music.volume = 0.8;
sfx.volume = 0.1;
sfx2.volume = 0.3;

//the different station screens
const orderStation = document.getElementById('orderStation');
const prepStation = document.getElementById('prepStation');
const cookingStation = document.getElementById('cookingStation');
const receivingStation = document.getElementById('receivingStation');

//display buttons
const displayPrepStationButton = document.getElementById('display_prep_station_button');
const displayCookingStationButton = document.getElementById('display_cooking_station_button');
const displayOrderStationButton = document.getElementById('display_order_station_button');

//used to disable buttons when important events are happening(when customer is ordering, and customer is rating the order)
function disableButtons(){
    displayCookingStationButton.disabled = true;
    displayPrepStationButton.disabled = true;
    displayOrderStationButton.disabled = true;
}

function enableButtons(){
    displayCookingStationButton.disabled = false;
    displayPrepStationButton.disabled = false;
    displayOrderStationButton.disabled = false;
}



//order sheets
const currentOrder = document.querySelectorAll('.current_order');

currentOrder[0].addEventListener('dragstart', function(e){
    beingDragged = e.target
})


//notes on top of page
const note = document.querySelector('.note');

//TRASH BIN
const trash = document.querySelectorAll('.trash');
trash.forEach(trashBin => {
    trashBin.addEventListener('drop', function(e){
        //removes trash highlight
        e.target.classList.remove('trash_highlight');
        sfx2.src = "assets/sfx/trash.wav";
        sfx2.loop = false;
        sfx2.play();

        //trash raw meat

        for(let i = 0; i < rawMeat.length; i++){
            if(beingDragged === rawMeat[i] && e.target === trashBin){
                cash -= 20;
                note.textContent = "You have thrown meat to the trash.";
            }
        }

        for(let i = 0; i < sauce.length; i++){
            if(beingDragged === sauce[i] && e.target === trashBin){
                cash -= 3;
                note.textContent = "You have thrown sauce to the trash.";
            }
        }

        for(let i = 0; i < drinks.length; i++){
            if(beingDragged === drinks[i] && e.target === trashBin){
                cash -= 3;
                note.textContent = "You have thrown a drink to the trash.";
            }
        }
        for(let i = 0; i < sides.length; i++){
            if(beingDragged === sides[i] && e.target === trashBin){
                cash -= 3;
                note.textContent = "You have thrown a side dish to the trash.";
            }
        }
        
        //trash meat coming from grill
        for(let i = 0; i < grill.length; i++){
            if(beingDragged === grill[i].target && e.target === trashBin){
                cash -= 20;
                note.textContent = "You have thrown meat to the trash.";
                grill[i].stopCooking();
                grill.splice(i, 1);
            }
            for(let j = 0; j < grillTarget.length; j++){
                if(beingDragged === grillTarget[j]){
                    isGrillOccupied[j] = false;
                    if(!(isGrillOccupied[j])){
                        grillHandler[j].src = "";
                        progressBar[j].style.display = "none";
                        grillTarget[j].setAttribute("draggable", false);
                    }
                }
            }
        }
        //trash meat coming from cooked tray
        for(let i = 0; i < cookedTray.length; i++){
            if(beingDragged === cookedTray[i].target && e.target === trashBin){
                cash -= 20;
                note.textContent = "You have thrown meat to the trash.";
                cookedTray.splice(i, 1);
                for(let j = 0; j < cookedMeat.length; j++){
                    if(beingDragged === cookedMeat[j]){
                        isMeatOccupied[j] = false;
                        isPrepMeatOccupied[j] = false;
                        if(!(isMeatOccupied[j])){
                            prepMeatHandler[j].src = "";
                            prepMeat[j].style.display = "none";
                            prepMeat[j].setAttribute("draggable", false);
                            cookedMeatHandler[j].src = "";
                            cookedMeat[j].style.display = "none";
                            cookedMeat[j].setAttribute("draggable", false);
                        }
                    }
                }
            }
        }
        //trash meat coming from cooked tray in prep station
        for(let i = 0; i < cookedTray.length; i++){
            if (beingDragged === prepMeat[0] && e.target === trashBin && cookedTray[i].name === "brisket"){
                cash -= 20;
                note.textContent = "You have thrown meat to the trash.";
                cookedTray.splice(i, 1);
                isMeatOccupied[0] = false;
                isPrepMeatOccupied[0] = false;
                prepMeatHandler[0].src = "";
                prepMeat[0].setAttribute('draggable', false);
                cookedMeatHandler[0].src = "";
                cookedMeat[0].style.display = "none";
                cookedMeat[0]. setAttribute('draggable', false);
            }
            else if (beingDragged === prepMeat[1] && e.target === trashBin && cookedTray[i].name === "sausage"){
                cash -= 20;
                note.textContent = "You have thrown meat to the trash.";
                cookedTray.splice(i, 1);
                isMeatOccupied[1] = false;
                isPrepMeatOccupied[1] = false;
                prepMeatHandler[1].src = "";
                prepMeat[1].setAttribute('draggable', false);
                cookedMeatHandler[1].src = "";
                cookedMeat[1].style.display = "none";
                cookedMeat[1]. setAttribute('draggable', false);
            }
            else if (beingDragged === prepMeat[2] && e.target === trashBin && cookedTray[i].name === "ribs"){
                cash -= 20;
                note.textContent = "You have thrown meat to the trash.";
                cookedTray.splice(i, 1);
                isMeatOccupied[2] = false;
                isPrepMeatOccupied[2] = false;
                prepMeatHandler[2].src = "";
                prepMeat[2].setAttribute('draggable', false);
                cookedMeatHandler[2].src = "";
                cookedMeat[2].style.display = "none";
                cookedMeat[2]. setAttribute('draggable', false);
            }
        }
        
        //trash sauce from assembled sauce
        for(let i = 0; i < assembledSauce.length; i++){
            if (beingDragged === assembledSauce[i] && e.target === trashBin){
                cash -= 3;
                note.textContent = "You have thrown sauce to the trash.";
                for (let j = 0; j < assembledContent.sauce.name.length; j++){
                    if(assembledContent.sauce.name.length == 2){
                        assembledContent.sauce.name.splice(i, 1);
                    }
                    else{
                        assembledContent.sauce.name.splice(0, 1);
                    }
                }
                
                isSauceOccupied[i] = false;
                if(!(isSauceOccupied[i])){
                    sauceHandler[i].src = "";
                    assembledSauce[i].setAttribute('draggable', false);
                }
            }
        }

        //trash drink from assembled drink
        for(let i = 0; i < assembledDrink.length; i++){
            if (beingDragged === assembledDrink[i] && e.target === trashBin){
                cash -= 3;
                note.textContent = "You have thrown a drink to the trash.";
                for (let j = 0; j < assembledContent.drinks.name.length; j++){
                    if(assembledContent.drinks.name.length == 2){
                        assembledContent.drinks.name.splice(i, 1);
                    }
                    else{
                        assembledContent.drinks.name.splice(0, 1);
                    }
                }
                
                isDrinksOccupied[i] = false;
                if(!(isDrinksOccupied[i])){
                    drinkHandler[i].src = "";
                    assembledDrink[i].setAttribute('draggable', false);
                }
            }
        }

        //trash sides from assembled sides
        if(beingDragged === assembledSides[0] && e.target === trashBin){
            cash -= 3;
            note.textContent = "You have thrown a side dish to the trash.";
            assembledContent.sides.name.length = 0;
            isSidesOccupied = false;
            sidesHandler[0].src = "";
            sidesHandler[1].src = "";
            assembledSides[0].setAttribute('draggable', false);
        }

        //trash meat from plate
        if(beingDragged === plate && e.target === trashBin){
            cash -= 20;
            note.textContent = "You have thrown meat to the trash.";
            isPlateOccupied = false;
            //delete assembledContent.meat;
            assembledContent.meat.name.length = 0;
            assembledContent.meat.type.length = 0;
            assembledContent.meat.obj.length = 0;
            plateHandler[0].src = "";
            plateHandler[1].src = "";
        }


        checkGrillSound();
        cashCounter[0].textContent = "Cash: $" + cash;

    }),
    trashBin.addEventListener('dragover', function(e){
        e.preventDefault();
    })
    trashBin.addEventListener('dragenter', function(e){
        e.target.classList.add('trash_highlight');
    })
    trashBin.addEventListener('dragleave', function(e){
        e.target.classList.remove('trash_highlight');
    })
})

//END OF TRASH BIN


//GRILL STATION

//MEAT SOURCE IMAGES
const meatImg = [
    {
        name: "sausage",
        src: "assets/obj/meat/raw/sausage.png",
        type: "raw"
    },
    {
        name: "ribs",
        src: "assets/obj/meat/raw/ribs.png",
        type: "raw"
    },
    {
        name: "brisket",
        src: "assets/obj/meat/raw/brisket.png",
        type: "raw"
    },
    {
        name: "sausage",
        src: "assets/obj/meat/half-cooked/sausage.png",
        type: "half-cooked"
    },
    {
        name: "ribs",
        src: "assets/obj/meat/half-cooked/ribs.png",
        type: "half-cooked"
    },
    {
        name: "brisket",
        src: "assets/obj/meat/half-cooked/brisket.png",
        type: "half-cooked"
    },
    {
        name: "sausage",
        src: "assets/obj/meat/cooked/sausage.png",
        type: "cooked"
    },
    {
        name: "ribs",
        src: "assets/obj/meat/cooked/ribs.png",
        type: "cooked"
    },
    {
        name: "brisket",
        src: "assets/obj/meat/cooked/brisket.png",
        type: "cooked"
    },
    {
        name: "sausage",
        src: "assets/obj/meat/burnt/sausage.png",
        type: "burnt"
    },
    {
        name: "ribs",
        src: "assets/obj/meat/burnt/ribs.png",
        type: "burnt"
    },
    {
        name: "brisket",
        src: "assets/obj/meat/burnt/brisket.png",
        type: "burnt"
    }

]

//END OF MEAT SOURCE IMAGES

//SEARCH SOURCE IMAGE
function search(name, type, array){
    for (let i = 0; i < array.length; i++){
        if (array[i].name === name && array[i].type === type){
            return array[i].src;
        }
    }
}
//END OF SEARCH SOURCE IMAGE


//MEAT CLASS
class Meat{
    //meat has name, type(if raw, half-cooked, or cooked), img for handler, target where it is located, time cooked, the progress bar on top of grill, and the gray progress bar
    constructor(name, type, img, target, timeCooked, progressBar, gray){
        this.name = name;
        this.type = type;
        this.img = img;
        this.target = target;
        this.timeCooked = timeCooked;
        this.timer = null;
        this.progressBar = progressBar;
        this.gray = gray;
    }
    //adds onto timeCooked
    cook(){
        //since the meat is burnt at 17 seconds, the progress bar is set to max at 17 seconds
        this.gray.style.transform = "translateX(" + ((this.timeCooked/17) * 100) + "%)";
        this.timer = setInterval(() => {
            //this timer starts and adds to timeCooked per second
            this.timeCooked++;
            console.log(this.timeCooked);
            if (this.timeCooked > 7 && this.type === "raw"){
                //calls update meat from raw to half-cooked at 7 seconds
                this.updateMeat(this.name, "half-cooked", this.img);
            }
            else if(this.timeCooked > 12 && this.type === "half-cooked"){
                //update from half-cooked to cooked at 12s
                this.updateMeat(this.name, "cooked", this.img);
            }
            else if(this.timeCooked > 17 && this.type === "cooked"){
                //update from cooked to burnt at 17s
                this.updateMeat(this.name, "burnt", this.img);
                notify();
                clearInterval(this.timer);
            }
            else if(this.type === "burnt"){
                //does nothing when burnt
                clearInterval(this.timer);
            }

            this.gray.style.transform = "translateX(" + ((this.timeCooked/17) * 100) + "%)";
            
        }, 1000);
        
    }
    //updates depending on timeCooked
    updateMeat(name, type, img){
        //updates image source
        let meatHandler = search(name, type, meatImg);
        return img.src = meatHandler, this.type = type;
    }
    //clears the timer
    stopCooking(){
        clearInterval(this.timer);
    }
}
//END OF MEAT CLASS

//MEAT DRAGGABLES
//prep station cooked meat
const prepMeat = document.querySelectorAll(".meat");
prepMeat.forEach(prepMeats => {
    prepMeats.addEventListener('dragstart', function(e){
        beingDragged = e.target;
    }),
    prepMeats.addEventListener('dragover', function(e){
        e.preventDefault();
    })
})
//end of prep station cooked meat
//grill station cooked meat
const cookedMeat = document.querySelectorAll(".cooked_meat");
cookedMeat.forEach(cookedMeats => {
    cookedMeats.addEventListener('dragstart', function(e){
        beingDragged = e.target;
    }),
    cookedMeats.addEventListener('dragover', function(e){
        e.preventDefault();
    })
})
//end of grill station cooked meat

//raw meat
const rawMeat = document.querySelectorAll(".raw_meat");
rawMeat.forEach(rawMeats => {
    rawMeats.addEventListener('dragstart', function(e){
        beingDragged = e.target;
    })
})
//end of raw meat

//cooked tray array
const cookedTray = [];

//image handlers for cooked tray
const cookedMeatHandler = document.querySelectorAll('.cooked_meat_handler');
const prepMeatHandler = document.querySelectorAll('.prep_meat_handler');

//for occupied checkers in cooked tray
let isPrepMeatOccupied = Array.from(prepMeat).fill(false);
let isMeatOccupied = Array.from(cookedMeat).fill(false);

//cooked tray in grill station droppable
const cookedMeatTray = document.getElementById('cookedMeat');
cookedMeatTray.addEventListener('drop', function(e){
    
    //meat coming from grill dropped into cooked tray
    for (let i = 0; i < grill.length; i++){
        if(grill[i].target === beingDragged){
            if((grill[i].name === "brisket" && !(isMeatOccupied[0])) ||  (grill[i].name === "sausage" && !(isMeatOccupied[1])) || (grill[i].name === "ribs" && !(isMeatOccupied[2]))){
                //stop cooking and remove data from grill to cooked tray
                grill[i].stopCooking();
                cookedTray.push(grill[i]);
                grill.splice(i, 1);
                for (let j = 0; j < grillTarget.length; j++){
                    if(beingDragged === grillTarget[j]){
                        //disable the grill that the meat came from
                        isGrillOccupied[j] = false;
                        grillTarget[j].setAttribute('draggable', false);
                        grillHandler[j].src = "";
                        progressBar[j].style.display = "none";
                    }
                }
                for(let k = 0; k < cookedTray.length; k++){
                    //enable the cooked tray and prep meat spot depending on the name of the meat
                    if(cookedTray[k].name === 'brisket'){
                        cookedTray[k].img = cookedMeatHandler[0];
                        cookedTray[k].target = cookedMeat[0];
                        isMeatOccupied[0] = true;
                        isPrepMeatOccupied[0] = true;
                        let cookedHandler = search(cookedTray[k].name, cookedTray[k].type, meatImg);
                        cookedMeatHandler[0].src = cookedHandler;
                        prepMeatHandler[0].src = cookedHandler;
                        prepMeat[0].style.display = "block";
                        prepMeat[0].setAttribute('draggable', true);
                        cookedMeat[0].style.display = "block";
                        cookedMeat[0].setAttribute('draggable', true);
                    }
                    else if(cookedTray[k].name === 'sausage'){
                        cookedTray[k].img = cookedMeatHandler[1];
                        cookedTray[k].target = cookedMeat[1];
                        isMeatOccupied[1] = true;
                        isPrepMeatOccupied[1] = true;
                        let cookedHandler = search(cookedTray[k].name, cookedTray[k].type, meatImg);
                        cookedMeatHandler[1].src = cookedHandler;
                        prepMeatHandler[1].src = cookedHandler;
                        prepMeat[1].style.display = "block";
                        prepMeat[1].setAttribute('draggable', true);
                        cookedMeat[1].style.display = "block";
                        cookedMeat[1].setAttribute('draggable', true);
                    }
                    else if(cookedTray[k].name === 'ribs'){
                        cookedTray[k].img = cookedMeatHandler[2];
                        cookedTray[k].target = cookedMeat[2];
                        isMeatOccupied[2] = true;
                        isPrepMeatOccupied[2] = true;
                        let cookedHandler = search(cookedTray[k].name, cookedTray[k].type, meatImg);
                        cookedMeatHandler[2].src = cookedHandler;
                        prepMeatHandler[2].src = cookedHandler;
                        prepMeat[2].style.display = "block";
                        prepMeat[2].setAttribute('draggable', true);
                        cookedMeat[2].style.display = "block";
                        cookedMeat[2].setAttribute('draggable', true);
                    }
                }
            }
            else{
                //display this text since only one meat is allowed in a spot
                note.textContent = "This type of meat is occupied.";
            }
        }
    }

    checkGrillSound();

})
cookedMeatTray.addEventListener('dragover', function(e){
    e.preventDefault();
})

//end of cooked tray grill station droppable


//meat on grill array
const grill = [];

//image handler for grill
const grillHandler = document.querySelectorAll(".grill_handler");
const grillTarget = document.querySelectorAll(".grill_target");

//for grill occupied checker
let isGrillOccupied = Array.from(grillTarget).fill(false);
//image handler for general stuff
let meatHandler;

//progress bar
const progressBar = document.querySelectorAll(".progress_bar");
const gray = document.querySelectorAll(".gray");
/*
    function cookProgress(beingCooked){
    beingCooked.style.transform = "translateX"
}
*/


//grill droppables
grillTarget.forEach(grillTargetBox =>{
    grillTargetBox.addEventListener('drop', function(e){
        e.target.classList.remove('highlight');
        
        //coming from raw meat to grill
        for(let i = 0; i < grillTarget.length; i++){
            //add new meat into grill, put img onto grill, and create new Meat obj, then cook
            if(beingDragged === rawMeat[0] && e.target === grillTarget[i] && !(isGrillOccupied[i])){
                isGrillOccupied[i] = true;
                meatHandler = search("brisket", "raw", meatImg);
                grillHandler[i].src = meatHandler;
                progressBar[i].style.display = "block";

                let beingCooked = new Meat("brisket", "raw", grillHandler[i], e.target, 0, progressBar[i], gray[i]);
                beingCooked.cook();
                grill.push(beingCooked);

                grillTarget[i].setAttribute('draggable', true);
            }

            else if(beingDragged === rawMeat[1] && e.target === grillTarget[i] && !(isGrillOccupied[i])){
                isGrillOccupied[i] = true;
                meatHandler = search("sausage", "raw", meatImg);
                grillHandler[i].src = meatHandler;
                progressBar[i].style.display = "block";

                let beingCooked = new Meat("sausage", "raw", grillHandler[i], e.target, 0, progressBar[i], gray[i]);
                beingCooked.cook();
                grill.push(beingCooked);

                grillTarget[i].setAttribute('draggable', true);
            }

            else if(beingDragged === rawMeat[2] && e.target === grillTarget[i] && !(isGrillOccupied[i])){
                isGrillOccupied[i] = true;
                meatHandler = search("ribs", "raw", meatImg);
                grillHandler[i].src = meatHandler;
                progressBar[i].style.display = "block";    

                let beingCooked = new Meat("ribs", "raw", grillHandler[i], e.target, 0, progressBar[i], gray[i]);
                beingCooked.cook();
                grill.push(beingCooked);
                grillTarget[i].setAttribute('draggable', true);
            }

            else if(e.target === grillTarget[i] && isGrillOccupied[i]){
                note.textContent = "This spot is occupied.";
            }
        }
        
        //from grill to another grill target

        for (let i = 0; i < grillTarget.length; i++){
            for (let j = 0; j < grillTarget.length; j++){
                for (let k = 0; k < grill.length; k++){
                    if(grillTarget[i] === beingDragged && grillTarget[j] === e.target && !(isGrillOccupied[j]) && grill[k].target === grillTarget[i]){
                        //remove meat data from grill and places the meat onto the new grill target
                        grill[k].stopCooking();
                        grill.push(new Meat(grill[k].name, grill[k].type, grillHandler[j], grillTarget[j], grill[k].timeCooked, progressBar[j], gray[j]));
                        grill.splice(k, 1);
                        isGrillOccupied[i] = false;
                        grillHandler[i].src = "";
                        progressBar[i].style.display = "none";
                        grillTarget[i].setAttribute('draggable', false);
                        for (let l = 0; l < grill.length; l++){
                            //shows meat onto the new grill target
                            if(grill[l].target === grillTarget[j] && grill[l].name === "brisket"){
                                grill[l].cook();
                                isGrillOccupied[j] = true;
                                grillTarget[j].setAttribute('draggable', true);
                                let meatHandler = search(grill[l].name, grill[l].type, meatImg);
                                grillHandler[j].src = meatHandler;
                                progressBar[j].style.display = "block";
                            }
                            else if(grill[l].target === grillTarget[j] && grill[l].name === "sausage"){
                                grill[l].cook();
                                isGrillOccupied[j] = true;
                                grillTarget[j].setAttribute('draggable', true);
                                let meatHandler = search(grill[l].name, grill[l].type, meatImg);
                                grillHandler[j].src = meatHandler;
                                progressBar[j].style.display = "block";
                            }
                            else if(grill[l].target === grillTarget[j] && grill[l].name === "ribs"){
                                grill[l].cook();
                                isGrillOccupied[j] = true;
                                grillTarget[j].setAttribute('draggable', true);
                                let meatHandler = search(grill[l].name, grill[l].type, meatImg);
                                grillHandler[j].src = meatHandler;
                                progressBar[j].style.display = "block";
                            }
                        }
                    }
                }
            }
        }


        //from cooked tray to grill
        for(let i = 0; i < cookedMeat.length; i++){
            for(let j = 0; j < grillTarget.length; j++){
                for(let k = 0; k < cookedTray.length; k++){
                    if(cookedMeat[i] === beingDragged && grillTarget[j] === e.target && !(isGrillOccupied[j]) && cookedTray[k].target === cookedMeat[i]){
                        //remove meat data from cooked tray and prep meat and place it on grill
                        grill.push(new Meat(cookedTray[k].name, cookedTray[k].type, grillHandler[j], grillTarget[j], cookedTray[k].timeCooked, progressBar[j], gray[j]));
                        cookedTray.splice(k, 1);
                        isMeatOccupied[i] = false;
                        isPrepMeatOccupied[i] = false;
                        cookedMeatHandler[i].src = "";
                        cookedMeat[i].style.display = "none";
                        prepMeatHandler[i].src = "";
                        prepMeat[i].style.display = "none";
                        cookedMeat[i].setAttribute('draggable', false);
                        prepMeat[i].setAttribute('draggable', false);
                        for(let l = 0; l < grill.length; l++){
                            //show meat that was dragged onto grill target
                            if(grill[l].target === grillTarget[j] && grill[l].name === "brisket"){
                                grill[l].cook();
                                isGrillOccupied[j] = true;
                                grillTarget[j].setAttribute('draggable', true);
                                let meatHandler = search(grill[l].name, grill[l].type, meatImg);
                                grillHandler[j].src = meatHandler;
                                progressBar[j].style.display = "block";
                            }
                            else if(grill[l].target === grillTarget[j] && grill[l].name === "sausage"){
                                grill[l].cook();
                                isGrillOccupied[j] = true;
                                grillTarget[j].setAttribute('draggable', true);
                                let meatHandler = search(grill[l].name, grill[l].type, meatImg);
                                grillHandler[j].src = meatHandler;
                                progressBar[j].style.display = "block";
                            }
                            else if(grill[l].target === grillTarget[j] && grill[l].name === "ribs"){
                                grill[l].cook();
                                isGrillOccupied[j] = true;
                                grillTarget[j].setAttribute('draggable', true);
                                let meatHandler = search(grill[l].name, grill[l].type, meatImg);
                                grillHandler[j].src = meatHandler;
                                progressBar[j].style.display = "block";
                            }
                        }
                    }
                } 
            }
        }

        checkGrillSound();


    }),

    grillTargetBox.addEventListener('dragover', function(e){
        e.preventDefault();
    }),
    grillTargetBox.addEventListener('dragenter', function(e){
        e.target.classList.add('highlight');
    }),
    grillTargetBox.addEventListener('dragleave', function(e){
        e.target.classList.remove('highlight');
    })
    grillTargetBox.addEventListener('dragstart', function(e){
        beingDragged = e.target;
    })

})

//play sound for grill
function checkGrillSound(){
    let isCooking = booleanArrayChecker(isGrillOccupied);
    if(isCooking && isInCookingStation){
        sfx.src = "assets/sfx/cook.wav";
        sfx.loop = true;
        sfx.play();
    }
    else{
        sfx.src = "";
    }
}

//checks arrays of booleans (for grill, plate, and add ons)
function booleanArrayChecker(array){
    for(let i = 0; i < array.length; i++){
        if(array[i] === true){
            return true;
        }
    }
    return false;
}

//end of grill droppables


//END OF GRILL STATION



//PREP STATION

//SOURCE IMAGES OF OTHER INGREDIENTS
const sauceImg = [
    {
        name: "bbq sauce",
        type: "sauce",
        src: "assets/obj/ingredients/bbq-sauce.png"
    },
    {
        name: "hot sauce",
        type: "sauce",
        src: "assets/obj/ingredients/hot-sauce.png"
    },
    {
        name: "ranch",
        type: "sauce",
        src: "assets/obj/ingredients/ranch.png",
    },
    {
        name: "butter sauce",
        type: "sauce",
        src: "assets/obj/ingredients/butter-sauce.png"
    }
]

const drinkImg = [
    {
        name: "whiskey",
        type: "drink",
        src: "assets/obj/drinks/whiskey.png"
    },
    {
        name: "beer",
        type: "drink",
        src: "assets/obj/drinks/beer.png"
    },
    {
        name: "wine",
        type: "drink",
        src: "assets/obj/drinks/wine.png"
    }
]

const sidesImg = [
    {
        name: "beans",
        type: "sides",
        src: "assets/obj/sides/beans.png"
    },
    {
        name: "guacamole",
        type: "sides",
        src: "assets/obj/sides/guacamole.png"
    },
    {
        name: "potato salad",
        type: "sides",
        src: "assets/obj/sides/potato-salad.png"
    }
]

//END OF SOURCE IMAGES OF OTHER INGREDIENTS

//prep station cooked tray droppables
const prepMeatTray = document.getElementById('meatTray');
prepMeatTray.addEventListener('drop', function(e){
    e.target.classList.remove('highlight');
    //coming from plate back to cooked tray
    console.log(beingDragged);
    if(plate === beingDragged && assembledContent.meat.name[0] === "brisket" && !(isMeatOccupied[0])){
        //if brisket was dragged from the plate, remove data from plate and put it back onto the prep tray and cooked tray
        isPlateOccupied = false;
        isMeatOccupied[0] = true;
        isPrepMeatOccupied[0] = true;
        cookedTray.push(assembledContent.meat.obj[0]);
        plateHandler[0].src = "";
        plateHandler[1].src = "";
        plate.setAttribute('draggable', false);
        let handler = search(assembledContent.meat.name[0], assembledContent.meat.type[0], meatImg);
        prepMeatHandler[0].src = handler;
        cookedMeatHandler[0].src = handler;
        prepMeat[0].setAttribute('draggable', true);
        cookedMeat[0].setAttribute('draggable', true);
        prepMeat[0].style.display = "block";
        cookedMeat[0].style.display = "block";
        assembledContent.meat.name.length = 0;
        assembledContent.meat.type.length = 0;
        assembledContent.meat.obj.length = 0;
    }
    else if(plate === beingDragged && assembledContent.meat.name[0] === "sausage" && !(isMeatOccupied[1])){
        isPlateOccupied = false;
        isMeatOccupied[1] = true;
        isPrepMeatOccupied[1] = true;
        cookedTray.push(assembledContent.meat.obj[0]);
        plateHandler[0].src = "";
        plateHandler[1].src = "";
        plate.setAttribute('draggable', false);
        let handler = search(assembledContent.meat.name[0], assembledContent.meat.type[0], meatImg);
        prepMeatHandler[1].src = handler;
        cookedMeatHandler[1].src = handler;
        prepMeat[1].setAttribute('draggable', true);
        cookedMeat[1].setAttribute('draggable', true);
        prepMeat[1].style.display = "block";
        cookedMeat[1].style.display = "block";
        assembledContent.meat.name.length = 0;
        assembledContent.meat.type.length = 0;
        assembledContent.meat.obj.length = 0;
    }
    else if(plate === beingDragged && assembledContent.meat.name[0] === "ribs" && !(isMeatOccupied[2])){
        isPlateOccupied = false;
        isMeatOccupied[2] = true;
        isPrepMeatOccupied[2] = true;
        cookedTray.push(assembledContent.meat.obj[0]);
        plateHandler[0].src = "";
        plateHandler[1].src = "";
        plate.setAttribute('draggable', false);
        let handler = search(assembledContent.meat.name[0], assembledContent.meat.type[0], meatImg);
        prepMeatHandler[2].src = handler;
        cookedMeatHandler[2].src = handler;
        prepMeat[2].setAttribute('draggable', true);
        cookedMeat[2].setAttribute('draggable', true);
        prepMeat[2].style.display = "block";
        cookedMeat[2].style.display = "block";
        assembledContent.meat.name.length = 0;
        assembledContent.meat.type.length = 0;
        assembledContent.meat.obj.length = 0;
    }
    else{
        note.textContent = "This type of meat is occupied.";
    }

})
prepMeatTray.addEventListener('dragover', function(e){
    e.preventDefault();
})
prepMeatTray.addEventListener('dragenter', function(e){
    e.target.classList.add('highlight');
})
prepMeatTray.addEventListener('dragleave', function(e){
    e.target.classList.remove('highlight');
})
//end of prep station cooked tray droppables


//ingredient draggables
const assembledSauce = document.querySelectorAll('.assembled_sauce');
assembledSauce.forEach(assembledSauces => {
    assembledSauces.addEventListener('dragstart', function(e){
        beingDragged = e.target
    })
    assembledSauces.addEventListener('dragover', function(e){
        e.preventDefault();
    })
    assembledSauces.addEventListener('drop', function(e){
        assembled.classList.remove('highlight');
        dropToAssembled(e, assembledSauces);
    })
})

//sauce draggables

const sauceHandler = document.querySelectorAll('.sauce_handler');

const sauce = document.querySelectorAll('.sauce');
let isSauceOccupied = Array.from(assembledSauce).fill(false);

sauce.forEach(sauces => {
    sauces.addEventListener('dragstart', function(e){
        beingDragged = e.target;
        })
    }
)

//sides draggables

const assembledSides = document.querySelectorAll('.assembled_sides');

assembledSides.forEach(assembledSide => {
    assembledSide.addEventListener('dragstart', function(e){
        beingDragged = e.target;
    })
    assembledSide.addEventListener('dragover', function(e){
        e.preventDefault();
    })
    assembledSide.addEventListener('drop', function(e){
        dropToAssembled(e, assembledSide);
        assembled.classList.remove('highlight');
    })
})



const sidesHandler = document.querySelectorAll('.sides_handler');
const sides = document.querySelectorAll('.sides')
let isSidesOccupied = false;

sides.forEach(side=> {
    side.addEventListener('dragstart', function(e){
        beingDragged = e.target;
    })
})


//drinks draggables
const assembledDrink = document.querySelectorAll('.assembled_drink');

assembledDrink.forEach(assembledDrinks => {
    assembledDrinks.addEventListener('dragstart', function(e){
        beingDragged = e.target;
    })
    assembledDrinks.addEventListener('dragover', function(e){
        e.preventDefault();
    })
    assembledDrinks.addEventListener('drop', function(e){
        dropToAssembled(e, assembledDrinks);
        assembled.classList.remove('highlight');
    })
})

const drinks = document.querySelectorAll('.drinks');
const drinkHandler = document.querySelectorAll('.drink_handler');
let isDrinksOccupied = Array.from(drinks).fill(false);

drinks.forEach(drink => {
    drink.addEventListener('dragstart', function(e){
        beingDragged = e.target;
    })
})
//end of ingredient draggables

const assembled = document.getElementById('assembled');
const plateImg = document.getElementById("plate-img");

//assembled content where the order will be compared to
var assembledContent = {
    //1  
    meat: {
        name: [],
        type: [],
        obj: []
    },

    //2
    sauce: {
        name: []
    },
    sides: {
        name: []
    },
    drinks: {
        name: []
    }

};

//clears assembled content when customer takes their food
function clearAssembledContent(){
    assembledContent = {
        //1  
        meat: {
            name: [],
            type: [],
            obj: []
        },
    
        //2
        sauce: {
            name: []
        },
        sides: {
            name: []
        },
        drinks: {
            name: []
        }
    
    };
    //clear assembled sauce
    for(let i = 0; i < assembledSauce.length; i++){
        isSauceOccupied[i] = false;
        sauceHandler[i].src = "";
        assembledSauce[i].setAttribute('draggable', false);
    }
    
    //clear assembled drink
    for(let i = 0; i < assembledDrink.length; i++){
        isDrinksOccupied[i] = false;
        drinkHandler[i].src = "";
        assembledDrink[i].setAttribute('draggable', false);
    }
    
    //clear assembled sides
    for(let i = 0; i < assembledSides.length; i++){
        isSidesOccupied = false;
        sidesHandler[i].src = "";
        assembledSides[0].setAttribute('draggable', false);
    }
    


    //clear plate
    for(let i = 0; i < plateHandler.length; i++){
        isPlateOccupied = false;
        plateHandler[i].src = "";
        plate.setAttribute('draggable', false);
    }
    

}

//plate draggables
const plate = document.getElementById('plate');


plate.addEventListener('dragstart', function(e){
    beingDragged = e.target;
})
plate.addEventListener('dragover', function(e){
    e.preventDefault();
})
plate.addEventListener('drop', function(e){
    dropToAssembled(e, plate);
    assembled.classList.remove('highlight');
})

//end of plate draggables

const plateHandler = document.querySelectorAll('.plate_handler');
let isPlateOccupied = false;

//assembly droppables
assembled.addEventListener('drop', function(e){
    e.target.classList.remove('highlight');
    //assembled
    dropToAssembled(e, assembled);

})
assembled.addEventListener('dragover', function(e){
    e.preventDefault();
})
assembled.addEventListener('dragenter', function(e){
    assembled.classList.add('highlight');
})
assembled.addEventListener('dragend', function(e){
    assembled.classList.remove('highlight');
})
//end of assembly droppables



//drop function in assembly

function dropToAssembled(e, target){
    //if meat was being dragged, add data to plate
    for(let i = 0; i < cookedTray.length; i++){
        if(prepMeat[0] === beingDragged && cookedTray[i].name === "brisket" && (e.target === target || e.target === plate) && !(isPlateOccupied)){
            isPlateOccupied = true;
            assembledContent.meat.name.push(cookedTray[i].name);
            assembledContent.meat.type.push(cookedTray[i].type);
            assembledContent.meat.obj.push(cookedTray[i]);
            plate.setAttribute('draggable', true);
            let handler = search("brisket", cookedTray[i].type, meatImg);
            plateHandler[0].src = handler;
            plateHandler[1].src = handler;
            cookedTray.splice(i, 1);
            cookedMeat[0].setAttribute('draggable', false);
            cookedMeat[0].style.display = "none";
            prepMeat[0].setAttribute('draggable', false);
            prepMeat[0].style.display = "none";
            isMeatOccupied[0] = false;
            isPrepMeatOccupied[0] = false;
            cookedMeatHandler[0].src = "";
            prepMeatHandler[0].src = "";
        }
        else if(prepMeat[1] === beingDragged && cookedTray[i].name === "sausage" && (e.target === target || e.target === plate) && !(isPlateOccupied)){
            isPlateOccupied = true;
            assembledContent.meat.name.push(cookedTray[i].name);
            assembledContent.meat.type.push(cookedTray[i].type);
            assembledContent.meat.obj.push(cookedTray[i]);
            plate.setAttribute('draggable', true);
            let handler = search("sausage", cookedTray[i].type, meatImg);
            plateHandler[0].src = handler;
            plateHandler[1].src = handler;
            cookedTray.splice(i, 1);
            cookedMeat[1].setAttribute('draggable', false);
            cookedMeat[1].style.display = "none";
            prepMeat[1].setAttribute('draggable', false);
            prepMeat[1].style.display = "none";
            isMeatOccupied[1] = false;
            isPrepMeatOccupied[1] = false;
            cookedMeatHandler[1].src = "";
            prepMeatHandler[1].src = "";
        }
        else if(prepMeat[2] === beingDragged && cookedTray[i].name === "ribs" && (e.target === target || e.target === plate) && !(isPlateOccupied)){
            isPlateOccupied = true;
            assembledContent.meat.name.push(cookedTray[i].name);
            assembledContent.meat.type.push(cookedTray[i].type);
            assembledContent.meat.obj.push(cookedTray[i]);
            plate.setAttribute('draggable', true);
            let handler = search("ribs", cookedTray[i].type, meatImg);
            plateHandler[0].src = handler;
            plateHandler[1].src = handler;
            cookedTray.splice(i, 1);
            cookedMeat[2].setAttribute('draggable', false);
            cookedMeat[2].style.display = "none";
            prepMeat[2].setAttribute('draggable', false);
            prepMeat[2].style.display = "none";
            isMeatOccupied[2] = false;
            isPrepMeatOccupied[2] = false;
            cookedMeatHandler[2].src = "";
            prepMeatHandler[2].src = "";
        }
        else{
            note.textContent = "The plate is occupied.";
        }
    }
    
    //coming from sauce into assembly
    //checks if one of the two sauce targets are occupied

    //add sauce data to assembly
    if(!(isSauceOccupied[0]) && !(isSauceOccupied[1])){
        if(sauce[0] === beingDragged && e.target === target){
            isSauceOccupied[0] = true;
            assembledSauce[0].setAttribute('draggable', true);
            assembledContent.sauce.name.push("bbq sauce");
            let handler = search("bbq sauce", "sauce", sauceImg);
            sauceHandler[0].src = handler; 
            sauceHandler[2].src = handler;
        }
        else if(sauce[1] === beingDragged && e.target === target ){
            isSauceOccupied[0] = true;
            assembledSauce[0].setAttribute('draggable', true);
            assembledContent.sauce.name.push("hot sauce");
            let handler = search("hot sauce", "sauce", sauceImg);
            sauceHandler[0].src = handler;
            sauceHandler[2].src = handler;
        }
        else if(sauce[2] === beingDragged && e.target === target ){
            isSauceOccupied[0] = true;
            assembledSauce[0].setAttribute('draggable', true);
            assembledContent.sauce.name.push("ranch");
            let handler = search("ranch", "sauce", sauceImg);
            sauceHandler[0].src = handler; 
            sauceHandler[2].src = handler;
        }
        else if(sauce[3] === beingDragged && e.target === target ){
            isSauceOccupied[0] = true;
            assembledSauce[0].setAttribute('draggable', true);
            assembledContent.sauce.name.push("butter sauce");
            let handler = search("butter sauce", "sauce", sauceImg);
            sauceHandler[0].src = handler; 
            sauceHandler[2].src = handler;
        }
        
    }

    else if(!(isSauceOccupied[0]) && isSauceOccupied[1] === true){
        if(sauce[0] === beingDragged && e.target === target){
            isSauceOccupied[0] = true;
            assembledSauce[0].setAttribute('draggable', true);
            assembledContent.sauce.name.push("bbq sauce");
            let handler = search("bbq sauce", "sauce", sauceImg);
            sauceHandler[0].src = handler; 
            sauceHandler[2].src = handler;
        }
        else if(sauce[1] === beingDragged && e.target === target ){
            isSauceOccupied[0] = true;
            assembledSauce[0].setAttribute('draggable', true);
            assembledContent.sauce.name.push("hot sauce");
            let handler = search("hot sauce", "sauce", sauceImg);
            sauceHandler[0].src = handler; 
            sauceHandler[2].src = handler;
        }
        else if(sauce[2] === beingDragged && e.target === target ){
            isSauceOccupied[0] = true;
            assembledSauce[0].setAttribute('draggable', true);
            assembledContent.sauce.name.push("ranch");
            let handler = search("ranch", "sauce", sauceImg);
            sauceHandler[0].src = handler; 
            sauceHandler[2].src = handler;
        }
        else if(sauce[3] === beingDragged && e.target === target ){
            isSauceOccupied[0] = true;
            assembledSauce[0].setAttribute('draggable', true);
            assembledContent.sauce.name.push("butter sauce");
            let handler = search("butter sauce", "sauce", sauceImg);
            sauceHandler[0].src = handler;
            sauceHandler[2].src = handler; 
        }
    }

    else if(!(isSauceOccupied[1]) && isSauceOccupied[0] === true){
        if(sauce[0] === beingDragged && e.target === target){
            isSauceOccupied[1] = true;
            assembledSauce[1].setAttribute('draggable', true);
            assembledContent.sauce.name.push("bbq sauce");
            let handler = search("bbq sauce", "sauce", sauceImg);
            sauceHandler[1].src = handler; 
            sauceHandler[3].src = handler;
        }
        else if(sauce[1] === beingDragged && e.target === target ){
            isSauceOccupied[1] = true;
            assembledSauce[1].setAttribute('draggable', true);
            assembledContent.sauce.name.push("hot sauce");
            let handler = search("hot sauce", "sauce", sauceImg);
            sauceHandler[1].src = handler; 
            sauceHandler[3].src = handler;
        }
        else if(sauce[2] === beingDragged && e.target === target ){
            isSauceOccupied[1] = true;
            assembledSauce[1].setAttribute('draggable', true);
            assembledContent.sauce.name.push("ranch");
            let handler = search("ranch", "sauce", sauceImg);
            sauceHandler[1].src = handler; 
            sauceHandler[3].src = handler;
        }
        else if(sauce[3] === beingDragged && e.target === target ){
            isSauceOccupied[1] = true;
            assembledSauce[1].setAttribute('draggable', true);
            assembledContent.sauce.name.push("butter sauce");
            let handler = search("butter sauce", "sauce", sauceImg);
            sauceHandler[1].src = handler; 
            sauceHandler[3].src = handler;
        }

    }
    else{
        note.textContent = "This spot is occupied.";
    }
    //end of adding sauce data to assembly

    //coming from drink to assembly
    //checks if one of the two sauce targets are occupied
    //add drink data to assembly
    if(!(isDrinksOccupied[0]) && !(isDrinksOccupied[1])){
        if(drinks[0] === beingDragged && e.target === target){
            isDrinksOccupied[0] = true;
            assembledDrink[0].setAttribute('draggable', true);
            assembledContent.drinks.name.push("whiskey");
            let handler = search("whiskey", "drink", drinkImg);
            drinkHandler[0].src = handler;
            drinkHandler[2].src = handler;
        }
        else if(drinks[1] === beingDragged && e.target === target){
            isDrinksOccupied[0] = true;
            assembledDrink[0].setAttribute('draggable', true);
            assembledContent.drinks.name.push("beer");
            let handler = search("beer", "drink", drinkImg);
            drinkHandler[0].src = handler;
            drinkHandler[2].src = handler;
        }
        else if(drinks[2] === beingDragged && e.target === target){
            isDrinksOccupied[0] = true;
            assembledDrink[0].setAttribute('draggable', true);
            assembledContent.drinks.name.push("wine");
            let handler = search("wine", "drink", drinkImg);
            drinkHandler[0].src = handler;
            drinkHandler[2].src = handler;
        }
    }
    else if(!(isDrinksOccupied[0]) && isDrinksOccupied[1] === true){
        if(drinks[0] === beingDragged && e.target === target){
            isDrinksOccupied[0] = true;
            assembledDrink[0].setAttribute('draggable', true);
            assembledContent.drinks.name.push("whiskey");
            let handler = search("whiskey", "drink", drinkImg);
            drinkHandler[0].src = handler;
            drinkHandler[2].src = handler;
        }
        else if(drinks[1] === beingDragged && e.target === target){
            isDrinksOccupied[0] = true;
            assembledDrink[0].setAttribute('draggable', true);
            assembledContent.drinks.name.push("beer");
            let handler = search("beer", "drink", drinkImg);
            drinkHandler[0].src = handler;
            drinkHandler[2].src = handler;
        }
        else if(drinks[2] === beingDragged && e.target === target){
            isDrinksOccupied[0] = true;
            assembledDrink[0].setAttribute('draggable', true);
            assembledContent.drinks.name.push("wine");
            let handler = search("wine", "drink", drinkImg);
            drinkHandler[0].src = handler;
            drinkHandler[2].src = handler;
        }
    }
    else if(!(isDrinksOccupied[1]) && isDrinksOccupied[0] === true){
        if(drinks[0] === beingDragged && e.target === target){
            isDrinksOccupied[1] = true;
            assembledDrink[1].setAttribute('draggable', true);
            assembledContent.drinks.name.push("whiskey");
            let handler = search("whiskey", "drink", drinkImg);
            drinkHandler[1].src = handler;
            drinkHandler[3].src = handler;
        }
        else if(drinks[1] === beingDragged && e.target === target){
            isDrinksOccupied[1] = true;
            assembledDrink[1].setAttribute('draggable', true);
            assembledContent.drinks.name.push("beer");
            let handler = search("beer", "drink", drinkImg);
            drinkHandler[1].src = handler;
            drinkHandler[3].src = handler;
        }
        else if(drinks[2] === beingDragged && e.target === target){
            isDrinksOccupied[1] = true;
            assembledDrink[1].setAttribute('draggable', true);
            assembledContent.drinks.name.push("wine");
            let handler = search("wine", "drink", drinkImg);
            drinkHandler[1].src = handler;
            drinkHandler[3].src = handler;
        }
    }
    else{
        note.textContent = "This spot is occupied.";
    }
    //add drink data to assembly
    
    //coming from sides to assembly
    //checks if there is already a side dish placed
    //adds side dish data to assembly 
    if(!(isSidesOccupied)){
        if(beingDragged === sides[0] && e.target === target){
            isSidesOccupied = true;
            assembledSides[0].setAttribute('draggable', true);
            assembledContent.sides.name.push("potato salad");
            let handler = search("potato salad", "sides", sidesImg);
            sidesHandler[0].src = handler;
            sidesHandler[1].src = handler;
        }
        else if(beingDragged === sides[1] && e.target === target){
            isSidesOccupied = true;
            assembledSides[0].setAttribute('draggable', true);
            assembledContent.sides.name.push("beans");
            let handler = search("beans", "sides", sidesImg);
            sidesHandler[0].src = handler;
            sidesHandler[1].src = handler;
        }
        else if(beingDragged === sides[2] && e.target === target){
            isSidesOccupied = true;
            assembledSides[0].setAttribute('draggable', true);
            assembledContent.sides.name.push("guacamole");
            let handler = search("guacamole", "sides", sidesImg);
            sidesHandler[0].src = handler;
            sidesHandler[1].src = handler;
        }
    }
    else{
        note.textContent = "This spot is occupied.";
    }
    //end of adds side dish data to assembly

    //if the ticket was dragged onto the assembly, the dish is finished
    for(let i = 0; i < currentOrder.length; i++){
        if(beingDragged === currentOrder[i] && e.target === target){
            receivingQueue[0].rate();
        }
    }

}
//END OF PREP STATION


//ORDER STATION

//rating
const initialRating = 0;
var rating = initialRating;
var dayRating = Math.round(rating / customerCount);
//money
const initialCash = 250;
var cash = initialCash;
//day
const initialDay = 1;
var day = initialDay;
const meatLimit = 1;

//possible orders

const meatOrder = [
    {
        name: "brisket",
        type: "cooked"
    },
    {
        name: "sausage",
        type: "cooked"
    },
    {
        name: "ribs",
        type: "cooked"
    }
]

const addOnOrder = [
    {
        name: "whiskey",
        type: "drinks"
    },
    {
        name: "beer",
        type: "drinks"
    },
    {
        name: "wine",
        type: "drinks"
    },
    {
        name: "bbq sauce",
        type: "sauce"
    },
    {
        name: "hot sauce",
        type: "sauce"
    },
    {
        name: "butter sauce",
        type: "sauce"
    },
    {
        name: "ranch",
        type: "sauce"
    },
    {
        name: "beans",
        type: "sides"
    },
    {
        name: "guacamole",
        type: "sides"
    },
    {
        name: "potato salad",
        type: "sides"
    }
]

//end of possible orders

/* 
    GRADES:

    75% for meat,
    10% for addons,
    15% for sides 

*/

//compare order (meat and addons)

function compareMeat(order, assembled){
    if(order.meat.name.length === assembled.meat.name.length){
        if((order.meat.name[0] === assembled.meat.name[0]) && (order.meat.type[0] === assembled.meat.type[0])){
            return 75;
        }
    }
    return 0;
}

//addons are: drinks, sauces, and sides

function compareAddons(order, assembled){
    let orderAddons = [];
    let assembledAddons = [];

    if(order.sides.name.length > 0 || assembled.sides.name.length > 0){
        orderAddons.push(order.sides.name[0]);
        assembledAddons.push(assembled.sides.name[0]);
    }

    if(order.sauce.name.length > 0 || assembled.sauce.name.length > 0){
        for(let i = 0; i < order.sauce.name.length; i++){
            orderAddons.push(order.sauce.name[i]);
        }
        for(let i = 0; i < assembled.sauce.name.length; i++){
            assembledAddons.push(assembled.sauce.name[i]);
        }
    }

    if(order.drinks.name.length > 0 || assembled.sauce.name.length > 0){
        for(let i = 0; i < order.drinks.name.length; i++){
            orderAddons.push(order.drinks.name[i]);
        }
        for(let i = 0; i < assembled.drinks.name.length; i++){
            assembledAddons.push(assembled.drinks.name[i]);
        }
    }

    orderAddons.sort();
    assembledAddons.sort();

    if(orderAddons.length == assembledAddons.length){
        for(let i = 0; i < orderAddons.length; i++){
            if(orderAddons[i] !== assembledAddons[i]){
                return 0;
            }
        }
    }
    else{
        return 0;
    }

    return 10;
}

//grade by waiting time of customer

function patienceGrade(waitingPatience, receivingPatience){
    return (waitingPatience > 0 ? 7.5 : 0) + (receivingPatience > 0 ? 7.5 : 0);
}

//customer
class Customer{
    constructor(order, imgIndex, waitingPatience, receivingPatience){
        this.order = order;
        this.imgIndex = imgIndex;
        this.waitingPatience = waitingPatience;
        this.receivingPatience = receivingPatience;
    }
    //displays first customer while waiting
    display(){
        customerHandler[0].src = customerImg[this.imgIndex].idle;
    }
    //displays talking img of customer which order is being taken
    talk(){
        customerHandler[0].src = customerImg[this.imgIndex].talking;
    }
    //decrements patience meter every 30 seconds of waiting in the queue
    wait(){
        let timer = setInterval(() => {
            this.waitingPatience -= 1;
            if(this.waitingPatience == 0){
                clearInterval(timer);
            }
        }, 30000);
    }
    //decrements patience meter every 30 seconds in the receiving queue
    waitInReceivingQueue(){
        let timer = setInterval(() => {
            this.receivingPatience -= 1;
            if(this.receivingPatience == 0){
                clearInterval(timer);
            }
        }, 30000);
    }
    //remove customer data in waiting queue and place them on receiving queue and their order to orderqueue
    goToReceivingQueue(){
        orderQueue.push(this.order);
        customerHandler[0].src = "";
        customerOrderText.style.backgroundImage = "";
        customerTakeOrder.style.display = "none";
        customerOrderSheet.style.display = "none";
        isTakeOrderActive = false;
        isCustomerTalking = false;
        receivingQueue.push(this);
        waitingQueue.shift();
        receivingQueue[0].waitInReceivingQueue();
        receivingCounter.textContent = "Customers in Receiving Queue: " + receivingQueue.length;
    }
    //does the grades
    rate(){
        //show customer checking the food in the receiving station
        displayReceivingStation();
        disableButtons();
        customerHandler[1].src = customerImg[this.imgIndex].checking;
        sfx2.src = "assets/sfx/checking.wav";
        sfx2.play();
        let grade = compareMeat(this.order, assembledContent) + compareAddons(this.order, assembledContent) + patienceGrade(this.waitingPatience, this.receivingPatience);
        let time = 0;
        //after 3 seconds, show reaction of customer (happy, meh, angry)
        let timer = setInterval(() => {
            time++;
            if(time == 1){
                receivingQueue.shift();
                orderQueue.shift();
                receivingCounter.textContent = "Customers in Receiving Queue: " + receivingQueue.length;
                //adds to overall rating for that day
                rating += grade;
                dayRating = Math.round(rating / customerCount);
                if(grade == 100){
                    customerHandler[1].src = customerImg[this.imgIndex].happy;
                    cash += 25;
                    sfx2.src = "assets/sfx/correct.wav";
                    sfx2.play();
                }
                else if(grade > 25 && grade < 100){
                    customerHandler[1].src = customerImg[this.imgIndex].meh;
                    cash += 10;
                    sfx2.src = "assets/sfx/meh.wav";
                    sfx2.play();
                }
                else if(grade <= 25){
                    customerHandler[1].src = customerImg[this.imgIndex].angry;
                    cash -= 25;
                    sfx2.src = "assets/sfx/wrong.wav";
                    sfx2.play();
                }
                cashCounter[0].textContent = "Cash: $" + cash;
            }
            else if(time == 2){
                //go back to prep station after 6 seconds
                fadeToBlack();
                clearOrder();
                enableButtons();
                clearAssembledContent();
                displayPrepStation();
                clearInterval(timer);
            }
            
            
        }, 3000);
    }
}


//customer images in prep station
const customerHandler = document.querySelectorAll('.customer_handler');
const customerTakeOrder = document.querySelector('.customer_order');
const takeOrderButton = document.getElementById('take_order_button');
//items that show up on screen
const customerOrderItems = document.getElementById('order_items');
const customerOrderTable = customerOrderItems.querySelector('table');

//takes order
takeOrderButton.addEventListener('click', function(e){
    let time = 0;
    //display the text bubble and big paper
    takeOrderButton.style.display = "none";
    customerOrderSheet.style.display = "flex";
    customerOrderText.style.backgroundImage = "url(assets/icons/text-bubble.png)";

    if(!(isCustomerTalking)){
        //play talking sound
        sfx2.src = "assets/sfx/talking.wav";
        sfx2.play();
    }
    //display talking img
    waitingQueue[0].talk();
    isCustomerTalking = true;
    displayCustomerOrder(waitingQueue[0].order, orderIconHandler, orderCountHandler, 0, 3);
    disableButtons();
    //clear customer after 6 seconds
    let timer = setInterval(() => {
        time++;
        if(time == 1){
            fadeToBlack();
            clearCustomerOrder(orderIconHandler, orderCountHandler);
            waitingQueue[0].goToReceivingQueue();
            enableButtons();
            clearInterval(timer);
        }
    }, 6000);
    
})

//removes customer order in the paper
function clearCustomerOrder(iconHandler, countHandler){
    for(let i = 0; i < iconHandler.length; i++){
        iconHandler[i].src = "";
        countHandler[i].textContent = "";
    }
}


const customerImg = [
    {
        angry: "assets/customers/angry/001.png",
        happy: "assets/customers/happy/001.png",
        idle: "assets/customers/idle/001.png",
        meh: "assets/customers/meh/001.png",
        talking: "assets/customers/talking/001.png",
        checking: "assets/customers/checking/001.png"
    },
    {
        angry: "assets/customers/angry/002.png",
        happy: "assets/customers/happy/002.png",
        idle: "assets/customers/idle/002.png",
        meh: "assets/customers/meh/002.png",
        talking: "assets/customers/talking/002.png",
        checking: "assets/customers/checking/002.png"
    },
    {
        angry: "assets/customers/angry/003.png",
        happy: "assets/customers/happy/003.png",
        idle: "assets/customers/idle/003.png",
        meh: "assets/customers/meh/003.png",
        talking: "assets/customers/talking/003.png",
        checking: "assets/customers/checking/003.png"
    }
    
]

//customer order object
var customerOrder = {  
    meat: {
        name: [],
        type: []
    },

    sauce: {
        name: []
    },
    sides: {
        name: []
    },
    drinks: {
        name: []
    }
};


let minCustomerCount;
let maxCustomerCount;


//calculates how many customers are the day's quota
function calculateCustomerCount(rating){
    let result;
    if(rating >= 75){
        if(day < 3){
            minCustomerCount = 4;
            maxCustomerCount = 5;
        }
        else if(day < 8){
            minCustomerCount = 8;
            maxCustomerCount = 10;
        }
        else if(day < 15){
            minCustomerCount = 14
            maxCustomerCount = 17;
        }
        else{
            minCustomerCount = 24;
            maxCustomerCount = 30;
        }
    }
    else if(rating == 0 && day != 1){
        minCustomerCount = 0;
        maxCustomerCount = 0;
    }
    else if(rating < 75){
        if(day < 3){
            minCustomerCount = 1;
            maxCustomerCount = 3;
        }
        else if(day < 8){
            minCustomerCount = 2;
            maxCustomerCount = 6;
        }
        else if(day < 15){
            minCustomerCount = 3;
            maxCustomerCount = 10;
        }
        else{
            minCustomerCount = 4;
            maxCustomerCount = 12;
        }
    }
    result = (maxCustomerCount - minCustomerCount + 1);
    return result;
}

//find the customer quota for the day
var customerCount = Math.floor(Math.random() * calculateCustomerCount(rating)) + minCustomerCount;
var customersCreated = 0;

//generates random order
/*
    POSSIBLE ORDERS:
    1 MEAT
    0-2 ADDONS (DRINKS, SAUCES, SIDES)
*/
let meatCount = 0;
let addOnCount = 0;
function generateRandomOrder(){
    let addOnsLimit = Math.floor(Math.random() * 3);

    for(let i = 0; i < meatLimit; i++){
        let randomMeat = Math.floor(Math.random() * 3);
        if(meatCount < 1){
            customerOrder.meat.name.push(meatOrder[randomMeat].name);
            customerOrder.meat.type.push(meatOrder[randomMeat].type);
            meatCount++;
        }
        else{
            
        }
    }

    for(let i = 0; i < addOnsLimit; i++){
        let randomAddOn = Math.floor(Math.random() * 10);

        if(addOnCount < 2){
            if(addOnOrder[randomAddOn].type === "sides" && customerOrder.sides.name.length < 1){
                customerOrder.sides.name.push(addOnOrder[randomAddOn].name);
                addOnCount++;
            }
            else if(addOnOrder[randomAddOn].type === "drinks"){
                customerOrder.drinks.name.push(addOnOrder[randomAddOn].name);
                addOnCount++;
            }
            else if(addOnOrder[randomAddOn].type === "sauce"){
                customerOrder.sauce.name.push(addOnOrder[randomAddOn].name);
                addOnCount++;
            }
        }
        else{
            
        }
    }

}

//display orders on speech bubble and paper

const customerOrderText = document.querySelector('.customer_order');
const customerOrderSheet = document.getElementById('order_sheet');

//for displaying customer orders on tickets
function displayCustomerOrderIcon(name, type){
    switch(type){
        case "meat":
            switch(name){
                case "brisket":
                    return "assets/obj/icons/meat/brisket.png";
                case "sausage":
                    return "assets/obj/icons/meat/sausage.png";
                case "ribs":
                    return "assets/obj/icons/meat/ribs.png";
                default:
                    return "";    
            }

        case "sides":
            switch(name){
                case "beans":
                    return "assets/obj/icons/sides/beans.png";
                case "guacamole":
                    return "assets/obj/icons/sides/guacamole.png";
                case "potato salad":
                    return "assets/obj/icons/sides/potato-salad.png";
                default:
                    return "";    
            }

        case "sauce":
            switch(name){
                case "bbq sauce":
                    return "assets/obj/icons/ingredients/bbq-sauce.png";
                case "butter sauce":
                    return "assets/obj/icons/ingredients/butter-sauce.png";
                case "hot sauce":
                    return "assets/obj/icons/ingredients/hot-sauce.png";
                case "ranch":
                    return "assets/obj/icons/ingredients/ranch.png";
                default:
                    return "";    
            }

        case "drinks":
            switch(name){
                case "beer":
                    return "assets/obj/icons/drinks/beer.png";
                case "whiskey":
                    return "assets/obj/icons/drinks/whiskey.png";
                case "wine":
                    return "assets/obj/icons/drinks/wine.png";
                default:
                    return "";    
            }

        default:
            return "";
    }
}

//displays customer order on screen
function displayCustomerOrder(order, iconHandler, countHandler, firstIndex, secondIndex){
    let addOnInfo = [];
    //stores the addons inside an array
    
    iconHandler[firstIndex].src = displayCustomerOrderIcon(order.meat.name[0], "meat");
    iconHandler[secondIndex].src = displayCustomerOrderIcon(order.meat.name[0], "meat");
    countHandler[firstIndex].textContent = "X" + order.meat.name.length;
    countHandler[secondIndex].textContent = "X" + order.meat.name.length;
    

    let orderAddOnCount = order.sides.name.length + order.sauce.name.length + order.drinks.name.length;
    addOnInfo = displayCustomerOrderAddOn(order);
    
    
    if(orderAddOnCount == 0){
        for(let i = firstIndex + 1; i < 3; i++){
            iconHandler[i].src = "";
            iconHandler[i+3].src = "";
            countHandler[i].textContent = "";
            countHandler[i+3].textContent = "";
        }
    }
    else{
        if(addOnInfo[0].length == 1){
            iconHandler[firstIndex + 1].src = displayCustomerOrderIcon(addOnInfo[0][0], addOnInfo[2][0]);
            iconHandler[secondIndex + 1].src = displayCustomerOrderIcon(addOnInfo[0][0], addOnInfo[2][0]);
            countHandler[firstIndex + 1].textContent = "X" + addOnInfo[1][0];
            countHandler[secondIndex + 1].textContent = "X" + addOnInfo[1][0];
            iconHandler[firstIndex + 2].src = "";
            iconHandler[secondIndex + 2].src = "";
            countHandler[firstIndex + 2].textContent = "";
            countHandler[secondIndex + 2].textContent = "";
        }
        else if(addOnInfo[0].length == 2){
            for(let i = 0; i < addOnInfo[0].length; i++){
                iconHandler[firstIndex + 1].src = displayCustomerOrderIcon(addOnInfo[0][i], addOnInfo[2][i]);
                iconHandler[secondIndex + 1].src = displayCustomerOrderIcon(addOnInfo[0][i], addOnInfo[2][i]);
                countHandler[firstIndex + 1].textContent = "X" + addOnInfo[1][i];
                countHandler[secondIndex + 1].textContent = "X" + addOnInfo[1][i]; 
                firstIndex++;
                secondIndex++;
            }
        }
    }
    
}


//finds AddOns in customer order
function displayCustomerOrderAddOn(order){

    let addOnsDisplayed = [];
    let countDisplayed = [];
    let typeDisplayed = [];
    let addOnCounter = 0;

    if(order.sides.name.length > 0){
        addOnsDisplayed.push(order.sides.name[0]);
        countDisplayed.push(1);
        typeDisplayed.push("sides");
        addOnCounter++;
    }

    if(order.sauce.name.length > 0){
        for(let i = 0; i < order.sauce.name.length; i++){
            if(i == 1){
                if(order.sauce.name[i-1] !== order.sauce.name[i]){
                    addOnsDisplayed.push(order.sauce.name[i]);
                    countDisplayed.push(1);
                    typeDisplayed.push("sauce");
                }
                else{
                    countDisplayed[addOnCounter]++;
                }
            }
            else{
                addOnsDisplayed.push(order.sauce.name[i]);
                countDisplayed.push(1);
                typeDisplayed.push("sauce");
            }
        }
    }
    if(order.drinks.name.length > 0){
        for(let i = 0; i < order.drinks.name.length; i++){
            if(i == 1){
                if(order.drinks.name[i-1] !== order.drinks.name[i]){
                    addOnsDisplayed.push(order.drinks.name[i]);
                    countDisplayed.push(1);
                    typeDisplayed.push("drinks");
                }
                else{
                    countDisplayed[addOnCounter]++;
                }
            }
            else{
                addOnsDisplayed.push(order.drinks.name[i]);
                countDisplayed.push(1);
                typeDisplayed.push("drinks");
            }
        }
    }

    return [addOnsDisplayed, countDisplayed, typeDisplayed];

}

//clears orders
function clearOrder(){
    customerOrder = {
        meat: {
            name: [],
            type: []
        },
        sides: {
            name: []
        },
        sauce: {
            name: []
        },
        drinks: {
            name: []
        }
    }
    meatCount = 0;
    addOnCount = 0;
}

//displays the current customer on screen
function displayCurrentCustomer(customer){
    if(waitingQueue.length > 0){
        if(!(isCustomerTalking)){
            customer.display();
        }
        if(!(isTakeOrderActive)){
            takeOrderButton.style.display = "block";
            isTakeOrderActive = true;
        }
        customerTakeOrder.style.display = "block";
    }
    else{
        customerHandler[0].src = "";
    }
}




//creates new customers every 30 seconds
function createNewCustomer(count){
    if(isGameRunning){
        //gets random arrival time between 12 and 15 seconds
        let randomCustomerArrivalTime = (Math.floor(Math.random() * (15 - 12 + 1)) + 12) * 1000;
        //creates the first customer after 5 seconds
        if(customersCreated == 0){
            let timer = setInterval(() => {
                clearOrder();

                //creates new order object
                generateRandomOrder();

                //calculate the patience in the waiting queue and the receiving queue the customer has (2 mins to 3 mins)
                let customerImgIndex = Math.floor(Math.random() * customerImg.length);
                let customerPatience = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
                //creates new Customer object
                let newCustomer = new Customer(customerOrder, customerImgIndex, customerPatience, customerPatience);
                waitingQueue.push(newCustomer);
                //notfies if the player is not on order station
                notify();
                newCustomer.wait();
                customersCreated++;
                createNewCustomer(customerCount);
                clearInterval(timer);
            }, 5000)
        }
        else if(customersCreated > 0){ 
            let timer = setInterval(() => {
                if(customersCreated == count){
                    clearInterval(timer);
                    return;
                }
                clearOrder();
                //generates random order
                generateRandomOrder();
                //calculate the patience in the waiting queue and the receiving queue the customer has (2 mins to 3 mins)
                let customerImgIndex = Math.floor(Math.random() * customerImg.length);
                let customerPatience = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
                let newCustomer = new Customer(customerOrder, customerImgIndex, customerPatience, customerPatience);
                waitingQueue.push(newCustomer);
                notify();
                newCustomer.wait();
                customersCreated++;

            }, randomCustomerArrivalTime);
        }
    }
    else{
        return;
    }
}






//waiting queue

const waitingQueue = [];

//end of waiting queue


//receiving queue

const receivingQueue = [];

//end of receiving queue

//order queue

const orderQueue = [];

//end of order queue

//ASSEMBLEDORDER VS CUSTOMERORDER


//order sheets

const orderIconHandler = document.querySelectorAll('.order_icon_handler');
const orderCountHandler = document.querySelectorAll('.order_count_handler');

const currentOrderIconHandler = document.querySelectorAll('.current_order_icon_handler');
const currentOrderCountHandler = document.querySelectorAll('.current_order_count_handler');

const order2IconHandler = document.querySelectorAll('.order2_icon_handler');
const order2CountHandler = document.querySelectorAll('.order2_count_handler');

const order3IconHandler = document.querySelectorAll('.order3_icon_handler');
const order3CountHandler = document.querySelectorAll('.order3_count_handler');

const order2 = document.querySelectorAll('.order2');
const order3 = document.querySelectorAll('.order3');


//end of order sheets


//displays orders in tickets
function displayOrders(){
    
    if(orderQueue.length == 0){
        for(let i = 0; i < currentOrder.length; i++){
            currentOrder[i].style.display = "none";
        }
    }
    else{
        for(let i = 0; i < currentOrder.length; i++){
            currentOrder[i].style.display = "block";
        }
        displayCustomerOrder(orderQueue[0], currentOrderIconHandler, currentOrderCountHandler, 0, 3);
    }

    if(orderQueue.length == 1){
        for(let i = 0; i < order2.length; i++){
            order2[i].style.display = "none";
        }
        for(let i = 0; i < order3.length; i++){
            order3[i].style.display = "none";
        }
    }
    else if(orderQueue.length == 2){
        for(let i = 0; i < order3.length; i++){
            order3[i].style.display = "none";
        }
        for(let i = 0; i < order2.length; i++){
            order2[i].style.display = "block";
        }
        displayCustomerOrder(orderQueue[1], order2IconHandler, order2CountHandler, 0, 3);
    }
    else if(orderQueue.length >= 3){
        for(let i = 0; i < order3.length; i++){
            order3[i].style.display = "block";
        }
        for(let i = 0; i < order2.length; i++){
            order2[i].style.display = "block";
        }
        displayCustomerOrder(orderQueue[2], order3IconHandler, order3CountHandler, 0, 3);
    }
}

//counters on top of the screen
const cashCounter = document.querySelectorAll('.cash_counter');
const dayCounter = document.querySelectorAll('.day_counter');
const receivingCounter = document.querySelector('.receiving_counter');
const ratingCounter = document.querySelector('.rating');
receivingCounter.textContent = "Customers in Receiving Queue: " + receivingQueue.length;

//checks cash after quota is reached
function checkCash(){
    //if rating is 0, game over
    if(minCustomerCount == 0 && maxCustomerCount == 0){
        gameOver();
    }
    else if(cash < 0 && customersCreated == customerCount && waitingQueue.length == 0 && receivingQueue.length == 0 && orderQueue.length == 0){
        //if player has no money when the customer quota is reached, game over
        gameOver();
    }
    else if(customersCreated == customerCount && waitingQueue.length == 0 && receivingQueue.length == 0 && orderQueue.length == 0){
        success();
    }
}


//END OF ORDER STATION


//displays different screens
function displayOrderStation(){
    if((customersCreated == customerCount && waitingQueue.length == 0 && receivingQueue.length == 0 && orderQueue.length == 0) || (minCustomerCount == 0 && maxCustomerCount == 0)){
        checkCash();
    }
    else{
        isInOrderStation = true;
        isInCookingStation = false;
        checkGrillSound();
        note.textContent = "";
        if(isBellTimerActive){
            isBellTimerActive = false;
            sfxAlert.pause;
            sfxAlert.src = "";
            bell.style.visibility = "hidden";
            clearInterval(bellTimer);
        }
        fadeToBlack();
        let transition = setTimeout(()=>{
            orderStation.style.display = 'block';
            prepStation.style.display = 'none';
            cookingStation.style.display = 'none';
            receivingStation.style.display = "none";
            if(orderStation.style.display === 'block'){
                return;
            }
            clearTimeout(transition);
        }, 600)
    }
}

function displayPrepStation(){
    if((customersCreated == customerCount && waitingQueue.length == 0 && receivingQueue.length == 0 && orderQueue.length == 0) || (minCustomerCount == 0 && maxCustomerCount == 0)){
        checkCash();
    }
    else{
        isInOrderStation = false;
        isInCookingStation = false;
        checkGrillSound();
        displayOrders();
        notify();
        note.textContent = "";
        fadeToBlack();
        let transition = setTimeout(()=>{
            orderStation.style.display = 'none';
            prepStation.style.display = 'block';
            cookingStation.style.display = 'none';
            receivingStation.style.display = "none";
            if(prepStation.style.display === 'block'){
                return;
            }
            clearTimeout(transition);
        }, 600)
    }
}

function displayCookingStation(){
    if((customersCreated == customerCount && waitingQueue.length == 0 && receivingQueue.length == 0 && orderQueue.length == 0) || (minCustomerCount == 0 && maxCustomerCount == 0)){
        checkCash();
    }
    else{
        isInOrderStation = false;
        isInCookingStation = true;
        checkGrillSound();
        displayOrders();
        note.textContent = "";
        if(isAlertTimerActive){
            isAlertTimerActive = false;
            alertNotification.style.visibility = "hidden";
            clearInterval(alertTimer);
        }
        notify();
        fadeToBlack();
        let transition = setTimeout(()=>{
            orderStation.style.display = 'none';
            prepStation.style.display = 'none';
            cookingStation.style.display = 'block';
            receivingStation.style.display = "none";
            if(cookingStation.style.display === 'block'){
                return;
            }
            clearTimeout(transition);
        }, 600)
    }
}

function displayReceivingStation(){
    isInOrderStation = false;
    isInCookingStation = false;
    checkGrillSound();
    note.textContent = "";
    fadeToBlack();
    let transition = setTimeout(()=>{
        orderStation.style.display = 'none';
        prepStation.style.display = 'none';
        cookingStation.style.display = 'none';
        receivingStation.style.display = "block";
        if(receivingStation.style.display === 'block'){
            return;
        }
        clearTimeout(transition);
    }, 600)
}

//Main Menu codes

const mainMenu = document.getElementById('mainMenu');
const display_button = document.getElementsByClassName('display_button');
const counters = document.getElementById('counters');
const toolbar = document.getElementById('toolbar');
const notificationBar = document.getElementById('notification_bar');

//ALERTS
const bell = document.getElementById('bell');
const alertNotification = document.getElementById('alert');
let bellTimer;
let alertTimer;

//notifies player when either there is a customer waiting and the player is not on the order station or there is meat burning and they're not in cooking station or both
function notify(){
    if(isGameRunning){
        if(!(isInOrderStation) && waitingQueue[0] != undefined && !(isBellTimerActive)){
            isBellTimerActive = true;
            sfxAlert.src= "assets/sfx/bell.wav";
            sfxAlert.play();
            bellTimer = setInterval(() => {
                //blinking function
                bell.style.visibility = (bell.style.visibility == "hidden" ? "visible" : "hidden");
            }, 500);
        }
        for(let i = 0; i < grill.length; i++){
            if(!(isInCookingStation) && grill[i].type === "burnt" && !(isAlertTimerActive)){
                isAlertTimerActive = true;
                alertTimer = setInterval(() => {
                    //blinking function
                    alertNotification.style.visibility = (alertNotification.style.visibility == "hidden" ? "visible" : "hidden");
                }, 500);
                break;
            }
        }
    }
}




//MUSIC STUFF

const bgm = [
    "assets/music/001.ogg",
    "assets/music/002.ogg",
    "assets/music/003.ogg",
    "assets/music/004.ogg",
    "assets/music/005.ogg",
    "assets/music/006.ogg"
]

//resets game values back
function resetGame(){
    isInOrderStation = true;
    isInCookingStation = false;
    isBellTimerActive = false;
    isAlertTimerActive = false;
    isTakeOrderActive = false;
    isCustomerTalking = false;
    clearOrder();
    waitingQueue.length = 0;
    receivingQueue.length = 0;
    orderQueue.length = 0;
    clearAssembledContent();
    note.textContent = "";
    cookedTray.length = 0;
    grill.length = 0;
    for(let i = 0; i < grillTarget.length; i++){
        isGrillOccupied[i] = false;
        grillHandler[i].src = "";
        grillTarget[i].setAttribute('draggable', false);
    }
    for(let i = 0; i < prepMeat.length; i++){
        isPrepMeatOccupied[i] = false;
        isMeatOccupied[i] = false;
        prepMeat[i].setAttribute('draggable', false);
        cookedMeat[i].setAttribute('draggable', false);
        prepMeatHandler[i].src = "";
        cookedMeatHandler[i].src = "";
    }
    isPlateOccupied = false;
    plateHandler[0].src = "";
    plateHandler[1].src = "";
    plate.setAttribute('draggable', false);
    for(let i = 0; i < assembledDrink.length; i++){
        assembledDrink[i].setAttribute('draggable', false);
        drinkHandler[i].src = "";
        assembledSauce[i].setAttribute('draggable', false);
        assembledSauce[i].src = "";
        isDrinksOccupied[i] = false;
        isSauceOccupied[i] = false;
    }
    assembledSides[0].setAttribute('draggable', false);
    isSidesOccupied = false;
    sidesHandler[0].src = "";
    sidesHandler[1].src = "";
    if(isBellTimerActive){
        isBellTimerActive = false;
        sfxAlert.pause;
        sfxAlert.src = "";
        bell.style.visibility = "hidden";
        clearInterval(bellTimer);
    }
    if(isAlertTimerActive){
        isAlertTimerActive = false;
        alertNotification.style.visibility = "hidden";
        clearInterval(alertTimer);
    }
}


//starts the game
function displayGame(){
    fadeToBlack();
    
    isGameRunning = true;
    isinMainMenu = false;
    var randomBGM = Math.floor(Math.random() * bgm.length);
    music.src = bgm[randomBGM];
    music.loop = true;
    music.play();

    //reset game values
    rating = initialRating;
    cash = initialCash;
    day = initialDay;
    resetGame();
    customersCreated = 0;

    createNewCustomer(customerCount);
    cashCounter[0].textContent = "Cash: $" + cash;
    dayCounter[0].textContent = "Day: " + day;
    let transition = setTimeout(() => {
        mainMenu.style.display = 'none';
        counters.style.display = "block";
        toolbar.style.display = "block";
        notificationBar.style.display = "block";
        orderStation.style.display = 'block';
        displayPrepStationButton.style.display = 'inline';
        displayOrderStationButton.style.display = 'inline';
        displayCookingStationButton.style.display = 'inline';
        clearTimeout(transition);
    }, 600)
}

//try again
function tryAgain(){
    fadeToBlack();
    isGameRunning = true;
    isinMainMenu = false;
    var randomBGM = Math.floor(Math.random() * bgm.length);
    music.src = bgm[randomBGM];
    music.loop = true;
    music.play();


    //reset game values
    rating = initialRating;
    cash = initialCash;
    day = initialDay;
    resetGame();
    customersCreated = 0;


    createNewCustomer(customerCount);
    cashCounter[0].textContent = "Cash: $" + cash;
    dayCounter[0].textContent = "Day: " + day;
    let transition = setTimeout(() => {
        mainMenu.style.display = 'none';
        counters.style.display = "block";
        toolbar.style.display = "block";
        notificationBar.style.display = "block";
        orderStation.style.display = 'block';
        gameOverScreen.style.display = "none";
        displayPrepStationButton.style.display = 'inline';
        displayOrderStationButton.style.display = 'inline';
        displayCookingStationButton.style.display = 'inline';
        clearTimeout(transition);
    }, 600)
}

//goes to the next day
function goToNextDay(){
    fadeToBlack();
    isGameRunning = true;
    isinMainMenu = false;
    var randomBGM = Math.floor(Math.random() * bgm.length);
    music.src = bgm[randomBGM];
    music.loop = true;
    music.play();
    day++;
    customersCreated = 0;
    rating = dayRating;
    dayRating = initialRating;
    customerCount = Math.floor(Math.random() * calculateCustomerCount(rating)) + minCustomerCount;
    rating = 0;
    resetGame();
    createNewCustomer(customerCount);
    cashCounter[0].textContent = "Cash: $" + cash;
    dayCounter[0].textContent = "Day: " + day;
    let transition = setTimeout(() => {
        mainMenu.style.display = 'none';
        counters.style.display = "block";
        toolbar.style.display = "block";
        notificationBar.style.display = "block";
        orderStation.style.display = 'block';
        displayPrepStationButton.style.display = 'inline';
        displayOrderStationButton.style.display = 'inline';
        displayCookingStationButton.style.display = 'inline';
        nextDay.style.display = "none";
        clearTimeout(transition);
    }, 600)
}

//go back to the main menu
function goToMainMenu(){
    let result = confirm("Would you like to go back to the main menu? NOTE: All progress made will be lost.")
    if(result){
        fadeToBlack();
        resetGame();
        isGameRunning = false;
        isinMainMenu = true;
        music.src = "assets/music/main_menu.ogg";
        music.play();
        mainMenu.style.display = 'flex';
        counters.style.display = "none";
        toolbar.style.display = "none";
        notificationBar.style.display = "none";
        orderStation.style.display = 'none';
        receivingStation.style.display = "none";
        cookingStation.style.display = "none";
        prepStation.style.display = "none";
        nextDay.style.display = "none";
        displayPrepStationButton.style.display = 'none';
        displayOrderStationButton.style.display = 'none';
        displayCookingStationButton.style.display = 'none';
    }
}

//closes game
function exitGame(){
    let exit = confirm("Would you like to close the game?");
    if(exit){
        window.close();
    }
}

//displays options, credits, and tutorial
const modal = document.getElementById('option');
const openModal = document.getElementById('optionBttn');
const span = document.getElementsByClassName('close')[0];
const credits = document.getElementById('credits');
const tutorial = document.getElementById('tutorial')

function displayOption(){
    if(isinMainMenu){

    }
    else{
        isGameRunning = false;
    }
    music.pause();
    pauseMusic.play();
    pauseMusic.loop = true;
    modal.style.display = 'flex';
}

function displayCredits(){
    if(isinMainMenu){

    }
    else{
        isGameRunning = false;
    }
    music.pause();
    pauseMusic.play();
    pauseMusic.loop = true;
    credits.style.display = 'flex';
}

function displayTutorial(){
    if(isinMainMenu){

    }
    else{
        isGameRunning = false;
    }
    music.pause();
    pauseMusic.play();
    pauseMusic.loop = true;
    tutorial.style.display = 'flex';
}

function closeOption(){
    if(isinMainMenu){
        music.play();
    }
    else{
        music.play();
        isGameRunning = true;
    }
    pauseMusic.pause();
    modal.style.display = 'none';
}

function closeCredits(){
    if(isinMainMenu){
        music.play();
    }
    else{
        music.play();
        isGameRunning = true;
    }
    pauseMusic.pause();
    credits.style.display = 'none';
}

function closeTutorial(){
    if(isinMainMenu){
        music.play();
    }
    else{
        music.play();
        isGameRunning = true;
    }
    pauseMusic.pause();
    tutorial.style.display = "none";
}

window.onclick = function(event){
    if(event.target == modal){
        if(isinMainMenu){
            music.play();
        }
        else{
            music.play();
            isGameRunning = true;
        }
        pauseMusic.pause();
        modal.style.display = 'none';
    }
}

//the start screen
const start = document.getElementById('start');
const game = document.getElementById('game');

//plays main menu music
function playGame(){
    isinMainMenu = true;
    isGameRunning = false;
    start.style.display = "none";
    game.style.display = "flex";
    music.src = "assets/music/main_menu.ogg";
    music.play();

    const overlay = document.getElementById("blackOverlay");
    overlay.style.opacity = "1";
    
    let fadeOut = setTimeout(()=>{
        overlay.style.opacity = "0";
        clearTimeout(fadeOut);
    }, 600)
}

//fade to black animation
function fadeToBlack(){
    const overlay = document.getElementById("blackOverlay");

    let fadeIn = setTimeout(()=>{
        overlay.style.opacity = "1";
        
    }, 300)

    let fadeOut = setTimeout(()=>{
        overlay.style.opacity = "0";
        clearTimeout(fadeIn);
        clearTimeout(fadeOut);
    }, 600)

    

}


//music and sfx options
var musicOption = document.getElementById('musicOption');
var soundOption = document.getElementById('soundOption');

function bgmOption(){
    
    if(!(musicOption.checked)){
        music.muted = true;
        pauseMusic.muted = true;
    }
    else{
        music.muted = false;
        pauseMusic.muted = false;
    }
}

function sfxOption(){
    
    if(!(soundOption.checked)){
        sfx.muted = true;
        sfx2.muted = true;
    }
    else{
        sfx.muted = false;
        sfx2.muted = false;
    }
}



//game over and success screens
const gameOverScreen = document.getElementById('gameOver');

function gameOver(){
    isGameRunning = false;
    isinMainMenu = false;
    music.src = "assets/music/fail.ogg";
    music.loop = false;
    music.play();
    resetGame();
    mainMenu.style.display = 'none';
    counters.style.display = "none";
    toolbar.style.display = "none";
    notificationBar.style.display = "none";
    orderStation.style.display = 'none';
    receivingStation.style.display = "none";
    cookingStation.style.display = "none";
    prepStation.style.display = "none";
    displayPrepStationButton.style.display = 'none';
    displayOrderStationButton.style.display = 'none';
    displayCookingStationButton.style.display = 'none';
    gameOverScreen.style.display = "flex";
}

const nextDay = document.getElementById('nextDay');

function success(){
    isinMainMenu = false;
    isGameRunning = false;
    isAlertTimerActive = false;
    isBellTimerActive = false;
    music.src = "assets/music/win.ogg";
    music.loop = false;
    music.play();
    cashCounter[1].textContent = "Cash: $" + cash;
    dayCounter[1].textContent = "Congratulations! You have completed Day: " + day;
    let ratingTimer = 0;
    mainMenu.style.display = 'none';
    counters.style.display = "none";
    toolbar.style.display = "none";
    notificationBar.style.display = "none";
    orderStation.style.display = 'none';
    receivingStation.style.display = "none";
    cookingStation.style.display = "none";
    prepStation.style.display = "none";
    displayPrepStationButton.style.display = 'none';
    displayOrderStationButton.style.display = 'none';
    displayCookingStationButton.style.display = 'none';
    nextDay.style.display = "block";
    let timer = setInterval(() => {
        ratingTimer++;
        ratingCounter.textContent = "Rating: " + ratingTimer + "%";
        if(ratingTimer == dayRating){
            if(dayRating >= 75){
                ratingCounter.textContent = "Rating: " + ratingTimer + "% - Good!";
            }
            else if(dayRating >= 50){
                ratingCounter.textContent = "Rating: " + ratingTimer + "% - Okay!";
            }
            else if(dayRating <= 50){
                ratingCounter.textContent = "Rating: " + ratingTimer + "% - Pretty Bad...";
            }
            clearInterval(timer);
        }
    }, 20);
    
}

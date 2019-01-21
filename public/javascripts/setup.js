var socket = io(window.location.href);

getButtonId = function(button){
    return button.parentNode.getAttribute("data-buttonGroup");
    // console.log(button.parentNode);

};

reflectConfig = function(cb){
    const Http = new XMLHttpRequest();

    var HttpMethod = "GET";
    var _url = "buttons/config";

    Http.open(HttpMethod, window.location.href + _url);
    Http.send();

    Http.onreadystatechange = function(){
        if(this.status !== 200 || this.readyState !== 4) return;
        // console.log("Request to " + window.location.href + _url + " returned");
        // console.log(this.responseText)
        let config = JSON.parse(this.responseText);
        let parsedItems = 0;

        let tabs = document.getElementById("pills-tab");
        let mainContent = document.getElementById("pills-tabContent");

        for(let button in config){
            if(config.hasOwnProperty(button)){
                let value = config[button];
                let formattedId = value.identifier;
                formattedId = formattedId.replace(" ", "-");
                formattedId = formattedId.toLowerCase();
                // console.log(formattedId);
                if(parsedItems === 0) {
                    tabs.appendChild(createNavItem(true, true, formattedId, "#"+formattedId, value.identifier));
                    mainContent.appendChild(createTabPane(true, formattedId, formattedId, button));
                } else {
                    tabs.appendChild(createNavItem(false, false, formattedId, "#"+formattedId, value.identifier));
                    mainContent.appendChild(createTabPane(false, formattedId, formattedId, button));
                }
                parsedItems ++;

            }
        }

        // create li-a



        // create div-div-2button

        if(cb) cb();

    }
}

createTabPane = function(isActive, aria_labelled_by, id, index){
    // console.log(index)
    // <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
    //     <div class="btn-lg btn-block btn btn-group-vertical" role="group" data-buttonGroup="0">
    //          <button type="button" class="btn btn-outline-dark pt-3 pb-3 up">Up</button>
    //          <button type="button" class="btn btn-outline-dark pt-3 pb-3 down">Down</button>
    //     </div>
    // </div>
    // <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
    //      <div class="btn-lg btn-block btn btn-group-vertical" role="group" data-buttonGroup="1">
    //          <button type="button" class="btn btn-outline-dark pt-3 pb-3 up">Up</button>
    //          <button type="button" class="btn btn-outline-dark pt-3 pb-3 down">Down</button>
    //     </div>
    // </div>
    // <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
    //      <div class="btn-lg btn-block btn btn-group-vertical" role="group" data-buttonGroup="2">
    //          <button type="button" class="btn btn-outline-dark pt-3 pb-3 up">Up</button>
    //          <button type="button" class="btn btn-outline-dark pt-3 pb-3 down">Down</button>
    //     </div>
    // </div>

    //  nav-item                tab-pane
    //  id                      aria-labelled-by
    //  #href                   id
    //  aria-controls           id

    let tabPane = document.createElement("div");
    tabPane.classList.add("tab-pane");
    tabPane.classList.add("fade");
    if(isActive) tabPane.classList.add("show");
    if(isActive) tabPane.classList.add("active");

    tabPane.id = id;

    tabPane.setAttribute("role", "tabpanel");

    tabPane.setAttribute("aria-labelledby", aria_labelled_by);

    let btn_block = document.createElement("div");
    btn_block.classList.add("btn-lg");
    btn_block.classList.add("btn-block");
    btn_block.classList.add("btn");
    btn_block.classList.add("btn-group-vertical");

    btn_block.setAttribute("role", "group");

    btn_block.setAttribute("data-buttonGroup", index);

    let upButton = document.createElement("button");
    let downButton = document.createElement("button");

    upButton.type = "button";
    downButton.type = "button";

    upButton.classList.add("btn");
    downButton.classList.add("btn");

    upButton.classList.add("btn-outline-dark");
    downButton.classList.add("btn-outline-dark");

    upButton.classList.add("pt-3");
    downButton.classList.add("pt-3");

    upButton.classList.add("pb-3");
    downButton.classList.add("pb-3");

    upButton.classList.add("up");
    downButton.classList.add("down");

    upButton.innerText = "Up";
    downButton.innerText = "Down";


    btn_block.appendChild(upButton);
    btn_block.appendChild(downButton);

    tabPane.appendChild(btn_block);

    return tabPane;

}


createNavItem = function(isSelected, isActive, id, href, innerText){
    // <li class="nav-item">
    //     <a class="text-dark nav-link text-center active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Serranda 1</a>
    // </li>
    // <li class="nav-item">
    //     <a class="text-dark nav-link text-center" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Serranda 2</a>
    // </li>
    // <li class="nav-item">
    //     <a class="text-dark nav-link text-center" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Serranda 3</a>
    // </li>

    //  nav-item                tab-pane
    //  id                      aria-labelled-by
    //  #href                   id
    //  aria-controls           id



    let li = document.createElement("li");
    li.classList.add("nav-item");

    let a = document.createElement("a");
    a.classList.add("text-dark");
    a.classList.add("nav-link");
    a.classList.add("text-center");
    a.setAttribute("data-toggle", "pill");

    a.setAttribute("role", "tab");
    a.id = id+"-tab";

    a.setAttribute("href", href);
    a.setAttribute("aria-controls", href);

    if(isActive === true) a.classList.add("active");
    a.setAttribute("aria-selected", isSelected.toString());

    a.innerText = innerText;



    li.appendChild(a);

    return li;


}

bindButtonClickEvent = function(target, targetName, HttpMethod, url){

    const _url = window.location.href + url;
    // console.log("Binding " + targetName + " to " + HttpMethod + " " + _url);

    target.onclick = function () {
        const Http = new XMLHttpRequest();
        // console.log("Calling " + targetName + " to " + HttpMethod + " " + _url);

        Http.onreadystatechange=function(){
            if(this.status === 200 && this.readyState === 4){
                reflectStatus();
                // console.log("Request:  "+ HttpMethod +  " "+ _url +  "\nResponse: " + this.responseText);
            }
        };

        Http.open(HttpMethod, _url);
        Http.send();

    }
};


bindButtons = function(){
    let upButtons = $(".up");
    // console.log(upButtons);
    let downButtons = $(".down");

    let upAll = document.getElementById("upAllButton");
    let downAll = document.getElementById("downAllButton");

    let stopAllButton = document.getElementById("stopAllButton");

    for(let i = 0; i < upButtons.length; i++){
        let upButton = upButtons[i];
        let downButton = downButtons[i];

        let buttonId = getButtonId(upButton);

        // console.log(buttonId);

        const _url = "buttons/" + buttonId + "/status";
        // id/status/up
        const HTTPMethod = "GET";

        bindButtonClickEvent(upButton, "upButton", HTTPMethod, _url +  "/up");
        bindButtonClickEvent(downButton, "downButton", HTTPMethod, _url + "/down");


    }

    bindButtonClickEvent(upAll, "upAllButton", "GET", "buttons/all/status/up");
    bindButtonClickEvent(downAll, "downAllButton", "GET", "buttons/all/status/down");

    bindButtonClickEvent(stopAllButton, "stopAllButton", "GET", "buttons/all/status/stop");

}

reflectStatus = function(){

    const Http = new XMLHttpRequest();

    var HttpMethod = "GET";
    var _url = "buttons/all/status";

    Http.open(HttpMethod, window.location.href + _url);
    Http.send();

    Http.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            // console.log("Request:  "+ HttpMethod +  " " + _url +  "\nResponse: " + this.responseText);
            var myConfig = this.responseText;
            myConfig = JSON.parse(myConfig);

            let status = {
                "up" : 0,
                "down" : 0,
                "off" : 0
            };

            // console.log(myConfig);

            $("#upAllButton").removeClass("active");
            $("#downAllButton").removeClass("active");
            $("#stopAllButton").removeClass("active");



            $("div button.up").removeClass("active");
            $("div button.down").removeClass("active");



            for(let button in myConfig){
                if(myConfig.hasOwnProperty(button)){

                    // console.log(button);


                    if(myConfig[button] === "up"){

                        // console.log(button + " - " + myConfig[button]);

                        let jQuerySelector = "div[data-buttongroup="+ button +"]" + " button." + myConfig[button];
                        // console.log(jQuerySelector)

                        let buttonItem = $(jQuerySelector);
                        // console.log(buttonItem);

                        buttonItem.addClass("active");



                    } else if(myConfig[button] === "down"){
                        // console.log(button + " - " + myConfig[button]);

                        let jQuerySelector = "div[data-buttongroup="+ button +"]" + " button." + myConfig[button];
                        // console.log(jQuerySelector)

                        let buttonItem = $(jQuerySelector);
                        // console.log(buttonItem);
                        buttonItem.addClass("active");

                    } else if(myConfig[button] === "off"){
                        // console.log(button + " - " + myConfig[button]);
                        // no button is pressed, so nothing is to be reflected.
                    }
                    status[myConfig[button]] += 1;
                }
            }

            if(status["up"] === 0 && status["off"] === 0){
                $("#downAllButton").addClass("active");
            }

            if(status["down"] === 0 && status["off"] === 0){
                $("#upAllButton").addClass("active");
            }

            if(status["up"] === 0 && status["down"] === 0){
                $("#stopAllButton").addClass("active");
            }

        }
    };

}

window.onload = function () {
    reflectConfig(function () {
        bindButtons();
    });
    // bindButtons();
    reflectStatus();


};
getButtonId = function(button){
    let buttonId = button.parentNode.getAttribute("data-buttonGroup");
    return buttonId;
};

bindButtonClickEvent = function(target, targetName, HttpMethod, url){

    const _url = window.location.href + url;
    // console.log("Binding " + targetName + " to " + HttpMethod + " " + _url);

    target.onclick = function () {
        const Http = new XMLHttpRequest();
        // console.log("Calling " + targetName + " to " + HttpMethod + " " + _url);

        Http.onreadystatechange=function(){
            if(this.status === 200 && this.readyState === 4){
                reflectStatus();
                console.log("Request:  "+ HttpMethod +  " "+ _url +  "\nResponse: " + this.responseText);
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
    var _url = "buttons";

    Http.open(HttpMethod, window.location.href + _url);
    Http.send();

    Http.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            console.log("Request:  "+ HttpMethod +  " " + _url +  "\nResponse: " + this.responseText);
            var myConfig = this.responseText;
            myConfig = JSON.parse(myConfig);

            console.log(myConfig);

            for(let button in myConfig){

                if(myConfig.hasOwnProperty(button)){

                    // console.log(button);
                    // console.log(myConfig[button]);

                    $("div[data-buttongroup="+ button +"] button.up").removeClass("active");
                    $("div[data-buttongroup="+ button +"] button.down").removeClass("active");

                    if(myConfig[button] === "up"){

                        console.log(button + " - " + myConfig[button]);

                        let jQuerySelector = "div[data-buttongroup="+ button +"]" + " button." + myConfig[button];
                        console.log(jQuerySelector)

                        let buttonItem = $(jQuerySelector);
                        console.log(buttonItem);

                        buttonItem.addClass("active");

                    } else if(myConfig[button] === "down"){
                        console.log(button + " - " + myConfig[button]);

                        let jQuerySelector = "div[data-buttongroup="+ button +"]" + " button." + myConfig[button];
                        console.log(jQuerySelector)

                        let buttonItem = $(jQuerySelector);
                        console.log(buttonItem);
                        buttonItem.addClass("active");

                    } if(myConfig[button] === "off"){
                        console.log(button + " - " + myConfig[button]);
                        // no button is pressed, so nothing is to be reflected.
                    }
                }
            }

        }
    };

}

window.onload = function () {
    bindButtons();
    reflectStatus();

};
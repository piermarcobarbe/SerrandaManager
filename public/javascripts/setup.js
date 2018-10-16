window.onload = function () {
    let upButtons = $(".up");
    console.log(upButtons);
    let downButtons = $(".down");
    for(let i = 0; i < upButtons.length; i++){
        let upButton = upButtons[i];
        let downButton = downButtons[i];
        parent = upButton.parentNode;
        let buttonId = parent.classList.toString().substring(parent.classList.toString().indexOf("buttonGroup")+11,parent.classList.toString().indexOf("buttonGroup") + 12);
        console.log(buttonId);

        const _url = "buttons/" + buttonId + "/status";
        // id/status/up
        const HTTPMethod = "GET";

        upButton.onclick = function () {
            const Http = new XMLHttpRequest();
            const url = window.location.href + _url + "/up"
            console.log("up: " + url);
            Http.open(HTTPMethod, url);
            Http.send();

            Http.onreadystatechange=function(){
                console.log("Change");
                if(this.status === 200 && this.readyState === 4){
                    console.log(this.responseText);
                }
            }

        }

        downButton.onclick = function () {
            const Http = new XMLHttpRequest();
            const url = window.location.href + _url + "/down"
            console.log("down: " + url);
            Http.open(HTTPMethod, url);
            Http.send();


            Http.onreadystatechange=function(){
                console.log("Change");
                if(this.status === 200 && this.readyState === 4){
                    console.log(this.responseText);
                }
            }
        }


    }
}
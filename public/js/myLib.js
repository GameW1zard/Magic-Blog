var gameul = document.getElementById("gamesul");
var consoleul = document.getElementById("consolesul");
var addconsolebtn = document.getElementById("addConsole");
var addgamebtn = document.getElementById("addGame");

consoleul.addEventListener("click", getGames);
addconsolebtn.addEventListener("click", addconsoletodb);
addgamebtn.addEventListener("click", addgametodb);

function getGames (e) {
    e.preventDefault();
    gameul.innerHTML = "";
    let consoleid = e.target.getAttribute("data-consoleid");
    let userid = e.target.getAttribute("data-userid");
    addgamebtn.setAttribute("data-consoleid", consoleid);
    console.log(consoleid + " " + userid);
    fetch(`/api/GamesTable/${userid}/${consoleid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                addGameToList(data[i].game_name, data[i].purchase_price);
            }
        })
    })
}

function getGames2 (console_id, user_id) {
    gameul.innerHTML = "";
    console.log(console_id + " " + user_id);
    fetch(`/api/GamesTable/${user_id}/${console_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                addGameToList(data[i].game_name, data[i].purchase_price);
            }
        })
    })
}


function addGameToList(game, purchase_price) {
    var li = document.createElement("li");
    li.innerHTML = `game: ${game} Purchase Price: ${purchase_price}`;
    gameul.appendChild(li);
}

function addconsoletodb () {
    let user_id = addconsolebtn.getAttribute("data-userid");
    let console_name = prompt("Enter Console Name");
    //console.log(user_id + " " + console_name);
    fetch("/api/ConsoleTable", {
        method: "POST",
        body: JSON.stringify({
            user_id,
            console_name
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        })
        document.location.reload();
    });
}

function addgametodb () {
    let user_id = addgamebtn.getAttribute("data-userid");
    let console_id = addgamebtn.getAttribute("data-consoleid");
    let game_name = prompt("Enter Game Name");
    let purchase_price = prompt("Enter Purchase Price");
    //console.log(user_id + " " + console_name);
    fetch("/api/GamesTable", {
        method: "POST",
        body: JSON.stringify({
            game_name,
            purchase_price,
            console_id,
            user_id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        })
        // document.location.reload();
        addGameToList(game_name, purchase_price);
    });
    
}

// addGameToList("Halo");
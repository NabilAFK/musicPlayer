//API stuff
var apiKey = key.api;
SC.initialize({
  client_id: apiKey
});

var MusicPlayer = {};

MusicPlayer.search = function(input){
    SC.get('/tracks', {
        q: input
      }).then(function(tracks) {
        MusicPlayer.clearArea();
          tracks.forEach(function(e){
              MusicPlayer.addTocard(e.title,e.permalink_url,e.artwork_url);
          })    
      });
}

MusicPlayer.addTocard = function(musicTitle,url,imgSrc){
    var area = document.querySelector(".searchArea");

    var card = document.createElement("div");
    card.classList.add("card","cards");
    area.appendChild(card);

    var img = document.createElement("img");
    img.classList.add("img-src-top");
    card.appendChild(img);
    img.src = imgSrc || "http://icons.iconarchive.com/icons/danleech/simple/256/soundcloud-icon.png";

    var title = document.createElement("h5");
    title.classList.add("card-title");
    card.appendChild(title);
    title.textContent = musicTitle.substring(0,25);

    var btn = document.createElement("a");
    btn.classList.add("btn","btn-warning");
    card.appendChild(btn);
    btn.innerHTML = "<p>Add to playlist &nbsp<span class = \"fas fa-plus-circle fa-lg\"></span></p>"

    var addToPlaylist = document.querySelector(".playlistArea");
    btn.addEventListener("click",function(){

    
    SC.oEmbed(url, {
      auto_play: false
    }).then(function(embed){
        console.log('oEmbed response: ', embed);
        addToPlaylist.innerHTML += embed.html;
        localStorage.setItem("key",addToPlaylist.innerHTML);
     });    
     
    });
    
}


MusicPlayer.getInput = function(){
  var search = document.querySelector("input");
  var go = document.querySelector("button");
  go.addEventListener("click",function(){
    MusicPlayer.search(search.value);
  });  
  search.addEventListener("keypress",function(pressed){
    if(pressed.which == 13)
      MusicPlayer.search(search.value);
  }); 
  
  var reset = document.querySelector(".reset");
  reset.addEventListener("click",function(){
    clear();
  })

}
MusicPlayer.clearArea = function(){
  area = document.querySelector(".searchArea");
  area.innerHTML = "";
}


var pl = document.querySelector(".playlistArea");
pl.innerHTML = localStorage.getItem("key");

function clear(){
  var clearArea = document.querySelector(".playlistArea");
  clearArea.innerHTML= "";
  localStorage.clear();
}
MusicPlayer.search("hiphop");
MusicPlayer.getInput();



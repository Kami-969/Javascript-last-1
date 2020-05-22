function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function ajaxWithPromise(url)
{
  return new Promise(function(resolve, reject)
  {
    var xml = new XMLHttpRequest();

    xml.open("get", url);

    xml.onload = function(response)
    {
      resolve(xml.responseText);
    }

    xml.onerror = function(response)
    {
      reject("Error");
    }

    xml.send();
  })
}
var popupscreen = document.getElementById("popup");
var url = "https://jsonplaceholder.typicode.com/photos/";
var cancel = document.getElementById("cancel");
  
  ajaxWithPromise(url).then(function(response,event)
  {
    var thumb = document.getElementById("thumbrnail");  
    var object = JSON.parse(response);
    for(let item of object)
    {
      var divv = document.createElement("div");
      var img = document.createElement("img");
      img.src = item.url;

      id = divv.setAttribute("data-id", item.id);
      id = divv.setAttribute("id", "forpopup");

      divv.setAttribute("class", "styler");
      thumb.appendChild(divv);
      divv.appendChild(img);
      var p = document.createElement("p");
      p.innerHTML = item.title;
      divv.appendChild(p);
    }

    })

    ajaxWithPromise(url).then(function(response,event)
    {
      var object = JSON.parse(response);
      var stylerclass =document.getElementsByClassName("styler");

      for(let item of stylerclass)
      {
        item.addEventListener("click", function(){
          var loaddiv = document.getElementById("popupcontainer")
          var ploading = document.createElement("p");
          ploading.setAttribute("id", "loading");
          ploading.innerHTML ="Loading ...";
          loaddiv.appendChild(ploading);

          setTimeout(function()
          {
            ploading.remove();
            var divv = document.getElementById("popupcontainer");
            var img = document.createElement("img");
            img.src = object[item.getAttribute("data-id")].url;
            divv.appendChild(img);
  
            var pid = document.createElement("p");
            pid.innerHTML ="ID: " + object[item.getAttribute("data-id")].id;
            divv.appendChild(pid);
  
            var palbumId = document.createElement("p");
            palbumId.innerHTML = "AlbumId: " +  object[item.getAttribute("data-id")].albumId;
            divv.appendChild(palbumId);
  
            
            var ptitle = document.createElement("p");
            ptitle.innerHTML ="Title: " + object[item.getAttribute("data-id")].title;
            divv.appendChild(ptitle);
  
            var purl = document.createElement("p");
            purl.innerHTML ="Url: " + object[item.getAttribute("data-id")].url;
            divv.appendChild(purl);

          }, 3000);

        popupscreen.classList.toggle("active");



        })
      }

    })





    // var itemPId = document.getElementById("data-id");
    // itemPId.addEventListener("click", function(event){
    //   console.log(itemPId);
    // })
  // })

  cancel.addEventListener("click", function(){
    popup.classList.toggle("active");
    var divv = document.getElementById("popupcontainer");
    divv.innerHTML = '';
  })



  



  
function shrten(){

  var Org_url = document.getElementById('userUrl').value;

  var res = Org_url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

  if(res == null){
    alert("Invalid Url !");
  }else {

    var req = new Request("https://us-central1-dbdemo-b1622.cloudfunctions.net/shrten",{
      method:"POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({url: Org_url})
    });

    fetch(req).then((res) => {
      res.json().then((data) =>{
        document.getElementById("shrtUrl").value = data.shortURL;
      });
    });

  }

}

function geturl(){

  var shrtUrl = document.getElementById('userUrl2').value;

  var uniqueCheckSum = shrtUrl.split("https://dbdemo-b1622.firebaseapp.com/");

  if(uniqueCheckSum[0] == ''){

    var req = new Request("https://us-central1-dbdemo-b1622.cloudfunctions.net/geturl", {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({url: shrtUrl})
    });

    fetch(req).then( (res) => {
      res.json().then( (data) => {
        document.getElementById('orginUrl').value = data.url;
        console.log(data);
      });
    });

  }else {
    alert("Invalid shrten Url");
  }

}

function openurl(){
  var url = document.getElementById('orginUrl').value;

  if(url != ''){
    window.open(url, '_blank');
  }

}

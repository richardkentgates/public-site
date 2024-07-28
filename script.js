(function() {
    rssEmbed = {};
    rssEmbed.e = {};
    rssEmbed.f = {};
    rssEmbed.o = {};
    rssEmbed.v = {};
    rssEmbed.f.latestPost = function(rssURL,author,postMax,id){
          fetch(rssURL)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
            rssEmbed.e.feed = data.documentElement;
            rssEmbed.o.items = rssEmbed.e.feed.getElementsByTagName('item');
            for(i=0;i < rssEmbed.o.items.length;i++) {
                if( rssEmbed.o.items[i].getElementsByTagName("dc:creator")[0].textContent == author){
                      rssEmbed.e.title = document.createElement('h3');
                      rssEmbed.e.title.innerHTML = rssEmbed.o.items[i].getElementsByTagName("title")[0].innerHTML;                    
                      rssEmbed.e.tempPub = document.createElement('div');
                      rssEmbed.e.pub = document.createElement('small');
                      rssEmbed.v.pubDateItems = rssEmbed.o.items[i].getElementsByTagName("pubDate")[0].textContent.split(' ');
                      rssEmbed.e.pub.appendChild(document.createTextNode(rssEmbed.v.pubDateItems[0] + ' ' + rssEmbed.v.pubDateItems[1] + ' ' + rssEmbed.v.pubDateItems[2] + ' ' + rssEmbed.v.pubDateItems[3]));
                      rssEmbed.e.tempDoc = document.createElement('div');
                      rssEmbed.e.description = document.createElement('p');
                      rssEmbed.e.tempDoc.appendChild(rssEmbed.o.items[i].getElementsByTagName("description")[0]);
                      rssEmbed.e.description.innerHTML = rssEmbed.e.tempDoc.textContent;
                      document.getElementById(id).appendChild(rssEmbed.e.title);
                      document.getElementById(id).appendChild(rssEmbed.e.pub);
                      document.getElementById(id).appendChild(rssEmbed.e.description);
                      if((i+1) == postMax || (i+1) == rssEmbed.o.items.length){ 
                          break;
                      }
                }
            }
        });
    };
    document.addEventListener('readystatechange',function(){
        if (document.readyState == "complete") {
            rssEmbed.f.latestPost('https://gapcreekmedia.com/feed','Richard Gates',1,'post');
        }
    });
})();

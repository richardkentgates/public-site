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
            rssEmbed.e.title = [];
            rssEmbed.e.tempPub = [];
            rssEmbed.e.pubItems = [];
            rssEmbed.e.pub = [];
            rssEmbed.e.tempDoc = [];
            rssEmbed.e.description = [];
            for(i=0;i < rssEmbed.o.items.length;i++) {
                if( rssEmbed.o.items[i].getElementsByTagName("dc:creator")[0].textContent == author || author === null){
                      rssEmbed.e.title[i] = document.createElement('h3');
                      rssEmbed.e.title[i].innerHTML = rssEmbed.o.items[i].getElementsByTagName("title")[0].innerHTML;                    
                      rssEmbed.e.tempPub[i] = document.createElement('div');
                      rssEmbed.e.pub[i] = document.createElement('small');
                      rssEmbed.e.pubItems[i] = rssEmbed.o.items[i].getElementsByTagName("pubDate")[0].textContent.split(' ');
                      rssEmbed.e.pub[i].appendChild(document.createTextNode(rssEmbed.e.pubItems[i][0] + ' ' + rssEmbed.e.pubItems[i][1] + ' ' + rssEmbed.e.pubItems[i][2] + ' ' + rssEmbed.e.pubItems[i][3]));
                      rssEmbed.e.tempDoc[i] = document.createElement('div');
                      rssEmbed.e.description[i] = document.createElement('p');
                      rssEmbed.e.tempDoc[i].appendChild(rssEmbed.o.items[i].getElementsByTagName("description")[0]);
                      rssEmbed.e.description[i].innerHTML = rssEmbed.e.tempDoc[i].textContent;
                      document.getElementById(id).appendChild(rssEmbed.e.title[i]);
                      document.getElementById(id).appendChild(rssEmbed.e.pub[i]);
                      document.getElementById(id).appendChild(rssEmbed.e.description[i]);
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

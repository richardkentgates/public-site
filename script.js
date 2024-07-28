(function() {
    document.addEventListener('readystatechange',function(){
        if (document.readyState == "complete") {
          const rssURL = 'https://gapcreekmedia.com/feed';
          fetch(rssURL)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {
                const feed = data.documentElement;
                const items = feed.getElementsByTagName('item');
                for(i=0;i < items.length;i++) {
                    if( items[i].getElementsByTagName("dc:creator")[0].textContent == 'Richard Gates'){
                      var tempPub = document.createElement('div');
                      var tempDoc = document.createElement('div');
                      var pubDateItems = items[i].getElementsByTagName("pubDate")[0].textContent.split(' ');
                      tempDoc.appendChild(items[i].getElementsByTagName("description")[0]);
                      document.getElementById('latest-title').appendChild(items[i].getElementsByTagName("title")[0]);
                      document.getElementById('latest-pub').appendChild(document.createTextNode(pubDateItems[0] + ' ' + pubDateItems[1] + ' ' + pubDateItems[2] + ' ' + pubDateItems[3]));
                      document.getElementById('latest-description').innerHTML = tempDoc.textContent;
                      break;
                    }
                }
            });
        }
    });
})();

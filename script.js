(function() {
    var feedURL = "https://gapcreekmedia.com/feed";
    document.addEventListener('readystatechange',function(){
        if (document.readyState == "complete") {
            $.ajax({
              type: 'GET',
              url: "feedURL,
              dataType: 'jsonp',
              success: function(data) {
                var xPost = [];
                for(i=0;i < data['items'].length;i++){
                  if(data['items'][i]['author'] == 'Richard Gates'){
                    xPost[i] = data['items'][i];
                  }
                }
                if(xPost.length > 0){
                  for(i=0;i<1;i++){
                    document.getElementById('latest-title').innerHTML = xPost[i]['title'];
                    document.getElementById('latest-pub').appendChild(document.createTextNode(xPost[i]['pubDate']));
                    document.getElementById('latest-description').innerHTML = xPost[i]['description'];
                  }
                } else {
                  document.getElementById('latest-title').appendChild(document.createTextNode('No post found'));
                }
              }
            });   
        }
    });
})();

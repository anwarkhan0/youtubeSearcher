//display all the videos
function makeList(data) {

    let list = document.getElementById('videosList')
    
    data.map( el  => {

        let cardTag = document.createElement("div");
        cardTag.setAttribute('class', 'video-block text-white border-0 rounded-0 col-md-3 p-1')
        cardTag.setAttribute('onclick', `watchVideo('${el.id.videoId}')`)
        // cardTag.style.width = '18rem'

        let img = document.createElement("IMG")
        img.setAttribute('class', 'card-img-top rounded-0')
        img.setAttribute('src', el.snippet.thumbnails.high.url)

        let cardBody = document.createElement("div")
        cardBody.setAttribute('class', 'card-body')

        let title = document.createElement("h5")
        title.setAttribute('class', 'card-title fw-bold')
        title.innerHTML = el.snippet.title

        let channelTitle = document.createElement("span")
        channelTitle.setAttribute('class', 'm-2')
        channelTitle.innerHTML = el.snippet.channelTitle


        // let watchButton = document.createElement("button")
        // watchButton.setAttribute('class', 'btn btn-sm btn-primary')
        // watchButton.setAttribute('onclick', `watchVideo('${el.id.videoId}')`)
        // watchButton.innerHTML = '<i class="far fa-eye"></i> Watch'

        let downloadButton = document.createElement("a")
        downloadButton.setAttribute('class', 'btn btn-sm btn-info')
        downloadButton.setAttribute('href', `https://www.ssyoutube.com/watch?v=${el.id.videoId}`)
        downloadButton.innerHTML = '<i class="fas fa-download"></i>'

        // let breakLine = document.createElement("br")

        cardBody.appendChild(title)
        cardBody.appendChild(channelTitle)
        // cardBody.appendChild(breakLine)
        // cardBody.appendChild(watchButton)
        cardBody.appendChild(downloadButton)

        cardTag.appendChild(img)
        cardTag.appendChild(cardBody)
        list.appendChild(cardTag)
    })
}

//playvideo
function watchVideo(id){
    let videoPlayer = document.getElementById('videoPlayer')
    videoPlayer.setAttribute('src', 'https://www.youtube.com/embed/' + id)
    videoPlayer.style.display = 'block'
    document.getElementById('closeVideo').style.display = 'block'
}

//close video button handler
function closeVideo(){
    document.getElementById('videoPlayer').style.display = 'none'
    document.getElementById('closeVideo').style.display = 'none'
}

//trigger click event on search button
const input = document.getElementById("query");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("basic-addon2").click();
  }
});


//get search result
async function searchVideo(){
    document.getElementById('videosList').innerHTML = ''
    let q = document.getElementById('query').value;
    await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&videoType=any&maxResults=50&key=AIzaSyDRl09OGFCXF4uaMPen_9ptndoIMdm_4F0`)
    .then(response => response.json())
    .then(data => makeList(data.items) )
}
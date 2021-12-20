// Put your Last.fm API key here
var api_key = "6898188f29dc3468fe6d5bfb3f87699a";

function sendRequest () {
    var artist = encodeURI(document.getElementById("form-input").value);
    get_ArtistInfo(artist,"artist.getinfo");
    get_AlbumInfo(artist,"artist.gettopalbums");
    get_SimilarArtists(artist,"artist.getsimilar");
}

function get_ArtistInfo(artist, method)
{
    var xhr = new XMLHttpRequest();
    var json;
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () 
    {
        if (this.readyState == 4) 
        {
            json = JSON.parse(this.responseText);
            let str = json.artist;
            display_ArtistInfo(str);
        }
    }
    xhr.send(null);
}

function get_AlbumInfo(artist, method)
{
    var xhr = new XMLHttpRequest();
    var json;
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () 
    {
        if (this.readyState == 4) 
        {
            json = JSON.parse(this.responseText);
            let albums = json.topalbums.album;
            display_TopAlbums(albums);
        }
    }

    xhr.send(null);

}


function get_SimilarArtists(artist, method)
{
    var xhr = new XMLHttpRequest();
    var json;
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () 
    {
        if (this.readyState == 4) 
        {
            json = JSON.parse(this.responseText);
            let artists = json.similarartists.artist;
            display_SimilarArtists(artists);
        }
    }
    xhr.send(null);
}

function display_ArtistInfo(str)
{
    document.getElementById("artist-info").innerHTML = `
        <div class="card">
        <br>
        <img src="${str.image[2]['#text']}" style="width: 20rem;" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${str.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${str.bio.published}</h6>
        <p class="card-text">${str.bio.content}</p>
        <a href="${str.url}" class="card-link">${str.url}</a>
        </div>
    </div>
    `;
}

function display_TopAlbums(albums)
{   
    var album_data = "";
    albums.forEach(album => {
        album_data += `
        <div class="card mb-3" style="width: 20rem;">
        <img src="${album.image[3]['#text']}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${album.name}</h5>
        </div>
    </div>
    `
    });
    
    document.getElementById("album-info").innerHTML = album_data;

}
function display_SimilarArtists(artists)
{
    var similarartists= "";
    for(let i=0; i<10; i++)
    {
        similarartists += `
        <li class="list-group-item">${artists[i].name}</li>
        `
    }
    

    var similar_artists_data = `
    <div class="card" style="width: 18rem;">
    <div class="card-header" style="background-color: #D3D3D3;">
    Similar Artists
    </div>
    <ul class="list-group list-group-flush">
    ${similarartists}
    </ul>
</div>
    `
    document.getElementById("similar-artists").innerHTML = similar_artists_data;
}


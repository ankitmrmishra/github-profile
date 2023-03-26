const form = document.getElementById('form')
const search = document.getElementById('search')

const repourl = `https://api.github.com/users//repos?sort=created`
const apiurl = `https://api.github.com/users/ankitmrmishra`;
const userurl = "https://api.github.com/users/";
const box = document.getElementById('box')


githubprofile(apiurl);

async function githubprofile(url){
    box.innerHTML="";
   const fetching  = await fetch(url);
   const resdata = await fetching.json()
   const username = resdata.login;
   
   
   

 if(fetching.status == 404) {
    
        createErrorCard(resdata.message)
        }
        else{
getRepos(username)
       
 
    const div = document.createElement('div')
    div.classList.add("container")
    div.innerHTML = `
   
    <div class="profileimage" id="pfimg">
            <img src="${resdata.avatar_url
            }" alt="" srcset="">
        </div>
        <div class="detials" id="details">
            <h2 id="name">${resdata.name}</h2>
            <h3 id="username" class="username"><a href="http://www.github.com/${resdata.login}" target="_blank" rel="noopener noreferrer">${resdata.login}</a></h3>
            <span class="bio" id="bio">${resdata.bio}</span>
            <div class="dataaboutuser" id="dataaboutuser">
                <div class="followers" id="followers">Followers ${resdata.followers}</div>
                <div class="following" id="following">Following ${resdata.following}</div>
            </div>
            <div id="repos" class="repos" >
           
            </div>
        </div>
        
    `
    

    box.appendChild(div)

        }
   
}

async function getRepos(username) {
 const repofetch = await fetch(userurl + username + "/repos?sort=created" )
   const repodata = await repofetch.json();

    addReposToCard(repodata);
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        
        .slice(0, 5)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}
function createErrorCard(msg) {
    const cardHTML = `
        <div class="container">
            <h1>${msg}</h1>
        </div>
    `

    box.innerHTML = cardHTML
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        githubprofile(userurl + searchTerm);

        search.value = "";
    }
});
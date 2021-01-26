// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Get the ul with id of of userRepos
const ul = document.getElementById('userRepos');

// Get error message paragraph
const errMsg = document.getElementById('errorMsg')

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Clear the ul
    ul.innerHTML = '';
    
    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;          

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername);

})


function requestUserRepos(username){
    
    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;
    
    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);
    
    // When request is received
    // Process it here
    xhr.onload = function() {
    
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        
        // Log the response
        console.log(data);

        // Loop over each object in data array
        for (let i in data) {

            // Create variable that will create li's to be added to ul
            let li = document.createElement('li');

            if (data[i].name == undefined){
                console.log("User does not exist");
                li.innerHTML =  (' <p> Username does not exist <p>');
                ul.appendChild(li);
                li.classList.add('list-group-item')
                return
            } else{
                
            // Log the repo name
            // console.log('Repo:', data[i].name);
            
            /*
            // Log the repo description
            console.log('Description:', data[i].description);
            
            // Log the repo url
            console.log('URL:', data[i].html_url);
            
            // Add a separator between each repo
            console.log('=========================')
            */
    
            
            
            // Add Bootstrap list item class to each li
            li.classList.add('list-group-item')
        
            // Create the html markup for each li
            li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `);
            
            // Append each li to the ul
            ul.appendChild(li);

        }
        
        }
    
    }

    xhr.onerror = function () {
        console.log("** An error occurred during the transaction");
      };
    
    // Send the request to the server
    xhr.send();
    
}


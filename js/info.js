visitCount = localStorage.getItem("page_view");

if (visitCount) {
    visitCount = Number(visitCount) + 1;
    localStorage.setItem("page_view", visitCount);
} else {
    visitCount = 1;
    localStorage.setItem("page_view", 1);
}

// function to get information from github api and display it 
async function getJSON() {
    const response = await fetch('https://api.github.com/repos/nowayitsaj/nowayitsaj.github.io/commits?per_page=1');
    const githubJSON = await response.json();

    // get the first 7 digits of the SHA for the latest commit 
    commitVer = JSON.stringify(githubJSON[0].sha).substring(1,8);

    // get the commit message for the latest commit
    commitMsg = githubJSON[0].commit.message;

    // get the timestamp for the latest commit and convert it into a unix timestamp
    jsonTimestamp = JSON.stringify(githubJSON[0].commit.author.date).substring(1,21);
    unixTimestamp = Date.parse(jsonTimestamp); 

    // get user's timezone in IANA and 3 digit formats 
    timezone = String(Intl.DateTimeFormat().resolvedOptions().timeZone);
    visualTimeZone = new Date(unixTimestamp).toLocaleString('en', {timeZoneName: 'short'}).split(' ').pop();

    // convert the unix timestamp into a date and time
    date = new Date(unixTimestamp);
    hours = date.getHours();
    minutes = "0" + date.getMinutes();
    seconds = "0" + date.getSeconds();

    // display all of the info on the website
    document.getElementById('visits').innerHTML = visitCount;
    document.getElementById('commit').innerHTML = commitVer + ' "' + commitMsg + '"';
    document.getElementById('date').innerHTML = date.toLocaleString("en-CA", { timeZone: timezone } ) + " (" + visualTimeZone + ")";
};

// run the function
getJSON();
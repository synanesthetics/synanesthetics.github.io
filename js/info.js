async function getJSON() {
    const response = await fetch('https://api.github.com/repos/nowayitsaj/nowayitsaj.github.io/commits?per_page=1');
    const githubJSON = await response.json();

    // get the first 7 digits of the SHA for the latest commit 
    commitVer = JSON.stringify(githubJSON[0].sha).substring(1,8);

    // get the commit message for the latest commit
    commitMsg = githubJSON[0].commit.message;

    // get user's timezone in IANA and 3 digit formats 
    timezone = String(Intl.DateTimeFormat().resolvedOptions().timeZone);
    visualTimeZone = new Date(unixTimestamp).toLocaleString('en', {timeZoneName: 'short'}).split(' ').pop();

    // get the timestamp for the latest commit and convert it into a unix timestamp
    jsonTimestamp = JSON.stringify(githubJSON[0].commit.author.date).substring(1,21);
    unixTimestamp = Date.parse(jsonTimestamp); 

    // convert the unix timestamp into a date and time
    date = new Date(unixTimestamp);
    hours = date.getHours();
    minutes = "0" + date.getMinutes();
    seconds = "0" + date.getSeconds();

    document.getElementById('commit').innerHTML = commitVer + ' "' + commitMsg + '"';
    document.getElementById('date').innerHTML = date.toLocaleString("en-CA", { timeZone: timezone } ) + " (" + visualTimeZone + ")";
};

getJSON();
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
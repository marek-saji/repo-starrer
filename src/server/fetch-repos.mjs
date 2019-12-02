import fetch from 'node-fetch';

const URL = 'https://api.github.com/search/repositories?q=created:%3E{date}&sort=stars&order=desc';

async function fetchRepos (date) {
    // TODO Cache
    // TODO Pagination
    const response = await fetch(URL.replace('{date}', date.toISOString().split('T')[0]));
    return response.json();
}

export default fetchRepos;

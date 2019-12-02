import { getFavs, addFav, removeFav } from './fav.js';

const FAV_CHECKBOX_LABEL = 'Favourite';

function createStarrer (repo, favs)
{
    const repoId = Number(repo.dataset.repoId);
    const starrerInput = document.createElement('input');
    starrerInput.name = `star${repoId}`;
    starrerInput.className = 'repo__starrerInput';
    starrerInput.type = 'checkbox';
    starrerInput.checked = favs.has(repoId);
    starrerInput.setAttribute('data-component', 'starrer');
    const starrer = document.createElement('label');
    starrer.className = 'repo__starrer';
    const starrerLabel = document.createElement('span');
    starrerLabel.className = 'repo__starrerLabel';
    starrerLabel.textContent = FAV_CHECKBOX_LABEL;
    starrer.appendChild(starrerInput);
    starrer.appendChild(starrerLabel);

    return starrer;
}

function initStarrers ()
{
    const favs = getFavs();
    const repos = document.querySelectorAll('[data-repo]');
    for (const repo of repos)
    {
        if (!repo.dataset.repoInitialized)
        {
            const starrer = createStarrer(repo, favs);
            // TODO Different placement
            repo.appendChild(starrer);
        }
    }
}

function handleRepoListClick (event)
{
    const input = event.target;
    if (input.dataset.component !== 'starrer')
    {
        return;
    }
    event.stopPropagation();
    const repo = input.closest('[data-repo]');
    const repoData = JSON.parse(repo.dataset.repo);
    if (input.checked)
    {
        addFav(repoData);
    }
    else
    {
        removeFav(repoData);
    }
}

if (window.navigator && window.navigator.serviceWorker)
{
    window.navigator.serviceWorker.register('/service-worker.js');
}

window.addEventListener('load', () => {
    initStarrers();
    document.getElementById('repoList').addEventListener('click', handleRepoListClick);
});

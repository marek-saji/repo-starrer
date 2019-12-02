const STORAGE_KEY = 'favourites';

/** @returns Map */
function getFavs ()
{
    const value = localStorage.getItem(STORAGE_KEY) || '[]';
    return new Map(JSON.parse(value));
}

/** @param Map favs */
function storeFavs (favs)
{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favs.entries())));
}

function addFav (repo)
{
    const favs = getFavs();
    favs.set(repo.id, repo);
    storeFavs(favs);
}

function removeFav (repo)
{
    const favs = getFavs();
    favs.delete(repo.id, repo);
    storeFavs(favs);
}


export {
    getFavs,
    addFav,
    removeFav,
};

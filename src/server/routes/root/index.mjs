import escape from '../../../../static/escape-html';
import renderItem from '../../../../static/render-item';

import fetchRepos from '../../fetch-repos';

async function routeRoot (req, res) {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const data = await fetchRepos(date); // TODO Handle network errors
    // TODO Check if response has data
    res.render('index', {
        locals: {
            itemsTotal: data.total_count,
            items: data.items.map(item => ({
                id: parseInt(item.id, 10),
                url: escape(item.html_url),
                name: escape(item.name),
                description: escape(item.description),
                homepage: item.homepage && (item.homepage !== item.html_url) ? escape(item.homepage) : null,
                starCount: parseInt(item.stargazers_count, 10),
                ownerUrl: escape(item.owner.html_url),
                ownerName: escape(item.owner.login),
                ownerAvatarUrl: escape(item.owner.avatar_url),
            })),
            renderItem,
        },
        partials: {
            list: 'repo/list',
        },
    });
}

export default routeRoot;

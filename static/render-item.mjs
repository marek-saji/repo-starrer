import escape from './escape-html.mjs';

function renderItem (item)
{
    return `
        <li class="repoList__item">
          <article
            class="repo"
            data-repo-id="${item.id}"
            data-repo="${escape(JSON.stringify(item))}"
          >
            <header>
              <h2 class="repo__heading">
                <a
                  href="${item.url}"
                  rel=noopener
                  class="repo__name"
                >${item.name}</a>
              </h2>
              <ul class="attributesList">
                <li class="attributesList__item">
                  by
                  <a
                    href="${item.ownerUrl}"
                    rel=noopener
                    class="h-card repo__owner"
                  >${
                    // FIXME &size || ?size
                    `<img
                      src="${item.ownerAvatarUrl}&size=64"
                      lazyload="1"
                      loading="lazy"
                      alt=""
                      role="presentation"
                      class="u-photo repo__ownerAvatar"
                      width="24"
                      height="24"
                    />`
                    + item.ownerName
                  }</a>
                </li>
                <li class="attributesList__item">
                  ${item.starCount} stars
                </li>
              </ul>
            </header>
            ${item.description === null ? '' : `
              <p class="repo__description">
                ${item.description}
              </p>
            `}
            ${item.homepage == null ? '' : `
              <a
                  href=${item.homepage}
                  rel=noopener
                  class="repo__homepage"
              >
                ${item.homepage}
              </a>
            `}
          </article>
        </li>
    `;
}

export default renderItem;

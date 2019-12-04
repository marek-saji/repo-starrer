import React from 'react';
import FavCheckboxPlaceholder from '../FavCheckboxPlaceholder';
import '../Repo/style.css';
import '../../../components/placeholder.css';

function RepoPlaceholder ()
{
    return (
        <article className="repo repo--loading">
            <h2 className="repo__heading placeholder">
        &nbsp;
            </h2>
            <ul className="attributesList">
                <li className="attributesList__item">
                    <span className="placeholder">
              by
                    </span>
                    {' '}
                    <span className="repo__owner">
                        <span className="repo__ownerAvatar placeholder">
                  &nbsp;
                        </span>
                        <span className="placeholder placeholder--inline">&nbsp;</span>
                    </span>
                </li>
                <li className="attributesList__item">
                    <span className="placeholder placeholder--inline">&nbsp;</span>
                </li>
            </ul>
            <p className="repo__description placeholder">
        &nbsp;
            </p>
            <span className="repo__homepage placeholder">
        &nbsp;
            </span>
            <FavCheckboxPlaceholder />
        </article>
    );
}

export default RepoPlaceholder;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withLoading from '../../../withLoading';
import Placeholder from '../RepoPlaceholder';
import FavCheckbox from '../../components/FavCheckbox';
import './style.css';

const AVATAR_SIZE = 64;

class Repo extends Component
{
  static propTypes = {
      id: PropTypes.number.isRequired,
      favourite: PropTypes.bool.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      homepage: PropTypes.string,
      language: PropTypes.string,
      starCount: PropTypes.number.isRequired,
      ownerUrl: PropTypes.string.isRequired,
      ownerName: PropTypes.string.isRequired,
      ownerAvatarUrl: PropTypes.string.isRequired,
  };

  static getSizedAvatarUrl (avatarUrl)
  {
      const url = new URL(avatarUrl);
      url.searchParams.set('size', AVATAR_SIZE);
      return url.href;
  }

  render ()
  {
      const homepage = this.props.homepage === this.props.url ? null : this.props.homepage;

      return (
          <article className="repo">
              <h2 className="repo__heading">
                  <a
                      href={this.props.url}
                      rel="noopener"
                  >
                      {this.props.name}
                  </a>
              </h2>
              <ul className="attributesList">
                  <li className="attributesList__item">
              by{' '}
                      <a
                          href={this.props.ownerUrl}
                          rel="noopener"
                          className="h-card repo__owner"
                      >
                          <img
                              src={this.constructor.getSizedAvatarUrl(this.props.ownerAvatarUrl)}
                              alt=""
                              role="presentation"
                              width="32"
                              height="32"
                              className="u-photo repo__ownerAvatar"
                          />
                          {this.props.ownerName}
                      </a>
                  </li>
                  <li className="attributesList__item">
                      {this.props.starCount} stars
                  </li>
                  <li className="attributesList__item">
                      {this.props.language}
                  </li>
              </ul>
              {!this.props.description ? null : (
                  <p className="repo__description">
                      {this.props.description}
                  </p>
              )}
              {!homepage ? null : (
                  <a
                      href={homepage}
                      rel="noopener"
                      className="repo__homepage"
                  >
                      {homepage}
                  </a>
              )}
              <FavCheckbox
                  name={`repo${this.props.id}`}
                  checked={this.props.favourite}
                  onChange={this.props.toggleFavourite}
              />
          </article>
      );
  }
}

export default withLoading(Repo, Placeholder);

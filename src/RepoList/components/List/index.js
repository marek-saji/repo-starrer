import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withLoading from '../../../withLoading';
import Placeholder from '../ListPlaceholder';
import './style.css';

class RepoList extends Component
{
  static propTypes = {
    // TODO Pagination
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
    children: PropTypes.func.isRequired,
  };

  render ()
  {
    /* TODO LanguageSelect
    const languages = Array.from(this.props.items.reduce(
      (carry, { language }) => {
        if (language)
        {
          carry.add(language);
        }
        return carry;
      },
      new Set()
    ).values()).sort();
        <select>
          <option value="*">All</option>
          {languages.map(lang => <option>{lang}</option>)}
        </select>
      */

    return (
      <Fragment>
        <ol className="repoList">
          {this.props.items.map(item => (
            <li key={item.id} className="repoList__item">
              {this.props.children(item)}
            </li>
          ))}
        </ol>
      </Fragment>
    );
  }
}

export { RepoList };
export default withLoading(RepoList, Placeholder);

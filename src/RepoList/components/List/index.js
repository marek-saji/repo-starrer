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

  state = {
    language: '',
  };

  getLanguages ()
  {
    const langsSet = this.props.items.reduce(
      (carry, { language }) => {
        if (language)
        {
          carry.add(language);
        }
        return carry;
      },
      new Set()
    );
    if (this.state.language)
    {
      langsSet.add(this.state.language);
    }

    return Array.from(langsSet.values()).sort();
  }

  handleLanguageChange = event => {
    this.setState({ language: event.target.value });
  };

  render ()
  {
    const { language } = this.state;
    const languages = this.getLanguages();

    let filteredItems = this.props.items;
    if (language !== '')
    {
      filteredItems = filteredItems.filter(item => item.language === language );
    }

    // FIXME Filtering should look different
    //       - Changing language should change URL
    //       - Filter should be in a parent component that renders
    //         filters and RepoList or EmptyList with proper message
    //         (e.g. No repositories with chosen language)
    return (
      <Fragment>
        <div className="repoList__filters">
          <select
            value={language}
            onChange={this.handleLanguageChange}
            aria-label="Show only repositories written in"
            className="repoList__langChooser"
          >
            <option key="" value="">
              All languages
            </option>
            {languages.map(lang => (
              <option key={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <ol className="repoList">
          {filteredItems.map(item => (
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

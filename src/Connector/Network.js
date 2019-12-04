import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toIsoDate } from '../utils/format-date';

const URL = 'https://api.github.com/search/repositories?q=created:%3E{date}&sort=stars&order=desc';

class NetworkConnector extends PureComponent
{
  static propTypes = {
      since: PropTypes.instanceOf(Date).isRequired,
      children: PropTypes.func.isRequired,
  };

  state = {
      loading: true,
      error: null,
      items: [],
  };

  abortController = new global.AbortController();

  componentDidMount ()
  {
      this.fetch();
  }

  componentWillUnmount ()
  {
      this.abortController.abort();
  }

  static mapItem (item)
  {
      return {
          id: item.id,
          url: item.html_url,
          name: item.name,
          description: item.description,
          homepage: item.homepage,
          language: item.language,
          starCount: item.stargazers_count,
          ownerUrl: item.owner.html_url,
          ownerName: item.owner.login,
          ownerAvatarUrl: item.owner.avatar_url,
      };
  }

  async fetch ()
  {
      // TODO Caching
      const { signal } = this.abortController;
      try
      {
          const response = await global.fetch(this.getUrl(), { signal });
          const data = await response.json();
          if (signal.aborted) {
              return;
          }
          this.setState({
              loading: false,
              items: data.items.map(this.constructor.mapItem),
          });
      }
      catch (error)
      {
          if (signal.aborted) {
              return;
          }
          this.setState({
              loading: false,
              error,
          });
          return;
      }
  }

  getUrl ()
  {
      return URL.replace('{date}', toIsoDate(this.props.since));
  }

  render ()
  {
      return this.props.children({
          loading: this.state.loading,
          error: this.state.error,
          items: this.state.items,
      });
  }
}

export default NetworkConnector;

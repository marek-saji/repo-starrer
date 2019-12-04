import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import storage from '../storage';

const CACHE_KEY = 'items';

class StoreConnector extends PureComponent
{
  static propTypes = {
      favourite: PropTypes.bool,
      children: PropTypes.func.isRequired,
  };

  static defaultProps = {
      favourite: null,
  }

  // Used for cancelling asyncronous jobs
  mounted;

  state = {
      loading: true,
      items: new Map(),
  };

  componentDidMount ()
  {
      this.mounted = true;
      this.restore();
  }

  componentWillUnmount ()
  {
      this.mounted = false;
  }

  static async getStoreValue ()
  {
      const itemsJson = await storage.getItem(CACHE_KEY);
      if (!itemsJson)
      {
          return new Map();
      }

      let items;
      try
      {
          items = JSON.parse(itemsJson);
      }
      catch (error)
      {
          console.error('Error while parsing stored items', error);
          return new Map();
      }

      try
      {
          return new Map(items);
      }
      catch (error)
      {
          console.error('Error while creating map from stored array', error);
          return new Map();
      }
  }

  static async setStoreValue (items)
  {
      await storage.setItem(
          CACHE_KEY,
          JSON.stringify([...items.entries()])
      );
  }

  async restore ()
  {
      const items = await this.constructor.getStoreValue();
      if (!this.mounted)
      {
          return;
      }

      this.setState({
          loading: false,
          items,
      });
  }

  getItem = id => {
      return this.state.items.get(id);
  };

  setItem = (id, item) => {
      const entries = Array.from(this.state.items.entries());
      const items = new Map([ ...entries, [id, item] ]);
      this.setState({ items });
      this.constructor.setStoreValue(items);
  };

  removeItem = id => {
      const entries = Array.from(this.state.items.entries());
      const items = new Map([ ...entries.filter(([itemId]) => itemId !== id) ]);
      this.setState({ items });
      this.constructor.setStoreValue(items);
  };

  isItemFavourite = item => {
      const storedItem = this.getItem(item.id);
      if (!storedItem)
      {
          return false;
      }
      return storedItem.favourite;
  };

  toggleItemFavourite = item => {
      if (item.favourite)
      {
          this.removeItem(item.id);
      }
      else
      {
          this.setItem(item.id, {
              ...item,
              favourite: true,
          });
      }
  };

  render ()
  {
      const { favourite } = this.props;
      let items = [...this.state.items.values()];
      if (favourite !== null) {
          items = items.filter(item => item.favourite === favourite);
      }
      items.sort((a, b) => b.starCount - a.starCount);

      return this.props.children({
          loading: this.state.loading,
          items,
          isItemFavourite: this.isItemFavourite,
          toggleItemFavourite: this.toggleItemFavourite,
      });
  }
}

export default StoreConnector;

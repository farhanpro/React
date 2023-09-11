import React, { Component } from 'react';

class ShoppingApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [],
      newItem: '',
      itemToDelete: '',
      searchItem: '',
      message: '',
    };
  }

  // Add item to shopping list
  addItem = () => {
    const { newItem, shoppingList } = this.state;
    if (newItem.trim() === '') {
      this.setState({ message: 'Please enter an item to add.' });
      return;
    }

    this.setState({
      shoppingList: [...shoppingList, newItem],
      newItem: '',
      message: '',
    });
  };

  // Remove item from shopping list
  removeItem = () => {
    const { itemToDelete, shoppingList } = this.state;
    if (itemToDelete.trim() === '') {
      this.setState({ message: 'Please enter an item to delete.' });
      return;
    }

    const updatedList = shoppingList.filter(
      (item) => item.toLowerCase() !== itemToDelete.toLowerCase()
    );

    if (updatedList.length === shoppingList.length) {
      this.setState({ message: 'Item not found in the shopping list.' });
    } else {
      this.setState({
        shoppingList: updatedList,
        itemToDelete: '',
        message: '',
      });
    }
  };

  // Search for an item in shopping list
  searchItem = () => {
    const { searchItem, shoppingList } = this.state;
    if (searchItem.trim() === '') {
      this.setState({ message: 'Please enter an item to search.' });
      return;
    }

    if (shoppingList.includes(searchItem)) {
      this.setState({ message: `${searchItem} found in the shopping list.` });
    } else {
      this.setState({ message: `${searchItem} not found in the shopping list.` });
    }
  };

  render() {
    const { shoppingList, newItem, itemToDelete, searchItem, message } = this.state;

    return (
      <div>
        <h1>Shopping Cart</h1>
        <div>
          <h2>Add Items</h2>
          <input
            type="text"
            placeholder="Enter item"
            value={newItem}
            onChange={(e) => this.setState({ newItem: e.target.value })}
          />
          <button onClick={this.addItem}>Add</button>
        </div>

        <div>
          <h2>Remove Items</h2>
          <input
            type="text"
            placeholder="Enter item to remove"
            value={itemToDelete}
            onChange={(e) => this.setState({ itemToDelete: e.target.value })}
          />
          <button onClick={this.removeItem}>Delete/Remove</button>
        </div>

        <div>
          <h2>Search Items</h2>
          <input
            type="text"
            placeholder="Enter item to search"
            value={searchItem}
            onChange={(e) => this.setState({ searchItem: e.target.value })}
          />
          <button onClick={this.searchItem}>Search</button>
        </div>

        <div>
          <h2>Shopping List</h2>
          <ul>
            {shoppingList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {message && <p>{message}</p>}
      </div>
    );
  }
}

export default ShoppingApp;

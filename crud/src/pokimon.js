import React, { Component } from 'react';

class ItemCRUD extends Component {
  state = {
    items: [],
    newItem: {
      name: '',
    },
    editingItemId: null, // To track the item being edited
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://localhost:3001/items')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: data });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newItem: {
        ...prevState.newItem,
        [name]: value,
      },
    }));
  };

  addItem = () => {
    fetch('http://localhost:3001/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newItem),
    })
      .then(() => {
        this.fetchData();
        this.setState({
          newItem: {
            name: '',
          },
        });
      })
      .catch((error) => console.error('Error adding item:', error));
  };

  editItem = (id) => {
    // Set the editingItemId state to the selected item's ID
    this.setState({ editingItemId: id });
  };

  updateItem = (id, updatedItem) => {
    fetch(`http://localhost:3001/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then(() => {
        this.fetchData();
        this.setState({ editingItemId: null }); // Reset editingItemId
      })
      .catch((error) => console.error('Error updating item:', error));
  };

  cancelEdit = () => {
    // Cancel the edit by resetting editingItemId
    this.setState({ editingItemId: null });
  };

  deleteItem = (id) => {
    fetch(`http://localhost:3001/items/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        this.fetchData();
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  render() {
    const { items, newItem, editingItemId } = this.state;

    return (
      <div>
        <h1>CRUD Application</h1>

        <div>
          <h2>Add an Item</h2>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={this.handleInputChange}
          />
          <button onClick={this.addItem}>Add Item</button>
        </div>

        <div>
          <h2>Items</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {editingItemId === item.id ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={item.name}
                      onChange={(e) => this.handleInputChange(e, item.id)}
                    />
                    <button onClick={() => this.updateItem(item.id, item)}>Save</button>
                    <button onClick={this.cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    {item.name}
                    <button onClick={() => this.editItem(item.id)}>Edit</button>
                    <button onClick={() => this.deleteItem(item.id)}>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ItemCRUD;

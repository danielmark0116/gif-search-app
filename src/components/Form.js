Form = React.createClass({
  getInitialState: function() {
    return {
      searchField: ''
    };
  },

  handleChange: function(e) {
    this.setState({
      [e.target.name]: e.target.value
    });

    let searchField = this.state.searchField;

    if (searchField.length > 2) {
      this.props.onSearch(searchField);
    }
  },

  handleKeyUp: function(event) {
    let searchField = this.state.searchField;

    if (event.keyCode === 13) {
      this.props.onSearch(searchField);
    }
  },

  render: function() {
    return (
      <div className="container">
        <div className="app-form">
          <div className="input-group">
            <div className="input-icon">
              <img src="src/images/search.svg" alt="" />
            </div>
            <div className="input">
              <input
                type="text"
                autoComplete="off"
                name="searchField"
                value={this.state.searchField}
                placeholder="Search for your fav GIF and press ENTER to reload"
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

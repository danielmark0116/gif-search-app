const giphyUrl = 'https://api.giphy.com/v1/gifs/random?api_key=';
const giphyKey = 'Zrmd1zRa5KOTGx8EeGP50dxBQrVeIX0Z';

const MyApp = React.createClass({
  displayName: 'MyApp',

  getInitialState: function() {
    return {
      loading: false,
      gifData: {
        url: null,
        srcUrl: null,
        fetchError: false,
        errorMsg: null
      }
    };
  },

  fetchGif: (inputValue, callback) => {
    const url = giphyUrl + giphyKey + '&tag=' + inputValue;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        let gifObject = {
          url: res.data.fixed_width_downsampled_url,
          srcUrl: res.data.url,
          fetchError: false,
          errorMsg: null
        };

        callback(gifObject);
      })
      .catch(err => {
        let gifObject = {
          url: null,
          srcUrl: null,
          fetchError: true,
          errorMsg: err
        };

        callback(gifObject);
      });
  },

  handleSearch: function(inputValue) {
    if (inputValue.length < 3) {
      this.setState({
        loading: false,
        gifData: {
          url: null,
          srcUrl: null,
          fetchError: false,
          errorMsg: null
        }
      });
      return null;
    }
    this.setState({
      loading: true
    });
    this.fetchGif(
      inputValue,
      function(data) {
        if (data.fetchError) {
          this.setState({
            gifData: data,
            loading: false
          });
        } else {
          this.setState({
            gifData: data,
            loading: false
          });
        }
      }.bind(this)
    );
  },

  render: function() {
    return React.createElement(
      'main',
      null,
      React.createElement(Background, null),
      React.createElement(Header, null),
      React.createElement(Form, { onSearch: this.handleSearch }),
      React.createElement(
        'div',
        { className: 'container flex' },
        React.createElement(Output, {
          error: this.state.gifData.fetchError,
          loading: this.state.loading,
          gifData: this.state.gifData
        })
      ),
      React.createElement(Footer, null)
    );
  }
});

const app = React.createElement(MyApp);

ReactDOM.render(app, document.getElementById('app'));

const giphyUrl = 'http://www.api.giphy.com/v1/gifs/random?api_key=';
const giphyKey = 'Zrmd1zRa5KOTGx8EeGP50dxBQrVeIX0Z';

// GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;

// api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5

const MyApp = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      gifData: null
    };
  },

  fetchGif: function(inputValue, callback) {
    var url =
      'http://api.giphy.com/v1/gifs/random?api_key=' +
      giphyKey +
      '&tag=' +
      inputValue;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        let gifObject = {
          url: res.data.fixed_width_downsampled_url,
          srcUrl: res.data.url
        };
        callback(gifObject);
      });
  },

  handleSearch: function(inputValue) {
    this.setState({
      loading: true
    });
    this.fetchGif(
      inputValue,
      function(data) {
        console.log(data);
        this.setState({
          gifData: data,
          loading: false
        });
      }.bind(this)
    );
  },

  render: function() {
    return (
      <main>
        <Background />
        <Header />
        <Form onSearch={this.handleSearch} />
        <div className="container flex">
          <Output loading={this.state.loading} gifData={this.state.gifData} />
        </div>
      </main>
    );
  }
});

const app = React.createElement(MyApp);

ReactDOM.render(app, document.getElementById('app'));

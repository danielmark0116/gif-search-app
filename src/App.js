const giphyUrl = 'https://api.giphy.com/v1/gifs/random?api_key=';
const giphyKey = 'Zrmd1zRa5KOTGx8EeGP50dxBQrVeIX0Z';

const MyApp = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      gifData: null
    };
  },

  fetchGif: function(inputValue, callback) {
    var url = giphyUrl + giphyKey + '&tag=' + inputValue;
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
        <Footer />
      </main>
    );
  }
});

const app = React.createElement(MyApp);

ReactDOM.render(app, document.getElementById('app'));

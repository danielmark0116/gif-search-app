const giphyUrl = 'https://api.giphy.com/v1/gifs/random?api_key=';
const giphyKey = 'Zrmd1zRa5KOTGx8EeGP50dxBQrVeIX0Z';

function getGifs(sourceUrl) {
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    request.onload = function() {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    request.onerror = function() {
      reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
    };
    request.open('GET', sourceUrl);
    request.send();
  });
}

const MyApp = React.createClass({
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

    getGifs(url)
      .then(res => JSON.parse(res))
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
    return (
      <main>
        <Background />
        <Header />
        <Form onSearch={this.handleSearch} />
        <div className="container flex">
          <Output
            error={this.state.gifData.fetchError}
            loading={this.state.loading}
            gifData={this.state.gifData}
          />
        </div>
        <Footer />
      </main>
    );
  }
});

const app = React.createElement(MyApp);

ReactDOM.render(app, document.getElementById('app'));

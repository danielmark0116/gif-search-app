Output = React.createClass({
  render: function() {
    if (this.props.error) return <ErrorHandler />;
    if (this.props.loading) return <Loading />;
    if (this.props.gifData.url === null) return null;
    return (
      <div className="gif-outcome">
        <div className="gif-item">
          <a href={this.props.gifData.srcUrl} target="_blank">
            <img src={this.props.gifData.url} alt="" />
          </a>
        </div>
      </div>
    );
  }
});

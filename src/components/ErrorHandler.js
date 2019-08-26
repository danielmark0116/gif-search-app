ErrorHandler = React.createClass({
  render: function() {
    return (
      <div className="container">
        <p className="error-msg">Upss...</p>
        <p className="error-sub">
          Could not download data. Try again in a few minutes
        </p>
      </div>
    );
  }
});

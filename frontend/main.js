"use strict";

function MainElement() {
    return (
      <h1>Not and IMDB</h1>
    );
  }

const domContainer = document.querySelector("#root");
ReactDOM.render(<MainElement />, domContainer);
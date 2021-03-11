import React, { createRef } from "react";
import ReactDOM from "react-dom";

import { Sticky } from "semantic-ui-react";

import TitleBar from "./components/titlebar";
import Engagements from "./components/engagements";

import "./index.css";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  contextRef = createRef();
  state = {
    error: null,
    isLoaded: false,
    items: []
  };
  apiBaseURL = "http://18.222.7.110:3000/api";
  numEventColumns = 4;

  getAllEvents() {}

  getAttractionSlots() {}

  getAllEngagements() {
    // Get current attractions
    fetch(this.apiBaseURL + "/attractions")
      .then(res => res.json())
      .then(
        (res) => {
          console.log("Response:", res.data);
          this.setState({isLoaded: true, items: res.data});
        },
        (err) => {
          this.setState({isLoaded: true, err});
        }
      );
  }

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      this.getAllEngagements();
    }

    return (
      <div ref={this.contextRef}>
        {/* TODO: Resolve bounce when scrolling */}
        <Sticky context={this.contextRef}>
          <TitleBar />
          <Engagements {...this.state} />
        </Sticky>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

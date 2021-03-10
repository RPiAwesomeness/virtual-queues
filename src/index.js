import React, { createRef } from "react";
import ReactDOM from "react-dom";

import { Sticky, Card, Loader, Dimmer } from "semantic-ui-react";

import TitleBar from "./components/titlebar";
import Attraction from "./components/attraction";

import "./index.css";
import "semantic-ui-css/semantic.min.css";

import christmas from "./images/christmas.jpg";

class App extends React.Component {
  contextRef = createRef();
  state = { active: false, engagements: [] };

  constructor(props) {
    super(props);
    fetch("http://18.222.7.110:3000/api/engagements")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({ active: true, engagements: result.data });
        },
        (err) => console.error(err)
      );
  }

  render() {
    if (!this.state.active) {
      return (
        <div ref={this.contextRef}>
          <Dimmer active={this.state.active} page={true}>
            <Loader />
          </Dimmer>
        </div>
      );
    } else {
      return (
        <div ref={this.contextRef}>
          {/* TODO: Resolve bounce when scrolling */}
          <Sticky context={this.contextRef}>
            <TitleBar />
          </Sticky>
          <Card.Group>
            <Attraction
              name="Christmas Train"
              description="Ride on a train choo choo!"
              isActive={false}
              available={0}
              maxAvailable={20}
              image={christmas}
            />
            {this.state.engagements.map((ev, i) => {
              return <Attraction key={i} />;
            })}
          </Card.Group>
        </div>
      );
    }
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

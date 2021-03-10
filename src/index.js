import React, { createRef } from "react";
import ReactDOM from "react-dom";

import { Sticky, Grid, Dimmer, Loader, Segment, Placeholder } from "semantic-ui-react";

import TitleBar from "./components/titlebar";
import Attraction from "./components/attraction";

import "./index.css";
import "semantic-ui-css/semantic.min.css";

import christmas from "./images/christmas.jpg";

class App extends React.Component {
  contextRef = createRef();
  state = { active: false, engagements: [] };
  apiBaseURL = "http://18.222.7.110:3000/api";

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  getAllEvents() {}

  getAttractionSlots() {}

  getAllEngagements() {
    // Get current attractions
    fetch(this.apiBaseURL + "/engagements")
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({isLoaded: true, items: res.data})
        },
        (err) => {
          this.setState({isLoaded: true, err});
        }
      );
  }

  renderEngagements() {
    const { error, isLoaded, items } = this.state;

    if (!isLoaded) {
      return (<Grid>
        <Grid.Column>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length='medium' />
                <Placeholder.Line length='short' />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      </Grid>);
    }

    return (
      <Grid stackable columns={4}>
        <Grid.Column>
          <Attraction
            name="Christmas Train"
            description="Ride on a train choo choo!"
            isActive={false}
            available={0}
            maxAvailable={20}
            imageURL={christmas} />
        </Grid.Column>
        <Grid.Column>
          <Attraction
            name="Christmas Train"
            description="Ride on a train choo choo!"
            isActive={true}
            available={1}
            maxAvailable={20}
            imageURL={christmas} />
        </Grid.Column>
        <Grid.Column>
          <Attraction
            name="Christmas Train"
            description="Ride on a train choo choo!"
            isActive={true}
            available={2}
            maxAvailable={20}
            imageURL={christmas} />
        </Grid.Column>
        <Grid.Column>
          <Attraction
            name="Christmas Train"
            description="Ride on a train choo choo!"
            isActive={true}
            available={3}
            maxAvailable={20}
            imageURL={christmas} />
        </Grid.Column>
      </Grid>
    );
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      setTimeout(() => this.getAllEngagements(), 5000);

      return (
        <div ref={this.contextRef}>
          {/* TODO: Resolve bounce when scrolling */}
          <Dimmer active>
            <Loader>
              Loading...
            </Loader>
          </Dimmer>
        </div>
      );
    } else {
      // It's loaded
      return (
        <div ref={this.contextRef}>
          {/* TODO: Resolve bounce when scrolling */}
          <Sticky context={this.contextRef}>
            <TitleBar />
            {this.renderEngagements()}
          </Sticky>
        </div>
      );
    }
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import { Button, Header, Icon } from "semantic-ui-react";

export default class TitleBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleProfileClick = props.onProfileClick;

    this.style = {
      display: "flex",
      justifyContent: "space-between",
      background: "#053864",
      padding: "20px",
      color: "white",
      overflow: "hidden",
    };
  }

  onHelpClicked() {
    alert("foo");
  }

  render() {
    return (
      <header style={this.style}>
        <div id="nav-buttons">
          <Button icon circular size="big" onClick={this.onHelpClicked}>
            <Button.Content visible>
              <Icon fitted name="question circle outline" />
            </Button.Content>
          </Button>
          <Button icon circular size="big" onClick={this.handleProfileClick}>
            <Button.Content visible>
              <Icon fitted name="user outline" />
            </Button.Content>
          </Button>
        </div>
        <Header as="h2" content="CU Events" subheader="Virtual Queues" />
      </header>
    );
  }
}

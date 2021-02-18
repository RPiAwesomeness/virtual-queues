import React from "react";
import { Button, Header, Icon } from "semantic-ui-react";

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      width: "100%",
      minHeight: "10vh",
      display: "flex",
      justifyContent: "space-between",
      background: "#053864",
      padding: "20px",
      color: "white",
      position: "fixed",
      overflow: "hidden"
    }
  }

  onHelpClicked() {
    alert("foo");
  }

  render() {
    return (
      <div style={this.style}>
        <Button size="huge" animated="vertical" onClick={this.onHelpClicked}>
          <Button.Content hidden>Help</Button.Content>
          <Button.Content visible>
            <Icon name="question circle outline" />
          </Button.Content>
        </Button>
        <Header as="h2" content="CU Events" subheader="Virtual Queues" />
      </div>
    );
  }
}

export { TitleBar as default };

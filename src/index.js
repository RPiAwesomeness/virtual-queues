import React, { createRef } from "react";
import ReactDOM from "react-dom";

import { Sticky, Card } from "semantic-ui-react";

import TitleBar from "./components/titlebar";
import Attraction from "./components/attraction";

import "./index.css";
import "semantic-ui-css/semantic.min.css";

import christmas from "./images/christmas.jpg";

class App extends React.Component {
  contextRef = createRef();

  render() {
    fetch("http://18.222.7.110:3000/api/engagements")
      .then((res) => res.json())
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );

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
          <Attraction
            name="Christmas Train"
            description="Ride on a train choo choo!"
            isActive={true}
            available={1}
            maxAvailable={20}
            image={christmas}
          />
          <Attraction
            name="Christmas Train"
            description="Ride on a train choo choo!"
            isActive={true}
            available={2}
            maxAvailable={20}
            image={christmas}
          />
          <Attraction
            name="Christmas Train"
            description="Ride on a train choo choo!"
            isActive={true}
            available={3}
            maxAvailable={20}
            image={christmas}
          />
          <Attraction
            name="Christmas Train"
            description="Ride on a train choo choo!"
            isActive={true}
            available={4}
            maxAvailable={20}
            image={christmas}
          />
        </Card.Group>
        <p style={{ fontSize: "24pt" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer
          enim neque volutpat ac tincidunt vitae semper quis. Commodo quis
          imperdiet massa tincidunt. Id nibh tortor id aliquet lectus proin nibh
          nisl condimentum. Lorem mollis aliquam ut porttitor leo a diam.
          Ultrices mi tempus imperdiet nulla. Pharetra massa massa ultricies mi
          quis hendrerit. Euismod elementum nisi quis eleifend quam adipiscing.
          Eget aliquet nibh praesent tristique. Nisi lacus sed viverra tellus in
          hac habitasse platea dictumst. Nulla facilisi morbi tempus iaculis
          urna id volutpat lacus laoreet. At erat pellentesque adipiscing
          commodo elit. Auctor eu augue ut lectus. Vulputate odio ut enim
          blandit volutpat maecenas volutpat. Gravida rutrum quisque non tellus.
          Dui accumsan sit amet nulla facilisi morbi tempus iaculis. Sed velit
          dignissim sodales ut eu. Viverra tellus in hac habitasse platea
          dictumst vestibulum rhoncus est. Amet consectetur adipiscing elit ut
          aliquam purus. Enim ut tellus elementum sagittis. Pellentesque
          pulvinar pellentesque habitant morbi tristique senectus et netus et.
          Enim sed faucibus turpis in eu mi. Vestibulum lorem sed risus
          ultricies tristique nulla. Volutpat sed cras ornare arcu dui vivamus.
          In massa tempor nec feugiat nisl pretium fusce. Odio euismod lacinia
          at quis risus. Interdum varius sit amet mattis vulputate enim nulla.
          Sollicitudin nibh sit amet commodo nulla. Scelerisque in dictum non
          consectetur a. Sapien faucibus et molestie ac. Vestibulum rhoncus est
          pellentesque elit ullamcorper dignissim cras tincidunt. Lacus luctus
          accumsan tortor posuere ac. Sagittis purus sit amet volutpat. Urna
          duis convallis convallis tellus id interdum velit laoreet id. Amet est
          placerat in egestas erat imperdiet sed euismod nisi. Et odio
          pellentesque diam volutpat commodo sed egestas egestas fringilla. Et
          molestie ac feugiat sed. Semper eget duis at tellus at urna. Ut
          pharetra sit amet aliquam id. A condimentum vitae sapien pellentesque
          habitant morbi. Pharetra et ultrices neque ornare aenean euismod
          elementum nisi. Amet est placerat in egestas erat imperdiet.
          Pellentesque massa placerat duis ultricies lacus sed. Porta nibh
          venenatis cras sed felis eget velit aliquet sagittis. Gravida arcu ac
          tortor dignissim convallis aenean et tortor. Purus sit amet volutpat
          consequat mauris nunc congue. Massa tempor nec feugiat nisl pretium.
          In massa tempor nec feugiat. Turpis egestas maecenas pharetra
          convallis posuere morbi. Interdum posuere lorem ipsum dolor sit amet
          consectetur adipiscing. Est pellentesque elit ullamcorper dignissim
          cras. Magna fringilla urna porttitor rhoncus dolor. Lorem sed risus
          ultricies tristique nulla aliquet enim tortor at. Ipsum dolor sit amet
          consectetur adipiscing. Duis at consectetur lorem donec massa. Nunc
          vel risus commodo viverra maecenas accumsan lacus vel facilisis. Diam
          quis enim lobortis scelerisque fermentum dui. Arcu dui vivamus arcu
          felis bibendum. Adipiscing commodo elit at imperdiet dui accumsan sit
          amet nulla. Proin libero nunc consequat interdum varius sit amet
          mattis vulputate. Vulputate eu scelerisque felis imperdiet proin
          fermentum. Fames ac turpis egestas sed tempus urna et. Tempus
          imperdiet nulla malesuada pellentesque elit. Dui ut ornare lectus sit.
          Rutrum quisque non tellus orci ac auctor. Curabitur gravida arcu ac
          tortor. Aliquet enim tortor at auctor. Faucibus turpis in eu mi
          bibendum neque egestas congue quisque. Ut lectus arcu bibendum at.
          Fermentum iaculis eu non diam. Pulvinar neque laoreet suspendisse
          interdum consectetur libero id faucibus nisl. Aliquam nulla facilisi
          cras fermentum odio. Morbi leo urna molestie at elementum eu
          facilisis. Malesuada bibendum arcu vitae elementum curabitur vitae.
          Elementum nisi quis eleifend quam adipiscing vitae proin. In hendrerit
          gravida rutrum quisque non tellus orci ac.
        </p>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

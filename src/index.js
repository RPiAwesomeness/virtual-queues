import React, { createRef } from "react";
import ReactDOM from "react-dom";

import { Sticky } from "semantic-ui-react";

import TitleBar from "./components/titlebar";
import Events from "./components/events";
import StudentModal from "./components/studentModal";

import "./index.css";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  contextRef = createRef();
  modalRef = createRef();

  state = {
    error: null,
    loadedAttractions: false,
    loadedSlots: false,
    student: {
      id: -1,
      tickets: {},
    },
    items: {},
    slots: {},
  };
  apiBaseURL = "http://18.222.7.110:3000/api";

  constructor(props) {
    super(props);

    this.showStudentModal = this.showStudentModal.bind(this);
    this.getAttractionSlots = this.getAttractionSlots.bind(this);
    this.getAllAttractions = this.getAllAttractions.bind(this);
  }

  /**
   * Opens the student account modal
   */
  showStudentModal() {
    this.modalRef.current.setState({ open: true });
  }

  getStudentTickets() {
    if (this.state.student.id === -1) {
      // Unable to retrieve tickets for specific user
      return;
    }

    fetch("http://18.222.7.110:3000/api/tickets/")
      .then((res) => res.json())
      .then(
        (res) => {
          // Filter tickets specific to this student
          console.log(res);
        },
        (err) => console.error(err)
      );
  }

  getAttractionSlots() {
    fetch(this.apiBaseURL + "/slots")
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.status !== "success") {
            console.error("Failed to retrieve slots");
            console.error("Error:", res.message);
            return;
          }

          // Reduce array to object with attraction ID as key and all slots
          // for each attraction
          let initVal = {};
          let slots = res.data.reduce(
            (acc, val) => ({
              ...acc,
              [val.attraction_id]: [...(acc[val.attraction_id] || []), val],
            }),
            initVal
          );
          console.debug("Slots:", slots);

          // Update with retrieved slots
          this.setState({
            loadedSlots: true,
            error: "",
            slots: slots,
          });
        },
        (err) => {
          console.error("Failed to retrieve slots");
          console.error(err);
          this.setState({ loadedSlots: true, err: "Failed to load slots" });
        }
      );
  }

  getAllAttractions() {
    // Get current attractions
    fetch(this.apiBaseURL + "/attractions")
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.status !== "success") {
            console.error("Failed to retrieve attractions");
            console.error("Error:", res.message);
            return;
          }

          // Indicate attractions have been loaded
          console.debug("Attractions:", res.data);
          let attractions = res.data.reduce((acc, val) => {
            acc[val._id] = val;
            return acc;
          }, {});
          this.setState({
            loadedAttractions: true,
            items: attractions,
          });
        },
        (err) => {
          console.error("Failed to retrieve attractions");
          console.error(err);
          this.setState({
            loadedAttractions: true,
            error: "Failed to load attractions",
          });
        }
      );
  }

  render() {
    const { error, loadedAttractions, loadedSlots } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!loadedAttractions) {
      this.getAllAttractions();
    } else if (loadedAttractions && !loadedSlots) {
      // Get slots available for attractions based on attraction ID
      this.getAttractionSlots();
    }

    return (
      <div ref={this.contextRef}>
        <StudentModal ref={this.modalRef} />
        {/* TODO: Resolve bounce when scrolling */}
        <Sticky context={this.contextRef}>
          <TitleBar getStudentTickets={this.showStudentModal} />
        </Sticky>
        <Events {...this.state} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

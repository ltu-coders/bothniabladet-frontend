import React from 'react';
import { Link } from "react-router-dom";
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';

/**
 * Component with search results and component for filtering the results
 */
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 1,
      results: [],
      showAlert: true,
      filterTerm: "",
      fromTimestamp: null,
      toTimestamp: null
    };

    this.setFilterTerm = this.setFilterTerm.bind(this)
    this.setFromTimestamp = this.setFromTimestamp.bind(this)
    this.setToTimestamp = this.setToTimestamp.bind(this)
  }

  componentDidMount() {
    // Get the search results from the server
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          this.setState({ results: JSON.parse(xhr.responseText) });
        }
        else {
          alert('There was a problem with the request.');
        }
      }
    };

    if (this.props.match.params.searchTerm)
      xhr.open('GET', `/images?tags=${this.props.match.params.searchTerm}`);
    else {
      xhr.open('GET', `/images`);
    }
    xhr.send();

    // Timer to hide alert
    setTimeout(function () {
      this.setState({ showAlert: false })
    }.bind(this), 2000)
  }

  setFilterTerm(term) {
    this.setState({ filterTerm: term })
  }

  setFromTimestamp(date) {
    this.setState({ fromTimestamp: date })
  }

  setToTimestamp(date) {
    this.setState({ toTimestamp: date })
  }

  render() {
    // Build a list of the cards with a single image
    let cards = this.state.results.map(
      (image) => <ResultCard
        image={image}
        key={image.imageId}
        filterTerm={this.state.filterTerm}
        toTimestamp={this.state.toTimestamp}
        fromTimestamp={this.state.fromTimestamp}
      />);

    let alert = ""
    if (this.state.showAlert) {
      alert = <div className="alert alert-success">Du sökte efter {this.props.match.params.searchTerm}</div>
    }

    return (
      <div className="container">
        {alert}
        <FilterInput setFilterTerm={this.setFilterTerm} setFromTimestamp={this.setFromTimestamp} setToTimestamp={this.setToTimestamp} />
        <section>
          <div className="row">
            {cards}
          </div>
        </section>
      </div>);
  }
}

/**
 * One card with an image
 */
function ResultCard({ image, filterTerm, fromTimestamp, toTimestamp }) {
  let imageDate = new Date(Date.parse(image.dateTime))
  let imageTimestamp = imageDate.getTime()
  let dateString = imageTimestamp === -3600000 ? "" : imageDate.toLocaleDateString()

  // Check filter term if the picture should be shown
  filterTerm = filterTerm.toLowerCase()
  let show = false
  if (image.description.toLowerCase().includes(filterTerm) ||
    image.author.firstName.toLowerCase().includes(filterTerm) ||
    image.author.lastName.toLowerCase().includes(filterTerm) ||
    image.fileName.toLowerCase().includes(filterTerm) ||
    image.location.toLowerCase().includes(filterTerm)) {
    show = true
  }

  if (image.tags.some((t) => t.tagName.toLowerCase().includes(filterTerm))) {
    show = true
  }

  // Check date
  if (fromTimestamp != null && fromTimestamp > imageTimestamp) { show = false }
  if (toTimestamp != null && toTimestamp < imageTimestamp) { show = false }

  if (show) {
    let tags = image.tags.map(t => <span key={t.tagId} className="badge badge-pill badge-info mr-1">{t.tagName}</span>)
    return (
      <div className="col-6 col-md-3 mb-4">
        <div className="card h-100">
          <Link to={"/images/" + image.imageId}>
            <img className="card-img-top" src={'/images/' + image.fileName} alt="Exempel" />
          </Link>
          <div className="card-body">
            <p className="card-text">{image.description}</p>
            <p className="card-text">{tags}</p>
          </div>

          <div className="card-footer">
            <small className="text-muted">{image.author.firstName} {image.author.lastName} {dateString}</small>
          </div>
        </div>
      </div>)
  }
  return null
}

/**
 * Component where user can select filter
 */
class FilterInput extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    if (event.target.id === "searchTerm") {
      this.props.setFilterTerm(event.target.value.trim())
    }
    if (event.target.id === "toDate") {
      this.props.setToTimestamp(event.target.valueAsDate)

    }
    if (event.target.id === "fromDate") {
      this.props.setFromTimestamp(event.target.valueAsDate)
    }
  }

  render() {
    return (
      <div className="border mb-2 mt-2 p-1">
        <Row form>
          <Col>
            <FormGroup>
              <Label for="searchTerm">Fritext sökning</Label>
              <Input type="text" name="email" id="searchTerm" onChange={this.handleChange} />
            </FormGroup>
          </Col>
          <Col>
            <Label for="fromDate">Datum från</Label>
            <Input
              type="date"
              id="fromDate"
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <Label for="toDate">Datum till</Label>
            <Input
              type="date"
              id="toDate"
              onChange={this.handleChange}
            />
          </Col>
        </Row>
      </div>)
  }
}

export { Results, ResultCard }
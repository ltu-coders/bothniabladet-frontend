import React from 'react';
import { Link } from "react-router-dom";
/**
 * Sida med sökresultat
 */
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 1,
      results: []
    };
    console.log(props);
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
    if (props.match.params.searchTerm)
      xhr.open('GET', `/images?tags=${props.match.params.searchTerm}`);
    else {
      console.log("else!");
      xhr.open('GET', `/images`);
    }
    xhr.send();
  }
  render() {
    let cards = this.state.results.map((image) => <ResultCard image={image} key={image.imageId} />);
    return <div className="container">
      <div className="alert alert-success">Du sökte efter {this.props.match.params.searchTerm}</div>
      <section>
        <div className="row">
          {cards}
        </div>
      </section>
    </div>;
  }
}


/**
 * En bild i sökresultaten
 */
function ResultCard({ image }) {
    let dateString = (new Date(Date.parse(image.dateTime))).toLocaleDateString()
    //let dateString = `${imageDate.getFullYear()}-${imageDate.getMonth() + 1}-${imageDate.getDate()}` 
  
    return <Link to={"/images/" + image.imageId} className="col-6 col-md-3">
      <div className="card">
        <img className="card-img-top" src={'/images/' + image.fileName} alt="Exempel" />
        <div className="card-body">
          <p className="card-text">{image.description}</p>
  
        </div>
        <div className="card-footer">
          <small className="text-muted">{image.author.firstName} {image.author.lastName} {dateString}</small>
        </div>
      </div>
    </Link>
  }

export {Results, ResultCard}
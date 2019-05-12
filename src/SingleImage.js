import React from 'react';
/**
 * Sida med en bild
 */
export class SingleImage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    let imageId = props.match.params.id;
    this.state = {
      loading: true
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          this.setState({
            image: JSON.parse(xhr.responseText),
            loading: false
          });
        }
        else {
          alert('There was a problem with the request.');
        }
      }
    };
    xhr.open('GET', `/images/${imageId}`);
    xhr.send();
    window.scrollTo(0, 0);
  }

  render() {
    if (this.state.loading) {
      return <div className="alert alert-success">Laddar...</div>;
    }
    else {
      let image = this.state.image;
      let dateString = (new Date(Date.parse(image.dateTime))).toLocaleDateString();
      let tags = image.tags.map(t => t.tagName).join(', ');
      return (<div className="container">
        <h1>{image.description}</h1>
        <img className="card-img-top" src={'/images/' + image.fileName} alt="Exempel" />
        <div className="row">
          <div className="col">
            <ul className="list-group">
              <li className="list-group-item">Upphovsman: {image.author.firstName} {image.author.lastName}</li>
              <li className="list-group-item">Datum: {dateString}</li>
              <li className="list-group-item">Taggar: {tags}</li>
              <li className="list-group-item">Filnamn: {image.fileName}</li>
            </ul>
          </div>
          <div className="col">
            <ul className="list-group">
              <li className="list-group-item">Licens: {image.licenseType}</li>
              <li className="list-group-item">Plats: {image.location}</li>
              <li className="list-group-item">Antal användningar/tillåtna: {image.imageUseCount}/{image.noOfAllowedUses}</li>
              <li className="list-group-item">PUID: {image.puid}</li>
            </ul>
          </div>
        </div>
      </div>);
    }
  }
}

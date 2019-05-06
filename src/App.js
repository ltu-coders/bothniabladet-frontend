import React from 'react';
import { getImages, getImage } from './repository.js'
import { Upload } from './Upload.js'

const pages = {
  SEARCH: "search",
  RESULT: "result",
  SHOW_IMAGE: "show_image",
  UPLOAD_IMAGE: "upload_image",
  SEND_TIP: "send_tip"
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: "",
      currentPage: pages.SEARCH,
      currentImageId: 0
    }
    this.search = this.search.bind(this)
    this.showImage = this.showImage.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.sendTip = this.sendTip.bind(this)
  }

  /**
   * Sök, gå till resultatsida
   */
  search(searchTerm) {
    this.setState({
      searchTerm: searchTerm,
      currentPage: pages.RESULT
    })
  }

  /**
   * Visa sida för en bild
   */
  showImage(image) {
    this.setState({
      currentPage: pages.SHOW_IMAGE,
      currentImage: image
    })
  }



  /**
   * Gå till sida för att ladda upp bild
   */
  uploadImage() {
    this.setState({
      currentPage: pages.UPLOAD_IMAGE
    })
  }

  /**
   * Gå till sida för att skicka in tips
   */
  sendTip() {
    this.setState({
      currentPage: pages.SEND_TIP
    })
  }

  render() {
    let content

    if (this.state.currentPage === pages.SEARCH)
      content = <SearchBar search={this.search} />
    else if (this.state.currentPage === pages.RESULT)
      content = <Results searchTerm={this.state.searchTerm} showImage={this.showImage} />;
    else if (this.state.currentPage === pages.SHOW_IMAGE)
      content = <SingleImage image={this.state.currentImage} />
    else if (this.state.currentPage === pages.UPLOAD_IMAGE)
      content = <Upload />
    else if (this.state.currentPage === pages.SEND_TIP)
      content = <Upload />
    else
      content = <div className="alert alert-danger">Den här borde inte synas!</div>

    return [content, <Activities uploadImage={this.uploadImage} sendTip={this.sendTip} />]
  }
}

/**
 * Länkar till aktiviteter
 */
const Activities = ({ uploadImage, sendTip }) =>
  <div className="container">
    <h1 className="my-4">Andra aktiviteter</h1>
    <div className="row">
      <div className="col mb-4">
        <div className="card h-100">
          <h4 className="card-header">Ladda upp bilder</h4>
          <div className="card-body">
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
          </div>
          <div className="card-footer">
            <p onClick={uploadImage} className="btn btn-primary">Gå till bilduppladdning</p>
          </div>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card h-100">
          <h4 className="card-header">Lämna tips</h4>
          <div className="card-body">
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis ipsam eos, nam perspiciatis natus commodi similique totam consectetur praesentium molestiae atque exercitationem ut consequuntur, sed eveniet, magni nostrum sint fuga.</p>
          </div>
          <div className="card-footer">
            <p onClick={sendTip} className="btn btn-primary">Lämna tips</p>
          </div>
        </div>
      </div>
    </div>
  </div>

/**
 * Sida med sökresultat
 */
class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: 1,
      results: []
    }

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          this.setState({ results: JSON.parse(xhr.responseText) })
        } else {
          alert('There was a problem with the request.');
        }
      }
    }
    xhr.open('GET', '/images')
    xhr.send()
  }

  render() {
    let cards = this.state.results.map((image) =>
      <ResultCard image={image} key={image.imageId} showImage={() => this.props.showImage(image)} />)
    return <div className="container">
      <div className="alert alert-success">Bravo, här är resultaten, du sökte efter {this.props.searchTerm}</div>
      <section>
        <div className="row">
          {cards}
        </div>
      </section>
    </div>
  }
}

/**
 * En bild i sökresultaten
 */
function ResultCard({ image, showImage }) {
  return <div className="col-6 col-md-3" onClick={showImage}>
    <div className="card">
      <img className="card-img-top" src={'/image/' + image.fileName} alt="Exempel" />
      <div className="card-body">
        <p className="card-text">Det här är bild {image.fileName}</p>

      </div>
      <div className="card-footer">
        <small className="text-muted">{image.author.firstName} {image.author.lastName} {image.dateTime}</small>
      </div>
    </div>
  </div>
}

/**
 * Sida med en bild
 */
function SingleImage(props) {
  return (
    <div className="container">
      <img className="card-img-top" src={'/image/' + props.image.fileName} alt="Exempel" />
      <table class="table table-borderless">
        <tbody>
          <tr>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>)
}

/**
 * Sökfält på förstasidan
 */
class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = { searchTerm: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.search(this.state.searchTerm)
  }

  render() {
    return <header className="masthead text-white text-center">
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-9 mx-auto">
            <h1 className="mb-5">Sök efter bilder i vår bilddatabas</h1>
          </div>
          <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className="col-12 col-md-9 mb-2 mb-md-0">
                  <input className="form-control form-control-lg" placeholder="Sökord ..." onChange={this.handleChange} />
                </div>
                <div className="col-12 col-md-3">
                  <button type="submit" className="btn btn-block btn-lg btn-primary">Sök</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  }
}

export default App;

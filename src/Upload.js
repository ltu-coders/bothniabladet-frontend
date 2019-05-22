import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

/**
 * class Upload
 */



class SuccessAlert extends React.Component {
    render() {
        return (
            <div className="alert alert-success" role="alert">
                Bild uppladdad!
            </div>
        );
    }
}

class FailureAlert extends React.Component {
    render() {
        return (
            <div className="alert alert-danger" role="alert">
                Failed to upload image to database!
                </div>
        );
    }
}

class Upload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            author: props.user,
            loggedIn: props.user !== "",
            images: "",
            licensetype: "Public Domain",
            tags: "",
            description: "",
            alertMessage: "",
            loading: false,
            visable: true,
            
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.fileHandler = this.fileHandler.bind(this);
        this.resetFailureAlert = this.resetFailureAlert.bind(this);
        this.selectLicenseHandler = this.selectLicenseHandler.bind(this);
    }

    /**
     * Handle delete tags
     */

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    /**
     * Handle Add tags
     */

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    /**
   * onChange handler 
   */
    onChangeHandler(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    /**
     * submit handler 
     */
    submitHandler(event) {
        event.preventDefault();
        console.log(this.state);
        const { images, author, licensetype, tags, description } = this.state;
        this.setState({ loading: true })

        let formData = new FormData();
        formData.append('images', images);
        formData.append('author', author);
        formData.append('licensetype', licensetype);
        formData.append('tags', tags);
        formData.append('description', description);
      

        axios.post('http://localhost:3000/images/', formData)
            .then(response => {
                setTimeout(() => {
                    //faking API call
                    this.setState({ loading: false });

                }, response.setTimeout)
                console.log(response)
                this.setState({ alertMessage: "success" });

            })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                console.log(error.message)

                console.log(error.config);
                setTimeout(() => {
                    //faking API call
                    this.setState({ loading: false });

                })
                this.setState({ alertMessage: "error" })
            })
    }

    fileHandler(event) {
        let fileUpload = event.target.files[0];
        this.setState({ images: fileUpload, alertMessage: "" });

    }

    resetFailureAlert() {
        this.setState({ visable: true });

    }

    selectLicenseHandler(event){
       
        this.setState({licensetype: event.target.value});
        
    

    }

    render() {
        if (!this.state.loggedIn) return <Redirect push to="/login"/>
        const { tags, author, description, loading } = this.state;

        return (<div className="container">
            {this.state.alertMessage === "success" ? <SuccessAlert /> : null}
            {this.state.alertMessage === "error" ? <FailureAlert /> : null}
            <form onSubmit={this.submitHandler} method="POST" encType="multipart/form-data">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div className="form-group files">
                            <label>Ladda upp bild</label>
                            <input type="file" name="images" onChange={this.fileHandler} />
                        </div>
                        <div className="md-form">
                            <label for="form1">Fotograf</label>
                            <input type="text" id="form1" className="form-control" name="author" value={author} onChange={this.onChangeHandler} />

                        </div>
                        <div className="md-form">
                            <label for="sel1">Licens</label>
                            <select className="form-control" id="sel1" value= {this.state.licensetype} onChange={this.selectLicenseHandler}>
                            <option value="Public Domain">Public Domain</option>
                            <option value="Creative Commons License">Creative Commons License</option>
                            <option value="Royalty Free Extended License">Royalty Free Extended License</option>
                            <option value="Royalty Free License (RF)">Royalty Free License (RF)</option>
                            <option value="Editorial Use License">Editorial Use License</option>
                            <option value="Rights Managed (RM) License">Rights Managed (RM) License</option>
                            </select>
                        </div> 
                        <div className="md-form">
                            <label for="form1">Taggar, separera flera taggar med komma</label>
                            <input type="text" id="form1" className="form-control" name="tags" value={tags} onChange={this.onChangeHandler} />
                        </div>
                        <div className="md-form">
                            <label for="form1">Beskrivning</label>
                            <input type="text" id="form1" className="form-control" name="description" value={description} onChange={this.onChangeHandler} />
                        </div>
                        <br></br>
                        <div><button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading && <span>Laddar upp bild..</span>}
                            {!loading && <span>Ladda upp</span>}
                        </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        );
    }
}

export { Upload }
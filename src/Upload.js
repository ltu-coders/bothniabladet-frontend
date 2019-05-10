import React from 'react';
import axios from 'axios';


/**
 * class Upload
 */

const KeyCodes ={
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];



class Upload extends React.Component{
    constructor(props){
    super(props);
    
    this.state = {
        
        author: "",
        images: "",
        licensetype: "",
        tags:"",
        description:""



    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
   
    
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
 * Sida för uppladdning av bilder
 */



  /**
 * onChange handler 
 */
onChangeHandler(event){
 
    this.setState({[event.target.name]: event.target.value})
    

  }

/**
 * Sida för att skicka in tips
 */
SendTip(props) {
    return <div className="container">
        <p>Skicka tips!</p>
    </div>
}

/**
 * submit handler 
 */


submitHandler(event){
    event.preventDefault();
    console.log(this.state);
   const {images,author,licensetype,tags,description} = this.state;
   
   

   let formData = new FormData();
   formData.append('images',images);
   formData.append('author',author);
   formData.append('licensetype',licensetype);
   formData.append('tags',tags);
   formData.append('description',description);

   
    axios.post('http://localhost:3000/images', formData)
    .then(response =>{
        console.log(response)
    })
    .catch(error => {
        console.log(error)
        console.log(error.response)
        console.log(error.message)
          
        console.log(error.config);
        
    })
}

fileHandler(event){
    let fileUpload = event.target.files[0];
    this.setState({images:fileUpload});
}
                   
            


render(){
   
    const {tags,author,licensetype,description} = this.state;
    return(<div className="container">
    <form onSubmit={this.submitHandler} method="POST" encType="multipart/form-data">
    <div className="row">
    <div className="offset-md-3 col-md-6">
    <div className="form-group files">
    <label>Ladda upp bild</label>
    <input type="file" name="images" onChange={this.fileHandler}/>
    
    </div>
    
<div className="md-form">
<label for="form1">Fotograf</label>
<input type="text" id="form1" class="form-control" name="author" value={author}  onChange={this.onChangeHandler}/>

</div>


<div className="md-form">
<label for="form1">Licens</label>
<input type="text" id="form1" class="form-control" name="licensetype" value={licensetype} onChange={this.onChangeHandler}/>

</div>

<div className="md-form">
<label for="form1">Taggar</label>
<input type="text" id="form1" class="form-control" name="tags" value={tags} onChange={this.onChangeHandler}/>
</div>

<div className="md-form">
<label for="form1">Beskrivning</label>
<input type="text" id="form1" class="form-control" name="description" value={description} onChange={this.onChangeHandler}/>
</div>
<br></br>

        <div><button type="submit" className="btn btn-primary btn-block" >Ladda upp</button>
    </div>

</div>

    
    </div>

    
    
  </form>  
</div>


);
   
    
}

}

export { Upload }
import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
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
    console.log(event.target.value)

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
    axios.post('http://localhost:3000/images', this.state,{
        headers: {
            'Content-Type': 'multipart/form-data',
           
            
        }
    })
    .then(response =>{
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

fileHandler(event){
    let fileUpload = event.target.files[0];
    this.setState({images:fileUpload});
}
                   
            


render(){
   
    const {images,tags,author,licensetype} = this.state;
    return(<div className="container">
    <form onSubmit={this.submitHandler} method="post" encType="multipart/form-data">
        <div>
        
            <input type="file" onChange={this.fileHandler}/>
        </div>
        <div>
            <input type="text" name="author" value={author} onChange={this.onChangeHandler}/>
        </div>
        <div>
            <input type="text" name="licensetype" value={licensetype} onChange={this.onChangeHandler}/>
        </div>
        <div>
            <input type="text" name="tags" value={tags} onChange={this.onChangeHandler}/>
        </div>
        <button type="submit">Submit</button>

    </form>
    
</div>);
    
}

}

export { Upload }
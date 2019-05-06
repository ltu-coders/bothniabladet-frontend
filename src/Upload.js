import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';


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
        
        selectedFile: null,
        tags: [
            
           

        ]


    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
   
    
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
    this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
        
        
    })

  }

/**
 * Sida för att skicka in tips
 */
SendTip(props) {
    return <div className="container">
        <p>Skicka tips!</p>
    </div>
}



                   
            


render(){
    const {tags} = this.state;
    if(this.state.tags.id === ""){
        this.handleDelete(333);
    }
    
    return (<div className="container">
    <p></p>
    
    <div className="row">
    <div className="offset-md-3 col-md-6">
    <div className="form-group files">
    <label>Ladda upp bild</label>
    <input type="file" name="file" onChange={this.onChangeHandler}/>
    
    </div>
    
<div className="md-form">
<label for="form1">Titel</label>
<input type="text" id="form1" class="form-control"/>

</div>


<div className="md-form">
<label for="form1">Licens</label>
<input type="text" id="form1" class="form-control"/>

</div>

<div className="md-form">
<label for="form1">Taggar</label>

     <ReactTags tags={tags}
     
    handleDelete={this.handleDelete}
    handleAddition={this.handleAddition}
    delimiters={delimiters} />
</div>
<br></br>

        <div><button type="button" className="btn btn-primary btn-block" >Ladda upp</button>
    </div>

</div>

    
    </div>

    
    
    
</div>);
    
}

}

export { Upload }
import React, {Component} from 'react';


export default class FailureAlert extends Component{
    
    render(){
        return(
            
              <div class="alert alert-danger" role="alert">
                    Failed to upload image to database!
            </div>
                  
           
            
        );
        
    }
}
import React from 'react';

/**
 * Sida för uppladdning av bilder
 * Ska lägga till labels och inputs från användaren.
 */
function UploadImage(props) {

    return (<div className="container">
        <p></p>
        <div class="row">
        <div class="offset-md-3 col-md-6">
        <div class="form-group files">
        <label>Ladda upp bild</label>
        <input type="file" name="file" />
        
        </div>
        <div><button type="button" class="btn btn-success btn-block" onClick="#" >Ladda upp</button>
        </div>
        
        </div>
   
        </div>
        
        
    </div>)
   
}

/**
 * Sida för att skicka in tips
 */
function SendTip(props) {
    return <div className="container">
        <p>Skicka tips!</p>
    </div>
}

export { UploadImage, SendTip }
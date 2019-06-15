import React from 'react';
import { Button } from 'reactstrap';
import './post-add-form.css'

const PostAddForm = ({onAdd}) => {
     return (
         <div className="bottom-panel d-flex">
             <input 
             type="text"
             placeholder="О чём вы думаете сейчас?"
             className = "form-control new-post-label"             
             />
             <Button 
             type="submit"
             outline
             color="secondary"
             onClick={ () => onAdd('hello')}>
                 Добавить</Button>
         </div>
     )
}
export default  PostAddForm;
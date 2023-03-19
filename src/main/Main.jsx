import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import "./main.css";

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    if (field === "body") {
      // update the activeNote.body array with the new final array
      value = final;
    }
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };
  
  const [subNote, setSubNote] = useState({
    msg:"",
    lastModified:Date.now()
  });

  const [final, setFinal] = useState([]);

  const actionChange = (event) => {
    const { name, value } = event.target;
    setSubNote((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      actionSubmit(event);
    }
  };

  const actionSubmit = (event) => {
    event.preventDefault(); // prevent default form submission behavior
    
    const newBody = [...activeNote.body, subNote]; // create new body array with updated subNote state
    onUpdateNote({
      ...activeNote,
      body: newBody,
      lastModified: Date.now(),
    });
    setSubNote({
      msg: "",
      lastModified: Date.now(),
    });
  };
  
  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">

<div className="app-main-note-preview">
    <div className="app-main-note-preview-title">


    <div style={{backgroundColor:activeNote.color}} className="profilePicture">
      {activeNote.shortForm}
    
    </div>

    <div className="para"> {activeNote.title}</div>
    

        
    </div>


  <div className="app-main-note-preview-left">
    <table>
      <tbody>
        {activeNote.body.map((item, index) => {
          let timestamp = item.lastModified;
          let date = new Date(timestamp);
          const converted = date.toLocaleString('en-US', {   hour: 'numeric', minute: 'numeric' });
          const converted1 = date.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'});
          return (
            <tr key={index}>
              <td style={{ width: '30%' }} className="app-main-preview-left-wide"> {converted} <br/>  {converted1}</td>
              <td  className="app-main-preview-left-wide" >{item.msg}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>


     {/* <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
      />*/}

      
        <form  onSubmit={actionSubmit}>

        <div className="app-main-textarea" s>
        <button type="submit" class="app-main-textarea-submit-button"  >
    <svg width="35" height="29" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" fill="#ABABAB"/>
    </svg>
  </button>
          <textarea tyle="background-color: #f1f1f1; color: #333; padding: 10px; border: none; font-size: 16px; font-family: 'Roboto', sans-serif;"
            name="msg"
            placeholder="Write your note here..."
            value={subNote.msg}
            onChange={actionChange}

            onKeyDown={handleKeyDown}
          />
          
          </div>
        </form>
        
        </div>
      
      
    
  );
};

export default Main;

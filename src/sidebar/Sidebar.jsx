import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Modal from 'react-modal';
import "./sidebar.css";













const Sidebar = ({
  notes,
  setNotes,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
  const colorOptions = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF','#6691FF'];

  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  const [isOpe, setIsOpen] = useState(false);




  const [profile,setProfile] = useState('')


  const updateProfilePic = (text) => {
    
    if (!text) {
      return "";
    }
    const words = text.trim().split(" ");
    let letters = "";
    if (words.length === 1) {
      letters = words[0].charAt(0);
    } else if (words.length >= 2) {
      letters = words[0].charAt(0) + words[1].charAt(0);
    }
    return letters.toUpperCase();
  };
  







  const [formData , setFormData] = useState({
    id: uuid(),
    title: "",
    body: [],
    color:'',
    shortForm:'',
    lastModified: Date.now(),
  });

  useEffect(() => {
    console.log('connected')
    localStorage.setItem("others", JSON.stringify(notes));
  }, [notes]);

  

  const handleSubmit = (event) => {

    event.preventDefault()
    
    console.log('happened');
    console.log(formData);

    

    

    if (formData.title.trim() === '') {
      alert('Please enter a title for the note.');
      return;
    }

    if (formData.color.trim() === '') {
      alert("Please select a color");
      return;
      
    }
    
    // Add the new note to the notes array and update the state
    
  
    // Store the updated notes array in local storage
    const updatedNotes = [...notes, formData];
    setNotes(updatedNotes);
  
    // Store the updated notes array in local storage
    console.log(formData.shortForm)
    localStorage.setItem('others', JSON.stringify(updatedNotes));
    
    setProfile("");
  
    // Clear the form data and close the modal
    setFormData({
      id: uuid(),
      title: '',
      body: [],
      color: '',
      shortForm:'',
      lastModified: Date.now(),
    });
    setIsOpen(false);
  };
  
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    const profilePic = updateProfilePic(formData.title);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      shortForm:profilePic
    }));
    console.log(formData);
    updateProfilePic();


    
  };

  

  const [isPopupOpen, setIsPopupOpen] = useState(false);


  function handleColorClick(event) {
    const newColor= event.target.getAttribute('name')
    
    setSelectedColor(event.target.value);
    setFormData({...formData, color: newColor})
    console.log("freedom")
    console.log(formData)

    
    

    
  }   
    

  

  return (
    
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Pocket Notes</h1>
        <button onClick={() => setIsOpen(true)}>+  Create Notes</button>
        <div className='popUp'>
        <Modal className="nothing" isOpen ={isOpe} onRequestClose={() => setIsOpen(false)} className='popUp'>
  <h2>Create New Notes</h2>
  <form onSubmit={handleSubmit}>
    <label>
      Group Name:
      <input type="text" name='title' value={formData.title} onChange={handleChange} />
    </label>
    <div>
      
      <p>Choose Color</p>
      {colorOptions.map((color) => (
        <div
          key={color}
          name={color}
          value={formData.color}
          style={{
            backgroundColor: color,
            width: '50px',
            height: '50px',
            borderRadius:'50px',
            display: 'inline-block',
            margin: '10px',
            cursor: 'pointer',
          }}
          onClick={handleColorClick}
        />
      ))}
    </div>
    <button type="submit">Create</button>
  </form>
  
</Modal>

        </div>
        
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body,color,shortForm, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)}
          >
            
            <div className="app-sidebar-circle" style={{backgroundColor: color}}>


              
              
              <p >{shortForm}</p>
              
              </div>
              
              <div className="full" style={{marginLeft:'20px'}}>
              <strong>{title}</strong>
              </div>
              
             <button onClick={(e) => onDeleteNote(id)}>Delete</button> 
            </div>

            
          
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
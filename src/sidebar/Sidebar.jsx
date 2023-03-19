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
  <h2 style={{borderBottom:'10px'}}>Create New Notes</h2>
  <form onSubmit={handleSubmit}>
    <div style={{
  display:'flex',
  flexDirection:'row',
  fontSize: '20px',
  fontWeight: 5000,
  lineHeight: '44px',
  letterSpacing: '0.035em',
  textAlign: 'left',

  display: "flex",
    flexDirection: "row",
    alignItems: "left",
    marginBottom:'20px',
    
    
    
}}>
     <p  style={{paddingRight:"20px"}}><strong> Group Name: </strong> </p>
      <input type="text" style={{height:'51px',width:'300px', paddingLeft:'20px',marginLeft:'10px',marginTop:'25px',border: "2px solid rgba(204, 204, 204, 1)",borderRadius: "22px",
}} name='title' value={formData.title} onChange={handleChange} placeholder="Enter your group name ..." />
    </div>
    <div style={{display:"flex", flexDirection:'row'}}>  
      
    <p style={{paddingRight:'30PX', fontSize:"20px",fontSize: '20px',
  fontWeight: 5000,
  
  letterSpacing: '0.035em',}}><strong> choose colour:</strong></p>
      {colorOptions.map((color) => (
        <div
        
          key={color}
          name={color}
          value={formData.color}
          style={{
            borderLeft:'30px',
            backgroundColor: color,
            width: '40px',
            height: '40px',
            borderRadius:'40px',
            display: 'inline-block',
            margin: '10px',
            cursor: 'pointer',
          }}
          onClick={handleColorClick}
        />
      ))}
    </div>
    <button style={{
      textAlign:"center",
      backgroundColor: "black",
      width:'154px',
      height:'30px',
  color: "white",
  borderRadius: "10px",
  paddingLeft: "10px",
  paddingRight: "10px",
  border: "none",
  marginRight: "10px",
  marginTop:'20px',
  marginLeft:"400px",
  marginBottom:'50px'
    }} type="submit">Create</button>
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
              
            {/* <button onClick={(e) => onDeleteNote(id)}>Delete</button> */}
            </div>

            
          
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
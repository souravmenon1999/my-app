
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Modal from 'react-modal';

import "./App.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";

<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
function App() {
  const [notes, setNotes] = useState(
    localStorage.others ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("others", JSON.stringify(notes));
  }, [notes]);

  const colorOptions = ['red', 'green', 'blue', 'yellow', 'purple'];
    
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  const [isOpe, setIsOpen] = useState(false);

  function handleNameChange(event){
    setName(event.target.value);
    console.log('open')
  
  }
  function handleColorClick(color) {
    setSelectedColor(color);
    console.log('open')
  }   
    


 /* function onAddNote () {

    

      return (
        <div>
          
            <button onClick={() => setIsOpen(true)}>pop-up</button>
          <div className='popUp'>
            <Modal isOpen ={isOpe} className='popUp'>
              <h2>This is a Pop-up</h2>
              <p>Here's some content for the pop-up.</p>
              <button onClick={() => setIsOpen(false)}>Close Pop-up</button>
              <label>
              Name:
                <input type="text" value={name} onChange={handleNameChange} />
              </label>
            <div>
              {colorOptions.map((color) => (
              <div
                  key={color}
                  style={{
                  backgroundColor: color,
                  width: '50px',
                  height: '50px',
                  borderRadius:'50px',
                  display: 'inline-block',
                  margin: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
          {selectedColor && (
            <p>Selected color is {selectedColor}.</p>
          )}
    
            </Modal>
        </div>
        </div>
      );
    }
    
*/
  

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body:[],
      color:"white",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        setNotes={setNotes}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        onUpdateNote={onUpdateNote}
        getActiveNote={getActiveNote()}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      
    </div>
  );
}

export default App;

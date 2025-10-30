import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // We'll add some basic styles

// This is the base URL of our server
const API_URL = 'http://localhost:5002/api/snippets';

function App() {
  // --- STATE VARIABLES ---
  
  // For the list of snippets
  const [snippets, setSnippets] = useState([]);
  
  // For the "Create New Snippet" form
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');  
  // For the "AI Generator" form
  const [prompt, setPrompt] =useState('');

  // --- NEW STATE ---
  // To track which snippet (if any) is being edited
  const [editingId, setEditingId] = useState(null);
  
  // --- 1. FETCH ALL SNIPPETS (on page load) ---
  useEffect(() => {
    // This function will run when the component first loads
    const getAllSnippets = async () => {
      try {
        // This is the GET request we made in the backend!
        const res = await axios.get(API_URL);
        setSnippets(res.data); // Store the snippets in our state
      } catch (error) {
        console.error('Error fetching snippets:', error);
      }
    };
    
    getAllSnippets();
  }, []); // The empty array [] means "run this only once"

// --- 2. HANDLE "SAVE SNIPPET" (Create OR Update) ---
  const handleSaveSubmit = async (e) => {
    e.preventDefault(); // Stop the form from refreshing the page
    
    const snippetData = { 
      title, 
      code, 
      language, 
       
    };

    try {
      if (editingId) {
        // --- WE ARE UPDATING ---
        // This is the PUT request we made in the backend!
        const res = await axios.put(`${API_URL}/${editingId}`, snippetData);
        
        // Update the snippet in our state
        setSnippets(snippets.map(s => 
          s._id === editingId ? res.data : s
        ));
        console.log("Snippet updated!");

      } else {
        // --- WE ARE CREATING ---
        // This is the POST request we had before
        const res = await axios.post(API_URL, snippetData);
        
        // Add the new snippet to the top of our list
        setSnippets([res.data, ...snippets]);
        console.log("Snippet created!");
      }

      // Clear the form and reset editingId
      clearForm();

    } catch (error) {
      console.error('Error saving snippet:', error);
    }
  };

  // --- 3. HANDLE "AI GENERATE" FORM SUBMIT ---
  const handleAiSubmit = async (e) => {
    e.preventDefault();
    try {
      // This is the POST /generate route we made!
      const res = await axios.post(`${API_URL}/generate`, { prompt });
      
      // Put the AI's code into the "Create Snippet" form
      setCode(res.data.code);
      setLanguage(res.data.language);
      setTitle(prompt); // Use the prompt as the title
      setPrompt(''); // Clear the AI prompt
      
    } catch (error) {
      console.error('Error generating AI code:', error);
    }
  };
  
  // --- 4. HANDLE "DELETE SNIPPET" ---
  const handleDeleteSnippet = async (idToDelete) => {
    try {
      // This is the DELETE request we just made in the backend!
      // Note the URL format: /api/snippets/:id
      await axios.delete(`${API_URL}/${idToDelete}`);
      
      // If the delete was successful, update the React state
      // We'll filter the 'snippets' array to remove the one with the matching ID
      setSnippets(snippets.filter(snippet => snippet._id !== idToDelete));
      
    } catch (error) {
      console.error('Error deleting snippet:', error);
    }
  };
// --- 5. HANDLE "START EDIT" ---
  const handleStartEdit = (snippet) => {
    // 1. Set the editingId state
    setEditingId(snippet._id);
    
    // 2. Populate the form with the snippet's data
    setTitle(snippet.title);
    setCode(snippet.code);
    setLanguage(snippet.language);
    // 3. Scroll to the top of the page to see the form
    window.scrollTo(0, 0);
  };
  // --- 6. HANDLE "CANCEL EDIT" ---
  const clearForm = () => {
    setTitle('');
    setCode('');
    setLanguage('javascript');
    setEditingId(null); // The most important part!
  };
  // --- JSX (WHAT THE USER SEES) ---
  return (
    <div className="app-container">
      <header>
        <h1>AI Dev Snippet Saver</h1>
      </header>

      <main>
        {/* --- AI GENERATOR SECTION --- */}
        <div className="form-section ai-section">
          <h2>Generate Code with AI</h2>
          <form onSubmit={handleAiSubmit}>
            <label>Prompt:</label>
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'a javascript function to reverse a string'"
            />
            <button type="submit">Generate</button>
          </form>
        </div>

        {/* --- CREATE SNIPPET SECTION --- */}
        <div className="form-section create-section">
          {/* --- CHANGE THIS TITLE DYNAMICALLY --- */}
          <h2>{editingId ? 'Edit Snippet' : 'Save a New Snippet'}</h2>
          <form onSubmit={handleSaveSubmit}>
            <label>Title:</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <label>Language:</label>
            <input 
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            
            <label>Code:</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows="10"
            ></textarea>

            {/* --- CHANGE THIS BUTTON TEXT DYNAMICALLY --- */}
            <button type="submit">
              {editingId ? 'Update Snippet' : 'Save Snippet'}
            </button>

            {/* --- ADD A "CANCEL" BUTTON --- */}
            {editingId && (
              <button type="button" onClick={clearForm} className="cancel-btn">
                Cancel Edit
              </button>
            )}          
            </form>
        </div>

        {/* --- DISPLAY SNIPPETS SECTION --- */}
        <div className="snippets-section">
          {/* <h2>My Snippets</h2> */}
          <div className="snippet-list">
            {snippets.length === 0 ? (
              <p>No snippets saved yet. Use the form to add one!</p>
            ) : (
              // ... inside the snippets.map() ...
              snippets.map((snippet) => (
                <div key={snippet._id} className="snippet-card">
                  <h3>{snippet.title}</h3>
                  <span className="snippet-lang">{snippet.language}</span>
                  <pre>
                    <code>{snippet.code}</code>
                  </pre>
                  <div className="snippet-actions">
                  <button 
                    className="edit-btn" 
                    onClick={() => handleStartEdit(snippet)}>
                    Edit
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDeleteSnippet(snippet._id)}
                  >
                    Delete {/* This is a "times" (X) symbol */}
                  </button>

                  </div>
                </div>
              ))
            // ...
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. IMPORT useNavigate
import './App.css'; 
import VideoBackground from './VideoBackground.jsx';
import api from './api.js';
import { useAuth } from './context/AuthContext.jsx';


function App() {
  // ... (all your other states are perfect)
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');  
  const [prompt, setPrompt] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  const { logout } = useAuth();
  const navigate = useNavigate(); // <-- 2. GET THE navigate FUNCTION

  // ... (useEffect is perfect)
  useEffect(() => {
    const getAllSnippets = async () => {
      try {
        const res = await api.get('/snippets');
        setSnippets(res.data);
      } catch (error) {
        console.error('Error fetching snippets:', error);
        if (error.response && error.response.status === 401) {
          // If token is bad, log out and navigate
          logout(); 
          navigate('/login');
        }
      }
    };
    
    getAllSnippets();
  }, [logout, navigate]); // <-- 3. ADD navigate TO DEPENDENCY ARRAY

  // ... (handleSaveSubmit, handleAiSubmit, handleDeleteSnippet... all perfect)
  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    const snippetData = { title, code, language };
    try {
      if (editingId) {
        const res = await api.put(`/snippets/${editingId}`, snippetData);
        setSnippets(snippets.map(s => s._id === editingId ? res.data : s));
      } else {
        const res = await api.post('/snippets', snippetData);
        setSnippets([res.data, ...snippets]);
      }
      clearForm();
    } catch (error) {
      console.error('Error saving snippet:', error);
    }
  };
  const handleAiSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/snippets/generate', { prompt });
      setCode(res.data.code);
      setLanguage(res.data.language);
      setTitle(prompt);
      setPrompt('');
    } catch (error) {
      console.error('Error generating AI code:', error);
    }
  };
  const handleDeleteSnippet = async (idToDelete) => {
    try {
      await api.delete(`/snippets/${idToDelete}`);
      setSnippets(snippets.filter(snippet => snippet._id !== idToDelete));
    } catch (error) {
      console.error('Error deleting snippet:', error);
    }
  };
  const handleStartEdit = (snippet) => {
    setEditingId(snippet._id);
    setTitle(snippet.title);
    setCode(snippet.code);
    setLanguage(snippet.language);
    window.scrollTo(0, 0);
  };
  const clearForm = () => {
    setTitle('');
    setCode('');
    setLanguage('javascript');
    setEditingId(null);
  };

  // --- 4. CREATE A NEW LOGOUT HANDLER ---
  const handleLogout = () => {
    logout(); // This clears the token from context/localStorage
    navigate('/login'); // This redirects the user
  };

  // --- JSX ---
  return (
    <div className="app-container">
      <VideoBackground />
      <header>
        <h1>AI Dev Snippet Saver</h1>
        {/* --- 5. UPDATE THE BUTTON'S onClick --- */}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <main>
        {/* ... (rest of the JSX is identical and perfect) ... */}
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

            <button type="submit">
              {editingId ? 'Update Snippet' : 'Save Snippet'}
            </button>

            {editingId && (
              <button type="button" onClick={clearForm} className="cancel-btn">
                Cancel Edit
              </button>
            )}          
            </form>
        </div>

        {/* --- DISPLAY SNIPPETS SECTION --- */}
        <div className="snippets-section">
          <div className="snippet-list">
            {snippets.length === 0 ? (
              <p>No snippets saved yet. Use the form to add one!</p>
            ) : (
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
                    Delete
                  </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

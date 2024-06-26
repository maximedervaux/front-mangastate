import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mangaResults, setMangaResults] = useState([]);
  const [error, setError] = useState(null);

  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://10.10.0.235:3030/manga/${searchQuery}`);
      setMangaResults(response.data);
      console.log(response.data[1])
      setError(null);
    } catch (error) {
      setError('Manga not found or API error');
      setMangaResults([]);
    }
  };

  const isHentai = (manga) => {
    if (manga && manga.genres) {
      console.log(manga.genres)
      return manga.genres.some(genre => genre.name_genre.toLowerCase() === 'hentai');
    }
    return false;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#222', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>MangAstate</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a manga"
          style={{ width: '300px', padding: '10px', marginRight: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', outline: 'none' }}
        />
        <button onClick={handleSearch} style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Search
        </button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Array.isArray(mangaResults) && mangaResults.length > 0 ? (
          mangaResults.map((manga) => (
            <div key={manga.id_manga} style={isHentai(manga) ? styles.cardBlurred : styles.card}>
              <img src={manga.cover_image_manga} alt={manga.title_manga} style={styles.image} />
              <div style={styles.overlay}>
                <h2 style={styles.title}>{manga.title_manga}</h2>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'white', textAlign: 'center' }}>No manga found</p>
        )}
      </div>
    </div>
  );
}

// Styles
const styles = {
  card: {
    backgroundColor: '#333',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    position: 'relative',
    width: '200px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  cardBlurred: {
    backgroundColor: '#333',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    position: 'relative',
    width: '200px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    filter: 'blur(5px)',
  },
  cardBlurredHover: {
    filter: 'blur(0px)',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '5px',
  },
  title: {
    fontSize: '16px',
    margin: '0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export default App;

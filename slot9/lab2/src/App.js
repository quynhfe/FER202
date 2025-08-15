import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 1. Import router
import { Container, Toast, ToastContainer, Alert } from 'react-bootstrap';

// Import tất cả các component bạn cần
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Filter from './components/Filter';
import List from './components/List';
import Pagination from './components/Pagination';
import MovieDetailsModal from './components/MovieDetailsModal';
import MovieRequestForm from './components/MovieRequestForm';
import { movies as initialMovies } from './data/movies';

function App() {
  // --- Tất cả state và logic được giữ nguyên ---
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortOrder, setSortOrder] = useState('none');
  const [activePage, setActivePage] = useState(1);
  const moviesPerPage = 6;

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // --- Các useEffect và functions xử lý sự kiện được giữ nguyên ---
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    setActivePage(1);
  }, [searchTerm, selectedGenre, sortOrder]);

  const handleAddToFavorites = (movie) => {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      setToastMessage(`${movie.title} removed from favorites!`);
    } else {
      updatedFavorites = [...favorites, movie];
      setToastMessage(`${movie.title} added to favorites!`);
    }
    setFavorites(updatedFavorites);
    setShowToast(true);
  };

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const filteredAndSortedMovies = useMemo(() => {
    let result = initialMovies;
    if (selectedGenre !== 'All') {
      result = result.filter(movie => movie.genre === selectedGenre);
    }
    if (searchTerm) {
      result = result.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOrder === 'duration_asc') {
      result.sort((a, b) => a.duration - b.duration);
    } else if (sortOrder === 'duration_desc') {
      result.sort((a, b) => b.duration - a.duration);
    }
    return result;
  }, [selectedGenre, searchTerm, sortOrder]);

  const indexOfLastMovie = activePage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredAndSortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredAndSortedMovies.length / moviesPerPage);
  
  // --- 2. Render sử dụng Router ---
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header /> {/* Header hiển thị trên mọi trang */}
        <Hero />
        
        <Container style={{ flex: 1, paddingTop: '80px' }}>
          <Routes>
            {/* Route cho trang chủ và free movies */}
            <Route path="/home" element={
              <>
                <Filter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedGenre={selectedGenre}
                  setSelectedGenre={setSelectedGenre}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  movieCount={filteredAndSortedMovies.length}
                />
                <List
                  movies={currentMovies}
                  onAddToFavorites={handleAddToFavorites}
                  onShowDetails={handleShowDetails}
                  favorites={favorites}
                />
                <Pagination
                  totalPages={totalPages}
                  currentPage={activePage}
                  onPageChange={setActivePage}
                />
              </>
            } />
            <Route path="/free-movies" element={
              <>
                <Hero />
                <Filter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedGenre={selectedGenre}
                  setSelectedGenre={setSelectedGenre}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  movieCount={filteredAndSortedMovies.length}
                />
                <List
                  movies={currentMovies}
                  onAddToFavorites={handleAddToFavorites}
                  onShowDetails={handleShowDetails}
                  favorites={favorites}
                />
                <Pagination
                  totalPages={totalPages}
                  currentPage={activePage}
                  onPageChange={setActivePage}
                />
              </>
            } />

            {/* Route cho trang phim yêu thích */}
            <Route path="/fav-movies" element={
              <div className="mt-5 pt-4">
                <h2 className="mb-4">My Favourite Movies</h2>
                {favorites.length === 0 ? (
                  <Alert variant="info">You haven't added any favorite movies yet.</Alert>
                ) : (
                  <List
                    movies={favorites}
                    onAddToFavorites={handleAddToFavorites}
                    onShowDetails={handleShowDetails}
                    favorites={favorites}
                  />
                )}
              </div>
            } />

            {/* Route cho trang request form */}
            <Route path="/movie-request" element={<MovieRequestForm />} />

          </Routes>
        </Container>
        
        <Footer /> {/* Footer hiển thị trên mọi trang */}

        {/* Modal và Toast là các component toàn cục */}
        <MovieDetailsModal
          movie={selectedMovie}
          show={showModal}
          handleClose={handleCloseModal}
        />
        <ToastContainer position="top-end" className="p-3">
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </Router>
  );
}

export default App;
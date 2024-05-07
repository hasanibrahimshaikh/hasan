import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div>
            <section className="welcome-section">
                <h1>Welcome To The Music_Library</h1>
                <p>"Discover, listen and enjoy your favorite music."</p>
            </section>
            <section className="about-us-section">
                <h2>About Us:</h2>
                <p>
                    The Music Library is a platform designed to provide you with access to a vast collection of songs, albums, and playlists. 
                    Our mission is to bring music enthusiasts together and create a seamless listening experience for all users.
                </p>
                <p>
                    Whether you're looking to explore new artists, create personalized playlists, or simply enjoy your favorite tunes, 
                    the Music Library has everything you need to satisfy your musical cravings.
                </p>
                <p>
                    Join us on this musical journey and let the Music Library be your ultimate destination for all things music.
                </p>
            </section>
            <footer className="footer">
                <div className="footer-content">
                    &copy; Music_Library 2024 - Designed by [Hasan Shaikh]
                </div>
            </footer>
        </div>
    );
};

export default Home;

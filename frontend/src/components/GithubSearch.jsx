import React, { useState } from 'react'
import axios from 'axios';
import './githubSearch.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

const GithubSearch = () => {

    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setProfile(response.data);
            setError(null);
        } catch (error) {
            setProfile(null);
            setError('User Not Found');
        }
    };
    return (
        <div className='main-container'>
            <h1 className='main-heading'>GitHub Profile Finder</h1>
            <form onSubmit={handleSubmit} className='search-form'>
                <input type='text' placeholder='Enter Github Username.....' value={username} className='search-input' onChange={(e) => setUsername(e.target.value)}></input>
                <button type='submit' className='search-btn'>Search</button>
            </form>

            {error && <p className='error-msg'>{error}</p>}
            {profile && (
                <div className='profile-container'>
                    <div className='profile-content'>
                        <div className='profile-img'>
                            <img src={profile.avatar_url} alt='Avatar' className='profile-avatar'></img>
                        </div>
                        <div className='profile-details'>

                            <div className='profile-des'>
                                <h2 className='profile-name'>{profile.name}</h2>
                                <p className='profile-created'>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
                            </div>

                            <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-username'>@{profile.login}</a>
                            <p className='profile-bio'>{profile.bio}</p>

                            <div className='profile-stats'>
                                <p className='profile-repos'>Repositories<br /><span className='stats'>{profile.public_repos}</span></p>
                                <p className='profile-followers'>Followers<br /><span className='stats'>{profile.followers}</span></p>
                                <p className='profile-following'>Following<br /><span className='stats'>{profile.following}</span></p>
                            </div>

                            <div className='profile-info'>
                                <p className='profile-location'><FaMapMarkerAlt /> {profile.location}</p>

                            </div>

                            <div className='profile-links'>
                                <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-url'><FaGithub />View Profile</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GithubSearch
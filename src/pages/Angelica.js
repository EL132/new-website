import './styles/Angelica.css';
import React, { useEffect } from 'react';

function Angelica() {
    useEffect(() => {
        document.title = '2.11 Bridge-building';
    }, []);

    return (
        <div className="angelica-container">
            <section className="angelica-section intro">
                <h1>2.11 Bridge-building</h1>
                <p>
                    Welcome to the Mechanical Engineering course 2.11 Bridge-building. This course emphasizes learning through real-world examples and conversations, providing a less <em>calculated</em> approach to bridge-building fundamentals.
                </p>
            </section>

            <section className="angelica-section professor">
                <h2>Professor Information</h2>
                <p>
                    <strong>Professor:</strong> Prof. Elias Lind<br />
                    <strong>Email:</strong> elias.lind6@gmail.com <br />
                    <strong>Office Hours:</strong> Tuesdays & Thursdays, 2-4pm
                </p>
            </section>

            <section className="angelica-section pictures">
                <h2>Course Pictures</h2>
                <div className="angelica-pictures-placeholder">
                    <div className="hover-image-container">
                        <img
                            src="/assets/angelica/bridge-ex.png"
                            alt="Bridge example"
                            className="hover-image base-image"
                        />
                        <img
                            src="/assets/angelica/mock.jpeg"
                            alt="Course mock"
                            className="hover-image hover-image-top"
                        />
                    </div>
                    <div className="picture-placeholder" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>[Who knows what the future holds...]</div>
                </div>
            </section>

            <section className="angelica-section semester">
                <h2>This Semester</h2>
                <p>
                    The semester will be very different than previous semesters, with a greater emphasis on collaborative projects and real-world applications. Stay tuned for more updates!
                </p>
            </section>

            <section className="angelica-section reading">
                <h2>If you're still reading</h2>
                <p>
                    Not sure how honest I'd like to be here; I suppose I'll say very little to avoid having to answer that. If you're still reading, then I'm wondering what you're thinking I suppose. Yes, that'd be nice to know
                </p>
            </section>
        <footer className="angelica-footer">
            <small>
                Syllabus: <a href="https://drive.google.com/file/d/1u5zZMwtWHktcJVtu1-3KCl-3GSx3o2-1/view?usp=drive_link" target="_blank" rel="noopener noreferrer">View here</a>
            </small>
        </footer>
    </div>
    );
}

export default Angelica;
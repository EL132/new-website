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
                    Welcome to the Mechanical Engineering course 2.11 Bridge-building. This course emphasizes learning through real-world examples and conversations, providing an <em>emotional</em> approach to bridge engineering fundamentals.
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
                    {/* Insert course images here */}
                    <div className="picture-placeholder" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>[Looking forward to filling these in!]</div>
                    <div className="picture-placeholder" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>[Maybe YOU will be here next...]</div>
                </div>
            </section>

            <section className="angelica-section semester">
                <h2>This Semester</h2>
                <p>
                    The semester will be very different than previous semesters, with a greater emphasis on collaborative projects and real-world applications. Stay tuned for more updates!
                </p>
            </section>
        </div>
    );
}

export default Angelica;
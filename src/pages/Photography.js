import { useEffect } from 'react';

function Photography() {
    useEffect(() => {
        document.title = 'Photography';
    }, []);

    return (
        <main>
            <h1>photography</h1>
            <p>
                Placeholder: a single button in the middle called "enter"; upon click, it should take users to an image exploration page where they can drag to move around and discover other photos. Website inspo: <a href="https://veleyross.wedding/" target="_blank" rel="noopener noreferrer">https://veleyross.wedding/</a>
            </p>
        </main>
    );
}

export default Photography;

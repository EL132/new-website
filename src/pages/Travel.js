import { useEffect } from 'react';

function Travel() {
    useEffect(() => {
        document.title = 'Travel';
    }, []);

    return (
        <main>
            <h1>travel</h1>
            <p>
                Placeholder: interactive, movable globe with all flights taken - uploaded from CSV file.
            </p>
        </main>
    );
}

export default Travel;

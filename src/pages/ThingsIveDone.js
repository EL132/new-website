import { useEffect } from 'react';

function ThingsIveDone() {
    useEffect(() => {
        document.title = "Things I've Done";
    }, []);

    return (
        <main>
            <h1>things i've done</h1>
            <p>
                Placeholder: 3-d carousel of photos for each; upon click, that item will show image to the left and title:description to the right.
            </p>
        </main>
    );
}

export default ThingsIveDone;

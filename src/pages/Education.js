import { useEffect } from 'react';

function Education() {
    useEffect(() => {
        document.title = 'Education';
    }, []);

    return <h1>education</h1>;
}

export default Education;

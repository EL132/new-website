import { useEffect } from 'react';

function MakingThings() {
    useEffect(() => {
        document.title = 'I Like To Make Things';
    }, []);

    return <h1>i like to make things</h1>;
}

export default MakingThings;

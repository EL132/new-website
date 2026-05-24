import { useEffect } from 'react';
import styles from './styles/Education.module.css';

const educationItems = [
    'Years spent as a tutor',
    'Time I spent as an English teacher',
    'Lectures given as a TA',
    'Projects designed as a TA',
    'Kontinua contributions',
];

function Education() {
    useEffect(() => {
        document.title = 'Education';
    }, []);

    return (
        <main className={styles.educationPage}>
            <h1>education</h1>
            <ul className={styles.educationList}>
                {educationItems.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </main>
    );
}

export default Education;

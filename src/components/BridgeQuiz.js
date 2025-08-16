import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BridgeQuiz() {
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [result, setResult] = useState('');
    const navigate = useNavigate();

    const correctAnswer1 = 'no';
    const correctAnswer2 = 'no';
    const correctAnswer3 = 'zendaya';
    const correctAnswer4 = 'angelica';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            answer1.trim().toLowerCase() === correctAnswer1.toLowerCase() &&
            answer2.trim() === correctAnswer2 &&
            answer3.trim() === correctAnswer3 &&
            answer4.trim().toLowerCase() === correctAnswer4
        ) {
            setResult('You made it!');
            setTimeout(() => {
                navigate('/211');
            }, 1200);
        } else {
            setResult("You're an imposter. Please be an adult and find a different elective to take");
        }
    };

    return (
        <div className="bridge-quiz-container">
            <h2>2.11 Bridge-building Student Quiz</h2>
            <form onSubmit={handleSubmit} className="bridge-quiz-form">
                <label>
                    1. Can mac-n-cheese be a 10/10?
                    <input
                        type="text"
                        value={answer1}
                        onChange={e => setAnswer1(e.target.value)}
                        required
                        className="bridge-quiz-input"
                    />
                </label>
                <label>
                    2. Is John Summit a better artist than Doja cat?
                    <input
                        type="text"
                        value={answer2}
                        onChange={e => setAnswer2(e.target.value)}
                        required
                        className="bridge-quiz-input"
                    />
                </label>
                <label>
                    3. Who inspires women across the world to be tall?
                    <input
                        type="text"
                        value={answer3}
                        onChange={e => setAnswer3(e.target.value)}
                        required
                        className="bridge-quiz-input"
                    />
                </label>
                <label>
                    4. Who is the best mental mathematician of Gen Z?
                    <input
                        type="text"
                        value={answer4}
                        onChange={e => setAnswer4(e.target.value)}
                        required
                        className="bridge-quiz-input"
                    />
                </label>
                <button type="submit" className="bridge-quiz-submit">Submit</button>
            </form>
            {result && (
                <div
                    className="bridge-quiz-result"
                    style={result === 'You made it!' ? { color: '#34a853' } : {}}
                >
                    {result}
                </div>
            )}
        </div>
    );
}

export default BridgeQuiz;

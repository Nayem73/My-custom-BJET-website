import React from 'react';
import './BreakTheBarrier.css'; // Import the CSS file
import Hiragana from '../images/Hiragana.pdf';

function BreakTheBarrier() {
    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Break the Barrier</h2>
                    <p>This section should contain unique learning roadmap, steps, materials and resources in an organized format that will help narrow the gap between Bangla and Japanese language and culture.</p>
                    
                    <div className="pdf-container">
                        <iframe src={Hiragana} title="Hiragana PDF" className="pdf-viewer"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BreakTheBarrier;

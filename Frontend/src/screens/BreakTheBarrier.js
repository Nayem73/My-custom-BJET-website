import React from 'react';
import './BreakTheBarrier.css'; // Import the CSS file
import Hiragana from '../images/Hiragana.pdf';

function BreakTheBarrier() {
    return (
        <div className="btb-container">
            <div className="btb-card">
                <div className="btb-card-body">
                    <h2 className="btb-card-title" style={{ fontSize: '28px' }}>Break the Barrier</h2>
                    <p className="btb-highlighted-text">This section should contain unique learning roadmap, steps, materials and resources in an organized format that will help narrow the gap between Bangla and Japanese language and culture.</p>
                    
                    <div className="btb-pdf-container">
                        <iframe src={Hiragana} title="Hiragana PDF" className="btb-pdf-viewer"></iframe>
                    </div>

                    <div className="btb-game-container">
                        <iframe src="https://drlingua.com/japanese/games/kana-bento/" title="Kana Bento Game" className="btb-game-viewer"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BreakTheBarrier;

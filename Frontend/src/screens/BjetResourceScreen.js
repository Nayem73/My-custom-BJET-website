import React from 'react';
import successStory1 from '../images/successStory1.jpg';
import successStory2 from '../images/successStory2.jpg';
import successStory3 from '../images/successStory3.jpg';
import './BjetResourceScreen.css';

function BjetResourceScreen() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Card 1 */}
            <div className="card">
                <img src={successStory1} alt="Success Story 1" className="card-img-top" />
                <div className="card-body">
                    <h2 className="card-title">B-JET Success Story: From Classroom to Career in Japan IT Sector!</h2>
                    <p>Hear from our 13th Batch trainee, one of our accomplished graduates, A proud member of the B-JET family.</p>
                    <p>B-JET program is now accepting applications for its 14th batch!</p>
                    <p><strong>Registration Link:</strong> <a href="https://forms.gle/tzJYJH4PYuSFb3vF8">https://forms.gle/tzJYJH4PYuSFb3vF8</a></p>
                    <p><strong>Application deadline:</strong> 21/03/2024</p>
                    <p><strong>For more information:</strong> <a href="https://shorturl.at/psBKV">https://shorturl.at/psBKV</a></p>
                    <p>Join us in celebrating their success and get inspired by their remarkable journey! If you're ready to carve your path to IT Career in Japan, then B-JET is the perfect platform for you! More than 200 B-JET graduates are now professionally working as global talents in reputed Japanese companies.</p>
                </div>
            </div>

            {/* Card 2 */}
            <div className="card mt-8">
                <img src={successStory2} alt="Success Story 2" className="card-img-top" />
                <div className="card-body">
                    <h2 className="card-title">B-JET Success Story: From Classroom to Career in Japan IT Sector!</h2>
                    <p>Hear from our 13th Batch trainee, one of our accomplished graduates, A proud member of the B-JET family.</p>
                    <p>B-JET program is now accepting applications for its 14th batch!</p>
                    <p><strong>Registration Link:</strong> <a href="https://forms.gle/tzJYJH4PYuSFb3vF8">https://forms.gle/tzJYJH4PYuSFb3vF8</a></p>
                    <p><strong>Application deadline:</strong> 21/03/2024</p>
                    <p><strong>For more information:</strong> <a href="https://shorturl.at/psBKV">https://shorturl.at/psBKV</a></p>
                    <p>Join us in celebrating their success and get inspired by their remarkable journey! If you're ready to carve your path to IT Career in Japan, then B-JET is the perfect platform for you! More than 200 B-JET graduates are now professionally working as global talents in reputed Japanese companies.</p>
                </div>
            </div>

            {/* Card 3 */}
            <div className="card mt-8">
                <img src={successStory3} alt="Success Story 3" className="card-img-top" />
                <div className="card-body">
                    <h2 className="card-title">B-JET Success Story: From Classroom to Career in Japan IT Sector!</h2>
                    <p>Hear from our 13th Batch trainee, one of our accomplished graduates, A proud member of the B-JET family.</p>
                    <p>B-JET program is now accepting applications for its 14th batch!</p>
                    <p><strong>Registration Link:</strong> <a href="https://forms.gle/tzJYJH4PYuSFb3vF8">https://forms.gle/tzJYJH4PYuSFb3vF8</a></p>
                    <p><strong>Application deadline:</strong> 21/03/2024</p>
                    <p><strong>For more information:</strong> <a href="https://shorturl.at/psBKV">https://shorturl.at/psBKV</a></p>
                    <p>Join us in celebrating their success and get inspired by their remarkable journey! If you're ready to carve your path to IT Career in Japan, then B-JET is the perfect platform for you! More than 200 B-JET graduates are now professionally working as global talents in reputed Japanese companies.</p>
                </div>
            </div>
        </div>
    );
}

export default BjetResourceScreen;

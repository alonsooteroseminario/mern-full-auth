import React from 'react'
import './home.css'
import FeatureServices from '../../../widgets/featurebox/services';
import Herosection from '../../../widgets/herosection/herosection';

function Home() {
    return (
        <div>
            <div class="landing-page">
            <div class="container">
                <div class="info">
                <h1>3Draft Viewer</h1>
                <p>The best communication tool between Office and Contractors on site. </p>
                <button>Start</button>
                </div>
                <div class="image">
                <img src="https://i.postimg.cc/65QxYYzh/001234.png" />
                </div>
                <div class="clearfix"></div>
            </div>
            </div>

        </div>
    )
}

export default Home

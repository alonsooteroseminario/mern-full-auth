import React from 'react'
import { Link } from "react-router-dom";
import './home.css'
import FeatureServices from '../../../widgets/featurebox/services';
import Herosection from '../../../widgets/herosection/herosection';

function Home() {
    return (
        <div>
            <div className="landing-page">
            <div className="container">
                <div className="info">
                <h1>3Draft Viewer</h1>
                <p>The best communication tool between Office and Contractors on site. </p>
                <Link
                    className="btn btn-primary"
                    to={`/login`}
                    >
                    Start
                </Link>
                </div>
                <div className="image">
                    <img src="https://i.postimg.cc/65QxYYzh/001234.png" />
                </div>
                <div className="clearfix"></div>
            </div>
            </div>

        </div>
    )
}

export default Home

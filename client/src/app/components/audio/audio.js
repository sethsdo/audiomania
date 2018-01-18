import React, { Component } from 'react';
import styles from './audio.css';
//import Main from './main'
import {Visualizer} from './visualizer/visualizer'

class AudioPage extends Component {

    record() {

    }

    stopRecording() {

    }

    render() {
        return (
            <div>
                <div className={styles.container}>
                    <h2>Web Dictaphone</h2>
                    <sction class="main-controls">
                        <canvas class="visulizer" height="60px"></canvas>
                        <div class="buttons">
                            <button class="record" onClick={this.record}>Record</button>
                            <button class="stop" onClick={this.stopRecording}>Stop</button>
                        </div>
                    </sction>
                    <section class="sound-clips"></section>
                </div>

                <label for="toggle">?</label>
                <input type="checkbox" id="toggle"/>
            </div>

        )
    }
}

export default AudioPage;
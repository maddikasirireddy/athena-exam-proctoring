import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef(null);

  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const imageCaptureRef = useRef(null);
  const [completed, setCompleted] = useState(false);
  const [fullScreenReady, setFullScreenReady] = useState(false);


  
  async function getRemainingTime() {
    const currTime = await window.electronAPI.getRemainingTime();

    setTime(currTime);

    if (currTime <= 0) {
      endTest();
    }
  }


  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      getRemainingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [started]);

  
async function getCamera() {
  try {
    const videoData = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = videoData;

    const track = videoData.getVideoTracks()[0];
    imageCaptureRef.current = new ImageCapture(track);

    setCameraReady(true);
  } catch (error) {
    console.log(error);
    alert("Camera access failed. Please check your permissions.");
    setCameraReady(false);
  }
}


  
async function clickPhoto() {
  try {
    if (!imageCaptureRef.current) {
      return;
    }

    const blob = await imageCaptureRef.current.takePhoto();
    const buffer = await blob.arrayBuffer();

    await window.electronAPI.savePhoto(buffer);

    console.log("Photo saved successfully");
  } catch (error) {
    console.log("Error capturing photo:", error);
  }
}

  useEffect(() => {
    if(!started) return;
    const id=setInterval(() => {
      clickPhoto();
    }, 5000)
    return () => {
      clearInterval(id);
    }
  },[started])

  
  async function startTest() {
    if (!cameraReady) {
      alert("Please enable your camera first.");
      return;
    }

    if (!fullScreenReady) {
      alert("Please enable full screen before starting the test.");
      return;
    }

    const response = await window.electronAPI.showExamRules();

    if (response === 0) {
      await window.electronAPI.startTest();

      const remainingTime =
        await window.electronAPI.getRemainingTime();

      setCompleted(false);
      setTime(remainingTime);
      setStarted(true);
    }
  }
    
  
  function endTest() {
    setStarted(false);
    setCompleted(true);
    setTime(0);

    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    }

    imageCaptureRef.current = null;
    setCameraReady(false);
  }





  function formatTimeLeft(ms) {
    const seconds = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");

    const minutes = Math.floor((ms / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");

    const hours = Math.floor(ms / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  
  

  async function enableFullScreen() {
    const enabled = await window.electronAPI.setFullScreen();

    setFullScreenReady(enabled);

    if (!enabled) {
      alert("Could not enable full-screen mode.");
    }
  }
  
  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        className={
          cameraReady && !started ? "video-preview" : "hidden-video"
        }
      />

      <div className="page-container">

        {/* SETUP SCREEN */}
        {!started && !completed && (
          <>
            <div className="header-section">
              <h1>Hi User!</h1>
              <p>
                Kindly Allow the following Permissions to Start the test:
              </p>
            </div>

            <div className="card-container">
              <div className="permission-item">
                <div className="permission-icon">↗</div>

                <div className="permission-content">
                  <h3>Configure Camera</h3>
                  <p>
                    Kindly configure Camera to attempt quiz/contests.
                  </p>

                  <div className="action-row">
                    <button
                      onClick={getCamera}
                      className="btn btn-dark"
                      disabled={cameraReady}
                    >
                      {cameraReady
                        ? "Camera Connected ✓"
                        : "Get Camera Access"}
                    </button>
                  </div>

                  {cameraReady && <div className="camera-space" />}
                </div>
              </div>

              <div className="divider" />

              <div className="permission-item">
                <div className="permission-icon">⛶</div>

                <div className="permission-content">
                  <h3>Switch to full screen</h3>
                  <p>
                    Kindly close all tabs and switch to full screen.
                  </p>

                  <button
                    className="btn btn-primary"
                    onClick={enableFullScreen}
                    disabled={fullScreenReady}
                  >
                    {fullScreenReady
                      ? "Full Screen Enabled ✓"
                      : "Give Full Screen Permissions"}
                  </button>
                </div>
              </div>
            </div>

            <div className="bottom-actions">
              <button
                onClick={startTest}
                className="btn btn-light-blue"
              >
                Go To Test
              </button>
            </div>
          </>
        )}

        {/* ACTIVE SESSION */}
        {started && (
          <div className="exam-dashboard">
            <div className="exam-dashboard-header">
              <h2>Athena Examination</h2>
              <span className="exam-live-status">
                ● Session Active
              </span>
            </div>

            <div className="exam-timer-card">
              <p>Time Remaining</p>
              <h1>{formatTimeLeft(time)}</h1>
              <span>Examination in progress</span>
            </div>

            <div className="exam-monitor-card">
              <h3>Monitoring Status</h3>

              <div className="exam-monitor-row">
                <span>Camera</span>
                <strong>● Active</strong>
              </div>

              <div className="exam-monitor-row">
                <span>Full Screen</span>
                <strong>Enabled</strong>
              </div>
            </div>

            <button
              className="exam-end-button"
              onClick={endTest}
            >
              End Session
            </button>
          </div>
        )}


        {/* COMPLETED SESSION */}
        {completed && (
          <div className="session-completed">
            <div className="completion-icon">✓</div>

            <h2>Examination Completed</h2>

            <p>
              Your examination session has ended successfully.
            </p>

            <div className="completion-message">
              <strong>Session Ended</strong>
              <span>
                You may now close the application.
              </span>
            </div>
          </div>
        )}


      </div>
    </>
  );
}

export default App;

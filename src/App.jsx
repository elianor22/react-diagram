import Application from "./components/Flow";
// import './App.css'

function App() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          right: 0,
        }}
      >
        <p
          style={{
            margin: 0,
            marginRight: 2,
          }}
        >
          This Project is alpha version
          <br/>
          <span>big features for the next update!</span>
        </p>
      </div>
      <Application />
    </>
  );
}

export default App;

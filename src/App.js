import IranMap from "./components/IranMap";

function App() {
  return (
    <>
      <div className="hero">
        <IranMap />
      </div>
      <style jsx>{`
        .hero {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-start;
          align-items: flex-start;
        }
        @media only screen and (max-width: 1200px) {
          .hero {
            display: flex;
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </>
  );
}

export default App;

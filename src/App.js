import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import MicroFrontend from './MicroFrontEnd'
import './App.css';

const defaultHistory = createBrowserHistory();

const {
  REACT_APP_DOGS_HOST: dogshost,
  REACT_APP_CATS_HOST: catshost,
} = process.env;

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title">Cats and Dogs</h1>
      <h4>Random pics of cats and dogs</h4>
    </div>
  );
}

// ***START***
//Creating MicfroFrontends
// ***START***
function Dogs({history}) {
  return <MicroFrontend history={history} host={dogshost} name="Dogs" />;
}

function Cats({history}) {
  return <MicroFrontend history={history} host={catshost} name="Cats" />;
}

function GreetingCat({history}) {
  return (
    <div>
      <Header />
      <div className="home">
        <MicroFrontend history={history} host={catshost} name="Cats" />
      </div>
    </div>
  )
}
// *** END ***
//Creating MicfroFrontends
// *** END ***

function Home({history = defaultHistory}) {
  const [input, setInput] = useState("");

  const handleOnClick = () => {
    history.push(`/cat/${input}`);
  };

  return (
    <div>
      <Header />
      <div className="home">
        <input
          placeholder="Insert a greeting"
          defaultValue={input}
          onBlur={(e) => setInput(e.target.value)}
        />
        <button onClick={handleOnClick}>Greet Me</button>
      </div>

      <div className="home">
        <div className="content">
          <div className="cat">
            <Cats />
          </div>
          <div className="dog">
            <Dogs />
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cat/:greeting" component={GreetingCat} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;

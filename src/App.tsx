import React, {useEffect} from 'react';
import './App.css';
import Main from "./components/main/Main";
import {useAppDispatch} from "./hooks/hooks";
import {getCitiesTC} from "./bll/app-reducer";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCitiesTC())
    }, [])

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;

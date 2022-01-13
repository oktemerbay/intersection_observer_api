import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import App2 from './App2';
import App3 from './App3';

function App() {
	
	const [isIntersectionObserverApi , setIsIntersectionObserverApi] = useState(true);
	
	function changeSample(e) {
		setIsIntersectionObserverApi(!isIntersectionObserverApi);
	}

  return (
    <div>
	<button onClick={changeSample}>Örnek Değiştir</button>
	{isIntersectionObserverApi ? <App3 /> : <App2 />}
    </div>
  );
}

export default App;

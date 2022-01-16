import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import BoundingClientRectPage from './BoundingClientRectPage';
import IntersectionObserverPage from './IntersectionObserverPage';

function App() {
	
	const [isIntersectionObserverApi , setIsIntersectionObserverApi] = useState(true);
	
	function changeSample(e) {
		setIsIntersectionObserverApi(!isIntersectionObserverApi);
	}

  return (
    <div>
	<button onClick={changeSample}>Örnek Değiştir</button>
	{isIntersectionObserverApi ? <IntersectionObserverPage /> : <BoundingClientRectPage />}
    </div>
  );
}

export default App;

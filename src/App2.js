import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import {useState,useEffect,useRef} from 'react';



function App2() {
	
	
	const dataRef = useRef([]);
	const dataElementRef = useRef([]);
	const myDivRef = useRef();
	const [data , setData] = useState([]);
	const [rect, setRect] = useState();
	

	function scrollListener() {
		const marginPixel = 20;
		const arrSize = dataRef.current.length;
		let isAdd = false;
		if (arrSize == 0) { //ilk calistirmada listeyi doldurmak icin
			isAdd = true;
		} else { // en son elementin gorunup gorulmedigi kontrolu yapilacak
			const divVar = dataElementRef.current[dataElementRef.current.length - 1];
			const rectVar = divVar.getBoundingClientRect();
			setRect(JSON.stringify(rectVar));
			if ((myDivRef.current.offsetTop + myDivRef.current.offsetHeight
				+ marginPixel ) >=  rectVar.bottom) {
				isAdd = true;
			}
		}
		if (isAdd) {
			for (let i= arrSize ; i < arrSize + 300 ; i++) {
				const elem = <div key={i} 
					ref={(el) => dataElementRef.current[i] = el}>
					Data {i}
				</div>;
				dataRef.current.push(elem);
			}
		}
		setData(dataRef.current);
	}
	
	useEffect(() => {
		scrollListener();
		myDivRef.current.addEventListener('scroll',scrollListener)
	},[]);
	
	return (
		<>
			<h3>GET BOUNDING CLIENT REACT</h3>
			<h3>ÖRNEK DATA LİSTESİ</h3>
			<div style={{height:'200px',width:'200px',overflowY:'scroll'}} ref={myDivRef}>
				{data}
			</div>
		</>
	);
}

export default App2;

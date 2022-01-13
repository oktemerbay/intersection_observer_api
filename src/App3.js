import {useEffect , useState , useRef} from 'react';

function App3 (){
	
	const [data , setData] = useState([]);
	const dataRef = useRef([])
	const dataElementRef = useRef([]);
	const myDivRef = useRef();
	const myDivListRef = useRef();
	const lastElementRef = useRef();
	
	function callback (entries , observer) {
		entries.forEach((entry) => {
			console.log('entry:',entry);
			//observer.disconnect();
			//console.log('entry.isIntersecting:',entry.isIntersecting);
			//console.log('entry.target:',entry.target);
			if (entry.isIntersecting) {
				//console.log('entry.isIntersecting:',entry.isIntersecting);
				//console.log('entry.target:',entry.target);
				if(lastElementRef.current == entry.target) {
					addData();
					observer.unobserve(entry.target);
				}
			}
		});
	}
	
	function addData() {
		let arraySize = dataRef.current.length;
		for (let i = arraySize ; i < arraySize + 300 ; i++) {
			const elem = <li key={i} 
				ref={(el) => dataElementRef.current[i] = el}>
				Data {i}
			</li>;
			dataRef.current.push(elem);
		}
		setData(dataRef.current.slice());
	}
	
	function createObserver(){
		let options = {
		  root: myDivListRef.current,//null,//myDivRef.current,
		  rootMargin: '0px 0px 0px 0px',//'0px',
		  threshold: 1.0
		}
		let observer = new IntersectionObserver(callback, options);
		for (let i = 0 ; i < dataElementRef.current.length ; i++) {
			let elem = dataElementRef.current[i];
			//observer.observe(elem);
			if (i == (dataElementRef.current.length - 1)) {
				lastElementRef.current = elem;
				observer.observe(elem);
			}
		}
	}
	
	useEffect(()=>{
		createObserver();
	},[data]);
	
	useEffect(() => {
		addData();
	},[]);
	

	
	
	
	return (
		<div ref={myDivRef}>
			<h3>INTERSECTION OBSERVER API</h3>
			<h3>ÖRNEK DATA LİSTESİ</h3>
			<ul style={{height:'200px',width:'200px',overflowY:'scroll'}} ref={myDivListRef}>
					{data}
			</ul>
		</div>
	)
}

export default App3;
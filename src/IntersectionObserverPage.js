import {useEffect , useState , useRef} from 'react';

function IntersectionObserverPage (){
	
	const [data , setData] = useState([]);
	const dataRef = useRef([])
	const dataElementRef = useRef([]);
//	const myDivRef = useRef();
	const myDivRef = useRef();
	const lastElementRef = useRef();
	
	function addData() {
		let arraySize = dataRef.current.length;
		for (let i = arraySize ; i < arraySize + 300 ; i++) {
			const elem = <div key={i} 
				ref={(el) => dataElementRef.current[i] = el}>
				Data {i}
			</div>;
			dataRef.current.push(elem);
		}
		setData(dataRef.current.slice());
	}
	
	function callback (entries , observer) {
		entries.forEach((entry) => {
			console.log('entry:',entry);
			if (entry.isIntersecting) {
				if(lastElementRef.current == entry.target) {
					addData();
					observer.unobserve(entry.target);
				}
			}
		});
	}
	
	function createObserver(){
		let options = {
		  root: myDivRef.current,
		  rootMargin: '0px 0px 0px 0px',
		  threshold: 1.0
		}
		let observer = new IntersectionObserver(callback, options);
		for (let i = 0 ; i < dataElementRef.current.length ; i++) {
			let elem = dataElementRef.current[i];
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
		<div>
			<h3>INTERSECTION OBSERVER API</h3>
			<h3>ÖRNEK DATA LİSTESİ</h3>
			<div style={{height:'200px',width:'200px',overflowY:'scroll' , backgroundColor:'#c5fafc'}} ref={myDivRef}>
					{data}
			</div>
		</div>
	)
}

export default IntersectionObserverPage;
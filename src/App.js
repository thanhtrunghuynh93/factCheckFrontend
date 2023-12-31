import { Routes, Route } from 'react-router-dom';
import './App.css';
// import FactCheck from './components/FactCheck';
// import Header from './components/Header';
import Home from './components/Home'
import MedFact from './components/MedFact'
import Header from './components/Header';

function App() {
	return (
		<>
			<Header />
			<Routes data-theme='light'>
				<Route path='/' element={<Home />} />
				<Route path='/medfact' element={<MedFact />} />
			</Routes>
		</>
	);
}

export default App;

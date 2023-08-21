import { useState } from 'react';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';

const mock_data = {
	content:
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, voluptatum! Ea aut mollitia provident, dignissimos nostrum voluptates. Doloremque, voluptatum velit?',
	explain:
		'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem quos neque, aliquam laborum doloribus harum quis quia necessitatibus ullam facere earum veritatis itaque reprehenderit commodi repellendus eos eaque tempora nostrum veniam quibusdam esse illo. Voluptatibus tempore impedit suscipit eum facere?',
	source: 'https://vi.wikipedia.org/wiki/Nh%E1%BB%87n',
};
function App() {
	const [keyword, setKeyword] = useState('');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const handleOnSearch = (e) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setData([mock_data, mock_data, mock_data, mock_data, mock_data]);
		}, 3000);
	};

	return (
		<div className='container'>
			<div id='search-bar'>
				<div className='search-area'>
					<svg
						width='32'
						height='32'
						viewBox='0 0 32 32'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M20.6668 18.6668H19.6134L19.2401 18.3068C20.8401 16.4401 21.6668 13.8934 21.2134 11.1868C20.5868 7.4801 17.4934 4.5201 13.7601 4.06677C8.1201 3.37344 3.37344 8.1201 4.06677 13.7601C4.5201 17.4934 7.4801 20.5868 11.1868 21.2134C13.8934 21.6668 16.4401 20.8401 18.3068 19.2401L18.6668 19.6134V20.6668L24.3334 26.3334C24.8801 26.8801 25.7734 26.8801 26.3201 26.3334C26.8668 25.7868 26.8668 24.8934 26.3201 24.3468L20.6668 18.6668ZM12.6668 18.6668C9.34677 18.6668 6.66677 15.9868 6.66677 12.6668C6.66677 9.34677 9.34677 6.66677 12.6668 6.66677C15.9868 6.66677 18.6668 9.34677 18.6668 12.6668C18.6668 15.9868 15.9868 18.6668 12.6668 18.6668Z'
							fill='#572F11'
						/>
					</svg>
					<form onSubmit={handleOnSearch}>
						<input
							type='text'
							id='fact'
							name='fact'
							placeholder='Type to search'
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
						></input>
					</form>
				</div>
				<button className='btn' onClick={handleOnSearch}>
					{loading ? (
						<CircularProgress color='inherit' size={16} />
					) : (
						'Search'
					)}
				</button>
			</div>
			<div className='result'>
				<ul>
					{data.length > 0 &&
						data.map((item, index) => (
							<li key={index}>
								<p>{item.content}</p>
								<p>
									<b>Explain</b>
									{item.explain}
								</p>
								<p>
									<b>Source:</b>
									<a
										href={item.source}
										target='_blank'
										rel='noreferrer'
									>
										{item.source}
									</a>
								</p>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}

export default App;

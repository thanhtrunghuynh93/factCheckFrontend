import { useEffect, useState } from 'react';
import {
	CircularProgress,
	Box,
	Tab,
	// Tabs,
	Card,
	CardActionArea,
	CardContent,
} from '@mui/material';
import LinearProgressWithLabel from './LinearWithValueLabel';
import { TextareaAutosize } from '@mui/base';
import { styled } from '@mui/material/styles';

import { factCheckGPT, medfact } from '../api';

const FAKE = 'Fake';

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		'&.Mui-selected': {
			color: 'red',
		},
	}),
);

const MedFact = () => {
	const [keyword, setKeyword] = useState('');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [progress, setProgress] = useState(0);
	const handleOnSearch = async (e) => {
		e.preventDefault();
		setData(null);
		setProgress(0);
		setLoading(true);
		var result = await medfact({ claim: keyword, state: "", current_step: 0 });
		if (result.success) {
			
			setData(result.data);

			//TODO:Check the result, if not finish then continue to send here
			// while (result.data.done == 0){
			// 	result = await medfact({ claim: keyword, state: result.data.state, current_step: result.data.current_step });
			// 	// alert(result.data.state)
			// 	setData(result.data);
		
			// }
			setLoading(false);
			

		}
     };
	useEffect(() => {
		var timer;
		if (loading) {
			timer = setInterval(() => {
				setProgress((prevProgress) =>
					prevProgress >= 90 ? prevProgress : prevProgress + 5,
				);
			}, 1000);
			return () => {
				clearInterval(timer);
			};
		} else {
			clearInterval(timer);
			setProgress(100);
		}
	}, [loading]);

	return (
		<div className='container'>
			<div className='logo'>
				{/* <img src='./logo.drawio.svg' alt='logo' /> */}
				<img src='./logo.png' alt='logo' width='70%' />
			</div>
			<div>
					<div id='search-bar' className='mt-1'>
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
							<TextareaAutosize
								placeholder='Type to check a medical fact'
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
							/>
						</form>
					</div>
					<button className='btn' onClick={handleOnSearch}>
						{loading ? (
							<CircularProgress color='inherit' size={16} />
						) : (
							'Verify'
						)}
					</button>
				</div>
				{loading && (
					<LinearProgressWithLabel
						value={progress}
						className='mt-1'
					/>
				)}
				<div className='result mt-1'>
					{data && (
						<>
							{/* <Box
							sx={{
								padding: '0px  10px 10px 10px',
								border: '3px solid #f2f2f2',
								borderRadius: '5px',
							}}
						>
							<p className='title'>Claim:</p>
							<Box
								sx={{
									borderLeft: '4px solid #F29049',
									paddingLeft: '15px',
									fontSize: '20px',
								}}
							>
								{result.claim}
							</Box>
						</Box> */}
							{/* <Box
								sx={{
									padding: '0px  10px 10px 10px',
									border: '3px solid #f2f2f2',
									borderRadius: '5px',
									marginTop: '1rem',
								}}
							>
								<p className='title'>Rating:</p>
								<div className='d-flex align-center'>
									<img
										src={
											data.result === FAKE
												? './false_icon.png'
												: '/true_icon.png'
										}
										className='rating-icon'
										alt='rating-icon'
									/>
									<p className='rating-content'>
										{data.result === FAKE
											? 'Fake'
											: 'Correct'}
									</p>
								</div>
							</Box> */}
						</>
					)}
					<ul>
						{data &&
							data.steps.length > 0 &&
							data.steps.map((item, index) => (
								<li key={index}>
									<Card>
										<CardActionArea>
											<CardContent sx={{fontFamily: 'monospace'}}>
												<p>
													<b>{item.thought}</b> 
												</p>
												<p>
													<b>{item.action}</b>
													
												</p>	
																							
												{item.evidences.map((e, index) => (
													<div>
														<p>
													<b>Evidence: </b> {e.content}
													</p>
													<p>
													<b>Source:</b>
													<a
														href={e.source}
														target='_blank'
														rel='noreferrer'
													>
														{e.source}
													</a>
													</p>
													</div>
												))}												
											</CardContent>
										</CardActionArea>
									</Card>
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MedFact;

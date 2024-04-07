import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/factCheckNew`,
	headers: {
		accept: 'application/json',
	},
});

export async function getLink({claim}) {
    try {
        const res = await axiosInstance.post('get_links', {
            claim
        })
        return {
            success: true,
            data: res.data.data
        }
    } catch (error) {
        return {
            success: false
        }
    }
}


export async function verifySingleLink({claim, url}) {
    try {
        const res = await axiosInstance.post('verify_single_link', {
            claim,
            url
        })
        return {
            success: true,
            data: res.data.data
        }
    } catch (error) {
        return {
            success: false
        }
    }
}


export async function summarise({claim, item}) {
    try {
        const res = await axiosInstance.post('summarise_evidence', {
            claim,
            item
        })
        return {
            success: true,
            data: JSON.parse(res.data.data)
        }
    } catch (error) {
        return {
            success: false
        }
    }
}
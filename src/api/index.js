import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/factCheck`,
	headers: {
		accept: 'application/json',
	},
});

export async function medfact(data) {
    console.log("Preparing passing the data")
    console.log(data)
    try {
        const res = await axiosInstance.post('medfact', data)
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

export async function factCheckGPT({ claim }) {
    try {
        const res = await axiosInstance.post('gpt4', {
            claim
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


// export async function factCheckGPT({ claim }) {
//     try {
//         const res = await axiosInstance.post('gpt', {
//             claim
//         })
//         return {
//             success: true,
//             data: JSON.parse(res.data.data)
//         }
//     } catch (error) {
//         return {
//             success: false
//         }
//     }
// }



export async function factCheckNLI({ claim }) {
    try {
        const res = await axiosInstance.post('nli', {
            claim
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
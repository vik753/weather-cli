import axios from "axios";
import {getKeyValue} from "./storage.service.js";
import {printError} from "./log.service.js";

export const getCurrentWeather = async (city) => {
	const token = await getKeyValue('token');
	if (!token) {
		printError('Token is required. Please add token using command -t {API_KEY}');
		return;
	}

	const result = {data: null, error: null};
	try {
		const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
			params: {
				q: city,
				appid: token,
				units: 'metric'
			}
		})
		result.data = data;
		return result;
	} catch(err) {
		result.error = err;
		return result;
	}
}

export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};
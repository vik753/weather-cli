#!/usr/bin/env node

import {getArgs} from "./helpers/args.js";
import {printCurrentWeather, printError, printHelp, printSuccess} from "./services/log.service.js";
import {getKeyValue, saveKeyValue} from "./services/storage.service.js";
import {getCurrentWeather} from "./services/api.service.js";



const saveToken = async (token) => {
	if (!token.length) {
		printError('Token is required');
		return;
	}
	try {
		await saveKeyValue('token', token);
		printSuccess('Token saved successfully.');
	} catch (err) {
		printError(`Token hasn't saved: ${err.message}`);
	}
}

const saveCity = async (city) => {
	try {
		await saveKeyValue('city', city);
		printSuccess('City saved successfully.');
	} catch (err) {
		printError(`City hasn't saved: ${err.message}`);
	}
}

const initCLI = async () => {
	const args = getArgs(process.argv);

	if (args['h']) {
		return printHelp();
	}
	if (args['c']) {
		return saveCity(args['c']);
	}
	if (args['t']) {
		return saveToken(args['t']);
	}
	const city = await getKeyValue('city');
	if (!city.length) {
		return printError('City is required. Please save city using command -c {city}');

	}

	const response = await getCurrentWeather(city);
	if (response.error) {
		const status = response.error?.response?.status;
		const message = status === 404 ? 'Incorrect city' : status === 401 ? 'Incorrect token' : response.error.message;
		return printError(`${message}, ${response.error.code}`);
	}
	if (response.data) {
		return printCurrentWeather(response.data);
	}

}

initCLI();

import chalk from 'chalk';
import dedent from "dedent";
import {getIcon} from "./api.service.js";

export const printError = (errorText) => {
	console.log(chalk.bgRed(' ERROR ') + ` ${errorText}`);
}

export const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ` ${message}`);
}

export const printHelp = () => {
	console.log(dedent`${chalk.bgCyan(' HELP ')}
		Without params: show weather
		-h: show help
		-s [CITY]: setup city
		-t [API_KEY]: setup API token
		`);
}

export const printCurrentWeather = (data) => {
	console.log(dedent`${chalk.bgGreenBright(' CURRENT WEATHER ')}
		City: ${data.name}, ${data.sys.country}
		Temperature: ${data.main.temp} Cº (feels like ${data.main.feels_like} Cº) (min: ${data.main.temp_min}, max: ${data.main.temp_max})
		Weather: ${data.weather[0].main}  ${getIcon(data.weather[0].icon)}
		Wind speed: ${data.wind.speed} m/s
		Humidity: ${data.main.humidity} %
		`);
}
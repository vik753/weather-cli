import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs';


const filePath = join(homedir(), 'weather-data.json');

export const saveKeyValue = async (key, value) => {
	const data = {};

	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const fileObject = JSON.parse(file);
		Object.assign(data, fileObject);
	}
	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
}

const isExist = async (path) => {
	try {
		await promises.stat(path);
		return true;
	} catch (err) {
		return false;
	}
}

export const getKeyValue = async (key) => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);
		return data[key] || null;
	}
	return null;
}
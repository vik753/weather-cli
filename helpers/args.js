export const getArgs = (args) => {
	const res = {};
	const [executer, file, ...rest] = args;
	rest.forEach((item, index, arr) => {
		if (item.charAt(0) === '-') {
			if (index < arr.length - 1 && arr[index + 1].charAt(0) !== '-') {
				res[item.substring(1)] = arr[index + 1]
			} else {
				res[item.substring(1)] = true;
			}
		}
	})
	return res;
}
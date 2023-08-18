const flattenObj = (ob) => {
	const result = {};
	for (const i in ob) {
		if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
			const temp = flattenObj(ob[i]);
			// eslint-disable-next-line guard-for-in
			for (const j in temp) {
				result[j] = temp[j];
			}
		} else {
			result[i] = ob[i];
		}
	}
	return result;
};

export default flattenObj;

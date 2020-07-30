export const formValidation = (validations: any, value: any, formData: any = null) => {
	var validates = true;
	for (var val in validations) {
		switch (val) {
			case 'regex':
				if (validations[val].test(value)) {
					validates = validates && true;
					break;
				}

				validates = validates && false;
				break;
			case 'minLength':
				if (validations[val] <= value.length) {
					validates = validates && true;
					break;
				}
				validates = validates && false;
				break;
			default:
				break;
			case 'maxLength':
				if (validations[val] >= value.length) {
					validates = validates && true;
					break;
				}
				validates = validates && false;

				break;
			case 'required':
				if (value) {
					if (value.length !== 0) {
						validates = validates && true;
						break;
					}
				}

				validates = validates && false;
				break;
			case 'equal':
				if (value === formData[validations[val]]) {
					validates = validates && true;
					break;
				}
				validates = validates && false;
				break;
			case 'number':
				if (typeof value === 'number') {
					validates = validates && true;
					break;
				}
				validates = validates && false;
				break;
		}
	}

	return validates;
};


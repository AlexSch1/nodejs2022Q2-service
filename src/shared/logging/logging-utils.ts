export enum Levels {
	ERROR = 'error',
	WARM = 'warn',
	LOG = 'log',
	VERB = 'verbose',
	DEBUG = 'debug',
}

export const getLogLevel = (l: string) => {
	const levels = {
		'1': Levels.DEBUG,
		'2': Levels.VERB,
		'3': Levels.LOG,
		'4': Levels.WARM,
		'5': Levels.ERROR,
	};

	switch (levels[l]) {
		case Levels.DEBUG:
			return ['debug'];
		case Levels.VERB:
			return ['debug', 'verbose'];
		case Levels.LOG:
			return ['debug', 'verbose', 'log'];
		case Levels.WARM:
			return ['debug', 'verbose', 'log', 'warn'];
		case Levels.ERROR:
			return ['debug', 'verbose', 'log', 'warn', 'error'];
	}
};

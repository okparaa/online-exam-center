import 'fake-indexeddb/auto'
// Mock Browser API's which are not supported by JSDOM, e.g. ServiceWorker, LocalStorage
/**
 * An example how to mock localStorage is given below 👇
 */


// Mocks localStorage
const localStorageMock = (function() {
	let store = {};

	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: any) => store[key] = value.toString(),
		clear: () => store = {}
	};

})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});


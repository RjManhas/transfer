import logger from "shared/logger";
import figlet from 'figlet';
import event from "shared/event";
import { ConfigObject, collectInvalidPaths } from "shared/config";
import config from '@/config';

async function configInit(){
	if (config.config.parseIgnore){return true}
	const invalidPaths = collectInvalidPaths(config);

	if (invalidPaths.length > 0) {
	invalidPaths.forEach(async (path)  => {
		logger.alert("Invalid configuration detected", {path: path})
	})
	return false;
	} else {
	logger.success("Configuration is valid")
	return true;
	} 
}



async function init(){
	await figlet("TSDX",function (err, data) {
		if (err) {
		  return;
		}
		logger.info("\n"+data);
	  })
	logger.info(`Version: ${process.env.npm_package_version}`);
	logger.info("TSDX initialzing")
	logger.success("TSDX logger initialized successfully");
	logger.success("TSDX event handler initialized successfully");
	logger.info("TSDX config handler initializing");
	if (!await configInit()){
		logger.warn("TSDX config handler, sucessfully initialized, but detected invalid configuration, we recomand you check the alerts that have been provided above and fix them.")
	} else {
		logger.success("TSDX config handler initialized successfully");
	}
	
	logger.info(`TSDX booting up as a ${config.node.type} node`)
	logger.info("TSDX HTTP server intialized successfully")

	// event.on('simpleEvent', () => {
	// 	console.log(`Simple event triggered!`);
	//   });
	//   event.emit('simpleEvent');
	//   event.on('greet', (data) => {
	// 	console.log(`Hello, ${data.name}!`);
	// 	return { ...data, message: `Hello, ${data.name}a!` };
	//   });
	//   const greetData = event.emit('greet', { name: 'Alice', message: '' });

}

init();


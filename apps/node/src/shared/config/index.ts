export type ConfigObject = {
	[key: string]: ConfigValue;
  };
  
  type ConfigValue = string | number | boolean | null | ConfigObject | ConfigValue[];
  
  // Function to recursively collect paths to values containing "changeme"
  function collectInvalidPaths(config: ConfigObject, prefix: string = ''): string[] {
	let invalidPaths: string[] = [];
  
	for (const key in config) {
	  const value = config[key];
	  const currentPath = prefix ? `${prefix}.${key}` : key.toString();
  
	  if (typeof value === 'string') {
		if (value === 'changeme') {
		  invalidPaths.push(currentPath);
		}
	  } else if (Array.isArray(value)) {
		value.forEach((item, index) => {
		  const itemPath = `${currentPath}[${index}]`;
		  if (typeof item === 'string' && item === 'changeme') {
			invalidPaths.push(itemPath);
		  } else if (typeof item === 'object' && item !== null) {
			// @ts-ignore
			invalidPaths = invalidPaths.concat(collectInvalidPaths(item, itemPath));
		  }
		});
	  } else if (typeof value === 'object' && value !== null) {
		invalidPaths = invalidPaths.concat(collectInvalidPaths(value, currentPath));
	  }
	}
  
	return invalidPaths;
  }
  

  export {collectInvalidPaths}
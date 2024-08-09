import { ConfigObject } from "shared/config";

enum NodeType {
	Control = "control",
	Worker = "worker",
	Job = "job",
}

const config = {
	node: {
		type: NodeType.Control,
		adminUsername: "changeme",
		adminPassword: "changeme",
	},
	config: {
		parseIgnore: true
	},
	general: {
		mode: "development",
	},
}




export default config;
export { NodeType}
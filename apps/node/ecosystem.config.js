module.exports = {
    apps: [
        {
            name: "node",
            script: "npm run start:prod",
            cwd: "./",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};
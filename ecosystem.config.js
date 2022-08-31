module.exports = {
  apps: [
    {
      name: 'web',
      script: 'npm',
      automation: false,
      args: 'run serve',
      watch: './web/build/**/*',
    },
    {
      name: 'hardware',
      script: './hardware/serialport.js',
      watch: ['./hardware/serialport.js'],
    },
  ],
};

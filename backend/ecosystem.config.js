module.exports = {
  apps: [
    {
      name: 'encuestas',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
        CORS_ORIGIN:'localhost',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_USER: 'app',
        DB_PASSWORD: '1234',
        DB_NAME: 'encuestas',
        DB_LOGGING: 'false',
        GLOBAL_PREFIX: 'api',
        SWAGGER_HABILITADO: false,
      },
      time: true,
    },
  ],
};

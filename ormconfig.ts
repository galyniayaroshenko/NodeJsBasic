module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'node_gmp',
  password: 'password123',
  database: 'node_gmp',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};

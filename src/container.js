import BookRepository from './BookRepository'
require("reflect-metadata");
const { Container, decorate, injectable } = require("inversify");

const container = new Container();

decorate(injectable(), BookRepository);
container.bind(BookRepository).toSelf()

module.exports = container
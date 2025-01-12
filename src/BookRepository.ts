import { BookModel } from './models/Book';
import MyBook from './type/book';
import { injectable } from 'inversify';

@injectable()
class BooksRepository {
  async createBook(book: MyBook) {
    try {
      const newBook = new BookModel(book);
      await newBook.save();
      return newBook;
    } catch (e) {
      console.error(e);
    }
  }

  async getBook(id: string) {
    try {
      return await BookModel.findById(id).select('-__v');
    } catch (e) {
      console.error(e);
    }
  }

  async getBooks() {
    try {
      return await BookModel.find().select('-__v');
    } catch (e) {
      console.error(e);
    }
  }

  async updateBook(id: string, book: MyBook) {
    try {
      const findBook = await BookModel.findById(id);
      await findBook.updateOne(book);
      return findBook;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteBook(id: string) {
    try {
      await BookModel.deleteOne({ _id: id });
    } catch (e) {
      console.error(e);
    }
  }
}

export default BooksRepository;

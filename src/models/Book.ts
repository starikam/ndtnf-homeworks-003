import { model, Schema } from 'mongoose';
import MyBook from '../type/book';

const bookSchema = new Schema<MyBook>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: '',
  },
  favorite: {
    type: String,
    default: '',
  },
  fileCover: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
  fileBook: {
    type: String,
    default: '',
  },
});

export const BookModel = model('Book', bookSchema);

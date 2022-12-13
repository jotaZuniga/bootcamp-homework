import mongoose, {Mongoose} from "mongoose"
export class DBConnect {
  private url: string;
  private dbName: string;

  constructor(url: string, db: string) {
    this.url = url;
    this.dbName = db;
  }

  async init(): Promise<Mongoose> {
    this.dbEvents();
    mongoose.Promise = global.Promise
    return mongoose.connect(this.url, { dbName: this.dbName});
  }

  dbEvents() {
    mongoose.set('strictQuery', true);

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to db...');
    });
  
    mongoose.connection.on('error', err => {
      console.log(err.message);
    });
  
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection is disconnected...');
    });
  }
}

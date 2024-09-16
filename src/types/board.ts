export type Board = {
  _id: string;
  name: string;
  user: {
    _id: string;
  }
  slug?: string;
  createdAt: string; // Use Date if you prefer to handle dates
  updatedAt: string; // Use Date if you prefer to handle dates
  __v: number;
}

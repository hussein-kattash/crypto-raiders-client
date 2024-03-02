class Obj {
  ar: string = "";
  en: string = "";
  ru: string = "";
}

class Category {
  ar: String[] = [];
  en: String[] = [];
  ru: String[] = [];
}

export class PostModel {
  _id:string = "";
  image: string = "";
  title: Obj = new Obj();
  content: Obj = new Obj();
  category: Category = new Category();
  createdAt: string = "";
  updatedAt: string = "";
}

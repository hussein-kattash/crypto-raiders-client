export class MemberModel {
  name: string = "";
  role: string = "";
  image: string = "";
  links: Links = new Links();
}

export class Links {
  telegram: string = "";
  twitter: string = "";
  linkedin: string = "";
  youtube: string = "";
  gmail: string = "";
}

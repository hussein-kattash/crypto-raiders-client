import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import { Links } from "@/app/models/MemberModel";

type Props = {
  image: string;
  name: string;
  role: string;
  links: Links;
};
const MemberCard = ({ image, name, role, links }: Props) => {
  return (
    <Card className="w-[320px] h-[370px] card_">
      <CardBody className="flex flex-col items-center mt-8">
        <img src={image} className="sm:!w-[140px] sm:!h-[140px] w-[120px] h-[120px] rounded-[50%]" />
        <h2 className="mt-4">{name}</h2>
        <span>{role}</span>
      </CardBody>
      <CardFooter className="flex mb-8 flex-row justify-center gap-4">
        {links.gmail && (
          <Link href={`mailto:${links.gmail}`}>
            <img src="/gmail.png" alt="" className="w-6" />
          </Link>
        )}
        {links.linkedin && (
          <Link href={links.linkedin}>
            <img src="/linkedin.png" alt="" className="w-6" />
          </Link>
        )}
        {links.youtube && (
          <Link href={links.youtube}>
            <img src="/youtube.png" alt="" className="w-6" />
          </Link>
        )}
        {links.twitter && (
          <Link href={links.twitter}>
            <img src="/twitter.png" alt="" className="w-6" />
          </Link>
        )}
        {links.telegram && (
          <Link href={links.telegram}>
            <img src="/telegram.png" alt="" className="w-6" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default MemberCard;

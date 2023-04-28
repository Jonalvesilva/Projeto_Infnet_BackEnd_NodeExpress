import { Link } from "react-router-dom";

export type BreadcrumbsProps = {
  links: { title: string; link: string }[];
};

export function Breadcrumbs({ links }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-row items-center gap-4 mt-2 w-11/12 h-16 mx-auto md:max-w-screen-md">
      {links.map(({ title, link }, index) => (
        <span key={index} className="flex flex-row items-center">
          <Link
            key={index}
            to={link}
            className="uppercase text-sm text-white hover:text-gray-400 md:text-lg"
          >
            {title}
          </Link>
        </span>
      ))}
    </nav>
  );
}

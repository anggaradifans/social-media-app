import Link from "next/link";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex p-5" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {items.map((item, index) => (
          <li key={item.href}>
            {index !== items.length - 1 ? (
              <Link
                className="text-gray-500 hover:text-gray-700"
                href={item.href}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

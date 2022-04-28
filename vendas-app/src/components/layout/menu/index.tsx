import Link from "next/link";

export const Menu: React.FC = () => {
  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">
        Minhas Vendas
      </p>
      <ul className="menu-list">
        <MenuItem href="/" label="Home"/>
        <MenuItem href="/cadastros/produtos" label="Produtos"/>
        <MenuItem href="/" label="Config"/>
        <MenuItem href="/" label="Sair"/>
      </ul>
    </aside>
  )
}

interface MenuItemProps { 
  href: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({href, label}:MenuItemProps) => {
  return (
    <li>
      <Link href={href}>
        <a>
          <span className="icon"></span>  {label}
        </a>
      </Link>
    </li>
  )
}
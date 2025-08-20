import React from "react";
import { navigationConfig } from "../../config/navigation";

type SidebarProps = {
  role: keyof typeof navigationConfig;
};

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const menus = navigationConfig[role] || [];

  return (
    <aside className="bg-white shadow-md w-64 p-4">
      <ul className="space-y-2">
        {menus.map((menu) => (
          <li key={menu.path}>
            <a
              href={menu.path}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
            >
              <span>{menu.icon}</span> {menu.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

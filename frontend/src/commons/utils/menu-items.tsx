import { Home, History, User } from "lucide-react";
import { JSX } from "react";

export interface MenuItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

export const menuItems: MenuItem[] = [
  { name: "Início", icon: <Home size={20} />, path: "/" },
  { name: "Histórico", icon: <History size={20} />, path: "/history" },
  { name: "Perfil", icon: <User size={20} />, path: "/profile" },
];

import React from "react";
import { Button } from "../ui/button";
import { User, Settings, LogOut } from "lucide-react";

type TopbarProps = {
  name: string;
  role: string;
};

export const Topbar: React.FC<TopbarProps> = ({ name, role }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <User className="w-6 h-6 text-blue-600" />
        <span className="font-semibold">{role}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-1" /> Settings
        </Button>
        <Button variant="destructive" size="sm">
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </div>
    </header>
  );
};


import React from "react";
import { useHasPermission } from "../../../hook/permissionsHook";

const SidebarGroupTitle = ({ title, pTitles }) => {
  const hasPerm = useHasPermission(pTitles)
  return hasPerm && (
    <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover siebar_items">
      <span className="hiddenable no_wrap group_sidebar_title">{title}</span>
    </li>
  );
};

export default SidebarGroupTitle;

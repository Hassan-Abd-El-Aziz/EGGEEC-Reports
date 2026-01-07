import React from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";

const ProjectsMenu = ({ mobile = false, onItemClick }) => {
  const baseClass = mobile
    ? "space-y-2 pr-6 mt-2"
    : "absolute top-full mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50";

  return (
    <div className={baseClass}>
      {projectsData.map((project) => (
        <Link
          key={project.id}
          to={`/project/${project.id}`}
          className="block px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-primary-blue transition-colors border-r-4 border-transparent hover:border-secondary-gold"
          onClick={onItemClick}
        >
          <div className="font-semibold">{project.name}</div>
          <div className="text-sm text-gray-600 mt-1">{project.location}</div>
          <div className="text-xs text-gray-500 mt-1">
            الحالة:{" "}
            <span
              className={`font-bold ${
                project.status === "جاري"
                  ? "text-green-600"
                  : project.status === "متوقف"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {project.status}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsMenu;

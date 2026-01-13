import React from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";

const Projects = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 pt-24">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-primary-dark mb-4">
            مشاريعنا <span className="text-secondary-gold">المتميزة</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نفتخر بتنفيذ مجموعة من أكبر وأهم مشروعات المصاعد والسلالم الكهربائية
            في مصر، متبعين أعلى معايير الجودة العالمية.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      project.status === "منتهي"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {project.status}
                  </span>
                  <div className="text-secondary-gold font-bold">
                    {project.progress}%
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-primary-dark mb-3">
                  {project.name}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 ml-2 text-secondary-gold" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 ml-2 text-secondary-gold" />
                    <span className="text-sm">{project.startDate}</span>
                  </div>
                </div>

                <Link
                  to={`/project/${project.id}`}
                  className="flex items-center justify-center w-full py-3 bg-primary-blue text-white rounded-xl font-bold hover:bg-primary-dark transition-colors group"
                >
                  عرض تفاصيل المشروع
                  <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;

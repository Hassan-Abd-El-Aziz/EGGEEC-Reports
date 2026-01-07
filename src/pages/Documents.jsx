import React, { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  File,
  Download,
  ExternalLink,
  Folder,
  Search,
  Filter,
  Calendar,
  FileArchive,
  FileImage,
  FileCode,
  FileVideo,
  Shield,
  Lock,
} from "lucide-react";
import { documentsData, documentCategories } from "../data/documentsData";

const Documents = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getFileIcon = (type) => {
    const iconProps = { className: "h-6 w-6" };

    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText {...iconProps} className="h-6 w-6 text-red-500" />;
      case "excel":
      case "xlsx":
      case "xls":
        return (
          <FileSpreadsheet {...iconProps} className="h-6 w-6 text-green-500" />
        );

      case "dwg":
        return <FileCode {...iconProps} className="h-6 w-6 text-blue-500" />;
      case "zip":
      case "rar":
        return (
          <FileArchive {...iconProps} className="h-6 w-6 text-purple-500" />
        );
      case "doc":
      case "docx":
        return <FileText {...iconProps} className="h-6 w-6 text-blue-600" />;
      case "jpg":
      case "png":
        return <FileImage {...iconProps} className="h-6 w-6 text-yellow-500" />;
      default:
        return <File {...iconProps} className="h-6 w-6 text-gray-500" />;
    }
  };

  const filteredDocuments = documentsData.filter((doc) => {
    const matchesCategory =
      selectedCategory === "all" ||
      doc.category === selectedCategory ||
      doc.category ===
        documentCategories.find((c) => c.id === selectedCategory)?.name;

    const matchesSearch =
      searchQuery === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleDownload = (url, title) => {
    // In a real app, this would trigger the actual download
    window.open(url, "_blank");
    console.log(`Downloading: ${title}`);
  };

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-dark to-primary-blue">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6" data-aos="fade-up">
            <Folder className="h-16 w-16 text-secondary-gold" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            data-aos="fade-up"
          >
            المستندات <span className="text-secondary-gold">والملفات</span>
          </h1>
          <p
            className="text-xl text-gray-200 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            جميع المستندات الرسمية والملفات الفنية متاحة للتحميل عبر OneDrive
          </p>

          {/* Security Badge */}
          <div
            className="inline-flex items-center mt-8 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Shield className="h-5 w-5 text-green-400 ml-2" />
            <span className="text-white">جميع الملفات مؤمنة ومشفرة</span>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-gray-50 sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Box */}
            <div
              className="relative flex-1 max-w-2xl w-full"
              data-aos="fade-right"
            >
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في المستندات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-12 py-4 rounded-xl border border-gray-300 focus:border-secondary-gold focus:ring-3 focus:ring-secondary-gold/20 transition-all bg-white pr-12"
                />
              </div>
            </div>

            {/* Filter & Sort */}
            <div className="flex items-center gap-4" data-aos="fade-left">
              <div className="flex items-center text-gray-600">
                <Filter className="h-5 w-5 ml-2" />
                <span className="font-medium">التصنيف:</span>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary-gold focus:ring-2 focus:ring-secondary-gold/20 bg-white"
              >
                {documentCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="mb-12" data-aos="fade-up">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary-dark">
                  {filteredDocuments.length} مستند متاح
                </h2>
                <p className="text-gray-600">جميع المستندات الرسمية للشركة</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 flex items-center">
                  <Lock className="h-4 w-4 ml-1" />
                  <span>مشفر باستخدام SSL 256-bit</span>
                </div>
              </div>
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="text-center py-20" data-aos="fade-up">
              <File className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                لا توجد مستندات
              </h3>
              <p className="text-gray-600">
                لم يتم العثور على مستندات تطابق بحثك
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDocuments.map((doc, index) => (
                <div
                  key={doc.id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-secondary-gold hover:shadow-2xl transition-all duration-300 card-hover"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Document Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        {getFileIcon(doc.type)}
                        <span className="mr-3 font-medium text-gray-700">
                          {doc.type}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${doc.categoryColor}`}
                      >
                        {doc.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-primary-dark mb-3 group-hover:text-secondary-gold transition-colors line-clamp-2">
                      {doc.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {doc.description}
                    </p>
                  </div>

                  {/* Document Details */}
                  <div className="p-6 pt-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 ml-1" />
                        <span>{doc.date}</span>
                      </div>
                      <div className="flex items-center">
                        <File className="h-4 w-4 ml-1" />
                        <span>{doc.size}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDownload(doc.url, doc.title)}
                        className="flex-1 flex items-center justify-center px-4 py-3 bg-primary-dark text-white rounded-lg hover:bg-primary-blue transition-colors group"
                      >
                        <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                        <span>فتح في OneDrive</span>
                      </button>

                      <button
                        onClick={() => handleDownload(doc.url, doc.title)}
                        className="p-3 border border-gray-300 rounded-lg hover:border-secondary-gold hover:bg-secondary-gold/10 transition-colors group"
                        aria-label="تحميل الملف"
                      >
                        <Download className="h-5 w-5 text-gray-600 group-hover:text-secondary-gold" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredDocuments.length > 0 && (
            <div className="mt-12 flex justify-center" data-aos="fade-up">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg font-medium ${
                      page === 1
                        ? "bg-secondary-gold text-primary-dark"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  التالي →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* OneDrive Integration Info */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-white/20 rounded-xl mr-4">
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.7 13.35l-1.45 1.45-2.2-2.2 1.45-1.45c.2-.2.51-.2.71 0l1.49 1.49c.2.2.2.51 0 .71zM12 18.94l6.06-6.06 2.2 2.2L14.2 21.1c-.2.2-.51.2-.71 0l-1.49-1.49c-.2-.2-.2-.51 0-.71zM4.16 5.56l4.95 4.94 2.2-2.2-4.95-4.95c-.2-.2-.51-.2-.71 0l-1.49 1.49c-.2.2-.2.51 0 .71z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">OneDrive Integration</h3>
                  <p className="text-blue-100">
                    مزامنة مباشرة مع OneDrive للشركات
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "مزامنة تلقائية",
                    desc: "جميع التحديثات تتم تلقائياً",
                  },
                  { title: "نسخ احتياطي", desc: "نسخ احتياطي يومي للملفات" },
                  { title: "وصول آمن", desc: "مشفرة بنظام SSL 256-bit" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/10 p-4 rounded-xl backdrop-blur-sm"
                  >
                    <div className="text-lg font-bold mb-1">
                      {feature.title}
                    </div>
                    <div className="text-sm text-blue-100">{feature.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              أمان <span className="text-secondary-gold">وموثوقية</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نضمن أمان وسرية جميع مستنداتك مع أنظمة حماية متطورة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                title: "تشفير متقدم",
                description: "جميع الملفات مشفرة باستخدام تقنية SSL 256-bit",
              },
              {
                icon: Lock,
                title: "صلاحيات وصول",
                description: "نظام متقدم لإدارة صلاحيات الوصول للمستخدمين",
              },
              {
                icon: Calendar,
                title: "سجل التعديلات",
                description: "تتبع كامل لجميع التعديلات والتحميلات",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="inline-flex p-4 bg-secondary-gold/10 rounded-xl mb-6">
                  <item.icon className="h-8 w-8 text-secondary-gold" />
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documents;

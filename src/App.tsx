import { useState, useEffect } from 'react';
import { Search, Code2, Database, Calculator } from 'lucide-react';
import { Loading } from './components/Loading';
import { Section } from './types/Section';  
import { sections } from './data/sections';
import Prism from 'prismjs';
import './styles/prism-pastel-dark.css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-powerquery';
import 'prismjs/components/prism-javascript'; // For DAX (using JavaScript highlighting)

// Initialize Prism.js
Prism.manual = true;


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"sql" | "powerquery" | "dax">("sql");
  const [loadedSections, setLoadedSections] = useState<Section[]>([]);

  useEffect(() => {
    const loadSections = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setLoadedSections(sections);
      } catch (error) {
        console.error("Error loading sections:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSections();
  }, []);

  const filteredSections = loadedSections.filter((section) =>
    section.category.startsWith(selectedLanguage) &&
    section.id !== 'sql-function-index' &&
    section.id !== 'real-world-sql' &&
    (section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories: Record<string, string> = {
    "sql-basics": "Basics",
    "sql-advanced": "Advanced",
    "sql-functions": "Functions",
    "sql-optimization": "Optimization",
    "powerquery-basics": "Basics",
    "powerquery-advanced": "Advanced",
    "powerquery-functions": "Functions",
    "dax-basics": "Basics",
    "dax-advanced": "Advanced",
    "dax-functions": "Functions",
  };

  const groupedSections = filteredSections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, Section[]>);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark text-secondary">
      <a href="https://dariusatsu.com" className="site-link" target="_blank" rel="noopener noreferrer">
        dariusatsu.com
      </a>
      <div className="container mx-auto py-[clamp(0.25rem,0.75vw,0.75rem)] px-[clamp(0.125rem,0.5vw,0.5rem)] w-[min(100%,1400px)] transition-all duration-300 ease-in-out">
        <div className="w-full bg-surface/80 px-[clamp(0.25rem,1vw,1rem)] py-[clamp(0.5rem,1.25vw,1rem)] mb-[clamp(0.5rem,1.5vw,1.25rem)] overflow-hidden transition-all duration-300 ease-in-out">
        <h1 
  className="font-['Druk_Wide_Bold'] tracking-ultra uppercase w-full text-center px-0 transition-all duration-300 ease-in-out" 
  style={{ 
    fontSize: 'min(calc(3.7vw), calc(100vw / 30), 3.1rem)', // Uses calc for responsive scaling, caps at 4.5rem
    lineHeight: '1.1', 
    letterSpacing: '0.02em', 
    whiteSpace: 'nowrap',
    width: '100%', 
    textAlign: 'justify', // Ensures text spans the full width
    padding: '0', 
    overflow: 'hidden', 
    display: 'flex',
    justifyContent: 'center',
  }}>
            DATA LANGUAGE CHEATSHEET
          </h1>
        </div>

        {/* Language Selection */}
        <div className="mb-8 flex space-x-4">
          <button
            onClick={() => setSelectedLanguage("sql")}
            className={`btn ${selectedLanguage === "sql" ? "btn-primary" : "bg-surface/60 text-secondary/80 hover:bg-surface-hover"}`}
          >
            SQL
          </button>
          <button
            onClick={() => setSelectedLanguage("powerquery")}
            className={`btn ${selectedLanguage === "powerquery" ? "btn-primary" : "bg-surface/60 text-secondary/80 hover:bg-surface-hover"}`}
          >
            Power Query
          </button>
          <button
            onClick={() => setSelectedLanguage("dax")}
            className={`btn ${selectedLanguage === "dax" ? "btn-primary" : "bg-surface/60 text-secondary/80 hover:bg-surface-hover"}`}
          >
            DAX
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary/60" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 bg-surface/80 text-secondary border-b-2 border-secondary/20 focus:border-secondary focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Quick Access Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => {
              const section = loadedSections.find(s => s.id === 'sql-function-index');
              if (section) setSelectedSection(section);
            }}
            className="btn bg-surface/60 text-secondary/80 hover:bg-surface-hover"
          >
            Function Index
          </button>
          <button
            onClick={() => {
              const section = loadedSections.find(s => s.id === 'real-world-sql');
              if (section) setSelectedSection(section);
            }}
            className="btn bg-surface/60 text-secondary/80 hover:bg-surface-hover"
          >
            Real-World SQL Use Cases
          </button>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(groupedSections).map(([category, categorySections]) => (
            <div key={category} className="card">
              <h2 className="text-2xl font-semibold mb-4">{categories[category as keyof typeof categories]}</h2>
              <div className="space-y-2">
                {categorySections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section)}
                    className="w-full text-left p-4 bg-surface/60 hover:bg-surface transition-all duration-200 border-b border-secondary/10 hover:border-secondary/30"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Section Details */}
        {selectedSection && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={() => setSelectedSection(null)}>
            <div className="bg-surface max-w-4xl w-full p-6 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto my-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-4">{selectedSection.title}</h3>
              <p className="mb-4">{selectedSection.content}</p>
              {selectedSection.code && (
                <pre className="p-4 bg-surface-dark rounded-md overflow-x-auto mb-4">
                  <code className={`language-${selectedLanguage}`} dangerouslySetInnerHTML={{
                    __html: Prism.highlight(
                      selectedSection.code,
                      selectedLanguage === 'dax' ? Prism.languages.javascript : Prism.languages[selectedLanguage],
                      selectedLanguage === 'dax' ? 'javascript' : selectedLanguage
                    )
                  }} />
                </pre>
              )}
              <button
                onClick={() => setSelectedSection(null)}
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Book, Search, Code2, Database, Calculator } from 'lucide-react';

type Section = {
  id: string;
  title: string;
  content: string;
  code?: string;
  category: 'sql-basics' | 'sql-advanced' | 'sql-functions' | 'sql-optimization' | 
           'powerquery-basics' | 'powerquery-advanced' | 'powerquery-functions' |
           'dax-basics' | 'dax-advanced' | 'dax-functions';
};

const sections: Section[] = [
  // SQL Basics
  {
    id: 'basic-queries',
    title: 'Basic Queries',
    category: 'sql-basics',
    content: 'Basic queries allow you to retrieve data from a dataset efficiently. You can select all columns or just the ones you need, filter results using the WHERE clause, and limit the number of rows returned to avoid excessive data processing.',
    code: `-- Select all columns from a table
SELECT * FROM \`project.dataset.table\`;

-- Select specific columns
SELECT column1, column2 FROM \`project.dataset.table\`;

-- Filter rows using WHERE
SELECT * FROM \`project.dataset.table\`
WHERE column1 = 'value';

-- Limit the number of results
SELECT * FROM \`project.dataset.table\`
LIMIT 10;`
  },
  {
    id: 'sql-aggregations',
    title: 'Aggregations',
    category: 'sql-basics',
    content: 'Aggregations help summarize large datasets by computing totals, averages, or other statistical insights. GROUP BY is particularly useful when analyzing data by different categories.',
    code: `-- Count the number of rows
SELECT COUNT(*) AS total_rows FROM \`project.dataset.table\`;

-- Sum values in a column
SELECT SUM(column1) AS total_sum FROM \`project.dataset.table\`;

-- Get the average value
SELECT AVG(column1) AS avg_value FROM \`project.dataset.table\`;

-- Group by a column
SELECT column1, COUNT(*) AS count
FROM \`project.dataset.table\`
GROUP BY column1;

-- Multiple aggregations
SELECT 
  category,
  COUNT(*) as count,
  AVG(price) as avg_price,
  MAX(price) as max_price,
  MIN(price) as min_price
FROM \`project.dataset.table\`
GROUP BY category;`
  },
  {
    id: 'sql-filtering',
    title: 'Advanced Filtering',
    category: 'sql-basics',
    content: 'Complex filtering techniques to get exactly the data you need.',
    code: `-- Multiple conditions
SELECT * FROM \`project.dataset.table\`
WHERE (category = 'A' OR category = 'B')
AND price > 100;

-- IN clause
SELECT * FROM \`project.dataset.table\`
WHERE category IN ('A', 'B', 'C');

-- BETWEEN clause
SELECT * FROM \`project.dataset.table\`
WHERE date BETWEEN '2024-01-01' AND '2024-12-31';

-- Pattern matching
SELECT * FROM \`project.dataset.table\`
WHERE name LIKE 'John%';

-- NULL handling
SELECT * FROM \`project.dataset.table\`
WHERE column1 IS NULL OR column2 IS NOT NULL;`
  },
  {
    id: 'sql-sorting',
    title: 'Sorting Results',
    category: 'sql-basics',
    content: 'Control the order of your query results using ORDER BY with multiple columns and directions.',
    code: `-- Basic sorting
SELECT * FROM \`project.dataset.table\`
ORDER BY column1 ASC;

-- Multiple columns
SELECT * FROM \`project.dataset.table\`
ORDER BY category ASC, price DESC;

-- Using expressions
SELECT * FROM \`project.dataset.table\`
ORDER BY LENGTH(name), name;

-- NULLS handling
SELECT * FROM \`project.dataset.table\`
ORDER BY column1 NULLS FIRST;`
  },
  // SQL Functions
  {
    id: 'date-functions',
    title: 'Date Functions',
    category: 'sql-functions',
    content: 'Date functions allow manipulation and formatting of date-related data, which is crucial for trend analysis, reporting, and time-based queries.',
    code: `-- Get today's date
SELECT CURRENT_DATE();

-- Get current timestamp
SELECT CURRENT_TIMESTAMP();

-- Extract parts from date
SELECT 
  EXTRACT(YEAR FROM date_column) AS year,
  EXTRACT(MONTH FROM date_column) AS month,
  EXTRACT(DAY FROM date_column) AS day,
  EXTRACT(HOUR FROM timestamp_column) AS hour
FROM \`project.dataset.table\`;

-- Date arithmetic
SELECT 
  DATE_ADD(date_column, INTERVAL 1 DAY) as tomorrow,
  DATE_SUB(date_column, INTERVAL 1 WEEK) as last_week,
  DATE_DIFF(end_date, start_date, DAY) as days_between
FROM \`project.dataset.table\`;

-- Format dates
SELECT FORMAT_DATE('%Y-%m-%d', date_column) FROM \`project.dataset.table\`;`
  },
  {
    id: 'string-functions',
    title: 'String Functions',
    category: 'sql-functions',
    content: 'String functions are used to clean, transform, and manipulate text data, making it easier to standardize and analyze textual information.',
    code: `-- Case conversion
SELECT 
  LOWER(string_column) as lowercase,
  UPPER(string_column) as uppercase,
  INITCAP(string_column) as titlecase
FROM \`project.dataset.table\`;

-- String operations
SELECT
  CONCAT(first_name, ' ', last_name) as full_name,
  LENGTH(string_column) as str_length,
  TRIM(string_column) as trimmed_str,
  REPLACE(string_column, 'old', 'new') as replaced_str
FROM \`project.dataset.table\`;

-- Substring operations
SELECT
  SUBSTR(string_column, 1, 3) as first_three_chars,
  LEFT(string_column, 5) as left_five,
  RIGHT(string_column, 5) as right_five
FROM \`project.dataset.table\`;`
  },
  {
    id: 'window-functions',
    title: 'Window Functions',
    category: 'sql-advanced',
    content: 'Window functions allow calculations across a set of table rows related to the current row without collapsing them into a single result.',
    code: `-- Basic window functions
SELECT 
  *,
  ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) as row_num,
  RANK() OVER (PARTITION BY category ORDER BY price DESC) as rank,
  DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC) as dense_rank
FROM \`project.dataset.table\`;

-- Aggregates over windows
SELECT 
  *,
  AVG(price) OVER (PARTITION BY category) as avg_category_price,
  SUM(quantity) OVER (ORDER BY date) as running_total
FROM \`project.dataset.table\`;

-- Moving calculations
SELECT 
  *,
  AVG(price) OVER (
    ORDER BY date 
    ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
  ) as moving_average
FROM \`project.dataset.table\`;`
  },
  {
    id: 'joins',
    title: 'Joins',
    category: 'sql-advanced',
    content: 'Joins enable the combination of data from multiple tables based on a common column.',
    code: `-- Inner join
SELECT a.*, b.* 
FROM \`project.dataset.table1\` a
INNER JOIN \`project.dataset.table2\` b
ON a.id = b.id;

-- Left join with multiple conditions
SELECT a.*, b.* 
FROM \`project.dataset.table1\` a
LEFT JOIN \`project.dataset.table2\` b
ON a.id = b.id AND a.category = b.category;

-- Multiple joins
SELECT 
  o.order_id,
  c.customer_name,
  p.product_name
FROM \`project.dataset.orders\` o
JOIN \`project.dataset.customers\` c ON o.customer_id = c.id
JOIN \`project.dataset.products\` p ON o.product_id = p.id;

-- Self join
SELECT 
  e.name as employee,
  m.name as manager
FROM \`project.dataset.employees\` e
LEFT JOIN \`project.dataset.employees\` m
ON e.manager_id = m.id;`
  },
  {
    id: 'subqueries',
    title: 'Subqueries',
    category: 'sql-advanced',
    content: 'Subqueries allow nested queries within other queries, enabling flexible data retrieval by breaking problems into smaller, manageable parts.',
    code: `-- Subquery in WHERE
SELECT * FROM \`project.dataset.table1\`
WHERE id IN (
  SELECT id FROM \`project.dataset.table2\`
  WHERE category = 'A'
);

-- Subquery in SELECT
SELECT 
  *,
  (SELECT AVG(price) FROM \`project.dataset.table\`) as overall_avg
FROM \`project.dataset.table\`;

-- Correlated subquery
SELECT *
FROM \`project.dataset.orders\` o
WHERE price > (
  SELECT AVG(price)
  FROM \`project.dataset.orders\`
  WHERE customer_id = o.customer_id
);`
  },
  {
    id: 'powerquery-basics',
    title: 'Basic Power Query Operations',
    category: 'powerquery-basics',
    content: 'Power Query M language fundamentals for data transformation and loading.',
    code: `// Basic table reference
let
    Source = Excel.Workbook(File.Contents("Path/To/File.xlsx")),
    Sheet1 = Source{[Item="Sheet1"]}[Data],
    FirstRowHeader = Table.PromoteHeaders(Sheet1)
in
    FirstRowHeader`
  },
  {
    id: 'powerquery-filtering',
    title: 'Filtering and Rows',
    category: 'powerquery-basics',
    content: 'Common operations for filtering and manipulating rows in Power Query.',
    code: `// Filter rows
Table.SelectRows(table, each [Column1] > 100)

// Remove duplicates
Table.Distinct(table)

// Keep/remove rows
Table.Range(table, 0, 10)  // First 10 rows
Table.Skip(table, 5)       // Skip first 5 rows`
  },
  {
    id: 'powerquery-columns',
    title: 'Column Operations',
    category: 'powerquery-functions',
    content: 'Functions for working with columns in Power Query.',
    code: `// Add custom column
Table.AddColumn(table, "NewColumn", each [Column1] + [Column2])

// Remove columns
Table.RemoveColumns(table, {"Column1", "Column2"})

// Rename columns
Table.RenameColumns(table, {{"OldName", "NewName"}})`
  },
  {
    id: 'powerquery-merge',
    title: 'Merging and Appending',
    category: 'powerquery-advanced',
    content: 'Combining tables using merge (join) and append operations.',
    code: `// Merge tables (join)
Table.NestedJoin(table1, {"Key"}, table2, {"Key"}, "NewColumn")

// Append tables
Table.Combine({table1, table2, table3})`
  },
  {
    id: 'dax-basics',
    title: 'Basic DAX Calculations',
    category: 'dax-basics',
    content: 'Fundamental DAX calculations and measures.',
    code: `// Basic measure
Total Sales = SUM(Sales[Amount])

// Calculate with filter
Sales YTD = 
TOTALYTD(SUM(Sales[Amount]), 'Date'[Date])

// Previous period comparison
Sales vs PY = 
CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR('Date'[Date])
)`
  },
  {
    id: 'dax-time-intelligence',
    title: 'Time Intelligence',
    category: 'dax-functions',
    content: 'DAX time intelligence functions for period-over-period analysis.',
    code: `// Year-to-date
Total YTD = 
TOTALYTD(SUM(Sales[Amount]), 'Date'[Date])

// Moving average
Moving Avg = 
AVERAGEX(
    DATESINPERIOD(
        'Date'[Date],
        LASTDATE('Date'[Date]),
        -90,
        DAY
    ),
    [Total Sales]
)`
  },
  {
    id: 'dax-filter-context',
    title: 'Filter Context',
    category: 'dax-advanced',
    content: 'Understanding and manipulating filter context in DAX.',
    code: `// Remove filters
All Categories Sales = 
CALCULATE([Total Sales], ALL('Product'[Category]))

// Modified filter context
Sales in Category = 
CALCULATE(
    [Total Sales],
    FILTER(
        'Product',
        'Product'[Category] = "Electronics"
    )
)`
  },
  {
    id: 'dax-relationships',
    title: 'Working with Relationships',
    category: 'dax-advanced',
    content: 'DAX functions for handling table relationships and hierarchies.',
    code: `// Related table lookup
Product Category Sales = 
CALCULATE(
    [Total Sales],
    RELATEDTABLE('Product')
)

// Parent-child hierarchy
Path = 
PATH(
    'Category'[CategoryID],
    'Category'[ParentCategoryID]
)`
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'sql' | 'powerquery' | 'dax'>('sql');

  const categories = {
    'sql-basics': 'SQL Basics',
    'sql-advanced': 'SQL Advanced',
    'sql-functions': 'SQL Functions',
    'sql-optimization': 'SQL Optimization',
    'powerquery-basics': 'Power Query Basics',
    'powerquery-advanced': 'Power Query Advanced',
    'powerquery-functions': 'Power Query Functions',
    'dax-basics': 'DAX Basics',
    'dax-advanced': 'DAX Advanced',
    'dax-functions': 'DAX Functions'
  };

  const filteredSections = sections.filter(section =>
    (section.category.startsWith(selectedLanguage)) &&
    (section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     section.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const groupedSections = filteredSections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, Section[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Book className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Data Language Cheatsheet</h1>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <button
              onClick={() => setSelectedLanguage('sql')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedLanguage === 'sql'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Database className="w-5 h-5 mr-2" />
              SQL
            </button>
            <button
              onClick={() => setSelectedLanguage('powerquery')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedLanguage === 'powerquery'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Code2 className="w-5 h-5 mr-2" />
              Power Query
            </button>
            <button
              onClick={() => setSelectedLanguage('dax')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedLanguage === 'dax'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Calculator className="w-5 h-5 mr-2" />
              DAX
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSections).map(([category, categorySections]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {categories[category as keyof typeof categories]}
              </h2>
              {categorySections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section)}
                  className="w-full text-left p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="font-medium text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {section.content}
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>

        {selectedSection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSection.title}</h2>
                  <button
                    onClick={() => setSelectedSection(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-600 mb-6">{selectedSection.content}</p>
                {selectedSection.code && (
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                    <code>{selectedSection.code}</code>
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
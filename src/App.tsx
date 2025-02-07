import React, { useState, useEffect } from 'react';
import { Book, Search, Code2, Database, Calculator } from 'lucide-react';
import { Loading } from './components/Loading';

type Section = {
  id: string;
  title: string;
  content: string;
  code?: string;
  category:
    | 'sql-basics'
    | 'sql-advanced'
    | 'sql-functions'
    | 'sql-optimization'
    | 'powerquery-basics'
    | 'powerquery-advanced'
    | 'powerquery-functions'
    | 'dax-basics'
    | 'dax-advanced'
    | 'dax-functions';
};

const sections: Section[] = [
  // SQL Basics
  {
    id: 'basic-queries',
    title: 'Basic Queries',
    category: 'sql-basics',
    content: 'Basic queries allow you to retrieve data from a dataset efficiently.',
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
    content: 'Aggregations help summarize large datasets.',
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
    content: 'Control the order of your query results.',
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
    content: 'Date functions allow manipulation and formatting of date-related data.',
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
    content: 'String functions are used to clean, transform, and manipulate text data.',
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
  // SQL Advanced
  {
    id: 'window-functions',
    title: 'Window Functions',
    category: 'sql-advanced',
    content: 'Window functions allow calculations across a set of table rows.',
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
    content: 'Joins enable the combination of data from multiple tables.',
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
    content: 'Subqueries allow nested queries within other queries.',
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
    id: 'sql-common-table-expressions',
    title: 'Common Table Expressions (CTEs)',
    category: 'sql-advanced',
    content: 'CTEs provide a way to write more readable and maintainable complex queries.',
    code: `-- Basic CTE
WITH sales_summary AS (
  SELECT 
    category,
    SUM(amount) as total_sales
  FROM \`project.dataset.sales\`
  GROUP BY category
)
SELECT * FROM sales_summary;
-- Multiple CTEs
WITH monthly_sales AS (
  SELECT 
    DATE_TRUNC(date, MONTH) as month,
    SUM(amount) as sales
  FROM \`project.dataset.sales\`
  GROUP BY month
),
avg_sales AS (
  SELECT AVG(sales) as avg_monthly_sales
  FROM monthly_sales
)
SELECT 
  month,
  sales,
  avg_monthly_sales,
  sales - avg_monthly_sales as difference
FROM monthly_sales, avg_sales;`
  },
  {
    id: 'sql-window-analytics',
    title: 'Window Analytics',
    category: 'sql-advanced',
    content: 'Advanced window functions for complex analytical calculations.',
    code: `-- Running totals
SELECT 
  date,
  amount,
  SUM(amount) OVER (ORDER BY date) as running_total,
  SUM(amount) OVER (PARTITION BY category ORDER BY date) as category_running_total
FROM \`project.dataset.sales\`;
-- Moving averages
SELECT 
  date,
  amount,
  AVG(amount) OVER (
    ORDER BY date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as weekly_moving_avg
FROM \`project.dataset.sales\`;
-- Percentiles
SELECT 
  category,
  amount,
  PERCENTILE_CONT(amount, 0.5) OVER (PARTITION BY category) as median_amount,
  PERCENT_RANK() OVER (PARTITION BY category ORDER BY amount) as percentile
FROM \`project.dataset.sales\`;`
  },
  // Power Query Sections
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
Table.Skip(table, 5)	// Skip first 5 rows`
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
    id: 'powerquery-data-cleaning',
    title: 'Data Cleaning',
    category: 'powerquery-functions',
    content: 'Essential data cleaning operations in Power Query.',
    code: `// Remove empty rows and columns
let
    CleanedTable = Table.SelectRows(Source, each not List.IsEmpty(Record.FieldValues(_))),
    RemovedEmptyColumns = Table.RemoveColumns(
    CleanedTable,
    Table.SelectColumns(CleanedTable, each List.AllTrue(Table.Column(CleanedTable, _), each _ = null))
    )
in
    RemovedEmptyColumns
// Clean text data
let
    CleanText = Table.TransformColumns(Source, {
    {"Column1", each Text.Trim(Text.Clean(_))},
    {"Column2", each Text.Upper(_)},
    {"Column3", each if _ = null then "N/A" else _}
    })
in
    CleanText`
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
  // DAX Sections
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
    90,
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
  },
  {
    id: 'dax-calculated-columns',
    title: 'Calculated Columns',
    category: 'dax-basics',
    content: 'Creating calculated columns for common business scenarios.',
    code: `// Date calculations
Full Date = 
FORMAT([Date], "mmmm dd, yyyy")
// Conditional columns
Status = 
IF(
    [Amount] > 1000,
    "High Value",
    IF(
    [Amount] > 500,
    "Medium Value",
    "Low Value"
    )
)
// Concatenation
Full Name = [First Name] & " " & [Last Name]
// Previous value comparison
Growth = 
DIVIDE(
    [Current Amount] - [Previous Amount],
    [Previous Amount],
    0
)`
  },
  {
    id: 'dax-calendar-functions',
    title: 'Calendar Functions',
    category: 'dax-functions',
    content: 'Advanced date and calendar calculations in DAX.',
    code: `// Fiscal year calculations
Fiscal Year Sales = 
CALCULATE(
    [Total Sales],
    DATEADD('Date'[Date], -6, MONTH)
)
// Custom calendar periods
Rolling 3M Sales = 
CALCULATE(
    [Total Sales],
    DATESINPERIOD(
    'Date'[Date],
    LASTDATE('Date'[Date]),
    3,
    MONTH
    )
)
// Period over period
YoY Growth = 
DIVIDE(
    [Total Sales] - 
    CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR('Date'[Date])
    ),
    CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR('Date'[Date])
    )
)`
  }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'sql' | 'powerquery' | 'dax'>('sql');
  const [loadedSections, setLoadedSections] = useState<Section[]>([]);

  useEffect(() => {
    const loadSections = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoadedSections(sections);
      } catch (error) {
        console.error('Error loading sections:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSections();
  }, []);

  const filteredSections = loadedSections.filter(section =>
    section.category.startsWith(selectedLanguage) &&
    (section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  const groupedSections = filteredSections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, Section[]>);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Book className="w-8 h-8 text-secondary/80" />
              <h1 className="text-3xl font-bold text-secondary">Data Language Cheatsheet</h1>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <button
              onClick={() => setSelectedLanguage('sql')}
              className={`flex items-center px-4 py-2 rounded-[2px] transition-colors duration-200 ${
                selectedLanguage === 'sql'
                  ? 'bg-surface text-secondary border border-secondary/20'
                  : 'bg-surface/60 text-secondary/80 hover:bg-surface-hover'
              }`}
            >
              <Database className="w-5 h-5 mr-2" />
              SQL
            </button>
            <button
              onClick={() => setSelectedLanguage('powerquery')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedLanguage === 'powerquery'
                  ? 'bg-surface text-secondary border border-secondary/20'
                  : 'bg-surface/60 text-secondary/80 hover:bg-surface-hover'
              }`}
            >
              <Code2 className="w-5 h-5 mr-2" />
              Power Query
            </button>
            <button
              onClick={() => setSelectedLanguage('dax')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedLanguage === 'dax'
                  ? 'bg-surface text-secondary border border-secondary/20'
                  : 'bg-surface/60 text-secondary/80 hover:bg-surface-hover'
              }`}
            >
              <Calculator className="w-5 h-5 mr-2" />
              DAX
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-[2px] bg-surface text-secondary border-none focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSections).map(([category, categorySections]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-semibold text-secondary/90">
                {categories[category as keyof typeof categories]}
              </h2>
              {categorySections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section)}
                  className="w-full text-left p-4 rounded-[2px] bg-surface hover:bg-surface-hover transition-colors duration-200 border border-secondary/10"
                >
                  <h3 className="font-medium text-secondary/90">{section.title}</h3>
                  <p className="text-sm text-secondary/60 mt-1 line-clamp-2">
                    {section.content}
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>

        {selectedSection && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-[2px] max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-secondary/10">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-secondary/90">{selectedSection.title}</h2>
                  <button
                    onClick={() => setSelectedSection(null)}
                    className="text-secondary/60 hover:text-secondary transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-secondary/70 mb-6">{selectedSection.content}</p>
                {selectedSection.code && (
                  <pre className="bg-primary text-secondary/90 p-6 rounded-[2px] overflow-x-auto border border-secondary/10">
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
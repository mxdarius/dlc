import { Section } from '../types/Section';

export const sections: Section[] = [
// Define the sections array
  // Real-World SQL Use Cases - Placed at the very top
  {
    id: 'real-world-sql',
    title: 'Real-World SQL Use Cases',
    category: 'sql-advanced',
    content: 'Understanding real-world applications helps analysts transition from theoretical knowledge to solving business problems using SQL.',
    code: `-- Find the top 5 highest-grossing products
SELECT 
    product_name, 
    SUM(sales_amount) AS total_sales
FROM 
    \`project.dataset.sales\`
GROUP BY 
    product_name
ORDER BY 
    total_sales DESC
LIMIT 5;

-- Identify inactive users (users with no activity in the last 30 days)
SELECT 
    user_id, 
    last_login
FROM 
    \`project.dataset.users\`
WHERE 
    last_login < DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY);`
  },

  // Function Index - Placed second
  {
    id: 'sql-function-index',
    title: 'Function Index (Quick Reference)', 
    category: 'sql-basics',
    content: 'Quick reference guide for commonly used SQL functions and commands.',
    code: `-- Basic Query Structure
    SELECT column_name FROM table_name        // Retrieves and filters data from tables
    WHERE condition                           // Specifies conditions for filtering rows
    GROUP BY column_name                      // Groups rows sharing common values
    HAVING condition                          // Filters groups after aggregation
    ORDER BY column_name                      // Defines the sort order of results
    LIMIT number                              // Controls number of rows returned
    
    -- Aggregation Functions
    COUNT(column_name)                        // Returns count of rows or non-null values
    SUM(column_name)                          // Adds up all values in specified column
    AVG(column_name)                          // Calculates mean value of a column
    MIN(column_name)                          // Finds lowest value in column
    MAX(column_name)                          // Finds highest value in column
    
    -- Date Functions
    EXTRACT(field FROM date)                  // Pulls specific parts from date/time values
    to_char(date, 'YYYY-MM-DD')               // Formats date as custom string
    date - INTERVAL '1 day'                   // Performs date arithmetic operations
    
    -- String Functions
    LOWER(text)                               // Makes all characters lowercase
    UPPER(text)                               // Makes all characters uppercase
    CONCAT(str1, str2)                        // Combines multiple strings
    LENGTH(string)                            // Gets character count of string
    string_agg(expression, ',')               // Groups strings with separator
    
    -- Table Operations
    JOIN                                      // Combines rows from multiple tables
    INNER JOIN                                // Keeps only matching rows
    LEFT JOIN                                 // Keeps all left table rows plus matches
    RANK() OVER()                             // Numbers rows within result set
    PARTITION BY                              // Groups rows for window calculations
    WITH cte_name AS                          // Creates temporary result set
    
    -- Data Handling
    COALESCE(val1, val2)                      // Returns first non-null expression
    COUNT(DISTINCT column_name)               // Counts unique values only
    CAST(value AS type)                       // Changes data type of values
    value::type                               // Alternative type conversion
    array_agg(expression)                     // Builds array from group values`
  },

  // SQL Basics
  {
    id: 'basic-queries',
    title: 'Basic Queries (Retrieving Data)',
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
    title: 'Aggregations (Summarising Data)',
    category: 'sql-basics',
    content: 'Aggregations help summarize large datasets by computing totals, averages, or other statistical insights. GROUP BY is particularly useful when analysing data by different categories.',
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
    id: 'sql-best-practices',
    title: 'Best Practices for Writing Efficient Queries',
    category: 'sql-optimization',
    content: 'Following best practices ensures better query efficiency, reducing costs and improving overall performance when working with BigQuery.',
    code: `-- Use SELECT only for needed columns to optimise query performance
SELECT column1, column2 FROM \`project.dataset.table\`;
-- Avoid SELECT * to reduce unnecessary data processing
-- Use table partitioning for large datasets
SELECT * FROM \`project.dataset.table\`
WHERE DATE(timestamp_column) = '2024-01-01';`
  },
  {
    id: 'sql-error-handling',
    title: 'Common SQL Errors and How to Fix Them',
    category: 'sql-optimization',
    content: 'Common SQL errors can be avoided by using correct data types, handling NULL values properly, and using functions like SAFE_CAST to prevent runtime failures.',
    code: `-- Fixing a data type mismatch using CAST
SELECT CAST(column1 AS INT64) FROM \`project.dataset.table\`;
-- Handling NULL values to prevent errors
SELECT COALESCE(column1, 'default_value') FROM \`project.dataset.table\`;
-- Using SAFE_CAST to prevent query failures when conversion is not possible
SELECT SAFE_CAST(column1 AS INT64) FROM \`project.dataset.table\`;`
  },
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
    title: 'Joins and Combining Data (Merging Tables)',
    category: 'sql-advanced',
    content: 'Joins allow you to combine multiple tables based on a shared key, which is crucial for analysing relational datasets.',
    code: `-- Inner Join to combine two tables
SELECT a.*, b.* 
FROM \`project.dataset.table1\` a
INNER JOIN \`project.dataset.table2\` b
ON a.id = b.id;
-- Left Join (keep all records from the left table) with multiple conditions
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
-- Self joins are used to compare rows within the same table
SELECT 
  e.name as employee,
  m.name as manager
FROM \`project.dataset.employees\` e
LEFT JOIN \`project.dataset.employees\` m
ON e.manager_id = m.id;`
  },
  {
    id: 'advanced-filtering',
    title: 'Advanced Filtering (Using HAVING & CASE Statements)',
    category: 'sql-advanced',
    content: 'HAVING is useful for filtering grouped results, while CASE statements allow you to apply conditional logic to categorise data dynamically.',
    code: `-- Filter grouped data using HAVING
SELECT category, COUNT(*) AS item_count
FROM \`project.dataset.sales\`
GROUP BY category
HAVING item_count > 10;
-- Conditional Logic using CASE
SELECT order_id, 
CASE 
    WHEN order_amount > 100 THEN 'High Value'
    WHEN order_amount BETWEEN 50 AND 100 THEN 'Medium Value'
    ELSE 'Low Value'
END AS order_category
FROM \`project.dataset.orders\`;`
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
Table.Skip(table, 5)  // Skip first 5 rows`
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
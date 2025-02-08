// Define the Section type
export type Section = {
    id: string;
    title: string;
    content: string;
    code?: string;
    category:
      | "sql-basics"
      | "sql-advanced"
      | "sql-functions"
      | "sql-optimization"
      | "powerquery-basics"
      | "powerquery-advanced"
      | "powerquery-functions"
      | "dax-basics"
      | "dax-advanced"
      | "dax-functions";
  };
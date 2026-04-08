import { useState, useEffect } from "react";

const useSearchHook = (delay = 500) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  // Handlers
  function handleSearchChange(value) {
    setSearchTerm(value);
  }

  return {
    searchTerm, // Immediate value for input
    debouncedSearchTerm, // Value after debounce delay
    handleSearchChange,
  };
};

export default useSearchHook;

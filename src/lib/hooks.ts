import { useState, useEffect } from "react";
import { JobItem } from "./types";
import { BASE_API_URL } from "./constants";

export function useActiveId() {
  const [activeId, setActionId] = useState<null | number>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActionId(id);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();
      setJobItem(data.jobItem);
    };

    fetchData();
  }, [id]);

  return jobItem;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;
    setIsLoading(true);

    fetch(`${BASE_API_URL}?search=${searchText}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setJobItems(data.jobItems);
      })
      .catch((error) => {
        console.error("Error fetching job items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchText]);

  return [jobItemsSliced, isLoading] as const;
}

import { useState } from 'react';
import { useQuery } from 'react-query';

const useTableData = (queryKey, getService) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt:asc');
  const [filter, setFilter] = useState({});

  const { data, isLoading } = useQuery(
    [queryKey, { page, limit, sortBy, search, ...filter }],
    async () => {
      const { data } = await getService({
        page,
        limit,
        sortBy,
        search,
        ...filter,
      });
      return data;
    }
  );

  return {
    data: data,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    isLoading,
    sortBy,
    setSortBy,
    setFilter,
  };
};

export default useTableData;
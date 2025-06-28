export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex gap-2 mb-4 ml-5 flex-wrap justify-center ">
      {/* priority filter */}
      <select
        className="px-3 py-1 border rounded dark:bg-gray-800 dark:border-gray-600"
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* status filter */}
      <select
        className="px-3 py-1 border rounded dark:bg-gray-800 dark:border-gray-600"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      {/* sorting */}
      <select
        className="px-3 py-1 border rounded dark:bg-gray-800 dark:border-gray-600"
        value={filters.sortBy}
        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
        <option value="">Sort by</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

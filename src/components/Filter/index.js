"use client";

export default function Filter({ filter, onChange }) {
  return (
    <select
      id="filter"
      name="filter"
      defaultValue={filter}
      onChange={onChange}
      className="text-sm rounded-lg 
        block 
        w-full p-2.5 bg-slate-800 
        border-gray-600 placeholder-gray-400 
        text-white focus:ring-violet-700 focus:border-violet-700">
      <option value="All">All</option>
      <option value="XT Billiard">XT Billiard</option>
      <option value="Jogja Billiard">Jogja Billiard</option>
      <option value="Jakal Billiard">Jakal Billiard</option>
    </select>
  );
}

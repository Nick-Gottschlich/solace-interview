"use client";

import { useEffect, useState, useMemo } from "react";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await fetch("/api/advocates");
        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
      } catch (error) {
        console.error("Error fetching advocates:", error);
      }
    };
    fetchAdvocates();
  }, []);

  const filteredAdvocates = useMemo(() => {
  return advocates.filter((advocate) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      advocate.firstName.toLowerCase().includes(lowerCaseSearchTerm) || 
      advocate.lastName.toLowerCase().includes(lowerCaseSearchTerm) || 
      advocate.city.toLowerCase().includes(lowerCaseSearchTerm) || 
      advocate.degree.toLowerCase().includes(lowerCaseSearchTerm) || 
      advocate.specialties.some((specialty) =>
        specialty.toLowerCase().includes(lowerCaseSearchTerm) 
      ) ||
      advocate.yearsOfExperience.toString().includes(lowerCaseSearchTerm) || 
      advocate.phoneNumber.toString().includes(searchTerm) 
    );
  });
}, [advocates, searchTerm]);



  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetSearch = () => {
    setSearchTerm("");
  };

  return (
    <main className="font-sans text-gray-800 p-6">
      <h1 className="text-2xl font-bold mb-4">Solace Advocates</h1>
      <div className="flex items-center mb-6">
        <label className="font-semibold mr-2">Search</label>
        <input
          className="px-3 py-2 border border-gray-300 rounded-md text-base mr-4 w-60"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Type to search..."
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={resetSearch}
        >
          Reset Search
        </button>
      </div>
      <table className="w-full border-collapse mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left font-semibold">First Name</th>
            <th className="p-3 text-left font-semibold">Last Name</th>
            <th className="p-3 text-left font-semibold">City</th>
            <th className="p-3 text-left font-semibold">Degree</th>
            <th className="p-3 text-left font-semibold">Specialties</th>
            <th className="p-3 text-left font-semibold">Years of Experience</th>
            <th className="p-3 text-left font-semibold">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="p-3">{advocate.firstName}</td>
              <td className="p-3">{advocate.lastName}</td>
              <td className="p-3">{advocate.city}</td>
              <td className="p-3">{advocate.degree}</td>
              <td className="p-3">
                {advocate.specialties.map((specialty, i) => (
                  <div key={i}>{specialty}</div>
                ))}
              </td>
              <td className="p-3">{advocate.yearsOfExperience}</td>
              <td className="p-3">{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

/*****************************************************************************
* BTI425 – Project
* I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Group member:9 Name:Ahmed Shaikh 127566222 & John Mubeezi 106922222 Date: 4/19/2024
*****************************************************************************/
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../../atoms";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const handleSearch = (query) => {
    const searchQuery = `?q=${query}`;
    router.push(`/products${searchQuery}`);
  };

  const handleRemoveSearch = (index) => {
    const newSearchHistory = [...searchHistory];
    newSearchHistory.splice(index, 1);
    setSearchHistory(newSearchHistory);
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center">Search History</h2>
        {searchHistory.length === 0 ? (
          <p className="text-center">No search history yet.</p>
        ) : (
          <ul className="list-group">
            {searchHistory.map((query, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span
                  style={{ cursor: "pointer", color: "blue", flex: 1 }}
                  onClick={() => handleSearch(query)}
                >
                  {query}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveSearch(index)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
);

}
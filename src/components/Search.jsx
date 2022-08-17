import { useState } from "react";
import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";

const DropDown = ({ toggle, sortByField, onSortByField, sortByOrder, onSortByOrder }) => {
  if (!toggle) {
    return null;
  }
  
  return (
    <section className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        
        <div onClick={() => onSortByField('petName')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Pet Name {(sortByField === 'petName')  && <BiCheck />}
        </div>
        
        <div onClick={() => onSortByField('ownerName')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Owner Name  {(sortByField === 'ownerName')  && <BiCheck />}
        </div>
        
        <div onClick={() => onSortByField('Date')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Date {(sortByField === 'Date')  && <BiCheck />}
        </div>
        
        <div onClick={() => onSortByOrder('asc')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
          role="menuitem">Asc {(sortByOrder === 'asc')  && <BiCheck />}
        </div>
        
        <div onClick={() => onSortByOrder('desc')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Desc {(sortByOrder === 'desc')  && <BiCheck />}
        </div>
      
      </div>
    </section>
  );
};

const Search = ({ query, onQueryChange, sortByField, onSortByField, sortByOrder, onSortByOrder }) => {
  const [toggleSort, setToggleSort] = useState(false);

  return (
    <section className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        
        <input
          onChange={(event) => onQueryChange(event.target.value)}
          type="text"
          name="query"
          value={query}
          id="query"
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          placeholder="Search"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              onClick={() => setToggleSort(!toggleSort)}
              type="button"
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Sort By <BiCaretDown className="ml-2" />
            </button>
            <DropDown
              toggle={toggleSort}
              sortByOrder={sortByOrder}
              sortByField={sortByField}
              onSortByField={mySort => onSortByField(mySort)}
              onSortByOrder={mySort => onSortByOrder(mySort)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;

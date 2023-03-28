import './search.css'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import SingleSearch from './singleSearch'
import { CgClose } from 'react-icons/cg'
import { useAppContext } from '../../context/appContext'

export const Search = () => {
  const [search, setSearch] = useState('')
  const { displayItems, allItems } = useAppContext()

  return (
    <div className="container-input">
      <input
        type="text"
        placeholder="Search"
        name="text"
        className="input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoCorrect="false"
      />
      <svg
        fill="var(--twitter-color)"
        width="23px"
        height="23px"
        viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg"
        className="svg-search"
      >
        <path
          d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
          fill-rule="evenodd"
        ></path>
      </svg>

      {search.length > 0 && search ? (
        <div className="list-wrapper">
          <section className="list">
            {(search.length > 0 === true ? displayItems : allItems).map(
              (item, index) => {
                return (
                  <SingleSearch
                    name={item}
                    key={index}
                    setShowSearch={setSearch}
                  />
                )
              }
            )}
          </section>
          {displayItems.length > 0 && allItems.length > 0 && (
            <CgClose
              className="close-notification close-list"
              onClick={() => setSearch(false)}
            />
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

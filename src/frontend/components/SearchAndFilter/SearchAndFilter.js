import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks";
import { useFilters, useNotes } from "../../contexts";
import "./SearchAndFilter.css";
import {
  CLEAR_FILTERS,
  FILTER_PRIORITIES,
  FILTER_SORT_BY,
  FILTER_TAGS,
} from "../../constants";

export const SearchAndFilter = () => {
  const filtersRef = useRef();
  const [showFilters, setShowFilters] = useState(false);

  useOnClickOutside(filtersRef, () => setShowFilters(false));

  const { uniqueTags } = useNotes();

  const { filters, dispatchFilters } = useFilters();
  const { sortBy, priorities, tags } = filters;

  return (
    <div className="search-and-filter">
      <span className="material-icons search-icon">search</span>
      <input
        className="search-input"
        type="search"
        placeholder="Search"
        name="search-input"
        id="search-input"
      />
      <div ref={filtersRef}>
        <button onClick={() => setShowFilters(!showFilters)}>
          <span className="material-icons-outlined filter-icon">tune</span>
        </button>
        {showFilters && (
          <div className="filters" onClick={(e) => e.stopPropagation()}>
            <button
              className="clear-filters"
              onClick={() => dispatchFilters({ type: CLEAR_FILTERS })}
            >
              Clear Filters
            </button>
            <div className="filters-box">
              <div className="sort-by-time filter">
                <h5>Sort by Time</h5>
                <div className="filter-options">
                  <div className="input-group input-radio">
                    <input
                      className="kafka-input"
                      type="radio"
                      name="sort-by-time"
                      id="old-to-new"
                      checked={sortBy && sortBy === "old-to-new"}
                      onChange={() =>
                        dispatchFilters({
                          type: FILTER_SORT_BY,
                          payload: "old-to-new",
                        })
                      }
                    />
                    <label htmlFor="old-to-new">Old to New</label>
                  </div>
                  <div className="input-group input-radio">
                    <input
                      className="kafka-input"
                      type="radio"
                      name="sort-by-time"
                      id="new-to-old"
                      checked={sortBy && sortBy === "new-to-old"}
                      onChange={() =>
                        dispatchFilters({
                          type: FILTER_SORT_BY,
                          payload: "new-to-old",
                        })
                      }
                    />
                    <label htmlFor="new-to-old">New to Old</label>
                  </div>
                </div>
              </div>
              <div className="filter-by-priority filter">
                <h5>Priority</h5>
                <div className="filter-options">
                  <div className="input-group input-checkbox">
                    <input
                      className="kafka-input"
                      type="checkbox"
                      name="filter-by-priority"
                      id="priority-high"
                      checked={priorities.includes("High")}
                      onChange={() =>
                        dispatchFilters({
                          type: FILTER_PRIORITIES,
                          payload: "High",
                        })
                      }
                    />
                    <label htmlFor="priority-high">High</label>
                  </div>
                  <div className="input-group input-checkbox">
                    <input
                      className="kafka-input"
                      type="checkbox"
                      name="filter-by-priority"
                      id="priority-medium"
                      checked={priorities.includes("Medium")}
                      onChange={() =>
                        dispatchFilters({
                          type: FILTER_PRIORITIES,
                          payload: "Medium",
                        })
                      }
                    />
                    <label htmlFor="priority-medium">Medium</label>
                  </div>
                  <div className="input-group input-checkbox">
                    <input
                      className="kafka-input"
                      type="checkbox"
                      name="filter-by-priority"
                      id="priority-low"
                      checked={priorities.includes("Low")}
                      onChange={() =>
                        dispatchFilters({
                          type: FILTER_PRIORITIES,
                          payload: "Low",
                        })
                      }
                    />
                    <label htmlFor="priority-low">Low</label>
                  </div>
                </div>
              </div>
              {uniqueTags.length !== 0 && (
                <div className="filter-by-tags filter">
                  <h5>Tags</h5>
                  <div className="filter-options">
                    {uniqueTags.map((tag) => (
                      <div className="input-group input-checkbox">
                        <input
                          className="kafka-input"
                          type="checkbox"
                          name="filter-by-tags"
                          id={`tag-${tag}`}
                          checked={tags.includes(tag)}
                          onChange={() =>
                            dispatchFilters({ type: FILTER_TAGS, payload: tag })
                          }
                        />
                        <label htmlFor={`tag-${tag}`}>{tag}</label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

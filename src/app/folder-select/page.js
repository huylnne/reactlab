"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { FaSearch } from "react-icons/fa";

export default function FolderSelect() {
  const [folders, setFolders] = useState([
    { id: 1, name: "Folder 1", checked: false },
    { id: 2, name: "Folder 2", checked: false },
    { id: 3, name: "Folder 3", checked: true },
  ]);

  const [search, setSearch] = useState("");

  const handleCheck = (id) => {
    setFolders(
      folders.map((f) =>
        f.id === id ? { ...f, checked: !f.checked } : f
      )
    );
  };

  const filteredFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.selectFolder}>Chọn thư mục hiển thị</div>

      <div className={styles.wrapper}>
        {/* Search box */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.searchBtn}>
            <FaSearch />
          </button>
        </div>

        <div className={styles.folderList}>
          {filteredFolders.map((folder) => (
            <label key={folder.id} className={styles.folderItem}>
              <span>{folder.name}</span>
              <input
                type="checkbox"
                checked={folder.checked}
                onChange={() => handleCheck(folder.id)}
              />
            </label>
          ))}
        </div>

        <button className={styles.submitBtn}>Cấp quyền</button>
      </div>
    </div>
  );
}

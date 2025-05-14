/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Tag } from 'primereact/tag';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from "antd";
import type { TableProps, InputRef, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";

import { VocabularyType } from "../../api/types";
import { getAllVocabulary } from "../../api/vocabularyApi";

import './styles.css';

type DataIndex = keyof VocabularyType;

const WordList: FC = () => {
  const [vocabularies, setVocabularies] = useState<VocabularyType[]>([]);
  const searchInput = useRef<InputRef>(null);

  const fetchVocabulary = async () => {
    try {
      const vocabularyData = await getAllVocabulary();
      setVocabularies(vocabularyData);
    } catch (err) {
      throw(err);
    }
  }

  useEffect(() => {
    fetchVocabulary();
  }, []);

  const handleSearch = (confirm: FilterDropdownProps['confirm']) => {
    confirm();
  };

  const handleReset = (clearFilter: () => void) => {
    clearFilter();
  }

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<VocabularyType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined style={{width: '16px'}} />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => close()}
          >
            Close
          </Button>
        </Space>
      </div>
    ),  
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }}/>
    ),
    onFilter: (value, record) => 
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
      filterDropdownProps: {
        onOpenChange(open) {
          if (open) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
      },
    render: (text) => text,
  });

  const columns = useMemo<TableProps<VocabularyType>['columns']>(() => [
    {
      title: 'English',
      dataIndex: 'english',
      key: 'english',
      ...getColumnSearchProps('english'),
    },
    {
      title: 'Vietnamese',
      dataIndex: 'vietnamese',
      key: 'vietnamese',
    },
    {
      title: 'Audio Link',
      dataIndex: 'mp3',
      key: 'mp3',
    },
    {
      title: 'Tags',
      dataIndex: 'tag',
      key: 'tag',
      render: (_, { tag }) => (
        <>
          {tag?.map((item, index) => (
            <Tag key={index} severity='info' value={item.toUpperCase()} />
          ))}
        </>
      )
    },
  ], []);

  return (
    <div style={{width: '1000px'}}>
      <h2 style={{paddingBottom: '20px', textAlign: 'center'}}>Word List</h2>
      <Table<VocabularyType> 
        columns={columns}
        dataSource={vocabularies} 
        scroll={{ y: 450 }}
      />
    </div>
  )
};

export default WordList;
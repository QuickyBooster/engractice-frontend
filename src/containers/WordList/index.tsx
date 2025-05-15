/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useMemo, useRef, useState } from "react";
import { Tag } from 'primereact/tag';
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog, ConfirmDialogReturn } from 'primereact/confirmdialog';
import { DeleteFilled, EditFilled, SearchOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Input, Space, Table } from "antd";
import type { TableProps, InputRef, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";

import { VocabularyType } from "../../api/types";
import { deleteVocabulary } from "../../api/vocabularyApi";
import { showSuccess, showError } from "../../utils/toastMessage";
import EditModal from "./EditModal";

import './styles.css';

type DataIndex = keyof VocabularyType;

type Props = {
  words: VocabularyType[];
  handleInvalidateVocabulary: () => Promise<void>;
};

const WordList: FC<Props> = ({ words, handleInvalidateVocabulary }) => {
  const searchInput = useRef<InputRef>(null);
  const toast = useRef<Toast>(null);  
  const dialogRef = useRef<ConfirmDialogReturn>(null);

  const handleSearch = (confirm: FilterDropdownProps['confirm']) => {
    confirm();
  };

  const handleReset = (clearFilter: () => void) => {
    clearFilter();
  };

  const handleDeleteWord = async (wordId: string) => {
    try {
      await deleteVocabulary(wordId);
      showSuccess(toast, 'Delete vocabulary successfully!');
      handleInvalidateVocabulary();
    } catch (err) {
      showError(toast, 'Delete vocabulary unsuccessfully!');
    }
  };

  const showEditModal = (item: VocabularyType) => {
    dialogRef.current = confirmDialog({
      group: 'edit',
      header: 'Edit Vocabulary',
      message: (
        <EditModal 
          vocabulary={item} 
          reFetch={handleInvalidateVocabulary}
        />
      ),
    });
  };

  const showDeleteDialog = (wordId: string) => {
    confirmDialog({
      group: 'delete',
      header: 'Delete Confirmation',
      message: 'Please confirm before delete this vocabulary!',
      icon: <WarningFilled style={{width: '24px', height: '24px'}} />,
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      style: { width: '450px' },
      accept: () => handleDeleteWord(wordId),
    });
  };

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
      width: 160,
      ...getColumnSearchProps('english'),
    },
    {
      title: 'Vietnamese',
      dataIndex: 'vietnamese',
      key: 'vietnamese',
      width: 220,
    },
    {
      title: 'Audio Link',
      dataIndex: 'mp3',
      key: 'mp3',
      width: 180,
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
    {
      title: 'Actions',
      dataIndex: '',
      key: 'x',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <>
          <EditFilled 
            style={{cursor: 'pointer', color: '#2ac52a'}} 
            onClick={() => showEditModal(record)}
          />
          <DeleteFilled
            style={{cursor: 'pointer', color: '#ff4545', marginLeft: '10px'}} 
            onClick={() => showDeleteDialog(record.id)}
          />
        </>
      ),
    },
  ], []);

  return (
    <div style={{width: '1000px'}}>
      <Toast ref={toast} />
      <ConfirmDialog group="edit" className="edit-modal" />
      <ConfirmDialog group="delete" />
      <h2 style={{paddingBottom: '20px', textAlign: 'center'}}>Word List</h2>
      <Table<VocabularyType> 
        columns={columns}
        dataSource={words} 
        scroll={{ y: 450 }}
      />
    </div>
  )
};

export default WordList;
import { useState } from 'react';
import { Badge, ActionIcon, useMantineTheme, Group } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { ColumnWithStrictAccessor } from 'react-table';
import styled from '@emotion/styled';
import { format } from 'date-fns';

import PageMeta from '../../components/layout/components/PageMeta';
import PageHeader from '../../components/layout/components/PageHeader';
import PageContainer from '../../components/layout/components/PageContainer';
import { Tag, Button, Table, colors, Text, Input } from '../../design-system';
import { Edit, PlusCircle } from '../../design-system/icons';
import { Tooltip } from '../../design-system';
import { Data } from '../../design-system/table/Table';
import { useFilterTemplates } from '../../api/hooks/use-filter-templates';
import { useEnvController } from '../../store/useEnvController';
import { useDebounce } from '../../hooks/useDebounce';

function NotificationList() {
  const { readonly } = useEnvController();
  const [page, setPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {
    templates,
    loading: isLoading,
    totalCount: totalTemplatesCount,
    pageSize,
  } = useFilterTemplates(searchQuery, page);
  const debouncedSearchQuery = useDebounce((query: string) => {
    setSearchQuery(query);
  }, 500);
  const theme = useMantineTheme();
  const navigate = useNavigate();

  function handleTableChange(pageIndex) {
    setPage(pageIndex);
  }

  const handleRedirectToCreateTemplate = () => {
    navigate('/templates/create');
  };

  const columns: ColumnWithStrictAccessor<Data>[] = [
    {
      accessor: 'identifier',
      Header: 'Trigger ID',
      Cell: ({ triggers }: any) => (
        <Tooltip label={triggers ? triggers[0].identifier : 'Unknown'}>
          <Text rows={1}>{triggers ? triggers[0].identifier : 'Unknown'}</Text>
        </Tooltip>
      ),
    },
    {
      accessor: 'name',
      Header: 'Name',
      Cell: ({ name }: any) => (
        <Tooltip label={name}>
          <Text rows={1}>{name}</Text>
        </Tooltip>
      ),
    },
    {
      accessor: 'notificationGroup.name',
      Header: 'Category',
      Cell: ({ notificationGroup }: any) => <Tag data-test-id="category-label"> {notificationGroup?.name}</Tag>,
    },
    {
      accessor: 'createdAt',
      Header: 'Created At',
      Cell: ({ createdAt }: any) => format(new Date(createdAt), 'dd/MM/yyyy HH:mm'),
    },
    {
      accessor: 'status',
      Header: 'Status',
      width: 125,
      maxWidth: 125,
      Cell: ({ draft, active }: any) => (
        <>
          {draft ? (
            <Badge variant="outline" size="md" color="yellow">
              Disabled
            </Badge>
          ) : null}{' '}
          {active ? (
            <Badge variant="outline" size="md" color="green" data-test-id="active-status-label">
              Active
            </Badge>
          ) : null}{' '}
        </>
      ),
    },
    {
      accessor: '_id',
      Header: '',
      maxWidth: 50,
      Cell: ({ _id }: any) => (
        <ActionButtonWrapper>
          <ActionIcon
            variant="transparent"
            component={Link}
            to={`/templates/edit/${_id}`}
            data-test-id="template-edit-link"
          >
            <Edit color={theme.colorScheme === 'dark' ? colors.B40 : colors.B80} />
          </ActionIcon>
        </ActionButtonWrapper>
      ),
    },
  ];

  function onRowClick(row) {
    navigate(`/templates/edit/${row.values._id}`);
  }

  return (
    <PageContainer>
      <PageMeta title="Templates" />
      <PageHeader
        title="Notification Template"
        actions={
          <Group align="center" spacing={20}>
            <StyledInput
              placeholder="Search templates"
              onChange={(event) => {
                debouncedSearchQuery(event.target.value.trimStart());
              }}
            />
            <Button
              disabled={readonly}
              onClick={handleRedirectToCreateTemplate}
              icon={<PlusCircle />}
              data-test-id="create-template-btn"
            >
              New
            </Button>
          </Group>
        }
      />
      <TemplateListTableWrapper>
        <Table
          onRowClick={onRowClick}
          loading={isLoading}
          data-test-id="notifications-template"
          columns={columns}
          data={templates || []}
          pagination={{
            pageSize: pageSize,
            current: page,
            total: totalTemplatesCount,
            onPageChange: handleTableChange,
          }}
        />
      </TemplateListTableWrapper>
    </PageContainer>
  );
}

export default NotificationList;

const ActionButtonWrapper = styled.div`
  text-align: right;

  a {
    display: inline-block;
    opacity: 0;
    transition: opacity 0.1s ease-in;
  }
`;

const TemplateListTableWrapper = styled.div`
  tr:hover {
    cursor: pointer;

    ${ActionButtonWrapper} {
      a {
        opacity: 1;
      }
    }
  }
`;

const StyledInput = styled(Input)`
  width: 300px;

  .mantine-TextInput-wrapper,
  input {
    min-height: auto;
    height: 42px;
    margin-bottom: 5px;
  }
  position: relative;
`;

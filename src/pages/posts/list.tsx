import React from "react";
import {useMany} from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  ShowButton,
  TagField,
  DateField,
  List,
  EditButton,
  Stack
} from "@pankod/refine-mui";

import {IPost, ICategory} from "../../interfaces";

export const PostList: React.FC = () => {
  const {dataGridProps} = useDataGrid<IPost>();
  const {
    sortingMode,
    sortModel,
    onSortModelChange,
    filterMode,
    filterModel,
    onFilterModelChange,
    ...restDataGridProps
  } = dataGridProps;

  const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  const {data: categoriesData, isLoading} = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const columns = React.useMemo<GridColumns<IPost>>(
      () => [
        {field: "title", headerName: "Title", flex: 1, minWidth: 350},
        {
          field: "category.id",
          headerName: "Category",
          type: "number",
          minWidth: 250,
          flex: 1,
          renderCell: function render({row}) {
            if (isLoading) {
              return "Loading...";
            }

            const category = categoriesData?.data.find(
                (item) => item.id === row.category.id,
            );
            return category?.title;
          },
        },
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 1,
          renderCell: function render(params) {
            return <TagField value={params.row.status}/>;
          },
        },
        {
          field: "createdAt",
          headerName: "CreatedAt",
          minWidth: 220,
          renderCell: function render(params) {
            return (
                <DateField format="LLL" value={params.row.createdAt}/>
            );
          },
        },
        {
          headerName: "Actions",
          field: "actions",
          minWidth: 250,
          renderCell: function render(params) {
            return (
                <Stack direction="row" spacing={1}>
                  <EditButton hideText recordItemId={params.row.id} />
                  <ShowButton hideText recordItemId={params.row.id} />
                </Stack>
            );
          },
        },
      ],
      [categoriesData, isLoading],
  );

  return (
      <List>
        <DataGrid
            {...dataGridProps}
            columns={columns}
            sortingMode={sortingMode}
            sortModel={sortModel}
            onSortModelChange={onSortModelChange}
            filterMode={filterMode}
            filterModel={filterModel}
            onFilterModelChange={onFilterModelChange}
            autoHeight
        />
      </List>
  );
};

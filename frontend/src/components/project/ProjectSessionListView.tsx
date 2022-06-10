import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { NoDataMessage } from "../common/NoDataMessage";
import i18n from "i18next";
import { format } from "date-fns";
import { EditCellContents } from "./EditCellContents";
import { GetSessionDto } from "../../api/model";

export interface ProjectSessionListViewProps {
  remove: (id: string) => void;
  sessions: GetSessionDto[];
  onSelectionChanged: (ids: string[]) => void;
}

export function ProjectSessionListView({
  remove,
  sessions,
  onSelectionChanged,
}: ProjectSessionListViewProps) {
  const columns = getGridColumns(remove);
  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={sessions}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            onSelectionChanged(newSelectionModel as string[]);
          }}
          components={{
            NoRowsOverlay: () => (
              <Box
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  height: "100%",
                }}
              >
                <NoDataMessage />
              </Box>
            ),
          }}
        />
      </div>
    </>
  );
}

function getGridColumns(onDelete: (id: string) => void): GridColDef[] {
  const dateFormat = "dd.mm.yyyy HH:mm";
  return [
    {
      field: "fromDate",
      headerName: i18n.t("session.date_from"),
      width: 140,
      editable: false,
      valueGetter: (params: GridValueGetterParams) =>
        format(new Date(params.value), dateFormat),
    },
    {
      field: "toDate",
      headerName: i18n.t("session.date_to"),
      width: 140,
      editable: false,
      valueGetter: (params: GridValueGetterParams) =>
        format(new Date(params.value), dateFormat),
    },
    {
      field: "isInvoiced",
      headerName: i18n.t("session.is_invoiced"),
      type: "boolean",
      width: 150,
      editable: false,
    },
    {
      field: "id",
      headerName: i18n.t("operation.actions"),
      type: "string",
      width: 85,
      editable: false,
      renderCell: (params) => {
        return (
          <EditCellContents session={params.row} onDeleteClick={onDelete} />
        );
      },
    },
    {
      field: "note",
      headerName: i18n.t("session.note"),
      type: "string",
      minWidth: 400,
      editable: false,
    },
  ];
}

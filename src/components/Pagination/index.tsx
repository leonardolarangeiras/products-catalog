import { Pagination as MuiPagination } from '@mui/material';

type PaginationProps = {
  page: number;
  disabled: boolean;
  countProducts: number;
  // eslint-disable-next-line no-unused-vars
  handleChangePagination: (newPage: number) => void;
};

function Pagination({
  page,
  disabled,
  countProducts,
  handleChangePagination,
}: PaginationProps) {
  return (
    <MuiPagination
      count={Math.ceil(countProducts / 20)}
      page={page}
      onChange={(e, value) => handleChangePagination(value)}
      disabled={disabled}
    />
  );
}

export default Pagination;

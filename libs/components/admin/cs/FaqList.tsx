import React from 'react';
import {
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableContainer,
  Button,
  Menu,
  Fade,
  MenuItem,
  Typography,
  Stack,
} from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { FaqStatus } from '../../../enums/faqCategory.enum';

interface Data {
  id: string;
  question: string;
  answer: string;
  agent: string;
  location: string;
  type: string;
  status: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'TYPE',
  },
  {
    id: 'question',
    numeric: true,
    disablePadding: false,
    label: 'QUESTION',
  },
  {
    id: 'answer',
    numeric: false,
    disablePadding: false,
    label: 'ANSWER',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'STATUS',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, faq: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface FaqPanelListType {
  faqs: any[]; // Replace 'any' with your actual FAQ type if available
  anchorEl: Record<string, HTMLElement | null>;
  menuIconClickHandler: (event: React.MouseEvent<HTMLElement>, faqId: string) => void;
  menuIconCloseHandler: (faqId: string) => void;
  updateFaqHandler: (data: { _id: string; faqStatus: string }) => void;
  removeFaqHandler: (faqId: string) => void;
}

export const FaqArticlesPanelList: React.FC<FaqPanelListType> = ({
  faqs,
  anchorEl,
  menuIconClickHandler,
  menuIconCloseHandler,
  updateFaqHandler,
  removeFaqHandler,
}) => {
  console.log(faqs, 'FAQS');

  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
          <EnhancedTableHead
            numSelected={0}
            onRequestSort={() => {}}
            onSelectAllClick={() => {}}
            order={'asc'}
            orderBy={'type'}
            rowCount={faqs.length}
          />
          <TableBody>
            {faqs.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={headCells.length}>
                  <span className={'no-data'}>Data not found!</span>
                </TableCell>
              </TableRow>
            )}

            {faqs.length > 0 &&
              faqs.map((faq) => (
                <TableRow hover key={faq._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{faq.faqType}</TableCell>
                  <TableCell align="center">{faq.faqQuestion}</TableCell>
                  <TableCell align="center">{faq.faqAnswer}</TableCell>
                  <TableCell align="center">
                    <Button onClick={(e) => menuIconClickHandler(e, faq._id)} className={'badge success'}>
                      {faq.faqStatus}
                    </Button>

                    <Menu
                      className={'menu-modal'}
                      MenuListProps={{ 'aria-labelledby': 'fade-button' }}
                      anchorEl={anchorEl[faq._id]}
                      open={Boolean(anchorEl[faq._id])}
                      onClose={() => menuIconCloseHandler(faq._id)}
                      TransitionComponent={Fade}
                      sx={{ p: 1 }}
                    >
                      {Object.values(FaqStatus)
                        .filter((status) => status !== faq.faqStatus)
                        .map((status) => (
                          <MenuItem
                            onClick={() => updateFaqHandler({ _id: faq._id, faqStatus: status })}
                            key={status}
                          >
                            <Typography variant={'subtitle1'} component={'span'}>
                              {status}
                            </Typography>
                          </MenuItem>
                        ))}
                    </Menu>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => removeFaqHandler(faq._id)}>
                      <DeleteForeverTwoToneIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

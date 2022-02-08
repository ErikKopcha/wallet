import {
  Stack, Card, CardContent, Box, Typography, Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import zeroImage from '../../../assets/images/zero.png';

const MobileDashTable = () => {

  let columns = [
    {
      id: 'date',
      label: 'Date',
      minWidth: '80px',
      maxWidth: '150px',
    },
    {
      id: 'type',
      label: 'Type',
      minWidth: '50px',
      maxWidth: '80px',
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: '80px',
      maxWidth: '150px',
    },
    {
      id: 'comments',
      label: 'Comments',
      minWidth: '80px',
      maxWidth: '150px',
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: '100px',
      maxWidth: '150px',
    },
  ];

  const transactions = useSelector((state) => state.transactions);

  const noTransaction = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{marginBottom: '20px', textAlign: 'center'}}>Sorry, now you don't have any transaction(</h1>
        <img src={zeroImage} alt={'noTransactions'} style={{width: '60vh'}} />
      </div>
    );
  };


  // const [page, setPage] = useState(0);
  // const rowsPerPage = 5;
  //
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  return (
    <>
      {
        transactions.length > 0 ? (
          <Stack direction={'column'} sx={{ pb: '25px' }}>
            {
              transactions.map(operation => (
                <Card key={`card-${new Date().getTime()}-${Math.random()}`} style={{
                  borderRadius: '10px',
                  borderLeftWidth: '5px',
                  borderLeftStyle: 'solid',
                  borderLeftColor: operation.type === '+' ? '#24CCA7' : '#FF6596',
                }} sx={{
                  '&:not(:last-of-type)': {
                    marginBottom: '10px',
                  },
                  '& .MuiCardContent-root:last-child': {
                    pb: 0,
                  },
                }}>
                  <CardContent sx={{ padding: 0 }}>
                    {
                      columns.map(column => (
                        <Box key={`box-${new Date().getTime()}-${Math.random()}`} sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid #DCDCDF',
                          height: '47px',
                          alignItems: 'center',
                          paddingX: '20px',
                        }}>
                          <Typography key={`column-label-${new Date().getTime()}-${Math.random()}`}>
                            {column.label}
                          </Typography>
                          {
                            operation[column.id].length >= 30 ? (
                              <Tooltip key={`toolTip--${new Date().getTime()}-${Math.random()}`}
                                       title={operation[column.id]}>
                                <Typography key={`oper-${new Date().getTime()}-${Math.random()}`} sx={{
                                  maxWidth: '49%',
                                  width: '50%',
                                  display: 'block',
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                }}>
                                  {operation[column.id]}
                                </Typography>
                              </Tooltip>
                            ) : (
                              <Typography key={`operation-${new Date().getTime()}-${Math.random()}`}
                                          sx={{ maxWidth: '200px' }}>
                                {operation[column.id]}
                              </Typography>
                            )
                          }
                        </Box>
                      ))
                    }
                  </CardContent>
                </Card>
              ))
            }
          </Stack>
        ) : noTransaction()
      }
    </>
  );
};

export default MobileDashTable;
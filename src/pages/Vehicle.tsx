import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { myGet } from 'api/myGet';
import { NextPageContext } from 'next';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function Vehicles({ list }: any) {
  const classes = useStyles();
  console.log(list);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">OwnerID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              <TableCell align="right">{row.model}</TableCell>
              <TableCell align="right">{row.ownerId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

Vehicles.getInitialProps = async (ctx: NextPageContext) => {
  const json = await myGet("http://localhost:3002/api/vehicle", ctx);
  return {
    list: json,
  };
}
